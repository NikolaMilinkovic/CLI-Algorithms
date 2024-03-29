/* eslint-disable max-classes-per-file */
import {
    createPara, createInput, createButton, appendChildren, createDiv, addListener, addThisListener,
} from './element-builder.js';

class Node {
    constructor(data = null, nextNode = null) {
        this.data = data;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Insert new element as the head
    insertListHead(data) {
        this.head = new Node(data, this.head);
        this.size++;
    }

    // Removes list head and points to a new one
    removeListHead() {
        this.head = this.head.nextNode;
        this.size--;
    }

    // Insert new list tail
    insertListTail(data) {
        const tail = this.getListTail();
        tail.nextNode = new Node(data);
        this.size++;
    }

    // Sets new node as head with null pointer
    newListHead(data) {
        this.head = new Node(data);
    }

    // Prints out all the data from linked list
    getListData() {
        const arr = [];
        let current = this.head;
        arr.push(current.data);

        while (current) {
            arr.push(current.data);
            current = current.nextNode;
        }

        return arr;
    }

    // Appends new node to the end of the linked list
    appendNewNode(data) {
        // If there are no nodes in the linked list
        if (!this.head) {
            this.head = new Node(data);
            this.size++;
            return this;
        }
        // If we have nodes in the linked list

        let current = this.head;

        while (current.nextNode !== null) {
            current = current.nextNode;
        }
        current.nextNode = new Node(data);
        this.size++;
    }

    // Get the size of the linked list
    getListSize() {
        return this.size;
    }

    // Sets the list size
    setListSize(value) {
        if (Array.isArray(value)) {
            value.forEach((num) => {
                this.size++;
            });
        }
        if (!Array.isArray(value)) this.size = value;
    }

    // Get linked list head
    getListHead() {
        return this.head;
    }

    // Returns the tail of the list / last node of the list
    getListTail() {
        if (!this.head) {
            return 'This linked list has no nodes!';
        }
        let current = this.head;

        while (current.nextNode !== null) {
            current = current.nextNode;
        }

        return current;
    }

    // Returns node at the given index
    atIndex(index) {
        // If linked list has no nodes
        if (!this.head) {
            return 'This linked list has no nodes!';
        }

        // Traverse nodes until index

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.nextNode;
            if (current === null) {
                return null;
            }
        }
        if (current !== null) {
            return current;
        }
    }

    // Inserts new value at given index
    insertAtIndex(data, index) {
        const returnMessage = `New data of ${data} added at index ${index}`;
        // If linked list has no nodes
        if (!this.head) return 'This linked list has no nodes!';
        if (index < 0 || index > this.size) return 'Index out of bounds!';

        // If we are adding a new head
        if (index === 0) {
            this.insertListHead(data);
            return returnMessage;
        }
        // If we are adding a new tail
        if (index === this.size) {
            this.appendNewNode(data);
            return returnMessage;
        }

        let current = this.head;
        let previous;

        for (let i = 0; i < index; i++) {
            previous = current;
            current = current.nextNode;
        }

        // Add new node and set new node.nextNode to the current node
        previous.nextNode = new Node(data, current);

        this.size++;
        return returnMessage;
    }

    // Removes node at given index
    removeAtIndex(index) {
        const returnMessage = `Removed node at index ${index}`;

        // If linked list has no nodes
        if (!this.head) return 'This linked list has no nodes!';
        if (index < 0 || index > this.size) return 'Index out of bounds!';

        // If we are removing the list head
        if (index === '0') {
            this.removeListHead();
            return returnMessage;
        }
        // If we are removing the last element
        if (index === this.size) {
            this.pop();
            return returnMessage;
        }

        let current = this.head;
        let previous;

        for (let i = 0; i < index; i++) {
            previous = current;
            current = current.nextNode;
        }

        previous.nextNode = current.nextNode;
        this.size--;

        return returnMessage;
    }

    // Method for removing every instance of provided value from linked list
    // calls recursively removeValueRecursive method
    removeValue(value) {
        this.head = this.removeValueRecursive(this.head, value);
    }

    // Called by removeValue, this method removes each instance of value from the linked list
    removeValueRecursive(node, value) {
        // Base case: if node is null, return null
        if (!node) {
            return null;
        }

        // If current node's data is the value, move to the next node
        if (node.data.toString() === value.toString()) {
            return this.removeValueRecursive(node.nextNode, value);
        }

        // Keep the current node and move to the next node
        node.nextNode = this.removeValueRecursive(node.nextNode, value);

        return node;
    }

