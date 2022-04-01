import React, { Component } from 'react';
import propTypes from 'prop-types';
// import { connect } from 'react-redux';

class Tabela extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1">
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
          {expenses.map((obj, index) => (
            <tbody key={ index }>
              <tr>
                <td>{obj.description}</td>
                <td>{obj.tag}</td>
                <td>{obj.method}</td>
                <td>{Number.parseFloat(obj.value).toFixed(2)}</td>
                <td>{obj.exchangeRates[obj.currency].name}</td>
                <td>
                  {Number.parseFloat(obj.exchangeRates[obj.currency].ask).toFixed(2)}
                </td>
                <td>{obj.value * obj.exchangeRates[obj.currency].ask}</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Deletar</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}

Tabela.propTypes = {
  expenses: propTypes.shape(propTypes.string),
}.isRequired;

// const mapStateToProps = (state) => ({
//   expenses: state.wallet.expenses,
// });

// export default connect(mapStateToProps, null)(Tabela);
export default Tabela;
