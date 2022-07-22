import { pclasses } from "../../Constants"
import SubjectGroup from "./SubjectGroup"

export default class Exam {
    docid = ''
    name = ''
    pclass = ''
    sessionFrom = 0
    /**
     * @type {'MALE'|'FEMALE'}
     */
    gender = 'MALE'
    //////////////////
    yearOfExam = 0
    /**
     * @type {SubjectGroup}
     */
    subjectGroup

    /**
     * @param {Exam} exam 
     */
    constructor(exam) {
        this.docid = exam && exam.docid ? exam.docid : ''
        this.name = exam && exam.name ? exam.name : 'Annual Examination'
        this.pclass = exam && exam.pclass && pclasses.includes(exam.pclass) ? exam.pclass : 'XI'
        this.sessionFrom = exam && exam.sessionFrom ? (+ exam.sessionFrom) : new Date().getFullYear() - 1
        this.gender = exam && exam.gender ? exam.gender : 'MALE'
        this.yearOfExam = exam && exam.yearOfExam ? (+ exam.yearOfExam) : new Date().getFullYear()
        this.subjectGroup = exam && exam.subjectGroup ? new SubjectGroup(exam.subjectGroup) : new SubjectGroup()
    }

    json = () => {
        const { docid, name, pclass, sessionFrom, gender, yearOfExam } = this
        const subjectGroup = this.subjectGroup.json()
        return ({ docid, name, pclass, sessionFrom, gender, yearOfExam, subjectGroup })
    }
}