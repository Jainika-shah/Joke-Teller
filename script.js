const audioElement = document.getElementById('audio');
const btn = document.getElementById('btn');


//Disable / enable button
function toggleBtn(){
    // if true, then set false, and vice versa : just a shorthand.
    btn.disabled =!btn.disabled;    
}


// passing joke to texttospeech api:
function tellMe(joke){
    console.log(joke);
    VoiceRSS.speech({
        key: '2eb53b4f5e674a879448c4ef39f6cd61',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// getting jokes from joke api:
async function getJokes(){
    let joke = '';
    try{
        const apiResponse = await fetch('https://v2.jokeapi.dev/joke/Programming');
        const result = await apiResponse.json();
        if(result.setup){
            joke = `${result.setup} ...  ${result.delivery}`;
        }else{
            joke = result.joke;
        }
        toggleBtn();        //disable btn
        tellMe(joke);       //sending joke to texttospeech api.
    }catch(error){
        alert(`error ${error}`);
    }
}


// adding the functionality on btn.
btn.addEventListener('click',getJokes);

//Wont enable the btn, untill the audio (joke) is completed
audioElement.addEventListener('ended', toggleBtn);