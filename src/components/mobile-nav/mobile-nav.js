import anchorScroll from '../../js-helpers/anchorScroll'

export default function mobileNav() {
	let nav = document.querySelector('.mobile-nav');
	let openNavLinks = document.querySelectorAll('[data-open-nav]');
	let closeNavLinks = document.querySelectorAll('[data-close-nav]');
	let open = false;

	if (nav) {
		nav.addEventListener('click', e => {

			if (e.target.classList.contains('mobile-nav')) {
				closeNav();
			}
		});

		anchorScroll(function() {
			if (document.documentElement.classList.contains('disable-scroll')) {
				closeNav();
			}
		});

		[...openNavLinks].forEach(link => {

			link.addEventListener('click', e => {
				e.preventDefault();

				if (open === true) {
					closeNav();
				} else {
					openNav();
				}
			});
		});

		[...closeNavLinks].forEach(link => {

			link.addEventListener('click', e => {
				e.preventDefault();

				if (open === true) {
					openNav();
				} else {
					closeNav();
				}
			});
		});
	}

	function openNav() {

		if (nav) {
			document.documentElement.classList.add('disable-scroll');
			nav.classList.add('mobile-nav_show');

			nav.addEventListener('transitionend', navOpened);

			function navOpened() {
				nav.removeEventListener('transitionend', navOpened);
				open = true;
			}
		}
	}

	function closeNav() {

		if (nav) {
			document.documentElement.classList.remove('disable-scroll');
			nav.classList.remove('mobile-nav_show');
		}

		nav.addEventListener('transitionend', navClosed);

		function navClosed() {
			nav.removeEventListener('transitionend', navClosed);
			open = false;
		}
	}
}
