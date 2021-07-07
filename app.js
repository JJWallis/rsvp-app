// Fix spaces in id value when 3+ words 
// ID names for inputs (to target in other event listeners?)
// Checked input - if selected (pseduo class?) - label + outline turns light-blue (JS Class - toggle each time)
// Edit btn click - disabled removed from name input (add b4) | edit btn text-content change to 'save' (when clicked - reverts back to edit + saves name input text-content as updated value by re-adding disabled attr) | 
// Remove btn click - removes whole <li> parent 

const form = document.querySelector('#registrar')
const txtInput = document.querySelector('#name-submit')
const btnSubmit = document.querySelector('#btn-submit')
const main = document.getElementById('main')
const ul = document.querySelector('#invitedList')
let listItem = ''

function appendListItems () {
    const arr = []
    const element = type => document.createElement(type)
    const li = element('li')
    const name = element('input')
    const label = element('label')
    const checked = element('input')
    const nameConverted = txtInput.value.replace(' ', '_')

    name.type = 'text'
    name.value = `${txtInput.value}`

    label.textContent = 'Confirmed'
    label.setAttribute("for", nameConverted)

    checked.type = 'checkbox'
    checked.id = nameConverted

    arr.push(name, label, checked)

    ul.appendChild(li)

    for (let i = 0; i < arr.length; i++) {
        li.appendChild(arr[i])
    }

    for (let i = 0; i < 2; i++) {
        const btn = document.createElement('button')
        if (i < 1) {
            btn.textContent = 'edit'
            btn.id = 'btn-edit'
        } else {
            btn.textContent = 'remove'
            btn.id = 'btn-remove'
        }
        li.appendChild(btn)
    }
    listItem = li
    txtInput.value = ''
}

function hideNonRespondeesLabel () {
    if (main.children.length <= 2) {
        const arr = []
        const label = document.createElement('label')
        const checked = document.createElement('input')
        label.textContent = `Hide those who haven't responded`
        label.setAttribute('for', 'non-responded')
        checked.type = 'checkbox'
        checked.id = 'non-responded'
        arr.push(label, checked)

        for (let i = 0; i < arr.length; i++) {
            main.insertBefore(arr[i], ul)
        }
    }
}


////////// EVENT LISTENERS //////////

main.addEventListener('click', e => {
    if (e.target.tagName === 'INPUT') {
        const listItems = document.querySelectorAll('li')
        for (let i = 0; i < listItems.length; i++) {
            const firstChild = listItems[i].firstElementChild
            const checkbox = firstChild.nextElementSibling
            if (!checkbox.checked && listItems[i].style.display === 'flex') {
                listItems[i].style.display = 'none'
            } else if (!checkbox.checked && listItems[i].style.display === 'none') {
                listItems[i].style.display = 'flex'
            }
        }
    }
})

form.addEventListener('submit', e => {
    e.preventDefault()
    appendListItems()
    hideNonRespondeesLabel()
})

// listItem.addEventListener('click', e => {

// })