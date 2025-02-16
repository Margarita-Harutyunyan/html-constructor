document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.getElementById('create-button');
    const result = document.getElementById('result');

    createButton.addEventListener('click', createElement);
    result.addEventListener('click', moveElement);

});

function createElement() {
    const selectedOption = document.getElementById('element').value;
    const constructor = document.getElementById('constructor');

    let element = null;

    switch(selectedOption) {
        case 'div':
            element = createDiv();
            break;
        case 'h1':
            element = createH1();
            break;
        case 'input':
            element = createInput();
            break;
    }

    if (!element) {
        throw new Error(`Failed to create ${selectedOption} element`)
    }
    constructor.appendChild(element);
}

function createDiv() {
    const div = document.createElement('div');
    div.classList.add('div-element');

    div.addEventListener('click', moveElement);

    div.innerHTML = `
        <p>DIV</p>
    `;

    return div;
}

function createH1() {
    const div = document.createElement('div');
    div.classList.add('h1-element');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter heading...';

    const selectorContainer = document.getElementById('selector-container');
    selectorContainer.appendChild(input);
    input.focus();

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const inputText = input.value.trim();

            if (inputText) {
                selectorContainer.removeChild(input);
                div.innerHTML = `
                <p>H1</p>
                <h1>${inputText}</h1>
            `;
            div.addEventListener('click', moveElement);
            }
        }
    });

    return div;
}

function createInput() {
    const div = document.createElement('div');
    div.classList.add('input-element');

    div.addEventListener('click', moveElement);

    div.innerHTML = `
        <p>Input Tag</p>
    `;

    return div;
}

let selectedElement = null;

function moveElement(event) {
    if (event.target.parentElement.id === 'constructor') {
        selectedElement = event.target;
        selectedElement.classList.add('selected');
    }

    else if (selectedElement) {
        const result = document.getElementById('result');

        if (event.target === result || event.target.classList.contains('div-element')) {
            selectedElement.classList.remove('selected');
            event.target.appendChild(selectedElement);
            selectedElement = null;
        } else {
            event.stopPropagation();
            alert(`You cannot move an element into ${event.target.classList}`);
            selectedElement.classList.remove('selected');
        }
    }
}
