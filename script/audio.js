let play = document.getElementById("audio-play");
let mute = document.getElementById("audio-mute");
let audio = document.getElementById("audio");

function playAudio() {
    audio.play();
    play.style.display = "none";
    mute.style.display = "block";
  }
  function muteAudio() {
    audio.pause();
    play.style.display = "block";
    mute.style.display = "none";
  }
