let previews = {
    bouncingImage: {
        speed: [10, 10],
        pos: [0, 0],
        direction: [1, 1]
    }
}

const bouncingImagePreview = doge('bouncingImagePreview')
setInterval(() => {
    //IMAGE SRC
    if(doge('bouncingImageInput').value !== '') {
        bouncingImagePreview.src = doge('bouncingImageInput').value
    } else {
        bouncingImagePreview.src = 'media/placeholder/2.png'
    }

    //WIDTH
    if(doge('bouncingImageWidthInput').value !== '') {
        bouncingImagePreview.style.width = doge('bouncingImageWidthInput').value + 'px'
    } else {
        bouncingImagePreview.style.width = '75px'
    }

    //X SPEED
    if(doge('bouncingImageSpeed0Input').value !== '') {
        previews.bouncingImage.speed[0] = doge('bouncingImageSpeed0Input').value
    } else {
        previews.bouncingImage.speed[0] = 2
    }

    //Y SPEED
    if(doge('bouncingImageSpeed1Input').value !== '') {
        previews.bouncingImage.speed[1] = doge('bouncingImageSpeed1Input').value
    } else {
        previews.bouncingImage.speed[1] = 2
    }

    //MOVING
    previews.bouncingImage.pos[0] += (previews.bouncingImage.speed[0] * previews.bouncingImage.direction[0])
    previews.bouncingImage.pos[1] += (previews.bouncingImage.speed[1] * previews.bouncingImage.direction[1])

    bouncingImagePreview.style.left = previews.bouncingImage.pos[0] + 'px'
    bouncingImagePreview.style.top = previews.bouncingImage.pos[1] + 'px'

    //BOUNCING
    if(previews.bouncingImage.pos[0] + bouncingImagePreview.offsetWidth >= doge('bouncingImagePreviewContainer').offsetWidth) {
        previews.bouncingImage.direction[0] = -1
        changeColor()
    }
    if(previews.bouncingImage.pos[1] + bouncingImagePreview.offsetHeight >= doge('bouncingImagePreviewContainer').offsetHeight) {
        previews.bouncingImage.direction[1] = -1
        changeColor()
    }

    if(previews.bouncingImage.pos[0] < 0) {
        previews.bouncingImage.direction[0] = 1
        changeColor()
    }
    if(previews.bouncingImage.pos[1] < 0) {
        previews.bouncingImage.direction[1] = 1
        changeColor()
    }

    function changeColor() {
        if(doge('bouncingImageColorInput').checked) {
            bouncingImagePreview.style.filter = `hue-rotate(${DeBread.randomNum(0, 360)}deg)`
        } else {
            bouncingImagePreview.style.filter = 'none'
        }
    }
}, 10);