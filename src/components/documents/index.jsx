import React from 'react'
import style from '../../common/style'
import ImageCard from './ImageCard';
import { images } from '../../common/redux/classes/Constants';

export default props => {
    return (
        <div className={style().flex().add('flex-wrap gap-6')}>
            {
                images.map(image => (
                    <div key={image.name} xs={12} sm={6} md={4} lg={3}>
                        <ImageCard image={image} />
                    </div>
                ))
            }
        </div>
    )
}