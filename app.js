const form = document.querySelector('#registrar')
const txtInput = document.querySelector('#name-submit')
const btnSubmit = document.querySelector('#btn-submit')
const main = document.getElementById('main')
const ul = document.querySelector('#invitedList')

function element (type, property, value) {
    const el = document.createElement(type)
    el[property] = value
    return el
}

function appendListItems (localStorageArr) {
    const arr = []
    const li = element('li')
    const name = element('input', 'type', 'text')
    const label = element('label', 'textContent', 'Confirm')
    const checked = element('input', 'type', 'checkbox')
    const editBtn = element('button', 'textContent', 'edit')
    const removeBtn = element('button', 'textContent', 'remove')
    const value = (el, data) => el.value = data

    localStorageArr ? value(name, localStorageArr) : value(name, txtInput.value)

    name.setAttribute('disabled', 'disabled')
    label.setAttribute("for", name)
    checked.id = name
    editBtn.id = 'btn-edit'
    removeBtn.id = 'btn-remove'
    ul.appendChild(li)
    arr.push(name, label, checked, editBtn, removeBtn)

    for (let i = 0; i < arr.length; i++) 
        li.appendChild(arr[i])
    
    value(txtInput, '')
}

function hideNonRespondeesLabel () {
        const parent = element('div')
        const label = element('label', 'textContent', `Hide those who haven't responded`)
        const checked = element('input', 'type', 'checkbox')

        label.setAttribute('for', 'non-responded')
        checked.id = 'non-responded'

        parent.appendChild(label, ul)
        parent.appendChild(checked, ul)
        main.insertBefore(parent, ul)
    }

hideNonRespondeesLabel()

function localStorageState () {
    if (localStorage.length > 0) {
        const arr = JSON.parse( localStorage.getItem('names') )
        for (let i = 0; i < arr.length; i++) 
            appendListItems(arr[i])
    }
}

localStorageState()

// localStorage.clear()

//////////////// EVENT LISTENERS //////////////////////

form.addEventListener('submit', e => {
    e.preventDefault()
    const localStorageArr = localStorage.length > 0 ? JSON.parse( localStorage.getItem('names') ) 
        : []
    const name = txtInput.value.replace(' ', '')
    localStorageArr.push(name)
    localStorage.names = JSON.stringify(localStorageArr) 
    appendListItems()
})

main.addEventListener('change', e => {
    const hidden = el => el.classList.toggle('hidden')
    const listItems = document.querySelectorAll('li')
    if (e.target.id === 'non-responded') {
        for (let i = 0; i < listItems.length; i++) {
            const children = listItems[i].children
            const checkbox = children[2]
            if (!checkbox.checked) {
                hidden(listItems[i])
            } else {
                hidden(checkbox)
                hidden(checkbox.previousElementSibling)
            }
        }
    }
})

ul.addEventListener('change', e => {
    const target = e.target
    const label = target.previousElementSibling
    const labelText = value => label.textContent = value
    target.parentNode.classList.toggle('responded')
    label.textContent === 'Confirm' ? labelText('Confirmed') : labelText('Confirm')
})

ul.addEventListener('click', e => {
        let target = e.target
        let li = target.parentNode
        const listItems = document.querySelectorAll('li')
        const index = [...listItems]

        if (target.tagName === 'BUTTON') {
            if (target.id === 'btn-edit' ) {
                li.firstElementChild.toggleAttribute('disabled')
                if (target.textContent === 'edit') {
                    target.textContent = 'save'
              } else {
                    target.textContent = 'edit'
                }
            } else {
                const liIndex = index.indexOf(li) 
                const localStorageArr = JSON.parse(localStorage.getItem('names')) 
                ul.removeChild(li)
                localStorageArr.splice(liIndex, 1)
                localStorage.names = JSON.stringify(localStorageArr)
            }
        } 
})

// Each time usr clicks btns edit - update localStorageArr 
// Ref collection of li's - use edited li as indexOf value - remove that same index value from localStorage
// Create one single func that deals with local storage? - pass e.target as argument? 