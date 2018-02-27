import youtubeVideo from '../../js-helpers/youtubeVideo';

export default function sec1() {
	youtubeVideo('sec1Video', 'i-kVeQOmMSo', {
		controls: 0,
		autoplay: 1
	}, {}, {
		onReady (e) {
			e.target.mute();
			videoLoaded = true;
		}
	});
}
