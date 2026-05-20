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

const contactForm = $("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = $("name");
    const email = $("email");
    const success = $("contactSuccess");

    const okName = setError(name, name.value.trim() ? "" : "Vui lòng nhập họ và tên.");
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
    const okEmail = setError(email, emailValid ? "" : "Vui lòng nhập email hợp lệ.");

    if (!(okName && okEmail)) {
      success.textContent = "Chưa gửi được. Vui lòng sửa lỗi và thử lại.";
      return;
    }

    success.textContent = "Đăng ký thành công. Cảm ơn bạn đã tham gia cộng đồng D.O.S.E.";
    contactForm.reset();
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
