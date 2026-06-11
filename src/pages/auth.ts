import "../styles/tailwind.css";
import { authContent } from "../page-content/auth";
import { renderPage } from "../page-content/render";
renderPage(authContent);
void import("./sidebar");

const views = ["login", "register", "forgot"] as const;
type AuthView = (typeof views)[number];
type ViewOptions = { focusField?: boolean; announce?: boolean };

const liveRegion = document.getElementById("authLiveRegion") as HTMLElement | null;
const authStatus = document.getElementById("authStatus") as HTMLElement | null;
const authNextStep = document.getElementById("authNextStep") as HTMLElement | null;

const tabButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-auth-view]"))
  .filter((element) => element.classList.contains("auth-tab"));
const panelButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-auth-view]"))
  .filter((element) => !element.classList.contains("auth-tab"));

const panels: Record<AuthView, HTMLElement | null> = {
  login: document.getElementById("login-panel") as HTMLElement | null,
  register: document.getElementById("register-panel") as HTMLElement | null,
  forgot: document.getElementById("forgot-panel") as HTMLElement | null
};

function announce(message: string): void {
  if (!liveRegion) return;
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 30);
}

function setStatus(message: string, type: "success" | "error" = "success"): void {
  if (!authStatus) return;
  authStatus.textContent = message;
  authStatus.classList.toggle("error", type === "error");
  authStatus.classList.toggle("result", type !== "error");
}

function showNextStep(visible: boolean): void {
  if (!authNextStep) return;
  authNextStep.hidden = !visible;
}

function showView(view: AuthView, options: ViewOptions = {}): void {
  views.forEach((name) => {
    const isActive = name === view;
    const tab = document.getElementById(`tab-${name}`) as HTMLButtonElement | null;
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
    const firstInput = panels[view]?.querySelector<HTMLInputElement>("input");
    firstInput?.focus();
  }

  if (options.announce !== false) {
    announce(`�� chuy?n sang bi?u m?u ${view}.`);
  }

  showNextStep(false);
}

function setError(input: HTMLInputElement, message: string): boolean {
  const error = document.getElementById(`${input.id}-error`) as HTMLElement | null;
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

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

for (const [index, button] of tabButtons.entries()) {
  button.addEventListener("click", () => {
    const view = button.dataset.authView as AuthView | undefined;
    if (view) showView(view);
  });

  button.addEventListener("keydown", (event) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabButtons.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabButtons.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    const nextButton = tabButtons[nextIndex];
    nextButton.focus();
    const nextView = nextButton.dataset.authView as AuthView | undefined;
    if (nextView) showView(nextView, { focusField: false });
  });
}

panelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.authView as AuthView | undefined;
    if (view) showView(view);
  });
});

const loginForm = document.getElementById("loginForm") as HTMLFormElement | null;
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail") as HTMLInputElement | null;
    const password = document.getElementById("loginPassword") as HTMLInputElement | null;
    if (!email || !password) return;

    const validEmail = setError(email, isValidEmail(email.value) ? "" : "Vui l�ng nh?p email h?p l?.");
    const validPassword = setError(
      password,
      password.value.trim().length >= 6 ? "" : "M?t kh?u c?n �t nh?t 6 k� t?."
    );

    if (!(validEmail && validPassword)) {
      setStatus("Bi?u m?u dang nh?p c�n l?i. Vui l�ng ki?m tra l?i.", "error");
      showNextStep(false);
      (loginForm.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      announce("Bi?u m?u dang nh?p c� l?i.");
      return;
    }

    setStatus(
      "�ang nh?p demo th�nh c�ng. B?n c� th? v�o onboarding d? ch?n nhu c?u h? tr? tru?c khi v�o ?ng d?ng."
    );
    showNextStep(true);
    announce("�ang nh?p demo th�nh c�ng.");
    loginForm.reset();
  });
}

const registerForm = document.getElementById("registerForm") as HTMLFormElement | null;
if (registerForm) {
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("registerName") as HTMLInputElement | null;
    const email = document.getElementById("registerEmail") as HTMLInputElement | null;
    const password = document.getElementById("registerPassword") as HTMLInputElement | null;
    const confirmPassword = document.getElementById("registerConfirmPassword") as HTMLInputElement | null;
    if (!name || !email || !password || !confirmPassword) return;

    const validName = setError(name, name.value.trim() ? "" : "Vui l�ng nh?p h? v� t�n.");
    const validEmail = setError(email, isValidEmail(email.value) ? "" : "Vui l�ng nh?p email h?p l?.");
    const validPassword = setError(
      password,
      password.value.trim().length >= 8 ? "" : "M?t kh?u c?n �t nh?t 8 k� t?."
    );
    const validConfirm = setError(
      confirmPassword,
      confirmPassword.value === password.value ? "" : "X�c nh?n m?t kh?u chua kh?p."
    );

    if (!(validName && validEmail && validPassword && validConfirm)) {
      setStatus("Bi?u m?u dang k� c�n l?i. Vui l�ng ki?m tra l?i.", "error");
      showNextStep(false);
      (registerForm.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus();
      announce("Bi?u m?u dang k� c� l?i.");
      return;
    }

    setStatus(
      "T?o t�i kho?n demo th�nh c�ng. Ti?p theo b?n c� th? dang nh?p b?ng flow th?t.",
      "success"
    );
    announce("T?o t�i kho?n demo th�nh c�ng.");
    registerForm.reset();
    showView("login");
  });
}

const forgotForm = document.getElementById("forgotForm") as HTMLFormElement | null;
if (forgotForm) {
  forgotForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("forgotEmail") as HTMLInputElement | null;
    if (!email) return;

    const validEmail = setError(email, isValidEmail(email.value) ? "" : "Vui l�ng nh?p email h?p l?.");

    if (!validEmail) {
      setStatus("Bi?u m?u kh�i ph?c c�n l?i. Vui l�ng ki?m tra l?i.", "error");
      showNextStep(false);
      email.focus();
      announce("Bi?u m?u kh�i ph?c c� l?i.");
      return;
    }

    setStatus(
      "�� g?i hu?ng d?n kh�i ph?c d?ng demo. Sau n�y bu?c n�y s? g?i API g?i email th?t.",
      "success"
    );
    announce("�� g?i hu?ng d?n kh�i ph?c d?ng demo.");
    forgotForm.reset();
    showView("login");
  });
}

showView("login", { announce: false, focusField: false });
