export default class DropoutRemarks {
    date = 0
    reason = ''

    constructor(dr) {
        this.date = dr && dr.date ? new Date(new Date(dr.date).toDateString()).getTime() : 0
        this.reason = dr && dr.reason ? dr.reason : ''
    }

    json = () => {
        const { date, reason } = this
        return ({ date, reason })
    }
}