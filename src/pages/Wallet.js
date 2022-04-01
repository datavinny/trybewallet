import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { walletAction } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expenses: 0,
      currencies: 'BRL',
    };
  }

  componentDidMount() {
    const { myDispatch } = this.props;
    myDispatch(walletAction());
  }

  render() {
    const { expenses, currencies } = this.state;
    const { email, wallet } = this.props;
    console.log(wallet);
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
            { currencies }
          </p>
        </header>
        TrybeWallet
      </div>);
  }
}

Wallet.propTypes = {
  email: propTypes.string,
  wallet: propTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  myDispatch: () => dispatch(walletAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
