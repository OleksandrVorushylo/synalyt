import "./meta-settings.js";
import Swiper from "./plugins/swiper-bundle.esm.browser.min.js";

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
const vhUtils = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vhUtils}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
	// We execute the same script as before
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const headerComponent = document.getElementsByClassName('header')[0];

function menuCloseFunc() {
	const menuToggle = document.querySelector('.menu-toggle');
	const navbarNav = document.querySelector('.navbar-nav');
	const navbarLanguage = document.querySelector('.header-language-wr');
	const headerCloseWrapper = document.querySelector('.header-close-wrapper');

	headerComponent.classList.remove('is-open-menu');
	menuToggle.classList.remove('active');
	navbarNav.classList.remove('active');
	navbarLanguage.classList.remove('is-open-menu');
	headerCloseWrapper.classList.remove('active');
	scrollLock.clearQueueScrollLocks();
	scrollLock.enablePageScroll();
}

// Header scroll
if (headerComponent) {
	const scrollContainer = () => document.documentElement || document.body;

	document.addEventListener('scroll', () => {
		if (scrollContainer().scrollTop > 200) {
			headerComponent.classList.add('scrolled');
		} else if (scrollContainer().scrollTop == 0) {
			headerComponent.classList.remove('scrolled');
		}
	});

	// menu handlers

	// check mobile menu show/hide condition
	const mobileMenuStartPoint = parseInt(
		getComputedStyle(document.documentElement).getPropertyValue(
			'--mobile-menu-start-point'
		)
	);
	let isMobileMenuEnable =
		window.outerWidth <= mobileMenuStartPoint ||
		document.querySelector('.header-mobile');

	const dropdownToggle = document.querySelectorAll('.dropdown-toggle');

	dropdownToggle.forEach((toggle) => {
		toggle.addEventListener('click', function (e) {
			if (isMobileMenuEnable) {
				const menuItem = this.closest('.menu-item.dropdown');
				const dropdownMenu = this.nextElementSibling;

				// close all opened sub menu
				const activeDropdowns = document.querySelectorAll(
					'.menu-item.dropdown.active .dropdown-menu'
				);
				activeDropdowns.forEach((menu) => {
					menu.style.display = 'none';
					menu.closest('.dropdown').classList.remove('active');
				});

				// open current submenu
				menuItem.classList.toggle('active');
				if (menuItem.classList.contains('active')) {
					e.preventDefault();
					dropdownMenu.style.display = 'block';
				}
			}
		});
	});

	// toggle menu handler
	function menuToggleFunc() {
		const menuToggle = document.querySelector('.menu-toggle');
		const navbarNav = document.querySelector('.navbar-nav');
		const navbarLanguage = document.querySelector('.header-language-wr');
		const headerCloseWrapper = document.querySelector('.header-close-wrapper');

		headerComponent.classList.add('is-open-menu');
		menuToggle.classList.toggle('active');
		navbarNav.classList.toggle('active');
		navbarLanguage.classList.toggle('is-open-menu');
		headerCloseWrapper.classList.toggle('active');

		// LockScroll when burger open and enable when closed and enable scroll on menu
		if (scrollLock.getScrollState()) {
			scrollLock.disablePageScroll(document.querySelector('.navbar-nav .menu'));
			scrollLock.addScrollableSelector('.simplebar-content-wrapper');
		} else {
			scrollLock.enablePageScroll();
		}
	}

	// menu update function
	function updateMenu() {
		isMobileMenuEnable =
			window.outerWidth <= mobileMenuStartPoint ||
			document.querySelector('.mobile-header');

		if (!isMobileMenuEnable) {
			const dropdownMenus = document.querySelectorAll('.dropdown-menu');
			dropdownMenus.forEach((menu) => {
				menu.style.display = '';
			});

			const headerCloseWrapper = document.querySelector(
				'.header-close-wrapper'
			);
			headerCloseWrapper.classList.remove('active');

			const activeMenuItems = document.querySelectorAll('.menu-item.active');
			activeMenuItems.forEach((item) => {
				item.classList.remove('active');
			});

			const navbarNav = document.querySelector('.navbar-nav');
			navbarNav.classList.remove('active');

			const menuToggle = document.querySelector('.menu-toggle');
			menuToggle.classList.remove('active');

			headerComponent.classList.remove('is-open-menu');

			// LockScroll when burger open and enable when closed
			scrollLock.enablePageScroll();
		}
	}

	window.addEventListener('resize', updateMenu);
	window.addEventListener('orientationchange', updateMenu);

	// end of toggle menu handler

	const menuToggle = document.querySelector('.menu-toggle');
	const headerCloseWrapper = document.querySelector('.header-close-wrapper');

	menuToggle.addEventListener('click', menuToggleFunc);
	headerCloseWrapper.addEventListener('click', menuToggleFunc);

	// Hide and show Header when scroll up
	function headerSticky() {
		let prevScrollPos = window.pageYOffset;

		document.onscroll = () => {
			const currentScrollPos = window.pageYOffset;
			const headerHeight = headerComponent.scrollHeight;

			if (window.scrollY > 0) {
				if (prevScrollPos > currentScrollPos) {
					headerComponent.style.top = 0;
					headerComponent.classList.add('scrolled');
				} else {
					headerComponent.style.top = `-${headerHeight + 3}px`;
				}
			}

			if (window.scrollY === 0) {
				headerComponent.classList.remove('scrolled');
			}

			prevScrollPos = currentScrollPos;
		};

		if (window.scrollY !== 0) {
			headerComponent.classList.add('scrolled');
		}
	}

	headerSticky();
}

