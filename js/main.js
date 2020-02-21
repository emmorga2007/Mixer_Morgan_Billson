(() => {
	// set up the puzzle pieces and boards
	// navButtons -> images at the bottom of the page
	const resetButton = document.querySelector('#resetButton'), 
		musicBoard = document.querySelector('.music-board'), 
		instruments = document.querySelectorAll('.instruments img'), 
		dropZones = document.querySelectorAll('.drop-zone');

		const pieces = ["instrument1", "instrument2", "instrument3", "instrument4", "instrument5", "instrument6", "instrument7", "instrument8", "instrument9"];

	// DRAG N DROP FUNCTIONS //

	function setInstruments(event) {
		pieces.forEach((piece, index) => { 
		instruments[index].src = `images/${piece}.png`;
		instruments[index].id =`${piece}`; 
	});
	}

	function dragStart(event) {
		console.log('started a drag');
		event.dataTransfer.setData("text/plain", this.id);
		console.log(this.id);
	}

	function allowDragOver(event) {
		event.preventDefault();
		console.log('you dragged something onto me!');
	}

	function allowDrop(event) {
		console.log('you dropped something onto me!');
		let currentPiece = event.dataTransfer.getData("text/plain", this.id);
		console.log(this.id);
		event.target.appendChild(document.querySelector(`#${currentPiece}`));
	}

	// END DRAG N DROP FUNCTIONS

	// PLAYING AUDIO FUNCTIONS 
	

	window.addEventListener('load', setInstruments);

	// set up our Drag event
	instruments.forEach(piece => piece.addEventListener('dragstart', dragStart));

	// set up the dragover content for our drop zones

	dropZones.forEach(zone => zone.addEventListener('dragover', allowDragOver));
	dropZones.forEach(zone => zone.addEventListener('drop', allowDrop));

})();
