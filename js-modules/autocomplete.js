import { getThemes } from './themes.js';

const themes = getThemes();

/* eslint-disable no-continue */
export default class Autocomplete {
    constructor(keywordsArr) {
        this.keywords = keywordsArr;
    }

    findMatch(value, inputEl) {
        const regex = new RegExp(`^${value}`, 'i');
        const input = inputEl;
        const span = this.returnLastSpan();

        // Run the input value through the regex
        const matchingKeyword = this.keywords.find((keyword) => regex.test(keyword) && input.value !== '');

        if (matchingKeyword) {
            // Change case of keyword in keywords array according to user input
            const suggestion = this.caseCheck(matchingKeyword);
            // Display suggestion
            span.innerText = suggestion;
        } else {
            // Clear suggestion if keyword is not found
            span.innerText = '';
        }
    }

    caseCheck = (value) => {
        // Array of characters
        const word = value.split('');
        const input = this.returnLastInput();
        const inp = input.value;

        // loop through every character in inp
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const i in inp) {
            const char = inp[i];
            if (char === word[i]) {
                continue;
            } else if (char.toUpperCase() === word[i]) {
                word.splice(i, 1, word[i].toLowerCase());
            } else {
                word.splice(i, 1, word[i].toUpperCase());
            }
        }

        return word.join('');
    };

    resetSpan() {
        const span = this.returnLastSpan();
        span.innerText = '';
    }

    returnLastInput() {
        const cliSection = document.getElementById('cli-section');
        const inputs = cliSection.querySelectorAll('input');
        const lastInput = inputs[inputs.length - 1];
        return lastInput;
    }

    returnLastSpan() {
        const cliSection = document.getElementById('cli-section');
        const spans = cliSection.querySelectorAll('span');
        const lastSpan = spans[spans.length - 1];
        return lastSpan;
    }
}


function getCmdList(command, array) {
    const arr = [];
    array.forEach((theme) => {
        arr.push(`${command} ${theme}`);
    });
    return arr;
}

function getDSList() {
    return [
        'bst',
        'binary-search-tree',
        'linked-list',
        'll',
        'hash-map',
        'hm',
    ];
}

export function getRandomDS() {
    const ds = getDSList();
    const rand = Math.floor(Math.random() * (ds.length - 1));
    return ds[rand];
}


const themeCommands = getCmdList('theme', themes.getThemesList());
const dataStructureCommands = getCmdList('run', getDSList());
const keywordsArr = [
    'help',
    'run',
    'ds',
    'data-structures',
    'clear',
    'git',
    'themes',
    'theme',
    'banner',
    'animation',
    'animation start',
    'animation stop',
    'theme random',
    'random theme',
    'random ds',
    'random data-structure',
    'reload',
    'exit',
    'fullscreen',
    'clear display',
    ...themeCommands,
    ...dataStructureCommands,
];
keywordsArr.sort();
const autocomplete = new Autocomplete(keywordsArr);

export function getAutocomplete() {
    return autocomplete;
}

