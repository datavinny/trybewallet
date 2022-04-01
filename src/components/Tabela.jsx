import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Tabela extends Component {
  constructor() {
    super();
  }

  render() {
    // const { expenses } = this.props;
    return (
      <div>
        <table border="1" cellSpacing="1" width="500">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

Tabela.propTypes = {
  expenses: propTypes.shape(propTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Tabela);
