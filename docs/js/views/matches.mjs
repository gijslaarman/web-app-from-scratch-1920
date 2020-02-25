import render from "../modules/render.mjs"
import apiCall from "../modules/api.mjs"

// Import components
import matchBlock from "./components/component-matchblock.mjs"

const template = {
    getHtml: (number) => {
        return apiCall.getMatchday(number).then(res => res.map(match => matchBlock(match)).join(''))
    },
    render: () => {
        const data = {
            id: "matches",
            meta: {}
        }
        render.loadingState()
        template.getHtml().then(html => render.template(html, data))
    }
}

export default template.render