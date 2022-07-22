import React from 'react'

/**
 * @param {{
 *  name: string,
 *  value: string,
 *  colspan: number
 * }} props 
 * @returns 
 */
const Field = props => {
    return (
        <>
            <td className='text-slate-500 px-2 py-2'>{props.name}:</td>
            <td colSpan={(+props.colspan) || 1} className='text-slate-900 px-2 py-2'>{props.value}</td>
        </>
    )
}

export default Field