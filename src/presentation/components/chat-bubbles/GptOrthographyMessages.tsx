import React from 'react'

interface Props {
    userScore: number;
    errors: string[];
    message: string
}

export const GptOrthographyMessages: React.FC<Props> = ({ userScore, errors, message }) => {
    return (
        <div className='col-start-1 col-end-8 p-3 rounded-lg'>
            <div className='flex flex-row items-center'>
                <div className='flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0'>
                    G
                </div>
                <div className='relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl'>
                    <h3 className='text-3xl font-bold'>Puntaje: {userScore}</h3>
                    <p>{message}</p>
                    {
                        errors.length === 0 ? <p>No se encontrar errores Perfecto!</p> : (
                            <>
                                <h3 className='text-2xl font-bold'>Errores encontrados</h3>
                                <ul>
                                    {
                                        errors.map((error, i) => (
                                            <li key={i}>{error}</li>
                                        ))
                                    }
                                </ul>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}



