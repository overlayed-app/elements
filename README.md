# elements

Elements Registry for Overlayed 🖼🏗

## How to contribute

- Open a PR with a single addition/removal to `registry.json`
- Do not commit `registry-lock.json` (CD will do it)
- Wait for CI to pass on the PR
- Human review can commence

To run validation locally, `node tooling/diff/index.js` - note this may change `registry-lock.json`, which **you should not commit**.
