import React, { Component } from "react";
import { connect } from "react-redux";
import { InputField, CustomRadioButton } from "../components";
import { Container, Button, Col, Row } from "react-bootstrap";

import { triggerTrailing } from "../redux/actions/websocketActions";

import { websocketPriceTrailingSelector } from "../redux/selectors";

import styles from "../css/product.module.css";

class TrailingPrice extends Component {
  state = {
    quantity: "",
    trailingSide: "Sell"
  };

  handleOnChangeNumber = event => {
    this.setState({
      [event.target.id]: { ...this.state[event.target.id] },
      [event.target.id]: parseInt(event.target.value)
    });
  };

  onRadioChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onTrailPrice = () => {
    this.props.triggerTrailing();
  };

  render() {
    const emptyStr = "";
    const { quantity } = this.state;

    return (
      <Container className={styles.myContainer}>
        <form id="trailingPrice">
          <Row className={styles.myRow}>
            <Col>
              <InputField
                onChange={this.handleOnChangeNumber}
                value={this.state.quantity || emptyStr}
                label="Quantity"
                id="quantity"
              />
            </Col>
            <Col onChange={this.onRadioChange}>
              <CustomRadioButton
                defaultChecked
                label="Sell2"
                type="radio"
                name="trailingSide"
              />
              <CustomRadioButton
                label="Buy2"
                type="radio"
                name="trailingSide"
              />
            </Col>
            <Col>
              <Button
                onClick={this.onTrailPrice}
                className={styles.myButton}
                disabled={!quantity}
              >
                {this.props.wsTrailingPrices[0] || ""}
              </Button>
              <Button className={styles.myButton}>
                {this.props.wsTrailingPrices[1]}
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  wsTrailingPrices: websocketPriceTrailingSelector(state)
});
export default connect(
  mapStateToProps,
  { triggerTrailing }
)(TrailingPrice);
