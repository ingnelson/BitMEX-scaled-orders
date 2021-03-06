import React, { useEffect, useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  errorSelector,
  websocketCurrentPrice,
  wsLoadingSelector,
  messageSelector,
  // getAskPrice,
  websocketLoadingSelector,
  websocketConnectedSelector
} from "../../redux/selectors";

import { postOrder, previewOrders } from "../../redux/actions/previewActions";

import {
  wsConnect,
  wsDisconnect,
  wsTickerChange
} from "../../redux/actions/websocketActions";

import {
  InputField,
  SelectDropdown,
  CustomRadioButton,
  // OrdersPreviewTable,
  SpinnerComponent
} from "../../components";

import { AppState } from "../../redux/models/state";

import {
  AppComponentProps,
  AppComponentState,
  PickEventScaled
} from "../../@types";

import styles from "./styles.module.css";

const initialState = Object.freeze({
  quantity: "",
  n_tp: "",
  start: "",
  end: "",
  distribution: "Uniform",
  side: "Sell",
  symbol: "XBTUSD"
});

export default function ScaledContainer() {
  const dispatch = useDispatch();
  const {
    error,
    wsCurrentPrice,
    loading,
    loadingreq,
    connected,
    message
  } = useSelector(
    (state: AppState) => ({
      error: errorSelector(state),
      // wsError: state.websocket.error,
      wsCurrentPrice: websocketCurrentPrice(state),
      loading: websocketLoadingSelector(state),
      loadingreq: wsLoadingSelector(state),
      connected: websocketConnectedSelector(state),
      message: messageSelector(state)
    }),
    shallowEqual
  );

  const [state, setState] = useState<AppComponentState>(initialState);

  useEffect((): any => {
    dispatch(wsConnect());
    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value, id } = event.target;
    dispatch(wsTickerChange(value));
    setState(prevState => ({ ...prevState, [id]: value }));
  }

  function handleOnChangeNumber(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    const { id, value } = event.target;
    setState(prevState => ({ ...prevState, [id]: parseFloat(value) }));
  }

  function onOrderSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    dispatch(postOrder(state));
  }

  function onRadioChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  function onPreviewOrders(): void {
    dispatch(previewOrders(state));
  }

  return (
    <>
      <Container className={styles.myContainer}>
        <form id="orderForm">
          <Row className={styles.myRow}>
            <Col>
              <SelectDropdown
                instruments={["XBTUSD", "ETHUSD"]}
                id="symbol"
                onChange={handleOnChange}
                label="Instrument"
              />
            </Col>
            <Col onChange={onRadioChange}>
              <CustomRadioButton
                defaultChecked
                label="Sell"
                type="radio"
                name="side"
              />
              <CustomRadioButton label="Buy" type="radio" name="side" />
            </Col>
            <Col>
              <div className={styles.myText}>Current price:</div>
            </Col>
            <Col>
              <div className={styles.myTextField}>
                {loading ? "Loading..." : wsCurrentPrice}
                {/* {wsCurrentPrice || (loading && <SpinnerComponent />)} */}
              </div>
            </Col>
          </Row>

          <Row className={styles.myRow}>
            <Col>
              <InputField
                onChange={handleOnChangeNumber}
                value={state.quantity}
                label="Quantity"
                id="quantity"
              />
            </Col>
            <Col>
              <InputField
                onChange={handleOnChangeNumber}
                value={state.n_tp}
                label="Order count"
                id="n_tp"
              />
            </Col>
            <Col>
              <InputField
                onChange={handleOnChangeNumber}
                value={state.start}
                label="Range start USD"
                id="start"
              />
            </Col>
            <Col>
              <InputField
                onChange={handleOnChangeNumber}
                value={state.end}
                label="Range end USD"
                id="end"
              />
            </Col>
          </Row>

          <Row className={styles.myRow}>
            <Col onChange={onRadioChange}>
              <CustomRadioButton
                defaultChecked
                label="Uniform"
                type="radio"
                name="distribution"
              />
              <CustomRadioButton
                label="Normal"
                type="radio"
                name="distribution"
              />
              <CustomRadioButton
                label="Positive"
                type="radio"
                name="distribution"
              />
              <CustomRadioButton
                label="Negative"
                type="radio"
                name="distribution"
              />
            </Col>
            <Col className={styles.myErrorMessage}>{error /* || wsError*/}</Col>

            <Col className="">
              <Col className="text-right">
                <Button
                  onClick={onPreviewOrders}
                  variant="link"
                  className={styles.myTextButton}
                  disabled={
                    !(
                      state.quantity &&
                      state.n_tp &&
                      state.start &&
                      state.end
                    ) || state.quantity < state.n_tp
                  }
                >
                  Preview
                </Button>
              </Col>
            </Col>

            <Col>
              <Button
                onClick={onOrderSubmit}
                className={styles.myButton}
                disabled={
                  !(state.quantity && state.n_tp && state.start && state.end) ||
                  state.quantity < state.n_tp
                }
              >
                Submit{loadingreq && <SpinnerComponent />}
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
      {/* <div style={{ color: "white" }}>{this.props.message}</div> */}
    </>
  );
}

