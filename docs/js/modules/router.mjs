import errorpage from '../views/partials/errorpage.mjs'
import homepage from '../views/home.mjs'

export default class Router {
    constructor() {
        this.routes = []
    }

    init(hash, callback) {
        // Error handling
        if (!hash) throw new Error('No hash given')
        if (typeof hash !== "string") throw new TypeError('Hash has to be a string')
        if (!callback) throw new Error('No callback defined')
        if (typeof callback !== "function") throw new TypeError('Callback has to be a function')

        // Check if the hash-route already exists
        this.routes.forEach(route => {
            if (route.hash === hash) throw new Error(`The hash-route ${hash} already exists`)
        })

        // All checks ok
        const route = {
            hash: new RegExp("^#/" + hash.replace(/:[^\s/]+/g, '([\\w-]+)') + /* check if '/' is added behind + */ "$"), // replace the hash with a regex, that also transforms all :id params ":" with a RegEx that accepts all words, this RegEx is found on StackOverflow.
            callback // callback: callback
        }

        this.routes.push(route)
    }
 
    view() {
        if (window.location.hash) {
            let hashFound

            this.routes.some(route => {
                // If route.hash matches window.location.hash
                if (window.location.hash.match(route.hash)) {
                    hashFound = true
                    let req = {}
                    return route.callback.call(this, req)
                }
            })

            if (!hashFound) {
                // Render 404 page
                console.error('Page not found')
                errorpage()
            }
        } else {
            // Render the homepage
            homepage()
        }
    }
}