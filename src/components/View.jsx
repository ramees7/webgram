import React from 'react'
import Story from './Story'
import Posts from './Posts'

function View() {
    return (
        <div>
            <div className='mb-3'>
                <Story />
            </div>
            <div className='mb-3'>
                <Posts />
            </div>
        </div>
    )
}

export default View