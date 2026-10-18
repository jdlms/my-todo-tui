import { expect, test } from "bun:test";
import { createTestRenderer } from "@opentui/core/testing";
import { mountApp } from "./index";

test("renders and updates the counter from keyboard input", async () => {
  const ui = await createTestRenderer({ width: 60, height: 20 });
  try {
    mountApp(ui.renderer);
    await ui.renderOnce();
    expect(ui.captureCharFrame()).toContain("Hello, terminal.");
    expect(ui.captureCharFrame()).toContain("Count: 0");

    await ui.mockInput.pressKeys(["ARROW_UP", "ARROW_UP"]);
    await ui.renderOnce();
    expect(ui.captureCharFrame()).toContain("Count: 2");

    await ui.mockInput.pressKeys(["ARROW_DOWN", "ARROW_DOWN", "ARROW_DOWN"]);
    await ui.renderOnce();
    expect(ui.captureCharFrame()).toContain("Count: -1");

    await ui.mockInput.pressKeys(["r", "z"]);
    await ui.renderOnce();
    expect(ui.captureCharFrame()).toContain("Count: 0");
  } finally {
    await ui.dispose();
  }
});

test.each(["q", "\x03"])("quits cleanly with %j", async (key) => {
  const ui = await createTestRenderer({ width: 60, height: 20, exitOnCtrlC: true });
  try {
    mountApp(ui.renderer);
    await ui.renderOnce();
    ui.mockInput.pressKey(key);
    await ui.renderer.closed;
    expect(ui.renderer.isDestroyed).toBe(true);
  } finally {
    await ui.dispose();
  }
});
