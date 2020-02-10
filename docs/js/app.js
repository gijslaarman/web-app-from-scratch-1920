import Router from './modules/router.mjs'

// Views
import Teams from './views/teams.mjs'
import TeamDetails from './views/teamDetail.mjs'
import Home from './views/home.mjs'

// Hash router set-up
const router = new Router()
const routes = [
    // {hash: Function}, the # in the routes are automatically placed before.
    {'': Home},
    {'teams': Teams},
    {'teams/:id': TeamDetails}
]

routes.forEach(route => {
    const routingHash = Object.keys(route)[0] // find the hash to base route off.
    // Initialize the routes in the router, {hash: function}
    router.init(routingHash, route[routingHash])
})

console.log(router)

// Detect hash changes and render the view based of that.
window.addEventListener('hashchange', () => {
    router.view()
})
router.view()