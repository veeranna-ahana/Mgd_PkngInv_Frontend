import React from "react";
import Form from "../../Pages/Form";

export default function MSIMaterialReturn() {
  return (
    <>
      <Form
        DC_InvType={"Material Scrap Return"}
        InvoiceFor={"Material"}
        heading={"Material Scrap Return Create New"}
      />
    </>
  );
}
