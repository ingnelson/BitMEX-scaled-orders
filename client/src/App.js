import React, { Suspense, lazy } from "react";

import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import { showPreviewSelector } from "./redux/selectors";

import { previewOrders } from "./redux/actions/previewActions";

import ScaledOrders from "./containers/ScaledOrders";
import TrailingPrice from "./containers/TrailingPrice";

import styles from "./css/product.module.css";

const OrdersPreviewTable = lazy(() =>
  import("./components/OrdersPreviewTable")
);

const App = ({ showPreview }) => {
  return (
    <>
      <TrailingPrice />
      <ScaledOrders />
      {showPreview && (
        <Container className={styles.myContainer}>
          <Suspense fallback={<div>Loading...</div>}>
            <OrdersPreviewTable />
          </Suspense>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  // preview: state.preview
  showPreview: showPreviewSelector(state)
});
export default connect(
  mapStateToProps,
  {
    previewOrders
  }
)(App);
