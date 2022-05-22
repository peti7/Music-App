'use strict';

const allMusic = [
    {
        name: "Until you",
        artist: "Shayne Ward",
        src: "music/Y2Mate.is - lyric kara-until you-shayne ward-7-HM5jdSfqg-128k-1646635822314.mp3",
        image: "music-photos/music img1.jfif",
    },
    {
        name: "Hurt",
        artist: "X-Box",
        src: "music/Y2Mate.is - X-Boxin - Hurt (New Version) feat Jessica Parry-LYtqHa4boWY-64k-1645530696025.mp3",
        image: "music-photos/music img2.jfif",
    },
    {
        name: "Why not me",
        artist: "Enrique Iglesias",
        src: "music/X2Download.com - Why Not Me  -  Enrique Iglesias -  Lyrics HD Kara+Vietsub (128 kbps).mp3",
        image: "music-photos/why not me.jpg",
    },
    {
        name: "It's you",
        artist: "Ali Gatie",
        src: "music/X2Download.com - Its You - Ali Gatie (Slowed Lyrics) (128 kbps).mp3",
        image: "music-photos/music img4.jfif",
    },
    {
        name:"Love is gone",
        artist: "SLANDER, Dylan Mathew",
        src: "music/yt1s.com - SLANDER  Love Is Gone ft Dylan Matthew Acoustic  Lyrics.mp3",
        image: "music-photos/music img5.jfif",
    },
    {
        name: "Let her go",
        artist: "Passenger",
        src: "music/yt1s.com - Passenger  Let Her Go Lyrics.mp3",
        image: "music-photos/music img6.jfif",
    },
    {
        name: "Ghost",
        artist: "Justin Bieber",
        src: "music/yt1s.com - Justin Bieber  Ghost Lyrics.mp3",
        image: "music-photos/music img7.jfif",
    },{
        name: "Min sate kyit",
        artist: "Ko Htet, Min Khant",
        src: "music/yt1s.com - ကထက  မငခန  မငစတကက Ko Htet  Min Khant.mp3",
        image: "music-photos/music img8.png",
    },
    {
        name: "Nga Yee Sarr Thu Myar Nae Nyar",
        artist: "Yaw Yazt",
        src: "music/yt1s.com - Nga Yee Sarr Thu Myar Nae Nyar      Acoustic   yawyazt smo.mp3",
        image: "music-photos/music img9.jfif",
    },
    {
        name: "Min ma shi tae nae",
        artist: "Yaw Yazt",
        src: "music/yt1s.com - မငမရတန new version    Yaw Yazt.mp3",
       image: "music-photos/music img3.jfif",
    },
];

const musicImg = document.querySelector(".image-container img");
const musicName = document.querySelector(".music-name");
const musicArtist = document.querySelector(".music-artist");
const audioTag = document.querySelector("audio");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const playPauseBtn = document.querySelector(".play-pause");
const repeatBtn = document.querySelector(".repeat");
const shuffleBtn = document.querySelector(".shuffle");
const musicList = document.querySelector(".list");
const musicListIcon = document.querySelector("header span");
const closeBtn = document.querySelector(".title i");


let index = 0;
function loadMusics(){
    musicImg.src = allMusic[index].image;
    musicName.textContent = allMusic[index].name;
    musicArtist.textContent = allMusic[index].artist;
    audioTag.src = allMusic[index].src;
}

loadMusics();

nextBtn.addEventListener('click', () => {
   nextMusic();
});

function nextMusic(){
    index++;
    if(index >= allMusic.length){
        index = allMusic.length - 1;
    }
    playPauseBtn.textContent = 'pause';
    loadMusics();
    audioTag.play();
}

prevBtn.addEventListener('click', () => {
    prevMusic();
});

function prevMusic(){
    index--;
    if(index < 0){
        index = 0;
    }
    playPauseBtn.textContent = 'pause';
    loadMusics();
    audioTag.play();
}

playPauseBtn.addEventListener('click', () => {
    if(playPauseBtn.textContent == 'pause'){
        playPauseBtn.textContent = 'play_arrow';
        audioTag.pause();
    }else{
        playPauseBtn.textContent = 'pause';
        audioTag.play();
    }
});


audioTag.addEventListener("timeupdate", (e) => {
    let currentTime = e.target.currentTime;
    let duration = e.target.duration;
    progress.style.width = (currentTime / duration) * 100 + "%";

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    currentMin = currentMin < 10 ? "0" + currentMin : currentMin;
    currentSec = currentSec < 10 ? "0" + currentSec : currentSec;
    document.querySelector(".current-time").textContent = `${currentMin}:${currentSec}`;
});


audioTag.addEventListener("loadeddata", () => {
    let duration = audioTag.duration;
     let totalMin = Math.floor(duration / 60);
     let totalSec = Math.floor(duration % 60);
     totalMin = totalMin < 10 ? "0" + totalMin : totalMin;
     totalSec = totalSec < 10 ? "0" + totalSec : totalSec;
     document.querySelector(".duration").textContent = `${totalMin}:${totalSec}`;
});

progressBar.addEventListener('click', (e) => {
    let progressWidth = progressBar.clientWidth;
    audioTag.currentTime = (e.offsetX / progressWidth) * audioTag.duration;
});

repeatBtn.addEventListener('click', () => {
    if(repeatBtn.textContent == 'repeat_one'){
        repeatBtn.textContent = 'repeat';
    }else{
        repeatBtn.textContent = 'repeat_one';
    }
});

shuffleBtn.addEventListener('click', () => {
    if(shuffleBtn.textContent == 'shuffle_on'){
        shuffleBtn.textContent = 'shuffle';
    }else{
        shuffleBtn.textContent = 'shuffle_on';
    }
});

audioTag.addEventListener("ended", () => {
    if(repeatBtn.textContent == 'repeat_one'){
        index--;
        if(index < 0){
            index = 0;
            loadMusics();
            audioTag.play();
            return;
        }
    }
    if(shuffleBtn.textContent == 'shuffle_on'){
        let randomIndex = parseInt(Math.random() * allMusic.length);
        index = randomIndex;
        loadMusics();
    }
    nextMusic();
});


shuffleBtn.addEventListener('click', () => {
    if(shuffleBtn.textContent == "shuffle_on"){
        repeatBtn.classList.add("active");
        repeatBtn.textContent = 'repeat';
    }else{
        repeatBtn.classList.remove("active");
    }
});

for(let i = 0; i < allMusic.length; i++){
    musicList.innerHTML += `
        <li onclick='playMusic(${i})'>
            <img src="${allMusic[i].image}" alt="">
            <div>
                <p>${allMusic[i].name}</p>
                <p>${allMusic[i].artist}</p>
            </div>
            <audio src="${allMusic[i].src}"></audio>
        </li>
    `;
}

function playMusic(i){
    index = i;
    loadMusics();
    audioTag.play();
    closeBtn.click();
    playPauseBtn.textContent = 'pause';
}

musicListIcon.addEventListener('click', () => {
    document.querySelector(".playlist-container").classList.add("show");
});

closeBtn.addEventListener('click', () => {
    document.querySelector(".playlist-container").classList.remove("show");
});