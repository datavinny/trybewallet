import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expenses: 0,
      currencies: 'BRL',
    };
  }

  render() {
    const { expenses, currencies } = this.state;
    const { email } = this.props;
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
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
