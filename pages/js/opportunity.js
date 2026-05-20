const $ = (id) => document.getElementById(id);

function announce(message) {
  const status = $("kbdStatus");
  if (status) status.textContent = message;
}

function toggleMode(buttonId, className, label) {
  const button = $(buttonId);
  if (!button) return;

  button.addEventListener("click", () => {
    const next = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(next));
    document.documentElement.classList.toggle(className, next);
    document.body.classList.toggle(className, next);
    announce(`${label}: ${next ? "đã bật" : "đã tắt"}.`);
  });
}

function setError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  if (!error) return true;

  if (message) {
    error.textContent = message;
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", `${input.id}-error`);
    return false;
  }

  error.textContent = "";
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-describedby");
  return true;
}

toggleMode("contrastToggle", "high-contrast", "Chế độ tương phản cao");
toggleMode("fontToggle", "large-text", "Chế độ chữ lớn");
toggleMode("motionToggle", "reduce-motion", "Chế độ giảm chuyển động");

const jobFilterForm = $("jobFilterForm");
if (jobFilterForm) {
  jobFilterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const workType = $("workType");
    const supportNeed = $("supportNeed");
    const result = $("filterResult");

    const okWork = setError(workType, workType.value ? "" : "Vui lòng chọn hình thức làm việc.");
    const okSupport = setError(supportNeed, supportNeed.value ? "" : "Vui lòng chọn hỗ trợ ưu tiên.");

    if (!(okWork && okSupport)) {
      result.textContent = "Biểu mẫu có lỗi. Vui lòng kiểm tra các trường đã đánh dấu.";
      return;
    }

    result.textContent =
      `D.O.S.E đề xuất 3 cơ hội ${workType.value} với ưu tiên ${supportNeed.value}, ` +
      "trong đó có 1 công việc được đánh dấu là phù hợp cao với nhu cầu hiện tại của bạn.";
  });
}

document.addEventListener("keydown", (event) => {
  const useShortcut = event.altKey || event.metaKey;
  if (!useShortcut) return;

  const tag = document.activeElement?.tagName?.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return;

  const key = event.key.toLowerCase();
  const routeMap = {
    "1": "home.html",
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
