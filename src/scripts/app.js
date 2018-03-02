require("babel-polyfill");

import cardSlider from '../components/card-slider/card-slider.js';
import fullpageContent from '../components/fullpage/fullpage.js';
import sec4Slider from '../components/sec4/sec4.js';
import sec1 from '../components/sec1/sec1.js';
import sec2 from '../components/sec2/sec2.js';
import modal from '../components/modal/modal.js';
import mobileNav from '../components/mobile-nav/mobile-nav.js';
import textGallery from '../components/text-gallery/text-gallery.js';
import apps from '../components/apps/apps.js';
// import $ from 'jquery';

const app = {
	load () {
		app.bindEvents();
	},

	bindEvents () {
		document.documentElement.classList.add('load');

		textGallery();
		mobileNav();
		fullpageContent();
		sec1();
		sec2({ el: '.sec2__bottom'});
		modal();
		apps();
		sec4Slider('game');
		cardSlider({ el: '.sec5__slider'});
	}
};

window.addEventListener('load', app.load);