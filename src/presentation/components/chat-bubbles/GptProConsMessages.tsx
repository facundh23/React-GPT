import React from 'react'
import Markdown from 'react-markdown'

interface Props {
   role:string,
   content:string
}

export const GptProConsMessages: React.FC<Props> = ({ role, content }) => {

    return (
        <div className='col-start-1 col-end-8 p-3 rounded-lg'>
            <div className='flex flex-row items-center'>
                <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0'>
                    G
                </div>
                <div className='relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'>
                    <h3 className='text-3xl font-bold'>Role: {role}</h3>
                     {content && <Markdown>{content}</Markdown>}
                </div>
            </div>
        </div>
    )
}



