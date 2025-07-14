let winner = document.querySelector('.winner')
let currPlayer = "X"
let xMoves = []
let oMoves = []

let arr = Array(9).fill(null)
let gameOver = false

function checkWinn(runningPlayer){
    if(
        arr[0] !== null && arr[0] == arr[1] && arr[1] == arr[2] ||
        arr[3] !== null && arr[3] == arr[4] && arr[4] == arr[5] ||
        arr[6] !== null && arr[6] == arr[7] && arr[7] == arr[8] ||
        arr[0] !== null && arr[0] == arr[3] && arr[3] == arr[6] ||
        arr[1] !== null && arr[1] == arr[4] && arr[4] == arr[7] ||
        arr[2] !== null && arr[2] == arr[5] && arr[5] == arr[8] ||
        arr[0] !== null && arr[0] == arr[4] && arr[4] == arr[8] ||
        arr[2] !== null && arr[2] == arr[4] && arr[4] == arr[6]
    ){
        winner.innerText = `Winner is : ${runningPlayer}`
        gameOver = true
        alert(`Winner is : ${runningPlayer} 🥳🍾🎇`)
    }
    if(!arr.some((e) => e === null)){
        winner.textContent = `Draw !!!`
        return
    }
}

function boxClicked(ele){
    const id = Number(ele.id);
    console.log(id)

    if(arr[id] != null) return

    if(gameOver || arr[id] != null) return;
    currPlayer = currPlayer === "X" ? "O" : "X"
    let playerMoves = currPlayer === 'X' ? xMoves : oMoves

    arr[id] = currPlayer
    ele.innerText = currPlayer
    playerMoves.push(id)

    if(playerMoves.length > 3){
        let removedId = playerMoves.shift()
        arr[removedId] = null

        const removedBox = document.getElementById(removedId)
        removedBox.classList.add("fade")
        setTimeout(() => {
            removedBox.innerText = ""
            removedBox.classList.remove("fade")
            
        }, 800);

    }

    const runningPlayer = currPlayer

    if(playerMoves.length === 3){
        const isWin = checkWinn(runningPlayer)
        if (isWin) return alert(`Winner is ${runningPlayer}`)
    }

}

function resetGame(){
    arr = Array(9).fill(null)
    xMoves = []
    oMoves = []
    gameOver = false
    currPlayer = "X"
    winner.innerHTML = ""
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.innerText = "";
    });
}