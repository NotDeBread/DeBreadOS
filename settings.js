function changeSetting(setting) {
    const childElement = doge(`${setting}Input`)
    parent.updateSetting(setting, childElement)
    if(setting === 'holidayEffects') {parent.updateTaskbar()}
    parent.save()
}

function updateCheckboxes() {
    for (let setting in parent.getData().settings.togglable) {
        if(doge(`${setting}Input`)) {
            doge(`${setting}Input`).checked = parent.getData().settings.togglable[setting]
        }
    }
}
updateCheckboxes()
setInterval(updateCheckboxes, 50)

const menus = [
    'system',
    'personalize',
    'credits',
    'profile',
    'info'
]

function switchMenu(selectedMenu) {
    for (const menu in menus) {
        if (menus[menu] !== selectedMenu) {
            doge(`menu_${menus[menu]}`).style.display = 'none'
            doge(`tabLabel_${menus[menu]}`).style.fontWeight = '500'
        }
    }
    doge(`menu_${selectedMenu}`).style.display = 'unset'
    doge(`tabLabel_${selectedMenu}`).style.fontWeight = '700'

    if (selectedMenu === 'profile') {
        updateSettingsProfile()
    }
}
switchMenu('system')

doge('accentColorInput').addEventListener('change', () => {
    parent.getData().settings.accentColor = DeBread.hexToRgb(doge('accentColorInput').value)
    parent.updateTaskbar()
    createSettingNoti('Accent color set!')
})

doge('accentColorStrengthInput').addEventListener('change', updateAccentStrength)
doge('accentColorStrengthInput').addEventListener('mousemove', updateAccentStrength)
doge('accentColorStrengthInput').value = parent.getData().settings.taskbarAccentStrength

function updateAccentStrength() {
    parent.getData().settings.taskbarAccentStrength = doge('accentColorStrengthInput').value
    doge('accentColorStrengthDisplay').innerText = doge('accentColorStrengthInput').value
    parent.updateTaskbar()
}

function updateSettingsProfile() {
    doge('tabLabel_profile').innerText = parent.getData().user.name
    doge('tabLabel_profileImg').src = parent.getData().user.pfp
    doge('pfp').src = parent.getData().user.pfp
    doge('name').innerText = parent.getData().user.name
}
updateSettingsProfile()

function createSettingNoti(text) {
    const noti = document.createElement('div')
    noti.classList.add('settingNoti')
    noti.innerHTML = `<span>${text}</span>`
    doge('settingNotiContainer').appendChild(noti)
    setTimeout(() => {
        doge('settingNotiContainer').removeChild(noti)
    }, 5000);
}

function setSetting(setting, value) {
    parent.getData().settings[setting] = value
}

function reallyCoool(text) {
    console.log(text)
}