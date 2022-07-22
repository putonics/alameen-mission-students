import { useSelector, useDispatch } from 'react-redux'
import Parent from "./Parent"
import DropoutRemarks from "./DropoutRemarks"
import Address from "./Address"
import BankAccount from "./BankAccount"
import BoardExam from "./BoardExam"
import CasteCertificate from "./CasteCertificate"
import HandicappedCertificate from "./HandicappedCertificate"
import FamilyMemberFromMission from "./FamilyMemberFromMission"
import SiblingStudyingInMission from "./SiblingStudyingInMission"
import { APIURL, bloodGroups, castes, genders, mediums, pclasses, statuses, streams } from "../Constants"
import Visitor from "./Visitor"
import FeePaidItem from "../fees-received/FeePaidItem"
import CryptoJS from 'crypto-js'
import Institute from '../Institutes'
import Fees from '../fees/Fees'
////////////////////////////////////////////////////////////////////////////////////
const SECRET = 'v%3J-r#7$|pA+V{H9<tb/}u=8M\'D"txL)w(C*5K^eo6Sb\\G,5.y+n4F1~Z!0@q'
////////////////////////////////////////////////////////////////////////////////////
const encrypt = data => CryptoJS.AES.encrypt(JSON.stringify(data), SECRET).toString()
const decrypt = cipher => JSON.parse(CryptoJS.AES.decrypt(cipher, SECRET).toString(CryptoJS.enc.Utf8))
////////////////////////////////////////////////////////////////////////////////////
const setSession = (data) => {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1) //Validity: 1 day
    const accessToken = encrypt({ data, timestamp: tomorrow.getTime() })
    window.localStorage.setItem('accessToken', accessToken)
}
const removeSession = () => window.localStorage.removeItem('accessToken')
const getSession = () => {
    const accessToken = window.localStorage.getItem('accessToken')
    try {
        if (accessToken) {
            const { data, timestamp } = decrypt(accessToken)
            if (timestamp > new Date().getTime()) {
                return data
            }
        }
    } catch (ex) {

    }
    removeSession()
    return null
}

export default class Student {
    //Necessary details
    regno = ''
    name = ''
    admissionDate = 0
    pclass = ''//present class
    stream = ''
    medium = ''
    sessionFrom = 0
    sessionTo = 0
    fee = 0
    feeStartingMonth = 0
    /**
     * @type {Array<FeePaidItem>}
     */
    feesPaid = []
    mobile = 0
    whatsapp = 0
    email = ''
    /**
     * @type {'ACTIVE'|'DROPOUT'}
     */
    status
    dropoutRemarks = new DropoutRemarks()
    gender = ''
    //Student's information details
    dob = 0
    aadhar = 0
    caste = ''
    casteCertificate = new CasteCertificate()
    bloodGroup = ''
    handicapped = false
    handicappedCertificate = new HandicappedCertificate()
    orphan = false
    orphanRemarks = ''
    previousBranchName = ''
    banglarsikshaId = ''
    kanyashreeId = ''
    aikyashreeId = ''
    fc = false
    nc = false
    //Previous School Details (for MP/HS passed candidates)
    lastBoardExam = new BoardExam()
    //Address Details
    addressPermanent = new Address()
    addressPresent = new Address()
    //Parents information
    father = new Parent()
    mother = new Parent()
    visitor1 = new Visitor()
    visitor2 = new Visitor()
    studentLogin = true
    //Bank details
    bankAccount = new BankAccount()
    //Family Members From Mission
    familyMembersFromMissionFlag = false
    familyMembersFromMission = [new FamilyMemberFromMission()]
    //Siblings studyings in Mission
    siblingsStudyingInMissionFlag = false
    siblingsStudyingInMission = [new SiblingStudyingInMission()]
    /////////////////
    createdon = 0
    modifiedon = 0
    subscriberdocid = ''
    docref
    /////////////////
    /**
     * @type {Institute}
     */
    institute
    /**
     * @type {Fees}
     */
    fees

