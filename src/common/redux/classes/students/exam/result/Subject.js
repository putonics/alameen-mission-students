import { subjectCodes } from "../../Constants"
import ExamType from "./ExamType"

export default class Subject {
    code = ''
    name = ''
    /**
     * @type {ExamType}
     */
    examType

    constructor(sb) {
        this.code = sb && sb.code && subjectCodes.includes(sb.code.toUpperCase()) ? sb.code.toUpperCase() : subjectCodes[14]
        this.name = sb && sb.name ? sb.name.toUpperCase() : subjectCodes[14] //BNGA is in index 14
        this.examType = sb && sb.examType ? new ExamType(sb.examType) : new ExamType()
    }

    json = () => {
        const { code, name } = this
        const examType = this.examType.json()
        return ({ code, name, examType })
    }
}