import React from 'react'
import assets from '../../assets'
import { useStudent } from '../redux/classes/students/Student'

const TopNavContent = props => {

    const student = useStudent()

    return (
        <div className='flex-1'>
            <div className='px-4 flex flex-row justify-center items-center'>
                <img src={assets.logo} className='w-16 mx-4' />
                <div>
                    <div className='flex'>
                        <div className='font-extrabold mx-2'>{student?.institute?.institute}</div>
                        <div> | {student?.institute?.branch}</div>
                    </div>
                    <div className='flex text-lg'>
                        <div className='mx-2'>{student?.institute?.phone}</div>
                        <div className='mx-2'>{student?.institute?.email}</div>
                    </div>
                </div>
                <div className='flex-1 flex justify-end'>
                    <div className='flex flex-row w-fit items-center text-lg text-red-400 hover:text-red-700'
                        onClick={student.logout}
                    >
                        <i className='fas fa-power-off mr-1' />
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavContent