(function () {
  const body = document.body;
  if (!body) return;

  function loadPreference(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (_error) {
      return fallback;
    }
  }

  function applyStoredDisplayPreferences() {
    const fontScale = loadPreference("dose-font-scale", 100);
    const highContrast = loadPreference("dose-high-contrast", false);
    const reducedMotion = loadPreference("dose-reduce-motion", false);
    const simpleMode = loadPreference("dose-simple-mode", false);

    document.documentElement.style.setProperty("--font-scale-custom", `${fontScale}%`);
    body.style.setProperty("--font-scale-custom", `${fontScale}%`);
    document.documentElement.classList.toggle("large-text", fontScale > 100);
    body.classList.toggle("large-text", fontScale > 100);
    body.classList.toggle("high-contrast", Boolean(highContrast));
    body.classList.toggle("reduce-motion", Boolean(reducedMotion));
    body.classList.toggle("simple-mode", Boolean(simpleMode));
  }

  applyStoredDisplayPreferences();

  const currentPath = window.location.pathname.split("/").pop() || "home.html";
  const currentPage = currentPath === "" ? "home.html" : currentPath;
  const currentHash = window.location.hash || "";
  const isPagesPath = window.location.pathname.includes("/pages/");
  const isHomePage = currentPage === "home.html";
  const homeHref = isPagesPath ? "home.html" : "pages/home.html";
  const moduleHref = (page) => (isPagesPath ? page : `pages/${page}`);
    const shortcutLabel = (() => {
      const isMac =
        typeof navigator !== "undefined" &&
        /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
      return isMac ? "⌥ Option" : "Alt";
    })();

    let sidebarLiveRegion = document.getElementById("sidebarLiveRegion");
    if (!sidebarLiveRegion) {
      sidebarLiveRegion = document.createElement("div");
      sidebarLiveRegion.id = "sidebarLiveRegion";
      sidebarLiveRegion.className = "sr-only";
      sidebarLiveRegion.setAttribute("aria-live", "polite");
      sidebarLiveRegion.setAttribute("aria-atomic", "true");
      body.prepend(sidebarLiveRegion);
    }

    function announce(message) {
      if (!sidebarLiveRegion) return;
      sidebarLiveRegion.textContent = "";
      window.setTimeout(() => {
        sidebarLiveRegion.textContent = message;
      }, 30);
    }

    const groups = currentPage === "dashboard.html"
      ? [
          {
            label: "Bảng điều khiển",
            links: [
              { href: "#continue-learning", label: "Tiếp tục học", match: "dashboard.html", keytip: "T" },
              { href: "#progress", label: "Tiến độ", match: "dashboard.html", keytip: "P" },
              { href: "#ai-mentor", label: "Trợ lý AI", match: "dashboard.html", keytip: "I" },
              { href: "#recommended", label: "Bài học gợi ý", match: "dashboard.html", keytip: "G" },
              { href: "#community", label: "Bảng tin cộng đồng", match: "dashboard.html", keytip: "C" }
            ]
          },
          {
            label: "Modules",
            links: [
              { href: moduleHref("access.html"), label: "Access", match: "access.html", keytip: "A" },
              { href: moduleHref("education.html"), label: "Education", match: "education.html", keytip: "E" },
              { href: moduleHref("opportunity.html"), label: "Opportunity", match: "opportunity.html", keytip: "O" },
              { href: moduleHref("humanity.html"), label: "Humanity", match: "humanity.html", keytip: "H" }
            ]
          },
          {
            label: "Luồng trải nghiệm",
            links: [
              { href: moduleHref("auth.html"), label: "Xác thực", match: "auth.html", keytip: "X" },
              { href: moduleHref("onboarding.html"), label: "Thiết lập ban đầu", match: "onboarding.html", keytip: "L" },
              { href: moduleHref("dashboard.html"), label: "Bảng điều khiển", match: "dashboard.html", keytip: "B" }
            ]
          },
          {
            label: "Học theo nhu cầu",
            links: [
              { href: moduleHref("education-disability.html"), label: "Hồ sơ người khuyết tật", match: "education-disability.html", keytip: "R" },
              { href: moduleHref("education-community.html"), label: "Học cho cộng đồng", match: "education-community.html", keytip: "D" },
              { href: moduleHref("disability-vision.html"), label: "Khiếm thị", match: "disability-vision.html", keytip: "V" },
              { href: moduleHref("disability-hearing.html"), label: "Khiếm thính", match: "disability-hearing.html", keytip: "K" },
              { href: moduleHref("disability-mobility.html"), label: "Khó vận động", match: "disability-mobility.html", keytip: "U" },
              { href: moduleHref("disability-cognitive.html"), label: "Nhận thức và học tập", match: "disability-cognitive.html", keytip: "N" },
              { href: moduleHref("disability-mental.html"), label: "Sức khỏe tinh thần", match: "disability-mental.html", keytip: "Z" }
            ]
          }
        ]
      : [
          {
            label: "MODULES",
            links: [
              { href: moduleHref("access.html"), label: "Access", match: "access.html", keytip: "A" },
              { href: moduleHref("education.html"), label: "Education", match: "education.html", keytip: "E" },
              { href: moduleHref("opportunity.html"), label: "Opportunity", match: "opportunity.html", keytip: "O" },
              { href: moduleHref("humanity.html"), label: "Humanity", match: "humanity.html", keytip: "H" }
            ]
          },
          {
            label: "Luồng trải nghiệm",
            links: [
              { href: moduleHref("auth.html"), label: "Xác thực", match: "auth.html", keytip: "X" },
              { href: moduleHref("onboarding.html"), label: "Thiết lập ban đầu", match: "onboarding.html", keytip: "L" },
              { href: moduleHref("dashboard.html"), label: "Bảng điều khiển", match: "dashboard.html", keytip: "B" }
            ]
          },
          {
            label: "Học theo nhu cầu",
            links: [
              { href: moduleHref("education-disability.html"), label: "Hồ sơ người khuyết tật", match: "education-disability.html", keytip: "R" },
              { href: moduleHref("education-community.html"), label: "Học cho cộng đồng", match: "education-community.html", keytip: "D" },
              { href: moduleHref("disability-vision.html"), label: "Khiếm thị", match: "disability-vision.html", keytip: "V" },
              { href: moduleHref("disability-hearing.html"), label: "Khiếm thính", match: "disability-hearing.html", keytip: "K" },
              { href: moduleHref("disability-mobility.html"), label: "Khó vận động", match: "disability-mobility.html", keytip: "U" },
              { href: moduleHref("disability-cognitive.html"), label: "Nhận thức và học tập", match: "disability-cognitive.html", keytip: "N" },
              { href: moduleHref("disability-mental.html"), label: "Sức khỏe tinh thần", match: "disability-mental.html", keytip: "Z" }
            ]
          }
        ];

    function isCurrent(link) {
      return currentPage === link.match;
    }

    function linkMarkup(link) {
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
            <span class="brand-tag">Một liều của sự nhân văn</span>
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

    let backdrop = document.getElementById("mobileNavBackdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "mobileNavBackdrop";
      backdrop.className = "global-sidebar-backdrop";
      backdrop.hidden = true;
      body.prepend(backdrop);
    }

    let toggle = document.getElementById("menuToggle");
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

    if (!isHomePage) {
      const keytipTargets = Array.from(sidebar.querySelectorAll("[data-keytip]"));
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

      function getKeytipValue(event) {
        if (event.code && /^Key[A-Z]$/.test(event.code)) {
          return event.code.slice(3).toLowerCase();
        }

        if (event.code && /^Digit[0-9]$/.test(event.code)) {
          return event.code.slice(5);
        }

        return (event.key || "").toLowerCase();
      }

      function activateKeytip(key) {
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
})();
