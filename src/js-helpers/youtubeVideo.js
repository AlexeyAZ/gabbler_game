export default function youtubeVideo(elId, videoId, playerVars = {}, events = {}) {
	let player;

	function onYouTubeIframeAPIReady() {
		player = new YT.Player(elId, {
			videoId,
			playerVars,
			events
		});
	}

	function onPlayerReady(event) {
		event.target.playVideo();
	}

	function stopVideo() {
		player.stopVideo();
	}

	if (typeof YT !== 'undefined' && elId) {
		onYouTubeIframeAPIReady();
	}

	return player;
}