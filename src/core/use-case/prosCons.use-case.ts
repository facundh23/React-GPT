import { ProsConsResponse } from "../../interfaces/prosCons.response";

export const ProsConsUseCase = async (prompt: string) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });
        if (!resp.ok) throw new Error('No se pudo realizar la conexión');
        const data = await resp.json() as ProsConsResponse;
        

        return {
            ok:true,
            ...data,
        }

    } catch (error) {
        return {
            ok: false,
            role: '',
            content: ''
        }
    }
}