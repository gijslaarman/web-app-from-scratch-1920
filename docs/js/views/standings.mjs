import render from "../modules/render.mjs"
import Api from "../modules/api.mjs"
const api = new Api

const getStandings = () => {
    let promise = new Promise((resolve, reject) => {
        resolve(api.getStandings().then(res => res.standings))
    })

    promise.then(array => {
        const table = array.find(table => table.type === 'TOTAL')

        const tableDataArray = table.table.map(row => {
            return `
            <tr onclick="window.location='#/teams/${row.team.id}'">
                <td>${row.position} ${row.team.name}</td>
                <td>${row.playedGames}</td>
                <td>${row.won}</td>
                <td>${row.draw}</td>
                <td>${row.lost}</td>
                <td>${row.goalsFor}</td>
                <td>${row.goalsAgainst}</td>
                <td>${row.goalDifference}</td>
                <td>${row.points}</td>
            </tr>`
        })

        let element = document.getElementById('loading')
        while (element.firstChild) element.removeChild(element.firstChild)
        element.insertAdjacentHTML('afterbegin', `
            <table>
                <tr>
                    <th>Club</th>
                    <th>MP</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    <th>Pts</th>
                </tr>
                ${tableDataArray.join('')}  
            </table>
        `)
    })
}

const renderTemplate = () => {
    const data = {
        component: "standings"
    }

    getStandings()

    const template = `<section id="loading"><img src="./img/spinner.svg" /></section>`
    
    render(template, data)
}

export default renderTemplate