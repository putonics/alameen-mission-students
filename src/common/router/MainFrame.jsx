import React from 'react'
import SideNav from './SideNav'
import TopNav from './TopNav'



const MainFrame = props => {

    const [openSideNav, setOpenSideNav] = React.useState(false)
    return (
        <div className='grid md:grid-cols-5 sm:grid-cols-1'>
            <SideNav open={openSideNav} onClick={() => setOpenSideNav(!openSideNav)} />
            <div className='md:col-span-4 md:h-screen bg-neutral-300 flex flex-col'>
                <TopNav open={openSideNav} onClick={() => setOpenSideNav(!openSideNav)} />
                <div className='md:overflow-y-scroll flex-1 p-6'>
                    {props.children}
                </div>
            </div>
        </div>

    )
}

export default MainFrame
