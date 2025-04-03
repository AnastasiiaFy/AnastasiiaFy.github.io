document.addEventListener("DOMContentLoaded", function () {
    /*
    window.addEventListener("load", () => {
        localStorage.clear();
    });
    */
    generateLessons();
    generateTests();
    setupNavigation();
});

function generateLessons() {
    const lessonsData = [
        {
            id: 1,
            title: "УРОК 1",
            topics: [
                { name: "Present Simple", url: "https://grammarway.com/ua/present-simple" },
                { name: "Present Continuous", url: "https://grammarway.com/ua/present-continuous" }
            ],
            image: "images/lesson-1_image.png",
            icon: "images/Flask_0.png"
        },
        {
            id: 2,
            title: "УРОК 2",
            topics: [
                { name: "Past Simple", url: "https://grammarway.com/ua/past-simple" },
                { name: "Past Continuous", url: "https://grammarway.com/ua/past-continuous" }
            ],    
            image: "images/lesson-2_image.png",
            icon: "images/Flask_0.png"
        },
        {
            id: 3,
            title: "УРОК 3",
            topics: [
                { name: "Future Simple", url: "https://grammarway.com/ua/future-simple" },
                { name: "Future Continuous", url: "https://grammarway.com/ua/future-continuous" },
                { name: "Will or Going to?", url: "https://grade.ua/uk/blog/will-i-going-to-uchimsya-govorit-o-budushchem/" }
            ], 
            image: "images/lesson-3_image.png",
            icon: "images/Flask_0.png"
        },
        {
            id: 4,
            title: "УРОК 4",
            topics: [
                { name: "Past Perfect", url: "https://grammarway.com/ua/past-perfect" },
                { name: "Past Perfect Continuous", url: "https://grammarway.com/ua/past-perfect-continuous" },
                { name: "Adjectives and adverbs", url: "https://www.grammarly.com/blog/parts-of-speech/adjectives-and-adverbs/" }
            ], 
            image: "images/lesson-4_image.png",
            icon: "images/Flask_0.png"
        },
        {
            id: 5,
            title: "УРОК 5",
            topics: [
                { name: "Future Perfect", url: "https://grammarway.com/ua/future-perfect" },
                { name: "Future Perfect Continuous", url: "https://grammarway.com/ua/future-perfect-continuous" },
                { name: "Gerund or Infinitive", url: "https://www.gramaro.io/ua/rules/infinitive-and-gerund" }
            ], 
            image: "images/lesson-5_image.png",
            icon: "images/Flask_0.png"
        },
        {
            id: 6,
            title: "УРОК 6",
            topics: [
                { name: "So and Such", url: "https://dictionary.cambridge.org/uk/grammar/british-grammar/such-or-so" },
                { name: "Phrasal Verbs. Part 1", url: "https://grammarway.com/ua/phrasal-verbs" },
                { name: "Quantifiers", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/quantifiers " }
            ],
            image: "images/lesson-6_image.png",
            icon: "images/Flask_0.png"
        }
    ];

    const lessonsContainer = document.querySelector(".lessons");
    lessonsContainer.innerHTML = ""; 

    const titleElement = document.createElement("h3");
    titleElement.classList.add("lessons-title");
    titleElement.textContent = "Уроки";
    lessonsContainer.appendChild(titleElement);

    for (let i = 0; i < lessonsData.length; i++) {
        const lesson = lessonsData[i];

        const completedTopics = JSON.parse(localStorage.getItem(`lesson-${lesson.id}`)) || [];
        const totalTopics = lesson.topics.length;
        const completedCount = completedTopics.length;

        let lessonIcon = "images/Flask_0.png";
        const completionPercentage = (completedCount / totalTopics) * 100;

        if (completionPercentage === 100) {
            lessonIcon = "images/Flask_100.png";
        } else if (completionPercentage >= 50) {
            lessonIcon = "images/Flask_50-99.png";
        } else if (completionPercentage > 0) {
            lessonIcon = "images/Flask_1-49.png";
        }

        const lessonElement = document.createElement("div");
        lessonElement.classList.add("lesson");
        lessonElement.setAttribute("data-lesson-id", lesson.id); 

        lessonElement.innerHTML = `
            <div class="lesson-image-wrapper">
                <img src="${lesson.image}" class="lesson-image">
            </div>
            <h3>${lesson.title}</h3>
            ${lesson.topics.map(topic => `<p>${topic.name}</p>`).join("")} 
            <img src="${lessonIcon}" class="lesson-icon">
        `;

        lessonElement.addEventListener("click", function () {
            showLessonContent(lesson.id, lesson.title, lesson.topics);
        });
        lessonsContainer.appendChild(lessonElement);
    }
}

function setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll("main section");

    for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener("click", function () {
            const sectionToShow = this.getAttribute("data-section");

            for (let j = 0; j < sections.length; j++) {
                sections[j].classList.add("hidden");
            }

            const activeSection = document.querySelector(`.${sectionToShow}`);
            if (activeSection) {
                activeSection.classList.remove("hidden");
            }

            const lessonContent = document.querySelector(".lesson-content");
            if (lessonContent) {
                lessonContent.classList.add("hidden");
            }
        });
    }
}