if (document.querySelector('[data-splitting]')) {
	const splittingArr = document.querySelectorAll('[data-splitting]');
	splittingArr.forEach((item) => {
		if (item.hasAttribute('data-splitting-char')) {
			Splitting({ target: item });
		} else {
			Splitting({ target: item, by: 'words' });
		}

		const highlights = item.querySelectorAll('.highlight-words');
		highlights.forEach((hl) => {
			if (!hl.previousElementSibling || !hl.previousElementSibling.classList.contains('whitespace')) {
				const wsBefore = document.createElement('span');
				wsBefore.className = 'whitespace';
				wsBefore.innerHTML = '&nbsp;';
				hl.parentNode.insertBefore(wsBefore, hl);
			}

			if (!hl.nextElementSibling || !hl.nextElementSibling.classList.contains('whitespace')) {
				const wsAfter = document.createElement('span');
				wsAfter.className = 'whitespace';
				wsAfter.innerHTML = '&nbsp;';
				hl.parentNode.insertBefore(wsAfter, hl.nextSibling);
			}
		});
	});
}

const logosContainersArr = document.querySelectorAll('.logos-container');
if(logosContainersArr.length) {
	logosContainersArr.forEach(container => {
		const center = container.querySelector('.center-logo');
		const logos = container.querySelectorAll('.logo-item:not(.center-logo)');
		const duration = 7;

		const lines = [];
		logos.forEach(() => {
			const line = document.createElement('div');
			line.classList.add('line-item');
			container.appendChild(line);
			lines.push(line);
		});

		function getRelativeCoords(element) {
			const containerRect = container.getBoundingClientRect();
			const elemRect = element.getBoundingClientRect();
			const halfWidth = elemRect.width / 2;
			const halfHeight = elemRect.height / 2;
			return {
				x: elemRect.left - containerRect.left + halfWidth,
				y: elemRect.top - containerRect.top + halfHeight,
				halfSize: halfWidth
			};
		}

		let centerCoords = getRelativeCoords(center);
		let logoParams = [];

		logos.forEach((logo) => {
			const logoCoords = getRelativeCoords(logo);
			const dx = logoCoords.x - centerCoords.x;
			const dy = logoCoords.y - centerCoords.y;
			const radius = Math.sqrt(dx * dx + dy * dy);
			const unitX = dx / radius || 0;
			const unitY = dy / radius || 0;

			const initForce = container.clientWidth <= 400
				? Math.min(+logo.dataset.attractionForce, 15)
				: logo.dataset.attractionForce;

			logoParams.push({ radius, unitX, unitY, attractionForce: parseFloat(initForce) || 50, startDelay: parseFloat(logo.dataset.startDelay) || 0 });

			gsap.set(logo, { x: 0, y: 0 });
		});

		function updateLines() {
			logos.forEach((logo, index) => {
				const logoCoords = getRelativeCoords(logo);
				const line = lines[index];
				const dx = logoCoords.x - centerCoords.x;
				const dy = logoCoords.y - centerCoords.y;
				const length = Math.sqrt(dx * dx + dy * dy);
				const angle = Math.atan2(dy, dx) * 180 / Math.PI;
				line.style.width = `${length}px`;
				line.style.left = `${centerCoords.x}px`;
				line.style.top = `${centerCoords.y}px`;
				line.style.transform = `rotate(${angle}deg)`;
			});
		}

		logos.forEach((logo, index) => {

			if(!container.classList.contains('not-starting-animation')) {
				const { radius, unitX, unitY, attractionForce, startDelay } = logoParams[index];

				gsap.to({}, {
					duration: duration,
					delay: startDelay,
					repeat: -1,
					ease: "none",
					onUpdate: function() {
						const prog = this.progress();
						const sin = Math.sin(2 * Math.PI * prog);
						const offset = attractionForce * sin;
						const dx = unitX * offset;
						const dy = unitY * offset;
						gsap.set(logo, { x: dx, y: dy });
						updateLines();
					}
				});
			}
		});

		updateLines();

		window.addEventListener('resize', () => {
			centerCoords = getRelativeCoords(center);
			logoParams = [];
			logos.forEach((logo) => {
				const logoCoords = getRelativeCoords(logo);
				const dx = logoCoords.x - centerCoords.x;
				const dy = logoCoords.y - centerCoords.y;
				const radius = Math.sqrt(dx * dx + dy * dy);
				const unitX = dx / radius || 0;
				const unitY = dy / radius || 0;
				logoParams.push({ radius, unitX, unitY, attractionForce: parseFloat(logo.dataset.attractionForce) || 50, startDelay: parseFloat(logo.dataset.startDelay) || 0 });
			});
			updateLines();
		});
	})
}

