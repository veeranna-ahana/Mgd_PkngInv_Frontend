<div
  className="modal show"
  size="lg"
  style={{ display: "block", position: "initial" }}
>
  <Modal.Dialog fullscreen>
    <Modal.Header style={{ padding: "0px" }}>
      <Modal.Title> Rejection Form Internal</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>
        <div className="row ">
          <div className="col-md-6 form-bg">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Customer</label>
              <input className="" value={""} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 form-bg">
            <label className="form-label">Rejection Ref</label>
            <input type="text" value={""} />
          </div>
          <div className="col-md-3 form-bg">
            <label className="form-label">Report No</label>
            <input type="text" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 form-bg">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Status</label>
              <input className="" value={""} />
            </div>
          </div>
          <div className="col-md-3 form-bg">
            <div style={{ marginBottom: "9px" }}>
              <label className="form-label">Raised By</label>
              <input
                className=""
                // value={tbldata.selectRow.Schedule_Status}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 form-bg">
            <label className="form-label">Rejected Value</label>
            <input className="" value={""} />
          </div>

          <div className="col-md-3 form-bg">
            <label className="form-label">Accepted Value </label>
            <input className="" value={""} />
          </div>
          <div className="col-md-3 justify-content-center mt-4 ">
            <button
              className="button-style "
              style={{ width: "200px", marginBottom: "20px" }}
            >
              Clear Rejection Report
            </button>
          </div>
        </div>
      </div>

      <div style={{ height: "400px", overflowY: "scroll" }}>
        <Table striped className="table-data border mt-3">
          <thead
            className="tableHeaderBGColor "
            style={{ whiteSpace: "nowrap", textAlign: "center" }}
          >
            <tr>
              <th>Id</th>
              <th>Rej_Id</th>
              <th>Dwg_Name</th>
              <th>Qty_Rejected</th>
              <th>Rejection_Reason</th>
            </tr>
          </thead>
          {/* <tbody
                className="tablebody"
                style={{ whiteSpace: "nowrap", textAlign: "center" }}
              >
                {"schdetails" && schdetails.length > 0
                  ? schdetails.map((val, i) => (
                      <tr key={i}>
                        <td>Id</td>
                        <td>Rej_Id</td>
                         <td>Dwg_Name</td>
                        <td>Qty_Rejected</td>
                        <td>Rejection_Reason</td>
                      </tr>
                    ))
                  : null}
              </tbody> */}
        </Table>
      </div>
    </Modal.Body>
  </Modal.Dialog>
</div>;
