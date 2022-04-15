let sports = require('./db.json')
let globalID = 4

module.exports = {
    getSports: (req, res) => {
        res.status(200).send(sports)
    },
    deleteSport: (req, res) => {
        let index = sports.findIndex(e => e.id === +req.params.id)
        sports.splice(index, 1)
        res.status(200).send(sports)
    },
    createSport: (req, res) => {
        const {sport, popularity, imageURL} = req.body
        let newSport = {
            id: globalID,
            sport,
            popularity,
            imageURL
        }
        sports.push(newSport)
        globalID++
        res.status(200).send(sports)
        console.log(sport)
    },
    updateSport: (req, res) => {
        const {id} = req.params
        const {type} = req.body
        let index = sports.findIndex(e => +e.id === +id)
        
        if(type === 'minus' && sports[index].popularity > 0){
            sports[index].popularity -= 1
            res.status(200).send(sports)
        } else if(type === 'plus' && sports[index].popularity < 5){
            sports[index].popularity += 1
            res.status(200).send(sports)
        } else {
            res.status(400).send('Something went wrong...')
        }
    }
}