
const clockContainer = document.querySelector(".time");
const hours = clockContainer.querySelector(".hour");
const minutes = clockContainer.querySelector(".minute");
const seconds = clockContainer.querySelector(".second");

function createZero(val)
{
    return val < 10 ? `0${val}`: val;
}

function getTime(){
    const date = new Date();

    hours.innerText = `${createZero(date.getHours())}`;
    minutes.innerText = `${createZero(date.getMinutes())}`;
    seconds.innerText = `${createZero(date.getSeconds())}`;
}

(function init(){
    getTime();
    setInterval(getTime, 1000);
})()

