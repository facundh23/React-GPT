import { useState } from 'react'
import { TypingLoader, TextMessageBox, GptMessages, MyMessages, GptOrthographyMessages } from '../../components'
import { orthographyUseCase } from '../../../core/use-case';

interface Message {
    text: string;
    isGptMessage: boolean;
    info?: {
        userScore: number;
        errors: string[];
        message: string;
    }
}

export const OrthographyPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = async (text: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { text: text, isGptMessage: false }]);


        const data = await orthographyUseCase(text);
        console.log(data)
        if (!data.ok) {
            setMessages((prev) => [...prev, { text: 'La correción no se pudo realizar correctamente', isGptMessage: true }]);
        } else {
            setMessages((prev) => [...prev, {
                text: 'La correción no se pudo realizar correctamente', isGptMessage: true, info: {
                    errors: data.errors,
                    message: data.message,
                    userScore: data.userScore,
                }
            }]);
        }
        setIsLoading(false);
        // Todo añadir el mensaje isGptMessage en true
    }
    return (
        <div className='chat-container'>
            <div className='chat-messages'>
                <div className='grid grid-cols-12 gap-y-2'>
                    <GptMessages text='Hola, puedes escribir tu texto en español, y te ayudo con las correcciones' />
                    {
                        messages && messages.map((message, index) => (
                            message.isGptMessage ? <GptOrthographyMessages key={index} errors={message.info!.errors} userScore={message.info!.userScore} message={message.info!.message} /> : <MyMessages key={index} text={message.text} />
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

