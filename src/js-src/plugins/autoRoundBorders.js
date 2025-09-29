const flexElementsParent = document.querySelector("#flex-elements-parent");
const allElementsArr = [
	...flexElementsParent.querySelectorAll(".flex-element"),
];
function autoRoundBorders() {
	let parentWidth = flexElementsParent.getBoundingClientRect().width;
	let elementWidth = Math.floor(
		allElementsArr[0].getBoundingClientRect().width
	);
	let columnCount = Math.floor(parentWidth / elementWidth);
	let elementsInLastRow = allElementsArr.length % columnCount;

	allElementsArr.forEach((elem, index) => {
		elem.classList.remove(
			"rounded-tl-xl",
			"rounded-tr-xl",
			"rounded-bl-xl",
			"rounded-br-xl"
		);

		// first element in first row
		if (index === 0) elem.classList.add("rounded-tl-xl");
		// last element in first row
		if (
			index === columnCount - 1 ||
			(allElementsArr.length < columnCount &&
				index === allElementsArr.length - 1)
		)
			elem.classList.add("rounded-tr-xl");

		// first element in previous row of last
		if (index === allElementsArr.length - elementsInLastRow - columnCount)
			elem.classList.add("rounded-bl-xl");
		// last element in previous row of last
		if (index === allElementsArr.length - elementsInLastRow - 1)
			elem.classList.add("rounded-br-xl");

		// first element in last row
		if (index === allElementsArr.length - elementsInLastRow)
			elem.classList.add("rounded-bl-xl");
		// last element in last row
		if (index === allElementsArr.length - 1)
			elem.classList.add("rounded-br-xl");
	});
}

const mobMatchMedia = window.matchMedia("(max-width: 768px)");
const mobMatchMediaXl = window.matchMedia("(max-width: 1280px)");

if (navigator.sayswho === "Safari 12" || navigator.sayswho === "Safari 13") {
	mobMatchMedia?.addListener(autoRoundBorders);
	mobMatchMediaXl?.addListener(autoRoundBorders);
} else {
	mobMatchMedia?.addEventListener("change", autoRoundBorders);
	mobMatchMediaXl?.addEventListener("change", autoRoundBorders);
}

autoRoundBorders();