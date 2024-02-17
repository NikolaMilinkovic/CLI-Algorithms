
// Evaluates user input, returns false if validation fails
export function inputRegexValidator(input) {
    if (input.value === '') return false;
    if (!/^-?\d+([,\s]-?\d+)*$/g.test(input.value)) {
        inputAlert();
        return false;
    }

    return true;
}

function inputAlert() {
    alert('Input contains invalid characters. Please enter only numbers separated by spaces or commas.');
    input.focus();
}

export function buildArray(input) {
    let array = [];
    if (input.value.includes(' ')) array = input.value.split(' ');
    else if (input.value.includes(',')) array = input.value.split(',');
    else (array = input.value);

    return array;
}

export function isBalancedTreeText(balanced) {
    // const input = document.getElementById('input-balanced');
    if (balanced === true) {
        // input.style.placeholder.color = '#08FF83';
        return 'The tree is balanced.';
    }
    // input.style.placeholder.color = '#FF1E8E';
    return 'The tree is not balanced';
}


export function placeholder() {

}