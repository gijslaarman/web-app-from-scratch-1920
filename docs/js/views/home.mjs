import renderPage from "../modules/renderpage.mjs";

const renderTemplate = () => {
    const data = {
        title: "hello",
        meta: {}
    }
    
    const template = `
    <div>
        <h1>${data.title}</h1>
    </div>`
    
    renderPage(template, data.meta)
}

export default renderTemplate