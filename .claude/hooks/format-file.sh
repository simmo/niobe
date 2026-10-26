#!/usr/bin/env bash
# PostToolUse (Edit|Write): format the edited file and surface lint findings to Claude.
file=$(jq -r '.tool_response.filePath // .tool_input.file_path // empty')
[ -n "$file" ] && [ -f "$file" ] || exit 0

. "$(dirname "$0")/env.sh"

case "$file" in
	"$PWD"/*) ;;
	*) exit 0 ;;
esac

npx --no-install oxfmt --no-error-on-unmatched-pattern "$file" >/dev/null 2>&1

case "$file" in
	*.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs)
		if ! out=$(npx --no-install oxlint "$file" 2>&1) || grep -qE ' (warning|error) ' <<<"$out"; then
			echo "oxlint found problems in $file:" >&2
			echo "$out" >&2
			exit 2
		fi
		;;
esac
exit 0
