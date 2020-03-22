import React from "react";
import { withStyles, makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import { Cities } from "./Cities";

const styles = {
  paper: {
    padding: "20px",
    width: "14vw"
  },
  popover: {
    pointerEvents: "none"
  },
  mapa: {
    maxHeight: "550px"
  }
};

class Mapa extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openedPopoverId: null,
      anchorEl: null
    };
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
    this.handlePopoverClose = this.handlePopoverClose.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(e) {
    if (e.target.tagName === "svg") {
      this.handlePopoverClose();
    }
  }

  handlePopoverOpen(event, popoverId) {
    console.log(event.target);
    if (popoverId === this.state.openedPopoverId) {
      this.handlePopoverClose();
      return;
    }
    this.setState({
      openedPopoverId: popoverId,
      anchorEl: event.target
    });
  }

  handlePopoverClose() {
    this.setState({
      openedPopoverId: null,
      anchorEl: null
    });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, openedPopoverId } = this.state;
    const cities = Cities;

    return (
      <svg
        _ngcontent-c18=""
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-74.35858499999999 6.743615 8.100069999999988 4.7700700000000005"
        onClick={e => this.handleClickOutside(e)}
        className={classes.mapa}
      >
        <g _ngcontent-c18="" className="uf" transform="scale(1 -1)">
          {cities.map(m => (
            <g _ngcontent-c18="" vectorEffect="non-scaling-stroke" key={m._id}>
              <g
                _ngcontent-c18=""
                fill={m.fill}
                className={m.className}
                codigo={m.codigo}
                nome={m.nome}
                faixa={m.faixa}
              >
                <polygon
                  _ngcontent-c18=""
                  points={m.points}
                  id={m.nome}
                  style={{ strokeWidth: "0.00810007px" }}
                  onClick={e => this.handlePopoverOpen(e, m._id)}
                />
              </g>

              <Popover
                className={classes.popover}
                classes={{
                  paper: classes.paper
                }}
                open={openedPopoverId === m._id}
                anchorEl={anchorEl}
                onClose={this.handlePopoverClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                key={m.nome}
                disableRestoreFocus
              >
                <Typography>
                  {m.nome}
                  Casos: MOrtes:
                </Typography>
              </Popover>
            </g>
          ))}
        </g>
      </svg>
    );
  }
}

export default withStyles(styles)(Mapa);
