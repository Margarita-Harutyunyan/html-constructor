document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.getElementById('create-button');
    const result = document.getElementById('result');

    createButton.addEventListener('click', createElement);
    result.addEventListener('dragover', allowDrop);
    result.addEventListener('drop', drop);

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
    
    element.id = 'elem_' + Date.now();
    element.draggable = true;
    element.addEventListener('dragstart', drag);

    constructor.appendChild(element);
}

function createDiv() {
    const div = document.createElement('div');
    div.classList.add('div-element');

    div.addEventListener('dragover', allowDrop);
    div.addEventListener('drop', drop);
    div.innerText = 'DIV';

    return div;
}

function createH1() {
    const h1 = document.createElement('h1');
    h1.classList.add('h1-element');

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');

    const selectorContainer = document.getElementById('selector-container');
    selectorContainer.appendChild(inputContainer);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter heading...';

    const inputButton = document.createElement('button');
    inputButton.innerText = 'Add';

    inputContainer.appendChild(input);
    inputContainer.appendChild(inputButton);

    input.focus();

    inputButton.addEventListener('click', () => {
        const inputText = input.value.trim();
        selectorContainer.removeChild(inputContainer);
        h1.textContent = inputText;
    });

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const inputText = input.value.trim();
            selectorContainer.removeChild(inputContainer);
            h1.textContent = inputText;
        }
    });

    return h1;
}

function createInput() {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Input Tag';

    input.classList.add('input-element');

    return input;
}

function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
    event.target.classList.add('draggable');
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();

    const selectedElement = document.querySelector('.draggable');

    if (selectedElement) {
        if (event.target.id === 'result' || event.target.classList.contains('div-element')) {
            event.target.appendChild(selectedElement);
        } else {
            event.stopPropagation();
            alert(`You cannot move an element into ${event.target.classList}`);
        }
        selectedElement.classList.remove('draggable');
    }
}