    // Removes last node from the list
    pop() {
        const returnMessage = 'Removed last node from the list';
        if (!this.head) {
            return 'This linked list has no nodes!';
        }

        // If there is only one node
        if (!this.head.nextNode) {
            this.head = null;
            this.size--;
            return returnMessage;
        }

        let current = this.head;
        let previous;

        while (current.nextNode !== null) {
            previous = current;
            current = current.nextNode;
        }

        previous.nextNode = null;
        this.size--;
        return returnMessage;
    }

    // Checks if the value is in the list
    // If value found return true else false
    contains(value) {
        let current = this.head;
        if (current.data === value) {
            return true;
        }

        while (current.nextNode !== null) {
            current = current.nextNode;

            if (current.data === value) {
                return true;
            }
        }

        return false;
    }

    // Returns the index of the value if found in the linked list
    find(value) {
        let current = this.head;
        let i = 0;

        for (; i <= this.size; i++) {
            if (current.data.toString() === value) {
                return [current.data, i];
            }
            current = current.nextNode;
        }

        return false;
    }

    // Visual print of linked list
    toString() {
        if (!this.head) {
            return 'Tree has no values! Try inserting some?';
        }
        let current = this.head;
        let i = 0;
        let string = `<br>[Head]=>(${current.data})───>`;

        while (current.nextNode !== null) {
            current = current.nextNode;
            i++;
            string += `(${current.data})───>`;
        }

        string += '[end]';
        return string;
    }

    // Method for printing the linked list with highlighted values
    toStringRedGreen(array, color = 'red') {
        let arr = array;
        if (!this.head) {
            return false;
        }
        if (!Array.isArray(array)) {
            arr = [array];
        }

        // Converts all values inside the array into string for evaluation
        arr = arr.map((value) => String(value));
        const parent = createDiv(['linked-list-display-div', 'cli-text', 'linked-list-print'], '');
        const classListColored = ['linked-list-print', 'cli-text'];
        const classList = ['linked-list-print', 'cli-text'];
        let current = this.head;
        const elementArr = [];
        const trueOrFalse = (isHighlighted) => isHighlighted >= 0;

        // Color selector
        if (color === 'red') classListColored.push('ll-red');
        if (color === 'green') classListColored.push('ll-green');

        // Handle the head element, matches the value inside array
        // Prints head value in red color, else print normal > pushes to element Arr
        // If element not found in the arr return -1 and compare to -1
        // if element is found in the array it wil return index and will go in if statement
        let valueFound = arr.indexOf(current.data.toString());
        let isHighlighted = trueOrFalse(valueFound);

        if (isHighlighted) {
            elementArr.push(createPara('<br>[Head]=>', classList, '', 'para'));
            elementArr.push(createPara(`(${current.data})`, classListColored, '', 'para'));
            elementArr.push(createPara('───>', classList, '', 'para'));
        } else {
            elementArr.push(createPara(`<br>[Head]=>(${current.data})───>`, classList, '', 'para'));
        }
        current = current.nextNode;


        while (current.nextNode !== null) {
            // Looks for value > translates to true or false
            valueFound = arr.indexOf(current.data.toString());
            isHighlighted = trueOrFalse(valueFound);

            if (isHighlighted) {
                elementArr.push(createPara(`(${current.data})`, classListColored, '', 'para'));
                elementArr.push(createPara('───>', classList, '', 'para'));
            } else {
                elementArr.push(createPara(`(${current.data})───>`, classList, '', 'para'));
            }
            current = current.nextNode;
        }

        valueFound = arr.indexOf(current.data.toString());
        isHighlighted = trueOrFalse(valueFound);

        if (isHighlighted) {
            elementArr.push(createPara(`(${current.data})`, classListColored, '', 'para'));
            elementArr.push(createPara('───>', classList, '', 'para'));
        } else {
            elementArr.push(createPara(`(${current.data})───>`, classList, '', 'para'));
        }

        elementArr.push(createPara('[end]', classList, '', 'para'));
        appendChildren(parent, elementArr);

        return parent;
    }