// const mapStateToProps = (state: AppState, ownProps: any) => ({
//   error: errorSelector(state),
//   // wsError: state.websocket.error,
//   wsCurrentPrice: websocketCurrentPrice(state),
//   loading: websocketLoadingSelector(state),
//   loadingreq: wsLoadingSelector(state),
//   connected: websocketConnectedSelector(state),
//   message: messageSelector(state)
// });

// export default connect(mapStateToProps, {
//   postOrder,
//   previewOrders,
//   wsConnect,
//   wsDisconnect,
//   wsTickerChange
// })(ScaledContainer);

// import React from "react";

// import { Container, Row, Col, Button } from "react-bootstrap";
// import { connect, useEffect } from "react-redux";

// import {
//   errorSelector,
//   websocketCurrentPrice,
//   wsLoadingSelector,
//   messageSelector,
//   // getAskPrice,
//   websocketLoadingSelector,
//   websocketConnectedSelector
// } from "../../redux/selectors";

// import { postOrder, previewOrders } from "../../redux/actions/previewActions";

// import {
//   wsConnect,
//   wsDisconnect,
//   wsTickerChange
// } from "../../redux/actions/websocketActions";

// import {
//   InputField,
//   SelectDropdown,
//   CustomRadioButton,
//   // OrdersPreviewTable,
//   SpinnerComponent
// } from "../../components";

// import { AppState } from "../../redux/models/state";

// import {
//   AppComponentProps,
//   AppComponentState,
//   PickEventScaled
// } from "../../@types";

// import styles from "./styles.module.css";

// const handleOnChange = Symbol();
// const handleOnChangeNumber = Symbol();
// const onOrderSubmit = Symbol();
// const onRadioChange = Symbol();
// const onPreviewOrders = Symbol();

// const initialState: { [key: string]: any } = Object.freeze({
//   quantity: "",
//   n_tp: "",
//   start: "",
//   end: "",
//   distribution: "Uniform",
//   side: "Sell",
//   symbol: "XBTUSD"
// });

// class ScaledContainer extends React.PureComponent<
//   AppComponentProps,
//   AppComponentState
// > {
//   readonly state = initialState;

//   // useEffect(() => {
//   //   this.props.wsConnect();

//   // }, [])

//   async componentDidMount() {
//     this.props.wsConnect();
//   }

//   // componentDidUpdate(
//   //   prevProps: AppComponentProps,
//   //   prevState: AppComponentState
//   // ) {
//   //   if (prevProps.connected !== this.props.connected) {
//   //     this.props.wsPriceSubscribe(this.state.symbol);
//   //   }
//   // }
//   componentWillUnmount() {
//     console.log("componentWillUnmount call.");
//     this.props.wsDisconnect();
//   }

//   [handleOnChange] = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     const { value, id } = event.target;

//     this.props.wsTickerChange(value);
//     this.setState({
//       [id]: value
//     } as PickEventScaled);
//   };

//   [handleOnChangeNumber] = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ): void => {
//     const { id, value } = event.target;
//     this.setState({
//       [id]: { ...this.state[id] },
//       [id]: parseFloat(value)
//     } as PickEventScaled);
//   };

//   [onOrderSubmit] = (event: React.MouseEvent<HTMLButtonElement>): void => {
//     event.preventDefault();
//     this.props.postOrder(this.state);
//   };

//   [onRadioChange] = (event: React.ChangeEvent<HTMLInputElement>): void => {
//     this.setState({
//       [event.target.name]: event.target.value
//     } as PickEventScaled);
//   };

