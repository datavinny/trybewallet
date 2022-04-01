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
      .then((exchangeRates) => dispatch(receiveCurrency(exchangeRates)));
  };
}

const addExpenses = (payload, exchangeRates) => ({
  type: 'ADD_EXPENSES',
  payload,
  exchangeRates,
});

function expensesAction(state) {
  return (dispatch) => {
    dispatch(requestCurrency());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((exchangeRates) => dispatch(addExpenses(state, exchangeRates)));
  };
}
export { emailAction,
  requestCurrency,
  receiveCurrency, walletAction, addExpenses, expensesAction };
