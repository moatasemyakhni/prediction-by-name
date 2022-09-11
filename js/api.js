const inputName = document.getElementById('name')
const submitNameBtn = document.getElementById('name-btn')
const displayErrorMessage = document.getElementById('error-section')
const errorMessage = document.getElementById('error-msg-content')
const hiddenSections = document.querySelectorAll('.sections-to-view')
const gender = document.getElementById('gender')
const age = document.getElementById('age')
const nationality = document.getElementById('nationality')
const submitDogBtn = document.getElementById('dog-btn')
const dogImage = document.getElementById('dog-image')
const loginBtn = document.getElementById('login-btn')
const signupBtn = document.getElementById('signup-btn')
const logoutBtn = document.getElementById('logout-btn')
const usernameBtn = document.getElementById('username-btn')
const navbarTitle = document.getElementById('navbar-title')
const randomActivityBtn = document.getElementById('random-activity-btn')

loginBtn.addEventListener('click', () => {
    let body = document.body
    let div = document.createElement('div')
    let userInput = document.createElement('input')
    userInput.setAttribute('type', 'text')
    userInput.setAttribute('class', 'form-inputs btn btn-white')
    userInput.setAttribute('id', 'login-name')
    userInput.setAttribute('placeholder', 'Username...')
    
    let pwdInput = document.createElement('input')
    pwdInput.setAttribute('type', 'password')
    pwdInput.setAttribute('class', 'form-inputs btn btn-white')
    pwdInput.setAttribute('id', 'login-pwd')
    pwdInput.setAttribute('placeholder', 'Password...')
    
    var loginFormBtn = document.createElement('button')
    loginFormBtn.setAttribute('class', 'btn btn-white btn-submit')
    loginFormBtn.setAttribute('id', 'login-form-btn')
    loginFormBtn.setAttribute('onclick', 'loginAcc()')
    loginFormBtn.textContent = 'Login'

    let closeBtn = document.createElement('button')
    closeBtn.setAttribute('class', 'btn btn-submit btn-white')
    closeBtn.setAttribute("onclick", "closeWindow()");
    closeBtn.style.backgroundColor = 'rgb(200, 0, 0)'
    closeBtn.style.color = "#f1f1f1"
    closeBtn.textContent = "Close"

    let form = document.createElement('div')
    form.setAttribute('class', 'forms')
    form.appendChild(userInput)
    form.appendChild(pwdInput)
    form.appendChild(loginFormBtn)
    form.appendChild(closeBtn)

    div.setAttribute('class', 'window')
    div.appendChild(form)

    body.appendChild(div)

    //login
    loginAcc = () => {
        let pwd = localStorage.getItem(userInput.value)
        if(form.contains(document.getElementById('errorID'))) {
            //avoid multiple error messages
            form.removeChild(form.lastChild)
        }
        if(!pwd) {
            form.appendChild(setErrorMessage(`Username ${userInput.value} is not found`))
        }else {
            if(pwd != pwdInput.value) {
                form.appendChild(setErrorMessage(`Wrong username or password`))
            }else {
                loginBtn.classList.add('view-none')
                signupBtn.classList.add('view-none')
                logoutBtn.classList.remove('view-none')
                usernameBtn.classList.remove('view-none')
                usernameBtn.textContent = userInput.value
                getUserIP()
                closeWindow()
            }
        }
    }
})

signupBtn.addEventListener('click', () => {
    let body = document.body
    let div = document.createElement('div')

    let userInput = document.createElement('input')
    userInput.setAttribute('type', 'text')
    userInput.setAttribute('class', 'form-inputs btn btn-white')
    userInput.setAttribute('id', 'signup-name')
    userInput.setAttribute('placeholder', 'Username...')
    
    let pwdInput = document.createElement('input')
    pwdInput.setAttribute('type', 'password')
    pwdInput.setAttribute('class', 'form-inputs btn btn-white')
    pwdInput.setAttribute('id', 'signup-pwd')
    pwdInput.setAttribute('placeholder', 'Password...')

    let signupFormBtn = document.createElement('button')
    signupFormBtn.setAttribute('class', 'btn btn-white btn-submit')
    signupFormBtn.setAttribute('id', 'signup-form-btn')
    signupFormBtn.setAttribute('onclick', 'signupAcc()')
    signupFormBtn.textContent = 'Signup'
    
    let closeBtn = document.createElement('button')
    closeBtn.setAttribute('class', 'btn btn-submit btn-white')
    closeBtn.setAttribute("onclick", "closeWindow()")
    closeBtn.style.backgroundColor = 'rgb(200, 0, 0)'
    closeBtn.style.color = "#f1f1f1"
    closeBtn.textContent = "Close"

    let form = document.createElement('div')
    form.setAttribute('class', 'forms')
    form.appendChild(userInput)
    form.appendChild(pwdInput)
    form.appendChild(signupFormBtn)
    form.appendChild(closeBtn)

    div.setAttribute('class', 'window')
    div.appendChild(form)
    body.appendChild(div)

    //store signup
    signupAcc = () => {
        if(!userInput.value || !pwdInput.value) {
            if(form.contains(document.getElementById('errorID'))) {
                form.removeChild(form.lastChild)
            }
            form.appendChild(setErrorMessage(`All fields are required`))
        }
        else if(!localStorage.getItem(userInput.value)) {
            localStorage.setItem(userInput.value, pwdInput.value)
            loginBtn.classList.add('view-none')
            signupBtn.classList.add('view-none')
            logoutBtn.classList.remove('view-none')
            usernameBtn.classList.remove('view-none')
            usernameBtn.textContent = userInput.value
            getUserIP()
            closeWindow()
        }else {
            if(form.contains(document.getElementById('errorID'))) {
                // console.log(form.lastChild)
                // console.log(errorSection)
                form.removeChild(form.lastChild)
            }
            form.appendChild(setErrorMessage(`Username ${userInput.value} is taken`))
        }
        
    }
})

