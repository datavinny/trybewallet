import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { emailAction } from '../actions/index';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      isButtonDisable: true,
      isEmailValid: false,
      isPasswordValid: false,
      email: '',
    };

    this.saveEmail = this.saveEmail.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyInfo = this.verifyInfo.bind(this);
  }

  verifyPassword({ target }) {
    const { type, value } = target;
    const minLength = 6;
    // console.log(value.length);
    if (type === 'password' && value.length >= minLength) {
      // console.log('entrou!');
      this.setState({ isPasswordValid: true }, () => this.verifyInfo());
    } else {
      this.setState({ isPasswordValid: false, isButtonDisable: true });
    }
  }

  verifyEmail({ target }) {
    const { type, value } = target;
    const mailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (type === 'email' && value.match(mailRegex)) {
      this.setState({ isEmailValid: true, email: value }, () => this.verifyInfo());
    } else {
      this.setState({ isEmailValid: false, isButtonDisable: true });
    }
  }

  verifyInfo() {
    const { isEmailValid, isPasswordValid } = this.state;
    if (isEmailValid === true && isPasswordValid === true) {
      this.setState({ isButtonDisable: false });
    } else {
      this.setState({ isButtonDisable: true });
    }
  }

  saveEmail() {
    const { myDispatch } = this.props;
    const { email } = this.state;
    myDispatch(email);
    const { history } = this.props;
    history.push('./carteira');
  }

  render() {
    const { isButtonDisable } = this.state;
    return (
      <div>
        <input type="email" data-testid="email-input" onChange={ this.verifyEmail } />
        <input
          type="password"
          data-testid="password-input"
          onChange={ this.verifyPassword }
        />
        <button
          type="submit"
          disabled={ isButtonDisable }
          onClick={ this.saveEmail }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: propTypes.func,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  myDispatch: (state) => dispatch(emailAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);
