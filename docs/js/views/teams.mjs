import render from "../modules/render.mjs";

const renderTemplate = () => {
    const data = {
        title: "Teams",
        meta: {}
    }
    
    const template = `
    <div>
        <h1>${data.title}</h1>
        <a href="#/teams/64">64</a>
    </div>`
    
    render(template, data.meta)
}

export default renderTemplate