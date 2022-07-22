import React from 'react'
import style from '../../common/style'
import assets from '../../assets'
import { dateFormat } from '../dash'
import { months } from '../../common/redux/classes/Constants'

const Field = props => {
    return (
        <div style={{
            paddingHorizontal: '4px', width: '100%',
            flexDirection: 'row', fontSize: '10px', paddingVertical: '1px'
        }}>
            <div style={{ color: '#777777' }}>{props?.name}:</div>
            <div style={{ color: '#000000', marginLeft: '4px' }}>{props?.value}</div>
        </div>
    )
}

const BillCard = props => {
    return (
        <div className={style('p-6').card()}>
            <div className={style('flex flex-row py-4 px-2 gap-4').centerContent()}>
                <div style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <img src={assets.logo} style={{ width: '2.5cm', height: '2.5cm' }} />
                </div>
                <div style={{ flexGrow: 3, alignItems: 'center', justifyContent: 'center' }}>
                    <div className='text-xl font-extrabold text-slate-900'>
                        {props?.institute?.institute}
                    </div>
                    <div className='text-lg font-bold text-slate-900'>
                        {props?.institute?.place}
                    </div>
                    <div className='text-sm text-slate-900'>
                        {props?.institute?.phone} &nbsp; {props?.institute?.email}
                    </div>
                    <div className='text-xl font-bold text-slate-900'>
                        Session {props?.student?.sessionFrom}-{props?.student?.sessionTo}
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginVertical: '8px', border: '1px solid #777', padding: '4px' }}>
                <Field name='Reg. No.' value={props?.student?.regno} />
                <Field name='Class' value={props?.student?.pclass} />
                <Field name='Name' value={props?.student?.name} />
                <Field name='C/O' value={props?.student?.father?.name} />
                <Field name='Contact' value={props?.student?.mobile} />
            </div>
            <div style={{ marginTop: '8px' }}>
                <div className='text-xl font-bold text-slate-900' style={{ paddingBottom: '4px', borderBottom: '1px solid #777' }}>
                    One Time Fees (₹):
                </div>
                <div style={{ marginLeft: '10px', marginTop: '4px', fontSize: '10px' }}>
                    {
                        props.ofpis.map((fpi, index) => (
                            <div key={`fpi-${index}`} style={{ display: 'flex', flexDirection: 'row', marginBottom: '4px', justifyContent: 'space-between', color: fpi.paidon ? '#000' : '#777' }}>
                                <div>
                                    {index + 1}. {fpi.head} {fpi.paidon ? `(paid on ${dateFormat(fpi.paidon)})` : '<due>'}
                                </div>
                                <div>
                                    {fpi.amount}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div style={{ marginTop: '8px' }}>
                <div className='text-xl font-bold text-slate-900' style={{ paddingBottom: '4px', borderBottom: '1px solid #777' }}>
                    Yearly Fees (₹):
                </div>
                <div style={{ marginLeft: '10px', marginTop: '4px', fontSize: '10px' }}>
                    {
                        props.yfpis.map((fpi, index) => (
                            <div key={`yfpis-${index}`} style={{ display: 'flex', flexDirection: 'row', marginBottom: '4px', justifyContent: 'space-between', color: fpi.paidon ? '#000' : '#777' }}>
                                <div>
                                    {index + 1}. {fpi.head} {fpi.paidon ? `(paid on ${dateFormat(fpi.paidon)})` : '<due>'}
                                </div>
                                <div>
                                    {fpi.amount}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div style={{ marginTop: '8px' }}>
                <div className='text-xl font-bold text-slate-900' style={{ paddingBottom: '4px', borderBottom: '1px solid #777' }}>
                    Monthly Fees (₹):
                </div>
                <div style={{ marginLeft: '10px', marginTop: '4px', fontSize: '10px' }}>
                    {
                        props.mfpis.map((fpi, index) => (
                            <div key={`fpis-${index}`} style={{ display: 'flex', flexDirection: 'row', marginBottom: '4px', justifyContent: 'space-between', color: fpi.paidon ? '#000' : '#777' }}>
                                <div>
                                    {index + 1}. {fpi.month >= 0 ? months[fpi.month % 12] : ''} {fpi.year} {fpi.head} {fpi.paidon ? `(paid on ${dateFormat(fpi.paidon)})` : '<due>'}
                                </div>
                                <div>
                                    {fpi.amount}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='gap-4' style={{ display: 'flex', flexDirection: 'row', marginTop: '8px', marginBottom: '4px', justifyContent: 'space-between', border: '1px solid #777', padding: '4px' }}>
                <div className='text-lg font-bold text-slate-900'>
                    Total Fees: ₹ {props.amount.opaid + props.amount.ypaid + props.amount.mpaid + props.amount.odue + props.amount.ydue + props.amount.mdue}
                </div>
                <div className='text-lg font-bold text-slate-900'>
                    Paid: ₹ {props.amount.opaid + props.amount.ypaid + props.amount.mpaid}
                </div>
                <div className='text-lg font-bold text-slate-900'>
                    Due: ₹ {props.amount.odue + props.amount.ydue + props.amount.mdue}
                </div>
            </div>
            <div className='italic text-xs text-red-900'>This shall not be treated as payment acknowledgement until is properly authorised by the signing authority of the institution.</div>
        </div>
    )
}

export default BillCard