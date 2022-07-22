export default class CasteCertificate {
    certificateNo = ''
    issuingAuthority = ''
    issuingDate = 0

    constructor(cc) {
        this.certificateNo = cc && cc.certificateNo ? cc.certificateNo.toUpperCase() : ''
        this.issuingAuthority = cc && cc.issuingAuthority ? cc.issuingAuthority.toUpperCase() : ''
        this.issuingDate = cc && cc.issuingDate ? new Date(new Date(cc.issuingDate).toDateString()).getTime() : 0
    }

    json = () => {
        const { certificateNo, issuingAuthority, issuingDate } = this
        return ({ certificateNo, issuingAuthority, issuingDate })
    }
}