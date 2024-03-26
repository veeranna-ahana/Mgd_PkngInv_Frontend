import React, { useRef, useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import Form from "../Form";

export default function InvoiceDetails() {
  const location = useLocation();

  const [DCInvNo, setDCInvNo] = useState(location?.state);

  return (
    <>
      <Form DCInvNo={DCInvNo} heading={"Invoice Details"} />
    </>
  );
}
