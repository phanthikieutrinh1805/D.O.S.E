type RouteKey =
  | "access"
  | "auth"
  | "dashboard"
  | "disability-cognitive"
  | "disability-hearing"
  | "disability-mental"
  | "disability-mobility"
  | "disability-vision"
  | "education"
  | "education-community"
  | "education-disability"
  | "home"
  | "humanity"
  | "onboarding"
  | "opportunity";

const routeModules: Record<RouteKey, () => Promise<unknown>> = {
  access: () => import("./pages/access"),
  auth: () => import("./pages/auth"),
  dashboard: () => import("./pages/dashboard"),
  "disability-cognitive": () => import("./pages/disability-profile"),
  "disability-hearing": () => import("./pages/disability-profile"),
  "disability-mental": () => import("./pages/disability-profile"),
  "disability-mobility": () => import("./pages/disability-profile"),
  "disability-vision": () => import("./pages/disability-profile"),
  education: () => import("./pages/education"),
  "education-community": () => import("./pages/education-community"),
  "education-disability": () => import("./pages/education-disability"),
  home: () => import("./app"),
  humanity: () => import("./pages/humanity"),
  onboarding: () => import("./pages/onboarding"),
  opportunity: () => import("./pages/opportunity")
};

function getRouteKey(): RouteKey {
  const hashRoute = window.location.hash.match(/^#\/([^?#]+)/)?.[1];
  const candidate = hashRoute || "home";
  return candidate in routeModules ? (candidate as RouteKey) : "home";
}

function normalizeUrl(route: RouteKey) {
  const nextHash = `#/${route}`;
  if (window.location.hash !== nextHash) {
    window.history.replaceState(null, "", `${window.location.pathname}${nextHash}`);
  }
}

const route = getRouteKey();
normalizeUrl(route);
void routeModules[route]();

window.addEventListener("hashchange", () => {
  if (window.location.hash.startsWith("#/")) {
    window.location.reload();
  }
});
