const createElements = (arr) => {
    if(!arr || arr.length === 0) return `<span class="text-gray-400">No synonyms found</span>`;
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
};

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

const manageSpinnger = (status) => {
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
        .then((response) => response.json()) // promise of json data
        .then((json) => displayLessons(json.data));
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    manageSpinnger(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive(); // remove active class
            const clickBtn = document.getElementById(`btn-lesson-${id}`);
            clickBtn.classList.add("active"); // add active class
            displayLevelWord(data.data);
        });
};
// loadLevelWord();

const loardWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
    // console.log(word)
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
        <div class="">
          <h2 class="text-2xl font-bold">${word.word} : <i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation}</h2>
        </div>
        <div class="mt-2">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div class="mt-2">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="mt-2">${createElements(word.synonyms)}</div> 
        </div>
    
    `;
    document.getElementById("word_details_modal").showModal();
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded-xl py-10 space-y-6">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400 font-bangla">এই Lesson এ কোনো ভোকাবুলারি যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl font-bangla">নেক্সট Lesson এ যান।</h2>
        </div>
        `;
        manageSpinnger(false);
        return;
    }

    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5">
          <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি!"}</h2>
          <p class="font-semibold">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি!"}</p>
          <div class="text-2xl font-medium font-bangla">${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি!"}</div>
          <div class="flex justify-between items-center">
            <button onclick="loardWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                <i class="fa-solid fa-circle-info"></i>
            </button>
            <button onclick="pronounceWord('${word.word}')" class="btn hover:bg-[#1A91FF80]">
                <i class="fa-solid fa-volume-high"></i> 
            </button>
          </div>
        </div>
        `;
        wordContainer.append(card);
    });
    manageSpinnger(false);
};

const displayLessons = (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. get into every lesson
    for (let lesson of lessons) {
        // console.log(lesson);
        // 3. create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button 
            id="btn-lesson-${lesson.level_no}" 
            onclick="loadLevelWord(${lesson.level_no})" 
            class="btn lesson-btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i> 
                    Lesson - ${lesson.level_no} 
            </button>
        `;

        // 4. append into container
        levelContainer.append(btnDiv);
    }
};

loadLessons();

let allWords = [];

const loadAllWords = () => {
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then((res) => res.json())
        .then((data) => {
            allWords = data.data;
            // console.log("All words loaded and ready for searching!");
        })
        .catch(err => console.error("Error loading data: ", err));
}
loadAllWords();

document.getElementById("search-btn").addEventListener("click", () => {
    manageSpinnger(true);
    
    removeActive();
    const searchValue = document.getElementById("search-input").value.trim().toLowerCase();

    const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));

    // console.log(filterWords);

    displayLevelWord(filterWords);
});