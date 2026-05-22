const $ = (id) => document.getElementById(id);

const liveRegion = $("liveRegion");
const body = document.body;

const FONT_SCALE_STEPS = [100, 112.5, 125];
const DEFAULT_SETTINGS = {
  fontScale: 100,
  highContrast: false,
  reducedMotion: false,
  simpleMode: false,
  darkMode: false
};

const SETTINGS_META = {
  "high-contrast": {
    className: "high-contrast",
    storageKey: "dose-high-contrast",
    onLabel: "Tắt tương phản cao",
    offLabel: "Tương phản cao",
    onMessage: "Đã bật chế độ tương phản cao.",
    offMessage: "Đã tắt chế độ tương phản cao."
  },
  "reduce-motion": {
    className: "reduce-motion",
    storageKey: "dose-reduce-motion",
    onLabel: "Bật chuyển động",
    offLabel: "Giảm chuyển động",
    onMessage: "Đã bật chế độ giảm chuyển động.",
    offMessage: "Đã dùng lại chuyển động mặc định."
  },
  "simple-mode": {
    className: "simple-mode",
    storageKey: "dose-simple-mode",
    onLabel: "Tắt chế độ đơn giản",
    offLabel: "Bật chế độ đơn giản",
    onMessage: "Đã bật simple mode để giảm nhiễu giao diện.",
    offMessage: "Đã tắt simple mode."
  },
  "dark-mode": {
    className: "dark",
    storageKey: "dose-dark-mode",
    onLabel: "Tắt chế độ tối",
    offLabel: "Bật chế độ tối",
    onMessage: "Đã bật chế độ tối.",
    offMessage: "Đã quay về chế độ sáng."
  }
};

const settings = {
  fontScale: loadPreference("dose-font-scale", DEFAULT_SETTINGS.fontScale),
  highContrast: loadPreference(SETTINGS_META["high-contrast"].storageKey, DEFAULT_SETTINGS.highContrast),
  reducedMotion: loadPreference(SETTINGS_META["reduce-motion"].storageKey, DEFAULT_SETTINGS.reducedMotion),
  simpleMode: loadPreference(SETTINGS_META["simple-mode"].storageKey, DEFAULT_SETTINGS.simpleMode),
  darkMode: loadPreference(SETTINGS_META["dark-mode"].storageKey, DEFAULT_SETTINGS.darkMode)
};

const panel = $("accessibilityPanel");
const panelCloseButton = $("accessibilityPanelClose");
const panelOpenButtons = document.querySelectorAll("[data-panel-open]");
const panelToggles = document.querySelectorAll("[data-setting-toggle]");
const increaseFontButton = $("increaseFontButton");
const decreaseFontButton = $("decreaseFontButton");
const fontSizeStatus = $("fontSizeStatus");
const ttsDemoButton = $("ttsDemoButton");
const contactForm = $("contactForm");
const menuToggle = $("menuToggle");
const sideNav = $("sideNav");
const mobileNavBackdrop = $("mobileNavBackdrop");
const shortcutHint = $("shortcutHint");
const keyboardHelperHint = $("keyboardHelperHint");
const keytipHint = $("keytipHint");
const accessOnboarding = $("accessOnboarding");
const accessOnboardingOptions = accessOnboarding
  ? Array.from(accessOnboarding.querySelectorAll("[data-access-profile]"))
  : [];
const confirmOnboardingButton = $("confirmOnboardingButton");
const skipOnboardingButton = $("skipOnboardingButton");

const ACCESS_PROFILE_STORAGE_KEY = "dose-access-profile";
const ACCESS_ONBOARDING_SEEN_STORAGE_KEY = "dose-access-onboarding-seen";

let lastPanelTrigger = null;
let currentUtterance = null;
let lastMenuTrigger = null;
let keytipModeActive = false;
let altKeyDown = false;
let selectedAccessProfile = "";
let lastOnboardingTrigger = null;

