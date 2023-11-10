const apps = {
    winnieAccumulator: {
        name: 'Winnie Accumulator',
        open: 'https://debread.space/WinnieAccumulator',
        size: [1200, 700],
        color: 'rgb(25, 25, 25)',
        canOpen: true
    },
    eddieAccumulator: {
        name: 'Eddie Accumulator',
        open: 'https://debread.space/Eddie-Accumulator',
        size: [1200, 700],
        color: 'rgb(24, 22, 36)',
        canOpen: true
    },
    pressTheButton: {
        name: 'Press The Button',
        open: 'https://debread.space/PressTheButton/',
        size: [1200, 700],
        color: 'rgb(20, 20, 20)',
        canOpen: true
    },
    notJSAB: {
        name: 'Not JSAB',
        open: 'https://debread.space/NotJSAB/',
        size: [1200, 700],
        color: 'rgb(20, 20, 20)',
        canOpen: true
    },
    mathGame: {
        name: 'Math Game',
        open: 'https://debread.space/MathGame/',
        size: [1200, 700],
        color: 'rgb(20, 20, 20)',
        canOpen: true
    },
    randomSentenceGenerator: {
        name: 'Random Sentence Generator',
        open: 'https://debread.space/RandomSentenceGenerator/',
        size: [400, 600],
        color: 'rgb(20, 20, 20)',
        canOpen: true
    },
    bigNumber: {
        name: 'Big Number',
        open: 'https://debread.space/BigNumber/',
        size: [500, 600],
        color: 'rgb(20, 20, 20)',
        canOpen: true
    },
    pixelGenerator: {
        name: 'Pixel Generator',
        open: 'https://debread.space/PixelGenerator/',
        size: [1200, 700],
        color: 'rgb(20, 20, 20)',
        canOpen: true
    },
    // debreadjs: {
    //     name: 'DeBread.js',
    //     open: '<span style="color: white;">This project is not available yet!</span>',
    //     size: [0, 0],
    //     color: 'rgb(20, 20, 20)'
    // },
    // notWordle: {
    //     name: 'Not Wordle',
    //     open: '<iframe src="notWordle.html">',
    //     size: [300, 500],
    //     color: 'rgb(20, 20, 20)'
    // },
    settings: {
        name: 'Settings',
        open: '<iframe src="settings.html">',
        size: [750, 500],
        color: 'rgb(20, 20, 20)',
    },
    timer: {
        name: 'Timer',
        open: '<iframe src="timer.html">',
        size: [0, 0],
        color: 'rgb(20, 20, 20)'
    },
    messages: {
        name: 'Messages',
        open: '<iframe src="messages.html">',
        size: [1000, 750],
        color: 'rgb(20, 20, 20)'
    },
    notepad: {
        name: 'Notepad',
        open: '<iframe src="notepad.html">',
        size: [1000, 750],
        color: 'rgb(20, 20, 20)'
    },
    // debreadBrowser: {
    //     name: 'DeBread Browser',
    //     open: '<iframe src="browser.html">',
    //     size: [1000, 750],
    //     color: 'rgb(20, 20, 20)'
    // },
    // targetTraining: {
    //     name: 'Target Training',
    //     open: '<iframe src="target.html">',
    //     size: [0, 0],
    //     color: 'rgb(20, 20, 20)',
    // },
    toys: {
        name: 'Toys',
        open: '<iframe src="toys.html">',
        size: [750, 500],
        color: 'rgb(20, 20, 20)',
    },
    sketchPad: {
        name: 'Sketchpad',
        open: '<iframe src="sketchpad.html">',
        size: [750, 500],
        color: 'rgb(20, 20, 20)'
    },
    youtubeChannel: {
        name: 'YouTube Channel ↗',
        open: () => {window.open('https://youtube.com/notdebread', '_blank')},
        size: [1200, 700],
        color: 'rgb(20, 20, 20)'
    },
    twitchChannel: {
        name: 'Twitch Channel ↗',
        open: () => {window.open('https://twitch.tv/notdebread', '_blank')},
        size: [1200, 700],
        color: 'rgb(20, 20, 20)'
    },
    twitterProfile: {
        name: 'Twitter Profile ↗',
        open: () => {window.open('https://twitter.com/notdebread', '_blank')},
        size: [1200, 700],
        color: 'rgb(20, 20, 20)'
    },
    discordServer: {
        name: 'Discord Server ↗',
        open: () => {window.open('https://discord.gg/53WtGpRxfQ', '_blank')},
        size: [1200, 700],
        color: 'rgb(20, 20, 20)'
    },
    githubProfile: {
        name: 'GitHub Profile ↗',
        open: () => {window.open('https://github.com/notdebread', '_blank')},
        size: [1200, 700],
        color: 'rgb(20, 20, 20)'
    },
}

