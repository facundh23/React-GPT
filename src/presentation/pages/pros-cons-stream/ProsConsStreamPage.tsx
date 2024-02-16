import { useState } from 'react'
import { GptMessages, MyMessages, TypingLoader, TextMessageBox } from '../../components';
import { ProsConsStreamUseCase } from '../../../core/use-case';



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
        const reader = await ProsConsStreamUseCase(text);
        setIsLoading(false);

        // Generar el ultimo mensaje

        if(!reader) return;

        const decoder = new TextDecoder();
        let message = '';
        setMessages((messages) => [...messages, {text:message, isGptMessage:true}]);

        while(true) {
            const {value, done} = await reader.read();
            if(done){ 
                break;
            }
            const decodedChunk = decoder.decode(value,{stream:true});
            message += decodedChunk;

            // Esto actualiza el ultimo mensaje
            setMessages((messages) => {
                const newMessages = [...messages];
                newMessages[newMessages.length - 1].text = message;
                return newMessages;
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

