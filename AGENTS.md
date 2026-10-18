# my-todo-tui

A personal todo terminal application using TypeScript, Bun, and OpenTUI. This is an application repository, no longer the reusable blueprint.

## Product plan

Current phase: planning. Do not implement planned features until explicitly requested.

- Separate work and personal todos.
- Show 5 todos initially, expandable to 10.
- Order by when added, newest first.
- Provide a way to view all todos. The 5/10 limits constrain the view, not stored todos.
- Future integration: Telegram; possibly Google Calendar through MCP.
- Persistence is undecided: SQLite or ClickHouse, potentially hosted remotely. Cloudflare is another hosting option under consideration.
- Do not commit to a database, hosting provider, or integration architecture yet. Avoid speculative dependencies and abstractions.

## Structure

Organize by feature. Adopt this layout as the application grows; do not create empty folders or split trivial code just to match it.

```text
src/
├── main.tsx                  # Renderer startup and shutdown
├── app.tsx                   # Shared layout and active screen
├── screens/
│   └── <feature>/
│       ├── screen.tsx
│       ├── <component>.tsx    # Feature-local UI
│       ├── load.ts            # Read feature data
│       ├── actions.ts         # Change feature data
│       ├── types.ts           # Feature-local types
│       └── actions.test.ts
├── components/               # UI used by multiple features
│   ├── app-shell.tsx
│   ├── command-bar.tsx
│   └── status-bar.tsx
├── services/                 # External systems and I/O
│   ├── <service>.ts
│   └── <service>.test.ts
└── config.ts                 # Read and validate configuration
```

Use `.tsx` for React components and `.ts` otherwise. The current starter uses `@opentui/core` directly in `index.ts`; do not migrate it merely to match this layout. Use `@opentui/react` when building React-based screens.

## Boundaries

- Keep the entrypoint thin: initialize, mount, and shut down.
- Let `app.tsx` own shared layout and screen selection, not feature logic.
- Keep each feature's components, state, hooks, types, loading, actions, and tests together.
- Keep state near its consumers. Add shared state only when needed.
- Keep I/O out of rendering. Feature loaders and actions call services.
- Services must not import screens or UI components. Pass dependencies explicitly.
- Move code into shared components or services only when it is genuinely shared.
- Avoid catch-all `utils/`, `hooks/`, `types/`, and `store/` directories.
- Screen selection, loading, and actions are explicit application code; filenames do not create runtime behavior.

## Implementation

- Prefer existing components, platform APIs, and installed dependencies.
- Add only the files and abstractions the current feature needs.
- Validate configuration and external data at their boundaries.
- Show loading, empty, and error states for asynchronous screens.
- Provide discoverable keyboard controls and a reliable quit path.
- Destroy the renderer on every shutdown path and let terminal cleanup finish before exiting.

## Verification

- Put tests beside the code they exercise.
- Test non-trivial behavior and error handling; use OpenTUI's headless renderer for UI interactions.
- Verify keyboard input and clean shutdown after changing terminal lifecycle code.
- Run `bun test` after changes. Run the app with `bun start`.
- Keep the README's setup and run instructions accurate.
