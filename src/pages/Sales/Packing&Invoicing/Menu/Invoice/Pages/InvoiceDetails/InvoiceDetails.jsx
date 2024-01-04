import React, { useRef, useState, useEffect } from "react";
// import CreateNew from "../../CreateNew/CreateNew";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Axios from "axios";
// import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";
// import { apipoints } from "../../../../../api/PackInv_API/Invoice/Invoice";
import { toast } from "react-toastify";
// import { apipoints } from "../../../../../../api/PackInv_API/Invoice/Invoice";
// apipoints
// apipoints

import Form from "../Form";
export default function InvoiceDetails() {
  const location = useLocation();
  // const [show, setShow] = useState(false);

  const [DCInvNo, setDCInvNo] = useState(location?.state);

  // const [secondary, setSecondary] = useState(second)

  // useEffect(() => {
  //   Axios.post(apipoints.invoiceDetails, {}).then((res) => {
  //     setAllCust(res.data);
  //     // console.log("getAllCust", res.data);
  //   });
  // }, []);

  // console.log("DCInvNo", DCInvNo);

  return (
    <>
      {/* <span>{DCInvNo}</span> */}
      <Form DCInvNo={DCInvNo} heading={"Invoice Details"} />
      {/* <CreateNew DCInvNo={DCInvNo} /> */}
    </>
  );
}
