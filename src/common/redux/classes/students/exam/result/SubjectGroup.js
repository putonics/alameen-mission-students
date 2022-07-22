import Subject from "./Subject"

export default class SubjectGroup {
    name = ''
    /**
     * @type {Subject}
     */
    subject

    constructor(sg) {
        this.name = sg && sg.name ? sg.name.toUpperCase() : ''
        this.subject = sg && sg.subject ? new Subject(sg.subject) : new Subject()
    }

    json = () => {
        const name = this.name
        const subject = this.subject.json()
        return ({ name, subject })
    }
}