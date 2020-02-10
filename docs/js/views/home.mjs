import render from "../modules/render.mjs"
import Api from "../modules/api.mjs"

// Import components
import matchday from './components/matchday.mjs'

const renderTemplate = () => {
    const data = {
        title: "hello",
        meta: {}
    }

    const api = new Api

    // api.getStandings().then(res => console.log(res))
    // api.getCurrentMatchday().then(res => console.log(res))
    // api.getMatchday(0).then(res => console.log(res))

    const template = `
    <div>
        <h1>${data.title}</h1>
        ${matchday()}
    </div>`
    
    render(template, data.meta)
}

export default renderTemplate