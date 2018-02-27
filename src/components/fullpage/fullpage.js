import $ from "jquery";
import fullpage from "fullpage.js";

export default function fullpageContent() {
	const fullpageEl = document.querySelector('.fullpage');
	let runPlugin = false;

	function createFullpage() {
		runPlugin = true;
		let anchors = [];
		let sectionsLength = document.querySelectorAll('.section').length;
		for (let i = 0; i <= sectionsLength; i++) {
			anchors.push(`slide${i + 1}`);
		}
		const fullpageOptions = {
			anchors
		};

		$(fullpageEl).fullpage(fullpageOptions);
	}

	if (fullpageEl) {
		let media = window.matchMedia('(max-width: 1700px)').matches;

		if (!media) {
			createFullpage();
		}

		window.addEventListener('resize', function () {
			let media = window.matchMedia('(max-width: 1700px)').matches;

			if (media === false && runPlugin === false) {
				createFullpage();
			} else if (media === true && runPlugin === true) {
				$.fn.fullpage.destroy('all');
				runPlugin = false;
			}
		});
	}
}