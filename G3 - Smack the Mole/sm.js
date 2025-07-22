let scoreBoard = document.querySelector('.score')
let gameTimer = document.querySelector('.timer')
let startBtn = document.querySelector('.startbtn')
let endBtn = document.querySelector('.endbtn')


let score = 0
let timer
let countdown

function showMole(){
    let  random = Math.floor(Math.random() * 10)
    let randomHole = document.querySelector(`[id="${random}"]`)
    // console.log(randomHole)
    
    randomHole.classList.add('moleAnimation')
    randomHole.addEventListener('click' , handleClick)

    setTimeout(()=>{
        randomHole.classList.remove('moleAnimation')
        randomHole.removeEventListener('click' , handleClick)
    }, 3000)

}

function handleClick(){
    score++
    scoreBoard.textContent = `Score : ${score}`
    this.classList.remove('moleAnimation')

    this.classList.add('glitter');
    setTimeout(() => {
        this.classList.remove('glitter');
    }, 300);
}

function startGame(){
    score = 0
    timer = 30
    scoreBoard.textContent = `Score : ${score}`
    gameTimer.textContent = `Timer : ${timer}`

    startBtn.disabled = true
    endBtn.disabled = false

    countdown = setInterval(()=>{
        timer--
        gameTimer.textContent = `Timer : ${timer}`
        
        if(timer <= 0 ){
            clearInterval(countdown)
            startBtn.disabled = false
            endBtn.disabled = true
            alert(`
            🎯 Score : ${score}
            ⏱️ Timer : ${timer}
            `)
        }
    } , 1000)

    let moleInterval = setInterval(()=>{
        showMole()
        if(timer <= 0){
            clearInterval(moleInterval)
        }
    } , 1000)
    
    endBtn.addEventListener('click' , ()=>{
        clearInterval(moleInterval)
        clearInterval(countdown)
        startBtn.disabled = false
        endBtn.disabled = true
        alert(`
            🎯 Score : ${score}
            ⏱️ Timer : ${timer}
            `)
            score = 0
            timer = 30
    })
}
