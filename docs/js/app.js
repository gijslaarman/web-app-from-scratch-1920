import Router from './modules/router.mjs'
import Header from './views/partials/header.mjs' // Import header script to set navigation anchors as active.

// Views
import Match from './views/match.mjs'
import Matches from './views/matches.mjs'
import TeamDetails from './views/teamDetail.mjs'
import Standings from './views/standings.mjs'
import Stats from './views/stats.mjs'

// Errorpage
import Errorpage from './views/partials/errorpage.mjs'

// Hash router set-up
const router = new Router()
const routes = [
    // {hash: Function}, the # in the routes are automatically placed before.
    {'': Matches},
    {'standings': Standings},
    {'statistics': Stats},
    {'teams/:id': TeamDetails},
    {'match/:id': Match}
]

routes.forEach(route => {
    const routingHash = Object.keys(route)[0] // find the hash to base route off.
    // Initialize the routes in the router, {hash: function}
    router.init(routingHash, route[routingHash])
})
router.setErrorPage(Errorpage)

// Detect hash changes and render the view based of that.
window.addEventListener('hashchange', () => {
    router.view()
})
router.view()