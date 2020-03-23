
const clockContainer = document.querySelector(".time");
const hours = clockContainer.querySelector(".hour");
const minutes = clockContainer.querySelector(".minute");
const seconds = clockContainer.querySelector(".second");
const ampm = clockContainer.querySelector(".ampm");

function createZero(val)
{
    return val < 10 ? `0${val}`: val;
}

// 24시간 표기
function getTime(){
    const date = new Date();

    hours.innerText = `${createZero(date.getHours())}`;
    minutes.innerText = `${createZero(date.getMinutes())}`;
    seconds.innerText = `${createZero(date.getSeconds())}`;
}

// 12시간 am pm 표기
function getTimeAmPm(){
    const date = new Date();

    hours.innerText = `${createZero(date.getHours() % 12)}`;
    minutes.innerText = `${createZero(date.getMinutes())}`;
    seconds.innerText = `${createZero(date.getSeconds())}`;

    if(date.getHours() < 12){
        ampm.innerText = "AM"
    } else {
        ampm.innerText = "PM"
    }
}

(function init(){
    getTimeAmPm();
    setInterval(getTimeAmPm, 1000);
})()

