const render = {
    settings: {
        app: document.querySelector('main'),
        header: document.querySelector('header')
    },
    loadingState: () => {
        const loadingTemplate = `<section id="loading"><img src="./img/spinner.svg"/></section>`
        render.template(loadingTemplate)
    },
    template: (template, data) => {
        const renderElement = render.settings.app
        const header = render.settings.header
        // If an id is given, set an ID on the element
        data && data.id ? renderElement.id = data.id : null
        data && data.headerClass ? header.classList.add(data.headerClass) : header.className = ''

        // While app still contains elements remove them, faster than setting innerHTML to "".
        while (renderElement.firstChild) renderElement.removeChild(renderElement.firstChild)

        // Insert the template inside the render element.
        return renderElement.insertAdjacentHTML('afterbegin', template)
    }
}

export default render