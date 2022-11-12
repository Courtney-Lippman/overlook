let fetchData = (data) => {
    return fetch(`http://localhost:3001/api/v1/${data}`)
    .then(response => {
        if (!response.ok) {
            throw new Error (`${response.status}`);
        }
        return response.json();
    });
};

let postData = (data, customerData) => {
    const dataRequest = {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    };

    return fetch(`http://localhost:3001/api/v1/${dataset}`, dataRequest)
    .then(response => {
        if(!response.ok) {
            throw new Error (`${response.status}`);
        }
        return response.json();
    });
};

export { fetchData, postData};