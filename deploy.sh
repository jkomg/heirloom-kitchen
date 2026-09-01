#!/bin/bash
set -e

# Heirloom Kitchen — deploy to Cloud Run.
#
# This script exists because its absence caused a real outage-shaped bug.
#
# Until now the site was deployed with `gcloud run deploy --source .`, which
# takes its project from whatever `gcloud config set project` happened to be at
# the time. On 2026-07-03 that was job-hunt-dashboard-494012, so a build landed
# there instead: a second heirloom-kitchen service, a second cookbook.jkomg.us
# domain mapping, and two heirloom-* secrets in an unrelated project. Because
# the live domain kept serving the older build from cookbook-500218, nothing
# appeared broken and the newer build sat dark for two months — with a database
# connection that returned HTTP 500, paired against job-hunt's Turso token.
#
# Hardcoding PROJECT_ID is the fix. Never replace it with ambient gcloud config.

cd "$(dirname "$0")"

PROJECT_ID="cookbook-500218"
REGION="us-central1"
SERVICE="heirloom-kitchen"
DOMAIN="cookbook.jkomg.us"

echo "=== Heirloom Kitchen — Deploy ==="
echo "Project: $PROJECT_ID"
echo "Service: $SERVICE"
echo "Domain:  $DOMAIN"
echo ""

# Secrets (TURSO_DATABASE_URL, TURSO_AUTH_TOKEN) are already attached to the
# service from Secret Manager in this project. Deploying a new image leaves them
# untouched, which is deliberate: the credentials belong to the service, not the
# build. Do not pass --set-env-vars here or they are replaced wholesale.
gcloud run deploy "$SERVICE" \
  --source . \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated

echo ""
echo "Verifying the site actually serves data (not just HTTP 200)..."
URL=$(gcloud run services describe "$SERVICE" --region="$REGION" --project="$PROJECT_ID" --format='value(status.url)')
CODE=$(curl -s -o /dev/null -w '%{http_code}' -m 30 "$URL/api/recipes" || echo 000)
if [ "$CODE" != "200" ]; then
  echo "  ERROR: /api/recipes returned HTTP $CODE." >&2
  echo "  The page will still render, so this fails silently in a browser." >&2
  echo "  Check the Turso secrets are the ones belonging to THIS project." >&2
  exit 1
fi
echo "  OK: /api/recipes returned 200"

# ─────────────────────────────────────────────────────────────────────────────
# Deploy-target verification.
#
# Three services in this estate spent weeks deploying into a project that no
# domain pointed at. Each deploy succeeded, so nothing ever failed — the only
# symptom was a public site that quietly stopped changing. amber-wiki did it for
# six days, athens-chronicles-web for a month, heirloom-kitchen shipped a build
# with a broken database that nobody saw because the domain served the old one.
#
# This asks the one question none of those deploys asked: does the domain that
# serves this service actually live in the project we just deployed to?
#
# Deliberately does not take the domain as input — the amber version did, and a
# script that names its own domain can still be wrong about it. This searches
# every project you can see for a mapping pointing at this service name.
# ─────────────────────────────────────────────────────────────────────────────
verify_deploy_target() {
  local project="$1" region="$2" service="$3"
  local token here="" elsewhere=""

  token=$(gcloud auth print-access-token 2>/dev/null) || {
    echo "  (skipped domain check: no gcloud access token)"; return 0; }

  echo ""
  echo "=== Verifying deploy target for $service ==="

  local p hits
  for p in $(gcloud projects list --format='value(projectId)' 2>/dev/null); do
    hits=$(curl -s -m 15 -H "Authorization: Bearer $token" \
      "https://${region}-run.googleapis.com/apis/domains.cloudrun.com/v1/namespaces/${p}/domainmappings" \
      2>/dev/null | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
except Exception:
    raise SystemExit
if 'error' in d:
    raise SystemExit
for i in d.get('items', []):
    if i.get('spec', {}).get('routeName') == '$service':
        print(i['metadata']['name'])
" 2>/dev/null)
    [ -z "$hits" ] && continue
    if [ "$p" = "$project" ]; then
      here="$hits"
    else
      elsewhere="${elsewhere}${elsewhere:+ }${p}=$(echo "$hits" | tr '\n' ',')"
    fi
  done

  if [ -n "$elsewhere" ]; then
    echo "  ERROR: a domain for '$service' is mapped in a DIFFERENT project." >&2
    echo "    deployed to: $project" >&2
    echo "    mapped in:   $elsewhere" >&2
    [ -n "$here" ] && echo "    also mapped here: $(echo "$here" | tr '\n' ' ')" >&2
    echo "  Traffic goes to the mapped project, not this one. Either deploy" >&2
    echo "  there, or move the mapping. This deploy is probably invisible." >&2
    return 1
  fi

  if [ -n "$here" ]; then
    echo "  OK: $(echo "$here" | tr '\n' ' ') -> $service in $project"
  else
    echo "  Note: no custom domain maps to $service in any visible project."
    echo "  Fine for an internal service; wrong if this is meant to be public."
  fi
  return 0
}

verify_deploy_target "$PROJECT_ID" "$REGION" "$SERVICE"

echo ""
echo "=== Done ==="
echo "Live: https://$DOMAIN"
