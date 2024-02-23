import { TranslateResp } from "../../interfaces";


export const translateTextuseCase = async (prompt:string, lang:string) => {
   
    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`,{
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({prompt, lang}),
        });
        if (!resp.ok) throw new Error('No se pudo realizar la solicitud');
        const {content} = await resp.json() as TranslateResp;
        
        return {
            ok:true, 
            message:content
        }
    } catch (error) {
        return {
            ok:false,
            message:'No se pudo traducir'
        };
    }
}   