const keytipTargets = Array.from(document.querySelectorAll("[data-keytip]"));

function announce(message) {
  if (!liveRegion) return;
  liveRegion.textContent = "";
  window.setTimeout(() => {
    liveRegion.textContent = message;
  }, 30);
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_error) {
    // Ignore storage failures so the UI still works.
  }
}

function loadPreference(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (_error) {
    return fallback;
  }
}

function clampFontScale(value) {
  if (FONT_SCALE_STEPS.includes(value)) return value;
  return DEFAULT_SETTINGS.fontScale;
}

function applyFontScale() {
  const value = clampFontScale(settings.fontScale);
  settings.fontScale = value;
  document.documentElement.style.setProperty("--font-scale", `${value}%`);
  document.documentElement.classList.toggle("large-text", value > DEFAULT_SETTINGS.fontScale);
  body.style.setProperty("--font-scale-custom", `${value}%`);
  body.classList.toggle("large-text", value > DEFAULT_SETTINGS.fontScale);
  savePreference("dose-font-scale", value);

  if (fontSizeStatus) {
    fontSizeStatus.value = `${value}%`;
    fontSizeStatus.textContent = `${value}%`;
  }

  if (increaseFontButton) {
    increaseFontButton.disabled = value === FONT_SCALE_STEPS[FONT_SCALE_STEPS.length - 1];
  }

  if (decreaseFontButton) {
    decreaseFontButton.disabled = value === FONT_SCALE_STEPS[0];
  }
}

function getSettingState(settingName) {
  switch (settingName) {
    case "high-contrast":
      return settings.highContrast;
    case "reduce-motion":
      return settings.reducedMotion;
    case "simple-mode":
      return settings.simpleMode;
    case "dark-mode":
      return settings.darkMode;
    default:
      return false;
  }
}

function setSettingState(settingName, next) {
  switch (settingName) {
    case "high-contrast":
      settings.highContrast = next;
      break;
    case "reduce-motion":
      settings.reducedMotion = next;
      break;
    case "simple-mode":
      settings.simpleMode = next;
      break;
    case "dark-mode":
      settings.darkMode = next;
      break;
    default:
      break;
  }
}

function getToggleLabel(settingName, isActive) {
  const meta = SETTINGS_META[settingName];
  return isActive ? meta.onLabel : meta.offLabel;
}

function applyToggle(settingName, shouldAnnounce = false) {
  const meta = SETTINGS_META[settingName];
  const isActive = getSettingState(settingName);

  body.classList.toggle(meta.className, isActive);
  savePreference(meta.storageKey, isActive);

  panelToggles.forEach((button) => {
    if (button.dataset.settingToggle !== settingName) return;
    button.setAttribute("aria-pressed", String(isActive));

    if (button.classList.contains("btn")) {
      button.textContent = getToggleLabel(settingName, isActive);
    }
  });

  if (shouldAnnounce) {
    announce(isActive ? meta.onMessage : meta.offMessage);
  }
}

function toggleSetting(settingName) {
  setSettingState(settingName, !getSettingState(settingName));
  applyToggle(settingName, true);
}

function applyAllSettings() {
  applyFontScale();
  Object.keys(SETTINGS_META).forEach((settingName) => applyToggle(settingName, false));
}

