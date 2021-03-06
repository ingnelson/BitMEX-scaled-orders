import React from "react";
import { Spinner } from "react-bootstrap";

type Props = {};

function SpinnerComponent(props: Props) {
  return (
    <Spinner animation="border" role="status" variant="success" size="sm">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export { SpinnerComponent };
