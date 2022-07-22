import { createStore } from "redux"
// import Institutes from "./classes/Institutes"
import Student from "./classes/students/Student"
import Attendance from "./classes/students/attendance/Attendance"
import Fees from "./classes/fees/Fees"

const initstate = {
    // institutes: new Institutes(),
    student: new Student(),
    attendance: new Attendance(),
    fees: new Fees(),
}

export const Store = createStore((state = initstate, action) => {
    switch (action.type) {
        // case 'dispatchInstitutes':
        //     return { ...state, institutes: action.payload }
        case 'dispatchStudents':
            return { ...state, student: action.payload }
        case 'dispatchAttendance':
            return { ...state, attendance: action.payload }
        case 'dispatchFees':
            return { ...state, fees: action.payload }
        default:
            return state
    }
})