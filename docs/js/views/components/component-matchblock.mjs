const getMeta = (matchData) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const matchDate = new Date(matchData.utcDate)
    const readableDate = `${days[matchDate.getDay()]}, ${matchDate.getDate()}/${matchDate.getMonth().length === 1 ? '0' + (matchDate.getMonth() + 1) : matchDate.getMonth() + 1}`
    let matchStatus

    switch(matchData.status) {
        case 'FINISHED':
            matchStatus = 'FT'
        break
        case 'SCHEDULED':
            matchStatus = `${matchDate.getHours()}:${matchDate.getMinutes() < 10 ? '0' + matchDate.getMinutes() : matchDate.getMinutes()}`
        break
    }

    return `<div class="status">${matchStatus}</div><div class="${matchData.status === 'FINISHED' ? 'FT' : null} date">${readableDate}</div>`
}

const component = (matchData) => {
    console.log(matchData)

    const template = `
        <a class="match-block" href="#/match/${matchData.id}">
            <div class="teams">
                <div class="team ${matchData.score.winner === "AWAY_TEAM" ? 'lost' : ''}">
                    <span>
                    ${matchData.homeTeam.name}
                    </span>
                    ${matchData.status !== "SCHEDULED" && matchData.status !== "POSTPONED" ? `<span>${matchData.score.fullTime.homeTeam}</span>` : ''}
                </div>
                <div class="team ${matchData.score.winner === "HOME_TEAM" ? 'lost' : ''}">
                    <span>
                    ${matchData.awayTeam.name}
                    </span>
                    ${matchData.status !== "SCHEDULED" && matchData.status !== "POSTPONED" ? `<span>${matchData.score.fullTime.awayTeam}</span>` : ''}
                </div>
            </div>
            <div class="meta">
                ${getMeta(matchData)}
            </div>
        </a>
    `

    return template
}

export default component

