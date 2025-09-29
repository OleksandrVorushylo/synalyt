import "./meta-settings.js";
import Swiper from "./plugins/swiper-bundle.esm.browser.min.js";

const header = document.getElementsByClassName(`header`)[0];
// Header scroll
const scrollContainer = () => {
	return document.documentElement || document.body;
};

if (header && header.classList.contains("fixed")) {
	document.addEventListener("scroll", () => {
		if (scrollContainer().scrollTop > 0) {
			header.classList.add("scrolled");
		} else if (scrollContainer().scrollTop == 0) {
			header.classList.remove("scrolled");
		}
	});
}

// menu handlers

///check mobile menu show/hide condition
const mobileMenuStartPoint = +getComputedStyle(
	document.documentElement
).getPropertyValue("--mobile-menu-start-point");
let isMobileMenuEnable =
	$(window).outerWidth() <= mobileMenuStartPoint || $(".header-mobile").length;

$(".dropdown-toggle").click(function (e) {
	if (isMobileMenuEnable) {
		//close all opened sub menu
		$(".menu-item.dropdown.active .dropdown-menu").slideUp({
			complete: function () {
				$(this).closest(".dropdown").removeClass("active");
			},
		});

		//open current submenu
		$(this).closest(".menu-item.dropdown").toggleClass("active");
		if ($(this).closest(".menu-item.dropdown").hasClass("active")) {
			e.preventDefault();
			$(this).next(".dropdown-menu").slideDown();
		}
	}
});

// toggle menu handler
function menuToggle() {
	$(".menu-toggle").toggleClass("active");
	$(".burger-menu").toggleClass("active");
	$(".navbar-nav").toggleClass("active");
	$(".btn-get-in-touch").toggleClass("active");
	$(".header-close-wrapper").toggleClass("active");
	// LockScroll when burger open and enable when closed and enable scroll on menu
	scrollLock.getScrollState()
		? scrollLock.disablePageScroll(document.querySelector(".navbar-nav .menu"))
		: scrollLock.enablePageScroll();
}
//menu update function
function updateMenu() {
	isMobileMenuEnable =
		$(window).outerWidth() <= mobileMenuStartPoint ||
		$(".mobile-header").length;
	if (!isMobileMenuEnable) {
		$(".dropdown-menu").css("display", "");
		$(".header-close-wrapper").removeClass("active");
		$(".menu-item.active").removeClass("active");
		$(".navbar-nav").removeClass("active");
		$(".menu-toggle").removeClass("active");
		$(".burger-menu").removeClass("active");
		$(".btn-get-in-touch").removeClass("active");
		// LockScroll when burger open and enable when closed
		scrollLock.enablePageScroll();
	}
}
$(window).on("resize orientationchange", updateMenu);
// end of toggle menu handler

$(".menu-toggle").click(menuToggle); //menu toggles
$(".burger-menu").click(menuToggle); //menu toggles
$(".close-burger-menu").click(menuToggle); //menu toggles
$(".header-close-wrapper").click(menuToggle); //menu toggles

if(document.querySelector('.btn-get-in-touch-close')) {
	const btnGetInTouchClose = document.querySelectorAll('.btn-get-in-touch-close');
	btnGetInTouchClose.forEach(elem => {
		elem.addEventListener('click', () => {
			if(document.querySelector('.burger-menu').classList.contains('active')) {
				$(".dropdown-menu").css("display", "");
				$(".header-close-wrapper").removeClass("active");
				$(".menu-item.active").removeClass("active");
				$(".navbar-nav").removeClass("active");
				$(".menu-toggle").removeClass("active");
				$(".burger-menu").removeClass("active");
				$(".btn-get-in-touch").removeClass("active");
				// LockScroll when burger open and enable when closed
				scrollLock.enablePageScroll();
			}
		})
	})
}

var elements = document.querySelectorAll(".force-sticky");
Stickyfill.forceSticky();
Stickyfill.add(elements);

const mapElement = document.getElementById("map");
if (mapElement) {
	console.log(mapElement.querySelectorAll("g"));
}
