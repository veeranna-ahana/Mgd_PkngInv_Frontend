import React from "react";
import Table from "react-bootstrap/Table";

export default function FirstTable(props) {
  return (
    <>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Dwg Name</th>
            <th>Material</th>
            <th>Scheduled</th>
            <th>Produced</th>
            <th>Cleared</th>
            <th>InDraftPN</th>
            <th>Pack Now</th>
            <th>Pkng</th>
          </tr>
        </thead>
        <tbody className="tablebody">
          {props.orderScheduleDetailsData?.map((val, key) => (
            <tr
              className={
                props.selectedReadyForPackingRows.includes(val)
                  ? "selectedRowClr"
                  : ""
              }
              onClick={(e) => {
                if (props.selectedReadyForPackingRows.includes(val)) {
                  const newArray = props.selectedReadyForPackingRows.filter(
                    (obj) => obj.SchDetailsID != val.SchDetailsID
                  );
                  props.setSelectedReadyForPackingRows(newArray);
                } else {
                  props.setSelectedReadyForPackingRows([
                    ...props.selectedReadyForPackingRows,
                    val,
                  ]);
                }
              }}
              style={
                parseInt(val.QtyCleared) -
                  parseInt(val.QtyPacked) -
                  parseInt(val.InDraftPN) ===
                0
                  ? { backgroundColor: "#9dff9d" }
                  : parseInt(val.QtyCleared) -
                      parseInt(val.QtyPacked) -
                      parseInt(val.InDraftPN) >
                    0
                  ? { backgroundColor: "#31c531" }
                  : null
              }
            >
              <td>{val.DwgName}</td>
              <td>{val.Mtrl_Code}</td>
              <td>{val.QtyScheduled}</td>
              <td>{val.QtyProduced}</td>
              <td>{val.QtyCleared}</td>
              <td>{val.InDraftPN}</td>
              <td>
                {parseInt(val.QtyCleared) -
                  parseInt(val.QtyPacked) -
                  parseInt(val.InDraftPN)}
              </td>
              <td>{val.PackingLevel}</td>
            </tr>
          ))}

          {/* {props.schdetails?.map((val, i) => (
            <tr
              key={i}
              onClick={(e) => {
                props.handleCheckboxChange(val.SchDetailsID);
              }}
              className={
                props.selectedRows.includes(val.SchDetailsID)
                  ? "selectedRowClr"
                  : ""
              }
            >
              <td>{val.DwgName}</td>
              <td>{val.Mtrl_Code}</td>
              <td>{val.QtyScheduled}</td>
              <td>{val.QtyProduced}</td>
              <td>{val.QtyCleared}</td>
              <td>{val.InDraftPn}</td>
              <td>{val.PackingLevel}</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </>
  );
}

// {/* <td>
//               <input
//                 type="checkbox"
//                 checked={props.selectedRows.includes(val.SchDetailsID)} // Change 'i' to 'val.SchDetailsID'
//                 onChange={() =>
//                   handleCheckboxChange(val.SchDetailsID)
//                 } // Change 'i' to 'val.SchDetailsID'
//               />
//             </td> */}
