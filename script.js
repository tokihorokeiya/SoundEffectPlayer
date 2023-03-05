// create an array of audio objects for each sound effect
const audioObjects = [];

// find out the number of button
function countStopButtons() {
  const stopButtons = document.querySelectorAll('[id^="sound-effect-"][id$="-stop-button"]');
  return stopButtons.length;
}
let counter = 0;
counter = countStopButtons();
console.log(`There are ${counter} stop buttons.`);

function addObject(){
	for (let i = 1; i <= counter; i++) {
		audioObjects.push(new Audio());
	}
}
addObject();

// add event listeners for all stop buttons
function stopListeners(){
	for (let i = 1; i <= counter; i++) {
		const stopButton = document.getElementById(`sound-effect-${i}-stop-button`);
		const audioObject = audioObjects[i - 1];
  
		stopButton.addEventListener('click', () => {
			audioObject.pause();
		});
	}
}
stopListeners();

// add event listeners for all file input elements
function fileInputListeners(){
const fileInputs = document.querySelectorAll('input[type="file"]');
fileInputs.forEach((fileInput, index) => {
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      // set the audio object's source to the selected file
      const audioObject = audioObjects[index];
      audioObject.src = URL.createObjectURL(file);
      audioObject.load();

      // enable the play button and add event liastener to play the audio
      const playButton = document.getElementById(`sound-effect-${index + 1}-play-button`);
      const stopButton = document.getElementById(`sound-effect-${index + 1}-stop-button`);
      playButton.disabled = false;
	  stopButton.disabled = false;
      playButton.addEventListener('click', () => {
        audioObject.currentTime = 0;
        audioObject.volume = document.getElementById(`sound-effect-${index + 1}-volume-slider`).value / 100;
        audioObject.play();
      });
    }
  });
});
}
fileInputListeners();

// add event listeners for all volume sliders
function volumeSliderListener(){
const volumeSliders = document.querySelectorAll('input[type="range"]');
volumeSliders.forEach((volumeSlider, index) => {
  volumeSlider.addEventListener('input', () => {
    const audioObject = audioObjects[index];
    audioObject.volume = volumeSlider.value / 100;
  });
});
}
volumeSliderListener();

let newElement = document.getElementById("new");
let addBtn = document.getElementById("add-button");
addBtn.onclick = function(){
	counter++;
	let btn = '<div class="col-md-4"><div class="form-group"><label for="sound-effect-'+counter+'" class="control-label">Sound Effect '+counter+':</label><input type="file" id="sound-effect-'+counter+'-file" class="form-control-file"><button id="sound-effect-'+counter+'-play-button" class="btn btn-primary mt-2" disabled>Play</button><button id="sound-effect-'+counter+'-stop-button" class="btn btn-danger mt-2" disabled>Stop</button><input type="range" id="sound-effect-'+counter+'-volume-slider" class="form-control-range mt-2" min="0" max="100" value="100"></div></div>';
	newElement.insertAdjacentHTML("beforeend", btn);
	addObject();
	stopListeners();
	fileInputListeners();
	volumeSliderListener();
}

let deleteButton = document.getElementById("delete-button");
deleteButton.onclick = function() {
	if (counter > 12) {
		counter--;
		let lastElement = newElement.lastElementChild;
		if (lastElement.classList.contains("col-md-4")) {
			lastElement.remove();
		}
		addObject();
		stopListeners();
		fileInputListeners();
		volumeSliderListener();
	}
};