function showLessonContent(lessonId, lessonTitle, topics) {
    const mainSection = document.querySelector("main");
    document.querySelectorAll("main section").forEach(section => section.classList.add("hidden"));

    let lessonContent = document.querySelector(".lesson-content");
    if (!lessonContent) {
        lessonContent = document.createElement("section");
        lessonContent.classList.add("lesson-content");
        mainSection.appendChild(lessonContent);
    }
    
    lessonContent.innerHTML = "";

    const completedTopics = JSON.parse(localStorage.getItem(`lesson-${lessonId}`)) || [];

    if (!topics || topics.length === 0) {
        lessonContent.innerHTML = `<h2>${lessonTitle}</h2><p>Урок поки що не містить тем.</p>`;
    } else {
        lessonContent.innerHTML = `
            <h2>${lessonTitle}</h2>
            <ul class="lesson-topics">
                ${topics.map(topic => `
                    <li data-topic="${topic.name}">
                        <div class="tooltip-container">
                            <a href="${topic.url}" target="_blank" class="tooltip-link">${topic.name}</a>
                            <span class="tooltip-text">Натисни, щоб прочитати</span>
                        </div>
                        ${completedTopics.includes(topic.name) ? 
                            `<img src="images/completed-icon.png" alt="Пройдено">` : 
                            `<button class="mark-topic-completed">Позначити як пройдене</button>`
                        }
                    </li>
                `).join("")}
            </ul>
        `;
    }

    lessonContent.querySelectorAll(".mark-topic-completed").forEach(button => {
        button.addEventListener("click", function () {
            const topicElement = this.closest("li");
            const topicName = topicElement.getAttribute("data-topic");

            if (!completedTopics.includes(topicName)) {
                completedTopics.push(topicName);
                localStorage.setItem(`lesson-${lessonId}`, JSON.stringify(completedTopics));
                topicElement.innerHTML = `<a href="${topicElement.querySelector("a").href}" target="_blank">${topicName}</a> <img src="images/completed-icon.png" alt="Пройдено">`;
                updateLessonIcon(lessonId);
            }
        });
    });

    lessonContent.classList.remove("hidden");
}

