
let switchPlayer = true;
let player = switchPlayer ? 1 : 2;

const cPlayer1 = "X";
const cPlayer2 = "O";
let gameEnded = false;

function checkGame() {
    const t1 = document.getElementById("c1");
    const t2 = document.getElementById("c2");
    const t3 = document.getElementById("c3");
    const t4 = document.getElementById("c4");
    const t5 = document.getElementById("c5");
    const t6 = document.getElementById("c6");
    const t7 = document.getElementById("c7");
    const t8 = document.getElementById("c8");
    const t9 = document.getElementById("c9");

    const r1 = [t1, t2, t3];
    const r2 = [t4, t5, t6];
    const r3 = [t7, t8, t9];
    const r4 = [t1, t4, t7];
    const r5 = [t2, t5, t8];
    const r6 = [t3, t6, t9];
    const r7 = [t1, t5, t9];
    const r8 = [t3, t5, t7];

    const rules = [r1, r2, r3, r4, r5, r6, r7, r8];
    for (const rule of rules) {
        const winP1 = rule.every(p => p.innerText === cPlayer1 && p !== "");
        const winP2 = rule.every(p => p.innerText === cPlayer2 && p !== "");

        if (winP1) {
            document.getElementById("player-won").innerText = `- Player ${cPlayer1} Won -`;
            document.getElementById("next-player").innerText = "";
            for (const r of rule) {
                r.style.color = "green";
            }
            document.getElementById("player-won").style.color = "green";
            gameEnded = true;
            return;
        } else if (winP2) {     
            document.getElementById("player-won").innerText = `- Player ${cPlayer2} Won -`;
            document.getElementById("next-player").innerText = "";
            for (const r of rule) {
                r.style.color = "blue";
            }
            document.getElementById("player-won").style.color = "blue";
            gameEnded = true;
            return;
        }
    }

    const isDraw = checkIfDraw([t1,t2,t3,t4,t5,t6,t7,t8,t9]);
    if (isDraw) {
        document.getElementById("player-won").innerText = `- Draw -`;
        document.getElementById("next-player").innerText = "";
    }
}

function checkIfDraw(elements) {
    return elements.map(f => f.innerText)
                    .every(f => f !== "");
}

function showNextPlayer(player) {
    document.getElementById("next-player").innerText = `Next player is: ${player}`;
}

function switchPlayers() {
    switchPlayer = !switchPlayer;
    player = switchPlayer ? 1 : 2; // 1 or 2
    player === 1 ? showNextPlayer(cPlayer1) : showNextPlayer(cPlayer2);
}

function restart(){
    gameEnded = false;
    const nElement = document.getElementsByClassName("n");
    for (const el of nElement) {
        el.innerText = "";
        el.style.color = "black";

    }

    document.getElementById("player-won").innerText = "";
    document.getElementById("player-won").style.color = "black";

    switchPlayers();
}

function initialize() {
    showNextPlayer(cPlayer1);

    const nElement = document.getElementsByClassName("n");
    for (const el of nElement) {
        el.addEventListener("click",(event) => {
            if (gameEnded) {
                return;
            }

            const id = event.target.id;
            const el = document.getElementById(id);
            if (el.textContent === "") {
                if (player === 1) {
                    el.innerText = cPlayer1;
                } else {
                    el.innerText = cPlayer2;
                }
                if (player === 1) {
                    showNextPlayer(cPlayer2) 
                    player = 2;
                } else {
                    showNextPlayer(cPlayer1)
                    player = 1;
                }
            }
    
            checkGame();
        });    
    }    
}

document.getElementById("restart").addEventListener("click", () => {
    restart();
});

initialize();