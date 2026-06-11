import "../styles/tailwind.css";

type SidebarLink = {
  href: string;
  label: string;
  match: string;
  keytip?: string;
};

type SidebarGroup = {
  label: string;
  links: SidebarLink[];
};

type DisplaySetting = "high-contrast" | "reduce-motion" | "simple-mode";

type SettingMeta = {
  className: string;
  storageKey: string;
  onLabel: string;
  offLabel: string;
  onMessage: string;
  offMessage: string;
};

const FONT_SCALE_STEPS = [100, 112.5, 125, 150];
const SETTINGS_META: Record<DisplaySetting, SettingMeta> = {
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
    offLabel: "Chế độ đơn giản",
    onMessage: "Đã bật chế độ đơn giản.",
    offMessage: "Đã tắt chế độ đơn giản."
  }
};

(function () {
  const body = document.body;
  if (!body) return;

  function loadPreference<T>(key: string, fallback: T): T {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_error) {
      return fallback;
    }
  }

  function savePreference<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {
      // The visual setting still applies for this session if storage is blocked.
    }
  }

  function clampFontScale(value: number) {
    return FONT_SCALE_STEPS.includes(value) ? value : 100;
  }

  function applyStoredDisplayPreferences() {
    const fontScale = clampFontScale(loadPreference("dose-font-scale", 100));
    const highContrast = loadPreference(SETTINGS_META["high-contrast"].storageKey, false);
    const reducedMotion = loadPreference(SETTINGS_META["reduce-motion"].storageKey, false);
    const simpleMode = loadPreference(SETTINGS_META["simple-mode"].storageKey, false);

    document.documentElement.style.setProperty("--font-scale-custom", `${fontScale}%`);
    document.documentElement.style.setProperty("--font-scale", `${fontScale}%`);
    body.style.setProperty("--font-scale-custom", `${fontScale}%`);
    document.documentElement.classList.toggle("large-text", fontScale > 100);
    body.classList.toggle("large-text", fontScale > 100);
    body.classList.toggle("high-contrast", Boolean(highContrast));
    body.classList.toggle("reduce-motion", Boolean(reducedMotion));
    body.classList.toggle("simple-mode", Boolean(simpleMode));
  }

  applyStoredDisplayPreferences();

  function getSetting(setting: DisplaySetting) {
    return loadPreference(SETTINGS_META[setting].storageKey, false);
  }

  function setSetting(setting: DisplaySetting, value: boolean) {
    const meta = SETTINGS_META[setting];
    body.classList.toggle(meta.className, value);
    savePreference(meta.storageKey, value);
  }

  function syncGlobalControls() {
    (Object.keys(SETTINGS_META) as DisplaySetting[]).forEach((setting) => {
      const isActive = getSetting(setting);
      const meta = SETTINGS_META[setting];
      document.querySelectorAll<HTMLButtonElement>(`[data-global-setting-toggle="${setting}"]`).forEach((button) => {
        button.setAttribute("aria-pressed", String(isActive));
        if (button.classList.contains("btn")) {
          button.textContent = isActive ? meta.onLabel : meta.offLabel;
        }
      });
    });

    const fontScale = clampFontScale(loadPreference("dose-font-scale", 100));
    const status = document.getElementById("globalFontSizeStatus") as HTMLOutputElement | null;
    const increase = document.getElementById("globalIncreaseFontButton") as HTMLButtonElement | null;
    const decrease = document.getElementById("globalDecreaseFontButton") as HTMLButtonElement | null;
    if (status) {
      status.value = `${fontScale}%`;
      status.textContent = `${fontScale}%`;
    }
    if (increase) increase.disabled = fontScale === FONT_SCALE_STEPS[FONT_SCALE_STEPS.length - 1];
    if (decrease) decrease.disabled = fontScale === FONT_SCALE_STEPS[0];
  }

  function applyFontScale(value: number) {
    const fontScale = clampFontScale(value);
    document.documentElement.style.setProperty("--font-scale", `${fontScale}%`);
    document.documentElement.style.setProperty("--font-scale-custom", `${fontScale}%`);
    body.style.setProperty("--font-scale-custom", `${fontScale}%`);
    document.documentElement.classList.toggle("large-text", fontScale > 100);
    body.classList.toggle("large-text", fontScale > 100);
    savePreference("dose-font-scale", fontScale);
    syncGlobalControls();
  }

  function createGlobalAccessibilityControls() {
    if (document.getElementById("accessibilityPanel")) return;

    const liveRegion = document.getElementById("sidebarLiveRegion");
    const floatingButton = document.createElement("button");
    floatingButton.id = "floatingA11yButton";
    floatingButton.className = "floating-a11y-button";
    floatingButton.type = "button";
    floatingButton.setAttribute("aria-label", "Mở bảng điều khiển trợ năng");
    floatingButton.setAttribute("aria-controls", "accessibilityPanel");
    floatingButton.setAttribute("aria-expanded", "false");
    floatingButton.innerHTML = '<span aria-hidden="true">Hỗ trợ</span>';

    const panel = document.createElement("aside");
    panel.id = "accessibilityPanel";
    panel.className = "accessibility-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "accessibilityPanelTitle");
    panel.setAttribute("aria-describedby", "accessibilityPanelDescription");
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML = `
      <div class="panel-shell">
        <div class="panel-head">
          <div>
            <p class="panel-label">Điều khiển trợ năng</p>
            <h2 id="accessibilityPanelTitle">Bảng điều khiển trợ năng</h2>
            <p id="accessibilityPanelDescription" class="helper-text">
              Các tùy chọn này hoạt động xuyên toàn bộ website và được lưu trên thiết bị này.
            </p>
          </div>
          <button id="accessibilityPanelClose" class="btn btn-ghost btn-sm" type="button" aria-label="Đóng bảng trợ năng">Đóng</button>
        </div>

        <div class="panel-section">
          <div class="setting-row">
            <div>
              <h3 class="setting-title">Cỡ chữ</h3>
              <p class="helper-text">Tăng hoặc giảm cỡ chữ toàn trang.</p>
            </div>
            <div class="font-controls" role="group" aria-label="Điều chỉnh cỡ chữ">
              <button id="globalDecreaseFontButton" class="btn btn-outline btn-sm" type="button" aria-label="Giảm cỡ chữ">A-</button>
              <output id="globalFontSizeStatus" class="font-status" aria-live="polite">100%</output>
              <button id="globalIncreaseFontButton" class="btn btn-outline btn-sm" type="button" aria-label="Tăng cỡ chữ">A+</button>
            </div>
          </div>
        </div>

        <div class="panel-section settings-grid" role="group" aria-label="Tùy chọn hiển thị">
          <button type="button" class="setting-toggle" data-global-setting-toggle="high-contrast" aria-pressed="false">
            <span class="setting-copy">
              <span class="setting-title">Tương phản cao</span>
              <span class="helper-text">Nền sáng rõ, chữ đen, vùng bấm có viền mạnh.</span>
            </span>
            <span class="toggle-indicator" aria-hidden="true"></span>
          </button>
          <button type="button" class="setting-toggle" data-global-setting-toggle="reduce-motion" aria-pressed="false">
            <span class="setting-copy">
              <span class="setting-title">Giảm chuyển động</span>
              <span class="helper-text">Hạn chế animation và hiệu ứng chuyển cảnh.</span>
            </span>
            <span class="toggle-indicator" aria-hidden="true"></span>
          </button>
          <button type="button" class="setting-toggle" data-global-setting-toggle="simple-mode" aria-pressed="false">
            <span class="setting-copy">
              <span class="setting-title">Chế độ đơn giản</span>
              <span class="helper-text">Giảm nhiễu thị giác và giữ bố cục dễ đọc hơn.</span>
            </span>
            <span class="toggle-indicator" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    `;

    body.append(floatingButton, panel);

    function announceGlobal(message: string) {
      if (!liveRegion) return;
      liveRegion.textContent = "";
      window.setTimeout(() => {
        liveRegion.textContent = message;
      }, 30);
    }

    function openPanel() {
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      floatingButton.setAttribute("aria-expanded", "true");
    }

    function closePanel() {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      floatingButton.setAttribute("aria-expanded", "false");
      floatingButton.focus();
    }

    floatingButton.addEventListener("click", () => {
      if (panel.classList.contains("is-open")) {
        closePanel();
      } else {
        openPanel();
      }
    });

    panel.querySelector<HTMLButtonElement>("#accessibilityPanelClose")?.addEventListener("click", closePanel);

    panel.querySelectorAll<HTMLButtonElement>("[data-global-setting-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const setting = button.dataset.globalSettingToggle as DisplaySetting | undefined;
        if (!setting || !(setting in SETTINGS_META)) return;
        const next = !getSetting(setting);
        setSetting(setting, next);
        syncGlobalControls();
        announceGlobal(next ? SETTINGS_META[setting].onMessage : SETTINGS_META[setting].offMessage);
      });
    });

    panel.querySelector<HTMLButtonElement>("#globalIncreaseFontButton")?.addEventListener("click", () => {
      const current = clampFontScale(loadPreference("dose-font-scale", 100));
      const index = FONT_SCALE_STEPS.indexOf(current);
      if (index < FONT_SCALE_STEPS.length - 1) {
        applyFontScale(FONT_SCALE_STEPS[index + 1]);
        announceGlobal(`Cỡ chữ đã tăng lên ${FONT_SCALE_STEPS[index + 1]} phần trăm.`);
      }
    });

    panel.querySelector<HTMLButtonElement>("#globalDecreaseFontButton")?.addEventListener("click", () => {
      const current = clampFontScale(loadPreference("dose-font-scale", 100));
      const index = FONT_SCALE_STEPS.indexOf(current);
      if (index > 0) {
        applyFontScale(FONT_SCALE_STEPS[index - 1]);
        announceGlobal(`Cỡ chữ đã giảm còn ${FONT_SCALE_STEPS[index - 1]} phần trăm.`);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && panel.classList.contains("is-open")) {
        event.preventDefault();
        closePanel();
      }
    });
  }

  const currentPage = window.location.hash.match(/^#\/[^?]+/)?.[0] || "#/home";
  const currentHash = window.location.hash || "";
  const isHomePage = currentPage === "#/home";
  const homeHref = "#/home";
  const moduleHref = (page: string) => page;
  const shortcutLabel = (() => {
    const isMac =
      typeof navigator !== "undefined" &&
      /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
    return isMac ? "⌥ Option" : "Alt";
  })();

  let sidebarLiveRegion = document.getElementById("sidebarLiveRegion") as HTMLElement | null;
  if (!sidebarLiveRegion) {
    sidebarLiveRegion = document.createElement("div");
    sidebarLiveRegion.id = "sidebarLiveRegion";
    sidebarLiveRegion.className = "sr-only";
    sidebarLiveRegion.setAttribute("aria-live", "polite");
    sidebarLiveRegion.setAttribute("aria-atomic", "true");
    body.prepend(sidebarLiveRegion);
  }

  function announce(message: string) {
    if (!sidebarLiveRegion) return;
    sidebarLiveRegion.textContent = "";
    window.setTimeout(() => {
      sidebarLiveRegion.textContent = message;
    }, 30);
  }

  createGlobalAccessibilityControls();
  syncGlobalControls();

  const groups: SidebarGroup[] = currentPage === "#/dashboard"
    ? [
      {
        label: "Bảng điều khiển",
        links: [
          { href: "#continue-learning", label: "Tiếp tục học", match: "#/dashboard", keytip: "T" },
          { href: "#progress", label: "Tiến độ", match: "#/dashboard", keytip: "P" },
          { href: "#ai-mentor", label: "Trợ lý AI", match: "#/dashboard", keytip: "I" },
          { href: "#recommended", label: "Bài học gợi ý", match: "#/dashboard", keytip: "G" },
          { href: "#community", label: "Bảng tin cộng đồng", match: "#/dashboard", keytip: "C" }
        ]
      },
      {
        label: "Các phân hệ",
        links: [
          { href: moduleHref("#/access"), label: "Tiếp cận", match: "#/access", keytip: "A" },
          { href: moduleHref("#/education"), label: "Giáo dục", match: "#/education", keytip: "E" },
          { href: moduleHref("#/opportunity"), label: "Cơ hội", match: "#/opportunity", keytip: "O" },
          { href: moduleHref("#/humanity"), label: "Nhân văn", match: "#/humanity", keytip: "H" }
        ]
      },
      {
        label: "Luồng trải nghiệm",
        links: [
          { href: moduleHref("#/auth"), label: "Xác thực", match: "#/auth", keytip: "X" },
          { href: moduleHref("#/onboarding"), label: "Thiết lập ban đầu", match: "#/onboarding", keytip: "L" },
          { href: moduleHref("#/dashboard"), label: "Bảng điều khiển", match: "#/dashboard", keytip: "B" }
        ]
      },
      {
        label: "Học theo nhu cầu",
        links: [
          { href: moduleHref("#/education-disability"), label: "Hồ sơ người khuyết tật", match: "#/education-disability", keytip: "R" },
          { href: moduleHref("#/education-community"), label: "Học cho cộng đồng", match: "#/education-community", keytip: "D" },
          { href: moduleHref("#/disability-vision"), label: "Khiếm thị", match: "#/disability-vision", keytip: "V" },
          { href: moduleHref("#/disability-hearing"), label: "Khiếm thính", match: "#/disability-hearing", keytip: "K" },
          { href: moduleHref("#/disability-mobility"), label: "Khó vận động", match: "#/disability-mobility", keytip: "U" },
          { href: moduleHref("#/disability-cognitive"), label: "Nhận thức và học tập", match: "#/disability-cognitive", keytip: "N" },
          { href: moduleHref("#/disability-mental"), label: "Sức khỏe tinh thần", match: "#/disability-mental", keytip: "Z" }
        ]
      }
    ]
    : [
      {
        label: "Các phân hệ",
        links: [
          { href: moduleHref("#/access"), label: "Tiếp cận", match: "#/access", keytip: "A" },
          { href: moduleHref("#/education"), label: "Giáo dục", match: "#/education", keytip: "E" },
          { href: moduleHref("#/opportunity"), label: "Cơ hội", match: "#/opportunity", keytip: "O" },
          { href: moduleHref("#/humanity"), label: "Nhân văn", match: "#/humanity", keytip: "H" }
        ]
      },
      {
        label: "Luồng trải nghiệm",
        links: [
          { href: moduleHref("#/auth"), label: "Xác thực", match: "#/auth", keytip: "X" },
          { href: moduleHref("#/onboarding"), label: "Thiết lập ban đầu", match: "#/onboarding", keytip: "L" },
          { href: moduleHref("#/dashboard"), label: "Bảng điều khiển", match: "#/dashboard", keytip: "B" }
        ]
      },
      {
        label: "Học theo nhu cầu",
        links: [
          { href: moduleHref("#/education-disability"), label: "Hồ sơ người khuyết tật", match: "#/education-disability", keytip: "R" },
          { href: moduleHref("#/education-community"), label: "Học cho cộng đồng", match: "#/education-community", keytip: "D" },
          { href: moduleHref("#/disability-vision"), label: "Khiếm thị", match: "#/disability-vision", keytip: "V" },
          { href: moduleHref("#/disability-hearing"), label: "Khiếm thính", match: "#/disability-hearing", keytip: "K" },
          { href: moduleHref("#/disability-mobility"), label: "Khó vận động", match: "#/disability-mobility", keytip: "U" },
          { href: moduleHref("#/disability-cognitive"), label: "Nhận thức và học tập", match: "#/disability-cognitive", keytip: "N" },
          { href: moduleHref("#/disability-mental"), label: "Sức khỏe tinh thần", match: "#/disability-mental", keytip: "Z" }
        ]
      }
    ];

  function isCurrent(link: SidebarLink) {
    if (currentPage !== link.match) return false;
    if (currentPage === "#/dashboard" && !link.href.startsWith("#")) return false;
    if (!link.href.startsWith("#")) return true;
    return currentHash ? link.href === currentHash : link.href === "#continue-learning";
  }

  function setCurrentSidebarLink(targetLink: HTMLAnchorElement) {
    sidebar.querySelectorAll<HTMLAnchorElement>(".sidebar-link[aria-current]").forEach((link) => {
      link.removeAttribute("aria-current");
    });
    targetLink.setAttribute("aria-current", "page");
  }

  function keepCurrentSidebarItemInView(behavior: ScrollBehavior = "auto") {
    const currentLink = sidebar.querySelector<HTMLAnchorElement>('.sidebar-link[aria-current="page"]');
    if (!currentLink) return;
    window.requestAnimationFrame(() => {
      currentLink.scrollIntoView({ block: "center", inline: "nearest", behavior });
    });
  }

  function getSidebarScrollKey() {
    return `dose-sidebar-scroll:${currentPage}`;
  }

  function restoreSidebarScroll() {
    const saved = loadPreference<number>(getSidebarScrollKey(), -1);
    if (saved < 0 || !sidebarInner) {
      keepCurrentSidebarItemInView();
      return;
    }

    sidebarInner.scrollTop = saved;
  }

  function persistSidebarScroll() {
    if (!sidebarInner) return;
    savePreference(getSidebarScrollKey(), sidebarInner.scrollTop);
  }

  function linkMarkup(link: SidebarLink) {
    const currentAttr = isCurrent(link) ? ' aria-current="page"' : "";
    const keytipAttr = link.keytip ? ` data-keytip="${link.keytip}"` : "";
    const shortcutAttr = link.keytip ? ` aria-keyshortcuts="Alt+${link.keytip.toUpperCase()}"` : "";
    return `
        <li>
          <a class="sidebar-link" href="${link.href}"${currentAttr}${keytipAttr}${shortcutAttr}>
            ${link.label}
          </a>
        </li>
      `;
  }

  const sidebar = document.createElement("aside");
  sidebar.id = "sideNav";
  sidebar.className = "sidebar";
  sidebar.setAttribute("aria-label", "Sidebar điều hướng");
  sidebar.innerHTML = `
      <div class="sidebar-inner">
        <a
          class="brand brand-sidebar"
          href="${homeHref}"
          aria-label="D.O.S.E trang chủ"
          data-keytip="D"
          aria-keyshortcuts="Alt+D"
        >
          <span class="brand-mark" aria-hidden="true">D</span>
          <span class="brand-copy">
            <span class="brand-name">D.O.S.E</span>
            <span class="brand-tag">Một liều của sự Nhân văn</span>
          </span>
        </a>
        ${groups
      .map(
        (group) => `
              <nav class="sidebar-nav" aria-label="${group.label}">
                <p class="sidebar-label">${group.label}</p>
                <ul class="sidebar-list">
                  ${group.links.map((link) => linkMarkup(link)).join("")}
                </ul>
              </nav>
            `
      )
      .join("")}
      </div>
    `;

  const appShell = document.querySelector(".app-shell");
  const existingSideNav = document.getElementById("sideNav");
  if (existingSideNav) {
    existingSideNav.replaceWith(sidebar);
  } else if (appShell) {
    appShell.prepend(sidebar);
  } else {
    body.prepend(sidebar);
  }

  const sidebarInner = sidebar.querySelector<HTMLElement>(".sidebar-inner");
  restoreSidebarScroll();
  if (sidebarInner) {
    sidebarInner.addEventListener("scroll", () => {
      persistSidebarScroll();
    });
  }

  let backdrop = document.getElementById("mobileNavBackdrop") as HTMLElement | null;
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "mobileNavBackdrop";
    backdrop.className = "global-sidebar-backdrop";
    backdrop.hidden = true;
    body.prepend(backdrop);
  }

  let toggle = document.getElementById("menuToggle") as HTMLButtonElement | null;
  if (!toggle && !appShell) {
    toggle = document.createElement("button");
    toggle.type = "button";
    toggle.id = "menuToggle";
    toggle.className = "global-sidebar-toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "sideNav");
    toggle.setAttribute("aria-label", "Mở hoặc đóng sidebar");
    toggle.innerHTML = "<span aria-hidden=\"true\">Menu</span>";
    body.prepend(toggle);
  }

  if (!appShell && toggle) {
    function openSidebar() {
      sidebar.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      backdrop.hidden = false;
    }

    function closeSidebar() {
      sidebar.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      backdrop.hidden = true;
    }

    if (!toggle.dataset.sidebarBound) {
      toggle.dataset.sidebarBound = "true";
      toggle.addEventListener("click", () => {
        if (sidebar.classList.contains("is-open")) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }

    if (!backdrop.dataset.sidebarBound) {
      backdrop.dataset.sidebarBound = "true";
      backdrop.addEventListener("click", closeSidebar);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        closeSidebar();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
        closeSidebar();
      }
    });
  }

  if (!appShell) {
    body.classList.add("has-global-sidebar");
  }

  {
    const keytipTargets = Array.from(sidebar.querySelectorAll<HTMLElement>("[data-keytip]"));
    let keytipModeActive = false;
    let optionKeyDown = false;

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
      announce(`Đã hiện phím truy cập nhanh trong sidebar. Nhấn phím tương ứng sau khi bấm ${shortcutLabel}.`);
    }

    function getKeytipValue(event: KeyboardEvent) {
      if (event.code && /^Key[A-Z]$/.test(event.code)) {
        return event.code.slice(3).toLowerCase();
      }

      if (event.code && /^Digit[0-9]$/.test(event.code)) {
        return event.code.slice(5);
      }

      return (event.key || "").toLowerCase();
    }

    function activateKeytip(key: string) {
      const matchedTarget = keytipTargets.find(
        (element) => element.dataset.keytip?.toLowerCase() === key.toLowerCase()
      );

      if (!matchedTarget) return false;

      hideKeytips();
      optionKeyDown = false;
      matchedTarget.focus();
      matchedTarget.click();
      announce(`Đã mở ${matchedTarget.textContent.trim()}.`);
      return true;
    }

    document.addEventListener("keydown", (event) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isTypingTarget = activeTag === "input" || activeTag === "textarea" || activeTag === "select";

      if ((event.code === "AltLeft" || event.code === "AltRight") && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
        optionKeyDown = true;
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

      if (event.key === "Escape" && keytipModeActive) {
        event.preventDefault();
        hideKeytips();
        optionKeyDown = false;
        announce("Đã ẩn phím truy cập nhanh trong sidebar.");
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.code !== "AltLeft" && event.code !== "AltRight") return;
      optionKeyDown = false;
    });

    document.addEventListener("click", () => {
      if (!keytipModeActive) return;
      hideKeytips();
      optionKeyDown = false;
    });
  }

  sidebar.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
    link.addEventListener("click", () => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("#")) {
        setCurrentSidebarLink(link);
        keepCurrentSidebarItemInView("smooth");
      }

      if (!appShell && window.innerWidth <= 992 && sidebar.classList.contains("is-open")) {
        sidebar.classList.remove("is-open");
        if (backdrop) backdrop.hidden = true;
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
})();

