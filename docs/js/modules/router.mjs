import errorpage from '../views/partials/errorpage.mjs'

export default class Router {
    constructor() {
        this.routes = []
    }

    init(hash, callback) {
        // Error handling for creating new routes
        if (!hash && hash != '') throw new Error('No hash given')
        if (typeof hash !== "string") throw new TypeError('Hash has to be a string')
        if (!callback) throw new Error('No callback defined')
        if (typeof callback !== "function") throw new TypeError('Callback has to be a function')

        // Check if the hash-route already exists
        this.routes.forEach(route => {
            if (route.hash === hash) throw new Error(`The hash-route ${hash} already exists`)
        })

        // All checks ok
        const route = {
            hash: new RegExp(`^${hash === "" ? '' : '#/'}` + hash.replace(/:[^\s/]+/g, '([\\w-]+)') + "$"), // replace the hash with a regex, that also transforms all :id params ":" with a RegEx that accepts all words, this RegEx is found on StackOverflow.
            callback // callback: callback
        }

        this.routes.push(route)
    }
 
    view() {
        let urlHash = window.location.hash
        let hashFound = false
        // console.log(urlHash.slice(1))

        if (urlHash.slice(-1) === '/') {
            // If user does not add a forward slash behind their url, add it.
            urlHash = urlHash.slice(0, -1)
        }

        if (urlHash.charAt(1) !== '/') { urlHash = urlHash.slice(0,1) + '/' + urlHash.slice(1) } // Add '/' between # & route #teams > #/teams

        if (urlHash === '#') {
            // If hash is only # because we removed the '/' then set it empty so it can render Home.
            urlHash = ''
        }

        this.routes.some(route => {
            // If route.hash matches window.location.hash
            if (urlHash.match(route.hash)) {
                hashFound = true
                let req = {}
                return route.callback.call(this, req)
            }
        })

        if (!hashFound && urlHash !== '/') {
            // Render 404 page
            errorpage()
        }
    }
}