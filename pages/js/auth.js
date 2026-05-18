const liveRegion = document.getElementById("authLiveRegion");
const authStatus = document.getElementById("authStatus");
const authNextStep = document.getElementById("authNextStep");

const views = ["login", "register", "forgot"];
const tabButtons = Array.from(document.querySelectorAll("[data-auth-view]")).filter((element) =>
  element.classList.contains("auth-tab")
);
const panelButtons = Array.from(document.querySelectorAll("[data-auth-view]")).filter(
  (element) => !element.classList.contains("auth-tab")
);

const panels = {
  login: document.getElementById("login-panel"),
  register: document.getElementById("register-panel"),
  forgot: document.getElementById("forgot-panel")
};

function announce(message) {
  if (!liveRegion) return;
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 30);
}

function setStatus(message, type = "success") {
  if (!authStatus) return;
  authStatus.textContent = message;
  authStatus.classList.toggle("error", type === "error");
  authStatus.classList.toggle("result", type !== "error");
}

function showNextStep(visible) {
  if (!authNextStep) return;
  authNextStep.hidden = !visible;
}

function showView(view, options = {}) {
  views.forEach((name) => {
    const isActive = name === view;
    const tab = document.getElementById(`tab-${name}`);
    const panel = panels[name];

    if (tab) {
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    }

    if (panel) {
      panel.hidden = !isActive;
    }
  });

  if (options.focusField !== false) {
    const firstInput = panels[view]?.querySelector("input");
    if (firstInput) firstInput.focus();
  }

  if (options.announce !== false) {
    announce(`Đã chuyển sang biểu mẫu ${view}.`);
  }

  showNextStep(false);
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

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => showView(button.dataset.authView));

  button.addEventListener("keydown", (event) => {
    const currentIndex = index;
    let nextIndex = null;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabButtons.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabButtons.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    tabButtons[nextIndex].focus();
    showView(tabButtons[nextIndex].dataset.authView, { focusField: false });
  });
});

panelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.authView;
    if (view) showView(view);
  });
});

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    const validEmail = setError(email, isValidEmail(email.value) ? "" : "Vui lòng nhập email hợp lệ.");
    const validPassword = setError(
      password,
      password.value.trim().length >= 6 ? "" : "Mật khẩu cần ít nhất 6 ký tự."
    );

    if (!(validEmail && validPassword)) {
      setStatus("Biểu mẫu đăng nhập còn lỗi. Vui lòng kiểm tra lại.", "error");
      showNextStep(false);
      loginForm.querySelector('[aria-invalid="true"]')?.focus();
      announce("Biểu mẫu đăng nhập có lỗi.");
      return;
    }

    setStatus("Đăng nhập demo thành công. Bạn có thể vào onboarding để chọn nhu cầu hỗ trợ trước khi vào ứng dụng.");
    showNextStep(true);
    announce("Đăng nhập demo thành công.");
    loginForm.reset();
  });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("registerName");
    const email = document.getElementById("registerEmail");
    const password = document.getElementById("registerPassword");
    const confirmPassword = document.getElementById("registerConfirmPassword");

    const validName = setError(name, name.value.trim() ? "" : "Vui lòng nhập họ và tên.");
    const validEmail = setError(email, isValidEmail(email.value) ? "" : "Vui lòng nhập email hợp lệ.");
    const validPassword = setError(
      password,
      password.value.trim().length >= 8 ? "" : "Mật khẩu cần ít nhất 8 ký tự."
    );
    const validConfirm = setError(
      confirmPassword,
      confirmPassword.value === password.value ? "" : "Xác nhận mật khẩu chưa khớp."
    );

    if (!(validName && validEmail && validPassword && validConfirm)) {
      setStatus("Biểu mẫu đăng ký còn lỗi. Vui lòng kiểm tra lại.", "error");
      showNextStep(false);
      registerForm.querySelector('[aria-invalid="true"]')?.focus();
      announce("Biểu mẫu đăng ký có lỗi.");
      return;
    }

    setStatus("Tạo tài khoản demo thành công. Tiếp theo bạn có thể đăng nhập bằng flow thật.", "success");
    announce("Tạo tài khoản demo thành công.");
    registerForm.reset();
    showView("login");
  });
}

const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("forgotEmail");
    const validEmail = setError(email, isValidEmail(email.value) ? "" : "Vui lòng nhập email hợp lệ.");

    if (!validEmail) {
      setStatus("Biểu mẫu khôi phục còn lỗi. Vui lòng kiểm tra lại.", "error");
      showNextStep(false);
      email.focus();
      announce("Biểu mẫu khôi phục có lỗi.");
      return;
    }

    setStatus("Đã gửi hướng dẫn khôi phục dạng demo. Sau này bước này sẽ gọi API gửi email thật.", "success");
    announce("Đã gửi hướng dẫn khôi phục dạng demo.");
    forgotForm.reset();
    showView("login");
  });
}

showView("login", { announce: false, focusField: false });
