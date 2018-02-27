import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import TweenMax from 'gsap/src/uncompressed/TweenMax';
import TimelineMax from 'gsap/src/uncompressed/TimelineMax';
import { CSSPlugin } from "gsap";


export default function apps() {
	let runPlugin = false;
	let controller;

	function createParallax() {
		runPlugin = true;
		controller = new ScrollMagic.Controller();

		let phoneTween = new TimelineMax({ paused: true});
		phoneTween.add(TweenMax.to('.apps__phone-wrap', 1, { css: { yPercent: 20}, ease: Linear.easeNone }));

		let headTween = new TimelineMax({ paused: true});
		headTween.add(TweenMax.to('.apps__head', 1, { css: { yPercent: -40}, ease: Linear.easeNone }));

		let sceneHead = new ScrollMagic.Scene({ triggerElement: '.apps__top'})
			.setPin('.apps__top')
			.addTo(controller)
			// .addIndicators()
			.triggerHook("onLeave")

		let scenePhone = new ScrollMagic.Scene({ offset: 100, duration: 800 })
			.addTo(controller)
			// .addIndicators()

		let sceneBottom = new ScrollMagic.Scene({ triggerElement: '.apps__bottom', offset: 200, duration: 500 })
			.addTo(controller)
			// .addIndicators()

		function phoneParallax (event) {
			phoneTween.play();
			scenePhone.setTween(phoneTween)
		}

		scenePhone.on("enter", phoneParallax);
	}

	if (document.querySelector('.apps')) {
		let media = window.matchMedia('(max-width: 1024px)').matches;

		if (!media) {
			createParallax();
		}

		window.addEventListener('resize', function() {
			let media = window.matchMedia('(max-width: 1024px)').matches;

			if (media === false && runPlugin === false) {
				createParallax();
			} else if (media === true && runPlugin === true) {
				controller.destroy(true);
				runPlugin = false;
			}
		});
	}
}
