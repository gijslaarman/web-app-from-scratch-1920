import render from "../modules/render.mjs"
import apiCall from "../modules/api.mjs"

const getDate = (matchData) => {
    const today = dayjs(new Date)
    const matchDate = dayjs(matchData.utcDate)
    const dayDifference = matchDate.diff(today, 'day')

    switch (dayDifference - 1) {
        case 0:
            return 'Today'
        case -1:
            return 'Yesterday'
        case 1:
            return 'Tomorrow'
        default:
            return matchDate.format('ddd, DD/MM, HH:mm')
    }
}

const getMeta = (matchData) => {
    const readeableStatuses = {
        FINISHED: 'FT',
        SCHEDULED: '',
        IN_PLAY: 'Currently playing',
        POSTPONED: 'Time TBD'
    }

    return `<div class="wrapper">
                <span class="status ${matchData.status === 'SCHEDULED' ? 'hide' : ''}">${readeableStatuses[matchData.status]}</span>
                <span class="date">${matchData.status !== 'POSTPONED' ? getDate(matchData) : 'Postponed'}</span>
            </div>`
}

const createTeam = (team) => {
    return `<div class="team">
                <img src="${team.crestUrl}"/>
                <h3>${team.shortName}</h3>
            </div>
    `
}

const createScore = (match) => {
    if (match.status === 'FINISHED' || match.status === 'IN_PLAY') {
        return `
            <span>${match.score.fullTime.homeTeam}</span>
            <span>-</span>
            <span>${match.score.fullTime.awayTeam}</span>
        `
    } else {
        return `<span>-</span>`
    }
}

const getHtml = (id) => {
    return apiCall.getMatch(id).then(matchData => {
        const homeTeam = JSON.parse(localStorage.getItem(matchData.match.homeTeam.id))
        const awayTeam = JSON.parse(localStorage.getItem(matchData.match.awayTeam.id))
        const teams = { homeTeam, awayTeam }

        console.log(matchData)
        return `<div class="details ${matchData.match.status}">
                    <div class="top">
                        ${getMeta(matchData.match)}
                    </div>
                    <div class="teams">
                        ${createTeam(homeTeam)}
                        <div class="score">
                            ${createScore(matchData.match)}
                        </div>
                        ${createTeam(awayTeam)}
                    </div>
                    <div class="venue">
                        <p>Venue: <span>${matchData.match.venue}</span></p>
                    </div>
                </div>
                `
    })
}

const renderTemplate = () => {
    const data = {
        id: "match",
        headerClass: 'match',
        meta: {}
    }

    let id = window.location.hash.split('/').pop()

    render.loadingState()
    getHtml(id).then(html => render.template(html, data))
}

export default renderTemplate