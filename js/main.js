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
const lessonBtn = document.querySelectorAll('.lesson-btn');

  lessonBtn.forEach(element => element.classList.add('btn-outline'));  
};

const loadLevelWord = (level) => {
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
        const clickBtn = document.getElementById(`level-btn-${level}`);
        removeActive();
        clickBtn.classList.remove('btn-outline');
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
                          element.meaning == null
                            ? "অর্থ পাওয়া যায়নি"
                            : element.meaning
                        } / ${element.pronunciation}"</h1>
                        <div class="w-full flex justify-between px-5 md:px-7 lg:px-10 mt-8">
                            <div class="btn flex justify-center hover:!bg-[#1A91FF]/30 items-center !border-0 !h-12 !w-12 !bg-[#1A91FF]/10 !rounded-lg !text-[#374957] !text-[20px]"><i class="fa-solid fa-circle-info"></i></div>
                            <div class="btn flex justify-center hover:!bg-[#1A91FF]/30 items-center !border-0 !h-12 !w-12 !bg-[#1A91FF]/10 !rounded-lg !text-[#374957] !text-[20px]"><i class="fa-solid fa-volume-high"></i></div>
                        </div>
                    </div>`;

    tutorialContainer.appendChild(item);
  });
};

loadLessons();
