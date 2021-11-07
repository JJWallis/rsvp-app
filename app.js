const form = document.querySelector('#registrar')
const txtInput = document.querySelector('#name-submit')
const btnSubmit = document.querySelector('#btn-submit')
const main = document.getElementById('main')
const ul = document.querySelector('#invitedList')

const globalFunctions = {
   element: function (type, property, value) {
      const el = document.createElement(type)
      el[property] = value
      return el
   },
   jsonParse: () => JSON.parse(localStorage.getItem('names')),
   jsonStringify: (localStorageArr) =>
      (localStorage.names = JSON.stringify(localStorageArr)),
}

function hideNonRespondeesLabel() {
   const parent = globalFunctions.element('div')
   const label = globalFunctions.element(
      'label',
      'textContent',
      `Hide those who haven't responded`
   )
   const checked = globalFunctions.element('input', 'type', 'checkbox')

   label.setAttribute('for', 'non-responded')
   checked.id = 'non-responded'

   parent.append(label)
   parent.append(checked)
   main.insertBefore(parent, ul)
}

hideNonRespondeesLabel()

function appendListItems(localStorageArr) {
   const arr = []
   const li = globalFunctions.element('li')
   const name = globalFunctions.element('input', 'type', 'text')
   const label = globalFunctions.element('label', 'textContent', 'Confirm')
   const checked = globalFunctions.element('input', 'type', 'checkbox')
   const editBtn = globalFunctions.element('button', 'textContent', 'edit')
   const removeBtn = globalFunctions.element('button', 'textContent', 'remove')
   const value = (el, data) => (el.value = data)

   localStorageArr ? value(name, localStorageArr) : value(name, txtInput.value)

   name.setAttribute('disabled', 'disabled')
   label.setAttribute('for', name)
   checked.id = name
   editBtn.id = 'btn-edit'
   removeBtn.id = 'btn-remove'
   ul.append(li)
   arr.push(name, label, checked, editBtn, removeBtn)

   arr.forEach((element) => li.append(element))

   value(txtInput, '')
}

function liBtnBehaviour(target, li) {
   const functions = {
      edit: (target) => (target.textContent = 'save'),
      save: (target, localStorageArr, name, liIndex) => {
         target.textContent = 'edit'
         localStorageArr.splice(liIndex, 1, name)
         globalFunctions.jsonStringify(localStorageArr)
      },
   }

   const listItemsArr = Array.from(document.querySelectorAll('li'))
   const liIndex = listItemsArr.indexOf(li)
   const name = li.firstElementChild
   const localStorageArr = globalFunctions.jsonParse()

   if (target.id === 'btn-edit') {
      name.toggleAttribute('disabled')
      functions[target.innerText](target, localStorageArr, name.value, liIndex)
   } else {
      ul.removeChild(li)
      localStorageArr.splice(liIndex, 1)
      globalFunctions.jsonStringify(localStorageArr)
   }
}

function restoreLocalStorage() {
   if (localStorage.length > 0) {
      const arr = globalFunctions.jsonParse()
      arr.forEach((val) => appendListItems(val))
   }
}

restoreLocalStorage()

//////////////// EVENT LISTENERS //////////////////////

form.addEventListener('submit', (e) => {
   e.preventDefault()
   const localStorageArr =
      localStorage.length > 0 ? globalFunctions.jsonParse() : []
   const name = txtInput.value.replace(/\s/g, '')
   localStorageArr.push(name)
   globalFunctions.jsonStringify(localStorageArr)
   appendListItems()
})

main.addEventListener('change', (e) => {
   const hidden = (el) => el.classList.toggle('hidden')
   const listItems = document.querySelectorAll('li')
   if (e.target.matches('#non-responded')) {
      //=== 'non-responded'
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

ul.addEventListener('change', (e) => {
   const target = e.target
   if (target.type === 'checkbox') {
      const label = target.previousElementSibling
      const labelText = (value) => (label.textContent = value)
      target.parentElement.classList.toggle('responded')
      label.textContent === 'Confirm'
         ? labelText('Confirmed')
         : labelText('Confirm')
   }
})

ul.addEventListener('click', (e) => {
   const target = e.target
   if (target.matches('button')) {
      liBtnBehaviour(target, target.parentElement)
   }
})

// localStorage.clear()
