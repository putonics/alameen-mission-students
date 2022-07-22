export default class HandicappedCertificate {
    bodyPartsName = ''
    percentage = 0
    certificateNo = ''
    issuingAuthority = ''
    issuingDate = 0

    constructor(hc) {
        this.bodyPartsName = hc && hc.bodyPartsName ? hc.bodyPartsName.toUpperCase() : ''
        this.percentage = hc && hc.percentage ? (+ hc.percentage) : 0
        this.certificateNo = hc && hc.certificateNo ? hc.certificateNo.toUpperCase() : ''
        this.issuingAuthority = hc && hc.issuingAuthority ? hc.issuingAuthority.toUpperCase() : ''
        this.issuingDate = hc && hc.issuingDate ? new Date(new Date(hc.issuingDate).toDateString()).getTime() : 0
    }

    json = () => {
        const { bodyPartsName, percentage, certificateNo, issuingAuthority, issuingDate } = this
        return ({ bodyPartsName, percentage, certificateNo, issuingAuthority, issuingDate })
    }
}