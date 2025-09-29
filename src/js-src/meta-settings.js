import { CountUp } from "./plugins/countUp.js";
import Swiper from "./plugins/swiper-bundle.esm.browser.min.js";

/**
 * function to know what browser client is using [Application and version of it]
 * Used in fixForSwiperSafariOld function to toggle it only in Safari 11 and 12
 * where touch-action: pan-y || pan-x not supported
 * **/
navigator.sayswho = (function () {
	var ua = navigator.userAgent;
	var tem;
	var M =
		ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) ||
		[];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return "IE " + (tem[1] || "");
	}
	if (M[1] === "Chrome") {
		tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
		if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera");
	}
	M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
	if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
	return M.join(" ");
})();

/**
 * Function check for touchscreen device
 * **/
export function is_touch_enabled() {
	return (
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
}

/**
 * Function for disabling Swiper autoscroll when Swiper is not in viewport
 */
export const addAutoscrollObserver = (swiperSelector, swiperInstance) => {
	const swiperDOM = document.querySelector(swiperSelector);

	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.85,
	};

	if (swiperDOM) {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					swiperInstance.autoplay.start();
				} else {
					swiperInstance.autoplay.stop();
				}
			});
		}, observerOptions);

		observer.observe(swiperDOM);
	}
};

/**
 * Function to getPosition of element in DOM
 * **/
export function getPosition(element) {
	var xPosition = 0;
	var yPosition = 0;

	while (element) {
		xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
		yPosition += element.offsetTop - element.scrollTop + element.clientTop;
		element = element.offsetParent;
	}

	return { x: xPosition, y: yPosition };
}

/** returns true if the element or one of its parents has the class classname **/
export function hasSomeParentTheClass(element, classname) {
	if (element.className.split(" ").indexOf(classname) >= 0) return true;
	return (
		element.parentNode && hasSomeParentTheClass(element.parentNode, classname)
	);
}

/** find the closest number in array [first is arr, second is needed number] **/
export function closest(arr, needle) {
	return arr.reduce((a, b) => {
		return Math.abs(b - needle) < Math.abs(a - needle) ? b : a;
	});
}

/** Стара функція для перевірки чи елемент знаходиться в Viewport
 * (потрібно юзати з window.addEventListener('scroll'))
 *
 * Проте краще використовувати Intersection Observer API для меншої
 * нагрузки сайту https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API **/
export function isInViewport(el) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

/**
 * CountUp Metamorfosi function
 * (just add .count-up class anywhere and setup unique option in data attributes)
 * **/
const counts = Array.from(document.getElementsByClassName("count-up"));
if (counts) {
	const defaultOptions = {
		separator: "",
		enableScrollSpy: true,
		scrollSpyRunOnce: true,
	};

	let idNumber = 1;

	counts.forEach((count) => {
		const id = `count-up-${idNumber}`,
			value = parseFloat(count.innerHTML);

		let optionsFromDataAttr = $(count).data();

		for (const key in optionsFromDataAttr) {
			if (optionsFromDataAttr[key] === "") {
				optionsFromDataAttr[key] = true;
			}
		}

		count.id = id;
		new CountUp(
			id,
			value,
			Object.assign(Object.assign({}, defaultOptions), optionsFromDataAttr)
		);
		idNumber++;
	});
}

export const valueObserver = (
	defaultValue,
	callback,
	callAfterInit = false
) => {
	const proxyHandler = {
		set(obj, prop, value) {
			if (prop === "value") {
				obj[prop] = value;
				callback(value);

				return true;
			}
			return true;
		},
	};

	if (callAfterInit) callback(defaultValue);

	return new Proxy({ value: defaultValue }, proxyHandler);
};

export const followingSidebar = ({
	sidebar,
	contentSticky,
	sidebarInnerSelector = ".following-sidebar-inner",
	// calc header height for top side gap
	isHeaderCalc = false,
	// gap on top and bottom of sticky sidebar
	gap = 30,
}) => {
	console.log(sidebar);
	const sidebarInner = sidebar.querySelector(sidebarInnerSelector);
	const sidebarBuffer = document.createElement("DIV");
	sidebarBuffer.classList.add("following-sidebar-buffer");
	sidebarInner.style.position = "sticky";

	const header = document.querySelector("header");

	sidebar.insertAdjacentElement("afterbegin", sidebarBuffer);

	const headerHeight = isHeaderCalc && header ? header.offsetHeight : 0;

	let lastScrollTop = 0;

	// if flag true === scrolling down else scrolling up
	let isScrollingDown = null;

	// if isSidebarHigherViewport true === sidebar is higher than viewport height
	let isSidebarHigherViewport =
		sidebarInner.getBoundingClientRect().height >
		window.innerHeight - headerHeight;

	function calcHeightOfSidebar(isScrollingDown) {
		const contentStickyTop = getPosition(contentSticky).y;
		const sidebarInnerTop = getPosition(sidebarInner).y;

		sidebarBuffer.style.height = `${sidebarInnerTop - contentStickyTop}px`;

		if (isScrollingDown) {
			// scroll down
			sidebarInner.style.top = "";
			sidebarInner.style.bottom = `${
				-headerHeight -
				gap +
				window.innerHeight -
				sidebarInner.getBoundingClientRect().height
			}px`;
		} else {
			// scroll up
			sidebarInner.style.bottom = "";
			sidebarInner.style.top = `${
				Math.min(
					window.innerHeight - sidebarInner.getBoundingClientRect().height,
					headerHeight
				) - gap
			}px`;
		}
		isSidebarHigherViewport =
			sidebarInner.getBoundingClientRect().height >
			window.innerHeight - headerHeight;
	}

	function resetSticky() {
		sidebarInner.style.bottom = "";
		sidebarInner.style.top = `${headerHeight + gap}px`;
		sidebarBuffer.style.height = "0";
	}

	if (!isSidebarHigherViewport) {
		resetSticky();
	} else {
		calcHeightOfSidebar(false);
	}

	window.addEventListener("scroll", function (e) {
		let st = window.scrollY || document.documentElement.scrollTop;

		if (!isSidebarHigherViewport) {
			resetSticky();
		}

		if (st > lastScrollTop && !isScrollingDown) {
			// scroll down
			calcHeightOfSidebar(isScrollingDown);
			isScrollingDown = true;
		} else if (st < lastScrollTop && isScrollingDown) {
			// scroll up
			calcHeightOfSidebar(isScrollingDown);
			isScrollingDown = false;
		}
		lastScrollTop = st <= 0 ? 0 : st;
	});

	const updateSidebar = () => {
		if (!isSidebarHigherViewport) {
			resetSticky();
		}

		calcHeightOfSidebar(true);
		calcHeightOfSidebar(false);
	};

	let windowWidth = window.innerWidth;

	window.addEventListener("resize", (e) => {
		if (windowWidth !== window.innerWidth) {
			windowWidth = window.innerWidth;
			updateSidebar();
		}
	});
};
