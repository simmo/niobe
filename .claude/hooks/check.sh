#!/usr/bin/env bash
# Stop: block once if format, lint or dead-code fail, or if source/tooling changed without a changelog entry.
input=$(cat)
[ "$(jq -r '.stop_hook_active // false' <<<"$input")" = "true" ] && exit 0

. "$(dirname "$0")/env.sh"

changed=$( (git diff --name-only HEAD; git ls-files --others --exclude-standard) 2>/dev/null | sort -u)
[ -n "$changed" ] || exit 0

problems=""
for script in format:check lint dead-code; do
	if ! out=$(npm run --silent "$script" 2>&1) || { [ "$script" = lint ] && grep -qE ' (warning|error) ' <<<"$out"; }; then
		problems+=$'\n'"\`npm run $script\` failed:"$'\n'"$(tail -n 30 <<<"$out")"$'\n'
	fi
done

needs_changelog=$(grep -vE '^(CHANGELOG\.md|.*\.test\.ts|AGENTS\.md|CLAUDE\.md|\.claude/.*|\.vscode/.*)$' <<<"$changed")
if [ -n "$needs_changelog" ] && ! grep -qx 'CHANGELOG.md' <<<"$changed"; then
	problems+=$'\n'"CHANGELOG.md has no entry under [Unreleased] for these changes:"$'\n'"$needs_changelog"$'\n'"Add one (see AGENTS.md), or say why it is skipped."$'\n'
fi

[ -z "$problems" ] && exit 0
echo "$problems" >&2
exit 2
