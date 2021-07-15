// Refactor - use funcs + store in an obj (arrow syntax) 
// Label changing - 'confirm' to 'confirm' | text in label is a text node (teachers notes)
// Validation -  duplication + whatever else 
// When hide non respondees checkbox active - remove checkbox in all 'checked' <li> s

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

function appendListItems () {
    const arr = []
    const li = element('li')
    const name = element('input', 'type', 'text')
    const label = element('label', 'textContent', 'Confirmed')
    const checked = element('input', 'type', 'checkbox')
    const editBtn = element('button', 'textContent', 'edit')
    const removeBtn = element('button', 'textContent', 'remove')
    const nameConverted = txtInput.value.replace(' ', '_')

    name.value = `${txtInput.value}`
    name.setAttribute('disabled', 'disabled')
    label.setAttribute("for", nameConverted)
    checked.id = nameConverted
    editBtn.id = 'btn-edit'
    removeBtn.id = 'btn-remove'

    arr.push(name, label, checked, editBtn, removeBtn)
    ul.appendChild(li)

    for (let i = 0; i < arr.length; i++) 
        li.appendChild(arr[i])
    
    txtInput.value = ''
}

function hideNonRespondeesLabel () {
        const arr = []
        const parent = element('div')
        const label = element('label', 'textContent', `Hide those who haven't responded`)
        const checked = element('input', 'type', 'checkbox')

        label.setAttribute('for', 'non-responded')
        checked.id = 'non-responded'
        arr.push(label, checked)

        for (let i = 0; i < arr.length; i++) 
            parent.appendChild(arr[i], ul)
        
        main.insertBefore(parent, ul)
    }

hideNonRespondeesLabel()

//////////////// EVENT LISTENERS //////////////////////

form.addEventListener('submit', e => {
    e.preventDefault()
    appendListItems()
})

main.addEventListener('change', e => {
    const listItems = document.querySelectorAll('li')
    if (e.target.id === 'non-responded') {
        for (let i = 0; i < listItems.length; i++) {
            const children = listItems[i].children
            const checkbox = children[2]
            if (!checkbox.checked) {
                listItems[i].classList.toggle('hidden')
            }
        }
    }
})

ul.addEventListener('change', e => {
    e.target.parentNode.classList.toggle('responded') 
})

ul.addEventListener('click', e => {
        let target = e.target
        let parent = target.parentNode
        
        if (target.tagName === 'BUTTON') {
            if (target.id === 'btn-edit' ) {
                if (target.textContent === 'edit') {
                    target.textContent = 'save'
                    parent.firstElementChild.toggleAttribute('disabled')
              } else {
                    target.textContent = 'edit'
                    parent.firstElementChild.toggleAttribute('disabled')
                }
            } else {
                ul.removeChild(parent)
            }
        } 
})