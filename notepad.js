function downloadFile(name) { if(name) {
        const link = document.createElement('a')
        const file = new Blob([doge('notepad').value], {type: 'text/plain'})
        link.href = URL.createObjectURL(file)
        link.download = `${name}.txt`
        link.click()
        URL.revokeObjectURL(link.href)
}}

document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0]

  if(file) {
        const reader = new FileReader()
        reader.onload = function (e) {
            const fileContents = e.target.result
            document.getElementById('notepad').value = fileContents
        }
        reader.readAsText(file)
    }
})

let viewMenuOpen = false
function toggleViewMenu() {
    if(viewMenuOpen) {
        viewMenuOpen = false
        doge('viewMenuContainer').style.pointerEvents = 'none'
        doge('viewMenuContainer').style.opacity = 0
        doge('viewMenu').style.scale = '90%'
    } else {
        viewMenuOpen = true
        doge('viewMenuContainer').style.pointerEvents = 'unset'
        doge('viewMenuContainer').style.opacity = 1
        doge('viewMenu').style.scale = '100%'
    }
}

document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape' && viewMenuOpen) {toggleViewMenu()}
})

setTimeout(() => {
    doge('textSizeInput').addEventListener('change', updateTextSize)
    doge('textSizeInput').addEventListener('mousemove', updateTextSize)

    doge('textWeightInput').addEventListener('change', updateTextWeight)
    doge('textWeightInput').addEventListener('mousemove', updateTextWeight)
}, 100);

function updateTextSize() {
    doge('notepad').style.fontSize = doge('textSizeInput').value + 'em'
    doge('textSizeDisplay').innerText = `Text size: ${doge('textSizeInput').value}em`
}

function updateTextWeight() {
    doge('notepad').style.fontWeight = doge('textWeightInput').value
    doge('textWeightDisplay').innerText = `Text weight: ${doge('textWeightInput').value}`
}