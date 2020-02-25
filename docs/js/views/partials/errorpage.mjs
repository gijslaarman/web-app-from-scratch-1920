import render from "../../modules/render.mjs";

const renderTemplate = (errorStatusCode) => {
    const data = {
        id: "error",
        title: "404 Page not found",
        error: {
            statusCode: errorStatusCode
        }
    }

    const template = `
    <div>
        <h1>${data.title}</h1>
        <a href="#">Back to home</a>
    </div>`

    render.template(template, data)
}

export default renderTemplate