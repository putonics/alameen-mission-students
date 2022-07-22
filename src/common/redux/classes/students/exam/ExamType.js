export const EXAM_TYPE = ['THEORY', 'WRITTEN', 'PRACTICAL', 'ORAL', 'VIVA', 'PROJECT', 'ASSIGNMENT']
export default class ExamType {
    /**
     * @type {'THEORY' | 'WRITTEN' | 'PRACTICAL' | 'ORAL' | 'VIVA' | 'PROJECT' | 'ASSIGNMENT'}
     */
    type = 'THEORY'
    timestamp = 0 //Date & time schedule of exam
    fullMarks = 0

    constructor(et) {
        this.et = et && et.type && EXAM_TYPE.includes(et.type.toUpperCase()) ? et.type.toUpperCase() : EXAM_TYPE[0]
        this.timestamp = et && et.timestamp ? et.timestamp : new Date().getTime()
        this.fullMarks = et && et.fullMarks && et.fullMarks > 0 ? (+ et.fullMarks) : 100
    }

    json = () => {
        const { type, timestamp, fullMarks } = this
        return ({ type, timestamp, fullMarks })
    }
}