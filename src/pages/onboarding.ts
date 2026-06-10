import "../styles/styles.css";
import "../styles/onboarding.css";
type StepName = "welcome" | "support" | "preview";

const liveRegion = document.getElementById("onboardingLiveRegion") as HTMLElement | null;
const status = document.getElementById("onboardingStatus") as HTMLElement | null;
const previewUiList = document.getElementById("previewUiList") as HTMLElement | null;
const previewLearningList = document.getElementById("previewLearningList") as HTMLElement | null;
const previewSurface = document.getElementById("previewSurface") as HTMLElement | null;
const finishButton = document.getElementById("finishOnboardingButton") as HTMLButtonElement | null;
const form = document.getElementById("onboardingForm") as HTMLFormElement | null;
const accessProfileButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-access-profile]"));
const keytipTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-keytip]"));

const steps: StepName[] = ["welcome", "support", "preview"];
const state = {
  supportNeeds: [] as string[],
  mainDifficulty: "",
  accessProfile: ""
};
let currentStep: StepName = "welcome";
let keytipModeActive = false;
let altKeyDown = false;

function announce(message: string) {
  if (!liveRegion) return;
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 30);
}

function setStatus(message: string) {
  if (!status) return;
  status.textContent = message;
}

function isTypingTarget(element = document.activeElement) {
  const tag = element?.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}

function isElementVisible(element: HTMLElement | null) {
  if (!element || element.hidden) return false;
  if (element.closest("[hidden]")) return false;
  return true;
}

function isKeytipTargetAvailable(element: HTMLElement) {
  if (!isElementVisible(element)) return false;
  if (element.matches(".option-card")) {
    return currentStep === "support";
  }
  return true;
}

function hideKeytips() {
  keytipTargets.forEach((element) => {
    const badge = element.querySelector(".keytip-badge");
    if (badge) badge.remove();
  });
  keytipModeActive = false;
}

function showKeytips() {
  keytipTargets.forEach((element) => {
    if (!isKeytipTargetAvailable(element)) return;
    if (element.querySelector(".keytip-badge")) return;

    const badge = document.createElement("span");
    badge.className = "keytip-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.textContent = element.dataset.keytip || "";
    element.appendChild(badge);
  });

  keytipModeActive = true;
  announce(
    "Đã hiện phím truy cập nhanh cho bước hiện tại. Bấm ký tự được gắn nhãn để chọn hoặc chuyển bước mà không cần dùng chuột."
  );
}

function getKeytipValue(event: KeyboardEvent) {
  if (event.code && /^Key[A-Z]$/.test(event.code)) {
    return event.code.slice(3).toLowerCase();
  }

  if (event.code && /^Digit[0-9]$/.test(event.code)) {
    return event.code.slice(5);
  }

  return event.key.toLowerCase();
}

function activateKeytip(key: string) {
  const matchedTarget = keytipTargets.find((element) => {
    return (
      isKeytipTargetAvailable(element) &&
      element.dataset.keytip?.toLowerCase() === key.toLowerCase()
    );
  });

  if (!matchedTarget) return false;

  hideKeytips();

  if (matchedTarget.matches(".option-card")) {
    const input = matchedTarget.querySelector<HTMLInputElement>('input[name="supportNeed"]');
    if (!input) return false;
    input.checked = !input.checked;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    matchedTarget.focus();
    announce(`${input.checked ? "Đã chọn" : "Đã bỏ chọn"} ${matchedTarget.textContent.trim()}.`);
    return true;
  }

  matchedTarget.focus();
  matchedTarget.click();
  announce(`Đã kích hoạt ${matchedTarget.textContent.trim()}.`);
  return true;
}

function showStep(stepName: StepName) {
  if (keytipModeActive) {
    hideKeytips();
  }

  currentStep = stepName;
  steps.forEach((step) => {
    const tab = document.getElementById(`step-${step}-tab`);
    const panel = document.getElementById(`step-${step}`);
    const active = step === stepName;

    if (tab) {
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    }

    if (panel) {
      panel.hidden = !active;
    }
  });

  announce(`Đã chuyển sang bước ${stepName}.`);
}

function getNeedLabels(needs: string[]) {
  const map = {
    "large-text": "Ưu tiên chữ lớn hơn",
    "high-contrast": "Ưu tiên tương phản cao",
    "reduced-motion": "Ưu tiên giảm chuyển động",
    "simple-mode": "Ưu tiên giao diện đơn giản",
    "read-aloud": "Ưu tiên tính năng đọc nội dung thành tiếng",
    "easy-language": "Ưu tiên giải thích nội dung dễ hiểu hơn"
  };

  return needs.map((need) => map[need]);
}

