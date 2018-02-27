import $ from 'jquery';
import youtubeVideo from '../../js-helpers/youtubeVideo';

export default function textGallery() {
	let galleries = document.querySelectorAll('.text-gallery');

	if (galleries.length > 0) {
		[...galleries].forEach(gallery => {
			let links = gallery.querySelectorAll('.text-gallery__list-link');
			let items = gallery.querySelectorAll('.text-gallery__list-item');
			let description = gallery.querySelectorAll('.text-gallery__description');
			let videos = gallery.querySelector('.text-gallery__videos');

			let activeIndex = 0;
			let player;
			let videoLoaded = false;
			let disableLinks = false;

			[...items].forEach((item, index) => {
				item.querySelector('.text-gallery__list-link').setAttribute('data-index', index);
			});

			[...links].forEach(link => {

				link.addEventListener('click', e => {
					e.preventDefault();

					if (!disableLinks && activeIndex !== link.getAttribute('data-index')) {
						setActiveItem(link);
					}
				});
			});

			function setActiveItem(link) {
				let index = link.getAttribute('data-index');
				activeIndex = +index;
				let videoId = link.getAttribute('data-video-link');
				let activeItem = gallery.querySelector('.text-gallery__list-item_active');
				let activeDescription = gallery.querySelector('.text-gallery__description_active');

				let newActiveItem = items[index];
				let newactiveDescription = description[index];


				if (videoLoaded) {
					player.destroy();
					createVideoFrame(videoId);
				} else {
					createVideoFrame(videoId);
				}

				if (activeItem) {
					activeItem.classList.remove('text-gallery__list-item_active');
					newActiveItem.classList.add('text-gallery__list-item_active');
				} else {
					items[index].classList.add('text-gallery__list-item_active');
				}

				if (activeDescription) {
					disableLinks = true;

					$(activeDescription).fadeOut(400, () => {
						activeDescription.classList.remove('text-gallery__description_active');
						$(newactiveDescription).fadeIn().addClass('text-gallery__description_active');

						disableLinks = false;
					});
				} else {
					description[index].classList.add('text-gallery__description_active');
				}
			}

			function createVideoFrame(videoId) {
				player = youtubeVideo(videos, videoId, {
					controls: 0,
					autoplay: 1
				},{
					onReady (e) {
						e.target.mute();
						videoLoaded = true;
					},
					onStateChange (e) {
						
						if (e.data === 0) {
							let nextIndex;

							if (activeIndex + 1 >= links.length) {
								nextIndex = 0;
							} else {
								nextIndex = activeIndex + 1;
							}
							
							setActiveItem(links[nextIndex]);
						}
					}
				});
			}

			setActiveItem(links[activeIndex]);
		});
	}
}
