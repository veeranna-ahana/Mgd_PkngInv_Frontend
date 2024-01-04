import React from "react";

import {
  Container,
  Form,
  Table,
  Row,
  Col,
  FormLabel,
  Button,
  Tabs,
  Tab,
  FormControl,
} from "react-bootstrap";
function InvoiceForm() {
  return (
    <div>
      <h4 className="title">Magod Invoice Form</h4>
      <div className="row">
        <div className="col-md-4">
          <label className="form-label">Invoice Form</label>
          <input />
          <label className="form-label">Invoice No</label>
          <input />

          <label className="form-label">Status</label>
          <input />
        </div>
        <div className="col-md-4">
          <label className="form-label">Order Ref</label>
          <input />
          <label className="form-label">PO No</label>
          <input />
          <label className="form-label">Consignee </label>
          <input />
        </div>
        <div className="col-md-4">
          {" "}
          <label className="form-label">P N No</label>
          <input />
          <label className="form-label">Date</label>
          <input />
        </div>
      </div>
      <div className="row">
        <div className="col-md-10 mt-3">
          <Tabs id="controlled-tab-example" className="mb-3 mt-3 tab_font">
            <Tab eventKey="mat_rece" title="Consignee Info">
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label">Address</label>
                  <textarea
                    type="textarea"
                    rows={3}
                    value={""}
                    style={{
                      width: "320px",
                      height: "100px",
                    }}
                  />
                  <div className="row">
                    <div className="col-md-6">
                      <input type="text" value={""} />
                    </div>
                    <div className="col-md-6">
                      <input type="text" value={""} />
                    </div>
                  </div>
                  <input type="text" value={""} />
                </div>
                <div className="col-md-4">
                  {" "}
                  <label className="form-label">Delivery</label>
                  <textarea
                    type="textarea"
                    rows={3}
                    value={""}
                    style={{
                      width: "300px",
                      height: "160px",
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">GST No</label>
                  <input type="text" />
                  <label className="form-label">GST Tax State</label>
                  <input type="text" />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12">
                  <label className="form-label">Schedule Instructions</label>
                  <input />
                </div>
              </div>
            </Tab>

            <Tab eventKey="mat_retu" title="Invoicing Info"></Tab>
          </Tabs>
        </div>
      </div>
      <div className="row justify-content-start mt-2 mb-4">
        <button className="button-style" style={{ width: "120px" }}>
          Load Rates
        </button>
        <button className="button-style" style={{ width: "120px" }}>
          Set Rates
        </button>
        <button className="button-style" style={{ width: "120px" }}>
          Cancel PN
        </button>
      </div>
      <div className="row">
        <div
          className="col-md-6"
          style={{ height: "300px", overflowY: "scroll" }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor tablebody">
              <tr>
                <th>Drawing Name</th>
                <th>Material</th>
                <th>Quantity</th>
                <th>Unit Rates</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              <tr>
                <td>asdfghj</td>
                <td>asdf</td>
                <td>asdf</td>
                <td>asdf</td>
                <td>asdf</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div className="col-md-6">
          <div>
            <div className="row mb-3">
              <div className="col-md-4 ">
                <label className="form-label">Assessable Value</label>
              </div>
              <div className="col-md-8">
                {" "}
                <input />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Select Tax</label>
              </div>
              <div className="col-md-4">
                {" "}
                <input />
              </div>
              <div className="col-md-4">
                {" "}
                <input />
              </div>
            </div>
          </div>
          <div style={{ height: "200px", overflowY: "scroll" }}>
            <Table striped className="table-data border">
              <thead className="tableHeaderBGColor tablebody">
                <tr>
                  <th>Tax Nmae</th>
                  <th>Taxable Amount No</th>
                  <th>Tax Percent</th>
                  <th>Tax Amount</th>
                </tr>
              </thead>
              <tbody className="tablebody">
                <tr>
                  <td>asdfghj</td>
                  <td>asdf</td>
                  <td>asdf</td>
                  <td>asdf</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;
