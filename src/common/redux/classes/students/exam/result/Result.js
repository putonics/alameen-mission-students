import Exam from "./Exam"
import StudentResult from "./StudentResult"

/*
Result document should be created subject-wise so that the teacher
assigned for a particular subject can independently and securely put
the marks of the students.
ADMIN can put all the marks at the same time.
After each 30 entry there should be a save button to avoid data loss
of the entered marks. 
*/
export default class Result {
    exam = new Exam()
    teacher = { docid: '', name: '' } //tagged Teacher who can modify this result
    /**
     * @type {Array<StudentResult>}
     */
    students = []

    /**
     * @param {Result} r 
     */
    constructor(r) {
        this.exam = r && r.exam ? r.exam : new Exam()
        this.teacher = r && r.teacher ? r.teacher : { docid: '', name: '' }
        this.students = r && r.students && r.students.length > 0 ? r.students.map(s => new StudentResult(s)) : []
    }
}