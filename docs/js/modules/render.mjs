const renderPage = (template, meta) => {
    const main = document.querySelector('main')

    // Add the template
    while (main.firstChild) main.removeChild(main.firstChild)

    // Set id of component
    meta.component ? main.id = meta.component : null

    return main.insertAdjacentHTML('afterbegin', template)
}

export default renderPage