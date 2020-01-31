const btn = document.querySelector('.talk');
const conetent = document.querySelector('.content');

//
const greetings = [
    '안녕하세요 예민남 님?',
    ];


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    console.log('voice is activated, you can speak to microphone');
};

recognition.onresult = function(event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    conetent.textContent = transcript;
    readOutLoud(transcript);
}


// add the listener to the btn

btn.addEventListener("click", () => {
    recognition.start();
});



function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();

    speech.text = "제대로. 다시."; // default setting

    if(message.includes('안녕')){
        const finalText = greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    };

    // speech.text = message 
    speech.volume = 5;
    speech.rate = 2;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}