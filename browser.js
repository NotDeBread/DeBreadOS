doge('searchBar').addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        doge('searchBar').blur()
        if(doge('searchBar').value.startsWith('http')) {
            doge('iframe').src = doge('searchBar').value
        } else {
            doge('searchBar').value = `https://${doge('searchBar').value}`
            doge('iframe').src = doge('searchBar').value
        }
    }
})

doge('iframe').addEventListener('onclick', () => {
    console.log(doge('iframe'))
})