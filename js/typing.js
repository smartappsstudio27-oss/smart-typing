"use strict";

/* ==========================================================
   Smart Typing
   Brand      : SmartApps Studio
   File       : typing.js
   Version    : 2.0.0
   Author     : SmartApps Studio
   Description:
   Professional Typing Engine

   This file controls:

   ✔ Passage Loading
   ✔ Typing Detection
   ✔ Character Validation
   ✔ WPM
   ✔ Accuracy
   ✔ Errors
   ✔ Timer Integration
   ✔ Auto Scroll
   ✔ Result Generation
   ✔ Leaderboard Ready
   ✔ Firebase Ready

========================================================== */


/* ==========================================================
   CONFIGURATION
========================================================== */

const TYPING_CONFIG = {

    DEFAULT_MODE: 30,

    DEFAULT_TIME: 60,

    DEFAULT_LANGUAGE: "english",

    CURSOR_CLASS: "current",

    CORRECT_CLASS: "correct",

    INCORRECT_CLASS: "incorrect",

    EXTRA_CLASS: "extra",

    REMAINING_CLASS: "remaining",

    PASSAGE_CONTAINER: "typing-passage",

    INPUT_BOX: "typing-input"

};


/* ==========================================================
   GLOBAL STATE
========================================================== */

const TypingState = {

    initialized: false,

    started: false,

    finished: false,

    paused: false,

    mode: TYPING_CONFIG.DEFAULT_MODE,

    language: TYPING_CONFIG.DEFAULT_LANGUAGE,

    duration: TYPING_CONFIG.DEFAULT_TIME,

    startTime: 0,

    endTime: 0,

    currentIndex: 0,

    passage: "",

    words: [],

    characters: [],

    typedText: ""

};


/* ==========================================================
   MAIN ENGINE
========================================================== */

class TypingEngine {

    constructor() {

        this.container = null;

        this.input = null;

        this.characterElements = [];

    }

    initialize() {

        if (TypingState.initialized) {

            return;

        }

        this.cacheDOM();
       this.initializePassage();
        this.bindEvents();

        TypingState.initialized = true;

    }

    cacheDOM() {

        this.container = document.getElementById(

            TYPING_CONFIG.PASSAGE_CONTAINER

        );

        this.input = document.getElementById(

            TYPING_CONFIG.INPUT_BOX

        );

    }

    bindEvents() {

        if (!this.input) {

            return;

        }

        this.input.addEventListener(

            "input",

            this.handleInput.bind(this)

        );

    }

    handleInput(event) {

        if (!TypingState.started) {

            TypingState.started = true;

            TypingState.startTime = Date.now();

        }

        TypingState.typedText =

            event.target.value;

        this.processTyping();

    }

    processTyping() {

        /*
            Character Checking

            Cursor Movement

            Accuracy

            WPM

            Errors

            Progress

            Result

            Will be added
            in upcoming Parts.
        */

    }

}


/* ==========================================================
   CREATE ENGINE
========================================================== */

const typingEngine =

    new TypingEngine();


/* ==========================================================
   START APPLICATION
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        typingEngine.initialize();

    }

);


/* ==========================================================
   END OF PART 1
========================================================== *//* ==========================================================
   PASSAGE DATA
========================================================== */

TypingEngine.prototype.passages = {

    english: {

        30: [],

        40: [],

        50: [],

        60: [],

        80: []

    }

};


/* ==========================================================
   LOAD PASSAGES
========================================================== */

TypingEngine.prototype.loadPassages = async function () {

    const mode = TypingState.mode;

    const language = TypingState.language;

    const file = `data/${mode}wpm.json`;

    try {

        const response = await fetch(file);

        if (!response.ok) {

            throw new Error("Unable to load passage.");

        }

        const json = await response.json();

        if (Array.isArray(json)) {

            this.passages[language][mode] = json;

        }

        else if (Array.isArray(json.passages)) {

            this.passages[language][mode] = json.passages;

        }

        else {

            throw new Error("Invalid JSON format.");

        }

    }

    catch (error) {

        console.error(error);

        this.loadDefaultPassages();

    }

};


/* ==========================================================
   DEFAULT PASSAGES
========================================================== */

TypingEngine.prototype.loadDefaultPassages = function () {

    this.passages.english[30] = [

        "The quick brown fox jumps over the lazy dog.",

        "Typing every day improves speed and accuracy.",

        "Practice is the key to becoming a better typist."

    ];

};


/* ==========================================================
   RANDOM PASSAGE
========================================================== */

