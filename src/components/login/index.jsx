import React from 'react'
import assets from '../../assets'
import style from '../../common/style'
import LoginForm from './LoginForm'

export default props => {
    return (
        <div
            className={
                style().fullScreen().centerContent().add('flex-col')
                    .add('bg-gradient-to-r from-blue-900 to-green-700')
            }
        >
            <div className={style('bg-[#00000011] p-4 backdrop-blur-sm text-center').card()}>
                <div className={style('mb-2 text-4xl text-white font-extrabold')}>
                    Al Ameen Mission
                </div>
                <div className={style('mb-2 text-lg text-white')}>
                    A Socio Academic Institution With A Difference
                </div>
                <div className={style('bg-white').card().grid(3, 0)}>
                    <div className={style('p-4').centerContent().add('flex-col gap-4')}>
                        <img src={assets.logo} className={style('w-40')} />
                        <div className={style('mb-2 text-xl font-extrabold text-white').card().grid(2, 0)}>
                            <div className={style('bg-blue-900 px-4 py-2')}>Since</div>
                            <div className={style('bg-black px-4 py-2')}>1986</div>
                        </div>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}