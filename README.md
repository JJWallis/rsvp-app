# Treehouse - RSVP App solution

This is a solution to the [RSVP App challenge on Treehouse](https://teamtreehouse.com/library/dom-scripting-by-example)

## Table of contents

-  [Overview](#overview)
   -  [The challenge](#the-challenge)
   -  [Screenshot](#screenshot)
   -  [Links](#links)
-  [My process](#my-process)
   -  [Built with](#built-with)
   -  [What I learned](#what-i-learned)
   -  [Continued development](#continued-development)
   -  [Useful resources](#useful-resources)
-  [Author](#author)

## Overview

### The challenge

Your users should be able to:

-  Enter a guests name & create a new response card based on their input
-  Toggle the visibility of guests that have not yet responded
-  Confirm whether individual guests have responded
-  Update the details of guests who have responded
-  Remove guests from the list who no longer wish to attend

### Screenshot

![](./Screenshot.png)

### Links

-  Live Site URL:

## My process

### Built with

-  Semantic HTML5 markup
-  Flexbox
-  CSS Grid
-  Mobile-first workflow
-  Vanilla JS

### What I learned

```html
<script defer src="app.js" type="text/javascript"></script>
<!-- defer -->
```

```css
header {
   text-align: center;
   background: linear-gradient(90deg, #d4eece, #55b3d0, #1e7eb7),
      url('../images/header-bg.jpg') no-repeat;
   background-blend-mode: multiply;
   background-size: cover;
}
/* layering gradient + bg-img */

li input[type='text']:enabled {
   border: 1px dotted rgba(0, 0, 0, 0.2);
}
/* attr selectors */
```

```js
 const functions = {
      edit: (target) => (target.textContent = 'save'),
      save: (target, localStorageArr, name, liIndex) => {
         target.textContent = 'edit'
         localStorageArr.splice(liIndex, 1, name)
         globalFunctions.jsonStringify(localStorageArr)
      },
   jsonParse: () => JSON.parse(localStorage.getItem('names')),
   jsonStringify: (localStorageArr) => {
      (localStorage.names = JSON.stringify(localStorageArr)),
    }
}

functions[target.innerText](target, localStorageArr, name.value, liIndex)

// refactoring re-used generic funcs into obj (+ local-storage) | ran dyancmialyl with [] notation + dynamic str (matched key name to what comparing to - innerText)

localStorageArr ? value(name, localStorageArr) : value(name, txtInput.value)

// 1st conditional ternary operator

name.setAttribute('disabled', 'disabled')

// 1st time using this method - next time do as boolean (shorter)
```

### Continued development

CSS - Not overusing type selectors (not specific)

Greater use cases for local storage + always thinking about using it

### Useful resources

-  [Fastest Way to Load Javascript](https://www.youtube.com/watch?v=BMuFBYw91UQ&ab_channel=WebDevSimplified) - This informed me about different ways of loading JS. Async vs Defer vs normal (+ HTML parsing logic). Modules defer by default - use in later projects.

-  [Cookies vs Local Storage vs Session Storage](https://www.youtube.com/watch?v=GihQAC1I39Q&ab_channel=WebDevSimplified) - This informed me about different ways of storing data via JS in the browser.

## Author

-  Website - [Joshua Jameson-Wallis](https://joshuajamesonwallis.com)
-  Linkedin - [Joshua Jameson-Wallis]()

###### TODO

HTML:

Defer on script - vs async + normal

CSS:

Disabled input styling (greyed out) - txt input on RSVPs to change their name

Confirmed checkbox - blue outline (good boolean logic practice) | first 'filtering' logic practice - hide containers whose checkbox isn't in a checked (truthy) state

Edit btn text content changing when clicked (doesn't have to be based off whether input in disabled state or not - usr will only click when change desired)

1st time layering gradient on top of bg-img

JS:

1st 'app' - heavy JS focus + usr interactity | submit btn for validation (str txt input) | most content built + appended via JS - naked starting HTML (handling that much content dynamically)

Regex - dynamic id (removing whitespace + - instead)

Local storage - 1st project | clear() + set() with key + get() | what to save - recernt searches + state of app specific (guests) | JSON data + built in methods (PARSE + STRINGIFY) | other methods of storing data - Session + Cookies (less common + security issues + Cookies long as hell)
