export type PageContent = {
  title: string;
  description?: string;
  bodyClass?: string;
  bodyAttrs?: Record<string, string>;
  html: string;
};

export function renderPage(content: PageContent): void {
  document.title = content.title;

  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description && content.description) {
    description.content = content.description;
  }

  document.body.className = content.bodyClass || "";

  Object.entries(content.bodyAttrs || {}).forEach(([name, value]) => {
    document.body.setAttribute(name, value);
  });

  const appContainer = document.getElementById("app");
  if (appContainer) {
    appContainer.innerHTML = content.html;
  } else {
    // fallback if no #app is found
    document.body.innerHTML = content.html;
  }

  const anchor = new URLSearchParams(window.location.hash.split("?")[1] || "").get("anchor");
  if (anchor) {
    window.requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView());
  }
}
