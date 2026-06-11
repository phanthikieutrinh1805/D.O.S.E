import { indexContent, indexStyle } from "./page-content/index";
import { renderPage } from "./page-content/render";

const styleElement = document.createElement("style");
styleElement.textContent = indexStyle;
document.head.appendChild(styleElement);

renderPage(indexContent);

const nextUrl = `pages/home.html${window.location.hash || ""}`;
window.location.replace(nextUrl);
