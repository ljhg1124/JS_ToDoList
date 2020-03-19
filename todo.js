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
    const span = li.querySelector("span");
    if(event.target.checked){
        span.id = "list-item-done";
    } else {
        span.id = "list-item";
    }
    
}

function addToDoList(text){
    const li = document.createElement("li");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const newId = "list";

    input.type = "checkbox";
    input.addEventListener("change", listAchievement);

    span.id = "list-item";
    span.innerText = text;

    li.id = newId;
    li.appendChild(input);
    li.appendChild(span);
   

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

    // 리스트 추가
    addToDoList(val); 

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