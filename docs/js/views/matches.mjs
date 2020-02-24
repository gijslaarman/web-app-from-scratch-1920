import render from "../modules/render.mjs"
import Api from "../modules/api.mjs"
const api = new Api

// Import components
import matchBlock from "./components/component-matchblock.mjs"

const getMatchdayData = (number) => {
    let promise = new Promise((resolve, reject) => {
        resolve(api.getMatchday(number).then(res => {
            return res.map(match => {
                return matchBlock(match)
            })
        }))
    })

    promise.then(array => {
        let element = document.getElementById('matches')
        while (element.firstChild) element.removeChild(element.firstChild)
        element.insertAdjacentHTML('afterbegin', array.join(''))
    })
}

const renderTemplate = () => {
    const data = {
        component: "matches",
        meta: {}
    }

    getMatchdayData()

    const template = `<section id="loading"><img src="./img/spinner.svg" /></section>`
    
    render(template, data)
}

export default renderTemplate