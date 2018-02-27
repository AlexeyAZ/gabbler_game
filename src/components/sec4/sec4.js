export default function sec4Slider(startCategory) {
	let slider = document.querySelector('.sec4__slider');
	let activeIndex = 0;
	let activeCategory = startCategory;
	let animationDuration = '0.5s';
	let init = true;
	let disableLinks = false;

	if (slider) {
		let cards = slider.querySelectorAll('.sec4__slider-cards');
		let nav = slider.querySelector('.sec4__slider-nav');
		let links = slider.querySelectorAll('.sec4__slider-nav-link');
		let body = slider.querySelector('.sec4__slider-body');

		body.style.transition = animationDuration;
		[...cards].forEach(card => {
			card.style.transition = animationDuration;
		});

		[...links].forEach(link => {
			link.addEventListener('click', e => {
				e.preventDefault();

				let category = link.getAttribute('data-category');

				if (!disableLinks && activeCategory !== category) {
					setActiveItem(category);
				}
			});
		});
		
		setActiveItem(activeCategory);

		function setActiveItem(category) {
			activeCategory = category;
			let nowActiveItem = body.querySelector('.sec4__slider-cards_active');
			let nowActiveItemHeight;

			let newActiveItem = body.querySelector(`[data-category="${category}"]`);
			let newActiveItemHeight = newActiveItem.clientHeight;

			let nowActiveNavLink = nav.querySelector('.state_active');
			let newActiveNavLink = nav.querySelector(`[data-category="${category}"]`);

			if (init === true) {
				newActiveNavLink.classList.add('state_active');
				newActiveItem.classList.add('sec4__slider-cards_active');

				init = false;
			} else {
				disableLinks = true;

				nowActiveNavLink.classList.remove('state_active');
				newActiveNavLink.classList.add('state_active');

				nowActiveItemHeight = nowActiveItem.clientHeight;
				body.style.height = `${nowActiveItemHeight}px`;

				nowActiveItem.addEventListener('transitionend', runCardAnimation);
				nowActiveItem.classList.add('sec4__slider-cards_hide');
			}

			function runCardAnimation() {
				body.style.height = `${newActiveItemHeight}px`;
				newActiveItem.classList.add('sec4__slider-cards_active');

				nowActiveItem.classList.remove('sec4__slider-cards_hide');
				nowActiveItem.classList.remove('sec4__slider-cards_active');

				nowActiveItem.removeEventListener('transitionend', runCardAnimation);
				newActiveItem.addEventListener('transitionend', endCardAnimation);

				disableLinks = false;
			}

			function endCardAnimation() {
				body.style.height = 'auto';
				newActiveItem.removeEventListener('transitionend', endCardAnimation);
			}
		}
	}
}
