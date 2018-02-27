export default function anchorScroll(callback) {
	let links = document.querySelectorAll('[data-nav-link]');

	[...links].forEach(link => {
		let id = link.getAttribute('href');
		let scrollEl = document.querySelector(`#${id}`);

		link.addEventListener('click', e => {
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $(scrollEl).offset().top
			},
			{
				duration: 1000,
				complete: callback()
			});
		});
	});
}