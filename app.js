// Fix spaces in id value when 3+ words 
// ID names for inputs 
// Contentidable attr in html for name input - when usr clicks button that gets added to name input 
// Loop over all created els + appench to li parent 
// Arrow function to create each element (refactored - store call on a new var each time)

const form = document.querySelector('#registrar')
const txtInput = document.querySelector('input[type="text"]')
const btnSubmit = document.querySelector('#btn-submit')
const ul = document.querySelector('#invitedList')

function appendListItems () {
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
    txtInput.value = ''
}


////////// EVENT LISTENERS //////////

form.addEventListener('submit', e => {
    e.preventDefault()
    appendListItems()
})