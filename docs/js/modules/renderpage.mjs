import header from "../views/partials/header.mjs"
import footer from "../views/partials/footer.mjs"

const renderPage = (template, meta) => {
    const app = document.querySelector('body')
    const main = document.querySelector('main')

    // What to do if it's 404
    if (meta.error) {
        document.querySelector('header').remove()
        document.querySelector('footer').remove()
        main.innerHTML = ""
        return main.insertAdjacentHTML('afterbegin', template)
    }

    // If the Header & footer are not rendered, rerender them again. (For example a 404 page removes the header & footer, this re-renders them again.)
    !document.querySelector('header') ? app.insertAdjacentHTML('afterbegin', header) : false
    !document.querySelector('footer') ? app.insertAdjacentHTML('beforeend', footer) : false

    // Add the template
    main.innerHTML = ""
    main.insertAdjacentHTML('afterbegin', template)
}

export default renderPage