function updateShortcutHints() {
  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);

  if (shortcutHint) {
    shortcutHint.innerHTML = isMac
      ? "<kbd>⌥</kbd>/<kbd>⌘</kbd> + <kbd>1</kbd> về đầu trang, <kbd>⌥</kbd>/<kbd>⌘</kbd> + <kbd>M</kbd> tới nội dung chính."
      : "<kbd>Alt</kbd> + <kbd>1</kbd> về đầu trang, <kbd>Alt</kbd> + <kbd>M</kbd> tới nội dung chính.";
  }

  if (keyboardHelperHint) {
    keyboardHelperHint.innerHTML = isMac
      ? "Thử dùng phím <kbd>Tab</kbd> để di chuyển và <kbd>⌥</kbd>/<kbd>⌘</kbd> + <kbd>M</kbd> để tới nội dung chính."
      : "Thử dùng phím <kbd>Tab</kbd> để di chuyển và <kbd>Alt</kbd> + <kbd>M</kbd> để tới nội dung chính.";
  }

  if (keytipHint) {
    keytipHint.innerHTML = isMac
      ? "Nhấn <kbd>⌥ Option</kbd> để hiện phím truy cập trên thanh điều hướng, rồi bấm chữ tương ứng."
      : "Nhấn <kbd>Alt</kbd> để hiện phím truy cập trên thanh điều hướng, rồi bấm chữ tương ứng.";
  }
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
    if (element.querySelector(".keytip-badge")) return;
    const keytip = element.dataset.keytip;
    if (!keytip) return;

    const badge = document.createElement("span");
    badge.className = "keytip-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.textContent = keytip;
    element.appendChild(badge);
  });
  keytipModeActive = true;
  announce("Đã hiện phím truy cập nhanh trên thanh điều hướng.");
}

function toggleKeytips() {
  if (keytipModeActive) {
    hideKeytips();
  } else {
    showKeytips();
  }
}

function activateKeytip(key) {
  const matchedTarget = keytipTargets.find(
    (element) => element.dataset.keytip?.toLowerCase() === key.toLowerCase()
  );

  if (!matchedTarget) return false;

  hideKeytips();
  matchedTarget.focus();

  const settingName = matchedTarget.dataset.settingToggle;
  if (settingName) {
    toggleSetting(settingName);
    return true;
  }

  if (matchedTarget.hasAttribute("data-panel-open")) {
    togglePanel(matchedTarget);
    return true;
  }

  matchedTarget.click();
  announce(`Đã mở mục ${matchedTarget.textContent.trim()}.`);
  return true;
}

function getKeytipValue(event) {
  if (event.code && /^Key[A-Z]$/.test(event.code)) {
    return event.code.slice(3).toLowerCase();
  }

  if (event.code && /^Digit[0-9]$/.test(event.code)) {
    return event.code.slice(5);
  }

  return event.key.toLowerCase();
}

function setHighContrastMode(isEnabled, shouldAnnounce = false) {
  setSettingState("high-contrast", isEnabled);
  applyToggle("high-contrast", shouldAnnounce);
}

function saveAccessProfile(profile) {
  savePreference(ACCESS_PROFILE_STORAGE_KEY, profile);
}

function loadAccessProfile() {
  return loadPreference(ACCESS_PROFILE_STORAGE_KEY, "");
}

function saveAccessOnboardingSeen(value) {
  try {
    sessionStorage.setItem(ACCESS_ONBOARDING_SEEN_STORAGE_KEY, JSON.stringify(value));
  } catch (_error) {
    // Ignore storage failures so the UI still works.
  }
}

function loadAccessOnboardingSeen() {
  try {
    const value = sessionStorage.getItem(ACCESS_ONBOARDING_SEEN_STORAGE_KEY);
    return value === null ? false : JSON.parse(value);
  } catch (_error) {
    return false;
  }
}

function setFontScalePreference(value) {
  settings.fontScale = clampFontScale(value);
  applyFontScale();
}

function resetAccessProfileSettings() {
  setFontScalePreference(DEFAULT_SETTINGS.fontScale);
  setSettingState("high-contrast", false);
  applyToggle("high-contrast", false);
  setSettingState("reduce-motion", false);
  applyToggle("reduce-motion", false);
  setSettingState("simple-mode", false);
  applyToggle("simple-mode", false);
}

