const liveRegion = document.getElementById("onboardingLiveRegion");
const status = document.getElementById("onboardingStatus");
const previewUiList = document.getElementById("previewUiList");
const previewLearningList = document.getElementById("previewLearningList");
const previewSurface = document.getElementById("previewSurface");
const finishButton = document.getElementById("finishOnboardingButton");
const form = document.getElementById("onboardingForm");
const accessProfileButtons = Array.from(document.querySelectorAll("[data-access-profile]"));

const steps = ["welcome", "support", "preview"];
const state = {
  supportNeeds: [],
  mainDifficulty: "",
  accessProfile: ""
};

function announce(message) {
  if (!liveRegion) return;
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 30);
}

function setStatus(message) {
  if (!status) return;
  status.textContent = message;
}

function showStep(stepName) {
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

function getNeedLabels(needs) {
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
  const uiNeeds = [];
  const learningNeeds = [];

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
  form.querySelectorAll('input[name="supportNeed"]').forEach((input) => {
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

function applyAccessProfileChoice(profile) {
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

document.querySelectorAll("[data-next-step]").forEach((button) => {
  button.addEventListener("click", () => {
    showStep(button.dataset.nextStep);
  });
});

document.querySelectorAll("[data-prev-step]").forEach((button) => {
  button.addEventListener("click", () => {
    showStep(button.dataset.prevStep);
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

    const checked = Array.from(form.querySelectorAll('input[name="supportNeed"]:checked')).map((input) => input.value);
    const mainDifficulty = document.getElementById("mainDifficulty").value;

    state.supportNeeds = checked;
    state.mainDifficulty = mainDifficulty;
    ensureVisionDisplayNeeds();

    updatePreview();
    applyCurrentPageDisplaySettings();
    setStatus("Đã cập nhật bản xem trước theo lựa chọn của bạn.");
    showStep("preview");
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
