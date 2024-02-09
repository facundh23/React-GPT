import React from 'react'
import './TypingLoader.css'

interface Props {
    className?: string;
}
export const TypingLoader: React.FC<Props> = ({ className }) => {
    return (
        <div className={`typing ${className}`}>
            <div className='circle scaling'></div>
            <div className='circle scaling'></div>
            <div className='circle scaling'></div>
        </div>
    )
}


