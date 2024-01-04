import React from "react";
import Table from "react-bootstrap/Table";

export default function ThirdTable(props) {
  const modifyInvDetailsData = (e, key) => {
    const newArray = [];

    for (let i = 0; i < props.invDetailsData.length; i++) {
      const element = props.invDetailsData[i];

      if (i === key) {
        element[e.target.name] = parseFloat(e.target.value);
      }

      newArray.push(element);
    }

    props.setInvDetailsData(newArray);
  };

  return (
    <>
      <Table striped className="table-data border" style={{ border: "1px" }}>
        <thead className="tableHeaderBGColor">
          <tr>
            <th>Dwg No</th>
            <th>Material</th>
            <th>Qty</th>
            <th>Unit Wt</th>
          </tr>
        </thead>
        <tbody className="tablebody">
          {props.invDetailsData?.map((val, key) => (
            <tr>
              <td>{val.Dwg_No}</td>
              <td>{val.Mtrl}</td>
              <td>
                <input
                  type="number"
                  name="Qty"
                  disabled={val.DespStatus != "Draft"}
                  className={val.DespStatus != "Draft" ? "input-disabled" : ""}
                  style={{ background: "none", border: "none" }}
                  value={parseFloat(val.Qty)}
                  onChange={(e) => {
                    modifyInvDetailsData(e, key);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="Unit_Wt"
                  disabled={val.DespStatus != "Draft"}
                  className={val.DespStatus != "Draft" ? "input-disabled" : ""}
                  style={{ background: "none", border: "none" }}
                  value={parseFloat(val.Unit_Wt)}
                  onChange={(e) => {
                    modifyInvDetailsData(e, key);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
