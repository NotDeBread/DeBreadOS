let rankscale = 100
let style = 0

let currentRank = 0

const ranks = [
    'D',
    'C',
    'B',
    'A',
    'S',
    'SS',
    'SSS',
    'U'
]

setInterval(() => {
    if(rankscale / 1.05 > 100) {
        rankscale /= 1.05
    } else {
        rankscale = 100
    }
    parent.doge('ultrakillRank').style.scale = rankscale + '%'
}, 25);

setInterval(() => {
    if(style > 100 && currentRank < 7) {
        style -= 100
        currentRank++
        rankscale = 125 + (currentRank * 2)
    } else if(style > 0) {
        style -= 0.5 + (currentRank / 10)
        if(style < 1 && style > 0) {
            style = 0
        }
    } else if(currentRank > 0) {
        currentRank--
        rankscale = 100
        style = 100
    }
    parent.doge('ultrakillStyleBarOverlay').style.width = style + '%' 
    parent.doge('ultrakillRank').src = `media/ultrakillRanks/Rank${ranks[currentRank]}.png`

    if(style === 0 && currentRank === 0) {
        parent.doge('ultrakillStyleContainer').style.display = 'none'
        // doge('ultrakillStyleLog').innerHTML = ''
    } else {
        parent.doge('ultrakillStyleContainer').style.display = 'flex'
    }
}, 25);

function getStyle(amount, log = '+ MISSING LOG NAME', logColor = 'white', chain) {
    DeBread.shake(parent.doge('ultrakillRank'), 10, amount / 10, amount / 10, 100)
    DeBread.shake(parent.doge('ultrakillStyleContainer'), 10, amount / 25, amount / 25, 100)
    DeBread.shake(parent.doge('desktop'), 10, amount / 25, amount / 25, 100)
    if(currentRank < 7 && style < 100) {
        for(let i = 0; i < amount; i++) {
            setTimeout(() => {
                style++
            }, i);
        }
    } else {
        style = 100
    }
    rankscale += amount / 5

    const span = document.createElement('span')

    if(chain) {
        span.innerHTML = `<span style="color: white;">+</span> ${log}<span style="color: white;"> x${chain}</span>`
    } else {
        span.innerHTML = `<span style="color: white;">+</span> ${log}`
    }
    span.style.color = logColor
    parent.doge('ultrakillStyleLog').appendChild(span)

    setTimeout(() => {
        parent.doge('ultrakillStyleLog').removeChild(span)
    }, 10000);
}

function loseStyle(amount) {
    DeBread.shake(parent.doge('ultrakillRank'), 10, amount / 5, amount / 5, 100)
    if(style - amount < 0) {
        style = 0
    } else {
        style -= amount
    }
}

let targetsEnded = false

