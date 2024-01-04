import React from "react";
import Table from "react-bootstrap/Table";

function InternalRejectionForm() {
  return (
    <div>
      <h4 className="form-title">Internal Rejection Form </h4>
      <hr className="horizontal-line" />
      <div className="row">
        <div className="col-md-5 col-sm-12">
          <div className="ip-box form-bg">
            <h6>Rejection Form Internal</h6>
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="ip-box form-bg">
                  <div className="row">
                    <div className="row">
                      <div className="col-md-3 ">
                        <label className="">Rejection Ref</label>
                      </div>
                      <div className="col-md-8 ">
                        <input className="in-field" readOnly />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 ">
                        <label className="">Report No</label>
                      </div>
                      <div className="col-md-8 ">
                        <input className="in-field" readOnly />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label className="">Customer</label>
                      </div>
                      <div className="col-md-8 ">
                        <input className="in-field" readOnly />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 ">
                        <label className="">Status</label>
                      </div>
                      <div className="col-md-8 ">
                        <input className="in-field" readOnly />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 ">
                        <label className="">Raised By</label>
                      </div>
                      <div className="col-md-8 ">
                        <input className="in-field" readOnly />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <label className="">Rejected Value</label>
                      </div>

                      <div className="col-md-8 ">
                        <input className="in-field" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 ">
                        <label className="">Accepted Value</label>
                      </div>
                      <div className="col-md-8 ">
                        <input className="in-field" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <button
                className="button-style "
                style={{ width: "200px", marginBottom: "20px" }}
              >
                Clear Rejection Report
              </button>
            </div>
          </div>
        </div>{" "}
        <div className="col-md-7">
          {" "}
          <div
            style={{
              height: "420px",
              overflowY: "scroll",
              border: "solid #c0c4c2 1px",
            }}
          >
            <Table bordered>
              <thead
                style={{
                  textAlign: "center",
                  position: "sticky",
                  top: "-1px",
                }}
              >
                <tr>
                  <th>ID</th>
                  <th>RejID</th>
                  <th>Dwg Name</th>
                  <th>Qty Rejected 3</th>
                  <th>Rejection Reason</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                <tr
                // onClick={() => selectedRowFn(item, key)}
                // className={
                //   key === selectedRow?.index ? "selcted-row-clr" : ""
                // }
                >
                  <td>0</td>
                  <td>1</td>
                  <td>123456789(10mm)</td>
                  <td>3</td>
                  <td>Enter a reason</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InternalRejectionForm;
