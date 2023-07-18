var themeForm = document.getElementById('themes')

// Toggling theme plate
document.getElementById('btn-theme').onclick = function() {
    if (themeForm.getAttribute('aria-expanded') === 'false') {
        themeForm.setAttribute('aria-expanded', true);
    }else{
        themeForm.setAttribute('aria-expanded',false);
    }
}

const colorTheme = document.querySelectorAll('[name="theme"]')

// Storing theme in local storage
function saveTheme(theme) {
    localStorage.setItem('theme', theme)
}
colorTheme.forEach(theme => {
    theme.onclick = () => {
        saveTheme(theme.id)
    }
})

// Applying the theme
function getTheme() {
    const currentTheme = localStorage.getItem('theme');
    colorTheme.forEach(theme => {
        if(theme.id == currentTheme){
            theme.checked = true;
        }
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var todoForm = document.getElementById('todo-form')
var taskList = document.getElementById('task-list')

// update Local Storage with tasks
function updateData() {
    localStorage.setItem('data', taskList.innerHTML)
}

function showData() {
    taskList.innerHTML = localStorage.getItem('data')
}

// Adding task to the List
function addTodoItem(input) {
    taskList.innerHTML += `<li><i class="bi bi-check-circle"></i> <span>${input}</span> <i class="bi bi-x-circle"></i> </li>`
}
todoForm.onsubmit = function(e) {
    e.preventDefault()

    if(document.getElementById('todo-input').value == ''){
        alert("Please enter a task")
    }
    else{
        addTodoItem(document.getElementById('todo-input').value)
    }

    document.getElementById('todo-input').value = ''
    updateData()
}

// Click events to remove and tick tasks
taskList.addEventListener('click', function(e){
    console.log(e.target.classList)
    if (e.target.classList.contains('bi-x-circle')) {
        e.target.parentElement.remove()
    }
    if(e.target.tagName === 'SPAN' || e.target.classList.contains('bi-check-circle') || e.target.classList.contains('bi-check-circle-fill')) {
        e.target.parentElement.children[0].classList.toggle('bi-check-circle')
        e.target.parentElement.children[0].classList.toggle('bi-check-circle-fill')
        e.target.parentElement.classList.toggle('done')
    }
    updateData()
})
showData() // Run this to show the previous data
getTheme() // Changing the theme

if (! CSS.supports(`selector(:has(#light:checked))`)) {
    alert("Your Browser doesn't supports themes\nPlease use different browser :)")
}