/* ──────────────────────────────────────────────────────────────────
   GLOBAL CHAT WIDGET
   Appears on every page. Hidden by default (CSS: display:none).
   Clicking the chat button toggles the panel open/closed.
────────────────────────────────────────────────────────────────── */
(function initChatWidget() {
  if (document.getElementById("globalChatWidget")) return;

  // ── Button ─────────────────────────────────────────────────────
  const chatBtn = document.createElement("button");
  chatBtn.id = "globalChatBtn";
  chatBtn.className = "chat-fab";
  chatBtn.type = "button";
  chatBtn.setAttribute("aria-label", "Mở hộp trò chuyện");
  chatBtn.setAttribute("aria-expanded", "false");
  chatBtn.setAttribute("aria-controls", "globalChatPanel");
  chatBtn.innerHTML = `
    <span class="chat-fab__icon" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </span>
    <span class="chat-fab__label">Chat</span>
  `;

  // ── Panel ───────────────────────────────────────────────────────
  const chatPanel = document.createElement("aside");
  chatPanel.id = "globalChatPanel";
  chatPanel.className = "chat-panel";
  chatPanel.setAttribute("role", "dialog");
  chatPanel.setAttribute("aria-modal", "false");
  chatPanel.setAttribute("aria-label", "Hộp trò chuyện");
  chatPanel.setAttribute("hidden", "");
  chatPanel.innerHTML = `
    <div class="chat-panel__header">
      <div class="chat-panel__header-brand">
        <span class="chat-panel__avatar" aria-hidden="true">D</span>
        <div>
          <strong class="chat-panel__title">D.O.S.E Hỗ trợ</strong>
          <span class="chat-panel__status">
            <span class="chat-panel__dot" aria-hidden="true"></span>Trực tuyến
          </span>
        </div>
      </div>
      <button id="chatCloseBtn" class="chat-panel__close" type="button" aria-label="Đóng hộp trò chuyện">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="chat-panel__messages" id="chatMessages" role="log" aria-live="polite" aria-label="Tin nhắn">
      <div class="chat-msg chat-msg--bot">
        <span class="chat-msg__bubble">
          Xin chào! Tôi là trợ lý D.O.S.E. Bạn cần hỗ trợ gì về truy cập thông tin, giáo dục hay cơ hội học tập? 😊
        </span>
      </div>
    </div>
    <form class="chat-panel__input-area" id="chatForm" autocomplete="off" novalidate>
      <label class="sr-only" for="chatInput">Nhập tin nhắn</label>
      <input
        id="chatInput"
        class="chat-panel__input"
        type="text"
        placeholder="Nhập tin nhắn…"
        maxlength="500"
        autocomplete="off"
        spellcheck="false"
      />
      <button class="chat-panel__send" type="submit" aria-label="Gửi tin nhắn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </form>
  `;

  // ── Wrapper ─────────────────────────────────────────────────────
  const widget = document.createElement("div");
  widget.id = "globalChatWidget";
  widget.className = "chat-widget";
  widget.appendChild(chatPanel);
  widget.appendChild(chatBtn);
  document.body.appendChild(widget);

  // ── Logic ───────────────────────────────────────────────────────
  let chatOpen = false;

  function openChat() {
    chatOpen = true;
    chatPanel.removeAttribute("hidden");
    chatBtn.setAttribute("aria-expanded", "true");
    chatBtn.classList.add("is-active");
    const input = document.getElementById("chatInput") as HTMLInputElement | null;
    if (input) setTimeout(() => input.focus(), 60);
  }

  function closeChat() {
    chatOpen = false;
    chatPanel.setAttribute("hidden", "");
    chatBtn.setAttribute("aria-expanded", "false");
    chatBtn.classList.remove("is-active");
    chatBtn.focus();
  }

  chatBtn.addEventListener("click", () => {
    chatOpen ? closeChat() : openChat();
  });

  const closeBtn = document.getElementById("chatCloseBtn");
  if (closeBtn) closeBtn.addEventListener("click", closeChat);

  // Close on Escape
  chatPanel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeChat();
  });

  // Simple bot reply
  const chatForm = document.getElementById("chatForm") as HTMLFormElement | null;
  const messagesEl = document.getElementById("chatMessages");
  const botReplies = [
    "Tôi hiểu. Hãy cho tôi biết thêm về nhu cầu của bạn nhé!",
    "D.O.S.E luôn sẵn sàng hỗ trợ bạn tiếp cận thông tin phù hợp.",
    "Bạn có thể xem mục 'Tiếp cận' để tìm giải pháp hỗ trợ kỹ thuật.",
    "Hãy thử khám phá phần 'Hồ sơ người khuyết tật' để có trải nghiệm cá nhân hóa hơn.",
    "Cảm ơn bạn đã chia sẻ. Chúng tôi sẽ cải thiện D.O.S.E dựa trên phản hồi của bạn!"
  ];
  let botReplyIdx = 0;

  function addMessage(text: string, role: "user" | "bot") {
    if (!messagesEl) return;
    const div = document.createElement("div");
    div.className = `chat-msg chat-msg--${role}`;
    const bubble = document.createElement("span");
    bubble.className = "chat-msg__bubble";
    bubble.textContent = text;
    div.appendChild(bubble);
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("chatInput") as HTMLInputElement | null;
      if (!input) return;
      const text = input.value.trim();
      if (!text) return;
      addMessage(text, "user");
      input.value = "";
      // Simulated bot reply after short delay
      setTimeout(() => {
        addMessage(botReplies[botReplyIdx % botReplies.length], "bot");
        botReplyIdx++;
      }, 600);
    });
  }
})();

// end sidebar.ts
