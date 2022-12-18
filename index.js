console.log("Welcome to Spomtify :)");

let songs = [
    { songname: "Hass Ke", singer: "Satbir Aujla", filepath:"song/hasske.mp3", coverpath: "images/hasske.png"},
    { songname: "Do Gallan", singer: "Garry Sandhu", filepath: "song/dogallan.mp3", coverpath: "images/dogallan.jpg" },
    { songname: "Band Darvaze", singer: "Amrinder Gill", filepath: "song/band.mp3", coverpath:"images/band.png" },
    { songname: "I Stil Adore U", singer: "Harman Hundal", filepath: "song/adore.mp3", coverpath: "images/adore.png" },
    { songname: "Lemonade", singer: "Daljit Dosanjh", filepath: "song/lemonade.mp3", coverpath: "images/lemon.jpg" },
    { songname: "Jhaanjar", singer: "B Praak", filepath: "song/jhanjar.mp3", coverpath: "images/jhan.jpg" },
    { songname: "Jido Tusi Hasde Ho", singer: "Akhtar", filepath: "song/jido.mp3", coverpath: "images/jido.jpg"},
    { songname: "Shokeen", singer: "Tarsem Jassar", filepath: "song/shokeen.mp3", coverpath: "images/shokeen.jpg" },
    { songname: "In Love Again", singer: "Harman Hundal", filepath: "song/love.mp3", coverpath: "images/love.jpg"},
    { songname: "Feelinga", singer: "Garry Sandhu", filepath: "song/feelinga.mp3", coverpath: "images/feel.jpg" },
    { songname: "Pasoori", singer: "Shae Gill, Ali Sethi", filepath: "song/pasoori.mp3", coverpath: "images/pasoori.jpg" }
]

let songindex = 0;
let totalsongs = 11;
let loop = 1;
let shuffle = 1;
let AudioElement = new Audio(songs[songindex].filepath);
let playpausebtn = document.getElementById("playpausebtn");
let prevbtn = document.getElementById("prevbtn");
let nextbtn = document.getElementById("nextbtn");
let loopbtn = document.getElementById("loopbtn");
let shufflebtn = document.getElementById("shufflebtn");
let bar = document.getElementById("bar");
let volumebar = document.getElementById("volumebar");
let totaltime = document.getElementById("totaltime");
let currtime = document.getElementById("currtime");
let details = document.getElementById("currsong");
let heading = document.getElementById("heading");

function updatetime() {
    let mins1 = parseInt(AudioElement.currentTime / 60);
    let secs1 = parseInt(AudioElement.currentTime % 60);
    let mins2 = parseInt(AudioElement.duration / 60);
    let secs2 = parseInt(AudioElement.duration % 60);
    if (secs1 < 10)
        currtime.innerHTML = `0${mins1}:0${secs1}`;
    else
        currtime.innerHTML = `0${mins1}:${secs1}`;
    if (secs2 < 10)
        totaltime.innerHTML = `0${mins2}:0${secs2}`;
    else
        totaltime.innerHTML = `0${mins2}:${secs2}`;
}

function changedetails(index) {
    details.childNodes[1].src = songs[index].coverpath;
    details.childNodes[3].innerHTML = songs[index].songname;
    details.childNodes[5].innerHTML = songs[index].singer;
}

function nextsong(){
    if(shuffle==1){
        songindex = Math.floor(Math.random()*10);
    }
    else if (songindex != totalsongs - 1 && loop==0) {
        songindex++;
    }
    else if(loop==1){
        songindex = (songindex+1)%totalsongs;
    }
    AudioElement.src = songs[songindex].filepath;
    AudioElement.play();
    changedetails(songindex);
    if(playpausebtn.classList.contains("fa-circle-play") && !AudioElement.paused){
        playpausebtn.classList.remove("fa-circle-play");
        playpausebtn.classList.add("fa-circle-pause");
    }
}

function clickplay(index){
    songindex= parseInt(index.childNodes[1].innerHTML)-1;
    AudioElement.src = songs[songindex].filepath;
    AudioElement.play();
    changedetails(songindex);
    if(playpausebtn.classList.contains("fa-circle-play")){
        playpausebtn.classList.remove("fa-circle-play");
        playpausebtn.classList.add("fa-circle-pause");
    }
}

playpausebtn.addEventListener("click", () => {
    if (AudioElement.paused || AudioElement.currentTime <= 0) {
        AudioElement.play();
        playpausebtn.classList.remove("fa-circle-play");
        playpausebtn.classList.add("fa-circle-pause");
    }
    else {
        AudioElement.pause();
        playpausebtn.classList.remove("fa-circle-pause");
        playpausebtn.classList.add("fa-circle-play");
    }
})

prevbtn.addEventListener("click", () => {
    if (AudioElement.currentTime > 0.1 * AudioElement.duration) {
        AudioElement.src = songs[songindex].filepath;
        AudioElement.play();
    }
    else if (songindex != 0) {
        AudioElement.src = songs[--songindex].filepath;
        AudioElement.play();
        changedetails(songindex);
    }
    if(playpausebtn.classList.contains("fa-circle-play") && !AudioElement.paused){
        playpausebtn.classList.remove("fa-circle-play");
        playpausebtn.classList.add("fa-circle-pause");
    }
})

nextbtn.onclick = function(){nextsong()};

loopbtn.addEventListener("click", ()=>{
    if(loop==1){
        loop=0;
        loopbtn.style.color = "grey";
    }
    else{
        loop=1;
        loopbtn.style.color = "white";
    }
})

shufflebtn.addEventListener("click", ()=>{
    if(shuffle==1){
        shuffle=0;
        shufflebtn.style.color = "grey";
    }
    else{
        shuffle=1;
        shufflebtn.style.color = "white";
    }
})

AudioElement.addEventListener("timeupdate", () => {
    bar.value = parseInt(AudioElement.currentTime * 100 / AudioElement.duration);
    updatetime();
    if (AudioElement.currentTime == AudioElement.duration) {
        nextsong();
    }
})

bar.addEventListener("change", () => {
    AudioElement.currentTime = bar.value * AudioElement.duration / 100;
    updatetime();
})

volumebar.addEventListener("change", () => {
    AudioElement.volume = volumebar.value / 100;
})

window.addEventListener("scroll", ()=>{
    if(parseInt(window.scrollY) >= 320){
        heading.style.backgroundColor = "rgb(22, 22, 22)";
    }
    else{
        heading.style.backgroundColor = "";
    }
})