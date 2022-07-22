export default class StudentResult {
    name = ''
    regno = ''
    appeared = true
    marks = 0

    /**
     * @param {StudentResult} ss 
     */
    constructor(ss = null) {
        this.name = ss && ss.name ? ss.name : null
        this.regno = ss && ss.regno ? ss.regno : null
        this.appeared = ss && ss.appeared ? ss.appeared : true
        this.marks = ss && ss.marks ? (+ ss.marks) : 0
    }

    json = () => {
        const { name, regno, appeared, marks } = this
        return ({ name, regno, appeared, marks })
    }

    setPresent = () => {
        this.appeared = true
    }
    setAbscent = () => {
        this.appeared = false
    }
}