import { BoxRenderable, createCliRenderer, TextRenderable, type CliRenderer } from "@opentui/core";

export function mountApp(renderer: CliRenderer) {
  let count = 0;

  renderer.root.alignItems = "center";
  renderer.root.justifyContent = "center";

  const panel = new BoxRenderable(renderer, {
    width: "100%",
    maxWidth: 52,
    flexDirection: "column",
    padding: 1,
    gap: 1,
    border: true,
    borderStyle: "rounded",
    borderColor: "#2667f1",
    backgroundColor: "#111827",
    title: " OpenTUI ",
  });
  const counter = new TextRenderable(renderer, {
    content: "Count: 0",
    fg: "#ffffff",
  });

  panel.add(new TextRenderable(renderer, { content: "Hello, terminal.", fg: "#ffffff" }));
  panel.add(counter);
  panel.add(new TextRenderable(renderer, {
    content: "Up/Down: count\nr: reset  |  q / Ctrl+C: quit",
    fg: "#cbd5e1",
  }));
  renderer.root.add(panel);

  renderer.keyInput.on("keypress", (key) => {
    switch (key.name) {
      case "q": renderer.destroy(); return;
      case "up": count++; break;
      case "down": count--; break;
      case "r": count = 0; break;
      default: return;
    }
    counter.content = `Count: ${count}`;
  });
}

if (import.meta.main) {
  const renderer = await createCliRenderer({ exitOnCtrlC: true });
  try {
    mountApp(renderer);
    await renderer.closed;
  } finally {
    renderer.destroy();
  }
}
