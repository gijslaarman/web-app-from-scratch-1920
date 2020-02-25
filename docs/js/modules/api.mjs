const apiCall = {
    settings: {
        url: 'https://api.football-data.org/v2',
        urlParams: {
            headers: { "X-Auth-Token": "0390172f7e894d5787121b3ee3c29540" }
        },
        premierLeagueId: '2021'
    },

    makeReq: async (endpoint) => {
        const fetchCall = await fetch(`${apiCall.settings.url}${endpoint}`, apiCall.settings.urlParams)
        const jsonFormat = await fetchCall.json()
        return jsonFormat
    },

    getCompetition: () => {
        return apiCall.makeReq(`/competitions/${apiCall.settings.premierLeagueId}`)
    },

    getStandings: () => {
        return apiCall.makeReq(`/competitions/${apiCall.settings.premierLeagueId}/standings`)
    },

    getMatchday: (number) => {
        if (number) {
            // If number is given check if it's a number, Strings are not wanted.
            if (typeof number !== 'number') throw new Error('Matchday definer should be a number.')
        } else {
            // Set number to 0 if no number given.
            number = 0
        }

        return apiCall.makeReq(`/competitions/${apiCall.settings.premierLeagueId}/matches`)
            .then(res => {
                let currentMatchday = res.matches[0].season.currentMatchday
                let matchdayMatches = res.matches.filter(match => match.matchday === (currentMatchday + number))
                return matchdayMatches
            })
    },

    getMatch: (id) => {
        if (!id) throw new Error('getMatch(): no id given')
        return apiCall.makeReq(`/matches/${id}`)
    },

    getTeam: (id) => {
        if (!id) throw new Error('getTeam(): no id given')
        return apiCall.makeReq(`/teams/${id}`)
    },

    getTeams: () => {
        return apiCall.makeReq(`/competitions/${apiCall.settings.premierLeagueId}/teams`)
    }
}

export default apiCall