function updateLessonIcon(lessonId) {
    const lessonElement = document.querySelector(`.lesson[data-lesson-id="${lessonId}"]`);
    if (!lessonElement) return;

    const lessonsData = [
        { id: 1, topics: ["Present Simple", "Present Continuous"] },
        { id: 2, topics: ["Past Simple", "Past Continuous"] },
        { id: 3, topics: ["Future Simple", "Future Continuous", "Will or Going to?"] },
        { id: 4, topics: ["Past Perfect", "Past Perfect Continuous", "Adjectives and adverbs"] },
        { id: 5, topics: ["Future Perfect", "Future Perfect Continuous", "Gerund or Infinitive"] },
        { id: 6, topics: ["So and Such", "Phrasal Verbs. Part 1", "Quantifiers"] }
    ];

    const lessonData = lessonsData.find(lesson => lesson.id === lessonId);
    if (!lessonData) return;

    const totalTopics = lessonData.topics.length;
    const completedTopics = JSON.parse(localStorage.getItem(`lesson-${lessonId}`)) || [];
    const completedCount = completedTopics.length;
    const completionPercentage = (completedCount / totalTopics) * 100;

    let newIcon = "images/Flask_0.png";
    if (completionPercentage === 100) {
        newIcon = "images/Flask_100.png";
    } else if (completionPercentage >= 50) {
        newIcon = "images/Flask_50-99.png";
    } else if (completionPercentage > 0) {
        newIcon = "images/Flask_1-49.png";
    }

    const lessonIcon = lessonElement.querySelector(".lesson-icon");
    if (lessonIcon) {
        lessonIcon.src = newIcon;
    }
}

let testsData = []; 

function generateTests() {
    testsData = [
        {
            "id": 1,
            "title": "Grammar - Infinitive and Gerund",
            "type": "Grammar",
            "questions": [
                {
                    "question": "Доповніть речення: I don't fancy ___ (go) out tonight.",
                    "correctAnswer": "going",
                    "userAnswer": "",
                    "type": "input"
                },
                {
                    "question": "She avoided ___ (tell) him about her plans.",
                    "correctAnswer": "telling",
                    "userAnswer": "",
                    "type": "input"
                },
                {
                    "question": "I would like ___ (come) to the party with you.",
                    "correctAnswer": "to come",
                    "userAnswer": "",
                    "type": "input"
                },
                {
                    "question": "He enjoys ___ (have) a bath in the evening.",
                    "correctAnswer": "having ",
                    "userAnswer": "",
                    "type": "input"
                },
                {
                    "question": "She kept ___ (talk) during the film.",
                    "correctAnswer": "talking ",
                    "userAnswer": "",
                    "type": "input"
                },
                {
                    "question": "I am learning ___ (speak) English.",
                    "correctAnswer": "to speak",
                    "userAnswer": "",
                    "type": "input"
                },
                {
                    "question": "Do you mind ___ (give) me a hand?",
                    "correctAnswer": "giving",
                    "userAnswer": "",
                    "type": "input"
                },
                {
                    "question": "She helped me ___ (carry) my suitcases.",
                    "correctAnswer": "to carry",
                    "userAnswer": "",
                    "type": "input"
                },
                {
                    "question": "I've finished ___ (cook) - come and eat!",
                    "correctAnswer": "cooking",
                    "userAnswer": "",
                    "type": "input"
                },
                {
                    "question": "He decided ___ (study) biology.",
                    "correctAnswer": "to study",
                    "userAnswer": "",
                    "type": "input"
                }
            ],
            correctAnswersCount: null, 
            totalQuestionsCount: 10 
        },
        { id: 2, title: "Listening - Good weather", type: "Listening", correctAnswersCount: null, totalQuestionsCount: 0 },
        { id: 3, title: "Grammar - Present Simple", type: "Grammar", correctAnswersCount: null, totalQuestionsCount: 0 },
        { id: 4, title: "Reading - The importance of Time Management",type: "Reading", correctAnswersCount: null, totalQuestionsCount: 0 }
    ];

    const practiceSection = document.querySelector(".practice");
    practiceSection.innerHTML = `<h2 class="practice-title">Практика</h2>`; 

    testsData.forEach(test => {
        let iconSrc = "images/grammar-img.png"; 

        if (test.type.includes("Listening")) {
            iconSrc = "images/listening-img.png";
        } else if (test.type.includes("Reading")) {
            iconSrc = "images/reading-img.png";
        }

        const testElement = document.createElement("div");
        testElement.classList.add("test");

        testElement.innerHTML = `
            <div class="test-icon-container">
                <img src="${iconSrc}" class="test-icon">
            </div>
            <div class="test-content">
                <p>Test ${test.id}:</p>
                <p>${test.title}</p>
            </div>
            <div class="test-status">
                ${test.correctAnswersCount !== null ? `<p>Пройдено</p><p>${test.correctAnswersCount}/${test.totalQuestionsCount}</p>
                <button class="view-answers-btn">Переглянути відповіді</button>`
                : `<button class="start-btn">Почати</button>`}
            </div>
        `;

        testElement.addEventListener("click", (event) => {
            if (event.target.classList.contains("start-btn")) {
                startTest(test.title);
            } else if (event.target.classList.contains("view-answers-btn")) {
                viewAnswers(test); // Викликаємо функцію для перегляду відповідей
            }
        });

        practiceSection.appendChild(testElement);
    });
}

