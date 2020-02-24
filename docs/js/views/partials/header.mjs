/* 

Used to handle navigation header, to set active class on the current page. 
Dynamic so when you add an anchor in the nav it will also work.

*/

const JS_HOOK_NAVIGATION_LINK = '[navigation-link]'
const navigationLinks = document.querySelectorAll(JS_HOOK_NAVIGATION_LINK)

function findActiveLink() {
    // Find the anchor that corresponds with the hash in the window.location + return it.
    let currentLocationHash = window.location.hash
    currentLocationHash === '' ? currentLocationHash = '#' : null
    let currentLink

    navigationLinks.forEach(link => {
        const linkHref = '#' + link.href.split('#').pop() // create href as #/example || #/example/:idthingy
        if (linkHref === currentLocationHash) {
            currentLink = link
        }
    })

    return currentLink 
}

function changeActiveLink(currentActive) {
    const previousActive = document.querySelector(`${JS_HOOK_NAVIGATION_LINK}.active`)

    if (currentActive === undefined)  {
        previousActive ? previousActive.classList.remove('active') : null
        return
    }

    previousActive ? previousActive.classList.remove('active') : null
    currentActive.classList.add('active')
}

window.addEventListener('hashchange', function() {
    changeActiveLink(findActiveLink())
})
changeActiveLink(findActiveLink())

export default navigationLinks