//get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playButton = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// functions

function togglePlay() {
    if (video.paused) {
        video.play()
    } else {video.pause()}
}

function updateButton() {
    let icon = this.paused ? '►' : '▌▌'; 
    playButton.textContent = icon
}

function skip() {
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip)
};

function handleRangeUpdate() {
    video[this.name] = this.value;
};

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}

function slideHandler(e) {
   const time = (e.offsetX / progress.offsetWidth) * video.duration;
   video.currentTime = time;
   console.log(time)
   
}

// playButton.addEventListener('click', togglePlay);

playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skipButton.forEach(button => {button.addEventListener('click', skip)});
ranges.forEach(slider => {slider.addEventListener('change', handleRangeUpdate)});
ranges.forEach(slider => {slider.addEventListener('mousemove', handleRangeUpdate)});
video.addEventListener('timeupdate', handleProgress);

let mouseDown = false;

progress.addEventListener('click', slideHandler);
//progress.addEventListener('mousemove', slideHandler);
progress.addEventListener('mousemove', (e) => mouseDown && slideHandler(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false)
