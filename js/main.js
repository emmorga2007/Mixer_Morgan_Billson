(() => {
	// set up the puzzle pieces and boards
	// navButtons -> images at the bottom of the page
	const resetButton = document.querySelector('#resetButton'), 
		musicBoard = document.querySelector('.music-board'),
		instrumentZones =  
		instruments = document.querySelectorAll('.instruments img'), 
		dropZones = document.querySelectorAll('.drop-zone');

		const pieces = ["instrument1", "instrument2", "instrument3", "instrument4", "instrument5", "instrument6", "instrument7", "instrument8", "instrument9", "instrument10", "instrument11", "instrument12"];

	// DRAG N DROP FUNCTIONS //

	function setInstruments(event) {
		pieces.forEach((piece, index) => { 
		instruments[index].src = `images/${piece}.svg`;
		instruments[index].id =`${piece}`; 
	});
	}

	function dragStart(event) {
		event.dataTransfer.setData("text/plain", this.id);
	}

	function allowDragOver(event) {
		event.preventDefault();
	}

	function allowDrop(event) {
		let currentPiece = event.dataTransfer.getData("text/plain", this.id);
		event.target.appendChild(document.querySelector(`#${currentPiece}`));
	}

	// END DRAG N DROP FUNCTIONS

	// PLAYING AUDIO FUNCTIONS 

	function playSound(event) {
		debugger;
	let currentPiece = event.dataTransfer.getData("text/plain", this.id);
   	let audioElement = document.querySelector(`audio[data-instrument="${currentPiece}"]`);

    // the ! is a check for inequality (it means the condition is false)
    // also called a bang operator
    // if there is no matching audio element, then kill the function and do nothing
  	  if (!audioElement) { return }

    // if we have a match, then play the sound that goes with the keyboard key
  	  audioElement.currentTime = 0;  // no brackets means it's a property
  	  audioElement.play(); // round brackets means this is a method - a built-in function
	
  	  // add something to indicate that it's playing 
  	  key.classList.add('playing');
  }



	window.addEventListener('load', setInstruments);

	// set up our Drag event
	instruments.forEach(piece => piece.addEventListener('dragstart', dragStart));

	// set up the dragover content for our drop zones

	dropZones.forEach(zone => zone.addEventListener('dragover', allowDragOver));
	dropZones.forEach(zone => zone.addEventListener('drop', allowDrop));
	dropZones.forEach(zone => zone.addEventListener('drop', playSound));

})();
