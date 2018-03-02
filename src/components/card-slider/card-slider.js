export default function cardSlider(options = { el }) {
	let slider = $(options.el);
	let slidesContainer = slider.find('.sec5__slider-slides');
	let nav = $('.sec5__tags');
	let navButtons = $('.sec5__tags-btn');

	let animationInProgress = false;
	let activeItem = '';
	let activeItemName = navButtons.first().data('name');

	navButtons.on('click', function(e) {
		e.preventDefault();

		let self = $(this);
		let btnName = self.attr('data-name');

		if (animationInProgress === false && btnName !== activeItem) {
			setActiveSlide(btnName);
		}
	});

	if (slider.length > 0) {
		setActiveSlide(activeItemName);
	}

	function setActivePin(name) {
		if ($('.sec5__tags-btn.state_active').length > 0) {
			$('.sec5__tags-btn.state_active').removeClass('state_active');
		}

		$(`.sec5__tags-btn[data-name="${name}"]`).addClass('state_active');
	}

	function setActiveSlide(name) {
		animationInProgress = true;
		let item = slidesContainer.find(`.sec5__slider-card:last-child`);
		let nextItem = slidesContainer.find(`.sec5__slider-card[data-name="${name}"]`);

		item.before(nextItem);

		item.addClass('sec5__slider-card_hide');
		item[0].addEventListener('transitionend', moveSlideEnd);

		setActivePin(name);

		function moveSlideEnd() {
			slidesContainer.prepend(item);
			item.removeClass('sec5__slider-card_hide');
			item[0].removeEventListener('transitionend', moveSlideEnd);

			setTimeout(function() {
				animationInProgress = false;
				activeItem = name;
			}, 600);
		}
	}
}