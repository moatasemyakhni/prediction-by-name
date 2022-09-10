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


inputName.addEventListener('input', () => {
    // if there was previous error
    //it should be cleared when we type new things
    if(displayErrorMessage.classList.contains('view-none')) {
        displayErrorMessage.classList.add('view-none')
    }
})

submitNameBtn.addEventListener('click', () => {
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

async function genderPredictionByName() {
    const response = await fetch('https://api.genderize.io?name=' + inputName.value)
    if(!response.ok) {
        console.error("Bad response in genderPredictionByName method. Status:", response.status)
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
        console.error("Bad response in agePredictionByName method. Status: ", response.status)
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
        console.error("Bad response in nationalityPredictionByName method. Status: ", response.status)
        return
    }
    const data = await response.json()
    if(data.country.length == 0) {
        const item = document.createElement('li')
        item.textContent = "Not Found"
        nationality.appendChild(item)
        return
    }
    data.country.forEach((countryId) => {
        const item = document.createElement('li')
        item.textContent = countryId['country_id']
        nationality.appendChild(item)
    })
}

async function randomDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    if(!response.ok) {
        console.error("Bad response in randomDogImage method. Status:", response.status)
        return
    }
    const data = await response.json()
    dogImage.src = data.message
}

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