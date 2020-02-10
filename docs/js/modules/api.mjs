// const api = {
//     url: 'https://api.football-data.org/v2',
//     params: {
//         headers: {"X-Auth-Token": "0390172f7e894d5787121b3ee3c29540"}
//     }
// }

export default class Api {
    constructor() {
        this.url = 'https://api.football-data.org/v2'
        this.headers = {
            "X-Auth-Token": "0390172f7e894d5787121b3ee3c29540"
        }
        this.endpoint
    }

    get(endpoint) {
        if (!endpoint) {
            endpoint = ''
        }

        console.log(`${this.url}${endpoint}`, this.headers)

        fetch(`${this.url}${endpoint}`, this.headers).then(res => res.json()).then(result => console.log(result))
    }
    log() {
        console.log(this)
    }
}