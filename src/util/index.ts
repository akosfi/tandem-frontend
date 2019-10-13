export function makeRequest(url: string, options: any) {
    return fetch( `http://localhost:8000${url}`, {...options})
        .then(response => {
            if(response.status.toString().split('')[0] === '4') {
                throw new Error(response.status.toString());
            }
            return response.json()
        });
}
