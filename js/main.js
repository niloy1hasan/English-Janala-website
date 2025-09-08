const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const displayLessons = (data) => {
  const lesson = document.getElementById("level-box");
  lesson.innerHTML = "";

  data.forEach((element) => {
    const lessonBtn = document.createElement("button");
    lessonBtn.innerHTML = `<button onclick="loadLevelWord(${element.level_no})" id="level-btn-${element.level_no}" class="lesson-btn btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson ${element.level_no}</button>`;
    lesson.appendChild(lessonBtn);
  });
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");

  lessonBtn.forEach((element) => element.classList.add("btn-outline"));
};

const loadLevelWord = (level) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const clickBtn = document.getElementById(`level-btn-${level}`);
      removeActive();
      clickBtn.classList.remove("btn-outline");
      displayLevelWord(json.data);
    });
};

const displayLevelWord = (data) => {


  const tutorialContainer = document.getElementById("tutorial-container");
  tutorialContainer.innerHTML = "";
  document.getElementById("no-selected").classList.add("hidden");
  tutorialContainer.classList.add("grid");
  tutorialContainer.classList.remove("hidden");
  data.forEach((element) => {
    const item = document.createElement("div");

    item.innerHTML = `
                    <div class="bg-white rounded-[12px] py-10 flex justify-center items-center flex-col flex-nowrap">
                        <h1 class="inter-regular font-bold text-3xl">${
                          element.word
                        }</h1>
                        <h4 class="inter-regular font-medium text-[16px] my-3">Meaning / Pronounciation</h4>
                        <h1 class="hind-siliguri-regular text-[24px] text-[#18181B] font-semibold my-4 text-center">"${
                          element.meaning === null
                            ? "অর্থ পাওয়া যায়নি"
                            : element.meaning
                        } / ${element.pronunciation}"</h1>
                        <div class="w-full flex justify-between px-5 md:px-7 lg:px-10 mt-8">
                            <div onclick="loadWordDetail(${
                              element.id
                            })" class="btn flex justify-center hover:!bg-[#1A91FF]/30 items-center !border-0 !h-12 !w-12 !bg-[#1A91FF]/10 !rounded-lg !text-[#374957] !text-[20px]"><i class="fa-solid fa-circle-info"></i></div>
                            <div onclick="pronounceWord('${element.word}')"  class="btn flex justify-center hover:!bg-[#1A91FF]/30 items-center !border-0 !h-12 !w-12 !bg-[#1A91FF]/10 !rounded-lg !text-[#374957] !text-[20px]"><i class="fa-solid fa-volume-high"></i></div>
                        </div>
                    </div>`;

    tutorialContainer.appendChild(item);
    manageSpinner(false);
  });
};


const loadWordDetail = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res  = await fetch(url);
  const json = await res.json();
  displayWordDetail(json.data);
};

const displayWordDetail = (data) => {
  const dialog = document.getElementById("word-content");

  dialog.innerHTML = "";

  const div = document.createElement("div");
  div.innerHTML = `
                    <h1 class="font-semibold text-[28px] my-3"><span class="inter-regular">${data.word} </span><span class="hind-siliguri-regular">(<button onclick="pronounceWord('${data.word}')" ><i class="fa-solid fa-microphone-lines"></i></button>:${data.pronunciation})</span></h1>
                    <h2 class="font-semibold text-[18px] inter-regular my-2">Meaning</h2>
                    <h4 class="text-[18px] font-medium hind-siliguri-regular">${data.meaning===null ? "অর্থ পাওয়া যায়নি" : data.meaning}</h4>
                    <h2 class="font-semibold text-[18px] inter-regular my-2">Example</h2>
                    <h4 class="text-[18px] font-medium inter-regular">${data.sentence}</h4>
                    <h2 class="font-semibold text-[18px] hind-siliguri-regular my-2 mt-2.5">সমার্থক শব্দ গুলো</h2>
                 `;

  const badgeItem = document.createElement('div');
  badgeItem.classList.add('batch-container', 'flex', 'flex-wrap', 'gap-2', 'poppins-regular');
  
  data.synonyms.forEach(element => {
    const item = document.createElement('div');
    item.innerHTML = `<span class="badge !bg-[#EDF7FF] !rounded-[4px] !py-4 !px-5 !border-[#D7E4EF]">${element}</span>`;
    badgeItem.appendChild(item);
  });

  div.appendChild(badgeItem);
  dialog.appendChild(div);

  my_modal_5.showModal();
};



const manageSpinner = (status) =>{
  const spinner = document.getElementById('loading-spinner');
  const tutorial = document.getElementById('tutorial-section');
  if(status == true){
    spinner.classList.remove('hidden');
    tutorial.classList.add('hidden');
    spinner.classList.add('flex');
  } else {
    spinner.classList.remove('add');
    tutorial.classList.remove('hidden');
    spinner.classList.add('hidden');
  }
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
}



loadLessons();

