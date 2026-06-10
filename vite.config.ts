import { resolve } from "node:path";
import { defineConfig } from "vite";

const htmlPages = [
  "index.html",
  "pages/access.html",
  "pages/auth.html",
  "pages/dashboard.html",
  "pages/disability-cognitive.html",
  "pages/disability-hearing.html",
  "pages/disability-mental.html",
  "pages/disability-mobility.html",
  "pages/disability-vision.html",
  "pages/education.html",
  "pages/education-community.html",
  "pages/education-disability.html",
  "pages/home.html",
  "pages/humanity.html",
  "pages/onboarding.html",
  "pages/opportunity.html"
];

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/D.O.S.E/" : "/",
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        htmlPages.map((page) => [
          page.replace(/[/.]/g, "-").replace(/-html$/, ""),
          resolve(__dirname, page)
        ])
      )
    }
  }
});
