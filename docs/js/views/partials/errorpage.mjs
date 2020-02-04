import renderPage from "../../modules/renderpage.mjs";

const renderTemplate = () => {
    const data = {
        title: "404 Page not found",
        meta: {error: 'error'}
    }
    
    const template = `
    <div>
        <h1>${data.title}</h1>
        <a href="#">Back to home</a>
    </div>`
    
    renderPage(template, data.meta)
}

export default renderTemplate