function previewAccessProfile(profile, shouldAnnounce = false) {
  resetAccessProfileSettings();

  if (profile === "vision") {
    setHighContrastMode(true, shouldAnnounce);
    setFontScalePreference(125);
    return;
  }

  if (profile === "motor") {
    setSettingState("reduce-motion", true);
    applyToggle("reduce-motion", shouldAnnounce);
    return;
  }

  if (profile === "cognitive") {
    setSettingState("simple-mode", true);
    applyToggle("simple-mode", shouldAnnounce);
    setFontScalePreference(112.5);
    return;
  }

  if (profile === "mental") {
    setSettingState("reduce-motion", true);
    applyToggle("reduce-motion", false);
    setSettingState("simple-mode", true);
    applyToggle("simple-mode", shouldAnnounce);
    return;
  }

  if (profile === "hearing") {
    return;
  }

  if (profile === "default") return;
}

function applyAccessProfile(profile, shouldAnnounce = false) {
  previewAccessProfile(profile, shouldAnnounce);
  saveAccessProfile(profile);
}

function setSelectedAccessProfile(profile) {
  selectedAccessProfile = profile;

  accessOnboardingOptions.forEach((option) => {
    const isSelected = option.dataset.accessProfile === profile;
    option.setAttribute("aria-pressed", String(isSelected));
  });

  if (confirmOnboardingButton) {
    confirmOnboardingButton.disabled = !profile;
  }
}

function closeAccessOnboarding() {
  if (!accessOnboarding) return;
  accessOnboarding.hidden = true;
  body.classList.remove("has-modal-open");

  if (lastOnboardingTrigger && typeof lastOnboardingTrigger.focus === "function") {
    lastOnboardingTrigger.focus();
  }
}

function openAccessOnboarding() {
  if (!accessOnboarding) return;

  lastOnboardingTrigger = document.activeElement;
  accessOnboarding.hidden = false;
  body.classList.add("has-modal-open");

  const savedProfile = loadAccessProfile();
  setSelectedAccessProfile(savedProfile || "");

  const selectedOption = accessOnboardingOptions.find(
    (option) => option.dataset.accessProfile === selectedAccessProfile
  );
  const firstTarget = selectedOption || accessOnboardingOptions[0] || confirmOnboardingButton;

  if (firstTarget) {
    window.setTimeout(() => firstTarget.focus(), 30);
  }
}

function completeAccessOnboarding(profile, shouldAnnounce = true) {
  if (profile) {
    applyAccessProfile(profile, false);
    saveAccessProfile(profile);
  } else {
    saveAccessProfile("default");
  }

  saveAccessOnboardingSeen(true);
  closeAccessOnboarding();

  if (shouldAnnounce) {
    announce("Đã lưu lựa chọn hỗ trợ truy cập ban đầu. Bạn có thể đổi lại bất cứ lúc nào.");
  }
}

function initializeAccessOnboarding() {
  if (!accessOnboarding) return;

  accessOnboardingOptions.forEach((option) => {
    option.addEventListener("click", () => {
      setSelectedAccessProfile(option.dataset.accessProfile || "");
    });
  });

  if (confirmOnboardingButton) {
    confirmOnboardingButton.addEventListener("click", () => {
      if (!selectedAccessProfile) return;
      completeAccessOnboarding(selectedAccessProfile);
    });
  }

  if (skipOnboardingButton) {
    skipOnboardingButton.addEventListener("click", () => {
      completeAccessOnboarding("default");
    });
  }

  accessOnboarding.querySelectorAll("[data-onboarding-close]").forEach((element) => {
    element.addEventListener("click", () => {
      completeAccessOnboarding("default", false);
    });
  });

  if (!loadAccessOnboardingSeen()) {
    openAccessOnboarding();
  }
}

function getFocusableElements(container) {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  );
}

function openPanel(trigger) {
  if (!panel) return;
  lastPanelTrigger = trigger || document.activeElement;
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  panelOpenButtons.forEach((button) => button.setAttribute("aria-expanded", "true"));
  const focusables = getFocusableElements(panel);
  if (focusables[0]) focusables[0].focus();
  announce("Đã mở bảng điều khiển trợ năng.");
}

