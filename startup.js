if(!data.user.firstTime) {doge('startupScreen').style.display = 'none'}

const startupScreen = doge('startupScreen')
const startupText = doge('startupText')
const startupInput = doge('startupInput')
const startupError = doge('startupError')
const startupImg = doge('startupImg')

let inputProgress = 0

function startupSequence() {
    inputProgress = 0
    startupInput.value = ''
    startupScreen.style.display = 'flex'
    startupScreen.style.opacity = 1
    
    startupInput.style.fontWeight = 500
    startupInput.style.pointerEvents = 'unset'
    startupInput.style.pointerEvents = 'unset'

    setTimeout(() => {        
        startupText.style.opacity = 1
        
        setTimeout(() => {
            changeStartupText('What\'s your name?')
            
            setTimeout(() => {
                startupScreen.style.gap = '10px'

                startupInput.setAttribute('placeholder', 'Name...')
                startupInput.value = data.user.name
                startupInput.style.opacity = 1
                startupInput.style.height = '25px'
                startupInput.style.padding = '5px'
            }, 1500);
        }, 2500);
    }, 1000);
}

startupInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        if(inputProgress === 0) {
            if(startupInput.value.length > 0) {
                if(startupInput.value.length <= 25) {
                    startupError.innerText = ''
                    
                    startupInput.blur()
                    startupInput.style.pointerEvents = 'none'
                    startupInput.style.fontWeight = 700
                    startupInput.classList.add('startupInputAnim')

                    data.user.name = startupInput.value

                    setTimeout(() => {
                        startupInput.classList.remove('startupInputAnim')
                    }, 500);

                    setTimeout(() => {
                        startupScreen.style.gap = 0

                        startupInput.style.opacity = 0
                        startupInput.style.height = 0
                        startupInput.style.padding = 0

                        changeStartupText('Set a profile picture')

                        setTimeout(() => {
                            startupScreen.style.gap = '10px'

                            startupInput.value = ''
                            startupInput.style.pointerEvents = 'unset'
                            startupInput.setAttribute('placeholder', 'Image/GIF URL')
                            startupInput.style.opacity = 1
                            startupInput.style.height = '25px'
                            startupInput.style.padding = '5px'
                            startupInput.style.fontWeight = '500'
                            startupInput.style.width = '500px'
                            startupInput.value = data.user.pfp

                            inputProgress = 1

                            startupImg.style.height = '100px'
                            setTimeout(() => {
                                startupImg.style.opacity = 1
                                startupImg.src = data.user.pfp
                            }, 250);
                        }, 1000);
                    }, 2500);
                } else {
                    startupError.innerText = 'Name too long!'
                    DeBread.shake(startupInput, 10, 5, 0, 100)
                    DeBread.shake(startupError, 10, 5, 0, 100)
                }
            } else{
                startupError.innerText = 'Name required!'
                DeBread.shake(startupInput, 10, 5, 0, 100)
                DeBread.shake(startupError, 10, 5, 0, 100)
            }
        }
        if(inputProgress === 1) {
            startupError.innerText = ''
            
            startupInput.blur()
            startupInput.style.pointerEvents = 'none'
            startupInput.style.fontWeight = 700
            startupImg.classList.add('startupInputAnim')
            
            if(startupInput.value === '') {
                data.user.pfp = 'media/placeholder/pfp.png'
            } else {
                data.user.pfp = startupInput.value
            }
            inputProgress = 1
            
            setTimeout(() => {
                startupImg.classList.remove('startupInputAnim')
            }, 500);
            

            setTimeout(() => {
                startupImg.style.opacity = 0                
            }, 2250);

            setTimeout(() => {
                startupScreen.style.gap = 0
                
                startupInput.style.opacity = 0
                startupInput.style.height = 0
                startupInput.style.padding = 0

                startupImg.style.height = 0
                
                setTimeout(() => {
                    startupInput.value = ''
                    startupInput.style.width = 'unset'

                    changeStartupText('Ok, you\'re done now :D')
                    save()
                    setTimeout(() => {
                        startupScreen.style.opacity = 0
                        setTimeout(() => {
                            startupScreen.style.display = 'none'
                            changeStartupText('Let\'s get things ready for you.')
                            createNoti('media/apps/messages.png', 'media/placeHolder/2.png', 'Messages', 'DeBread', 'Welcome to DeBreadOS! This is a super cool website I made to showcase my projects. There\'s also a lot of easter eggs hidden here. Have fun!', () => {createWindow(apps.messages.name, apps.messages.size[0], apps.messages.size[1], apps.messages.open, apps.messages.color)})
                        }, 1000);
                    }, 2500);
                }, 250);
            }, 2500);
        }
    }
    setTimeout(() => {
        doge('startupImg').src = startupInput.value
    }, 250);
})

function changeStartupText(text) {
    startupText.style.opacity = 0
    setTimeout(() => {
        startupText.innerText = text
        startupText.style.opacity = 1
    }, 500);
}