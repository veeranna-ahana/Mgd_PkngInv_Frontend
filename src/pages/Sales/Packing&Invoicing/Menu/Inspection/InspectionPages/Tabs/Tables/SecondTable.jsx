import React from "react";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";

export default function SecondTable(props) {
  return (
    <>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Type</th>
            <th>PN No</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="tablebody">
          {props.invRegisterData?.map((val, key) => (
            <tr
              onClick={(e) => {
                // console.log("vallllllllll", val.DC_Inv_No);
                props.setInvDetailsData([]);
                props.setSelectedRegisterRow({});

                if (
                  props.selectedRegisterRow.DC_Inv_No === val.DC_Inv_No
                  // props.invDetailsData.filter(
                  //   (obj) => obj.DC_Inv_No === val.DC_Inv_No
                  // )?.length > 0
                ) {
                  props.setInvDetailsData([]);
                  props.setSelectedRegisterRow({});
                } else {
                  props.setSelectedRegisterRow(val);
                  const newArray = props.allInvDetailsData.filter(
                    (obj) => obj.DC_Inv_No === val.DC_Inv_No
                  );

                  if (newArray.length > 0) {
                    props.setInvDetailsData(newArray);
                  } else {
                    toast.warning("No data found for the row");
                  }
                }
              }}
              className={
                props.selectedRegisterRow.DC_Inv_No === val.DC_Inv_No
                  ? // props.invDetailsData.filter(
                    //   (obj) => obj.DC_Inv_No === val.DC_Inv_No
                    // )?.length > 0
                    "selected-row"
                  : ""
              }
              // props.selectedReadyForPackingRows.includes(val)
            >
              <td>{val.DC_InvType}</td>
              <td>{val.DC_No}</td>
              <td>{val.DCStatus}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