function startTest(testTitle) {
    const test = testsData.find(t => t.title === testTitle);
    if (!test || !test.questions) return;

    document.querySelectorAll("section, nav").forEach(el => el.classList.add("hidden"));

    let testSection = document.querySelector(".test-section");
    if (!testSection) {
        testSection = document.createElement("section");
        testSection.classList.add("test-section");
        document.querySelector("main").appendChild(testSection);
    }

    testSection.innerHTML = `
    <h2>${test.title}</h2>
    <form id="test-form">
        ${test.questions.map((q, index) => `
            <div class="question">
                <p>${index + 1}. ${q.question}</p>
                <input type="text" name="q${index}" required>
            </div>
        `).join('')}
        <button type="submit" id="submit-btn" class="submit-btn">Завершити тест</button>
    </form>
    `;

    testSection.classList.remove("hidden");
    testSection.classList.add("active");
    
    const submitButton = document.querySelector(".submit-btn");
    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            event.preventDefault(); 
            console.log("Подія submit спрацювала");
            submitTest(test);
        });
    }
}

function submitTest(test) {
    const form = document.getElementById("test-form");
    if (!form) {
        return;
    }

    const formData = new FormData(form);
    let score = 0;
    let allFilled = true;

    test.questions.forEach((q, index) => {
        const inputField = form.querySelector(`[name="q${index}"]`);
        const userAnswer = formData.get(`q${index}`)?.trim().toLowerCase() || "";

        if (!userAnswer) {
            allFilled = false; 
        }
    });

    if (!allFilled) {
        alert("Будь ласка, заповніть усі поля перед завершенням тесту!");
        return;  
    }

    test.questions.forEach((q, index) => {
        const inputField = form.querySelector(`[name="q${index}"]`); 
        const userAnswer = formData.get(`q${index}`).trim().toLowerCase();
        q.userAnswer = userAnswer; // Зберігаємо відповідь користувача 
        const correctAnswer = q.correctAnswer.trim().toLowerCase();

        // Видаляємо попередні стилі
        inputField.classList.remove("correct", "incorrect");

        if (userAnswer === correctAnswer) {
            inputField.classList.add("correct"); 
            score++;
        } else {
            inputField.classList.add("incorrect"); 
            
            let correctAnswerSpan = inputField.nextElementSibling;
            if (!correctAnswerSpan || !correctAnswerSpan.classList.contains("correct-answer")) {
                correctAnswerSpan = document.createElement("span");
                correctAnswerSpan.classList.add("correct-answer");
                inputField.insertAdjacentElement("afterend", correctAnswerSpan);
            }
            correctAnswerSpan.textContent = `${q.correctAnswer}`;
        }
    });

    const submitButton = form.querySelector("button[type='submit']");
    if (submitButton) {
        submitButton.outerHTML = `<p class="test-result">Ваш результат: ${score} з ${test.questions.length} балів!</p>`;

        test.correctAnswersCount = score;

        const exitButton = document.createElement("button");
        exitButton.type = "button";
        exitButton.classList.add("exit-btn");
        exitButton.textContent = "Вийти";
        exitButton.onclick = exitTest; 

        const resultSection = document.querySelector(".test-result");
        resultSection.parentNode.insertBefore(exitButton, resultSection.nextSibling);
    }
}

