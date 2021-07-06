// fix spaces in id value when 3+ words 
// ID names for inputs 
// Loop over all created els + appench to li parent 
// Arrow function to create each element (refactored - store on a var?)

const form = document.querySelector('#registrar')
const txtInput = document.querySelector('input[type="text"]')
const btnSubmit = document.querySelector('#btn-submit')
const ul = document.querySelector('#invitedList')

function appendListItem () {
    const li = document.createElement('li')
    const name = document.createElement('input')
    const label = document.createElement('label')
    const checked = document.createElement('input')
    const nameConverted = txtInput.value.replace(' ', '_')
    name.type = 'text'
    name.value = `${txtInput.value}`
    label.textContent = 'Confirmed'
    label.setAttribute("for", nameConverted)
    checked.type = 'checkbox'
    checked.id = nameConverted





    ul.appendChild(li)
    li.appendChild(name)
    li.appendChild(label)
    li.appendChild(checked)
    txtInput.value = ''
}

form.addEventListener('submit', e => {
    e.preventDefault()
    appendListItem()
})