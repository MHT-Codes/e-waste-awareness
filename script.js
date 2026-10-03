/* =========================
   MOBILE NAVIGATION
========================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


/* Close menu after clicking a link */

document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });


/* =========================
   STATISTICS COUNTERS
========================= */

const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }


                const counter =
                    entry.target;

                const target =
                    parseFloat(
                        counter.dataset.target
                    );

                let current = 0;

                const duration = 1200;

                const startTime =
                    performance.now();


                function animate(time) {

                    const progress =
                        Math.min(
                            (time - startTime) /
                            duration,
                            1
                        );

                    current =
                        target * progress;


                    if (target % 1 !== 0) {

                        counter.textContent =
                            current.toFixed(1);

                    } else {

                        counter.textContent =
                            Math.floor(current);

                    }


                    if (progress < 1) {

                        requestAnimationFrame(
                            animate
                        );

                    } else {

                        counter.textContent =
                            target % 1 !== 0
                                ? target.toFixed(1)
                                : target;

                    }

                }


                requestAnimationFrame(
                    animate
                );


                counterObserver.unobserve(
                    counter
                );

            });

        },

        {
            threshold: 0.5
        }

    );


counters.forEach((counter) => {

    counterObserver.observe(counter);

});


/* =========================
   E-WASTE JOURNEY
========================= */

const journeySteps =
    document.querySelectorAll(
        ".journey-step"
    );


const journeyInfoIcon =
    document.getElementById(
        "journeyInfoIcon"
    );


const journeyInfoTitle =
    document.getElementById(
        "journeyInfoTitle"
    );


const journeyInfoText =
    document.getElementById(
        "journeyInfoText"
    );


const progressFill =
    document.getElementById(
        "progressFill"
    );


const journeyData = {

    1: {

        icon: "📱",

        title: "Consumer",

        text:
            "The journey begins when a consumer decides that an electronic device is no longer needed or useful."

    },


    2: {

        icon: "📦",

        title: "Collection",

        text:
            "The discarded device enters an appropriate e-waste collection system for further management."

    },


    3: {

        icon: "🔍",

        title: "Sorting",

        text:
            "Different equipment and components are separated according to their type, condition and materials."

    },


    4: {

        icon: "🔧",

        title: "Dismantling",

        text:
            "Equipment is carefully dismantled so that components and recoverable materials can be separated."

    },


    5: {

        icon: "♻️",

        title: "Material Recovery",

        text:
            "Recoverable materials are processed so that they can potentially return to productive use."

    }

};


journeySteps.forEach((step) => {

    step.addEventListener(
        "click",
        () => {

            const stepNumber =
                step.dataset.step;

            const data =
                journeyData[stepNumber];


            journeySteps.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            step.classList.add(
                "active"
            );


            journeyInfoIcon.textContent =
                data.icon;

            journeyInfoTitle.textContent =
                data.title;

            journeyInfoText.textContent =
                data.text;


            const progress =
                Number(stepNumber) * 20;


            progressFill.style.width =
                `${progress}%`;

        }
    );

});


/* =========================
   QUIZ
========================= */

const quizQuestions = [

    {

        question:
            "What does e-waste refer to?",

        options: [

            "Discarded electrical and electronic equipment",

            "Only plastic waste",

            "Food waste",

            "Construction waste"

        ],

        answer: 0

    },


    {

        question:
            "Which action can extend the useful life of electronics?",

        options: [

            "Repair",

            "Immediate disposal",

            "Burning",

            "Throwing away"

        ],

        answer: 0

    },


    {

        question:
            "Which of these is an example of e-waste?",

        options: [

            "Old mobile phone",

            "Fresh vegetables",

            "Paper notebook",

            "Cotton shirt"

        ],

        answer: 0

    },


    {

        question:
            "What is one benefit of recycling e-waste?",

        options: [

            "Recovering useful materials",

            "Increasing waste",

            "Reducing product life",

            "Creating unnecessary disposal"

        ],

        answer: 0

    },


    {

        question:
            "Which three actions form the main 3R approach used on this website?",

        options: [

            "Reduce, Reuse, Recycle",

            "Remove, Run, Replace",

            "Read, Record, Report",

            "Repair, Remove, Reject"

        ],

        answer: 0

    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


const quizCount =
    document.getElementById(
        "quizCount"
    );


const quizQuestion =
    document.getElementById(
        "quizQuestion"
    );


const quizOptions =
    document.getElementById(
        "quizOptions"
    );


const quizResult =
    document.getElementById(
        "quizResult"
    );


const quizNext =
    document.getElementById(
        "quizNext"
    );


function loadQuestion() {

    answered = false;

    quizNext.style.display =
        "none";

    quizResult.textContent =
        "";


    const question =
        quizQuestions[
            currentQuestion
        ];


    quizCount.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;


    quizQuestion.textContent =
        question.question;


    quizOptions.innerHTML =
        "";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "quiz-option";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );


            quizOptions.appendChild(
                button
            );

        }
    );

}


