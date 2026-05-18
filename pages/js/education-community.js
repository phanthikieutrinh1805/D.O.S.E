const $ = (id) => document.getElementById(id);

function announce(message) {
  const status = $("kbdStatus");
  if (status) status.textContent = message;
}

document.addEventListener("keydown", (event) => {
  const useShortcut = event.altKey || event.metaKey;
  if (!useShortcut) return;

  const tag = document.activeElement?.tagName?.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;

  const key = event.key.toLowerCase();
  const routeMap = {
    "1": "../index.html",
    "2": "access.html",
    "3": "education.html",
    "4": "opportunity.html",
    "5": "humanity.html"
  };

  if (routeMap[key]) {
    event.preventDefault();
    const keyLabel = event.metaKey ? "⌘" : "Alt/⌥";
    announce(`Đang chuyển trang bằng phím tắt ${keyLabel} + ${key}.`);
    window.location.href = routeMap[key];
    return;
  }

  if (key === "m") {
    event.preventDefault();
    const main = $("main-content");
    if (main) {
      main.focus();
      announce("Đã chuyển tới vùng nội dung chính.");
    }
  }
});
