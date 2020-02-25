import apiCall from './api.mjs'

const saveTeams = () => {
    apiCall.getTeams().then(res => 
        res.teams.forEach(team => {
            window.localStorage.setItem(team.id, JSON.stringify(team))
        }))
}

const cache = () => {
    apiCall.getCompetition().then(competition => {
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