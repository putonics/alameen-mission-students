import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from './Router'
import SideNavHeader from './SideNavHeader'

const SideNav = props => {

    const location = useLocation()

    React.useEffect(props.onClick, [location])

    return (
        <div className={'bg-slate-500 h-screen' + (props.open ? ' ease-linear' : ' hidden md:block')} >
            <div
                className="
                            flex flex-col justify-between items-start
                            p-5 md:m-2 sm:m-0 text-center 
                            text-blue-100 
                        "
            >
                <SideNavHeader />
                <div className='p-2 m-2 text-xl text-red-500 md:hidden sm:block cursor-pointer hover:text-red-400'
                    onClick={props.onClick}
                >
                    <i className='fa fa-close' />
                </div>
            </div>
            {
                ROUTES.filter(route => Boolean(route.title)).map(
                    (route, index) => (
                        <Link to={route.path} key={'side-nav-route-' + index}>
                            <div
                                className={`
                                    p-5 md:m-2 sm:m-0 text-center 
                                    text-blue-100 rounded-sm cursor-pointer
                                    hover:bg-slate-300  hover:text-slate-900 text-lg
                                    ${location.pathname === route.path ? 'bg-slate-400 text-slate-900' : ''}
                                `}
                            >
                                <div className={`fas fa-${route.icon} mr-2`}></div>
                                {route.title}
                            </div>
                        </Link>
                    )
                )
            }
        </div>
    )
}

export default SideNav 
