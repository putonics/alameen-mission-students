import { useSelector, useDispatch } from 'react-redux'
import { onlyDate } from '../../Constants'
import ClassWiseAttendance from './ClassWiseAttendance'
const COLLECTION = 'attendances'
export default class Attendance {

    classWiseAttendances = [new ClassWiseAttendance()]
    timestamp = 0
    schoolOffReason = ''
    gender = 'MALE'

    /////////////////
    createdon = 0
    modifiedon = 0
    subscriberdocid = ''
    docref

    dispatch
    bindRedux = (dispatch) => (this.dispatch = dispatch)
    dispatchAttendance = () =>
        this.dispatch({ type: 'dispatchAttendance', payload: new Attendance(this) })

    /**
     * @param {Attendance} am 
     */
    constructor(am = null) {
        this.classWiseAttendances = am && am.classWiseAttendances ? am.classWiseAttendances.map(cwa => new ClassWiseAttendance(cwa)) : []
        this.timestamp = am && am.timestamp ? am.timestamp : onlyDate().getTime()
        this.schoolOffReason = am && am.schoolOffReason ? am.schoolOffReason : null
        this.gender = am && am.gender ? am.gender : 'MALE'
        this.createdon = am && am.createdon ? am.createdon : 0
        this.modifiedon = am && am.modifiedon ? am.modifiedon : 0
        this.subscriberdocid = am && am.subscriberdocid ? am.subscriberdocid : ''
        this.dispatch = am && am.dispatch ? am.dispatch : null
    }

    /**
     * @param {Attendance} am 
     */
    set = (am = null) => {
        this.classWiseAttendances = am && am.classWiseAttendances ? am.classWiseAttendances.map(cwa => new ClassWiseAttendance(cwa)) : []
        this.timestamp = am && am.timestamp ? am.timestamp : onlyDate().getTime()
        this.schoolOffReason = am && am.schoolOffReason ? am.schoolOffReason : null
        this.gender = am && am.gender ? am.gender : 'MALE'
        this.createdon = am && am.createdon ? am.createdon : 0
        this.modifiedon = am && am.modifiedon ? am.modifiedon : 0
        this.subscriberdocid = am && am.subscriberdocid ? am.subscriberdocid : ''
    }

    json = () => {
        const { timestamp, schoolOffReason, gender } = this
        const classWiseAttendances = schoolOffReason ? [] : this.classWiseAttendances.map(cwa => cwa.json())
        return ({ classWiseAttendances, timestamp, schoolOffReason, gender })
    }

    reset = () => {
        this.classWiseAttendances = []
        this.schoolOffReason = null
    }

    reload = async (subscriberdocid, gender, timestamp) => {
        try {
            this.subscriberdocid = subscriberdocid
            this.gender = gender
            this.timestamp = onlyDate(timestamp).getTime()
            await this.load()
        } catch (ex) { }
    }

    setSchoolOffReason = schoolOffReason => {
        this.schoolOffReason = schoolOffReason
        this.dispatchAttendance()
    }
}

/**
 * @returns {Attendance}
 */
export const useAttendance = () => {
    let attendance = useSelector((state) => state.attendance)
    if (!attendance) attendance = new Attendance()
    attendance.bindRedux(useDispatch())
    return attendance
}