//   [onPreviewOrders] = (): void => {
//     this.props.previewOrders(this.state);
//   };

//   render() {
//     const { error, wsError, wsCurrentPrice, loading, loadingreq } = this.props;
//     const { quantity, n_tp, start, end } = this.state;
//     return (
//       <>
//         <Container className={styles.myContainer}>
//           <form id="orderForm">
//             <Row className={styles.myRow}>
//               <Col>
//                 <SelectDropdown
//                   instruments={["XBTUSD", "ETHUSD"]}
//                   id="symbol"
//                   onChange={this[handleOnChange]}
//                   label="Instrument"
//                 />
//               </Col>
//               <Col onChange={this[onRadioChange]}>
//                 <CustomRadioButton
//                   defaultChecked
//                   label="Sell"
//                   type="radio"
//                   name="side"
//                 />
//                 <CustomRadioButton label="Buy" type="radio" name="side" />
//               </Col>
//               <Col>
//                 <div className={styles.myText}>Current price:</div>
//               </Col>
//               <Col>
//                 <div className={styles.myTextField}>
//                   {loading ? "Loading..." : wsCurrentPrice}
//                   {/* {wsCurrentPrice || (loading && <SpinnerComponent />)} */}
//                 </div>
//               </Col>
//             </Row>

//             <Row className={styles.myRow}>
//               <Col>
//                 <InputField
//                   onChange={this[handleOnChangeNumber]}
//                   value={this.state.quantity}
//                   label="Quantity"
//                   id="quantity"
//                 />
//               </Col>
//               <Col>
//                 <InputField
//                   onChange={this[handleOnChangeNumber]}
//                   value={this.state.n_tp}
//                   label="Order count"
//                   id="n_tp"
//                 />
//               </Col>
//               <Col>
//                 <InputField
//                   onChange={this[handleOnChangeNumber]}
//                   value={this.state.start}
//                   label="Range start USD"
//                   id="start"
//                 />
//               </Col>
//               <Col>
//                 <InputField
//                   onChange={this[handleOnChangeNumber]}
//                   value={this.state.end}
//                   label="Range end USD"
//                   id="end"
//                 />
//               </Col>
//             </Row>

//             <Row className={styles.myRow}>
//               <Col onChange={this[onRadioChange]}>
//                 <CustomRadioButton
//                   defaultChecked
//                   label="Uniform"
//                   type="radio"
//                   name="distribution"
//                 />
//                 <CustomRadioButton
//                   label="Normal"
//                   type="radio"
//                   name="distribution"
//                 />
//                 <CustomRadioButton
//                   label="Positive"
//                   type="radio"
//                   name="distribution"
//                 />
//                 <CustomRadioButton
//                   label="Negative"
//                   type="radio"
//                   name="distribution"
//                 />
//               </Col>
//               <Col className={styles.myErrorMessage}>{error || wsError}</Col>

//               <Col className="">
//                 <Col className="text-right">
//                   <Button
//                     onClick={this[onPreviewOrders]}
//                     variant="link"
//                     className={styles.myTextButton}
//                     disabled={
//                       !(quantity && n_tp && start && end) || quantity < n_tp
//                     }
//                   >
//                     Preview
//                   </Button>
//                 </Col>
//               </Col>

//               <Col>
//                 <Button
//                   onClick={this[onOrderSubmit]}
//                   className={styles.myButton}
//                   disabled={
//                     !(quantity && n_tp && start && end) || quantity < n_tp
//                   }
//                 >
//                   Submit{loadingreq && <SpinnerComponent />}
//                 </Button>
//               </Col>
//             </Row>
//           </form>
//         </Container>
//         {/* <div style={{ color: "white" }}>{this.props.message}</div> */}
//       </>
//     );
//   }
// }

// const mapStateToProps = (state: AppState, ownProps: any) => ({
//   error: errorSelector(state),
//   // wsError: state.websocket.error,
//   wsCurrentPrice: websocketCurrentPrice(state),
//   loading: websocketLoadingSelector(state),
//   loadingreq: wsLoadingSelector(state),
//   connected: websocketConnectedSelector(state),
//   message: messageSelector(state)
// });

// export default connect(mapStateToProps, {
//   postOrder,
//   previewOrders,
//   wsConnect,
//   wsDisconnect,
//   wsTickerChange
// })(ScaledContainer);
