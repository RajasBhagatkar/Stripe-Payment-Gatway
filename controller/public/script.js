let checkoutBtn = document.querySelector('button');
checkoutBtn.addEventListener('click', (e) => {
    console.log('Checkout');
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // all the items that we want
            items: [
                { id: 1, quantity: 3 },
                { id: 2, quantity: 1 }
            ]
        })
    })
        .then((res) => {
            //* if successful then return parse json and return
            if (res.ok) {
                return res.json();
            }

            //! if error then convert message into json and reject
            //! making reject explicit bcz fetch doesn't actually faile on it's own
            return res
                .json()
                .then((json) => Promise.reject(json));
        })
        .then(({ url }) => {
            // send to the user
            window.location = url;
            // console.log(url);

        })
        .catch((error) => {
            console.error(error.error);
        });
});

//? make request to a route asking stripe to give us the checkout/payment url
//* give information what we want and how much we want and server send new url for the checkout