    // Method for printing the linked list with highlighted values
    toStringColoredArg(index, argument = 'index', color) {
        const current = this.head;
        if (!this.head) {
            return false;
        }
        const parent = createDiv(['linked-list-display-div', 'cli-text', 'linked-list-print'], '');
        let classListColored = ['linked-list-print', 'cli-text', 'll-green'];
        if (color === 'green') {
            classListColored = ['linked-list-print', 'cli-text', 'll-green'];
        }
        if (color === 'red') {
            classListColored = ['linked-list-print', 'cli-text', 'll-red'];
        }
        const classList = ['linked-list-print', 'cli-text'];
        let elementArr = [];


        if (argument === 'tail') {
            elementArr = this.paintTail(elementArr, current, classList, classListColored);
            appendChildren(parent, elementArr);
        }
        if (argument === 'head') {
            elementArr = this.paintHead(elementArr, current, classList, classListColored);
            appendChildren(parent, elementArr);
        }
        if (argument === 'index') {
            elementArr = this.paintIndex(elementArr, current, index, classList, classListColored);
            appendChildren(parent, elementArr);
        }
        if (argument === 'values') {
            elementArr = this.paintValues(elementArr, current, index, classList, classListColored);
            appendChildren(parent, elementArr);
        }
        return parent;
    }

    paintValues(elementArr, current, index, classList, classListColored) {

    }

    // Traverses the linked list and paints the index node in selected color
    // Returns an array with elements
    paintIndex(elementArr, node, index, classList, classListColored) {
        const printHead = () => { elementArr.push(createPara('<br>[Head]=>', ['linked-list-print', 'cli-text'], '', 'para')); };
        const printEnd = () => {
            elementArr.push(createPara('───>', ['linked-list-print', 'cli-text'], '', 'para'));
            elementArr.push(createPara('[end]', ['linked-list-print', 'cli-text'], '', 'para'));
        };
        const printColored = () => {
            elementArr.push(createPara(`(${node.data})`, classListColored, '', 'para'));
            elementArr.push(createPara('───>', classList, '', 'para'));
        };
        const printStandard = () => { elementArr.push(createPara(`(${node.data})───>`, classList, '', 'para')); };
        const printStandardNoArrow = () => { elementArr.push(createPara(`(${node.data})`, classList, '', 'para')); };
        const evaluateIndex = (isLast = false) => {
            if (isLast === false) {
                if (i.toString() === index) {
                    printColored();
                } else {
                    printStandard();
                }
            } else if (i.toString() === index) {
                printColored();
            } else {
                printStandardNoArrow();
            }
        };
        let i = 0;

        printHead();
        while (node.nextNode !== null) {
            evaluateIndex();
            i++;

            node = node.nextNode;
        }
        i++;
        evaluateIndex(true);
        printEnd();

        return elementArr;
    }

    // Traverses the linked list and paints the last node in selected color
    // Returns an array with elements
    paintTail(elementArr, node, classList, classListColored) {
        elementArr.push(createPara('<br>[Head]=>', ['linked-list-print', 'cli-text'], '', 'para'));
        while (node.nextNode !== null) {
            elementArr.push(createPara(`(${node.data})───>`, classList, '', 'para'));
            node = node.nextNode;
        }
        elementArr.push(createPara(`(${node.data})`, classListColored, '', 'para'));
        elementArr.push(createPara('───>', ['linked-list-print', 'cli-text'], '', 'para'));
        elementArr.push(createPara('[end]', ['linked-list-print', 'cli-text'], '', 'para'));

        return elementArr;
    }

    // Creates head element with selected color and rest with standard
    // Returns an array with elements
    paintHead(elementArr, node, classList, classListColored) {
        elementArr.push(createPara('<br>[Head]=>', ['linked-list-print', 'cli-text'], '', 'para'));
        elementArr.push(createPara(`(${node.data})`, classListColored, '', 'para'));
        elementArr.push(createPara('───>', ['linked-list-print', 'cli-text'], '', 'para'));
        node = node.nextNode;
        while (node.nextNode !== null) {
            elementArr.push(createPara(`(${node.data})───>`, classList, '', 'para'));
            node = node.nextNode;
        }
        elementArr.push(createPara(`(${node.data})`, classList, '', 'para'));
        elementArr.push(createPara('───>', ['linked-list-print', 'cli-text'], '', 'para'));
        elementArr.push(createPara('[end]', ['linked-list-print', 'cli-text'], '', 'para'));

        return elementArr;
    }

    // Creates new linked list from an array elements
    // Updates the linked list size
    createNewList(array) {
        this.newListHead(array.shift());

        array.forEach((value) => {
            this.appendNewNode(value);
        });

        if (this.size > array.length) this.size = array.length;
    }

    // Generates random values, can specify amount of numbers and range
    generateRandomLL(numOfValues, min, max) {
        const values = [];
        // Returns random value between min [included] / max [included]
        // Pushes it to array
        for (let i = 0; i < numOfValues; i++) {
            values.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }

        return values;
    }
}

const ll = new LinkedList();

export function getLinkedList() {
    return ll;
}
