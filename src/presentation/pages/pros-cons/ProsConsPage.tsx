import { useState } from 'react'
import { GptMessages, MyMessages, TypingLoader, TextMessageBox } from '../../components';
import { ProsConsUseCase } from '../../../core/use-case/prosCons.use-case';
import { GptProConsMessages } from '../../components/chat-bubbles';




interface Message {
    text: string;
    isGptMessage: boolean;
    info?:{
        role:string;
        content:string;
    }
}

export const ProsConsPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = async (text: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { text: text, isGptMessage: false }]);

        //TODO Use case
        const data = await ProsConsUseCase(text);
        console.log(data)
        if(!data.ok) {
            setMessages((prev) => [...prev, {text:'La comparación no se pudo realizar correctamente', isGptMessage:true}])
        } else {
            setMessages((prev) => [...prev, {
                text:'La correción no se pudo realizar correctamente', 
                isGptMessage:true,
                info:{
                    role:data.role,
                    content:data.content
                }
            }])
        }

        setIsLoading(false);

        // Todo añadir el mensaje isGptMessage en true
    }
    return (
        <div className='chat-container'>
            <div className='chat-messages'>
                <div className='grid grid-cols-12 gap-y-2'>
                    <GptMessages text='Puedes escribir lo que sea que quieras que compare y te de mis puntos de vista' />

                    {
                        messages.map((message, index) => (
                            message.isGptMessage ? <GptProConsMessages key={index} role={message.info!.role} content={message.info!.content} /> : <MyMessages key={index} text={message.text} />
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

