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

const jsonParse = () => JSON.parse( localStorage.getItem('names') ) 
const jsonStringify = (localStorageArr) => JSON.stringify(localStorageArr) 

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

function restoreLocalStorage () {
    if (localStorage.length > 0) {
        const arr = jsonParse()
        for (let i = 0; i < arr.length; i++) 
            appendListItems(arr[i])
    }
}

restoreLocalStorage()

//////////////// EVENT LISTENERS //////////////////////

form.addEventListener('submit', e => {
    e.preventDefault()
    const localStorageArr = localStorage.length > 0 ? jsonParse() : []
    const name = txtInput.value.replace(' ', '')
    localStorageArr.push(name)
    localStorage.names = jsonStringify(localStorageArr) 
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
    if (target.type === 'checkbox') {
        const label = target.previousElementSibling
        const labelText = value => label.textContent = value
        target.parentNode.classList.toggle('responded')
        label.textContent === 'Confirm' ? labelText('Confirmed') : labelText('Confirm')
    }
})

ul.addEventListener('click', e => {
        let target = e.target
        let li = target.parentNode

        if (target.tagName === 'BUTTON') {
            const listItems = document.querySelectorAll('li')
            const listItemsArr = [...listItems]
            const liIndex = listItemsArr.indexOf(li)
            const name = li.firstElementChild
            const localStorageArr = jsonParse()

            if (target.id === 'btn-edit' ) {
                name.toggleAttribute('disabled')
                if (target.textContent === 'edit') {
                    target.textContent = 'save' // add obj func here!! 
              } else {
                    target.textContent = 'edit'
                    localStorageArr.splice(liIndex, 1, name.value)
                    localStorage.names = jsonStringify(localStorageArr)
                }
            } else { 
                ul.removeChild(li)
                localStorageArr.splice(liIndex, 1)
                localStorage.names = jsonStringify(localStorageArr)
            }
        } 
})

// Add to stringify arrow func - 'localStorage.names = json.Stringify()' 
// Store funcs in obj in global scope 
// localStorage.clear() 