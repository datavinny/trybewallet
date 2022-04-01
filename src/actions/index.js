// Coloque aqui suas actions
const emailAction = (payload) => ({
  type: 'SAVE_EMAIL',
  payload,
});

const requestCurrency = () => ({
  type: 'REQUEST_CURRENCY',
});

const receiveCurrency = (payload) => ({
  type: 'RECEIVE_CURRENCY',
  payload,
});

function walletAction() {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currency) => dispatch(receiveCurrency(currency)));
  };
}

export { emailAction, requestCurrency, receiveCurrency, walletAction };
