import React from 'react'
/**
 * @param {{
 *      type: 'submit' | 'button' | 'reset',
 *      disabled: boolean,
 *      busy: boolean,
 *      onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{}
 * }} props 
 */
const Button = props => {

    const handleClick = props.busy || props.disabled ? e => { e.preventDefault(); e.stopPropagation(); }
        : props.onClick || (() => {
            if (props.type === 'button') console.log('Warning: Missing onClick() event handler!')
        })

    return (
        <div className='relative'>
            <button
                className={
                    `py-2 px-4 rounded flex gap-2
                ${props.disabled || props.busy
                        ? 'bg-gray-400 text-gray-500 font-bold'
                        : 'bg-blue-500 hover:bg-blue-700 text-white font-bold focus:outline-none focus:shadow-outline'
                    }`
                }
                type={props.type || 'button'}
                disabled={Boolean(props.disabled)}
                onClick={handleClick}
            >
                {props.busy ? <img src={require('./busy.svg').default} className='w-6 h-6 animate-spin opacity-20' /> : <></>}
                {props.children || 'Submit'}
            </button >
        </div>
    )
}

// Button.propTypes = {
//     type: 'submit' | 'button' | 'reset',
//     value: 
// }

export default Button