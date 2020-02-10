import Router from './modules/router.mjs'

// Views
import Teams from './views/teams.mjs'
import TeamDetails from './views/teamDetail.mjs'

// Hash router set-up
const router = new Router()
const routes = [
    // {hash: Function}, the # in the routes are automatically placed before.
    {'teams': Teams},
    {'teams/:id': TeamDetails}
]

routes.forEach(route => {
    const routingHash = Object.keys(route)[0] // find the hash to base route off.
    // Initialize the routes in the router, {hash: function}
    router.init(routingHash, route[routingHash])
    console.log(router)
})

// Detect hash changes and render the view based of that.
window.addEventListener('hashchange', () => {
    router.view()
})
router.view()

// fetch('https://api.football-data.org/v2/competitions/2021', {"X-Auth-Token": "0390172f7e894d5787121b3ee3c29540"}).then(res => res.json()).then(res => console.log(res))

// fetch(`${api.url}/competitions/2021`, api.params)
// .then(res => res.json())
// .then(res => {
//     const matchesContainer = document.getElementById('matches')
//     document.getElementById('matchday').innerText = res.currentSeason.currentMatchday
//     // Get matches from current matchday
//     fetch(`${api.url}/competitions/2021/matches?matchday=${res.currentSeason.currentMatchday}`, api.params)
//     .then(matchday => matchday.json())
//     .then(matchday => {
//         matchday.matches.forEach(match => {
//             matchesContainer.insertAdjacentHTML('beforeend', `
//                 <a href="./match/${match.id}" class="match">
//                     <div class="teams">
//                         <h3>${match.homeTeam.name}</h3>
//                         <h3>${match.awayTeam.name}</h3>
//                     </div>

//                     ${match.status !== 'SCHEDULED' ? 
//                     `<div class="score">
//                         <h3>${match.score.fullTime.homeTeam}</h3>
//                         <h3>${match.score.fullTime.awayTeam}</h3>
//                     </div>` : false}

//                     <div class="metadata">${match.status === 'FINISHED' ? 'FT': false}</div>
//                 </a>
//             `)
//         })
//     })
// })