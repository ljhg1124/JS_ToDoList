
const clockContainer = document.querySelector(".js_clock");
const clock = clockContainer.querySelector("h1");

function createZero(val)
{
    return val < 10 ? `0${val}`: val;
}

(function init(){

    setInterval((function getTime(){
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        clock.innerText = `${createZero(hours)}:${createZero(minutes)}:${createZero(seconds)}`
    }), 1000);
})()