function closePanel() {
  if (!panel) return;
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  panelOpenButtons.forEach((button) => button.setAttribute("aria-expanded", "false"));
  if (lastPanelTrigger && typeof lastPanelTrigger.focus === "function") {
    lastPanelTrigger.focus();
  }
  announce("Đã đóng bảng điều khiển trợ năng.");
}

function togglePanel(trigger) {
  if (!panel) return;
  const isOpen = panel.classList.contains("is-open");
  if (isOpen) {
    closePanel();
  } else {
    openPanel(trigger);
  }
}

function openMobileNav(trigger) {
  if (!sideNav || !menuToggle || window.innerWidth > 992) return;
  lastMenuTrigger = trigger || document.activeElement;
  sideNav.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  if (mobileNavBackdrop) mobileNavBackdrop.hidden = false;
  const focusables = getFocusableElements(sideNav);
  if (focusables[0]) focusables[0].focus();
  announce("Đã mở sidebar điều hướng.");
}

function closeMobileNav() {
  if (!sideNav || !menuToggle) return;
  sideNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  if (mobileNavBackdrop) mobileNavBackdrop.hidden = true;
  if (lastMenuTrigger && typeof lastMenuTrigger.focus === "function") {
    lastMenuTrigger.focus();
  }
  announce("Đã đóng sidebar điều hướng.");
}

function toggleMobileNav(trigger) {
  if (!sideNav || !menuToggle || window.innerWidth > 992) return;
  if (sideNav.classList.contains("is-open")) {
    closeMobileNav();
  } else {
    openMobileNav(trigger);
  }
}

panelOpenButtons.forEach((button) => {
  button.addEventListener("click", () => togglePanel(button));
});

if (panelCloseButton) {
  panelCloseButton.addEventListener("click", closePanel);
}

document.addEventListener("click", (event) => {
  if (!panel || !panel.classList.contains("is-open")) return;
  const target = event.target;
  const clickedInsidePanel = panel.contains(target);
  const clickedOpenTrigger = Array.from(panelOpenButtons).some((button) => button.contains(target));
  if (!clickedInsidePanel && !clickedOpenTrigger) {
    closePanel();
  }
});

if (panel) {
  panel.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePanel();
      return;
    }

    if (event.key !== "Tab") return;

    const focusables = getFocusableElements(panel);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

panelToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const settingName = button.dataset.settingToggle;
    if (!settingName) return;
    toggleSetting(settingName);
  });
});

if (increaseFontButton) {
  increaseFontButton.addEventListener("click", () => {
    const currentIndex = FONT_SCALE_STEPS.indexOf(settings.fontScale);
    if (currentIndex < FONT_SCALE_STEPS.length - 1) {
      settings.fontScale = FONT_SCALE_STEPS[currentIndex + 1];
      applyFontScale();
      announce(`Cỡ chữ đã tăng lên ${settings.fontScale} phần trăm.`);
    }
  });
}

if (decreaseFontButton) {
  decreaseFontButton.addEventListener("click", () => {
    const currentIndex = FONT_SCALE_STEPS.indexOf(settings.fontScale);
    if (currentIndex > 0) {
      settings.fontScale = FONT_SCALE_STEPS[currentIndex - 1];
      applyFontScale();
      announce(`Cỡ chữ đã giảm còn ${settings.fontScale} phần trăm.`);
    }
  });
}

applyAllSettings();
updateShortcutHints();

const savedAccessProfile = loadAccessProfile();
if (
  savedAccessProfile === "vision" ||
  savedAccessProfile === "hearing" ||
  savedAccessProfile === "motor" ||
  savedAccessProfile === "cognitive" ||
  savedAccessProfile === "mental" ||
  savedAccessProfile === "default"
) {
  applyAccessProfile(savedAccessProfile, false);
}

initializeAccessOnboarding();

