import React from 'react'

const Form = props => {
    return (
        <form {...props}
            onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                return props.onSubmit ? props.onSubmit() : null
            }}
        >
            {props.children}
        </form>
    )
}

export default Form