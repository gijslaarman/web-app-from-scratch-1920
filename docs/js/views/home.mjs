import renderPage from "../modules/renderpage.mjs"
import Api from "../modules/api.mjs"

const renderTemplate = () => {
    const data = {
        title: "hello",
        meta: {}
    }

    const api = new Api

    api.get('/competitions/2021')
    
    const template = `
    <div>
        <h1>${data.title}</h1>
    </div>`
    
    renderPage(template, data.meta)
}

export default renderTemplate