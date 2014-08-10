function supports_canvas() {
  return !!document.createElement('canvas').getContext;
}

function intializePlayer () {
	var video = document.getElementById('video');
	var controlls = document.getElementById('controlls');
	var playbutton = document.getElementById('playbutton');
	var seekbar = document.getElementById('seekbar');
	var currentTime = document.getElementById('currentTime');
	var totalTime = document.getElementById('totalTime');
	var volumebar = document.getElementById('volumebar');
	var fullscreen = document.getElementById('fullscreen');

	playbutton.addEventListener("click",playPause,false);
	video.addEventListener("click",playPause,false);
	seekbar.addEventListener("change", seakVideo, false);
	video.addEventListener("timeupdate", seekTimeUpdate, false);
	volumebar.addEventListener("change", setVolume, false);
	fullscreen.addEventListener("click", toggleFullScreen, false);
}

if (supports_canvas() == false) {
	controlls.remove();
}

window.onload = intializePlayer; 

function playPause() { 
	if (video.paused) { 
		video.play(); 
		playbutton.src = "images/btn-pause.png"; 
	} else { 
		video.pause(); 
		playbutton.src = "images/btn-play.png"; 
	} 
}

function seakVideo() {
	var seekto = video.duration * (seekbar.value / 100);
	video.currentTime = seekto;
}

function seekTimeUpdate () {
	var newTime = video.currentTime * (100 / video.duration);
	seekbar.value = newTime;

	var curentMins = Math.floor(video.currentTime / 60);
	var curentSecs = Math.floor(video.currentTime - curentMins * 60);
	var durationMins = Math.floor(video.duration / 60);
	var durationSecs = Math.floor(video.duration - durationMins * 60);

	if (curentSecs < 10) {
		curentSecs = "0" + curentSecs;
	}
	if (durationSecs < 10) {
		durationSecs = "0" + durationSecs;
	}

	currentTime.innerHTML = curentMins + ":" + curentSecs;
	totalTime.innerHTML = durationMins + ":" + durationSecs;

	if (currentTime.innerHTML === totalTime.innerHTML) {
		playbutton.src = "images/btn-replay.png";
	}
}

function setVolume () {
	video.volume = volumebar.value / 100;
}

function toggleFullScreen () {
	if (video.requestFullScreen) {
		video.requestFullScreen();
	} else if (video.webkitRequestFullScreen) {
		video.webkitRequestFullScreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	}
}
