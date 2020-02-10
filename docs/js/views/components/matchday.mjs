import Api from "../../modules/api.mjs"
const api = new Api // Use this module to make API calls.

const renderComponent = () => {
    const data = {
        title: "Matchday"
    }

    const getMatchdayData = () => {
        let promise = new Promise((resolve, reject) => {
            resolve(api.getMatchday().then(res => res.matches.map(match => `<div><h2>${match.homeTeam.name} - ${match.awayTeam.name}</h2></div>`)))
        })
        
        promise.then(array => {
            let matchday = document.getElementById('matchday')

            while (matchday.firstChild) {
                matchday.removeChild(matchday.firstChild)
            }

            matchday.insertAdjacentHTML('afterbegin', array.join(''))
        })
    }

    getMatchdayData()

    const template = `<div id="matchday"><img src="./img/spinner.svg" /></div>`

    return template
}

export default renderComponent