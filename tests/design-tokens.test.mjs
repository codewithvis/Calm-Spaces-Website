import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const tokenFile = new URL("../design-system/tokens.css", import.meta.url);
const tokens = await readFile(tokenFile, "utf8");

test("semantic color layers exist", () => {
  for (const token of ["--color-bg-primary", "--color-surface-primary", "--color-text-primary", "--color-brand-primary", "--color-error", "--color-safety-primary"]) {
    assert.match(tokens, new RegExp(`${token}\\s*:`));
  }
});

test("interaction contracts exist", () => {
  for (const token of ["--focus-ring-color", "--duration-normal", "--radius-md", "--shadow-sm", "--chart-primary"]) {
    assert.match(tokens, new RegExp(`${token}\\s*:`));
  }
});

test("dark theme remaps semantic background and text", () => {
  assert.match(tokens, /@media \(prefers-color-scheme: dark\)/);
  assert.match(tokens, /--color-bg-primary:\s*#1b1124/);
  assert.match(tokens, /--color-text-primary:\s*#f7f2fa/);
});
