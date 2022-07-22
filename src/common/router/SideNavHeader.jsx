import React from 'react'
import { APIURL, images } from '../redux/classes/Constants'
import { useStudent } from '../redux/classes/students/Student'

const SideNavHeader = props => {

    const [url, setUrl] = React.useState('')

    const student = useStudent()

    React.useEffect(() => {
        if (student.regno && student.modifiedon) {
            setUrl(`${APIURL}/avatars/${student.regno}_${images[0].name}.jpg?${student.modifiedon}`)
        } else {
            setUrl('')
        }
    }, [student])

    return (
        <div className='flex flex-col justify-center items-center w-full'>
            <img
                src={url}
                className='w-20 h-20 rounded-full border-4 border-slate-400 mb-2'
            />
            <div className={'px-2 py-1 rounded text-sm' + ((student && student.status === 'ACTIVE') ? 'text-white' : 'bg-red-400 text-red-900')}>
                {student.status}
            </div>
            <div className='text-slate-900 font-extrabold'>{student.name}</div>
            <div className='text-slate-800 font-bold'>Reg. No.: {student.regno}</div>
        </div>
    )
}

export default SideNavHeader