const accordionsArr = document.querySelectorAll(
	'.accordion-sec__accordion:not(.is-not-accordion)'
);

if(accordionsArr.length) {
	accordionsArr.forEach((accordion) => {
		const itemsArr = accordion.querySelectorAll('.accordion-sec__item');
		const imagesArr = accordion.parentElement.querySelectorAll(
			'.accordion-sec__image'
		);

		itemsArr.forEach((item, i) => {
			const hiddenEl = item.querySelector('.accordion-sec__item-hidden');
			const contentEl = item.querySelector('.accordion-sec__item-content');
			let maxHeight = `${contentEl.clientHeight + 50}px`;

			item.addEventListener('click', (event) => {
				if (hiddenEl.contains(event.target)) {
					return;
				}

				if (!item.classList.contains('active')) {
					itemsArr.forEach((el) => el.classList.remove('active'));
					if(imagesArr.length) {
						imagesArr.forEach((el) => el.classList.remove('active'));
					}
					item.classList.add('active');
					if(imagesArr.length) {
						imagesArr[i].classList.add('active');
					}
					maxHeight = `${contentEl.clientHeight + 50}px`;
					hiddenEl.style.maxHeight = maxHeight;
				} else {
					item.classList.remove('active');
				}
			});
		});
	});
}

/*const table = document.querySelector('.table-sec__table');
if (table) {
	const ths = Array.from(table.querySelectorAll('thead th'));

	function alignThLabelHeights() {
		// сбрасываем высоты перед пересчетом
		table.querySelectorAll("tbody tr").forEach(tr => {
			const labels = tr.querySelectorAll(".th-label");
			if (labels.length > 1) {
				let maxHeight = 0;
				labels.forEach(label => {
					label.style.minHeight = "";
					maxHeight = Math.max(maxHeight, label.offsetHeight);
				});
				labels.forEach(label => {
					label.style.minHeight = maxHeight + "px";
				});
			}
		});
	}

	function transformTable() {
		const isMobile = window.innerWidth < 768;

		table.querySelectorAll('tbody tr').forEach((row) => {
			Array.from(row.children).forEach((td, index) => {
				if (isMobile) {
					if (!td.querySelector('.td-container')) {
						const content = td.innerHTML;
						td.innerHTML = `
              <div class="td-container">
                <span class="th-label">${ths[index]?.textContent || ''}</span>
                <div class="td-content">${content}</div>
              </div>
            `;
					}
				} else {
					const container = td.querySelector('.td-container');
					if (container) {
						td.innerHTML = container.querySelector('.td-content').innerHTML;
					}
				}
			});
		});

		if (isMobile) {
			alignThLabelHeights();
		}
	}

	window.addEventListener('resize', transformTable);
	transformTable();
}*/

const videoPlayer = document.getElementsByClassName('video-player')[0];
if (videoPlayer) {
	const videoPlayersArr = document.querySelectorAll('.video-player');
	for (let i = 0; i < videoPlayersArr.length; i++) {
		const parentEl = videoPlayersArr[i].parentElement;
		const player = new Plyr(videoPlayersArr[i], {
			controls: [
				'play-large',
				'play',
				'progress',
				'current-time',
				'mute',
				'volume',
				'captions',
				'settings',
				'fullscreen',
				'pip',
				'airplay',
			],
			tooltips: { controls: !0 },
			fullscreen: { iosNative: true },
		});

		player.on('enterfullscreen', function () {
			/*console.log('enterfullscreen');*/
		});

		player.on('exitfullscreen', function () {
			/*console.log('exitfullscreen');*/
		});

		player.on('play', function () {
			parentEl.classList.add('is-played');
		});

		player.on('pause', function () {
			parentEl.classList.remove('is-played');
		});

		// Expose player so it can be used from the console
		window.player = player;

		if (window.innerWidth >= 1024) {
			setTimeout(function () {
				const plyrArr = document.querySelectorAll('.plyr');
				for (let j = 0; j < plyrArr.length; j++) {
					plyrArr[i].classList.add('plyr-hide-controls');
				}

				plyrArr[i].addEventListener('mouseenter', () => {
					plyrArr[i].classList.remove('plyr-hide-controls');
				});

				plyrArr[i].addEventListener('mouseleave', () => {
					plyrArr[i].classList.add('plyr-hide-controls');
				});
			}, 300);
		}
	}
}

window.initProjectButtonsDropdowns = function initProjectButtonsDropdowns() {
	const projectButtonsDropdownsWrArr = document.querySelectorAll(
		'.project-dropdown-btn-wr'
	);

	if (projectButtonsDropdownsWrArr.length) {
		projectButtonsDropdownsWrArr.forEach((projectButtonsDropdownWr) => {
			if (!projectButtonsDropdownWr.classList.contains('is-init')) {
				projectButtonsDropdownWr.classList.add('is-init');

				const btn = projectButtonsDropdownWr.querySelector(
					'.project-dropdown-open-btn'
				);
				const content = projectButtonsDropdownWr.querySelector(
					'.project-dropdown-btn-content'
				);
				const contentItemsArr = content.querySelectorAll(
					'.project-dropdown-btn-content__link'
				);
				const placeholder = projectButtonsDropdownWr.querySelector(
					'.project-dropdown-placeholder'
				);

				if (placeholder) {
					checkedSelectedItems();
				}

				function checkedSelectedItems() {
					contentItemsArr.forEach((item) => {
						if (item.classList.contains('is-selected')) {
							const flag = item.querySelector(
								'.project-dropdown-btn-content__link-flag'
							);

							placeholder.textContent = item.dataset.placeholderValue ? item.dataset.placeholderValue : item.textContent;

							if (item.querySelector('.amd-value-to-label')) {
								placeholder.textContent = item.querySelector(
									'.amd-value-to-label'
								).textContent;
							}

							if (placeholder.classList.contains('if-language')) {
								const flagClone = flag.cloneNode(true);
								placeholder.innerHTML = '';
								placeholder.appendChild(flagClone);
							}
						}
					});
				}

				document.body.appendChild(content);
				content.style.position = 'absolute';

				btn.addEventListener('click', (e) => {
					e.preventDefault();

					if (!content.classList.contains('is-open')) {
						function contentPositionFunc() {
							content.style.minWidth = btn.clientWidth + 'px';
							const btnRect = btn.getBoundingClientRect();
							const contentRect = content.getBoundingClientRect();
							const viewportWidth = window.innerWidth;
							const viewportHeight = window.innerHeight;
							const scrollTop =
								window.scrollY || document.documentElement.scrollTop;

							let top = btnRect.bottom + scrollTop;
							let left = btnRect.right - contentRect.width;

							if (left < 0) left = btnRect.left;

							/*if (top + contentRect.height > viewportHeight + scrollTop) {
								top = btnRect.top - contentRect.height + scrollTop;
							}*/

							if (content.classList.contains('if-bottom-position')) {
								top = btnRect.top + scrollTop;
								content.style.top = `${top + btn.clientHeight + 4}px`;
							} else {
								content.style.top = `${top - btn.clientHeight - 4}px`;
							}

							if (content.classList.contains('if-left-position')) {
								left = btnRect.left;

								if(content.classList.contains('if-mobile-right-position') && window.innerWidth <= 1260) {
									left = btnRect.right - contentRect.width;
								}
							}

							content.style.left = `${left}px`;
						}
						contentPositionFunc();
						content.classList.add('is-open');
						projectButtonsDropdownWr.classList.add('is-open');
						setTimeout(() => {
							contentPositionFunc();
						}, 0);
					} else {
						content.classList.remove('is-open');
						projectButtonsDropdownWr.classList.remove('is-open');
					}
				});

				document.addEventListener('click', (e) => {
					if (!content.contains(e.target) && !btn.contains(e.target)) {
						content.classList.remove('is-open');
						projectButtonsDropdownWr.classList.remove('is-open');
					}
				});

				function hideDropdown() {
					content.classList.remove('is-open');
					projectButtonsDropdownWr.classList.remove('is-open');
				}

				if (content.classList.contains('if-hidden-on-scroll')) {
					document.addEventListener('scroll', () => {
						hideDropdown();
					});

					document.addEventListener('touchmove', () => {
						hideDropdown();
					});
				}

				const scrollContainer = projectButtonsDropdownWr.closest(
					'.project-container-scroll'
				);
				if (scrollContainer) {
					scrollContainer.addEventListener('scroll', hideDropdown);
					scrollContainer.addEventListener('touchmove', hideDropdown);
				}

				if (content.querySelector('.is-selected')) {
					contentItemsArr.forEach((item) => {
						item.addEventListener('click', (e) => {
							if (item.tagName === 'A' || item.tagName === 'BUTTON') {
								e.preventDefault();
							}

							for (let i = 0; i < contentItemsArr.length; i++) {
								contentItemsArr[i].classList.remove('is-selected');
							}
							item.classList.add('is-selected');

							if (placeholder) {
								checkedSelectedItems();
							}

							if (item.classList.contains('if-open-amd-inline')) {
								if (!item.classList.contains('is-open-amd-inline')) {
									item.classList.add('is-open-amd-inline');
								}
							}
						});

						if (item.classList.contains('if-open-amd-inline')) {
							const adpClose = item.querySelector(
								'.project-dropdown-btn-content__link-calendar-close'
							);
							setInterval(function () {
								if (item.classList.contains('is-open-amd-inline')) {
									checkedSelectedItems();
								}
							}, 300);

							adpClose.addEventListener('click', (e) => {
								setTimeout(function () {
									item.classList.remove('is-open-amd-inline');
								}, 50);
							});
						}
					});
				}
			}
		});
	}
};

