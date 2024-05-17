const cursor = {
    canvas: [0, 0],
    document: [0, 0],
    down: false,
}

document.addEventListener('mouseup', () => {cursor.down = false})
document.addEventListener('mousedown', () => {cursor.down = true})

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
context.strokeStyle = 'black'
canvasMeta = {
    scale: 1,
    pos: [0, 0],
    width: 250,
    height: 250,
    moving: false,
}

document.addEventListener('keydown', (ev) => {if(ev.key === ' ') {canvasMeta.moving = true}})
document.addEventListener('keyup', (ev) => {if(ev.key === ' ') {canvasMeta.moving = false}})

canvas.addEventListener('mousemove', (ev) => {
    cursor.canvas = ev.x - (canvas.getBoundingClientRect().left * canvasMeta.scale)
})
