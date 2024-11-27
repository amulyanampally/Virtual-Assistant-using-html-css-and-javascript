let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let mic = document.querySelector("#mic")

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-IN";
    // console.log(window.speechSynthesis.getVoices); type this in console to know all the languages and voices
    // window.SpeechSynthesis.speak(text_speak);
    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    let day = new Date();
    let hours = day.getHours();
    if(hours>=6 && hours<12){
        speak("Good Morning");
    }
    else if(hours>=12 && hours<=17){
        speak("Good Afternoon");
    }
    else if(hours>17 && hours<=20){
        speak("Good Evening");
    }
    else{
        speak("Good Night");
    }
}
window.addEventListener('load', ()=>{wishMe()})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event)=>{
    let currentIndex = event.resultIndex;
    // console.log(event.results[0][0].transcript)
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    console.log(event);
    takeCommand(transcript.toLowerCase());
}

btn.addEventListener("click", ()=>{
    recognition.start();
    btn.style.display = "none";
    mic.style.display = "block";
}
)

function takeCommand(prompt){
    mic.style.display = "none"
    btn.style.display = "block";
 if(prompt.includes("hi") || prompt.includes("hello") || prompt.includes("hey")){
    speak("Hello, please tell me how can I help you!");
 }
 else if(prompt.includes("who are you")){
    speak("I am Virtual Assistant created by Amulya");
 }
 else if(prompt.includes("open youtube")){
    speak("opening youtube");
    window.open("https://www.youtube.com");
 }
 else if(prompt.includes("open google")){
    speak("opening google");
    window.open("https://www.google.com");
 }
 else if(prompt.includes("open calculator")){
    speak("opening calculator");
    window.open("calculator://")
 }
 else{
    speak(`searching the web, here is what I found for ${prompt}`)
    window.open(`https://www.google.com/search?q=${prompt}`)
 }
}