function exitTest() {
    const testSection = document.querySelector(".test-section");
    if (testSection) {
        testSection.classList.add("hidden");  
        testSection.classList.remove("active");  
    }

    const practiceSection = document.querySelector(".practice");
    if (practiceSection) {
        practiceSection.classList.remove("hidden");  
        document.querySelectorAll("nav").forEach(el => el.classList.remove("hidden"));
    }

    document.querySelectorAll("section:not(.practice)").forEach(el => el.classList.add("hidden"));
    updatePracticeSection();
}

function updatePracticeSection() {
    const practiceSection = document.querySelector(".practice");
    practiceSection.innerHTML = `<h2 class="practice-title">Практика</h2>`; 

    testsData.forEach(test => {
        let iconSrc = "images/grammar-img.png"; 

        if (test.type.includes("Listening")) {
            iconSrc = "images/listening-img.png";
        } else if (test.type.includes("Reading")) {
            iconSrc = "images/reading-img.png";
        }

        const testElement = document.createElement("div");
        testElement.classList.add("test");
        testElement.setAttribute("data-test-id", test.id);

        testElement.innerHTML = `
            <div class="test-icon-container">
                <img src="${iconSrc}" class="test-icon">
            </div>
            <div class="test-content">
                <p>Test ${test.id}:</p>
                <p>${test.title}</p>
            </div>
            <div class="test-status">
                ${test.correctAnswersCount !== null ? 
                    `<p>Пройдено</p><p>${test.correctAnswersCount}/${test.totalQuestionsCount}</p>
                    <button class="view-answers-btn">Переглянути відповіді</button>` 
                    : 
                    `<button class="start-btn">Почати</button>`}
            </div>
        `;

        testElement.addEventListener("click", (event) => {
            if (event.target.classList.contains("start-btn")) {
                startTest(test.title);
            } else if (event.target.classList.contains("view-answers-btn")) {
                console.log("Кнопка нажата");
                viewAnswers(test); 
            }
        });

        practiceSection.appendChild(testElement);
    });
}

function viewAnswers(test) {
    const practiceSection = document.querySelector(".practice");
    if (practiceSection) {
        practiceSection.classList.add("hidden");
    }

    let answersSection = document.querySelector(".answers-section");

    if (!answersSection) {
        answersSection = document.createElement("section");
        answersSection.classList.add("answers-section");
        document.querySelector("main").appendChild(answersSection);
    }

    answersSection.innerHTML = '';
    const answersContainer = document.createElement("div");
    answersContainer.classList.add("answers-container");

    test.questions.forEach((q, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        const userAnswerClass = q.userAnswer === q.correctAnswer ? "correct-answer" : "incorrect-answer";

        questionElement.innerHTML = `
            <p><strong>Питання ${index + 1}:</strong> ${q.question}</p>
            <p class="user-answer">Ваша відповідь: ${q.userAnswer || "Не відповів"}</p>
            <p class="${userAnswerClass}">Правильна відповідь: ${q.correctAnswer}</p>
        `;

        answersContainer.appendChild(questionElement);
    });

    answersSection.appendChild(answersContainer);
    answersSection.classList.remove("hidden");
    answersSection.classList.add("active");

    document.querySelectorAll("section").forEach(el => {
        if (!el.classList.contains("answers-section")) {
            el.classList.add("hidden");
        }
    });
}

let startTime = Date.now();  
let timerInterval = null;  


function updateTimer() {
    const currentTime = Date.now();  
    const timeSpent = currentTime - startTime;  

    const hours = Math.floor(timeSpent / (1000 * 60 * 60));  
    const minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60));  

    document.getElementById("timeSpent").textContent = `${hours} год. ${minutes} хв.`;
}

timerInterval = setInterval(updateTimer, 60000);

updateTimer();

window.addEventListener("beforeunload", function() {
    clearInterval(timerInterval);  
});




