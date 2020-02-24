import Api from './api.mjs'
const api = new Api

function saveTeams() {
    api.getTeams().then(res => 
        res.teams.forEach(team => {
            window.localStorage.setItem(team.id, JSON.stringify(team))
        }))
}

function cache() {
    api.getCompetition().then(competition => {
        // Check if the current season is the same as the actual season of the Premier league.
        const fetchedSeasonId = competition.currentSeason.id.toString()
        const storedSeasonId = window.localStorage.getItem('currentSeasonId')

        if (fetchedSeasonId !== storedSeasonId) {
            window.localStorage.setItem('currentSeasonId', competition.currentSeason.id)

            // renew the teams.
            saveTeams()
        }
    })
}

export default cache