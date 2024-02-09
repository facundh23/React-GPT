import { GptMessages, MyMessages } from '../../components/chat-bubbles'

export const OrthographyPage = () => {
    return (
        <div className='chat-container'>
            <div className='chat-messages'>
                <div className='grid grid-cols-12 gap-y-2'>
                    <GptMessages text='Hola, puedes escribir tu texto en español, y te ayudo con las correcciones' />
                    <MyMessages text='Hola' />
                </div>
            </div>
        </div>
    )
}

