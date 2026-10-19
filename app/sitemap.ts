import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://calmspaces.sgtuniversity.ac.in";
  const now = new Date();

  const routes = [
    "",
    "/about",
    "/team",
    "/initiatives",
    "/events",
    "/resources",
    "/find-support",
    "/counselling",
    "/calm-companions",
    "/contact",
    "/accessibility",
    "/privacy",
    "/terms",
    "/search",
    "/for-students",
    "/for-institutions",
    "/for-professionals",
    "/help",
    "/how-it-works",
    "/safety",
    "/community-guidelines",
    "/visit-us",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" || route === "/events" || route === "/resources" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/find-support" || route === "/events" || route === "/initiatives" ? 0.8 : 0.6,
  }));
}