doge('searchBar').addEventListener('input', updateAutocomplete)

function updateAutocomplete() {
    let visibleApps = 0
    doge('searchBarAutocompleteContainer').innerHTML = ''
    for(const app in apps) {
        createAutocompleteButton(app)
    }
    // if(doge('searchBar').value.length > 0 || (doge('searchBar').value.length > -1 && data.user.recentApps.length < 10)) {
    //     //...
    // } else {
    //     for(const app in data.user.recentApps) {
    //         createAutocompleteButton(data.user.recentApps[app])
    //     }
    // }

    function createAutocompleteButton(app) {
        if(apps[app].name.toLowerCase().includes(doge('searchBar').value.toLowerCase())) {
            const div = document.createElement('div')
            div.classList.add('searchBarAutocomplete')
            div.setAttribute('title', `Open ${apps[app].name}...`)
            div.setAttribute('data-app', app)

            for(let i = 0; i < apps[app].name.length; i++) {
                const span = document.createElement('span')
                span.innerText = apps[app].name[i]

                if(doge('searchBar').value.toLowerCase().includes(apps[app].name[i].toLowerCase())) {
                    span.style.fontWeight = '700'
                } else {
                    span.style.fontWeight = '500'
                    span.style.color = 'rgb(200, 200, 200)'
                }
                div.appendChild(span)
            }

            div.onclick = openApp

            function openApp() {
                if(typeof apps[app].open === 'string') {
                    createWindow(apps[app].name, apps[app].size[0], apps[app].size[1], apps[app].open, apps[app].color, app, apps[app].canOpen)
                } else {
                    apps[app].open()
                }

                if(!data.user.recentApps.includes(app)) {
                    data.user.recentApps.push(app)
                }
                if(data.user.recentApps.length > 10) {
                    data.user.recentApps = data.user.recentApps.slice(1)
                }
                toggleSearchMenu()
            }

            div.onmouseenter = () => {
                doge('searchBar').setAttribute('placeholder', apps[app].name)
            }

            div.onmouseleave = () => {
                doge('searchBar').setAttribute('placeholder', apps[doge('searchBarAutocompleteContainer').lastChild.getAttribute('data-app')].name)
            }

            doge('searchBarAutocompleteContainer').appendChild(div)
            visibleApps++
        }
    }
    
    if(doge('searchBarAutocompleteContainer').lastChild) {
        doge('searchBarAutocompleteContainer').lastChild.style.fontWeight = '900'
        doge('searchBar').setAttribute('placeholder', apps[doge('searchBarAutocompleteContainer').lastChild.getAttribute('data-app')].name)
    }
        
    doge('searchBarAutocompleteContainer').style.height = 35 * visibleApps + 'px'
}

doge('searchBar').addEventListener('keydown', (event) => {
    if(event.shiftKey && event.key === 'Enter') {
        for(const app in apps) {
            if(typeof apps[app].open === 'string') {
                createWindow(apps[app].name, apps[app].size[0], apps[app].size[1], apps[app].open, apps[app].color, app, apps[app].canOpen)
            } else {
                apps[app].open()
            }
        }
        toggleSearchMenu()
    } else if(event.key === 'Enter') {
        openApp(doge('searchBarAutocompleteContainer').lastChild.getAttribute('data-app'))
        toggleSearchMenu()
        // console.log(doge('searchBarAutocompleteContainer').lastChild.getAttribute('data-app'))
    }
})