# Basic OpenTUI

A tiny TypeScript counter using `@opentui/core` directly. Requires [Bun](https://bun.sh) 1.3.14 or newer.

## Run

```sh
cd opentui-basic
bun install
bun start
```

- Up / Down: increase / decrease.
- `r`: reset.
- `q` or Ctrl+C: quit and restore the terminal.

The count stays in memory; nothing is saved.

## Test

```sh
bun test
```

`index.ts` contains the entire app. Tests use OpenTUI’s headless renderer.