function checkAnswer(
    selected,
    selectedButton
) {

    if (answered) {
        return;
    }


    answered = true;


    const question =
        quizQuestions[
            currentQuestion
        ];


    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );


    buttons.forEach(
        (button, index) => {

            if (
                index ===
                question.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    if (
        selected ===
        question.answer
    ) {

        score++;

        selectedButton.classList.add(
            "correct"
        );

        quizResult.textContent =
            "✓ Correct!";

    } else {

        selectedButton.classList.add(
            "wrong"
        );

        quizResult.textContent =
            "✗ Not quite. The highlighted answer is correct.";

    }


    quizNext.style.display =
        "inline-flex";

}


quizNext.addEventListener(
    "click",
    () => {

        currentQuestion++;


        if (
            currentQuestion >=
            quizQuestions.length
        ) {

            showQuizResult();

            return;

        }


        loadQuestion();

    }
);


function showQuizResult() {

    quizCount.textContent =
        "Quiz Complete";


    quizQuestion.textContent =
        `You scored ${score} out of ${quizQuestions.length}!`;


    quizOptions.innerHTML =
        "";


    quizResult.textContent =
        score === quizQuestions.length
            ? "Excellent! You know your e-waste basics. 🌱"
            : "Good work! Explore the website once more to learn more about e-waste.";


    quizNext.textContent =
        "Take Quiz Again ↻";


    quizNext.style.display =
        "inline-flex";


    quizNext.onclick = () => {

        currentQuestion = 0;

        score = 0;

        quizNext.textContent =
            "Next Question →";

        loadQuestion();

    };

}


loadQuestion();

/* =========================================================
   PROFESSIONAL UPGRADE — TOPIC EXPLORER
========================================================= */

const topicModal = document.getElementById("topicModal");
const topicClose = document.getElementById("topicClose");
const topicModalIcon = document.getElementById("topicModalIcon");
const topicModalTitle = document.getElementById("topicModalTitle");
const topicModalText = document.getElementById("topicModalText");

const topicDetails = {
    "E-Waste": ["♻️", "Electronic Waste",
        "E-waste refers to discarded electrical and electronic equipment and their components. Examples include phones, computers, televisions, printers and other electronic products. Responsible management focuses on reducing unnecessary consumption, extending product life, reuse and appropriate recycling."],
    "Mobile Phones": ["📱", "Mobile Phones",
        "Old smartphones can become e-waste when they are no longer wanted or useful. They contain recoverable materials, so responsible collection, repair, reuse and recycling can help keep those materials in productive use."],
    "Computers": ["💻", "Computers",
        "Laptops, desktops and related IT equipment are common forms of e-waste. Components can include reusable parts and recoverable materials, making proper collection and processing important."],
    "Displays": ["📺", "Displays",
        "Televisions and other display equipment are electronic products that require appropriate handling when discarded. Responsible systems help separate equipment and recover useful materials."],
    "Batteries": ["🔋", "Batteries",
        "Battery-containing electronics need appropriate handling and collection. Keeping discarded electronics out of ordinary waste streams helps support safer and more controlled management."],
    "Statistics": ["📊", "E-Waste Statistics",
        "The website presents global e-waste figures from the Global E-waste Monitor 2024, including 2022 generation, documented recycling and the projected 2030 generation figure shown on this project."],
    "India": ["🇮🇳", "E-Waste in India",
        "India's growing use of digital devices makes collection, recycling, repair, reuse and environmentally sound management increasingly important. This project also introduces India's regulatory framework."],
    "Growing Digital Use": ["📱", "Growing Digital Use",
        "Increasing access to smartphones, computers, appliances and other electronics contributes to the importance of effective e-waste management."],
    "Formal Recycling": ["🏭", "Formal Recycling",
        "Formal collection and recycling systems can improve material recovery and environmentally sound treatment of electronic waste."],
    "Circular Economy": ["🔄", "Circular Economy",
        "A circular economy aims to keep products and materials in productive use for longer through approaches such as repair, reuse, refurbishment and recycling."],
    "Improper Disposal": ["🗑️", "Improper Disposal",
        "Discarding electronic devices with ordinary waste can prevent appropriate collection and recycling. Responsible disposal routes help direct electronics into suitable management systems."],
    "Unsafe Processing": ["⚠️", "Unsafe Processing",
        "Poorly controlled processing can create environmental and occupational risks. Appropriate collection, dismantling and recycling systems are intended to manage electronic waste more responsibly."],
    "Lack of Awareness": ["💡", "Lack of Awareness",
        "People may not know where or how old electronics should be handled. Awareness can help consumers choose repair, reuse and appropriate collection options."],
    "Rapid Technology Change": ["📱", "Rapid Technology Change",
        "Frequent product replacement can increase the amount of electronics entering the waste stream, making longer product life and responsible end-of-life management important."],
    "Soil": ["🌱", "Soil",
        "Poorly managed electronic waste can contribute to contamination risks around disposal and processing areas. Responsible management helps reduce these risks."],
    "Water": ["💧", "Water",
        "Improper handling of electronic waste can create risks for surrounding water systems and ecosystems. Controlled collection and processing are important safeguards."],
    "Air": ["🌬️", "Air",
        "Poor processing practices can contribute to air pollution and exposure risks. Environmentally sound treatment is an important part of responsible e-waste management."],
    "Resources": ["⛏️", "Resource Recovery",
        "Electronic products can contain useful materials. Recycling and recovery can help return materials to productive use rather than treating them simply as waste."],
    "Employment": ["💼", "Employment",
        "Collection, repair, refurbishment and recycling activities can support employment and related sustainable business opportunities."],
    "Innovation": ["🔬", "Innovation",
        "New technologies can improve collection, sorting, repair, refurbishment and material recovery within e-waste management systems."],
    "Reduce": ["1️⃣", "Reduce",
        "Avoid unnecessary purchases and consider durability and repairability when choosing electronic products. Reducing demand can reduce future waste."],
    "Repair": ["🔧", "Repair",
        "Repairing electronics can extend their useful life and delay replacement, helping keep products in use for longer."],
    "Reuse": ["🔁", "Reuse",
        "Functional electronics can potentially be reused, donated or refurbished when appropriate, extending their useful life."],
    "Recycle": ["♻️", "Recycle",
        "Appropriate recycling allows electronic equipment to enter controlled processing systems where recoverable materials can be separated and processed."],
    "Policy": ["📜", "E-Waste Policy",
        "This project introduces India's E-Waste (Management) Rules, 2022 and the responsibilities and recycling framework described in the website's policy section."],
    "E-Waste Management Rules, 2022": ["📜", "E-Waste Management Rules, 2022",
        "The website describes India's E-Waste (Management) Rules, 2022 as the regulatory framework for covered electronic waste management and notes that they came into force on 1 April 2023."],
    "Producer Responsibility": ["🏭", "Producer Responsibility",
        "The framework described by the project establishes responsibilities for relevant stakeholders involved in the electronic product lifecycle."],
    "Recycling Framework": ["♻️", "Recycling Framework",
        "The rules described by the project provide a framework for collection, recycling and environmentally sound management of covered e-waste."]
};

function openTopic(key, fallbackText = "") {
    const data = topicDetails[key] || ["♻️", key, fallbackText || "Explore this topic in the context of responsible e-waste management."];
    topicModalIcon.textContent = data[0];
    topicModalTitle.textContent = data[1];
    topicModalText.textContent = data[2];
    topicModal.classList.add("open");
    topicModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    topicClose.focus();
}

function closeTopic() {
    topicModal.classList.remove("open");
    topicModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

/* Make major headings/cards clickable without changing your existing HTML structure. */
const topicSelectors = [
    ".device-card h3",
    ".stat-card h3",
    ".india-card h3",
    ".challenge-card h3",
    ".impact-card h3",
    ".opportunity-card h3",
    ".solution h3",
    ".policy-card h3",
    ".reference-item strong"
];

document.querySelectorAll(topicSelectors.join(",")).forEach((el) => {
    const key = el.textContent.trim().replace(/\s+/g, " ");
    if (topicDetails[key]) {
        el.classList.add("topic-clickable");
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");
        el.setAttribute("title", "Click to learn more");
        el.addEventListener("click", () => openTopic(key));
        el.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openTopic(key);
            }
        });
    }
});

/* Make important words inside section headings clickable too. */
document.querySelectorAll(".section-heading h2").forEach((heading) => {
    const text = heading.textContent.trim().replace(/\s+/g, " ");
    const keys = Object.keys(topicDetails);
    const key = keys.find(k => text.includes(k));
    if (key) {
        heading.classList.add("topic-clickable");
        heading.setAttribute("title", "Click to explore this topic");
        heading.addEventListener("click", () => openTopic(key));
    }
});

topicClose.addEventListener("click", closeTopic);
document.querySelectorAll("[data-close-topic]").forEach(el => el.addEventListener("click", closeTopic));

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && topicModal.classList.contains("open")) closeTopic();
});
