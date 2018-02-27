require("babel-polyfill");
// import nav from '../components/nav/nav.js';
// import cardSlider from '../components/card-slider/card-slider.js';
import fullpageContent from '../components/fullpage/fullpage.js';
import sec4Slider from '../components/sec4/sec4.js';
import sec1 from '../components/sec1/sec1.js';
import modal from '../components/modal/modal.js';
import mobileNav from '../components/mobile-nav/mobile-nav.js';
import textGallery from '../components/text-gallery/text-gallery.js';
import apps from '../components/apps/apps.js';
import $ from 'jquery';

const app = {
	load () {
		app.bindEvents();
	},

	bindEvents () {
		document.documentElement.classList.add('load');

		textGallery();
		mobileNav();
		fullpageContent();
		sec4Slider('game');
		sec1();
		modal();
		apps();
	}
};

window.addEventListener('load', app.load);