logoutBtn.addEventListener('click', () => {
    logoutBtn.classList.add('view-none')
    usernameBtn.classList.add('view-none')
    loginBtn.classList.remove('view-none')
    signupBtn.classList.remove('view-none')
    let ip = document.getElementById('ip')
    ip.remove()
})

function closeWindow() {
    document.querySelector('.window').remove()
}

inputName.addEventListener('input', () => {
    // if there was previous error
    //it should be cleared when we type new things
    if(!displayErrorMessage.classList.contains('view-none')) {
        displayErrorMessage.classList.add('view-none')
    }
})

submitNameBtn.addEventListener('click', () => {
    if(usernameBtn.classList.contains('view-none')) {
        errorMessage.textContent = "Sign in first"
        displayErrorMessage.classList.remove('view-none')
        return
    }
    clear() // old info should be cleared
    // handle empty field
    if(!inputName.value) {
        errorMessage.textContent = "Empty Field"
        displayErrorMessage.classList.remove('view-none')
        hiddenSections.forEach((sec) => {
            if(!sec.classList.contains('view-none')) {
                sec.classList.add('view-none')
            }
        })
        return
    }

    genderPredictionByName()
    agePredictionByName()
    nationalityPredictionByName()

    hiddenSections.forEach((sec) => {
        sec.classList.remove('view-none')
    })
})

submitDogBtn.addEventListener('click', () => {
    console.log("dog section click")
    if(dogImage.classList.contains('view-hidden')) {
        dogImage.classList.remove('view-hidden')
    }
    randomDogImage()
})

randomActivityBtn.addEventListener('click', () => {
    randomActivity();
})

async function genderPredictionByName() {
    const response = await fetch('https://api.genderize.io?name=' + inputName.value)
    if(!response.ok) {
        console.error("Bad response in genderPredictionByName function. Status:", response.status)
        return
    }
    const data = await response.json()
    if(data.gender == null) {
        gender.textContent = "Not Found"
        return
    }
    gender.textContent = data.gender
}

async function agePredictionByName() {
    const response = await fetch('https://api.agify.io/?name=' + inputName.value)
    if(!response.ok) {
        console.error("Bad response in agePredictionByName function. Status: ", response.status)
        return
    }
    const data = await response.json()
    if(data.age == null) {
        age.textContent = "Not Found"
        return
    }
    age.textContent = data.age
}

async function nationalityPredictionByName() {
    const response = await fetch('https://api.nationalize.io/?name=' + inputName.value)
    if(!response.ok) {
        console.error("Bad response in nationalityPredictionByName function. Status: ", response.status)
        return
    }
    const data = await response.json()
    if(data.country.length == 0) {
        const item = document.createElement('li')
        item.textContent = "Not Found"
        nationality.appendChild(item)
        return
    }
    // data.country.forEach((countryId) => {
    //     const item = document.createElement('li')
    //     item.textContent = countryId['country_id']
    //     nationality.appendChild(item)
    // })
    let counter = 0
    for(const countryId of data.country) {
        const item = document.createElement('li')
        item.textContent = countryId['country_id']
        nationality.appendChild(item)
        counter += 1
        if(counter == 2) break
    }
}

async function randomDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    if(!response.ok) {
        console.error("Bad response in randomDogImage function. Status:", response.status)
        return
    }
    const data = await response.json()
    let dogPhoto = document.createElement('img')
    dogPhoto.setAttribute('class', 'dog-img')
    dogPhoto.setAttribute('src', data.message)
    dogPhoto.setAttribute('id', 'random-dog')

    if(dogImage.contains(document.getElementById('random-dog'))) {
        dogImage.removeChild(dogImage.lastChild)
    }
    dogImage.appendChild(dogPhoto)
}

var getUserIP = () => {
    axios.get('https://api.ipify.org/?format=json')
    .then(response => {
     const users = response.data
     const ip = users['ip']
     const h4 = document.createElement('h4')
     h4.setAttribute('id', 'ip')
     h4.setAttribute('class', 'ip-title')
     h4.textContent = ip
     navbarTitle.appendChild(h4)
     console.log(`GET users`, users)
   })
    .catch(error => console.error(error))
   }

   const randomActivity = () => {
    axios.get('https://www.boredapi.com/api/activity')
    .then(response => {
     const users = response.data;
     const randomActivity = document.getElementById('random-activity')
     randomActivity.textContent = users.activity
     //console.log(`GET users`, users);
   })
    .catch(error => console.error(error));
   };
   

function clear() {
    gender.textContent = null
    age.textContent = null
    if(!dogImage.classList.contains('view-hidden')) {
        dogImage.classList.add('view-hidden')
    }
    while(nationality.firstChild) {
        nationality.removeChild(nationality.firstChild)
    }
}

function setErrorMessage(message) {
    const errorSection = document.createElement('div')
    errorSection.setAttribute('class', 'section section-error')
    errorSection.setAttribute('id', 'errorID')
    let errorText = document.createElement('p')
    errorText.setAttribute('class', 'error-msg')
    errorText.style.color = '#f1f1f1'
    errorText.style.textAlign = 'center'
    errorText.textContent = message
    errorSection.appendChild(errorText)
    return errorSection
}