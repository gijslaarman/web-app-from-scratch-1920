import render from "../modules/render.mjs"
import apiCall from "../modules/api.mjs"

const getHtml = () => {
    return apiCall.getStandings()
        .then(standings => {
            const totalTable = standings.standings.find(table => table.type === 'TOTAL')

            const template = `<table>
                    <tr>
                        <th class="club">Club</th>
                        <th>MP</th>
                        <th class="no-mobile">W</th>
                        <th class="no-mobile">D</th>
                        <th class="no-mobile">L</th>
                        <th class="no-mobile">GF</th>
                        <th class="no-mobile">GA</th>
                        <th>+/-</th>
                        <th>Pts</th>
                    </tr>
                    ${createRows(totalTable)}  
                </table>`

            return template

            function createRows(table) {
                return table.table.map(row => {
                    const team = JSON.parse(localStorage.getItem(row.team.id))

                    return `
                    <tr onclick="window.location='#/teams/${row.team.id}'">
                        <td class="club"><span class="position">${row.position}</span> <img class="crest" src="${team.crestUrl}" />${team.shortName}</td>
                        <td>${row.playedGames}</td>
                        <td class="no-mobile">${row.won}</td>
                        <td class="no-mobile">${row.draw}</td>
                        <td class="no-mobile">${row.lost}</td>
                        <td class="no-mobile">${row.goalsFor}</td>
                        <td class="no-mobile">${row.goalsAgainst}</td>
                        <td>${row.goalDifference}</td>
                        <td class="bold">${row.points}</td>
                    </tr>`
                }).join('')
            }
        })
}

const renderTemplate = () => {
    const data = {
        id: "standings"
    }

    render.loadingState()
    getHtml().then(html => render.template(html, data))
}

export default renderTemplate