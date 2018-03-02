// import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
// import TweenMax from 'gsap/src/uncompressed/TweenMax';


export default function apps() {
	let runPlugin = false;
	let controller;
	let headWrap = document.querySelector('.apps__head-wrap');
	let bagesList = document.querySelector('.apps__top-bages_top');
	let appsBottom = document.querySelector('.apps__bottom');
	let windowHeight = document.documentElement.clientHeight;

	let headWrapBottom;
	let topOffset;

	function createParallax() {
		runPlugin = true;
		controller = new ScrollMagic.Controller();

		headWrapBottom = headWrap.clientHeight + 120;
		topOffset = windowHeight - headWrapBottom;

		let phoneTween = new TimelineMax({ paused: true});
		phoneTween.add(TweenMax.to('.apps__phone-wrap', 1, { css: { yPercent: 20}, ease: Linear.easeNone }));

		let headTween = new TimelineMax({ paused: true});
		headTween.add(TweenMax.to('.apps__head', 1, { css: { yPercent: -40}, ease: Linear.easeNone }));

		let sceneHead = new ScrollMagic.Scene()
			.setPin('.apps__top')
			.addTo(controller)
			// .addIndicators()

		let scenePhone = new ScrollMagic.Scene({duration: 800 })
			.addTo(controller)
			// .addIndicators()

		let sceneTop = new ScrollMagic.Scene({ offset: topOffset})
			.addTo(controller)
			// .addIndicators()
			.triggerHook("onLeave")

		let sceneBottom = new ScrollMagic.Scene({ triggerElement: '.apps__bottom', offset: 200, duration: 500 })
			.addTo(controller)
			// .addIndicators()

		function phoneParallax (event) {
			phoneTween.play();
			scenePhone.setTween(phoneTween)
		}

		scenePhone.on("enter", phoneParallax);
		sceneTop.on('update', function(e) {

			if (windowHeight - headWrapBottom < e.scrollPos) {
				headWrap.style.transform = 'translateY(' + (windowHeight - headWrapBottom - e.scrollPos) + 'px)';
			}
		});
	}

	if (document.querySelector('.apps')) {
		let media = window.matchMedia('(max-width: 1024px)').matches;

		if (!media) {
			createParallax();
		}

		window.addEventListener('resize', function() {
			let media = window.matchMedia('(max-width: 1024px)').matches;
			headWrap.style.transform = 'translateY(0)';

			if (media === false && runPlugin === false) {
				createParallax();
			} else if (media === true && runPlugin === true) {
				controller.destroy(true);
				runPlugin = false;
			}
		});
	}
}
