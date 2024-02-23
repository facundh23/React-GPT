import { useState } from 'react'
import { GptMessages, MyMessages, TypingLoader, TextMessageBox, TextMessageBoxWithSelect } from '../../components';
import { TextToAudioUseCase } from '../../../core/use-case';

const disclaimer = ` ## ¿Qué audio quieres generar hoy?
* Todo el audio generado es por AI
`;

const voices = [
    { id: "nova", text: "Nova" },
    { id: "alloy", text: "Alloy" },
    { id: "echo", text: "Echo" },
    { id: "fable", text: "Fable" },
    { id: "onyx", text: "Onyx" },
    { id: "shimmer", text: "Shimmer" },
  ]

interface Message {
    text: string;
    isGptMessage: boolean;
}

export const TextToAudioPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([])

    const handlePost = async (text: string, selectedVoice: string) => {
        setIsLoading(true);
        setMessages((prev) => [...prev, { text: text, isGptMessage: false }]);

        //TODO Use case
        const {ok, message, audioUrl} = await TextToAudioUseCase(text, selectedVoice)
        setIsLoading(false);

        // Todo añadir el mensaje isGptMessage en true
    }
    return (
        <div className='chat-container'>
            <div className='chat-messages'>
                <div className='grid grid-cols-12 gap-y-2'>
                    <GptMessages text={disclaimer} />

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

            <TextMessageBoxWithSelect onSendMessage={handlePost} placeholder='Escribe tu texto aquí' disableCorrections options={voices} />
        </div>
    )
}

