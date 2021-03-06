// html에 있는 데이터를 이용할 수 있게 연결 해주는 구간.
const todoForm = document.querySelector(".toDoFrom");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".toDoList");

const TODOS_LS = "toDos"; // key 값이 될 이름
let toDos = []; // 데이터가 저장될 곳 값이 추가 제거 이벤트가 일어나는 곳으로 let으로 선언

function saveTodo()
{
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function listAchievement(event){
    const checkbox = event.target;
    const li = checkbox.parentNode;
    const textInput = li.querySelector(".input");
    if(event.target.checked){
        textInput.id = "list-item-done";
    } else {
        textInput.id = "list-item";
    }
}

function deleteList(event){
    const checkbox = event.target;
    const li = checkbox.parentNode;
    
    // 자식 태그 삭제. 저장된 데이터가 삭제 되진 않음.
    todoList.removeChild(li);


    // filtr 메소드를 이용해 필요한 데이터를 걸러낸다.
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos;

    saveTodo();
}

function updateList(event){
    event.preventDefault();
    const input = event.target.querySelector("input");
    const idval = event.target.offsetParent.id - 1;

    toDos[idval].text = input.value;
    saveTodo();
}

function addToDoList(text){
    const li = document.createElement("li");
    const input = document.createElement("input");
    const bt = document.createElement("button");
    const textInput = document.createElement("input");
    const form = document.createElement("form");
    const newId = toDos.length + 1;

    input.type = "checkbox";
    input.addEventListener("change", listAchievement);

    bt.id = "list-delete";
    bt.innerText = "X";
    bt.addEventListener("click",deleteList);

    textInput.id = "list-item";
    textInput.type = "text";
    textInput.className = "input";
    textInput.value = text;
    
    form.id = "list-form";
    form.appendChild(textInput);
    form.addEventListener("submit", updateList);

    li.id = newId;
    li.className = "list";
    li.appendChild(input);
    li.appendChild(form);
    li.appendChild(bt);
   
    todoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    }

    toDos.push(toDoObj);
    saveTodo();
}

function handleSubmit(event){
    event.preventDefault(); // 서밋시 발생하는 페이지 이동 이벤트 기능을 막아준다.
    const val = todoInput.value;

    //리스트 추가
    if(val)
    {
        addToDoList(val); 
    }

    todoInput.value = ""; // 데이터 출력 후 초기화 하는 부분.
}

function toDoList_Load(){
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            addToDoList(toDo.text);
        });
    }
}

(function init(){
    toDoList_Load();
    todoForm.addEventListener("submit",handleSubmit);
})()