// Remove Footnotes and HTML Tags
function stripFootnotesAndTags(text) {
  return text
    .replace(/<^>+>/g, "") // HTML 태그 제거
    .replace(/[\d¹²³⁴⁵⁶⁷⁸⁹⁰]+[⁾)]/g, "") // 각주 숫자 제거
    .trim();
}

// Progress Bar
function updateProgressBar() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollableHeight = scrollHeight - clientHeight;
  const scrolled = (scrollTop / scrollableHeight) * 100;

  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = `${scrolled}%`;
  }
}

window.addEventListener("scroll", updateProgressBar);

// anchorButton
const pageAnchorButtons = document.querySelector(".page-anchor-buttons");
let scrollHideTimer = null;

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function scrollToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
}

function showAnchorButtonsWhileScrolling() {
  if (!pageAnchorButtons) return;

  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  const isNearTop = scrollY <= 100;
  const isNearBottom = scrollY + windowHeight >= documentHeight - 100;

  // 최상단/최하단 근처에서는 버튼 숨김
  if (isNearTop && isNearBottom) {
    pageAnchorButtons.classList.remove("is-visible");
    return;
  }

  // 스크롤 발생 시 노출
  pageAnchorButtons.classList.add("is-visible");

  clearTimeout(scrollHideTimer);

  // 스크롤이 멈춘 뒤 1초 후 숨김
  scrollHideTimer = setTimeout(() => {
    pageAnchorButtons.classList.remove("is-visible");
  }, 1000);
}

window.addEventListener("scroll", showAnchorButtonsWhileScrolling, { passive: true });

window.addEventListener("load", () => {
  pageAnchorButtons?.classList.remove("is-visible");
});

// 주석 바텀시트
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("note-open-btn");
  const closeBtn = document.getElementById("note-close-btn");
  const sheet = document.getElementById("note-sheet");
  const dim = document.getElementById("note-sheet-dim");
  const panel = document.getElementById("note-sheet-panel");

  if (!openBtn || !closeBtn || !sheet || !dim || !panel) return;

  function openSheet() {
    sheet.classList.remove("note-sheet-hidden");

    requestAnimationFrame(() => {
      panel.classList.add("is-open");
    });

    sheet.setAttribute("aria-hidden", "false");
    document.body.classList.add("body-scroll-lock");
  }

  function closeSheet() {
    panel.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    document.body.classList.remove("body-scroll-lock");

    setTimeout(() => {
      sheet.classList.add("note-sheet-hidden");
    }, 300);
  }

  openBtn.addEventListener("click", openSheet);
  closeBtn.addEventListener("click", closeSheet);
  dim.addEventListener("click", closeSheet);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sheet.getAttribute("aria-hidden") === "false") {
      closeSheet();
    }
  });
});

// Header Scroll
const header = document.querySelector(".header");

const handleHeaderScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", handleHeaderScroll);
window.addEventListener("load", handleHeaderScroll);

// articleFloatingNav
const articleFloatingNav = document.querySelector(".article-floating-nav");
const mainContent = document.querySelector(".main-content");
const footer = document.querySelector(".footer");

function updateArticleFloatingNav() {
  if (!articleFloatingNav || !mainContent || !footer) return;

  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;

  const mainTop = mainContent.getBoundingClientRect().top + scrollY;
  const footerTop = footer.getBoundingClientRect().top + scrollY;

  // 본문 시작 지점 근처부터 노출
  const isAfterMainStart = scrollY > mainTop - 500;

  // 푸터가 화면에 들어오기 전까지만 노출
  const isBeforeFooter = scrollY + windowHeight < footerTop;

  articleFloatingNav.classList.toggle(
    "is-visible",
    isAfterMainStart && isBeforeFooter
  );
}

window.addEventListener("scroll", updateArticleFloatingNav, { passive: true });
window.addEventListener("resize", updateArticleFloatingNav);
window.addEventListener("load", updateArticleFloatingNav);