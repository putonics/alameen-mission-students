import React from 'react'
import Button from '../../common/components/Button'
import TableSkeleton from '../../common/components/TableSkeleton'
import TextBox from '../../common/components/TextBox'
import { useStudent } from '../../common/redux/classes/students/Student'
import style from '../../common/style'
import BillCard from './BillCard'

export default props => {
    const student = useStudent()

    const [busy, setBusy] = React.useState(false)

    const [onetimeFeePaidItems, setOnetimeFeePaidItems] = React.useState([])
    const [yearlyFeePaidItems, setYearlyFeePaidItems] = React.useState([])
    const [monthlyFeePaidItems, setMonthlyFeePaidItems] = React.useState([])
    const [amount, setAmount] = React.useState({
        opaid: 0, odue: 0,
        ypaid: 0, ydue: 0,
        mpaid: 0, mdue: 0,
        cashPaid: 0
    })
    const loadFees = () => {
        if (student && student.fees) {
            const fpis = student.fees.getFeePaidItems(student)
            const ofpis = []
            const yfpis = []
            const mfpis = []
            let opaid = 0, odue = 0
            let ypaid = 0, ydue = 0
            let mpaid = 0, mdue = 0
            let cashPaid = 0
            fpis.forEach(fpi => {
                if (fpi.group === 'ONETIME') {
                    ofpis.push(fpi)
                    if (fpi.paidon) {
                        opaid += fpi.amount
                    } else {
                        odue += fpi.amount
                    }
                } else if (fpi.group === 'YEARLY') {
                    yfpis.push(fpi)
                    if (fpi.paidon) {
                        ypaid += fpi.amount
                    } else {
                        ydue += fpi.amount
                    }
                } else {
                    mfpis.push(fpi)
                    if (fpi.paidon) {
                        mpaid += fpi.amount
                    } else {
                        mdue += fpi.amount
                    }
                }
            })
            setOnetimeFeePaidItems(ofpis)//fpis.filter(fpi => fpi.group === 'ONETIME'))
            setYearlyFeePaidItems(yfpis)//fpis.filter(fpi => fpi.group === 'YEARLY'))
            setMonthlyFeePaidItems(mfpis)//fpis.filter(fpi => fpi.group === 'MONTHLY'))
            setAmount({ opaid, odue, ypaid, ydue, mpaid, mdue, cashPaid })
            setBusy(false)
        }
    }
    React.useEffect(loadFees, [student])

    /////////////////////////////////////////////////

    return (
        <div className={style().centerContent()}>
            {
                busy
                    ?
                    <TableSkeleton rows={10} cols={4} />
                    :
                    student
                        ?
                        <div>
                            <div className='my-4 flex items-end gap-2'>
                                <div className='flex-1'>
                                    <TextBox type='text' readonly label='Payment link'
                                        value='https://alameenmission.org/fees_payment/'
                                    />
                                </div>
                                <Button onClick={() => { window.open('https://alameenmission.org/fees_payment/') }}>Pay</Button>
                            </div>
                            <BillCard
                                student={student}
                                institute={student?.institute}
                                ofpis={onetimeFeePaidItems}
                                yfpis={yearlyFeePaidItems}
                                mfpis={monthlyFeePaidItems}
                                amount={amount}
                            />
                        </div>
                        : <></>
            }
        </div>
    )
}