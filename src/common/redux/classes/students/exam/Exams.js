import { useSelector, useDispatch } from 'react-redux'
import Exam from './Exam'

export const COLLECTION_EXAMS = 'exams'

export default class Exams {
    subscriberdocid = ''
    pclass = ''
    /**
     * @type {'MALE'|'FEMALE'}
     */
    gender = 'MALE'
    //////////////
    yearOfExam = 0
    /**
     * @type {Array<Exam>}
     */
    list

    dispatch
    bindRedux = (dispatch) => (this.dispatch = dispatch)
    dispatchExams = () =>
        this.dispatch({ type: 'dispatchExams', payload: new Exams(this) })

    /**
     * @param {Exams} exam
     */
    constructor(exam = null) {
        this.subscriberdocid = exam && exam.subscriberdocid ? exam.subscriberdocid : ''
        this.pclass = exam && exam.pclass ? exam.pclass : ''
        this.gender = exam && exam.gender ? exam.gender : 'MALE'
        this.yearOfExam = exam && exam.yearOfExam ? exam.yearOfExam : new Date().getFullYear()
        this.list = exam && exam.list ? exam.list.map(e => new Exam(e)) : []
        this.dispatch = exam && exam.dispatch ? exam.dispatch : null
    }
}

/**
 * @returns {Exams}
 */
export const useExams = () => {
    let exams = useSelector((state) => state.exams)
    if (!exams) exams = new Exams()
    exams.bindRedux(useDispatch())
    return exams
}