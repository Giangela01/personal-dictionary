let wordData;

const $input = $('input[type="text"]');

$('#search').on('submit', getInfo);
$('#search').on('reset', resetInfo);

function getInfo(event) {

    event.preventDefault();

    $.ajax({
        url: `https://api.dictionaryapi.dev/api/v2/entries/en/${$input.val()}`
    }).then(
        (data) => {
            wordData = data;
            getMainWord();
            getPoS();
            resetBtn();
        },
        (error) => {
            console.log('bad request', error);
            alert("This is embrassing. Sorry, I don't know the word.");
        }
    );
}

function resetBtn() {
    $('#s-btn').attr("value", "Clear Search");
    $('#s-btn').attr("type", "reset");
}


function getMainWord(data) {
    document.getElementById("search-word").innerHTML =
        `<span class="main-word">${wordData[0].word}</span>
    <audio controls src="${wordData[0].phonetics[0].audio}" type="audio/mp3">
    Sorry, your browser does not seem support the audio.</audio>`;

}

function getPoS(data) {
    let container = document.getElementById('main-container');
    let table = document.getElementById('pos-phonetics');
    let defTitle = document.getElementById('def-title');
    let defTable = document.getElementById('definition');
    let meanings = wordData[0].meanings[0].definitions;

    defTitle.innerText = "Definition/s"
    container.classList.toggle("container");

    let origin = wordData[0].origin;

    let partOfSpeech = `<p class="part-of-speech">${wordData[0].meanings[0].partOfSpeech} | ${wordData[0].phonetic}</p>
    <p class="origin">${origin ? `Origin: `+ origin : ""}</p>`;

    meanings.forEach(element => {
        let defA = element;
        let defList = defA.map = (`<dl><lh>:${defA.definition}</lh>
                                    <dt><em>${defA.example ? 'Example: ' + defA.example : ""}</em></dt>
                                    <dd>${defA.synonyms ? '<u>Synonyms</u>: ' + defA.synonyms : ""}</dd>
                                    <dd>${defA.antonyms ? '<u>Antonyms</u>: ' + defA.antonyms : ""}</dd>
                                    </dl>`);
        defTable.innerHTML += defList;
    });

    table.innerHTML += partOfSpeech;
}

function resetInfo() {
    location.reload();
}