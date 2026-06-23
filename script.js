// =========================
// AÑO AUTOMÁTICO
// =========================

document.getElementById("year").textContent =
new Date().getFullYear();


// =========================
// PLAYLIST
// =========================

const playlist = [

{
    name: "On Melancholy Hill",
    artist: "Gorillaz",
    src: "music/On Melancholy Hill - Gorillaz.mp3",
    cover: "covers/Cover of On Melancholy Hill by Gorillaz.jpg"
},

{
    name: "Song 2",
    artist: "Akuma Playlist",
    src: "assets/music/song2.mp3",
    cover: "assets/covers/song2.jpg"
},

{
    name: "Song 3",
    artist: "Akuma Playlist",
    src: "assets/music/song3.mp3",
    cover: "assets/covers/song3.jpg"
},

{
    name: "Song 4",
    artist: "Akuma Playlist",
    src: "assets/music/song4.mp3",
    cover: "assets/covers/song4.jpg"
},

{
    name: "Song 5",
    artist: "Akuma Playlist",
    src: "assets/music/song5.mp3",
    cover: "assets/covers/song5.jpg"
}

];


// =========================
// ELEMENTOS
// =========================

const audio =
document.getElementById("audio");

const musicPlayer =
document.querySelector(".music-player");

const playBtn =
document.getElementById("playBtn");

const nextBtn =
document.getElementById("nextBtn");

const prevBtn =
document.getElementById("prevBtn");

const progress =
document.getElementById("progress");

const volume =
document.getElementById("volume");

const cover =
document.getElementById("cover");

const songName =
document.getElementById("songName");

const artistName =
document.getElementById("artistName");

const currentTimeEl =
document.getElementById("currentTime");

const durationEl =
document.getElementById("duration");


// =========================
// VARIABLES
// =========================

let currentTrack = 0;


// =========================
// CARGAR CANCIÓN
// =========================

function loadTrack(index){

    const track =
    playlist[index];

    audio.src =
    track.src;

    cover.src =
    track.cover;

    songName.textContent =
    track.name;

    artistName.textContent =
    track.artist;
}

loadTrack(currentTrack);


// =========================
// PLAY / PAUSE
// =========================

playBtn.addEventListener("click", () => {

    if(audio.paused){

        audio.play();

        playBtn.textContent =
        "⏸";

        cover.classList.add("playing");
        musicPlayer.classList.add("playing");

    }else{

        audio.pause();

        playBtn.textContent =
        "▶";

        cover.classList.remove("playing");
        musicPlayer.classList.remove("playing");
    }

});


// =========================
// SIGUIENTE
// =========================

nextBtn.addEventListener("click", () => {

    currentTrack++;

    if(currentTrack >= playlist.length){

        currentTrack = 0;
    }

    loadTrack(currentTrack);

    audio.play();

    playBtn.textContent =
    "⏸";

    cover.classList.add("playing");
});


// =========================
// ANTERIOR
// =========================

prevBtn.addEventListener("click", () => {

    currentTrack--;

    if(currentTrack < 0){

        currentTrack =
        playlist.length - 1;
    }

    loadTrack(currentTrack);

    audio.play();

    playBtn.textContent =
    "⏸";

    cover.classList.add("playing");
});


// =========================
// PROGRESO
// =========================

audio.addEventListener("timeupdate", () => {

    const percentage =
    (audio.currentTime / audio.duration)
    * 100;

    progress.value =
    percentage || 0;

    currentTimeEl.textContent =
    formatTime(audio.currentTime);

    durationEl.textContent =
    formatTime(audio.duration);
});


// =========================
// CAMBIAR POSICIÓN
// =========================

progress.addEventListener("input", () => {

    audio.currentTime =
    (progress.value / 100)
    * audio.duration;
});


// =========================
// VOLUMEN
// =========================

audio.volume = 0.5;
volume.value = 50;

volume.addEventListener("input", () => {
    audio.volume =
    volume.value / 100;
});



// =========================
// AUTO SIGUIENTE
// =========================

audio.addEventListener("ended", () => {

    currentTrack++;

    if(currentTrack >= playlist.length){

        currentTrack = 0;
    }

    loadTrack(currentTrack);

    audio.play();

    playBtn.textContent =
    "⏸";

    cover.classList.add("playing");
});


// =========================
// FORMATO DE TIEMPO
// =========================

function formatTime(time){

    if(isNaN(time))
    return "0:00";

    const minutes =
    Math.floor(time / 60);

    const seconds =
    Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2,"0")}`;
}


// =========================
// TECLAS MULTIMEDIA
// =========================

document.addEventListener("keydown", (e) => {

    if(e.code === "Space"){

        e.preventDefault();

        playBtn.click();
    }

    if(e.code === "ArrowRight"){

        nextBtn.click();
    }

    if(e.code === "ArrowLeft"){

        prevBtn.click();
    }

});


// =========================
// PORTADA GIRANDO
// =========================

const style =
document.createElement("style");

style.innerHTML = `

@keyframes spinCover {

    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.cover.playing {

    animation:
    spinCover 15s linear infinite;
}

`;

document.head.appendChild(style);

window.addEventListener("load", async () => {

try {

    await audio.play();

    playBtn.textContent =
    "⏸";

    cover.classList.add("playing");

    musicPlayer.classList.add("playing");

} catch(error) {

    console.log(
    "Autoplay bloqueado por el navegador"
    );

}

});