    dispatch
    bindRedux = (dispatch) => (this.dispatch = dispatch)
    dispatchStudent = () => this.dispatch({ type: 'dispatchStudent', payload: new Student(this) })
    gotoSigninPage = () => {//hard reload
        const a = document.createElement("a")
        a.href = '/'
        a.click()
        document.body.removeChild(a)
    }

    /**
     * @param {Student} student 
     */
    constructor(student) {
        //Necessary details
        this.regno = student && student.regno ? student.regno.toUpperCase() : ''
        this.name = student && student.name ? student.name.toUpperCase() : ''
        this.admissionDate = student && student.admissionDate ? new Date(new Date(student.admissionDate).toDateString()).getTime() : 0
        this.pclass = student && student.pclass ? student.pclass.toUpperCase() : pclasses[0] //present class
        this.stream = student && student.stream ? student.stream.toUpperCase() : streams[0]
        this.medium = student && student.medium ? student.medium.toUpperCase() : mediums[0]
        this.sessionFrom = student && student.sessionFrom ? (+ student.sessionFrom) : new Date().getFullYear()
        this.sessionTo = student && student.sessionTo ? (+ student.sessionTo) : new Date().getFullYear()
        this.fee = student && student.fee ? (+ student.fee) : 0
        this.feeStartingMonth = student && student.feeStartingMonth ? (+ student.feeStartingMonth) : 0
        this.feesPaid = student && student.feesPaid ? student.feesPaid.map(fp => new FeePaidItem(fp)) : []
        this.mobile = student && student.mobile ? (+ student.mobile) : 0
        this.whatsapp = student && student.whatsapp ? (+ student.whatsapp) : 0
        this.email = student && student.email ? student.email : ''
        this.status = student && student.status ? student.status.toUpperCase() : statuses[0]
        this.dropoutRemarks = student && student.dropoutRemarks ? new DropoutRemarks(student.dropoutRemarks) : null
        this.gender = student && student.gender ? student.gender.toUpperCase() : genders[0]
        //Student's information details
        this.dob = student && student.dob ? new Date(new Date(student.dob).toDateString()).getTime() : 0
        this.aadhar = student && student.aadhar ? (+ student.aadhar) : 0
        this.caste = student && student.caste ? student.caste.toUpperCase() : castes[0]
        this.casteCertificate = student && student.casteCertificate ? new CasteCertificate(student.casteCertificate) : null
        this.bloodGroup = student && student.bloodGroup ? student.bloodGroup : bloodGroups[0]
        this.handicapped = student && student.handicapped && student.handicapped !== 'false' ? true : false
        this.handicappedCertificate = student && student.handicappedCertificate ? new HandicappedCertificate(student.handicappedCertificate) : null
        this.orphan = student && student.orphan && student.orphan !== 'false' ? true : false
        this.orphanRemarks = student && student.orphanRemarks ? student.orphanRemarks : null
        this.previousBranchName = student && student.previousBranchName ? student.previousBranchName.toUpperCase() : ''
        this.banglarsikshaId = student && student.banglarsikshaId ? student.banglarsikshaId.toUpperCase() : null
        this.kanyashreeId = student && student.kanyashreeId ? student.kanyashreeId.toUpperCase() : null
        this.aikyashreeId = student && student.aikyashreeId ? student.aikyashreeId.toUpperCase() : null
        this.fc = student && student.fc && student.fc !== 'false' ? true : false
        this.nc = student && student.nc && student.nc !== 'false' ? true : false
        //Previous School Details (for MP/HS passed candidates)
        this.lastBoardExam = student && student.lastBoardExam ? new BoardExam(student.lastBoardExam) : null
        //Address Details
        this.addressPermanent = student && student.addressPermanent ? new Address(student.addressPermanent) : new Address()
        this.addressPresent = student && student.addressPresent ? new Address(student.addressPresent) : new Address()
        //Parents information
        this.father = student && student.father ? new Parent(student.father) : new Parent()
        this.mother = student && student.mother ? new Parent(student.mother) : new Parent()
        this.visitor1 = student && student.visitor1 ? new Visitor(student.visitor1) : null
        this.visitor2 = student && student.visitor2 ? new Visitor(student.visitor2) : null
        this.studentLogin = student && student.studentLogin ? student.studentLogin : false
        //Bank details
        this.bankAccount = student && student.bankAccount ? new BankAccount(student.bankAccount) : new BankAccount()
        //Family member from mission
        this.familyMembersFromMission = student && student.familyMembersFromMission && student.familyMembersFromMission.length > 0 ? student.familyMembersFromMission.map(m => new FamilyMemberFromMission(m)) : []
        this.familyMembersFromMissionFlag = student && student.familyMembersFromMission && student.familyMembersFromMission.length > 0 ? true : false
        //Sibling studying in mission
        this.siblingsStudyingInMission = student && student.siblingsStudyingInMission && student.siblingsStudyingInMission.length > 0 ? student.siblingsStudyingInMission.map(m => new SiblingStudyingInMission(m)) : []
        this.siblingsStudyingInMissionFlag = student && student.siblingsStudyingInMission && student.siblingsStudyingInMission.length > 0 ? true : false
        //////////////////////////////////////////////////////////////////////////////////////////
        this.createdon = student && student.createdon ? student.createdon : 0
        this.modifiedon = student && student.modifiedon ? student.modifiedon : 0
        this.subscriberdocid = student && student.subscriberdocid ? student.subscriberdocid : null
        this.docref = student && student.docref ? student.docref : null
        this.dispatch = student && student.dispatch ? student.dispatch : null
        //////////////////////////////////////////////////////////////////////////////////////////
        this.institute = student && student.institute ? new Institute(student.institute) : null
        this.fees = student && student.fees ? new Fees(student.fees) : null
    }
    /**
     * @param {Student} student 
     */
    set = (student) => {
        //Necessary details
        this.regno = student && student.regno ? student.regno.toUpperCase() : ''
        this.name = student && student.name ? student.name.toUpperCase() : ''
        this.admissionDate = student && student.admissionDate ? new Date(new Date(student.admissionDate).toDateString()).getTime() : 0
        this.pclass = student && student.pclass ? student.pclass.toUpperCase() : pclasses[0] //present class
        this.stream = student && student.stream ? student.stream.toUpperCase() : streams[0]
        this.medium = student && student.medium ? student.medium.toUpperCase() : mediums[0]
        this.sessionFrom = student && student.sessionFrom ? (+ student.sessionFrom) : new Date().getFullYear()
        this.sessionTo = student && student.sessionTo ? (+ student.sessionTo) : new Date().getFullYear()
        this.fee = student && student.fee ? (+ student.fee) : 0
        this.feeStartingMonth = student && student.feeStartingMonth ? (+ student.feeStartingMonth) : 0
        this.feesPaid = student && student.feesPaid ? student.feesPaid.map(fp => new FeePaidItem(fp)) : []
        this.mobile = student && student.mobile ? (+ student.mobile) : 0
        this.whatsapp = student && student.whatsapp ? (+ student.whatsapp) : 0
        this.email = student && student.email ? student.email : ''
        this.status = student && student.status ? student.status.toUpperCase() : statuses[0]
        this.dropoutRemarks = student && student.dropoutRemarks ? new DropoutRemarks(student.dropoutRemarks) : null
        this.gender = student && student.gender ? student.gender.toUpperCase() : genders[0]
        //Student's information details
        this.dob = student && student.dob ? new Date(new Date(student.dob).toDateString()).getTime() : 0
        this.aadhar = student && student.aadhar ? (+ student.aadhar) : 0
        this.caste = student && student.caste ? student.caste.toUpperCase() : castes[0]
        this.casteCertificate = student && student.casteCertificate ? new CasteCertificate(student.casteCertificate) : null
        this.bloodGroup = student && student.bloodGroup ? student.bloodGroup : bloodGroups[0]
        this.handicapped = student && student.handicapped && student.handicapped !== 'false' ? true : false
        this.handicappedCertificate = student && student.handicappedCertificate ? new HandicappedCertificate(student.handicappedCertificate) : null
        this.orphan = student && student.orphan && student.orphan !== 'false' ? true : false
        this.orphanRemarks = student && student.orphanRemarks ? student.orphanRemarks : null
        this.previousBranchName = student && student.previousBranchName ? student.previousBranchName.toUpperCase() : ''
        this.banglarsikshaId = student && student.banglarsikshaId ? student.banglarsikshaId.toUpperCase() : null
        this.kanyashreeId = student && student.kanyashreeId ? student.kanyashreeId.toUpperCase() : null
        this.aikyashreeId = student && student.aikyashreeId ? student.aikyashreeId.toUpperCase() : null
        this.fc = student && student.fc && student.fc !== 'false' ? true : false
        this.nc = student && student.nc && student.nc !== 'false' ? true : false
        //Previous School Details (for MP/HS passed candidates)
        this.lastBoardExam = student && student.lastBoardExam ? new BoardExam(student.lastBoardExam) : null
        //Address Details
        this.addressPermanent = student && student.addressPermanent ? new Address(student.addressPermanent) : new Address()
        this.addressPresent = student && student.addressPresent ? new Address(student.addressPresent) : new Address()
        //Parents information
        this.father = student && student.father ? new Parent(student.father) : new Parent()
        this.mother = student && student.mother ? new Parent(student.mother) : new Parent()
        this.visitor1 = student && student.visitor1 ? new Visitor(student.visitor1) : null
        this.visitor2 = student && student.visitor2 ? new Visitor(student.visitor2) : null
        this.studentLogin = student && student.studentLogin ? student.studentLogin : false
        //Bank details
        this.bankAccount = student && student.bankAccount ? new BankAccount(student.bankAccount) : new BankAccount()
        //Family member from mission
        this.familyMembersFromMission = student && student.familyMembersFromMission && student.familyMembersFromMission.length > 0 ? student.familyMembersFromMission.map(m => new FamilyMemberFromMission(m)) : []
        this.familyMembersFromMissionFlag = student && student.familyMembersFromMission && student.familyMembersFromMission.length > 0 ? true : false
        //Sibling studying in mission
        this.siblingsStudyingInMission = student && student.siblingsStudyingInMission && student.siblingsStudyingInMission.length > 0 ? student.siblingsStudyingInMission.map(m => new SiblingStudyingInMission(m)) : []
        this.siblingsStudyingInMissionFlag = student && student.siblingsStudyingInMission && student.siblingsStudyingInMission.length > 0 ? true : false
        //////////////////////////////////////////////////////////////////////////////////////////
        this.createdon = student && student.createdon ? student.createdon : 0
        this.modifiedon = student && student.modifiedon ? student.modifiedon : 0
        this.subscriberdocid = student && student.subscriberdocid ? student.subscriberdocid : null
        this.docref = student && student.docref ? student.docref : null
        //////////////////////////////////////////////////////////////////////////////////////////
        this.institute = student && student.institute ? new Institute(student.institute) : null
        this.fees = student && student.fees ? new Fees(student.fees) : null
    }

