import render from "../modules/render.mjs"
import Api from "../modules/api.mjs"

// Import components

const renderTemplate = () => {
    const data = {
        title: "matchday",
        meta: {}
    }

    let id = window.location.hash.split('/').pop()
    const api = new Api

    const getMatchData = () => {
        let promise = new Promise((resolve, reject) => {
            resolve(api.getMatch(id).then(res => {
                return `
                <div>
                    <h2>${res.match.homeTeam.name} ${res.match.score.fullTime.homeTeam} - ${res.match.score.fullTime.awayTeam} ${res.match.awayTeam.name}</h2>
                </div>`
            }))
        })

        promise.then(result => {
            let match = document.getElementById('match')
            while (match.firstChild) match.removeChild(match.firstChild)
            match.insertAdjacentHTML('afterbegin', result)
        })
    }

    api.getMatch(id).then(res => console.log(res))

    // api.getStandings().then(res => console.log(res))
    // api.getCurrentMatchday().then(res => console.log(res))
    // api.getMatchday(0).then(res => console.log(res))
    getMatchData()
    const template = `<div id="match"><img src="./img/spinner.svg" /></div>`
    
    render(template, data.meta)
}

export default renderTemplate