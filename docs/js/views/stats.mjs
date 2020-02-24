import render from "../modules/render.mjs"
import Api from "../modules/api.mjs"
const api = new Api

const renderTemplate = () => {
    const data = {
        call: api.getTopScorers(),
        meta: {
            component: "stats"
        }
    }

    const template = `<div id="matches"><img src="./img/spinner.svg" /></div>`
    
    render(template, data.meta)
}

export default renderTemplate