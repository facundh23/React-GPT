

export const ProsConsStreamUseCase = async (prompt: string) => {
    try {
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ prompt }),
            // Todo: ABORT SIGNAL
        });
        if (!resp.ok) throw new Error('No se pudo realizar la conexión');
        
        const reader = resp.body?.getReader();
        if(!reader) return null

        return reader;


    } catch (error) {
        return null
    }
}