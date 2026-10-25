# Shared setup for hooks: run from the project root on the `.nvmrc` Node version.
cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}" || exit 0
if [ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]; then
	. "${NVM_DIR:-$HOME/.nvm}/nvm.sh" >/dev/null 2>&1
	nvm use --silent >/dev/null 2>&1
fi
