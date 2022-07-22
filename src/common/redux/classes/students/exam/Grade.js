export default class Grade {
    code = '' //A+, A, B+
    title = ''//Excelent, Outstanding etc
    from = 0
    to = 0

    constructor(g) {
        this.code = g && g.code ? g.code.toUpperCase() : 'A+'
        this.title = g && g.title ? g.title : 'Excelent'
        this.from = g && g.from ? (+ g.from) : 80
        this.to = g && g.to ? (+ g.to) : 89
    }

    json = () => {
        const { code, title, from, to } = this
        return ({ code, title, from, to })
    }
}