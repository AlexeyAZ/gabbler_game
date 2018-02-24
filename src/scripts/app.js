require("babel-polyfill");
import nav from '../components/nav/nav.js';
import cardSlider from '../components/card-slider/card-slider.js';
import fullpageContent from '../components/fullpage/fullpage.js';

const app = {
	load: () => {
		app.bindEvents();
	},

	bindEvents: () => {
		// let navHandlers = nav();

		// function addHandlers() {
		// 	if (!window.matchMedia('(max-width:1700px)').matches) {
		// 		navHandlers.run();
		// 	} else {
		// 		navHandlers.disable();
		// 	}
		// }

		// addHandlers();
		// window.addEventListener('resize', addHandlers);

		fullpageContent();

		// let sec5Slider = cardSlider({el: '.js-sec5-slider'});
	}
};

window.addEventListener('load', app.load);