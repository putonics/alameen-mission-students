import React from 'react'
import { months } from '../../common/redux/classes/Constants'
import { useStudent } from '../../common/redux/classes/students/Student'
import style from '../../common/style'
import Field from './Field'

export const dateFormat = dt => {
    const dtx = new Date(dt)
    const d = dtx.getDate()
    const m = dtx.getMonth()+1
    const y = dtx.getFullYear()
    return (d < 10 ? '0' : '') + d + '-' + (m < 10 ? '0' : '') + m + '-' + y
}

export default props => {
    const student = useStudent()

    return (
        student.docref
            ?
            <div className={style().centerContent()}>
                <table className={style().card()}>
                    <tbody>
                        <tr>
                            <Field name='Name' value={student.name} />
                            <Field name='Class' value={student.pclass} />
                            <Field name='Monthly Fee' value={'₹ ' + student.fee} />
                        </tr>
                        <tr>
                            <Field name='Reg. No.' value={student.regno} />
                            <Field name='Session' value={student.sessionFrom + ' to ' + student.sessionTo} />
                            <Field name='Admission' value={dateFormat(student.admissionDate)} />
                        </tr>
                        <tr>
                            <Field name='Stream' value={student.stream} />
                            <Field name='Medium' value={student.medium} />
                            <Field name='Fee starts' value={months[student.feeStartingMonth]} />
                        </tr>
                        <tr>
                            <Field name='Mobile No.' value={student.mobile} />
                            <Field name='WhatsApp No.' value={student.whatsapp} />
                            <Field name='Email' value={student.email} />
                        </tr>
                        <tr>
                            <Field name='Date of Birth' value={dateFormat(student.dob)} />
                            <Field name='Gender' value={student.gender} />
                            <Field name='Caste' value={student.caste} />
                        </tr>
                        <tr>
                            <Field name='AADHAR No.' value={student.aadhar} />
                            <Field name='Caste' value={student.caste} />
                            <Field name='Blood Gr.' value={student.bloodGroup} />
                        </tr>
                        <tr>
                            <Field name='Banglarsiksha Id.' value={student.banglarsikshaId} />
                            <Field name='Aikyashre Id.' value={student.aikyashreeId} />
                            <Field name='Kanyashree Id.' value={student.kanyashreeId} />
                        </tr>
                        <tr>
                            <Field name='Prev. Branch' value={student.previousBranchName} />
                            <Field name='Orphan' value={student.orphan ? 'YES' : 'NO'} />
                            <Field name='Handicapped' value={student.handicapped ? 'YES' : 'NO'} />
                        </tr>
                        <tr>
                            <Field name='Father name' value={student.father.name} />
                            <Field name='Occupation' value={student.father.occupation} />
                            <Field name='Mobile No' value={student.father.mobile} />
                        </tr>
                        <tr>
                            <Field name='Mother name' value={student.mother.name} />
                            <Field name='Occupation' value={student.mother.occupation} />
                            <Field name='Mobile No' value={student.mother.mobile} />
                        </tr>
                        <tr>
                            <Field name='Permanent Address' value={student.addressPermanent.vill} />
                            <Field name='Post Office' value={student.addressPermanent.po} />
                            <Field name='Police Station' value={student.addressPermanent.ps} />
                        </tr>
                        <tr>
                            <Field name='Block' value={student.addressPermanent.block} />
                            <Field name='District' value={student.addressPermanent.dist} />
                            <Field name='Pin Code' value={student.addressPermanent.pin} />
                        </tr>
                        <tr>
                            <Field name='Present Address' value={student.addressPresent.vill} />
                            <Field name='Post Office' value={student.addressPresent.po} />
                            <Field name='Police Station' value={student.addressPresent.ps} />
                        </tr>
                        <tr>
                            <Field name='Block' value={student.addressPresent.block} />
                            <Field name='District' value={student.addressPresent.dist} />
                            <Field name='Pin Code' value={student.addressPresent.pin} />
                        </tr>
                        <tr>
                            <Field name='Bank A/C No.' value={student.bankAccount.accountNo} />
                            <Field name='Bank Name' value={student.bankAccount.bankName} />
                            <Field name='Branch Name' value={student.bankAccount.branchName} />
                        </tr>
                        <tr>
                            <Field name='IFS Code' value={student.bankAccount.ifsc} />
                            <Field name='Branch address' value={student.bankAccount.branchAddress} colspan={3} />
                        </tr>
                    </tbody>
                </table>
            </div>
            : <></>
    )
}