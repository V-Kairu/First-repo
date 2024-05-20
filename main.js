window.onload = function() {
  var audioPlayer = document.querySelector('.audio-player');
  var playPauseButton = document.querySelector('.play-pause-button');
  var nextButton = document.querySelector('.next-button');
  var backButton = document.querySelector('.back-button');
  var songTitleElement = document.querySelector('.song-title');
  var songArtistElement = document.querySelector('.song-artist');
  var songImageElement = document.querySelector('.song-image');
  var progressBar = document.querySelector('.progress-bar');
  var currentTimeElement = document.querySelector('.current-time');
  var durationElement = document.querySelector('.duration');

  var currentSourceIndex = 0;
  var isPlaying = false;

  playPauseButton.addEventListener('click', function() {
    if (isPlaying) {
      audioPlayer.pause();
      playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      audioPlayer.play();
      playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  });

  nextButton.addEventListener('click', function() {
    currentSourceIndex = (currentSourceIndex + 1) % audioPlayer.querySelectorAll('source').length;
    updateSongInfo();
    audioPlayer.src = audioPlayer.querySelectorAll('source')[currentSourceIndex].src;
    audioPlayer.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
  });

  backButton.addEventListener('click', function() {
    currentSourceIndex = (currentSourceIndex - 1 + audioPlayer.querySelectorAll('source').length) % audioPlayer.querySelectorAll('source').length;
    updateSongInfo();
    audioPlayer.src = audioPlayer.querySelectorAll('source')[currentSourceIndex].src;
    audioPlayer.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
  });

  audioPlayer.addEventListener('timeupdate', function() {
    var progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
    currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
  });

  progressBar.addEventListener('click', function(event) {
    var percent = event.offsetX / this.offsetWidth;
    audioPlayer.currentTime = audioPlayer.duration * percent;
  });

  audioPlayer.addEventListener('play', function() {
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
    updateSongInfo();
  });

  audioPlayer.addEventListener('pause', function() {
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
  });

  audioPlayer.addEventListener('loadedmetadata', function() {
    durationElement.textContent = formatTime(audioPlayer.duration);
  });

  function updateSongInfo() {
    var currentSource = audioPlayer.querySelectorAll('source')[currentSourceIndex];
    var title = currentSource.getAttribute('data-title');
    var artist = currentSource.getAttribute('data-artist');
    var image = currentSource.getAttribute('data-image');
    songTitleElement.textContent = title;
    songArtistElement.textContent = artist;
    songImageElement.src = image;
  }

  function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
  }

  updateSongInfo(); // Initialize song info on page load
};
