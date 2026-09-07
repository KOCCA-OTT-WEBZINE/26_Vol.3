document.addEventListener("DOMContentLoaded", () => {
  const contents = [
    {
      sectionName: "스포트라이트",
      theme: "숏드라마, 트렌드와 비즈니스 전략 사이에서",
      item: "커지는 숏드라마 시장, 한국의 자리는 어디인가",
      img: "./img/manuscript1/banner.png",
      imgMobile: "./img/manuscript1/banner-m.png",
      bgPosition: "center center",
      bgPositionMobile: "center center",
    },
    {
      sectionName: "트렌드 하이라이트",
      theme: "",
      item: "올드 IP의 귀환은 무얼 말해주는 걸까<br>: 올드 IP의 귀환을 둘러싼 콘텐츠 산업의 변화들",
      img: "./img/manuscript7/banner.png",
      imgMobile: "./img/manuscript7/banner-m.png",
      bgPosition: "right center",
      bgPositionMobile: "center center",
    },
    {
      sectionName: "피플 인사이트",
      theme: "",
      item: "셀럽 IP와 영상콘텐츠 생태계의 확장<br>: 스튜디오 에피소드 이정호 PD 인터뷰",
      img: "./img/manuscript10/banner.png",
      imgMobile: "./img/manuscript10/banner-m.png",
      bgPosition: "right center",
      bgPositionMobile: "center center",
    },
    {
      sectionName: "데이터 포인트",
      theme: "",
      item: "[2026년 2분기] 데이터로 읽는 글로벌 OTT 콘텐츠 소비 취향",
      img: "./img/manuscript11/banner.png",
      imgMobile: "./img/manuscript11/banner-m.png",
      bgPosition: "right center",
      bgPositionMobile: "center center",
    },
    {
      sectionName: "글로벌 마켓 리포트",
      theme: "",
      item: "북미, 중남미, 유럽, 아시아, 중동 ∙ 아프리카, 대양주<br>주요 이슈 리포트",
      img: "./img/global/banner.png",
      imgMobile: "./img/global/banner.png",
      bgPosition: "right center",
      bgPositionMobile: "center center",
    },
  ];

  // === 메인 배너 슬라이드 렌더링 ===
  const swiperWrapper = document.getElementById("swiper-slides");
  contents.forEach((content) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    slide.innerHTML = `
  <div class="banner">
    <div class="banner-bg pc-bg" 
         style="background-image: url('${content.img}'); background-position: ${
      content.bgPosition || "center center"
    };"></div>
    <div class="banner-bg mobile-bg" 
         style="background-image: url('${
           content.imgMobile || content.img
         }'); background-position: ${
      content.bgPositionMobile || content.bgPosition || "center center"
    };"></div>
    <div class="overlay"></div>
    <div class="content">
      <div class="theme-wrapper">
        <div class="label">${content.sectionName}</div>
        ${content.theme ? `<p class="theme">${content.theme}</p>` : ""}
      </div>
      <p class="item">${content.item}</p>
    </div>
  </div>
`;
    swiperWrapper.appendChild(slide);
  });

  new Swiper(".main-banner-swiper", {
    loop: true,
    autoplay: { delay: 3000 },
    pagination: {
      el: ".main-banner-swiper .swiper-pagination",
      clickable: true,
    },
  });

  const swiperStates = {
    spotlight: null,
    global: null,
    people: null,
    trend: null,
    data: null,
  };

  // === Swiper 초기화/해제 함수 ===
function getSlidesPerView() {
  const width = window.innerWidth;

  if (width >= 1440) return 3;
  if (width >= 991) return 2;
  return 1;
}

function updateNavigationVisibility(selector, nextEl, prevEl) {
  const slideCount = document.querySelectorAll(`${selector} .swiper-slide`).length;
  const slidesPerView = getSlidesPerView();

  const shouldHide = slideCount <= slidesPerView;

  document.querySelectorAll(`${nextEl}, ${prevEl}`).forEach((button) => {
    button.style.display = shouldHide ? "none" : "";
  });
}

// === Swiper 초기화/해제 함수 ===
function toggleSwiper(key, selector, nextEl, prevEl) {
  const initialized = !!swiperStates[key];

  const slideCount = document.querySelectorAll(
    `${selector} .swiper-slide`
  ).length;

  const slidesPerView = getSlidesPerView();
  const canSwipe = slideCount > slidesPerView;

  updateNavigationVisibility(selector, nextEl, prevEl);

  if (!initialized) {
    swiperStates[key] = new Swiper(selector, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 16,
      slideToClickedSlide: false,
      grabCursor: canSwipe,
      loop: canSwipe,
      autoplay: canSwipe
        ? {
            delay: 3000,
            disableOnInteraction: false,
          }
        : false,
      navigation: {
        nextEl,
        prevEl,
      },
      breakpoints: {
        1440: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        991: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        0: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
      },
    });
  } else {
    updateNavigationVisibility(selector, nextEl, prevEl);
  }
}

  // === 전체 Swiper 초기화 실행 함수 ===
  function initAllSwipers() {
    toggleSwiper(
      "spotlight",
      ".spotlight-swiper",
      ".spotlight-button-next",
      ".spotlight-button-prev"
    );
    toggleSwiper(
      "global",
      ".global-swiper",
      ".global-button-next",
      ".global-button-prev"
    );
    toggleSwiper(
      "people",
      ".people-swiper",
      ".people-button-next",
      ".people-button-prev"
    );
    toggleSwiper(
      "trend",
      ".trend-swiper",
      ".trend-button-next",
      ".trend-button-prev"
    );
    toggleSwiper(
      "data",
      ".data-swiper",
      ".data-button-next",
      ".data-button-prev"
    );
  }

  // 최초 실행 및 리사이즈 대응
  initAllSwipers();
  window.addEventListener("resize", () => {
    setTimeout(initAllSwipers, 100);
  });
});