if (menuToggle && sideNav) {
  menuToggle.addEventListener("click", () => toggleMobileNav(menuToggle));

  sideNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        closeMobileNav();
      }
    });
  });
}

if (mobileNavBackdrop) {
  mobileNavBackdrop.addEventListener("click", closeMobileNav);
}

if (sideNav) {
  sideNav.addEventListener("keydown", (event) => {
    if (!sideNav.classList.contains("is-open") || event.key !== "Tab") return;
    const focusables = getFocusableElements(sideNav);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");

if (!body.classList.contains("reduce-motion") && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (ttsDemoButton) {
  const canSpeak = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";

  if (!canSpeak) {
    ttsDemoButton.disabled = true;
    ttsDemoButton.setAttribute("aria-disabled", "true");
    ttsDemoButton.textContent = "Trình duyệt chưa hỗ trợ đọc nội dung";
  } else {
    ttsDemoButton.addEventListener("click", () => {
      const isSpeaking = ttsDemoButton.getAttribute("aria-pressed") === "true";

      if (isSpeaking) {
        window.speechSynthesis.cancel();
        ttsDemoButton.setAttribute("aria-pressed", "false");
        ttsDemoButton.textContent = "Nghe mô tả D.O.S.E";
        announce("Đã dừng đọc mô tả.");
        return;
      }

      currentUtterance = new SpeechSynthesisUtterance(
        "D.O.S.E là nền tảng social tech accessibility first giúp người dùng học tập, tiếp cận công nghệ và kết nối cộng đồng bằng sự thấu cảm."
      );
      currentUtterance.lang = "vi-VN";
      currentUtterance.rate = 0.95;
      currentUtterance.pitch = 1;

      currentUtterance.onend = () => {
        ttsDemoButton.setAttribute("aria-pressed", "false");
        ttsDemoButton.textContent = "Nghe mô tả D.O.S.E";
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(currentUtterance);
      ttsDemoButton.setAttribute("aria-pressed", "true");
      ttsDemoButton.textContent = "Dừng đọc mô tả";
      announce("Đang đọc mô tả D.O.S.E.");
    });
  }
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

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = $("name");
    const email = $("email");
    const success = $("contactSuccess");

    const validName = setError(name, name.value.trim() ? "" : "Vui lòng nhập họ và tên.");
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    const validEmail = setError(email, emailValid ? "" : "Vui lòng nhập email hợp lệ.");

    if (!(validName && validEmail)) {
      success.textContent = "Biểu mẫu chưa gửi được. Vui lòng kiểm tra các trường đã đánh dấu.";
      const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      announce("Biểu mẫu có lỗi. Vui lòng kiểm tra các trường bắt buộc.");
      return;
    }

    success.textContent = "Đăng ký thành công. Cảm ơn bạn đã đồng hành cùng D.O.S.E.";
    contactForm.reset();
    announce("Đăng ký thành công.");
  });
}

document.addEventListener("keydown", (event) => {
  if (accessOnboarding && !accessOnboarding.hidden) {
    if (event.key === "Escape") {
      event.preventDefault();
      completeAccessOnboarding("default", false);
      return;
    }

    if (event.key === "Tab") {
      const focusables = getFocusableElements(accessOnboarding);
      if (focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
          return;
        }

        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
          return;
        }
      }
    }
  }

  if (event.key === "Alt" && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
    altKeyDown = true;
    const activeTag = document.activeElement?.tagName?.toLowerCase();
    const isTypingTarget = activeTag === "input" || activeTag === "textarea" || activeTag === "select";

    if (!isTypingTarget && !keytipModeActive) {
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

  const activeTag = document.activeElement?.tagName?.toLowerCase();
  const isTypingTarget = activeTag === "input" || activeTag === "textarea" || activeTag === "select";

  if (event.key === "Escape" && keytipModeActive) {
    event.preventDefault();
    hideKeytips();
    announce("Đã ẩn phím truy cập nhanh.");
    return;
  }

  if (event.key === "Escape" && panel && panel.classList.contains("is-open")) {
    event.preventDefault();
    closePanel();
    return;
  }

  if (event.key === "Escape" && sideNav && sideNav.classList.contains("is-open")) {
    event.preventDefault();
    closeMobileNav();
    return;
  }

  if (isTypingTarget) return;

  const key = event.key.toLowerCase();
  const usesShortcut = event.altKey || event.metaKey;

  if (!usesShortcut) return;

  if (key === "1") {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: body.classList.contains("reduce-motion") ? "auto" : "smooth" });
    announce("Đã chuyển về đầu trang.");
    return;
  }

  if (key === "m") {
    event.preventDefault();
    const main = $("main-content");
    if (main) {
      main.focus();
      announce("Đã chuyển tới vùng nội dung chính.");
    }
    return;
  }

  if (key === "a") {
    event.preventDefault();
    togglePanel(document.activeElement);
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

window.addEventListener("resize", () => {
  if (window.innerWidth > 992 && sideNav && sideNav.classList.contains("is-open")) {
    sideNav.classList.remove("is-open");
    if (mobileNavBackdrop) mobileNavBackdrop.hidden = true;
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  }
});

// Chat Box Logic
const floatingChatButton = $("floatingChatButton");
const chatBoxContainer = $("chatBoxContainer");
const closeChatButton = $("closeChatButton");
const chatInput = $("chatInput");
const sendChatButton = $("sendChatButton");
const chatMessages = $("chatMessages");

let chatHistory = [];

if (floatingChatButton && chatBoxContainer) {
  floatingChatButton.addEventListener("click", () => {
    chatBoxContainer.hidden = false;
    floatingChatButton.setAttribute("aria-expanded", "true");
    chatBoxContainer.setAttribute("aria-hidden", "false");
    chatInput.focus();
  });

  closeChatButton.addEventListener("click", () => {
    chatBoxContainer.hidden = true;
    floatingChatButton.setAttribute("aria-expanded", "false");
    chatBoxContainer.setAttribute("aria-hidden", "true");
    floatingChatButton.focus();
  });
}

function addMessageToUI(content, role) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${role}`;
  
  if (role.includes("user") || typeof marked === "undefined") {
    messageDiv.textContent = content;
  } else {
    // Parse Markdown to HTML for assistant messages
    messageDiv.innerHTML = marked.parse(content);
  }
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return messageDiv;
}

async function sendChatMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = "";
  chatInput.disabled = true;
  sendChatButton.disabled = true;

  addMessageToUI(text, "user");
  chatHistory.push({ role: "user", content: text });

  const loadingMsg = addMessageToUI("AI Mentor đang suy nghĩ...", "assistant loading");
  loadingMsg.classList.add("loading");

  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: chatHistory }),
    });

    const data = await response.json();
    chatMessages.removeChild(loadingMsg);

    if (data.success && data.message) {
      const assistantMessage = data.message;
      addMessageToUI(assistantMessage.content, "assistant");
      
      // Save assistant message to history, including reasoning_details if present
      chatHistory.push({
        role: "assistant",
        content: assistantMessage.content,
        reasoning_details: assistantMessage.reasoning_details
      });
    } else {
      addMessageToUI("Xin lỗi, đã có lỗi kết nối hoặc API key chưa được cấu hình đúng.", "assistant");
      chatHistory.pop(); // remove user message from history if failed
    }
  } catch (error) {
    chatMessages.removeChild(loadingMsg);
    addMessageToUI("Lỗi mạng: Không thể kết nối tới server. Vui lòng kiểm tra server Flask đã chạy chưa.", "assistant");
    chatHistory.pop();
  }

  chatInput.disabled = false;
  sendChatButton.disabled = false;
  chatInput.focus();
}

if (sendChatButton) {
  sendChatButton.addEventListener("click", sendChatMessage);
}

if (chatInput) {
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendChatMessage();
    }
  });
}
