const root = document.getElementById("root");
const input = document.getElementById("todo-input");
const itemList = document.getElementById("todo-list");
const footer = document.getElementById("todo-footer");
const todoCount = document.getElementById("todo-count");
let todoListData = [];
let count = 0,
    id = 0;

input.addEventListener('keyup', event => {
    if (event.keyCode === 13 && event.target.value !== "") {
        var newItem = CreateNewItem(event.target.value);
        todoListData.push(newItem);
        newItem.node.childNodes[0].childNodes[0].addEventListener('click', () => {
            HandleOnClick(newItem);
            CountTodoList();
        });
        newItem.node.addEventListener("mouseenter", () => {
            HandleOnMouseEnter(newItem);
        });
        newItem.node.addEventListener("mouseleave", () => {
            HandleOnMouseLeave(newItem);
        });
    }
    CountTodoList();
});

function CountTodoList() {
    todoCount.innerHTML = "";
    todoCount.innerHTML = todoListData.filter(ele => !ele.isComplete).length + " left";
}

function CreateNewItem(inputValue) {
    const itemNode = document.createElement("li");
    const wrapper = document.createElement("div");
    const checkbox = document.createElement("input");
    const checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", id);
    const itemContent = document.createElement("h1");
    itemContent.setAttribute("class", "todo-app__item-detail");
    itemContent.innerHTML = inputValue;
    checkbox.setAttribute("id", id);
    id++;
    checkbox.setAttribute("type", "checkbox");
    wrapper.setAttribute("class", "todo-app__checkbox");
    wrapper.appendChild(checkbox);
    wrapper.appendChild(checkboxLabel);
    itemNode.setAttribute("class", "todo-app__item");
    itemNode.appendChild(wrapper);
    itemNode.appendChild(itemContent);
    itemList.appendChild(itemNode);
    input.value = "";
    input.placeholder = "What needs to be done?";
    return { "node": itemNode, "isComplete": false }
}

function HandleOnClick(newItem) {
    const node = newItem.node.childNodes[1];
    if (newItem.isComplete === false) {
        newItem.isComplete = true;
        node.style["text-decoration"] = "line-through";
        node.style["opacity"] = 0.5;
    } else if (newItem.isComplete === true) {
        newItem.isComplete = false;
        node.style["text-decoration"] = "none";
        node.style["opacity"] = 1;
    }
}

function HandleOnMouseEnter(newItem) {
    const imgNode = document.createElement("img");
    imgNode.setAttribute("src", "img/x.png");
    imgNode.setAttribute("class", "todo-app__item-x");
    newItem.node.appendChild(imgNode);
    imgNode.addEventListener("click", () => {
        DeleteSpecificNode(newItem);
    });
}

function HandleOnMouseLeave(newItem) {
    newItem.node.removeChild(newItem.node.childNodes[2]);
}

function DeleteSpecificNode(newItem) {
    itemList.removeChild(newItem.node);
    todoListData = todoListData.filter(item => item !== newItem);
    CountTodoList();
}

const buttonAll = footer.children[1].children[0];
const buttonActive = footer.children[1].children[1];
const buttonCompleted = footer.children[1].children[2];

buttonAll.addEventListener("click", () => {
   	removeAllChildNodes(itemList);
    for (var i = 0; i < todoListData.length; i++) {
    	itemList.appendChild(todoListData[i].node);
    }
});

buttonActive.addEventListener("click", () => {
	removeAllChildNodes(itemList);
	let activeTodoList = todoListData.filter(ele => !ele.isComplete);
	for (var i = 0; i < activeTodoList.length; i++) {
    	itemList.appendChild(activeTodoList[i].node);
    }
});

buttonCompleted.addEventListener("click", () => {
	removeAllChildNodes(itemList);
	let completedTodoList = todoListData.filter(ele => ele.isComplete);
	for (var i = 0; i < completedTodoList.length; i++) {
    	itemList.appendChild(completedTodoList[i].node);
    }
});

function removeAllChildNodes(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}

const buttonClearCompleted = footer.children[2].children[0];
buttonClearCompleted.addEventListener("click", () => {
	removeAllChildNodes(itemList);
	todoListData = todoListData.filter(ele => !ele.isComplete);
	for (var i = 0; i < todoListData.length; i++) {
    	itemList.appendChild(todoListData[i].node);
    }
});