import React from "react";

export class Cidade extends React.Component {
  render() {
    return (
      <g
        _ngcontent-c18=""
        fill={this.props.fill}
        className={this.props.className}
        codigo={this.props.codigo}
        nome={this.props.nome}
        faixa={this.props.faixa}
      >
        <polygon
          _ngcontent-c18=""
          points={this.props.points}
          style={{ strokeWidth: "0.00810007px" }}
        />
      </g>
    );
  }
}
