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
        console.log(this.size);
        return this.size;
    }

    // Get linked list head
    getListHead() {
        console.log(this.head);
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
                console.log('There is no node at the given index.');
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
        console.log(`Started removing at index ${index}`);
        const returnMessage = `Removed node at index ${index}`;

        // If linked list has no nodes
        if (!this.head) return 'This linked list has no nodes!';
        if (index < 0 || index > this.size) return 'Index out of bounds!';

        // If we are removing the list head
        if (index === 0) {
            this.removeListHead();
            return returnMessage;
        }
        // If we are removing the last element
        if (index === this.size) {
            this.pop();
            this.size--;
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
        if (node.data === value) {
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
            console.log(`Value ${value} has been found in the linked list`);
            return true;
        }

        while (current.nextNode !== null) {
            current = current.nextNode;

            if (current.data === value) {
                console.log(`Value ${value} has been found in the linked list`);
                return true;
            }
        }

        console.log(`Value ${value} has not been found inside the linked list`);
        return false;
    }

    // Returns the index of the value if found in the linked list
    find(value) {
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            if (current.data === value) {
                console.log(`value ${value} found on index: ${i}`);
                return i;
            }
            current = current.nextNode;
        }

        console.log('Value has not been found in the list');
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
    toStringRed(array) {
        let arr = array;
        if (!this.head) {
            return false;
        }
        if (!Array.isArray(array)) {
            arr = [array];
        }
        console.log(arr);
        let current = this.head;
        const elementArr = [];

        let classList = ['linked-list-print', 'cli-text'];
        const parent = createDiv(['linked-list-display-div', 'cli-text', 'linked-list-print'], '');

        // Handle the head element, matches the value inside array
        // Prints head value in red color, else print normal > pushes to element Arr
        if (arr.indexOf(current.data) !== -1) {
            classList = ['linked-list-print', 'cli-text', 'll-red'];
            elementArr.push(createPara('<br>[Head]=>', ['linked-list-print', 'cli-text'], '', 'para'));
            elementArr.push(createPara(`(${current.data})`, classList, '', 'para'));
            elementArr.push(createPara('───>', ['linked-list-print', 'cli-text'], '', 'para'));
        } else {
            elementArr.push(createPara(`<br>[Head]=>(${current.data})───>`, classList, '', 'para'));
        }


        // Traverses nodes, creates element with corresponding classes
        while (current.nextNode !== null) {
            current = current.nextNode;

            if (arr.indexOf(current.data) !== -1) {
                classList = ['linked-list-print', 'cli-text', 'll-red'];
                elementArr.push(createPara(`(${current.data})`, classList, '', 'para'));
                elementArr.push(createPara('───>', ['linked-list-print', 'cli-text'], '', 'para'));
            } else {
                classList = ['linked-list-print', 'cli-text'];
                elementArr.push(createPara(`(${current.data})───>`, classList, '', 'para'));
            }
        }

        elementArr.push(createPara('[end]', ['linked-list-print', 'cli-text'], '', 'para'));
        appendChildren(parent, elementArr);

        return parent;
    }

    // Visual print of linked list
    toString2() {
        if (!this.head) {
            console.log('There are no values in the linked list!');
            return false;
        }
        let i = 0;
        let current = this.head;
        const arr = [];
        let string = `<br>[${i}]=>[Data: ${current.data}]<br> 🠋`;
        arr.push(string);

        while (current.nextNode !== null) {
            current = current.nextNode;
            i++;
            string = `[${i}]=>(Data: ${current.data})<br> 🠋`;
            arr.push(string);
        }

        string = '[end]';
        arr.push(string);
        return arr;
    }

    // Create new list
    createNewList(array) {
        this.newListHead(array.shift());

        array.forEach((value) => {
            this.appendNewNode(value);
        });
    }
}


const ll = new LinkedList();
ll.insertListHead(100);
ll.insertListHead(200);
ll.insertListHead(300);
ll.appendNewNode(400);
ll.getListData();
ll.getListSize();
ll.getListHead();
ll.getListTail();
ll.atIndex(0);
ll.atIndex(1);
ll.atIndex(2);
ll.atIndex(3);
ll.getListSize();
ll.pop();
ll.getListSize();

ll.contains(500);
ll.contains(200);
ll.contains(100);
ll.contains(300);
ll.contains(600);
ll.contains(400);

ll.find(100);
ll.find(200);
ll.find(400);
ll.find(500);

ll.toString();
ll.appendNewNode(500);
ll.appendNewNode(700);
ll.toString();
ll.getListSize();
ll.getListData();

ll.insertListHead('test');
ll.getListData();
ll.toString();
ll.insertAtIndex('head', 0);
ll.insertAtIndex('head', 7);
ll.insertAtIndex('random', 3);


console.log('START TEST:');
ll.toString();
ll.removeAtIndex(0);
ll.toString();
ll.removeAtIndex(2);
ll.toString();
ll.removeAtIndex(6);
ll.toString();
ll.removeAtIndex(6);
// ll.removeAtIndex(6);
ll.toString();
// ll.removeAtIndex(6);
ll.removeAtIndex(5);
ll.toString();
ll.appendNewNode(100);
ll.appendNewNode(200);
ll.appendNewNode(100);
ll.appendNewNode(100);
ll.appendNewNode(300);
ll.appendNewNode(400);
ll.appendNewNode(100);
ll.toString();
ll.removeValue(100);
ll.toString();
ll.removeValue(300);
ll.toString();
ll.removeValue('test');
ll.toString();

export function getLinkedList() {
    return ll;
}