initProjectButtonsDropdowns();

const planCards = document.querySelectorAll(".plan-sec__item");

if(planCards.length) {
	document.addEventListener("mousemove", (e) => {
		planCards.forEach((card) => {
			const rect = card.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;

			// расстояние от центра карточки до курсора
			const dx = e.clientX - cx;
			const dy = e.clientY - cy;
			const dist = Math.sqrt(dx * dx + dy * dy);

			// нормализация: ближе → ярче, дальше → тусклее
			const maxDist = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
			const glow = Math.max(0, 1 - dist / (maxDist / 2)); // 0..1

			// позиция курсора относительно карточки (%)
			const x = ((e.clientX - rect.left) / rect.width) * 100;
			const y = ((e.clientY - rect.top) / rect.height) * 100;

			card.style.setProperty("--mx", `${x}%`);
			card.style.setProperty("--my", `${y}%`);
			card.style.setProperty("--glow", glow.toFixed(2));
		});
	});
}

window.initPasswordInputs = function initPasswordInputs() {
	const wrappers = document.querySelectorAll('.password-input');
	if (!wrappers.length) return;

	wrappers.forEach((wrapper) => {
		const input = wrapper.querySelector('input[type="password"], input[type="text"]');
		const btn = wrapper.querySelector('.password-input__btn');
		const iconShow = btn.querySelector('.icon-show');
		const iconHide = btn.querySelector('.icon-show-off');

		if (!input || !btn) return;

		input.type = "password";
		iconShow.classList.remove('hidden');
		iconHide.classList.add('hidden');

		btn.addEventListener('click', () => {
			const isHidden = input.type === "password";

			if (isHidden) {
				input.type = "text";
				iconShow.classList.add('hidden');
				iconHide.classList.remove('hidden');
			} else {
				input.type = "password";
				iconShow.classList.remove('hidden');
				iconHide.classList.add('hidden');
			}
		});
	});
};

initPasswordInputs();

window.openPopup = function openPopup(id) {
	const popup = document.getElementById(id);
	if (!popup) return;
	menuCloseFunc();
	popup.classList.add('is-open');
	scrollLock.clearQueueScrollLocks();
	scrollLock.disablePageScroll();
	scrollLock.addScrollableSelector('.simplebar-content-wrapper');
	scrollLock.addScrollableSelector(".scroll-content");

	function closePopup() {
		popup.classList.remove("is-open");
		popup.removeEventListener("click", backdropHandler);
		const closes = popup.querySelectorAll("[data-popup-close]");
		closes.forEach((btn) => btn.removeEventListener("click", closePopup));
		scrollLock.enablePageScroll();
	}

	const closes = popup.querySelectorAll('[data-popup-close]');
	closes.forEach(btn => btn.addEventListener('click', closePopup));

	function backdropHandler(e) {
		if (e.target === popup) {
			closePopup();
		}
	}
	popup.addEventListener('click', backdropHandler);
};

AOS.init({
	offset: 50,
	delay: 10,
	duration: 600,
	easing: 'ease-in-out',
	once: true,
	startEvent: 'DOMContentLoaded',
});

const scroll = new SmoothScroll("a[href*=\"#\"]");