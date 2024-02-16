import { useState } from 'react'
import { GptMessages, MyMessages, TypingLoader, TextMessageBox } from '../../components';
import { ProsConsStreamGeneratorUseCase } from '../../../core/use-case';


interface Message {
    text: string;
    isGptMessage: boolean;
}

export const ProsConsStreamPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = async (text: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { text: text, isGptMessage: false }]);
        //TODO Use case
        const stream = await ProsConsStreamGeneratorUseCase(text);
        setIsLoading(false);
        setMessages((messages) => [...messages, { text: '', isGptMessage: true }]);

        for await (const text of stream) {
            setMessages((messages) => {
                const newMessages = [...messages];
                newMessages[newMessages.length - 1].text = text;
                return newMessages
            })
        }
    }
    return (
        <div className='chat-container'>
            <div className='chat-messages'>
                <div className='grid grid-cols-12 gap-y-2'>
                    <GptMessages text='¿Qué deseas comparar hoy?' />

                    {
                        messages.map((message, index) => (
                            message.isGptMessage ? <GptMessages key={index} text={message.text} /> : <MyMessages key={index} text={message.text} />
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