function startTargets() {
    let health = 100

    let accurateHitChain = 0
    let fastHitChain = 0
    let missChain = 0

    let lastTargetHitDate = 0

    function createTarget() {
        const target = document.createElement('div')
        target.classList.add('target')

        target.innerHTML = `
            <div class="innerTarget0">
                <div class="innerTarget1">
                    <div class="innerTarget2"></div>
                </div>
            </div>
        `

        
        parent.doge('desktop').appendChild(target)
        let targetActive = true
        const targetSpawnDate = Date.now()

        target.style.left = DeBread.randomNum(100, window.innerWidth - target.offsetWidth - 500) + 'px'
        target.style.top = DeBread.randomNum(100, window.innerHeight - target.offsetHeight - 100) + 'px'

        setTimeout(() => {
            target.style.animation = 'none'
        }, 500);

        target.addEventListener('mousedown', (event) => {
            let totalStyle = 0

            let styles = []

            function addStyle(object) {
                styles.push(object)
            }

            if(targetActive) {
                missChain = 0
                if(Date.now() - lastTargetHitDate <= 500) {
                    fastHitChain++
                    addStyle({amount: 20 + fastHitChain, text: `QUICK DRAW`, color: 'rgb(0, 255, 255)', combo: fastHitChain})
                    totalStyle += (20 + fastHitChain)
                } else {
                    fastHitChain = 0
                }
                
                if(Date.now() - targetSpawnDate <= 500) {
                    addStyle({amount: 15, text: 'EARLY HIT', color: 'rgb(0, 255, 0)'})
                    totalStyle += 15
                }

                if(event.offsetX === 50 && event.offsetY === 50) {
                    accurateHitChain++
                    addStyle({amount: 200, text: `PERFECT HIT`, color: 'rgb(255, 255, 0)', combo: accurateHitChain})
                    totalStyle += 200
                } else if(event.offsetX >= 47 && event.offsetX <= 53 && event.offsetY >= 47 && event.offsetY <= 53) {
                    accurateHitChain++
                    addStyle({amount: 75, text: `SUPER ACC HIT`, color: 'rgb(0, 255, 255)', combo: accurateHitChain})
                    totalStyle += 75
                } else if(event.offsetX >= 40 && event.offsetX <= 60 && event.offsetY >= 40 && event.offsetY <= 60) {
                    accurateHitChain++
                    addStyle({amount: 30, text: `ACC HIT`, combo: accurateHitChain})
                    totalStyle += 30
                } else {
                    addStyle({amount: 10, text: 'HIT'})
                    accurateHitChain = 0
                    totalStyle += 10
                }
                
                if(accurateHitChain > 0 && !(accurateHitChain / 10).toString().includes('.')) {
                    addStyle({amount: 25 + accurateHitChain, text: `${accurateHitChain} ACC HIT CHAIN`, color: 'rgb(0, 255, 0)'})
                    totalStyle += (25 + accurateHitChain)
                }


                targetActive = false
                target.style.pointerEvents = 'none'

                lastTargetHitDate = Date.now()
                parent.doge('desktop').removeChild(target)
            }

            const styleDisplay = document.createElement('span')
            styleDisplay.innerText = totalStyle
            styleDisplay.classList.add('stylePopup')
            parent.doge('desktop').appendChild(styleDisplay)
            styleDisplay.style.left = event.pageX - styleDisplay.offsetWidth / 2 + 'px'
            styleDisplay.style.top = event.pageY - styleDisplay.offsetHeight / 2 + 'px'

            setTimeout(() => {
                parent.doge('desktop').removeChild(styleDisplay)
            }, 2000);

            console.log(styles)

            for(let i = 0; i < styles.length; i++) {
                setTimeout(() => {
                    getStyle(styles[i].amount, styles[i].text, styles[i].color, styles[i].combo)
                }, i * 50);
            }
        })

        setTimeout(() => {
            if(targetActive) {
                target.style.scale = 0
                setTimeout(() => {
                    if(targetActive) {
                        targetActive = false
                        parent.doge('desktop').removeChild(target)

                        missChain++
                        loseStyle(75 + missChain)
                        createStyleLog('-', 'MISSED', 'rgb(100, 100, 100)', missChain)
                    }
                }, 500);
            }
        }, 2500);
    }
    
    let interval = 750
    function spawnNewTarget() {

        createTarget()

        //Dynamic interval
        setTimeout(() => {
            if(!targetsEnded) {
                spawnNewTarget()
            }
        }, interval);
        if(interval > 400) {
            interval -= 10
        }
    }
    spawnNewTarget()
}

function createStyleLog(prefix, text, color, chain) {
    const span = document.createElement('div')
    if(chain) {
        span.innerHTML = `<span style="color: white">${prefix}</span> ${text} <span style="color: white">x${chain}</span>`
    } else {
        span.innerHTML = `<span style="color: white">${prefix}</span> ${text}`
    }
    span.style.color = color

    parent.doge('ultrakillStyleLog').appendChild(span)
    setTimeout(() => {
        parent.doge('ultrakillStyleLog').removeChild(span)
    }, 10000);
}