document.addEventListener("DOMContentLoaded", () => {
	const noteButtons = document.querySelectorAll(".note-link[data-note]");

	if (!noteButtons.length) return;

	const tooltip = document.createElement("div");

	tooltip.id = "note-tooltip";
	tooltip.className = "note-tooltip";
	tooltip.setAttribute("role", "tooltip");
	tooltip.setAttribute("aria-hidden", "true");

	document.body.appendChild(tooltip);

	let activeButton = null;
	let showTimer = null;
	let hideTimer = null;

	const SHOW_DELAY = 300;
	const HIDE_DELAY = 150;
	const hoverMedia = window.matchMedia("(hover: hover)");

	function positionTooltip(button) {
		const buttonRect = button.getBoundingClientRect();
		const tooltipRect = tooltip.getBoundingClientRect();

		const viewportPadding = 16;
		const gap = 10;

		let left =
			buttonRect.left +
			buttonRect.width / 2 -
			tooltipRect.width / 2;

		left = Math.max(
			viewportPadding,
			Math.min(
				left,
				window.innerWidth - tooltipRect.width - viewportPadding
			)
		);

		let top = buttonRect.top - tooltipRect.height - gap;
		let isBottom = false;

		if (top < viewportPadding) {
			top = buttonRect.bottom + gap;
			isBottom = true;
		}

		if (
			top + tooltipRect.height >
			window.innerHeight - viewportPadding
		) {
			top = Math.max(
				viewportPadding,
				window.innerHeight - tooltipRect.height - viewportPadding
			);
		}

		const arrowLeft =
			buttonRect.left +
			buttonRect.width / 2 -
			left -
			6;

		const limitedArrowLeft = Math.max(
			12,
			Math.min(arrowLeft, tooltipRect.width - 24)
		);

		tooltip.style.left = `${left}px`;
		tooltip.style.top = `${top}px`;
		tooltip.style.setProperty(
			"--tooltip-arrow-left",
			`${limitedArrowLeft}px`
		);

		tooltip.classList.toggle("is-bottom", isBottom);
	}

	function renderTooltip(button) {
    const noteContent = button.dataset.note?.trim() || "";
    const noteUrl = button.dataset.url?.trim() || "";

    tooltip.replaceChildren();

    const contentElement = noteUrl
      ? document.createElement("a")
      : document.createElement("p");

    contentElement.className = "note-tooltip-content";
    contentElement.textContent = noteContent;

    if (noteUrl) {
      contentElement.classList.add("is-link");
      contentElement.href = noteUrl;
      contentElement.target = "_blank";
      contentElement.rel = "noopener noreferrer";
      contentElement.setAttribute(
        "aria-label",
        "주석 원문 새 창으로 열기"
      );
    }

    tooltip.appendChild(contentElement);
  }

	function showTooltip(button) {
		window.clearTimeout(showTimer);
		window.clearTimeout(hideTimer);

		const noteContent = button.dataset.note?.trim();

		if (!noteContent) return;

		if (activeButton && activeButton !== button) {
			activeButton.setAttribute("aria-expanded", "false");
			activeButton.removeAttribute("aria-describedby");
		}

		activeButton = button;

		renderTooltip(button);

		tooltip.classList.add("is-visible");
		tooltip.setAttribute("aria-hidden", "false");

		button.setAttribute("aria-expanded", "true");
		button.setAttribute("aria-describedby", tooltip.id);

		requestAnimationFrame(() => {
			positionTooltip(button);
		});
	}

	function scheduleShowTooltip(button) {
		window.clearTimeout(showTimer);
		window.clearTimeout(hideTimer);

		showTimer = window.setTimeout(() => {
			showTooltip(button);
		}, SHOW_DELAY);
	}

	function hideTooltip() {
		window.clearTimeout(showTimer);
		window.clearTimeout(hideTimer);

		if (!activeButton) return;

		activeButton.setAttribute("aria-expanded", "false");
		activeButton.removeAttribute("aria-describedby");

		tooltip.classList.remove("is-visible");
		tooltip.setAttribute("aria-hidden", "true");

		activeButton = null;
	}

	function scheduleHideTooltip() {
		window.clearTimeout(showTimer);
		window.clearTimeout(hideTimer);

		hideTimer = window.setTimeout(() => {
			hideTooltip();
		}, HIDE_DELAY);
	}

	noteButtons.forEach((button) => {
		button.setAttribute("aria-expanded", "false");

		button.addEventListener("mouseenter", () => {
			if (hoverMedia.matches) {
				scheduleShowTooltip(button);
			}
		});

		button.addEventListener("mouseleave", () => {
			if (hoverMedia.matches) {
				scheduleHideTooltip();
			}
		});

		button.addEventListener("focus", () => {
			scheduleShowTooltip(button);
		});

		button.addEventListener("blur", () => {
			if (hoverMedia.matches) {
				scheduleHideTooltip();
			}
		});

		button.addEventListener("click", (event) => {
			event.preventDefault();
			event.stopPropagation();

			window.clearTimeout(showTimer);

			if (activeButton === button) {
				hideTooltip();
				return;
			}
      
			showTooltip(button);
		});
	});

	tooltip.addEventListener("mouseenter", () => {
		window.clearTimeout(hideTimer);
	});

	tooltip.addEventListener("mouseleave", () => {
		if (hoverMedia.matches) {
			scheduleHideTooltip();
		}
	});

	tooltip.addEventListener("click", (event) => {
		event.stopPropagation();
	});

	document.addEventListener("click", (event) => {
		if (!activeButton) return;

		if (
			!activeButton.contains(event.target) &&
			!tooltip.contains(event.target)
		) {
			hideTooltip();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			hideTooltip();
		}
	});

	window.addEventListener(
		"scroll",
		() => {
			window.clearTimeout(showTimer);

			if (activeButton) {
				positionTooltip(activeButton);
			}
		},
		{ passive: true }
	);

	window.addEventListener("resize", () => {
		if (activeButton) {
			positionTooltip(activeButton);
		}
	});
});