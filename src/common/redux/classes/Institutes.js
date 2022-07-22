export default class Institute {
    branch = ''
    district = ''
    email = ''
    institute = ''
    phone = ''
    place = ''
    subscriberdocid = ''
    title = ''
    docref = null

    constructor(institute = null) {
        this.branch = institute && institute.branch ? institute.branch : 'BRANCH-NAME'
        this.district = institute && institute.district ? institute.district : 'DISTRICT-NAME'
        this.email = institute && institute.email ? institute.email : 'EMAIL-ID'
        this.institute = institute && institute.institute ? institute.institute : 'INSTITUTE-NAME'
        this.phone = institute && institute.phone ? institute.phone : 'PHONE'
        this.place = institute && institute.place ? institute.place : 'PLACE'
        this.subscriberdocid = institute && institute.subscriberdocid ? institute.subscriberdocid : 'SUBSCRIBERDOCID'
        this.title = institute && institute.title ? institute.title : 'TITLE'
        this.docref = institute && institute.docref ? institute.docref : null
    }

    json = () => {
        const { branch, district, email, institute, phone, place, subscriberdocid, title, docref } = this
        return ({ branch, district, email, institute, phone, place, subscriberdocid, title, docref })
    }
}