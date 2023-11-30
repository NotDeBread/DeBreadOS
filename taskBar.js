function toggleSearchMenu() {
    if(doge('searchBarContainer').style.display === 'flex') {
        doge('searchBarContainer').style.display = 'none'
    } else {
        doge('searchBarContainer').style.display = 'flex'
        doge('searchBar').focus()
        doge('searchBar').value = ''
        updateAutocomplete()
    }
}

doge('desktop').addEventListener('mouseup', () => {
    setTimeout(() => {        
        if(doge('searchBar') !== document.activeElement) {
            doge('searchBarContainer').style.display = 'none'
        }
    }, 100);
})

setInterval(() => {
    const currentDate = new Date()
    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
  
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()
  
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedMonth = month.toString().padStart(2, '0')
    const formattedDay = day.toString()
  
    const timeString = `${formattedHours}:${formattedMinutes}${ampm}`
    const dateString = `${formattedMonth}/${formattedDay}/${year}`
  
    doge('timeDisplay').innerText = `${timeString}`
    doge('dateDisplay').innerText = `${dateString}`
}, 1000);

function updateTaskbar() {
    if(windowsFullscreen > 0 || data.settings.togglable.dockTaskbar) {
        doge('taskBar').style.width = 'calc(100vw - 10px)'
        doge('taskBar').style.margin = '0'
        doge('taskBar').style.borderRadius = '0'
        doge('taskBar').style.backgroundColor = 'rgba(0, 0, 0, 0.9)'
        doge('taskBar').style.backdropFilter = 'blur(25px)'
    } else {
        doge('taskBar').style.width = 'calc(100vw - 30px)'
        doge('taskBar').style.margin = '10px'
        doge('taskBar').style.borderRadius = '5px'
        doge('taskBar').style.backgroundColor = 'rgba(0, 0, 0, 0.75)'
        doge('taskBar').style.backdropFilter = 'blur(10px)'
    }

    if(data.settings.togglable.holidayEffects) {
        doge('taskBar').style.boxShadow = `0px 0px 0px 2px rgba(255, 0, 0, ${data.settings.taskbarAccentStrength}), 0px 0px 0px 4px rgba(0, 0, 0, 0.75)`
        setTimeout(() => {
            doge('taskBar').style.boxShadow = `0px 0px 0px 2px rgba(0, 255, 0, ${data.settings.taskbarAccentStrength}), 0px 0px 0px 4px rgba(0, 0, 0, 0.75)`
        }, 500);
    } else {
        doge('taskBar').style.boxShadow = `0px 0px 0px 2px rgba(${data.settings.accentColor}, ${data.settings.taskbarAccentStrength}), 0px 0px 0px 4px rgba(0, 0, 0, 0.75)`
    }
}
setInterval(updateTaskbar, 1000)
updateTaskbar()