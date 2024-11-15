import { baseURL } from "./backend";


export const POSTFetch = (
    endpoint:string, 
    bodyObj:object, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (data: any) => void
) =>{

    

    fetch(baseURL + endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}

