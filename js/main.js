(() => {
	// set up the puzzle pieces and boards
	// navButtons -> images at the bottom of the page
	const resetButton = document.querySelector('#resetButton'), 
		musicBoard = document.querySelector('.music-board'),
		instrumentZones = document.querySelectorAll('.iconZone'), 
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
		let zone = event.target.parentNode;
		event.dataTransfer.setData("text/plain", this.id);
		if (zone.classList.contains("hasPiece")) {
		    zone.classList.remove("hasPiece");
		}
		if (zone.classList.contains("playing")) {
			zone.classList.remove("playing");
		}
	}

	function allowDragOver(event) {
		event.preventDefault();
	}

	function allowDrop(event) {
		let zone = event.target;
		if (zone.classList.contains("hasPiece")) { return false }
		let currentPiece = event.dataTransfer.getData("text/plain", this.id);
		let currentInstrument = document.querySelector(`#${currentPiece}`);
		zone.appendChild(document.querySelector(`#${currentPiece}`));
		zone.classList.add('hasPiece');
	    currentInstrument.classList.add('hasPiece');
	}



	function playSound(event) {
		let zone = event.target;
		let currentPiece = event.dataTransfer.getData("text/plain", this.id);
   		let audioElement = document.querySelector(`audio[data-instrument="${currentPiece}"]`);
   		let currentInstrument = document.querySelector(`#${currentPiece}`);
  
  		if (!audioElement) { return }
  		if (zone.classList.contains("playing")) { return }
  	 	
  	 	audioElement.currentTime = 0;
  	 	audioElement.play(); 
  	 	zone.classList.add("playing");
  	 	currentInstrument.classList.add("playing");
  	 	audioElement.loop = true;
  	 	
  	 	return audioElement;
  	} 

  	function stopSound(event) {
  		let currentPiece = event.dataTransfer.getData("text/plain", this.id);
   		let audioElement = document.querySelector(`audio[data-instrument="${currentPiece}"]`);
  		audioElement.pause();
  	}


  function init() {
  	debugger;
  	for (let i = 0; i < dropZones.length; i++) {
  		const parent = dropZones[i];
  		while (parent.firstChild) {
  			parent.firstChild.remove();
  			parent.classList.remove("hasPiece");
  			parent.classList.remove("playing");
  		}
  	}
  	const audio = document.querySelectorAll('audio');
  	for (let i = 0; i < audio.length; i++) {
  		audio[i].pause();
  	}
  	for (let i=0; i  < instruments.length; i++) {
  		const dragZone = instrumentZones[i];
  		const instrument = instruments[i];
  		dragZone.appendChild(instrument);
  	}
}

	window.addEventListener('load', setInstruments);

	resetButton.addEventListener('click', init);

	instruments.forEach(piece => piece.addEventListener('dragstart', dragStart));
	
	dropZones.forEach(zone => zone.addEventListener('dragover', allowDragOver));
	dropZones.forEach(zone => zone.addEventListener('drop', allowDrop));
	dropZones.forEach(zone => zone.addEventListener('drop', playSound));
	instrumentZones.forEach(zone => zone.addEventListener('dragover', allowDragOver));
	instrumentZones.forEach(zone => zone.addEventListener('drop', allowDrop));
	instrumentZones.forEach(zone => zone.addEventListener('drop', stopSound));
})();
