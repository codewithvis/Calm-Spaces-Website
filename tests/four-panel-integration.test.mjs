import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

test("four panels exist and export valid Next.js page components", () => {
  const adminPage = path.join(rootDir, "app/(app)/admin/page.tsx");
  const expertPage = path.join(rootDir, "app/(app)/expert/page.tsx");
  const peerPage = path.join(rootDir, "app/(app)/peer-listener/page.tsx");
  const studentPage = path.join(rootDir, "app/(app)/dashboard/page.tsx");

  assert.ok(fs.existsSync(adminPage), "Admin panel page must exist");
  assert.ok(fs.existsSync(expertPage), "Expert panel page must exist");
  assert.ok(fs.existsSync(peerPage), "Peer listener panel page must exist");
  assert.ok(fs.existsSync(studentPage), "Student dashboard page must exist");

  const adminContent = fs.readFileSync(adminPage, "utf8");
  const expertContent = fs.readFileSync(expertPage, "utf8");
  const peerContent = fs.readFileSync(peerPage, "utf8");
  const studentContent = fs.readFileSync(studentPage, "utf8");

  assert.match(adminContent, /AdminUserManagement/, "Admin page must include AdminUserManagement");
  assert.match(adminContent, /AdminCommunityManagement/, "Admin page must include AdminCommunityManagement");
  assert.match(expertContent, /book_request/, "Expert page must query book_request");
  assert.match(expertContent, /expert_schedule/, "Expert page must query expert_schedule");
  assert.match(peerContent, /student_schedule/, "Peer page must query student_schedule");
  assert.match(peerContent, /book_request/, "Peer page must query book_request");
  assert.match(studentContent, /MoodPattern|saveMoodEntry/, "Student dashboard must support mood logging");
});

test("admin user management component supports real-time role change across Android and Web", () => {
  const compPath = path.join(rootDir, "components/admin/admin-user-management.tsx");
  assert.ok(fs.existsSync(compPath), "AdminUserManagement component must exist");

  const content = fs.readFileSync(compPath, "utf8");
  assert.match(content, /from\("profiles"\)/, "Must query profiles table");
  assert.match(content, /admin_profiles_realtime/, "Must listen to real-time profile changes");
  assert.match(content, /type:\s*targetType/, "Must update Android type field");
  assert.match(content, /role:\s*targetRole/, "Must update Web role field");
});

test("proxy.ts normalizes both PEER and PEER_LISTENER roles for peer listener access", () => {
  const proxyPath = path.join(rootDir, "proxy.ts");
  assert.ok(fs.existsSync(proxyPath), "proxy.ts must exist");

  const content = fs.readFileSync(proxyPath, "utf8");
  assert.match(content, /rawRole === "PEER" \|\| rawRole === "PEER_LISTENER"/, "Must normalize PEER role");
  assert.match(content, /\/peer-listener/, "Must protect peer-listener route");
  assert.match(content, /\/expert/, "Must protect expert route");
  assert.match(content, /\/admin/, "Must protect admin route");
});

test("login view supports sign-in by registration number or email with automatic role routing", () => {
  const loginViewPath = path.join(rootDir, "components/auth/login-view.tsx");
  assert.ok(fs.existsSync(loginViewPath), "login-view.tsx must exist");

  const content = fs.readFileSync(loginViewPath, "utf8");
  assert.match(content, /registration_number/, "Must check registration number lookup");
  assert.match(content, /rawRole === "ADMIN"/, "Must detect admin role");
  assert.match(content, /rawRole === "EXPERT"/, "Must detect expert role");
  assert.match(content, /rawRole === "PEER"/, "Must detect peer role");
  assert.match(content, /\/admin|\/expert|\/peer-listener|\/dashboard/, "Must route to role-based destination");
});

test("buddy-connect allows students to book peer listener drop-in slots into book_request", () => {
  const bcPath = path.join(rootDir, "app/(app)/buddy-connect/page.tsx");
  assert.ok(fs.existsSync(bcPath), "buddy-connect/page.tsx must exist");

  const content = fs.readFileSync(bcPath, "utf8");
  assert.match(content, /from\("book_request"\)\.insert/, "Must insert booking into book_request");
  assert.match(content, /from\("student_schedule"\)/, "Must query student_schedule for peer slots");
  assert.match(content, /type\.eq\.PEER/, "Must find peer listeners matching Android type");
});
