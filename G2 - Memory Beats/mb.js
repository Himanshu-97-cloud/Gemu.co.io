let color = ['red' , 'yellow'  ,'green' , 'blue']

let gamePattern = []
let playerPattern = []

function gamePatternSequence(){
    let randomNum = Math.floor(Math.random() * color.length)
    let randomColor = color[randomNum]
    // console.log(randomColor)

    gamePattern.push(randomColor)
    // console.log(gamePattern)

    let i=0
    const interval = setInterval(()=> {
        const nextColor = gamePattern[i]
        const colorElement = document.querySelector(`[data-color="${nextColor}"]`)
        // console.log(colorElement)
        playSound(nextColor)
        animateBox(colorElement)
        i++

        if(i >= gamePattern.length){
            clearInterval(interval)
        }

    } , 600)

}

function boxClicked(element){
    // console.log(element)

    let ele = element.getAttribute('data-color')
    // console.log(ele)

    playerPattern.push(ele)
    // console.log(playerPattern)
    playSound(ele)

    let selectColor = document.querySelector(`[data-color="${ele}"]`)
    animateBox(selectColor)

    checkWinn(playerPattern.length - 1) 
}

const result = document.querySelector('.scoreCard')
const gameOverWindow = document.querySelector('.gameOver-window')
const windowText = document.querySelector('.windowText')
const gameOverText = document.querySelector('.gameOverText')

function checkWinn(currStep){
    if(playerPattern[currStep] === gamePattern[currStep]){
        if(playerPattern.length === gamePattern.length){
            
            setTimeout(() =>{
                playerPattern = []
                gamePatternSequence()
            } , 1000)

            result.innerHTML = `Score : ${playerPattern.length}`
            gameOverText.innerHTML = `Score : ${playerPattern.length}`
        }
    } else {
        gameOverWindow.style.display = 'block'
        // console.log("Game over !!!")
        restartGame()
    }
}


function showDisplay(){
    gameOverWindow.addEventListener('click' , (ele)=>{
            if(!windowText.contains(ele.target)){
                gameOverWindow.style.display = 'none'
            }
        })
}

function startGame(){
    gamePattern = []
    gamePatternSequence()
}
function restartGame(){
    gamePattern = []
    playerPattern = []
}

function playSound(ele){
    if(isMuted) return

    let audio = new Audio(`./Sounds/${ele}.mp3`)
    audio.play()
}

function animateBox(boxEle){
    if(!boxEle) return

    boxEle.classList.add("clickedAnimation")
    setTimeout(()=>{
        boxEle.classList.remove("clickedAnimation")
    } , 250)

}

let isMuted = false

function sound(){
    isMuted = !isMuted

    const img = document.querySelector('.img')
    img.src = isMuted ? './images/mute.png' : './images/unmute.png'
}
