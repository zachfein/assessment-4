document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

document.getElementById('fortuneButton').onclick = () => {
  axios.get('http://localhost:4000/api/fortune/')
        .then((res) => {
          const data = res.data
          alert(data)
        })
}

// Sports

const sportsContainer = document.querySelector('#sports-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/sports`

const sportsCb = ({ data: sports }) => displaySports(sports)

const getAllSports = () => axios.get(baseURL).then(sportsCb)
const createSport = body => axios.post(baseURL, body).then(sportsCb)
const deleteSport = id => axios.delete(`${baseURL}/${id}`).then(sportsCb)
const updateSport = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(sportsCb)

const submitHandler = e => {
  let sport = document.querySelector('#sport')
  let popularity = document.querySelector('input[name="popularity"]:checked')
  let imageURL = document.querySelector('#img') 

  let bodyObj = {
    sport: sport.value,
    popularity: popularity.value,
    imageURL: imageURL.value
  }

  createSport(bodyObj)
  sport.value = ''
  popularity.checked = false
  imageURL.value = ''  
}



const createSportCard = (sport) => {
  const sportCard = document.createElement('div')
    sportCard.classList.add('sport-card')

    sportCard.innerHTML = `<img alt='sport cover' src=${sport.imageURL} class="sport-cover"/> <br>
    <p class="sport-title">${sport.sport}</p>
    <div class="btns-container">
        <button onclick="updateSport(${sport.id}, 'minus')">-</button>
        <p class="sport-rating">${sport.popularity} stars</p>
        <button onclick="updateSport(${sport.id}, 'plus')">+</button>
    </div>
    <br>
    <button onclick="deleteSport(${sport.id})">delete</button>
        `

        sportsContainer.appendChild(sportCard)
}

const displaySports = (arr) => {
  sportsContainer.innerHTML = ``
  for (let i = 0; i < arr.length; i++){
    createSportCard(arr[i])
  }
}

form.addEventListener('submit', submitHandler)

getAllSports()