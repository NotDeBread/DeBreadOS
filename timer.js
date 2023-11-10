function startTimer() {
    let times = []
    for(let i = 0; i < 3; i++) {
        if(parseInt(doge(`timerInput${i}`).value) > 0) {
            times[i] = parseInt(doge(`timerInput${i}`).value)
        } else {times[i] = 0}
    }

    const parsedData = JSON.parse(localStorage.getItem('DeBreadOS.Data'))
    parent.createTimer((times[0] * 3600) + (times[1] * 60) + times[2], parsedData.settings.togglable.accurateTimers)
}

function updateTimerInputs() {
    for(let i = 0; i < 3; i++) {
        doge(`timerInput${i}`).addEventListener('input', () => {
            validateNumber(doge(`timerInput${i}`))
        })
    }
}
updateTimerInputs()

function validateNumber(input)  {
    input.value = input.value.replace(/\D/g, '')
}