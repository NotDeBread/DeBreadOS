const stuff = [
    {
        name: 'Winnie Accumulator',
        desc: 'Eddie Accumulator, but better.',
        url: 'https://debread.space/WinnieAccumulator/',
        appendTo: 'Fun',
    },
    {
        name: 'Eddie Accumulator',
        desc: 'Cookie Clicker, but better.',
        url: 'https://debread.space/Eddie-Accumulator/',
        appendTo: 'Fun',      
    },
    {
        name: 'Press The Button',
        desc: 'Carpal Tunnel simulator.',
        url: 'https://debread.space/PressTheButton/',
        appendTo: 'Fun',
    },
    {
        name: 'Not JSAB',
        desc: 'It\'s not JSAB.',
        url: 'https://debread.space/NotJSAB/',
        appendTo: 'Fun',
    },
    {
        name: 'Math Game',
        desc: 'A math game for my freshman algebra final.',
        url: 'https://debread.space/MathGame/',
        appendTo: 'Fun',
    },
    {
        name: 'Random Sentence Generator',
        desc: 'Generate random sentences!',
        url: 'https://debread.space/RandomSentenceGenerator/',
        appendTo: 'Fun',
    },


    {
        name: 'Big Number',
        desc: 'Format big numbers.',
        url: 'https://debread.space/BigNumber/',
        appendTo: 'Tools',
    },
    {
        name: 'Pixel Generator',
        desc: 'Generate random grids of pixels.',
        url: 'https://debread.space/BigNumber/',
        appendTo: 'Tools',
    },


    {
        name: 'YouTube Channel',
        desc: 'Check out my "awesome" videos!',
        url: 'https://youtube.com/notdebread',
        appendTo: 'Socials',
    },
    {
        name: 'Twitch Channel',
        desc: 'Don\'t expect me to stream soon!',
        url: 'https://twitch.tv/notdebread',
        appendTo: 'Socials',
    },
    {
        name: 'Twitter Profile',
        desc: 'Don\'t.',
        url: 'https://twitter.com/notdebread',
        appendTo: 'Socials',
    },
    {
        name: 'Discord Server',
        desc: 'Check out my super cool server!',
        url: 'https://discord.gg/8ZZW4y7Bh5',
        appendTo: 'Socials',
    },
    {
        name: 'GitHub Profile',
        desc: 'See all of my projects in depth.',
        url: 'https://github.com/notdebread',
        appendTo: 'Socials',
    },
]

for(const thing in stuff) {
    const thingy = document.createElement('div')
    thingy.classList.add('project')
    thingy.innerHTML = `                
    <div class="projectText">
        <span>${stuff[thing].name}</span>
        <em>${stuff[thing].desc}</em>
    </div>`
    thingy.onclick = () => {window.open(stuff[thing].url)}

    document.getElementById(`box${stuff[thing].appendTo}`).appendChild(thingy)
}

setInterval(() => {
    if(window.innerWidth > 750) {
        document.getElementById('banner').style.bottom = 0
        document.getElementById('banner').onclick = () => {window.open('/', '_self')}
    } else {
        document.getElementById('banner').style.bottom = '-100px'
    }
}, 1000)