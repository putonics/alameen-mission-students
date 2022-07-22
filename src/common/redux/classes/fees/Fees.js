import Fee from './Fee'
import { monthlyFees, oneTimeFees, pclasses, yearlyFees } from '../Constants'
import FeeItem from './FeeItem'
import FeePaidItem from '../fees-received/FeePaidItem'

const getIndex = (pclass) => {
    const index = pclasses.findIndex(pc => pc === pclass)
    return index >= 0 ? index : pclasses.length
}

export default class Fees {

    sessionFrom = 0
    fees = [new Fee()]
    docref
    selectedIndex = -1

    /**
     * @param {Fees} fees 
     */
    constructor(fees = null) {
        this.sessionFrom = fees && fees.sessionFrom ? (+fees.sessionFrom) : new Date().getFullYear() - 1
        this.fees = fees && fees.fees ? fees.fees.map(fee => new Fee(fee)) : []
        this.docref = fees && fees.docref ? fees.docref : null
        this.selectedIndex = fees && fees.selectedIndex >= 0 ? fees.selectedIndex : -1
    }

    json = () => {
        const sessionFrom = this.sessionFrom
        const fees = this.fees.map(fee => fee.json())
        return ({ sessionFrom, fees })
    }

    /**
     * @param {Fees} fees 
     */
    set = (fees = null) => {
        this.sessionFrom = fees && fees.sessionFrom ? fees.sessionFrom : new Date().getFullYear() - 1
        this.fees = fees && fees.fees ? fees.fees.map(fee => new Fee(fee)) : []
        this.docref = fees && fees.docref ? fees.docref : null
        this.selectedIndex = fees && fees.selectedIndex >= 0 ? fees.selectedIndex : -1
    }

    /**
     * @param {string} pclass
     * @returns {Array<number>} 
     */
    getOneTimeFees = (pclass) => {
        return this.fees.filter(fee => fee.pclass === pclass).map(fee => fee.totalOneTimeFees())
    }

    /**
     * @returns {Array<FeeItem>}
     */
    getOneTimeFeesHeads = () => {
        const heads = []
        this.fees.forEach(fee => {
            fee.oneTimeFees.forEach(otf => {
                if (heads.filter(h => otf.equals(h)).length === 0) {
                    heads.push(new FeeItem({ ...otf.json() }))
                }
            })
        })
        return heads.length > 0 ? heads : oneTimeFees.map(otf => new FeeItem({ ...otf }))
    }

    /**
     * @param {string} pclass
     * @returns {Array<number>} 
     */
    getMonthlyFees = (pclass) => {
        return this.fees.filter(fee => fee.pclass === pclass).map(fee => fee.totalMonthlyFees())
    }

    /**
     * @param {string} pclass
     * @returns {Array<number>} 
     */
    getMonthlyFeesExceptSelected = (pclass) => {
        console.log(`${pclass}, ${this.selectedIndex}`)
        return this.fees.filter((fee, index) => index !== this.selectedIndex && fee.pclass === pclass).map(fee => fee.totalMonthlyFees())
    }

    /**
     * @returns {Array<FeeItem>}
     */
    getMonthlyFeesHeads = () => {
        const heads = []
        this.fees.forEach(fee => {
            fee.monthlyFees.forEach(mf => {
                if (heads.filter(h => mf.equals(h)).length === 0) {
                    heads.push(new FeeItem({ ...mf.json() }))
                }
            })
        })
        return heads.length > 0 ? heads : monthlyFees.map(mf => new FeeItem({ ...mf }))
    }

    /**
     * @param {string} pclass
     * @returns {Array<number>} 
     */
    getYearlyFees = (pclass) => {
        return this.fees.filter(fee => fee.pclass === pclass).map(fee => fee.totalYearlyFees())
    }

    /**
     * @returns {Array<FeeItem>}
     */
    getYearlyFeesHeads = () => {
        const heads = []
        this.fees.forEach(fee => {
            fee.yearlyFees.forEach(yf => {
                if (heads.filter(h => yf.equals(h)).length === 0) {
                    heads.push(new FeeItem({ ...yf.json() }))
                }
            })
        })
        return heads.length > 0 ? heads : yearlyFees.map(yf => new FeeItem({ ...yf }))
    }

    /**
     * @param {string} pclass
     * @returns {Array<Fee>} 
     */
    getAllFees = (pclass) => {
        return this.fees.filter(fee => fee.pclass === pclass).sort((a, b) => b.totalFees() - a.totalFees())
    }

    /**
     * @returns {Array<string>} 
     */
    getPclasses = () => {
        const pclasses = []
        this.fees.forEach(fee => {
            if (!pclasses.includes(fee.pclass)) {
                pclasses.push(fee.pclass)
            }
        })
        if (pclasses.length > 1) {
            return pclasses.sort((a, b) => getIndex(a) - getIndex(b))//getIndex is declared at the top
        }
        return pclasses
    }

    /**
     * @param {Student} student 
     * @returns {Array<FeePaidItem>}
     */
    getFeePaidItems = (student) => {
        const fee = this.fees.find(fee => fee.pclass === student.pclass && fee.totalMonthlyFees() === student.fee)
        return fee.getFeePaidItems(student)
    }
}
