import { TweenMax, CSSPlugin, Power2, TimelineLite} from "gsap";
import { setTimeout } from "timers";


export default function cardSlider(options = { el}) {

	const cls = {
		slider: '',
		sliderNav: 'card-slider__nav',
		slide: 'card-slider__slide',
		slideActive: 'card-slider__slide_active',
		slideHide: 'card-slider__slide_hide',
		slideLink: 'card-slider__link',
		slideLinkInner: 'card-slider__link-inner',
	};

	const data = {
		index: 'data-index',
		active: 'data-active'
	};

	const defaultCss = {
		position: 'absolute',
		top: '0',
		left: '0',
		height: '100%',
		width: '100%',
		scaleX: 1,
		scaleY: 1,
		visibility: 'visible'
	}

	const dissapearCss = {
		opacity: 0,
		scaleX: 1.4,
		scaleY: 1.4,
		// visibility: 'hidden'
	}

	const activeCss = {
		position: 'relative',
		top: 'auto',
		left: 'auto',
		height: '300px',
		width: 'auto',
		scaleX: 0.8,
		scaleY: 1.2,
		visibility: 'visible'
	};

	const subActiveCss = {
		1: {
			scaleX: 0.9,
			scaleY: 1.1,
			visibility: 'visible'
		}
	}
	
	let slider = document.querySelector(options.el);
	let sliderNav = document.querySelector(`.${cls.sliderNav}`);
	let slides = slider.querySelectorAll(`.${cls.slide}`);
	let startIndex = 0;
	let startSubIndex = 1;

	function createSliderNav(index) {
		let linkEl = document.createElement('a');
		let navLink = `<span class="${cls.slideLinkInner}">${index}</span>`;

		linkEl.setAttribute('href', '');
		linkEl.setAttribute(data.index, index);
		linkEl.setAttribute('class', cls.slideLink)
		linkEl.insertAdjacentHTML('afterbegin', navLink);

		sliderNav.insertAdjacentElement('beforeend', linkEl);
	}

	[...slides].forEach((slide, index) => {
		slide.setAttribute(data.index, index);
		
			
		if (index === startIndex) {
			TweenLite.set(slide, { css: activeCss });
		} else if (index === startSubIndex){
			TweenLite.set(slide, { css: subActiveCss['' + index] });
		}
		slide.setAttribute(data.active, index);

		createSliderNav(index);
	});


	let sliderLinks = document.querySelectorAll(`.${cls.slideLink}`);
	sliderLinks.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault();

			let linkIndex = link.getAttribute(data.index);
			setActiveSlide(linkIndex);
		});
	})

	
	function setActiveSlide(index) {
		let currentActive = document.querySelector(`[${data.active}="${startIndex}"]`);
		let newActive = document.querySelector(`[${data.index}="${index}"]`);
		let newSubActive = document.querySelector(`[${data.index}="${index + 1}"]`);

		function setInactive() {
			let activeElements = document.querySelectorAll(`[${data.active}]`);

			[...activeElements].forEach(item => {
				item.removeAttribute(data.active);
			});
		}

		if (newActive.getAttribute(data.active) === startSubIndex) {
			// TweenLite.to(currentActive, 2, { css: dissapearCss, ease: Power2.easeOut, onComplete: setInactive });
			// TweenLite.to(newActive, 2, { css: activeCss, ease: Power2.easeOut, onComplete: setInactive});
		} else {
			TweenLite.to(currentActive, 2, { css: dissapearCss, ease: Power2.easeOut, onStart: setInactive });

			TweenLite.to(newActive, 2, { css: activeCss, ease: Power2.easeOut});
			newActive.setAttribute(data.active, startIndex);
			
			TweenLite.to(newSubActive, 2, { css: subActiveCss[startSubIndex], ease: Power2.easeOut });
			newSubActive.setAttribute(data.active, startSubIndex);
		}

		// for (let i = 1; i <= visibleSlides.length; i++) {
		// 	document.querySelector(`[${data.active}="${i}"]`).removeAttribute(data.active);
		// }

		// for (let j = startIndex + 1; j <= visibleSlides.length; j++ ) {

		// 	for (let i = startIndex + 1; i <= slides.length; i++) {
		// 		var newSubActive = document.querySelector(`[${data.index}="${i}"]`);

		// 		if (newSubActive) {
		// 			newSubActive.setAttribute(data.active, j)
		// 		}
		// 	}
		// }
	}
}