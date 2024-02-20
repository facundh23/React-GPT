import { useRef, useState } from 'react'
import { GptMessages, MyMessages, TypingLoader,  TextMessageBoxWithSelect } from '../../components';
import { translateTextuseCase } from '../../../core/use-case';

interface Message {
    text: string;
    isGptMessage: boolean;
}

const languages = [
    { id: "alemán", text: "Alemán" },
    { id: "árabe", text: "Árabe" },
    { id: "bengalí", text: "Bengalí" },
    { id: "francés", text: "Francés" },
    { id: "hindi", text: "Hindi" },
    { id: "inglés", text: "Inglés" },
    { id: "japonés", text: "Japonés" },
    { id: "mandarín", text: "Mandarín" },
    { id: "portugués", text: "Portugués" },
    { id: "ruso", text: "Ruso" },
  ];

export const TranslatePage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = async (text: string, selectedOption: string) => {
        // isRunning.current= true 
        setIsLoading(true);
        const newMessage = `Traduce: ${text} al idioma ${selectedOption}`;
        setMessages((prev) => [...prev, { text: newMessage, isGptMessage: false }]);
         
        //TODO Use case
        const data = await translateTextuseCase(text, selectedOption)
        if(!data.ok) return

        setMessages((prev) => [...prev, {text:data.message, isGptMessage:true}]);
        setIsLoading(false)
        
    }
    return (
        <div className='chat-container'>
            <div className='chat-messages'>
                <div className='grid grid-cols-12 gap-y-2'>
                    <GptMessages text='Hola, ¿Qué quieras que traduzca hoy?' />

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

            <TextMessageBoxWithSelect onSendMessage={handlePost} placeholder='Escribe tu texto aquí' options={languages}  />
        </div>
    )
}

