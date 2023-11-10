//Check to see if user is on mobile
if(window.innerWidth < 750) {
    window.open('mobile', '_self')
}

const data = JSON.parse(localStorage.getItem("DeBreadOS.Data")) ?? {
    user: {
        name: '',
        pfp: '',
        firstTime: true,

        recentApps: [],
        taskbar: []
    },
    settings: {
        togglable: {
            openOutsideIframes: false,
            ignoreLoadingScreen: false,
            accurateTimers: false,
            dockTaskbar: false,
            strechWallpaper: false,
            windowTransparency: true,
            holidayEffects: true,
            windowPosLimits: true,
        },
        accentColor: '',
        backgroundImage: ''
    },
    contacts: {
        debread: {
            pfp: 'media/placeHolder/2.png',
            name: 'DeBread',
            typing: false,
            messages: [
                {
                    content: 'Welcome to DeBreadOS! This is a super cool website I made to showcase my projects. There\'s also a lot of easter eggs hidden here. Have fun!',
                    side: 0,
                },
            ],
            responses: [
                [
                    'Stfu',
                    'I\'m making Winnie Accumulator'
                ],
                [
                    'You have no idea how long it took me to make these windows work.',
                    'Just to make a window alone took 273 lines of code 💀'
                ],
                [
                    'ULTRAKILL is a really good game.',
                    'I highly recommend it.',
                    'I even put in the ULTRAKILL style menu in this website,',
                    'There\'s no way to view it, but it will be used in the future.'
                ],
                [
                    'Wowie!'
                ]
            ]
        },
        bob: {
            pfp: 'media/placeHolder/pfp.png',
            name: 'Bob',
            typing: false,
            messages: [
                {
                    content: 'Heya',
                    side: 0,
                },
            ],
            responses: [
                ['Heya']
            ]
        }
    }
}

function getData() {return data}

function save() {
    localStorage.setItem("DeBreadOS.Data", JSON.stringify(data))
    console.log(`[${new Date().toLocaleString()}] Saved!`)
} save()

function deletesave() {
    localStorage.removeItem("DeBreadOS.Data", JSON.stringify(data));
    window.location.reload();
}

function updateSetting(setting, input) {
    data.settings.togglable[setting] = input.checked
}

function updateProfilePictureDisplay() {
    doge('profilePFPDisplay').src = data.user.pfp
}

function createTimer(time, accurate) {
    let currentTime = time
    let timerActive = true
    const timer = document.createElement('div')
    timer.classList.add('timer')
    timer.innerHTML = `
    <div class="timeContainer">
        <span class="timeDisplay">${DeBread.formatTime(currentTime)}</span>
    </div>
    <div class="timerButtons">
        <div class="timerEnd">⏹</div>
        <div class="timerRestart">↺</div>
    </div>
    `

    timer.querySelector('.timerButtons').querySelector('.timerEnd').onclick = endTimer
    timer.querySelector('.timerButtons').querySelector('.timerRestart').onclick = () => {
        endTimer()
        createTimer(time)
    }

    let timerInterval
    if(!accurate) {
        timerInterval = setInterval(() => {
            if(currentTime > 0) {
                currentTime--
                timer.querySelector('.timeContainer').querySelector('.timeDisplay').innerText = DeBread.formatTime(currentTime)
            }
        }, 1000);
    } else {
        for(let i = 0; i <= time; i++) {
            setTimeout(() => {
                if(timerActive) {
                    timer.querySelector('.timeContainer').querySelector('.timeDisplay').innerText = DeBread.formatTime(currentTime)
                    currentTime--
                }
            }, i * 1000);
        }
    }


    setTimeout(() => {
        timer.style.animation = 'timerAnim 1s ease-out 5 forwards'
        setTimeout(() => {
            endTimer()
        }, 6000);
    }, (time * 1000) + 1000);

    function endTimer() {
        clearInterval(timerInterval)
        if(timerActive) {
            timerActive = false
            timer.style.opacity = 0
            timer.style.height = 0
            timer.style.marginBottom = 0
            setTimeout(() => {
                doge('timerContainer').removeChild(timer)
            }, 500);
        }
    }
    doge('timerContainer').appendChild(timer) 
}

function updateBackgroundImage() {
    if(data.settings.backgroundImage !== '') {
        doge('desktop').style.backgroundImage = `url(${data.settings.backgroundImage})`
        document.body.style.backgroundImage = `url(${data.settings.backgroundImage})`
    } else {
        doge('desktop').style.backgroundImage = 'url(media/wallpaper3.png)'
        document.body.style.backgroundImage = 'url(media/wallpaper3.png)'
    }

    if(data.settings.togglable.strechWallpaper) {
        doge('desktop').style.backgroundSize = '100vw 100vh'
        document.body.style.backgroundSize = '100vw 100vh'
    } else {
        doge('desktop').style.backgroundSize = 'cover'
        document.body.style.backgroundSize = 'cover'
    }
} updateBackgroundImage()

function createBouncingImage(image, width, speedInput, color) {
    const logo = document.createElement('img')
    if(image) {logo.src = image} else {logo.src = 'media/placeholder/2.png'}
    logo.style.position = 'absolute'
    if(width !== 'px') {logo.style.width = width} else {logo.style.width = '100px'}
    doge('desktop').appendChild(logo)

    let logoPosition = {
        x: 0,
        y: 0,

        direction: [1, 1]
    }

    let speed
    if(speedInput[0] !== '' && speedInput[1] !== '') {
        speed = speedInput
    } else {
        speed = [DeBread.randomNum(2, 10), DeBread.randomNum(2, 10)]
    }

    setInterval(() => {
        if(logoPosition.x + logo.offsetWidth >= window.innerWidth) {
            logoPosition.direction[0] = -1
            changeColor()
        }
        if(logoPosition.y + logo.offsetHeight >= window.innerHeight) {
            logoPosition.direction[1] = -1
            changeColor()
        }

        if(logoPosition.x < 0) {
            logoPosition.direction[0] = 1
            changeColor()
        }
        if(logoPosition.y < 0) {
            logoPosition.direction[1] = 1
            changeColor()
        }

        logoPosition.x += (speed[0] * logoPosition.direction[0])
        logoPosition.y += (speed[1] * logoPosition.direction[1])

        logo.style.left = logoPosition.x + 'px'
        logo.style.top = logoPosition.y + 'px'
    }, 10);

    function changeColor() {
        if(color) {
            let randomValue = DeBread.randomNum(0, 360)
            logo.style.filter = `hue-rotate(${randomValue}deg)`
        }
    }

    logo.onmousedown = () => {doge('desktop').removeChild(logo)}
}

//DESKTOP SNOW
const openingDate = new Date
if((openingDate.getMonth() === 11) || (openingDate.getMonth() === 0)) {
    setInterval(() => {
        if(data.settings.togglable.holidayEffects) {
            DeBread.createParticles(
                doge('desktop'),
                10,
                100,
                7500,
                'linear',
                [[0, window.innerWidth], [-10, -10]],
                [[[10, 10], [10, 10]], [[0, 0], [0, 0]]],
                [[0, 0], [-90, 90]],
                [[0, 0], [500, window.innerHeight]],
                [[255, 255, 255], [255, 255, 255]],
                [[255, 255, 255], [255, 255, 255]]
            )
        }
    }, 1000)
}