TypingEngine.prototype.selectRandomPassage = function () {

    const mode = TypingState.mode;

    const language = TypingState.language;

    const list = this.passages[language][mode];

    if (!list || list.length === 0) {

        console.warn("No passages found.");

        return "";

    }

    const randomIndex = Math.floor(

        Math.random() * list.length

    );

    return list[randomIndex];

};


/* ==========================================================
   PREPARE PASSAGE
========================================================== */

TypingEngine.prototype.preparePassage = function () {

    TypingState.passage =

        this.selectRandomPassage();

    TypingState.characters =

        Array.from(

            TypingState.passage

        );

    TypingState.words =

        TypingState.passage

        .trim()

        .split(/\s+/);

};


/* ==========================================================
   INITIAL LOADER
========================================================== */

TypingEngine.prototype.initializePassage =

async function () {

    await this.loadPassages();

    this.preparePassage();

    this.renderPassage();

};/* ==========================================================
   RENDER PASSAGE
========================================================== */

TypingEngine.prototype.renderPassage = function () {

    if (!this.container) {

        return;

    }

    this.container.innerHTML = "";

    this.characterElements = [];

    TypingState.characters.forEach(

        (character, index) => {

            const span =

                document.createElement("span");

            span.textContent = character;

            span.dataset.index = index;

            span.classList.add(

                TYPING_CONFIG.REMAINING_CLASS

            );

            if (index === 0) {

                span.classList.remove(

                    TYPING_CONFIG.REMAINING_CLASS

                );

                span.classList.add(

                    TYPING_CONFIG.CURSOR_CLASS

                );

            }

            this.characterElements.push(span);

            this.container.appendChild(span);

        }

    );

};


/* ==========================================================
   RESET PASSAGE
========================================================== */

TypingEngine.prototype.resetPassage = function () {

    TypingState.started = false;

    TypingState.finished = false;

    TypingState.currentIndex = 0;

    TypingState.typedText = "";

    TypingState.startTime = 0;

    TypingState.endTime = 0;

    if (this.input) {

        this.input.value = "";

        this.input.disabled = false;

        this.input.focus();

    }

    this.renderPassage();

};


/* ==========================================================
   LOAD NEXT PASSAGE
========================================================== */

TypingEngine.prototype.loadNextPassage = async function () {

    await this.loadPassages();

    this.preparePassage();

    this.resetPassage();

};


/* ==========================================================
   GET CURRENT CHARACTER
========================================================== */

TypingEngine.prototype.getCurrentCharacter = function () {

    return TypingState.characters[
        TypingState.currentIndex
    ];

};


/* ==========================================================
   GET CURRENT ELEMENT
========================================================== */

TypingEngine.prototype.getCurrentElement = function () {

    return this.characterElements[
        TypingState.currentIndex
    ];

};


/* ==========================================================
   GET CHARACTER COUNT
========================================================== */

TypingEngine.prototype.getCharacterCount = function () {

    return TypingState.characters.length;

};


/* ==========================================================
   IS COMPLETED
========================================================== */

TypingEngine.prototype.isCompleted = function () {

    return (

        TypingState.currentIndex >=

        TypingState.characters.length

    );

};/* ==========================================================
   PROCESS TYPING
========================================================== */

TypingEngine.prototype.processTyping = function () {

    const typed = this.input.value;

    TypingState.typedText = typed;

    TypingState.currentIndex = typed.length;

    this.validateCharacters();

    this.updateCursor();
   this.refreshStatistics();
    this.checkCompletion();

};


/* ==========================================================
   VALIDATE CHARACTERS
========================================================== */

TypingEngine.prototype.validateCharacters = function () {

    this.characterElements.forEach(

        (element, index) => {

            element.classList.remove(

                TYPING_CONFIG.CORRECT_CLASS,

                TYPING_CONFIG.INCORRECT_CLASS,

                TYPING_CONFIG.CURSOR_CLASS,

                TYPING_CONFIG.REMAINING_CLASS

            );

            const typedCharacter =

                TypingState.typedText[index];

            const actualCharacter =

                TypingState.characters[index];

            if (typedCharacter === undefined) {

                element.classList.add(

                    TYPING_CONFIG.REMAINING_CLASS

                );

                return;

            }

            if (typedCharacter === actualCharacter) {

                element.classList.add(

                    TYPING_CONFIG.CORRECT_CLASS

                );

            }

            else {

                element.classList.add(

                    TYPING_CONFIG.INCORRECT_CLASS

                );

            }

        }

    );

};


