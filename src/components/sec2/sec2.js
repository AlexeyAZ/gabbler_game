export default function sec2(options = { el }) {
	let slider = $(options.el);
	let slidesContainer = slider.find('.sec2__bottom-slider');
	let nav = $('.sec2__slider-nav');
	let navItems = $('.sec2__slider-nav-item');
	let navButtons = $('.sec2__slider-nav-link');

	let animationInProgress = false;
	let activeItem = '';

	navButtons.on('click', function(e) {
		e.preventDefault();

		let self = $(this);
		let btnName = self.attr('data-name');

		if (animationInProgress === false && btnName !== activeItem) {
			setActiveSlide(btnName);
		}
	});

	$(`.sec2__slider-nav-link[data-name="${navItems.length - 1}"]`).closest('.sec2__slider-nav-item').addClass('sec2__slider-nav-item_active');

	setActivePin(navItems.length - 1);

	function setActivePin(name) {
		if ($('.sec2__slider-nav-item_active').length > 0) {
			$('.sec2__slider-nav-item_active').removeClass('sec2__slider-nav-item_active');
		}

		$(`.sec2__slider-nav-link[data-name="${name}"]`).closest('.sec2__slider-nav-item').addClass('sec2__slider-nav-item_active');
	}

	function setActiveSlide(name) {
		animationInProgress = true;
		let item = slidesContainer.find(`.sec2__slider-item:last-child`);
		let nextItem = slidesContainer.find(`.sec2__slider-item[data-name="${name}"]`);

		item.before(nextItem);
		nextItem.addClass('sec2__slider-item_movetop');

		item.addClass('sec2__slider-item_hide');
		item[0].addEventListener('transitionend', moveSlideEnd);

		setActivePin(name);

		function moveSlideEnd() {
			slidesContainer.prepend(item);
			item.removeClass('sec2__slider-item_hide');
			item[0].removeEventListener('transitionend', moveSlideEnd);

			setTimeout(function() {
				animationInProgress = false;
				activeItem = name;
			}, 600);
		}
	}
}
