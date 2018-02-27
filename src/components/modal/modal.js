export default function modal() {
	let modals = document.querySelectorAll('.modal');
	let links = document.querySelectorAll('[data-modal]');
	let closeLinks = document.querySelectorAll('[data-close-modal]');

	[...modals].forEach(modal => {
		modal.addEventListener('click', e => {

			if (e.target.classList.contains('modal')) {
				closeModal();
			}
		});
	});

	[...closeLinks].forEach(closeLink => {
		closeLink.addEventListener('click', e => {
			e.preventDefault();
			
			closeModal();
		});
	});

	[...links].forEach(link => {

		link.addEventListener('click', e => {
			e.preventDefault();

			let modalId = link.getAttribute('data-modal');
			openModal(modalId);
		});
	});

	function openModal(id) {
		let modalEl = document.querySelector(id);

		if (modalEl) {
			document.documentElement.classList.add('disable-scroll');
			modalEl.classList.add('modal_show');
		}
	}

	function closeModal() {
		let openModal = document.querySelector('.modal_show');

		if (openModal) {
			document.documentElement.classList.remove('disable-scroll');
			openModal.classList.remove('modal_show');
		}
	}
}
