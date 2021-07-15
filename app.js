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
    const label = element('label', 'textContent', 'Confirm')
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
    ul.appendChild(li)
    arr.push(name, label, checked, editBtn, removeBtn)

    for (let i = 0; i < arr.length; i++) 
        li.appendChild(arr[i])
    
    txtInput.value = ''
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

//////////////// EVENT LISTENERS //////////////////////

form.addEventListener('submit', e => {
    e.preventDefault()
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
        let parent = target.parentNode
        
        if (target.tagName === 'BUTTON') {
            if (target.id === 'btn-edit' ) {
                parent.firstElementChild.toggleAttribute('disabled')
                if (target.textContent === 'edit') {
                    target.textContent = 'save'
              } else {
                    target.textContent = 'edit'
                }
            } else {
                ul.removeChild(parent)
            }
        } 
})