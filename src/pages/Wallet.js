import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { walletAction } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expenses: 0,
      currencie: 'BRL',
    };
  }

  componentDidMount() {
    const { myDispatch } = this.props;
    myDispatch(walletAction());
  }

  render() {
    const { expenses, currencie } = this.state;
    const { email, currencies } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <p
            data-testid="email-field"
          >
            Email:
            { email }
          </p>
          <p
            data-testid="total-field"
          >
            Despesa Total:
            { expenses }
          </p>
          <p
            data-testid="header-currency-field"
          >
            { currencie }
          </p>
        </header>
        <div>
          <p>TrybeWallet</p>
          <label htmlFor="valor">
            Valor:
            <input type="number" id="valor" data-testid="value-input" />
          </label>
          <label htmlFor="description">
            Description:
            <input type="text" id="description" data-testid="description-input" />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select id="moeda">
              {currencies.map((element, index) => (
                <option value={ element } key={ index }>{element}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            <select id="method" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Crédito">Cartão de crédito</option>
              <option value="Débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select id="tag" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
