const spotlightItem = {
  0: {
    title: "커지는 숏드라마 시장, 한국의 자리는 어디인가",
    authors: [
      {
        name: "이성민",
        affiliation: "한국방송통신대학교 미디어영상학과 교수",
      },
    ],
  },
  1: {
    title: "AI로 확장하는 팬덤 IP &lt;와이낫미디어&gt;, 이민석 대표",
  },
  2: {
    title: "데이터와 AI로 숏드라마를 혁신하다 &lt;밤부네트워크&gt;, 정다빈 대표",
  },
  3: {
    title: "CJ그룹 사내벤처 1호 &lt;스튜디오 숏냅스&gt;",
  },
  4: {
    title: "K-숏드라마로 글로벌을 공략한다 &lt;비글루&gt;, 이소담 총괄",
  },
  5: {
    title: "웰메이드 콘텐츠로 승부한다 &lt;레진스낵&gt;, 이아사 영상사업부 부장",
  },
};

const trendItem = {
  0: {
    title: "올드 IP의 귀환은 무얼 말해주는 걸까<br>: 올드 IP의 귀환을 둘러싼 콘텐츠 산업의 변화들",
    authors: [
      {
        name: "정덕현",
        affiliation: "대중문화평론가",
      },
    ],
  },
  1: {
    title: "일본·싱가포르·헝가리 사례로 살펴보는 K-로케이션 인센티브 정책의 방향",
    authors: [
      {
        name: "반옥숙",
        affiliation: "한국콘텐츠진흥원 산업정책팀 책임연구원",
      },
    ],
  },
  2: {
    title: "셀럽 IP 시대의 방송영상콘텐츠<br>: ‘채널’에서 ‘개인’으로 이동하는 미디어 권력",
    authors: [
      {
        name: "이영주",
        affiliation: "서울과학기술대학교 IT정책전문대학원 융합미디어콘텐츠정책전공 교수",
      },
      {
        name: "한선옥",
        affiliation: "동아방송예술대학교 영상제작과 교수",
      },
    ],
  },
};

const peopleItem = {
  0: {
    title: "셀럽 IP와 영상콘텐츠 생태계의 확장",
    authors: [
      {
        name: "이정호",
        affiliation: "스튜디오 에피소드 PD",
      },
    ],
  },
};

const globalItem = {
  0: {
    title: "북미",
  },
  1: {
    title: "중남미",
  },
  2: {
    title: "유럽",
  },
  3: {
    title: "아시아",
  },
  4: {
    title: "중동 ∙ 아프리카",
  },
  5: {
    title: "대양주",
  },
};

const dataPointItem = {
  0: {
    title: "[2026년 2분기] 데이터로 읽는 글로벌 OTT 콘텐츠 소비 취향",
  },
  1: {
    title: "글로벌 OTT 사업자의 광고 생태계 재편과 경쟁전략<br>: ‘구독 경쟁’에서 ‘광고수익 경쟁’으로 전환",
    authors: [
      {
        name: "정애리",
        affiliation: "중앙대학교 첨단영상대학원 겸임교수",
      },
    ],
  },
  2: {
    title: "월드컵 중계권료는 오르는데 TV 시청률은 왜 떨어질까?<br>: 시청자는 사라진 것이 아니라 이동했다",
    authors: [
      {
        name: "김미선",
        affiliation: "이화여자대학교 커뮤니케이션미디어연구소 연구원",
      },
    ],
  },
};

const contentMap = [
  {
    label: "스포트라이트",
    path: "spotlight",
    items: spotlightItem,
  },
  {
    label: "트렌드 하이라이트",
    path: "trend",
    items: trendItem,
  },
  {
    label: "피플 인사이트",
    path: "people",
    items: peopleItem,
  },
  {
    label: "데이터 포인트",
    path: "data",
    items: dataPointItem,
  },
  {
    label: "글로벌 마켓 리포트",
    path: "global",
    items: globalItem,
  },
];

function stripFootnotesAndTags(text) {
  if (!text) return "";

  return String(text)
    .replace(/<br\s*\/?>/gi, "__BR__")
    .replace(/<[^>]*>/g, "")
    .replace(/__BR__/g, "<br>")
    .replace(/\[\d+\]/g, "")
    .replace(/\(\d+\)/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

function highlightQuotes(text) {
  const QUOTE_REGEX = /["'「」『』\u2018\u2019\u201C\u201D]/g;

  return String(text).replace(
    QUOTE_REGEX,
    (quote) => `<span class="bodyQuotes">${quote}</span>`
  );
}

function renderAuthors(authors) {
  if (!Array.isArray(authors) || authors.length === 0) return "";

  return authors
    .map(({ name, affiliation }) => {
      const safeName = name || "";
      const safeAffiliation = affiliation || "";

      return `
        <p class="author">
          ${safeName}${safeAffiliation ? ` | ${safeAffiliation}` : ""}
        </p>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("menu-close");
  const menu = document.getElementById("mobile-menu");
  const content = document.getElementById("menu-content");

  if (!toggle || !closeBtn || !menu || !content) return;

  toggle.addEventListener("click", () => {
    renderMenu();
    menu.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  });

  closeBtn.addEventListener("click", () => {
    closeMenu();
  });

  content.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) return;

    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("active")) {
      closeMenu();
    }
  });

  function closeMenu() {
    menu.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function renderMenu() {
    content.innerHTML = "";

    contentMap.forEach(({ label, path, items }) => {
      const section = document.createElement("div");
      section.className = "menu-section";

      const sectionDescription =
        path === "spotlight"
          ? `<p id="menu-spotlight-subject">숏드라마, 트렌드와 비즈니스 전략 사이에서</p>`
          : "";

      section.innerHTML = `
        <div class="section-title">
          <h2>${label}</h2>
          ${sectionDescription}
        </div>

        <ul class="section-list">
          ${Object.entries(items)
            .map(([key, item]) => {
              const authors = renderAuthors(item.authors);

              return `
                <li class="section-item">
                  <a href="./${path}_${Number(key) + 1}.html" class="menu-link">
                    <p>${highlightQuotes(
                      stripFootnotesAndTags(item.title)
                    )}</p>
                    ${authors}
                  </a>
                </li>
              `;
            })
            .join("")}
        </ul>
      `;

      content.appendChild(section);
    });
  }
});