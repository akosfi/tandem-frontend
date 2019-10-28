export function makeRequest(url: string, options: any) {
    return fetch( `http://127.0.0.1:5000/api${url}`, {...options, credentials: "include"})
        .then(response => {
            if(response.status.toString().split('')[0] === '4') {
                return response.json().then(result => Promise.reject(result));
            }
            return response.json();
        });
}
