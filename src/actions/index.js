// Coloque aqui suas actions
const emailAction = (payload) => ({
  type: 'SAVE_EMAIL',
  payload,
});

const walletAction = (payload) => ({
  type: 'WALLET',
  payload,
});

export { emailAction, walletAction };
