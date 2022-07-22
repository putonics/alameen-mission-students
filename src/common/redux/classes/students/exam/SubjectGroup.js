import Subject from "./Subject"

export default class SubjectGroup {
    name = ''
    /**
     * @type {Array<Subject>}
     */
    subjects = []

    constructor(sg) {
        this.name = sg && sg.name ? sg.name.toUpperCase() : ''
        this.subjects = sg && sg.subjects && sg.subjects.length > 0 ? sg.subjects.map(sb => new Subject(sb)) : []
    }

    json = () => {
        const name = this.name
        const subjects = this.subjects.map(sb => sb.json())
        return ({ name, subjects })
    }
}