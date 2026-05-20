(function () {
  const body = document.body;
  if (!body) return;

  const currentPath = window.location.pathname.split("/").pop() || "home.html";
  const currentPage = currentPath === "" ? "home.html" : currentPath;
  const currentHash = window.location.hash || "";
  const isPagesPath = window.location.pathname.includes("/pages/");
  const isHomePage = currentPage === "home.html";
  const homeHref = isPagesPath ? "home.html" : "pages/home.html";
  const moduleHref = (page) => (isPagesPath ? page : `pages/${page}`);
  const homeSectionHref = (hash) => (isHomePage ? hash : `${homeHref}${hash}`);

  const groups = currentPage === "dashboard.html"
    ? [
        {
          label: "Bảng điều khiển",
          links: [
            { href: "#continue-learning", label: "Tiếp tục học", match: "dashboard.html" },
            { href: "#progress", label: "Tiến độ", match: "dashboard.html" },
            { href: "#ai-mentor", label: "Trợ lý AI", match: "dashboard.html" },
            { href: "#recommended", label: "Bài học gợi ý", match: "dashboard.html" },
            { href: "#community", label: "Bảng tin cộng đồng", match: "dashboard.html" }
          ]
        },
        {
          label: "Sơ đồ nền tảng",
          links: [
            { href: homeSectionHref("#hero-title"), label: "Tổng quan", match: "home.html" },
            { href: homeSectionHref("#pillars"), label: "4 trụ cột", match: "home.html" },
            { href: homeSectionHref("#school"), label: "Trường học thấu hiểu", match: "home.html" },
            { href: homeSectionHref("#accessibility"), label: "Trợ năng", match: "home.html" }
          ]
        },
        {
          label: "Modules",
          links: [
            { href: moduleHref("access.html"), label: "Access", match: "access.html" },
            { href: moduleHref("education.html"), label: "Education", match: "education.html" },
            { href: moduleHref("opportunity.html"), label: "Opportunity", match: "opportunity.html" },
            { href: moduleHref("humanity.html"), label: "Humanity", match: "humanity.html" }
          ]
        }
      ]
    : [
        {
          label: "Sơ đồ nền tảng",
          links: [
            { href: homeSectionHref("#hero-title"), label: "Tổng quan", match: "home.html", hash: "#hero-title", keytip: "Q" },
            { href: homeSectionHref("#pillars"), label: "4 trụ cột", match: "home.html", hash: "#pillars", keytip: "W" },
            { href: homeSectionHref("#school"), label: "Trường học thấu hiểu", match: "home.html", hash: "#school", keytip: "E" },
            { href: homeSectionHref("#accessibility"), label: "Trợ năng", match: "home.html", hash: "#accessibility", keytip: "R" },
            { href: homeSectionHref("#stories"), label: "Câu chuyện", match: "home.html", hash: "#stories", keytip: "T" },
            { href: homeSectionHref("#cta"), label: "Tham gia", match: "home.html", hash: "#cta", keytip: "Y" }
          ]
        },
        {
          label: "MODULES",
          links: [
            { href: moduleHref("access.html"), label: "Access", match: "access.html", keytip: "S" },
            { href: moduleHref("education.html"), label: "Education", match: "education.html", keytip: "G" },
            { href: moduleHref("opportunity.html"), label: "Opportunity", match: "opportunity.html", keytip: "H" },
            { href: moduleHref("humanity.html"), label: "Humanity", match: "humanity.html", keytip: "J" }
          ]
        },
        {
          label: "Luồng trải nghiệm",
          links: [
            { href: moduleHref("auth.html"), label: "Xác thực", match: "auth.html" },
            { href: moduleHref("onboarding.html"), label: "Thiết lập ban đầu", match: "onboarding.html" },
            { href: moduleHref("dashboard.html"), label: "Bảng điều khiển", match: "dashboard.html" }
          ]
        },
        {
          label: "Học theo nhu cầu",
          links: [
            { href: moduleHref("education-disability.html"), label: "Hồ sơ người khuyết tật", match: "education-disability.html" },
            { href: moduleHref("education-community.html"), label: "Học cho cộng đồng", match: "education-community.html" },
            { href: moduleHref("disability-vision.html"), label: "Khiếm thị", match: "disability-vision.html" },
            { href: moduleHref("disability-hearing.html"), label: "Khiếm thính", match: "disability-hearing.html" }
          ]
        }
      ];

  function isCurrent(link) {
    if (link.hash && isHomePage) {
      const effectiveHash = currentHash || "#hero-title";
      return effectiveHash === link.hash;
    }

    return currentPage === link.match;
  }

  function linkMarkup(link) {
    const currentAttr = isCurrent(link) ? ' aria-current="page"' : "";
    const keytipAttr = link.keytip ? ` data-keytip="${link.keytip}"` : "";
    const hashAttr = link.hash ? ` data-section-hash="${link.hash}"` : "";
    return `
      <li>
        <a class="sidebar-link" href="${link.href}"${currentAttr}${keytipAttr}${hashAttr}>
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
      <a class="brand brand-sidebar" href="${homeHref}" aria-label="D.O.S.E trang chủ"${isHomePage ? ' data-keytip="D"' : ""}>
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

  if (!isHomePage) return;

  const sectionLinks = Array.from(sidebar.querySelectorAll("[data-section-hash]"));
  if (sectionLinks.length === 0) return;

  function setActiveSection(hash) {
    const effectiveHash = hash || "#hero-title";
    sectionLinks.forEach((link) => {
      if (link.dataset.sectionHash === effectiveHash) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const sectionIds = sectionLinks
    .map((link) => link.dataset.sectionHash)
    .filter(Boolean);

  const sections = sectionIds
    .map((hash) => document.querySelector(hash))
    .filter(Boolean);

  function getActiveSectionFromViewport() {
    const viewportOffset = window.innerHeight * 0.24;
    let activeId = "#hero-title";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top - viewportOffset <= 0) {
        activeId = `#${section.id}`;
      }
    });

    return activeId;
  }

  function syncSidebarToScroll() {
    const activeHash = getActiveSectionFromViewport();
    setActiveSection(activeHash);
  }

  setActiveSection(currentHash || "#hero-title");
  window.addEventListener("hashchange", () => {
    setActiveSection(window.location.hash || "#hero-title");
  });
  window.addEventListener("scroll", syncSidebarToScroll, { passive: true });
  window.addEventListener("resize", syncSidebarToScroll);
  syncSidebarToScroll();
})();
