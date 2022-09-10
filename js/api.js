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