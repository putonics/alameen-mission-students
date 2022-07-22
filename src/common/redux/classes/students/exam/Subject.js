import { subjectCodes } from "../../Constants"
import ExamType from "./ExamType"

export default class Subject {
    code = ''
    name = ''
    /**
     * @type {Array<ExamType>}
     */
    examTypes = []

    constructor(sb) {
        this.name = sb && sb.name ? sb.name.toUpperCase() : subjectCodes[14] //BNGA is in index 14
        this.code = sb && sb.code && subjectCodes.includes(sb.code.toUpperCase()) ? sb.code.toUpperCase() : subjectCodes[14]
        this.examTypes = sb && sb.examTypes && sb.examTypes.length > 0 ? sb.examTypes.map(et => new ExamType(et)) : [new ExamType()]
    }

    json = () => {
        const { code, name } = this
        const examTypes = this.examTypes.map(et => et.json())
        return ({ code, name, examTypes })
    }
}