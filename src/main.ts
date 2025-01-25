"use strict";
import "./style.css";

class Timer {
    constructor(public min: number, public sec: number) {
        this.doTimer().then();
    }

    async doTimer(): Promise<void> {
        let min: number; min = this.min;
        let sec: number; sec = this.sec;
        while (min >= 0) {
            this.updateCounter(min, sec);
            await delay(1000); // 1 saniye
            sec -=1;
            if (sec === -1) {
                min -= 1;
                sec = 59;
                if (min === -1) {
                    min = 0;
                    sec = 0;
                    break;
                }
            }
        }
        this.updateCounter(min, sec);
    }

    updateCounter (min:number, sec: number): void {
        const timerElement:HTMLElement = document.getElementById("timer") as HTMLElement;
        if (timerElement) {
            if (min === 0 && sec === 0) {
                timerElement.innerText = "Süre bitti";
                document.getElementById("startButton")!.removeAttribute('disabled');
            } else if (sec < 10) {
                timerElement.innerText = `${min} : 0${sec}`;
                if (min < 10) {
                    timerElement.innerText = `0${min} : 0${sec}`;
                }
            } else if (min < 10) {
                timerElement.innerText = `0${min} : ${sec}`;
            } else {
                timerElement.innerText = `${min} : ${sec}`;
            }
        }
    }
}

function delay(delay: number): Promise<void> {
    return new Promise((resolve: (value: (PromiseLike<void> | void)) => void): number => setTimeout(resolve, delay));
}

// süreler buradan ayarlarnır.
let min: number = 24;
let sec: number = 0;


document.querySelector<HTMLDivElement>(`#app`)!.innerHTML = `
 <h1> Pomodoro App </h1>
 <p id="timer">${min} : ${sec}</p>
 <button id="startButton" > Start </button>
`;

document.getElementById("startButton")!.addEventListener("click", (): void => {
    new Timer(min, sec);

    // Çift tıklanmanın önüne geçer. Süre bitene kadar tıklanamaz.
    document.getElementById("startButton")!.setAttribute("disabled", "");
});