const search = document.querySelector("#search");
const hint = document.querySelector(".hint");
const dictionary_container = document.querySelector(".dictionary_container");
const searchWord = document.querySelector(".word");
const phonetics = document.querySelector("#phonetics");
const defination = document.querySelector("#defination");
const Example = document.querySelector("#Example");
const noun = document.querySelector(".noun");
const Synonyms = document.querySelector("#Synonyms");
const voice = document.querySelector(".voice");
const voice_icon = document.querySelector("#voice_icon");
const voice_av = document.querySelector("#voice_av");

// calling the api
const callApi = async (word) => {
    const fetchData = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await fetchData.json();
    console.log(data)
    // dictionary_container.style.height = "400px"
    // dictionary_container.style.overflow = "scroll"

    // for error or a word which is wrong
    if (data.title) {
        hint.innerHTML = `No Definitions Found,we couldn't find definitions for the <b>"${word}" </b>`
        dictionary_container.style.height = "210px"
        dictionary_container.style.overflow = "scroll"
    } else {
        hint.innerHTML = `Type a wotd and hit <span>Enter</span> to get the meaning.  `
        dictionary_container.style.height = "400px"
        dictionary_container.style.overflow = "scroll"
        
        // adding api data to HTML
        searchWord.textContent = data[0].word;
        noun.innerHTML = data[0].meanings[0].partOfSpeech;
        phonetics.innerHTML = data[0].phonetics[0].text;

        if (data[0].meanings[0].definitions[0].definition) {
            defination.innerHTML = data[0].meanings[0].definitions[0].definition;
        } else {
            defination.innerHTML = "No definition found in api 😐."
        }

        if (data[0].meanings[0].definitions[0].example) {
            Example.innerHTML = data[0].meanings[0].definitions[0].example
        } else {
            Example.innerHTML = "No example found in api 😐."
        }
        if (data[0].meanings[0].synonyms.length == 0) {
            Synonyms.innerHTML = "No synonym found in api 😐."
        } else {
            Synonyms.innerHTML = data[0].meanings[0].synonyms;
        }

        // console.log(data[0].meanings[0].synonyms)

        // adding voice to the app
        if (voice.src = data[0].phonetics[0].audio) {
            // voice.src = data[0].phonetics[0].audio;
            voice_icon.addEventListener("click", () => {
                voice.play()
                voice_av.innerHTML = ""
            })
        } else if(voice.src.value == undefined) { 
            voice_icon.addEventListener("click", () => {
                voice_av.innerHTML = "no voice available"
            })
        }
    }

}
search.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && e.target.value) {
        // console.log(e.target.value)
        callApi(e.target.value);
    }
    if(e.target.value == ""){
        dictionary_container.style.height = "210px"
    }
})