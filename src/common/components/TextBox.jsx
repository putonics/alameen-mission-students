import React from 'react'
/**
 * @param {{
 *      type: "button"| "checkbox"| "color"| "date"| "datetime-local"| "email"| "file"| "hidden"| "image"| "month"| "number"| "password"| "radio"| "range"| "reset"| "search"| "submit"| "tel"| "text"| "time"| "url"| "week",
 *      label: string,
 *      placeholder: string,
 *      value: string,
 *      required: boolean,
 *      disabled: boolean,
 *      readonly: boolean,
 *      onChange: (text: string)=>{}     
 * }} props 
 */
const TextBox = props => {

    const [state, setState] = React.useState('')

    React.useEffect(() => {
        if (props.value === undefined || props.value === null) return
        const text = `${props.value}`
        if (state !== text) {
            // alert(text)
            setState(text)
        }
    }, [props])

    const handleChange = e => {
        const text = `${e.target.value || ''}`
        setState(text)
        if (text !== props.value && props.onChange) {
            props.onChange(text)
        }
        if (!props.onChange) console.log('Warning: Missing onChange() event handler!')
    }

    return (
        <>
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={props.label}
            >
                {props.label}
                {
                    props.required ? <span className='font-extrabold text-red-600'>*</span> : <></>
                }
            </label>
            <input
                className="
                    shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                    leading-tight focus:outline-none focus:shadow-outline focus:shadow-slate-400
                "
                value={state}
                id={props.label}
                type={`${props.type || 'text'}`}
                placeholder={props.placeholder || props.label}
                required={Boolean(props.required)}
                disabled={Boolean(props.disabled)}
                readOnly={Boolean(props.readonly)}
                onChange={handleChange}
            />
            {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
        </>
    )
}

export default TextBox