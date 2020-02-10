import render from "../modules/render.mjs";

const renderTemplate = () => {
    const data = {
        title: "TeamDetails",
        meta: {}
    }
    
    const template = `
    <div>
        <h1>${data.title}</h1>
    </div>`
    
    render(template, data.meta)
}

export default renderTemplate