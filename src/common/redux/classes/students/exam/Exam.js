import { insertIntoFirestore, updateIntoFirestore } from "app/firebase/Firebase"
import { DocumentReference } from "firebase/firestore"
import { pclasses } from "../../Constants"
import { COLLECTION_EXAMS } from "./Exams"
import Grade from "./Grade"
import SubjectGroup from "./SubjectGroup"

export default class Exam {
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
     * @type {Array<SubjectGroup>}
     */
    subjectGroups = []
    /**
     * @type {Array<Grade>}
     */
    grades = []
    //////////////////
    createdon = 0
    modifiedon = 0
    subscriberdocid = ''
    ////////////////////
    /**
     * @type {DocumentReference}
     */
    docref

    /**
     * @param {Exam} exam 
     */
    constructor(exam) {
        this.name = exam && exam.name ? exam.name : 'Annual Examination'
        this.pclass = exam && exam.pclass && pclasses.includes(exam.pclass) ? exam.pclass : 'XI'
        this.sessionFrom = exam && exam.sessionFrom ? (+ exam.sessionFrom) : new Date().getFullYear() - 1
        this.gender = exam && exam.gender ? exam.gender : 'MALE'
        this.yearOfExam = exam && exam.yearOfExam ? (+ exam.yearOfExam) : new Date().getFullYear()
        this.subjectGroups = exam && exam.subjectGroups && exam.subjectGroups.length > 0
            ? exam.subjectGroups.map(sg => new SubjectGroup(sg))
            : []
        this.grades = exam && exam.grades && exam.grades.length > 0
            ? exam.grades.map(g => new Grade(g))
            : []
        this.createdon = exam && exam.createdon ? (+exam.createdon) : new Date().getTime()
        this.modifiedon = exam && exam.modifiedon ? (+exam.modifiedon) : this.createdon
        this.subscriberdocid = exam && exam.subscriberdocid ? exam.subscriberdocid : ''
        this.docref = exam && exam.docref ? exam.docref : null
    }

    json = () => {
        const { name, pclass, sessionFrom, gender, yearOfExam } = this
        const subjectGroups = this.subjectGroups.map(sg => sg.json())
        const grades = this.grades.map(g => g.json())
        return ({ name, pclass, sessionFrom, gender, yearOfExam, subjectGroups, grades })
    }

    insert = async () => {
        await insertIntoFirestore(this.subscriberdocid, COLLECTION_EXAMS, this.json())
    }

    update = async () => {
        if (this.docref) {
            await updateIntoFirestore(this.docref, this.json())
        }
    }
}