    /**
     * @private
     * @param {string} regno 
     * @param {string} aadhar 
     */
    load = async (regno, aadhar) => {
        const appname = 'alameenmission'
        try {
            const response = await fetch(`${APIURL}/student`
                , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ appname, regno, aadhar }),
                }
            )
            const data = await response.json()
            if (data) {
                const { status, studentLogin } = data.student
                if (status !== 'ACTIVE' || !studentLogin) {
                    this.set({ student: { status, studentLogin }, institute: null, fees: null })
                } else {
                    this.set({ ...data.student, institute: data.institute, fees: data.fees })
                }
                this.dispatchStudent()
            }
        } catch (ex) {

        }
    }

    login = async (regno, aadhar) => {
        const data = getSession()
        const flag = Boolean(!regno && !aadhar && data)
        if (data && data.regno && data.aadhar) {
            await this.load(data.regno, data.aadhar)
        } else if (regno && aadhar) {
            await this.load(regno, aadhar)
            setSession({ regno: this.regno, aadhar: this.aadhar })
        }
    }

    logout = () => {
        removeSession()
        this.docref = null
        this.dispatchStudent()
        this.gotoSigninPage()
    }
}

/**
 * @returns {Student}
 */
export const useStudent = () => {
    let student = useSelector((state) => state.student)
    if (!student) student = new Student()
    student.bindRedux(useDispatch())
    return student
}