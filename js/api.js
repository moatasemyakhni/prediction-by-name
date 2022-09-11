const inputName = document.getElementById('name')
const submitNameBtn = document.getElementById('name-btn')
let displayErrorMessage = document.getElementById('error-section')
let errorMessage = document.getElementById('error-msg-content')
let hiddenSections = document.querySelectorAll('.sections-to-view')
const gender = document.getElementById('gender')
const age = document.getElementById('age')
const nationality = document.getElementById('nationality')
const submitDogBtn = document.getElementById('dog-btn')
let dogImage = document.getElementById('dog-image')
const loginBtn = document.getElementById('login-btn')
const signupBtn = document.getElementById('signup-btn')
const logoutBtn = document.getElementById('logout-btn')
const usernameBtn = document.getElementById('username-btn')
const navbarTitle = document.getElementById('navbar-title')

loginBtn.addEventListener('click', () => {
    console.log("login")
    let body = document.body
    let div = document.createElement('div')
    div.setAttribute('class', 'window')
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

    let form = document.createElement('div')
    let closeBtn = document.createElement('button')
    closeBtn.setAttribute('class', 'btn btn-submit btn-white')
    closeBtn.style.backgroundColor = 'rgb(200, 0, 0)'
    closeBtn.style.color = "#f1f1f1"
    closeBtn.textContent = "Close"

    form.setAttribute('class', 'forms')
    form.appendChild(userInput)
    form.appendChild(pwdInput)
    form.appendChild(loginFormBtn)
    form.appendChild(closeBtn)

    div.appendChild(form)
    body.appendChild(div)
    closeBtn.setAttribute("onclick", "closeWindow()");

    //login

    loginAcc = () => {
        console.log('inner login')
        let pwd = localStorage.getItem(userInput.value)
        const errorSection = document.createElement('div')
        errorSection.setAttribute('class', 'section section-error')
        errorSection.setAttribute('id', 'errorID')
        let errorText = document.createElement('p')
        errorText.setAttribute('class', 'error-msg')
        errorText.style.color = '#f1f1f1'
        errorText.style.textAlign = 'center'
        if(form.contains(document.getElementById('errorID'))) {
            // console.log(form.lastChild)
            // console.log(errorSection)
            form.removeChild(form.lastChild)
        }
        if(!pwd) {
            errorText.textContent = `Username ${userInput.value} is not found`
            errorSection.appendChild(errorText)
            form.appendChild(errorSection)
        }else {
            if(pwd != pwdInput.value) {
                console.log('incorrect user!')
                errorText.textContent = `Wrong username or password`
                errorSection.appendChild(errorText)
                form.appendChild(errorSection)
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
    console.log("signup")
    let body = document.body
    let div = document.createElement('div')
    div.setAttribute('class', 'window')
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
    let form = document.createElement('div')
    let closeBtn = document.createElement('button')
    closeBtn.setAttribute('class', 'btn btn-submit btn-white')
    closeBtn.style.backgroundColor = 'rgb(200, 0, 0)'
    closeBtn.style.color = "#f1f1f1"
    closeBtn.textContent = "Close"

    form.setAttribute('class', 'forms')
    form.appendChild(userInput)
    form.appendChild(pwdInput)
    form.appendChild(signupFormBtn)
    form.appendChild(closeBtn)

    div.appendChild(form)
    body.appendChild(div)
    closeBtn.setAttribute("onclick", "closeWindow()")

    //store signup
    signupAcc = () => {
        console.log('inner signup')
        if(!userInput.value || !pwdInput.value) {
            const errorSection = document.createElement('div')
            errorSection.setAttribute('class', 'section section-error')
            errorSection.setAttribute('id', 'errorID')
            let errorText = document.createElement('p')
            errorText.setAttribute('class', 'error-msg')
            errorText.style.color = '#f1f1f1'
            errorText.style.textAlign = 'center'
            errorText.textContent = `All fields are required`
            errorSection.appendChild(errorText)
            if(form.contains(document.getElementById('errorID'))) {
                // console.log(form.lastChild)
                // console.log(errorSection)
                form.removeChild(form.lastChild)
            }
            form.appendChild(errorSection)
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
            console.log("No signup")
            const errorSection = document.createElement('div')
            errorSection.setAttribute('class', 'section section-error')
            errorSection.setAttribute('id', 'errorID')
            let errorText = document.createElement('p')
            errorText.setAttribute('class', 'error-msg')
            errorText.style.color = '#f1f1f1'
            errorText.style.textAlign = 'center'
            errorText.textContent = `Username ${userInput.value} is taken`
            errorSection.appendChild(errorText)
            if(form.contains(document.getElementById('errorID'))) {
                // console.log(form.lastChild)
                // console.log(errorSection)
                form.removeChild(form.lastChild)
            }
            form.appendChild(errorSection)
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
    if(dogImage.classList.contains('view-hidden')) {
        dogImage.classList.remove('view-hidden')
    }
    randomDogImage()
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

   const getUsers = () => {
    axios.get('https://www.boredapi.com/api/activity')
    .then(response => {
     const users = response.data;
     console.log(`GET users`, users);
   })
    .catch(error => console.error(error));
   };
   getUsers();
   

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