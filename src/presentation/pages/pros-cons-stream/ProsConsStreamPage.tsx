import { useRef, useState } from 'react'
import { GptMessages, MyMessages, TypingLoader, TextMessageBox } from '../../components';
import { ProsConsStreamGeneratorUseCase } from '../../../core/use-case';


interface Message {
    text: string;
    isGptMessage: boolean;
}

export const ProsConsStreamPage = () => {

    const abortController = useRef( new AbortController() );
    const isRunning = useRef(false);

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = async (text: string) => {

        if (isRunning.current)  {
            abortController.current.abort(); 
            abortController.current = new AbortController()
        }

        setIsLoading(true);
        isRunning.current = true;
        setMessages((prev) => [...prev, { text: text, isGptMessage: false }]);
        //TODO Use case
        const stream = ProsConsStreamGeneratorUseCase(text, abortController.current.signal);
        setIsLoading(false);
        setMessages((messages) => [...messages, { text: '', isGptMessage: true }]);

        for await (const text of stream) {
            setMessages((messages) => {
                const newMessages = [...messages];
                newMessages[newMessages.length - 1].text = text;
                return newMessages
            })
        }

        isRunning.current = false;
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

