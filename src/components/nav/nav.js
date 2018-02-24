import scrollToElement from 'scroll-to-element';
import ScrollFeatures from 'scrollfeatures';

export default function nav() {
	let nav = document.querySelector('.js-nav');
	let navDefaultClasses = nav.getAttribute('class');
	let navContent = nav.querySelector('.nav__content');
	let navList = nav.querySelector('.nav__list');
	let navHeight = nav.clientHeight;
	let navItems = navList.querySelectorAll('.nav__list-item');
	let navLinks = navList.querySelectorAll('.nav__list-link');
	let navImg = nav.querySelector('.nav__number-img');
	let sections = document.querySelectorAll('[data-sec]');
	let activeSec;
	let scrollFeatures = new ScrollFeatures();


	scrollFeatures.on('scroll:down', function(event) {
		console.log(1);
	});

	function navLinksHandlers() {

		[...navLinks].forEach(link => {
			link.addEventListener('click', function(e) {
				e.preventDefault();
				scrollToSection(link);
			})

			function scrollToSection(link) {
				let section = link.getAttribute('href');
				let el = document.querySelector('[data-sec="' + section + '"]');
				let offset = el && el.hasAttribute('data-offset') ? el.getAttribute('data-offset') : 0;
				scrollToElement(el, { duration: 1000, ease: 'inOutQuad', offset: +offset});
			}
		});
	}
	navLinksHandlers();


	function navHandlers() {
		let navTop = nav.getBoundingClientRect().top;

		[...sections].forEach(section => {
			let secStyle = window.getComputedStyle(section);
			let secMarginTop = Math.abs(parseInt(secStyle.marginTop));
			let secMarginBottom = Math.abs(parseInt(secStyle.marginBottom));
			let marginOffset = 0;
			let color;

			if (secMarginTop !== 0) {
				marginOffset = secMarginTop;
			}

			if (Math.abs(section.getBoundingClientRect().top) - (navTop + navHeight) + marginOffset <= 0 && Math.abs(section.getBoundingClientRect().bottom) - (navTop + navHeight) > 0) {
				if (activeSec !== section.getAttribute('data-sec')) {
					activeSec = section.getAttribute('data-sec');
					nav.setAttribute('class', navDefaultClasses);

					if (document.querySelector('.nav__list-item_active')) {
						document.querySelector('.nav__list-item_active').classList.remove('nav__list-item_active');
					}
				}

				color = section.getAttribute('data-nav-color');
				nav.classList.add(color);
				navList.querySelector('.nav__list-item[data-index="' + activeSec + '"]').classList.add('nav__list-item_active');
				navList.style.transform = 'translateY(' + (-2.2 * activeSec) + 'em)';
				navImg.setAttribute('src', 'img/nav-' + activeSec + '.svg');
				
				// console.log(section.getAttribute('data-sec'));
			}
		});
	}

	function run() {
		navHandlers();

		window.addEventListener('scroll', navHandlers);
	}

	function disable() {
		window.removeEventListener('scroll', navHandlers);
	}

	return {
		run,
		disable
	}
}
