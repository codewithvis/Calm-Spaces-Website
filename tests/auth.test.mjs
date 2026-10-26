import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("login page and components exist and export valid Next.js modules", async () => {
  const loginPage = await readFile(new URL("../app/login/page.tsx", import.meta.url), "utf8");
  assert.match(loginPage, /AuthLayout/);
  assert.match(loginPage, /LoginView/);
  assert.match(loginPage, /export const metadata/);
  assert.match(loginPage, /Sign In/);
});

test("signup page and components exist and export valid Next.js modules", async () => {
  const signupPage = await readFile(new URL("../app/signup/page.tsx", import.meta.url), "utf8");
  assert.match(signupPage, /AuthLayout/);
  assert.match(signupPage, /SignupView/);
  assert.match(signupPage, /export const metadata/);
  assert.match(signupPage, /Create Account/);
});

test("login view connects to Supabase client and provides validation", async () => {
  const loginView = await readFile(new URL("../components/auth/login-view.tsx", import.meta.url), "utf8");
  assert.match(loginView, /createSupabaseBrowserClient/);
  assert.match(loginView, /signInWithPassword/);
  assert.match(loginView, /getSafeNextPath/);
  assert.match(loginView, /login-email/);
  assert.match(loginView, /login-password/);
});

test("signup view handles student role, faculty selection, and password strength", async () => {
  const signupView = await readFile(new URL("../components/auth/signup-view.tsx", import.meta.url), "utf8");
  assert.match(signupView, /createSupabaseBrowserClient/);
  assert.match(signupView, /signUp/);
  assert.match(signupView, /FACULTY_OPTIONS/);
  assert.match(signupView, /passwordScore/);
  assert.match(signupView, /PEER_LISTENER/);
  assert.match(signupView, /profiles/);
});

test("brand logo and auth layout display both main logos for SGT University and Calm Spaces", async () => {
  const brandLogo = await readFile(new URL("../components/brand-logo.tsx", import.meta.url), "utf8");
  assert.match(brandLogo, /sgt-university-logo\.jpg/);
  assert.match(brandLogo, /calm-spaces-official-logo\.png/);

  const authLayout = await readFile(new URL("../components/auth/auth-layout.tsx", import.meta.url), "utf8");
  assert.match(authLayout, /sgt-university-logo\.jpg/);
  assert.match(authLayout, /calm-spaces-official-logo\.png/);
});

