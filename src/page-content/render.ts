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

  document.body.innerHTML = content.html;
}
