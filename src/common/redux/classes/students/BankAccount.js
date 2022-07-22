export default class BankAccount {
    accountNo = ''
    bankName = ''
    branchName = ''
    ifsc = ''
    branchAddress = ''

    constructor(ba) {
        this.accountNo = ba && ba.accountNo ? ba.accountNo : ''
        this.bankName = ba && ba.bankName ? ba.bankName.toUpperCase() : ''
        this.branchName = ba && ba.branchName ? ba.branchName.toUpperCase() : ''
        this.ifsc = ba && ba.ifsc ? ba.ifsc.toUpperCase() : ''
        this.branchAddress = ba && ba.branchAddress ? ba.branchAddress : ''
    }

    json = () => {
        const { accountNo, bankName, branchName, ifsc, branchAddress } = this
        return ({ accountNo, bankName, branchName, ifsc, branchAddress })
    }
}