function updatePreview() {
  if (!previewUiList || !previewLearningList || !previewSurface) return;
  const uiNeeds: string[] = [];
  const learningNeeds: string[] = [];

  state.supportNeeds.forEach((need) => {
    if (["large-text", "high-contrast", "reduced-motion", "simple-mode"].includes(need)) {
      uiNeeds.push(need);
    } else {
      learningNeeds.push(need);
    }
  });

  previewUiList.innerHTML = "";
  previewLearningList.innerHTML = "";

  const uiLabels = getNeedLabels(uiNeeds);
  const learningLabels = getNeedLabels(learningNeeds);

  if (uiLabels.length === 0) {
    previewUiList.innerHTML = "<li>Dùng giao diện mặc định và có thể chỉnh sau trong cài đặt trợ năng.</li>";
  } else {
    uiLabels.forEach((label) => {
      const li = document.createElement("li");
      li.textContent = label;
      previewUiList.appendChild(li);
    });
  }

  if (learningLabels.length === 0) {
    previewLearningList.innerHTML = "<li>Dùng gợi ý học tập mặc định, chưa bật ưu tiên học tập riêng.</li>";
  } else {
    learningLabels.forEach((label) => {
      const li = document.createElement("li");
      li.textContent = label;
      previewLearningList.appendChild(li);
    });
  }

  previewSurface.classList.toggle("is-large-text", state.supportNeeds.includes("large-text"));
  previewSurface.classList.toggle("is-high-contrast", state.supportNeeds.includes("high-contrast"));
  previewSurface.classList.toggle("is-reduced-motion", state.supportNeeds.includes("reduced-motion"));
  previewSurface.classList.toggle("is-simple-mode", state.supportNeeds.includes("simple-mode"));
}

function syncSupportForm() {
  if (!form) return;
  const selectedNeeds = new Set(state.supportNeeds);
  form.querySelectorAll<HTMLInputElement>('input[name="supportNeed"]').forEach((input) => {
    input.checked = selectedNeeds.has(input.value);
  });
}

function ensureVisionDisplayNeeds() {
  if (state.accessProfile !== "vision") return;
  ["large-text", "high-contrast"].forEach((need) => {
    if (!state.supportNeeds.includes(need)) {
      state.supportNeeds.push(need);
    }
  });
}

function applyCurrentPageDisplaySettings() {
  const useVisionDisplay = state.accessProfile === "vision";
  const useLargeText = useVisionDisplay || state.supportNeeds.includes("large-text");
  const useHighContrast = useVisionDisplay || state.supportNeeds.includes("high-contrast");
  const fontScale = useVisionDisplay ? 150 : useLargeText ? 112.5 : 100;

  document.documentElement.style.setProperty("--font-scale", `${fontScale}%`);
  document.documentElement.classList.toggle("large-text", useLargeText);
  document.body.style.setProperty("--font-scale-custom", `${fontScale}%`);
  document.body.classList.toggle("large-text", useLargeText);
  document.body.classList.toggle("high-contrast", useHighContrast);
}

function applyAccessProfileChoice(profile = "") {
  state.accessProfile = profile;

  accessProfileButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.accessProfile === profile));
  });

  if (profile === "vision") {
    ensureVisionDisplayNeeds();
    setStatus("Đã chọn thị lực kém. Trang hiện dùng chữ 150% và tương phản cao.");
    announce("Đã chọn thị lực kém. Đã bật chữ 150 phần trăm và tương phản cao.");
  } else {
    state.supportNeeds = state.supportNeeds.filter(
      (need) => need !== "high-contrast" && need !== "large-text"
    );
    setStatus("Đã chọn giao diện tiêu chuẩn. Bạn vẫn có thể bật tương phản cao ở bước tiếp theo.");
    announce("Đã chọn giao diện tiêu chuẩn.");
  }

  syncSupportForm();
  updatePreview();
  applyCurrentPageDisplaySettings();
}

