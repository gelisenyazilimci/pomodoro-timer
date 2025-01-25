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
            } else if (sec < 10) {
                timerElement.innerText = `${min} : 0${sec}`;
            } else {
                timerElement.innerText = `${min} : ${sec}`;
            }
        }
    }
}

function delay(delay: number): Promise<void> {
    return new Promise((resolve: (value: (PromiseLike<void> | void)) => void): number => setTimeout(resolve, delay));
}

let timer: Timer = new Timer(25, 0o0);

document.querySelector<HTMLDivElement>(`#app`)!.innerHTML = `
 <h1> Pomodoro App </h1>
 <p id="timer">${timer.min} : ${timer.sec}</p>
 <button id="startButton"> Start </button>
`;

document.getElementById("startButton")!.addEventListener("click", (): void => {
    // Çift tıklanmanın önüne geçer. Süre bittiği zaman tıklanabilir halle getirir
    document.getElementById("startButton")!.setAttribute("disabled", "true");
    if (timer.min === 0 && timer.sec === 0) document.getElementById("startButton")!.setAttribute("disabled", "false");
});