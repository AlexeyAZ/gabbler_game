import $ from "jquery";
import fullpage from "fullpage.js";

export default function fullpageContent() {
	const fullpageEl = document.querySelector('.fullpage');
	const fullpageOptions = {
		afterRender: function(){
			
		}
	};

	if (window.matchMedia('(max-width: 1700px)').matches) {
		
	} else {
		$(fullpageEl).fullpage(fullpageOptions);
	}


	$('.removeFullpage').on('click', function(e) {
		e.preventDefault();
		$(this).hide();
		$.fn.fullpage.destroy('all');
	});
}