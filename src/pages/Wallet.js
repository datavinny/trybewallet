import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { walletAction, expensesAction } from '../actions/index';
import Tabela from '../components/Tabela';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      isTimeToClean: false,
      total: 0,
    };
    this.enviarDespesas = this.enviarDespesas.bind(this);
    this.saveState = this.saveState.bind(this);
    this.cleanInputExpenses = this.cleanInputExpenses.bind(this);
    this.somarDespesas = this.somarDespesas.bind(this);
  }

  componentDidMount() {
    const { myDispatch } = this.props;
    myDispatch(walletAction());
  }

  saveState({ target }) {
    const { id, value } = target;
    switch (id) {
    case 'value':
      this.setState({ value });
      break;
    case 'description':
      this.setState({ description: value });
      break;
    case 'currency':
      this.setState({ currency: value });
      break;
    case 'method':
      this.setState({ method: value });
      break;
    case 'tag':
      this.setState({ tag: value });
      break;
    default:
      break;
    }
  }

  async enviarDespesas({ target }) {
    const { sendExpenses } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    await sendExpenses({ id, value, description, currency, method, tag });
    const index = id + 1;
    const inputExpenses = target.parentElement.childNodes[1].childNodes[1].childNodes[1];
    this.setState({ id: index,
      isTimeToClean: true },
    () => this.cleanInputExpenses(inputExpenses));
    this.somarDespesas();
  }

  cleanInputExpenses(inputExpenses) {
    const { isTimeToClean } = this.state;
    if (isTimeToClean === true) {
      inputExpenses.value = '';
      this.setState({ isTimeToClean: false });
    }
  }

  somarDespesas() {
    const { expenses } = this.props;
    let armazem = 0;
    expenses.forEach((objDespesa) => {
      const { value } = objDespesa;
      const { ask } = objDespesa.exchangeRates[objDespesa.currency];
      // console.log('value:', value, 'ask:', ask);
      armazem += value * ask;
      return armazem;
    });
    const total = Number.parseFloat(armazem).toFixed(2);
    this.setState({ total });
  }

  render() {
    const { total } = this.state;
    const { email, currencies, expenses } = this.props;
    return (
      <div className="App">
        <header>
          <p
            data-testid="email-field"
          >
            Email:
            { email }
          </p>
          <p
            data-testid="total-field"
          >
            { total }
          </p>
          <p
            data-testid="header-currency-field"
          >
            BRL
          </p>
        </header>
        <div>
          <p>TrybeWallet</p>
          <label htmlFor="value" onChange={ this.saveState }>
            Valor:
            <input type="number" id="value" data-testid="value-input" />
          </label>
          <label htmlFor="description" onChange={ this.saveState }>
            Description:
            <input type="text" id="description" data-testid="description-input" />
          </label>
          <label htmlFor="currency" onChange={ this.saveState }>
            Moeda:
            <select id="currency" data-testid="currency-input">
              {currencies.map((element, index) => (
                <option value={ element } key={ index }>{element}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method" onChange={ this.saveState }>
            <select id="method" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag" onChange={ this.saveState }>
            <select id="tag" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <button type="submit" onClick={ this.enviarDespesas }>Adicionar despesa</button>
        <Tabela expenses={ expenses } />
      </div>);
  }
}

Wallet.propTypes = {
  email: propTypes.string,
  currencies: propTypes.shape(propTypes.string),
  expenses: propTypes.shape(propTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  myDispatch: () => dispatch(walletAction()),
  sendExpenses: (state) => dispatch(expensesAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
