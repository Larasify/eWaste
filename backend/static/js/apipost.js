async function getBotResponse() {
    const jsondata = {"message": "hello"};
    const options = {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsondata)
    };
    const response = await fetch('/apiposttest', options);
    const responsedata = await response.json();
    console.log(responsedata);
}

