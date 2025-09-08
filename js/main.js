const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url).then((res) => res.json()).then((json) => displayLessons(json.data));
}


const displayLessons = (data) => {
    const lesson = document.getElementById('level-box');
    lesson.innerHTML = "";

    data.forEach((element)=> {
        const lessonBtn = document.createElement('button');
        lessonBtn.innerHTML = `<button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson ${element.level_no}</button>`;
        lesson.appendChild(lessonBtn);
    });
}

loadLessons();