const RANDOM_TEXT_API = 'http://api.quotable.io/random'

const textDisplayElement = document.getElementById('text')
const textInputElement = document.getElementById('textInput')
const timerElement = document.getElementById('timer')


textInputElement.addEventListener('input', () => {
    const arrayText = textDisplayElement.querySelectorAll('span')
    const arrayValue = textInputElement.value.split('')

    let correct = true

    arrayText.forEach((charSpan, index) => {
        const char = arrayValue[index]
        if (char == null) {
            charSpan.classList.remove('correct')
            charSpan.classList.remove('incorrect')
            correct = false
        } else if (char === charSpan.innerText) {
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
        } else {
            charSpan.classList.remove('correct')
            charSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct) {
        getNextText()
    }
})

function getRandomText() {
    return fetch(RANDOM_TEXT_API)
        .then(response => response.json())
        .then(data => data.content)
}


async function getNextText() {
    const text = await getRandomText()
    textDisplayElement.innerHTML = ''
    text.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        textDisplayElement.appendChild(charSpan)
    })
    textInputElement.value = null
    
    startTimer()


}



let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText =  getTimerTime();
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

getNextText()