let firstTimeLoading = data.user.firstTime
let loadingBarLength = 0
let loaded = false

if(data.settings.togglable.ignoreLoadingScreen) {
	loaded = true
	loadingBarLength = 20
	doge('loadingScreenBar').innerText = formatLoadingBar()
	doge('loadingScreenText').innerText = 'WELCOME BACK'
	removeLoadingScreen()
} else if(firstTimeLoading) {
    for(let i = 0; i < 20; i++) {
        setTimeout(() => {
           loadingBarLength++
           doge('loadingScreenBar').innerText = formatLoadingBar()
        	if(loadingBarLength === 20) {
        		loaded = true
               	doge('loadingScreenText').innerText = 'WELCOME'
				doge('loadingScreenSplash').innerText = 'DEBREAD_OS INSTALLED'
				data.user.firstTime = false
				save()
			   	setTimeout(() => {
					removeLoadingScreen()
			   	}, 1000);
           }
        }, DeBread.randomNum(500, 1000) * i);
    }
} else {
    for(let i = 0; i < 20; i++) {
        setTimeout(() => {
           	loadingBarLength++
           	doge('loadingScreenBar').innerText = formatLoadingBar()
			   if(loadingBarLength === 20) {
				loaded = true
				doge('loadingScreenText').innerText = 'WELCOME BACK'
				setTimeout(() => {
					removeLoadingScreen()
				}, 1000);
			}
        }, DeBread.randomNum(0, 150) * i);
    }
}

function formatLoadingBar() {
    if(loadingBarLength !== 20) {
        let output = '['
        for(let i = 0; i < loadingBarLength; i++) {
            output += '#'
        }
        return output.padEnd(21, '-') + ']'
    } else {
        return '[####################]'
    }
}

let loadingScreenText
if(!firstTimeLoading) {
	loadingScreenText = 'LOADING'
} else {
	loadingScreenText = 'DOWNLOADING'
}
setInterval(() => {
    if(!loaded) {
		if(!firstTimeLoading) {
			if(loadingScreenText.length < 10) {
				loadingScreenText += '.'
			} else {
				loadingScreenText = 'LOADING'
			}
		} else {
			if(loadingScreenText.length < 14) {
				loadingScreenText += '.'
			} else {
				loadingScreenText = 'DOWNLOADING'
			}
		}
        doge('loadingScreenText').innerText = loadingScreenText
    }
}, 500);

let longSplashes = [
	'Cleaning up PC...',
	'Throwing important files away...',
	'Petting Winnie...',
	'Downloading malware...',
	'Preparing Winnie Accumulator...',
	'Pressing the button...',
	'Formatting numbers...',
	'Dodging Blocks...',
	'Fixing bugs...'
]

if(firstTimeLoading) {
	for(let i = 0; i < 10; i++) {
		setTimeout(() => {
			if(!loaded) {
				doge('loadingScreenSplash').innerText = longSplashes[i]
			}
		}, (DeBread.randomNum(2000, 2500) * i));
	}
}

function removeLoadingScreen() {
	doge('loadingScreen').style.opacity = 0
	setTimeout(() => {
		doge('loadingScreen').style.display = 'none'
		if(firstTimeLoading) {
			setTimeout(() => {
				startupSequence()
			}, 1000);
		}
	}, 1000);
}