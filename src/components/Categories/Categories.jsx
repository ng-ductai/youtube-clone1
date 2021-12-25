import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPopularVideos, getVideosByCategory } from '../../redux/actions/videosAction'
import './_categories.scss'

const keywords = [
    'All',
    'Barcelona',
    'Angular js',
    'PHP',
    'React js',
    'Redux',
    'MongooseDB',
    'React Native',
    'Python',
    'Songs',
    'Sports',
    'Game',
    'Football',
    'Real Madrid',
    'Gatsby',
    'Music',
    'Cartoon Film',
    'Express',
    'News'
]

const Categories = () => {
    const [activeElement, setActiveElement] = useState('All')
    const dispatch = useDispatch()

    const handleClick = value => {
        setActiveElement(value)
        if(value==='All'){
            dispatch(getPopularVideos())
        } else {
            dispatch(getVideosByCategory(value))
        }
        
    }

    return (
        <div className='categories'>
            {keywords.map((value, i) => (
                <span
                    onClick={() => handleClick(value)} 
                    key={i}
                    className={activeElement === value ? 'active' : ''}
                >
                    {value}
                </span>
            ))}
        </div>
    )
}

export default Categories
