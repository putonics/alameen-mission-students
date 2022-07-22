import React from 'react'
import Form from '../../common/components/Form'
import TextBox from '../../common/components/TextBox'
import Button from '../../common/components/Button'
import style from '../../common/style'
import { useStudent } from '../../common/redux/classes/students/Student'
import { useNavigate } from 'react-router-dom'

const LoginForm = props => {
    const [state, setState] = React.useState({ regno: '', aadhar: '' })

    const [error, setError] = React.useState('')
    const [busy, setBusy] = React.useState(false)

    const student = useStudent()

    const navigate = useNavigate()

    const handleSubmission = () => {
        setBusy(true)
        const { regno, aadhar } = state
        student.login(regno, aadhar)
            .finally(() => {
                setBusy(false)
                if (!student.docref) {
                    setError('Wrong user-id or password!')
                } else if (student.status !== 'ACTIVE' || !student.studentLogin) {
                    setError('You are not authorised to login. Please contact with the institution.')
                } else {
                    navigate('/dash')
                }
            })
    }

    return (
        <Form
            className={style('bg-slate-300 col-span-2 p-4')}
            onSubmit={handleSubmission}
        >
            <div className={style('text-xl font-bold text-slate-900 animate-bounce')}>
                Student Login
            </div>
            <div className={style('text-left mb-4')}>
                <TextBox label='User-id'
                    onChange={regno => setState({ ...state, regno })}
                    disabled={busy}
                />
            </div>
            <div className={style('text-left mb-4')}>
                <TextBox type='password' label='Password'
                    onChange={aadhar => setState({ ...state, aadhar })}
                    disabled={busy}
                />
            </div>
            <div className={style('mb-4 text-right')}>
                <span className={style('mr-4 text-red-800')}>{error}</span>
                <Button type='submit' disabled={busy}>Login</Button>
            </div>
        </Form>
    )
}

export default LoginForm