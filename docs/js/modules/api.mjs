export default class Api {
    constructor() {
        this.url = 'https://api.football-data.org/v2',
        this.urlParams = {
            headers: { "X-Auth-Token": "0390172f7e894d5787121b3ee3c29540"}
        },
        this.premierLeagueId = '2021'
    }

    makeReq(endpoint) {
        console.log(`${this.url}${endpoint}`, this.urlParams)
        return fetch(`${this.url}${endpoint}`, this.urlParams).then(res => res.json())
    }

    getStandings() {
        return this.makeReq('/competitions/2021/standings')
    }

    getMatchday(number) {
        if (number) {
            // If number is given check if it's a number, Strings are not wanted.
            if (typeof number !== 'number') throw new Error('Matchday definer should be a number.')
        } else {
            // Set number to 0 if no number given.
            number = 0
        }

        return this.makeReq(`/competitions/${this.premierLeagueId}/matches`)
        .then(res => {
            let currentMatchday = res.matches[0].season.currentMatchday

            let matchdayMatches = res.matches.filter(match => match.matchday === currentMatchday)

            console.log(matchdayMatches)
        })
    }

    getTeam(id) {
        return this.makeReq(`/teams/${id}`)
    }

    getTopScorers() {
        return this.makeReq(`/competitions/${this.premierLeagueId}/scorers`)
    }

    getPlayer(id) {
        return this.makeReq(`/players/${id}`)
    }

    getPlayerMatches(id) {
        return this.makeReq(`/players/${id}/matches`)
    }
}