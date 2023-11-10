let selectedColor = 'rgb(0, 0, 0)'
let selectedBrush = 0
let brushSize = 25

let drawing = false
const canvas = doge('canvas')
const brush = doge('brush')

let cursor = {
    pos: [0, 0]
}

function updateBrush() {
    brush.style.left = cursor.pos[0] - brush.offsetWidth / 2 + 'px'
    brush.style.top = cursor.pos[1] - brush.offsetHeight / 2 + 'px'

    brush.style.width = brushSize + 'px'

    if(selectedBrush === 1) {
        brush.style.borderRadius = '50%'
    } else {
        brush.style.borderRadius = '0'
    }
}

canvas.addEventListener('mousedown', (e) => {
    drawing = true
    createPoint([e.clientX, e.clientY])
})

canvas.addEventListener('mouseup', () => {
    drawing = false
})

canvas.addEventListener('mousemove', (e) => {
    if(drawing) {
        createPoint([e.clientX, e.clientY])
    }
    cursor.pos[0] = e.clientX
    cursor.pos[1] = e.clientY
    updateBrush()
})

function createPoint(pos) {
    const point = document.createElement('div')
    point.classList.add('point')
    point.style.width = brushSize + 'px'
    point.style.backgroundColor = selectedColor

    point.style.left = pos[0] - (brushSize / 2) + 'px'
    point.style.top = pos[1] - 25 - (brushSize / 2) + 'px'

    if(selectedBrush === 1) {
        point.style.borderRadius = '50%'
    }

    canvas.appendChild(point)
}

function clearCanvas() {
    canvas.innerHTML = ''
}

document.body.addEventListener('wheel', checkScrollDirection);
function checkScrollDirectionIsUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}
function checkScrollDirection(event) {
    updateBrush()
    if (checkScrollDirectionIsUp(event)) {
        brushSize *= 1.1
    } else {
        if(brushSize > 0) {
            brushSize /= 1.1
        }
    }
}

doge('colorInput').addEventListener('change', () => {
    selectedColor = doge('colorInput').value
})

function changeBrush() {
    if(selectedBrush === 0) {
        selectedBrush = 1
        doge('brushDisplay').style.borderRadius = '50%'
    } else if(selectedBrush === 1) {
        selectedBrush = 0
        doge('brushDisplay').style.borderRadius = '0'
    }
}