/* ==========================================================
   UPDATE CURSOR
========================================================== */

TypingEngine.prototype.updateCursor = function () {

    const current =

        this.characterElements[
            TypingState.currentIndex
        ];

    if (!current) {

        return;

    }

    current.classList.remove(

        TYPING_CONFIG.REMAINING_CLASS

    );

    current.classList.add(

        TYPING_CONFIG.CURSOR_CLASS

    );

    this.autoScroll(current);

};


/* ==========================================================
   CHECK COMPLETION
========================================================== */

TypingEngine.prototype.checkCompletion = function () {

    if (!this.isCompleted()) {

        return;

    }

    TypingState.finished = true;

    TypingState.endTime = Date.now();

    if (this.input) {

        this.input.disabled = true;

    }

    console.log(

        "Typing Test Completed"

    );

};


/* ==========================================================
   AUTO SCROLL
========================================================== */

TypingEngine.prototype.autoScroll = function (

    element

) {

    if (!this.container || !element) {

        return;

    }

    const top =

        element.offsetTop;

    const visible =

        this.container.scrollTop +

        this.container.clientHeight;

    if (top > visible - 80) {

        this.container.scrollTop =

            top -

            this.container.clientHeight +

            100;

    }

};


/* ==========================================================
   RESTART ENGINE
========================================================== */

TypingEngine.prototype.restart = async function () {

    await this.loadNextPassage();

};


/* ==========================================================
   NEXT PASSAGE
========================================================== */

TypingEngine.prototype.nextPassage = async function () {

    await this.loadNextPassage();

};/* ==========================================================
   CALCULATE STATISTICS
========================================================== */

TypingEngine.prototype.calculateStatistics = function () {

    let correct = 0;

    let incorrect = 0;

    let extra = 0;

    const typed = TypingState.typedText;

    const original = TypingState.characters;

    for (

        let index = 0;

        index < typed.length;

        index++

    ) {

        if (index >= original.length) {

            extra++;

            continue;

        }

        if (

            typed[index] ===

            original[index]

        ) {

            correct++;

        }

        else {

            incorrect++;

        }

    }

    TypingState.correctCharacters = correct;

    TypingState.incorrectCharacters = incorrect;

    TypingState.extraCharacters = extra;

};


/* ==========================================================
   GET PROGRESS
========================================================== */

TypingEngine.prototype.getProgress = function () {

    if (

        TypingState.characters.length === 0

    ) {

        return 0;

    }

    return Math.floor(

        (

            TypingState.currentIndex /

            TypingState.characters.length

        ) * 100

    );

};


/* ==========================================================
   UPDATE PROGRESS
========================================================== */

TypingEngine.prototype.updateProgress = function () {

    const progressElement =

        document.getElementById(

            "progress"

        );

    if (!progressElement) {

        return;

    }

    progressElement.textContent =

        this.getProgress() + "%";

};


/* ==========================================================
   UPDATE ERROR COUNT
========================================================== */

TypingEngine.prototype.updateErrorCount = function () {

    const element =

        document.getElementById(

            "errors"

        );

    if (!element) {

        return;

    }

    element.textContent =

        TypingState.incorrectCharacters;

};


/* ==========================================================
   UPDATE CORRECT COUNT
========================================================== */

TypingEngine.prototype.updateCorrectCount = function () {

    const element =

        document.getElementById(

            "correct-count"

        );

    if (!element) {

        return;

    }

    element.textContent =

        TypingState.correctCharacters;

};


/* ==========================================================
   UPDATE INCORRECT COUNT
========================================================== */

TypingEngine.prototype.updateIncorrectCount = function () {

    const element =

        document.getElementById(

            "incorrect-count"

        );

    if (!element) {

        return;

    }

    element.textContent =

        TypingState.incorrectCharacters;

};


/* ==========================================================
   UPDATE EXTRA COUNT
========================================================== */

TypingEngine.prototype.updateExtraCount = function () {

    const element =

        document.getElementById(

            "extra-count"

        );

    if (!element) {

        return;

    }

    element.textContent =

        TypingState.extraCharacters;

};


/* ==========================================================
   REFRESH STATISTICS
========================================================== */

TypingEngine.prototype.refreshStatistics = function () {

    this.calculateStatistics();

    this.updateProgress();

    this.updateErrorCount();

    this.updateCorrectCount();

    this.updateIncorrectCount();

    this.updateExtraCount();

};