function persistSettings() {
  const useVisionDisplay = state.accessProfile === "vision";
  const settings = {
    fontScale: useVisionDisplay ? 150 : state.supportNeeds.includes("large-text") ? 112.5 : 100,
    highContrast: useVisionDisplay || state.supportNeeds.includes("high-contrast"),
    reducedMotion: state.supportNeeds.includes("reduced-motion"),
    simpleMode: state.supportNeeds.includes("simple-mode"),
    learningPreferences: {
      readAloud: state.supportNeeds.includes("read-aloud"),
      easyLanguage: state.supportNeeds.includes("easy-language"),
      mainDifficulty: state.mainDifficulty
    }
  };

  localStorage.setItem("dose-onboarding-complete", "true");
  localStorage.setItem("dose-onboarding-profile", JSON.stringify(settings));
  localStorage.setItem("dose-font-scale", JSON.stringify(settings.fontScale));
  localStorage.setItem("dose-high-contrast", JSON.stringify(settings.highContrast));
  localStorage.setItem("dose-reduce-motion", JSON.stringify(settings.reducedMotion));
  localStorage.setItem("dose-simple-mode", JSON.stringify(settings.simpleMode));
  localStorage.setItem("dose-access-profile", JSON.stringify(state.accessProfile || "default"));
}

document.querySelectorAll<HTMLElement>("[data-next-step]").forEach((button) => {
  button.addEventListener("click", () => {
    const nextStep = button.dataset.nextStep as StepName | undefined;
    if (nextStep) showStep(nextStep);
  });
});

document.querySelectorAll<HTMLElement>("[data-prev-step]").forEach((button) => {
  button.addEventListener("click", () => {
    const prevStep = button.dataset.prevStep as StepName | undefined;
    if (prevStep) showStep(prevStep);
  });
});

steps.forEach((step) => {
  const tab = document.getElementById(`step-${step}-tab`);
  if (!tab) return;

  tab.addEventListener("click", () => {
    showStep(step);
  });
});

accessProfileButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyAccessProfileChoice(button.dataset.accessProfile);
  });
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const checked = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="supportNeed"]:checked')).map((input) => input.value);
    const mainDifficulty = (document.getElementById("mainDifficulty") as HTMLSelectElement | null)?.value || "";

    state.supportNeeds = checked;
    state.mainDifficulty = mainDifficulty;
    ensureVisionDisplayNeeds();

    updatePreview();
    applyCurrentPageDisplaySettings();
    setStatus("Đã cập nhật bản xem trước theo lựa chọn của bạn.");
    showStep("preview");
  });
}

if (form) {
  form.querySelectorAll<HTMLInputElement>('input[name="supportNeed"]').forEach((input) => {
    input.addEventListener("change", () => {
      const checked = Array.from(form.querySelectorAll<HTMLInputElement>('input[name="supportNeed"]:checked')).map((item) => item.value);
      state.supportNeeds = checked;
      ensureVisionDisplayNeeds();
      updatePreview();
    });
  });

  form.querySelectorAll<HTMLElement>(".option-card").forEach((card) => {
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      const input = card.querySelector<HTMLInputElement>('input[name="supportNeed"]');
      if (!input) return;
      input.checked = !input.checked;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      announce(`${input.checked ? "Đã chọn" : "Đã bỏ chọn"} ${card.textContent.trim()}.`);
    });
  });
}

if (finishButton) {
  finishButton.addEventListener("click", () => {
    persistSettings();
    setStatus("Đã lưu thiết lập onboarding. Đang chuyển vào dashboard.");
    announce("Đã lưu thiết lập onboarding.");
    window.setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 500);
  });
}

showStep("welcome");
setStatus("Bạn có thể bắt đầu thiết lập hoặc bỏ qua để vào ứng dụng.");

document.addEventListener("keydown", (event) => {
  if ((event.code === "AltLeft" || event.code === "AltRight") && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
    altKeyDown = true;

    if (!isTypingTarget() && !keytipModeActive) {
      event.preventDefault();
      showKeytips();
    }
    return;
  }

  if (
    keytipModeActive &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    (/^[a-z0-9]$/i.test(event.key) || /^Key[A-Z]$/.test(event.code) || /^Digit[0-9]$/.test(event.code))
  ) {
    event.preventDefault();
    activateKeytip(getKeytipValue(event));
    return;
  }

  if (event.key === "Escape" && keytipModeActive) {
    event.preventDefault();
    hideKeytips();
    announce("Đã ẩn phím truy cập nhanh trong onboarding.");
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key !== "Alt") return;
  if (!altKeyDown) return;
  altKeyDown = false;
});

document.addEventListener("click", () => {
  if (!keytipModeActive) return;
  hideKeytips();
});
