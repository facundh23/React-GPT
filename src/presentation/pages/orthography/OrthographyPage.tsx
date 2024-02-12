import { useState } from 'react'
import { TypingLoader, TextMessageBox, GptMessages, MyMessages } from '../../components'

interface Message {
    text: string;
    isGptMessage: boolean;
}



export const OrthographyPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = async (text: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { text: text, isGptMessage: false }]);
        //TODO Use case
        setIsLoading(false);
        // Todo añadir el mensaje isGptMessage en true
    }
    return (
        <div className='chat-container'>
            <div className='chat-messages'>
                <div className='grid grid-cols-12 gap-y-2'>
                    <GptMessages text='Hola, puedes escribir tu texto en español, y te ayudo con las correcciones' />
                    {
                        messages.map((message, index) => (
                            message.isGptMessage ? <GptMessages key={index} text='Open AI message' /> : <MyMessages key={index} text={message.text} />
                        ))
                    }


                    {
                        isLoading && (
                            <div className='col-start-1 col-end-12 fade-in'>
                                <TypingLoader />
                            </div>
                        )
                    }
                </div>
            </div>

            <TextMessageBox onSendMessage={handlePost} placeholder='Escribe tu texto aquí' disableCorrections />

        </div>
    )
}

