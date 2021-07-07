// Fix spaces in id value when 3+ words 
// ID names for inputs (to target in other event listeners?)
// 
// Edit btn click - disabled removed from name input (add b4 + class) 

const form = document.querySelector('#registrar')
const txtInput = document.querySelector('#name-submit')
const btnSubmit = document.querySelector('#btn-submit')
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
    arr.push(name)

    label.textContent = 'Confirmed'
    label.setAttribute("for", nameConverted)
    arr.push(label)

    checked.type = 'checkbox'
    checked.id = nameConverted
    arr.push(checked)

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

////////// EVENT LISTENERS //////////

form.addEventListener('submit', e => {
    e.preventDefault()
    appendListItems()
})

listItem.addEventListener('click', e => {

})