let selectedContact = 'debread'

function renderContacts() {
    doge('sectionContacts').innerHTML = ''
    const parsedData = JSON.parse(localStorage.getItem('DeBreadOS.Data'))
    for(const contact in parsedData.contacts) {
        const div = document.createElement('div')
        div.classList.add('contact')
        div.innerHTML = `
        <img src="${parsedData.contacts[contact].pfp}">
        <div class="contactInfo">
            <span>${parsedData.contacts[contact].name}</span>
            <span>${parsedData.contacts[contact].messages[parsedData.contacts[contact].messages.length - 1].content}</span>
        </div>
        `
        div.onclick = () => {
            selectedContact = contact
            renderContacts()
            renderMessages()
        }
        doge('sectionContacts').appendChild(div)
    }   
}
renderContacts()

function renderMessages() {
    doge('messagesContainer').innerHTML = ''
    const parsedData = JSON.parse(localStorage.getItem('DeBreadOS.Data'))
    for(const message in parsedData.contacts[selectedContact].messages) {
        createMessage(
            parsedData.contacts[selectedContact].messages[message].content, 
            parsedData.contacts[selectedContact].messages[message].side,
        )
    }
    parent.save()
}
renderMessages()

function createMessage(text, side) {
    const message = document.createElement('div')
    message.classList.add('message')
    message.classList.add(`m${side}`)
    message.innerHTML = `<span>${text}</span>`

    doge('messagesContainer').appendChild(message)
    doge('messagesContainer').scrollTop = 69420 * 69420

    doge('messagesContact').innerText = parent.getData().contacts[selectedContact].name
    doge('messageInput').setAttribute('placeholder', `Message ${parent.getData().contacts[selectedContact].name}...`)

    if(text.startsWith('https://')) {
        message.querySelector('span').style.cursor = 'pointer'
        message.querySelector('span').style.textDecoration = 'underline'
        message.querySelector('span').onclick = () => {
            window.open(text)
        }
    }

    parent.save()
    renderContacts()
}

doge('messageInput').addEventListener('keydown', (event) => {
    if(event.key === 'Enter' && doge('messageInput').value.length > 0) {
        writeNewMessageData(selectedContact, {
            content: doge('messageInput').value,
            side: 1,
        })


        let randomIndex = DeBread.randomNum(0, parent.getData().contacts[selectedContact].responses.length - 1)
        let i = 0
        function createNextMessage() {
            setTimeout(() => {
                if(!parent.getData().contacts[selectedContact].typing) {
                    parent.getData().contacts[selectedContact].typing = true
                    doge('typingIndicator').innerText = `${parent.getData().contacts[selectedContact].name} is typing...`
                }
            }, DeBread.randomNum(0, 2000));
            setTimeout(() => {                    
                writeNewMessageData(selectedContact, {
                    content: parent.getData().contacts[selectedContact].responses[randomIndex][i],
                    side: 0,
                })
                createMessage(parent.getData().contacts[selectedContact].responses[randomIndex][i], 0)
                i++
                if(i < parent.getData().contacts[selectedContact].responses[randomIndex].length) {
                    createNextMessage()
                }
                if(parent.getData().contacts[selectedContact].typing) {
                    parent.getData().contacts[selectedContact].typing = false
                    doge('typingIndicator').innerText = ``
                }
            }, DeBread.randomNum(2000, 5000));
        }
        createNextMessage()


        createMessage(doge('messageInput').value, 1)
        doge('messageInput').value = ''
    }
})

function writeNewMessageData(contact, content) {
    parent.getData().contacts[contact].messages.push(content)
}