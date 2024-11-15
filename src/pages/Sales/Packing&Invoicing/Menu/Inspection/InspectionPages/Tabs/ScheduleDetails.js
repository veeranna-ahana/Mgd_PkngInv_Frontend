/** @format */

import { React, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Axios from "axios";
import { toast } from "react-toastify";
import { apipoints } from "../../../../../../api/PackInv_API/Inspection/InspProfi";
import YesNoModal from "../Modals/YesNoModal";
import InternalRejectionModal from "../Modals/InternalRejectionModal";
export default function ScheduleDetails(props) {
	const [VeryNewRejData, setVeryNewRejData] = useState([]);

	const {
		getOrderScheduleData,
		orderScheduleDetailsData,
		setOrderScheduleDetailsData,
		selectedScheduleDetailsRows,
		setSelectedScheduleDetailsRows,
		headerData,
	} = props;

	//console.log("selectedScheduleDetailsRows", selectedScheduleDetailsRows);
	const [smShow, setSmShow] = useState(false);
	const [lgShow, setLgShow] = useState(false);
	const [actionType, setActionType] = useState(null);
	const [rejFormData, setRejFormData] = useState([]);
	const [newRejId, setNewRejId] = useState(null);
	const [reportNo, setReportNo] = useState("Draft");
	const [rejectedValue, setRejectedValue] = useState(0);
	const [acceptedValue, setAcceptedValue] = useState(0);
	const [showTooltip, setShowTooltip] = useState(false);

	let initialValuess = selectedScheduleDetailsRows.map(
		(val) => val.QtyProduced - val.QtyCleared - val.QtyRejected
	);

	const [qtyRejectt, setQtyRejectt] = useState(initialValuess);

	const handleMouseEnter = () => {
		setShowTooltip(true);
	};

	const handleMouseLeave = () => {
		setShowTooltip(false);
	};
	const clearAndSave = () => {
		// Check if any row is selected
		if (selectedScheduleDetailsRows.length === 0) {
			toast.warning(`Please select the row.`);
			return;
		}
		// if (selectedScheduleDetailsRows.QtyDelivered != 0) {
		//   toast.warning(`Dwg was Delivered, Please choose another`);
		//   return;
		// }
		for (const row of selectedScheduleDetailsRows) {
			if (row.QtyProduced === row.QtyRejected || row.QtyDelivered != 0) {
				toast.warning(
					`Please select the rows or ensure Cleared is less than Produced`
				);
				return;
			}
		}

		setActionType("clear");
		setSmShow(true);
	};
	const resetAndSave = () => {
		// Check if any row is selected
		if (selectedScheduleDetailsRows.length === 0) {
			toast.warning(`Please select the row.`);
			return;
		}
		for (const row of selectedScheduleDetailsRows) {
			if (row.QtyProduced === row.QtyRejected) {
				toast.warning(
					`Please select the rows or ensure Cleared is less than Produced`
				);
				return;
			}
		}

		setActionType("reset");
		setSmShow(true);
	};

	const rejectAndSave = () => {
		try {
			if (
				selectedScheduleDetailsRows.length === 0 ||
				selectedScheduleDetailsRows.some(
					(row) => row.QtyCleared === row.QtyProduced
				)
			) {
				toast.warning(
					`Please select the rows or ensure Cleared is less than Produced`
				);
				return;
			}
			for (const row of selectedScheduleDetailsRows) {
				if (row.QtyRejected === row.QtyProduced) {
					toast.warning(
						`Please select the rows or ensure Cleared is less than Produced`
					);
					return;
				} else if (row.QtyCleared + row.QtyProduced == row.QtyRejected) {
					toast.warning(
						`Please select the rows or ensure Cleared is less than Produced`
					);
					return;
				}
			}

			if (selectedScheduleDetailsRows.length > 0) {
				setLgShow(true);

				Axios.post(apipoints.RejectionReport, {})
					.then((res) => {
						setRejFormData(res.data);
					})

					.catch((error) => {
						toast.error("An error occurred while saving data.");
					});
			}
		} catch (error) {}
	};

	const handleModalClose = () => {
		setLgShow(false);
		setNewRejId(null);
		setReportNo("Draft");
		setRejectedValue(0);
		setAcceptedValue(0);
	};

	const handleOkButtonClick = () => {
		if (actionType === "clear") {
			clearAndSave();
		} else if (actionType === "reset") {
			resetAndSave();
		} else if (actionType === "reject") {
			resetAndSave();
		}

		setSmShow(false);
		setActionType(null);
	};

	for (let i = 0; i < selectedScheduleDetailsRows.length; i++) {
		const element = selectedScheduleDetailsRows[i];

		console.log(
			"selectedScheduleDetailsRows.QtyDelivered",
			element.QtyDelivered
		);
	}

	// useEffect(() => {
	//   getOrderScheduleData();
	// }, []);

	// useEffect(() => {
	//   if (
	//     orderScheduleDetailsData.length > 0 &&
	//     !selectedScheduleDetailsRows.refName
	//   ) {
	//     selectedRowFn(orderScheduleDetailsData[0], 0); // Select the first row
	//   }
	// }, [orderScheduleDetailsData, selectedScheduleDetailsRows, selectedRowFn]);
	// table header filtering
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

	// sorting function for table headings of the table
	const requestSort = (key) => {
		console.log("entering into the request sort");
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const sortedData = () => {
		const dataCopy = [...orderScheduleDetailsData];

		if (sortConfig.key) {
			dataCopy.sort((a, b) => {
				let valueA = a[sortConfig.key];
				let valueB = b[sortConfig.key];

				// Convert only for the "intiger" columns
				if (
					sortConfig.key === "JWCost" ||
					sortConfig.key === "MtrlCost" ||
					sortConfig.key === "UnitPrice" ||
					sortConfig.key === "Qty_Ordered" ||
					sortConfig.key === "Total"
				) {
					valueA = parseFloat(valueA);
					valueB = parseFloat(valueB);
				}

				if (valueA < valueB) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (valueA > valueB) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
				return 0;
			});
		}
		return dataCopy;
	};
	return (
		<>
			<div className="row m-2">
				<div className="col-md-12 col-sm-12">
					<button
						className={
							props.selectedScheduleDetailsRows.length === 0 ||
							props.selectedScheduleDetailsRows.some(
								(row) =>
									row.QtyDelivered > 0 ||
									row.QtyPacked > 0 ||
									row.QtyRejected >= row.QtyProduced ||
									row.QtyCleared === row.QtyProduced ||
									row.QtyCleared + row.QtyRejected === row.QtyProduced
							)
								? "button-style button-disabled"
								: "button-style"
						}
						onClick={clearAndSave}
						disabled={
							props.selectedScheduleDetailsRows.length === 0 ||
							props.selectedScheduleDetailsRows.some(
								(row) =>
									row.QtyDelivered > 0 ||
									row.QtyPacked > 0 ||
									row.QtyRejected >= row.QtyProduced ||
									row.QtyCleared === row.QtyProduced ||
									row.QtyCleared + row.QtyRejected === row.QtyProduced
							)
						}>
						Clear All Parts
					</button>
					<button
						className={
							props.selectedScheduleDetailsRows.length === 0 ||
							props.selectedScheduleDetailsRows.some(
								(row) =>
									row.QtyDelivered > 0 ||
									row.QtyPacked > 0 ||
									row.QtyRejected === row.QtyProduced ||
									row.QtyCleared === 0
							)
								? "button-style button-disabled"
								: "button-style"
						}
						onClick={resetAndSave}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						disabled={
							props.selectedScheduleDetailsRows.length === 0 ||
							props.selectedScheduleDetailsRows.some(
								(row) =>
									row.QtyDelivered > 0 ||
									row.QtyPacked > 0 ||
									row.QtyRejected === row.QtyProduced ||
									row.QtyCleared === 0
							)
						}>
						Reset All Parts
					</button>
					<button
						className={
							props.selectedScheduleDetailsRows.length === 0 ||
							props.selectedScheduleDetailsRows.some(
								(row) =>
									row.QtyDelivered > 0 ||
									row.QtyPacked > 0 ||
									row.QtyRejected >= row.QtyProduced ||
									row.QtyCleared === row.QtyProduced ||
									row.QtyCleared + row.QtyRejected === row.QtyProduced
							)
								? "button-style button-disabled"
								: "button-style"
						}
						onClick={rejectAndSave}
						disabled={
							props.selectedScheduleDetailsRows.length === 0 ||
							props.selectedScheduleDetailsRows.some(
								(row) =>
									row.QtyDelivered > 0 ||
									row.QtyPacked > 0 ||
									row.QtyRejected >= row.QtyProduced ||
									row.QtyCleared === row.QtyProduced ||
									row.QtyCleared + row.QtyRejected === row.QtyProduced
							)
						}>
						Reject Parts
					</button>
					<YesNoModal
						show={smShow}
						setSmShow={setSmShow}
						onHide={() => setSmShow(false)}
						actionType={actionType}
						setActionType={setActionType}
						onOkButtonClick={handleOkButtonClick}
						orderScheduleDetailsData={orderScheduleDetailsData}
						setOrderScheduleDetailsData={setOrderScheduleDetailsData}
						selectedScheduleDetailsRows={selectedScheduleDetailsRows}
						setSelectedScheduleDetailsRows={setSelectedScheduleDetailsRows}
					/>
					<InternalRejectionModal
						VeryNewRejData={VeryNewRejData}
						setVeryNewRejData={setVeryNewRejData}
						show={lgShow}
						setLgShow={setLgShow}
						selectedScheduleDetailsRows={selectedScheduleDetailsRows}
						setSelectedScheduleDetailsRows={setSelectedScheduleDetailsRows}
						rejFormData={rejFormData}
						newRejId={newRejId}
						setNewRejId={setNewRejId}
						setRejFormData={setRejFormData}
						reportNo={reportNo}
						setReportNo={setReportNo}
						rejectedValue={rejectedValue}
						setRejectedValue={setRejectedValue}
						acceptedValue={acceptedValue}
						setAcceptedValue={setAcceptedValue}
						orderScheduleDetailsData={orderScheduleDetailsData}
						setOrderScheduleDetailsData={setOrderScheduleDetailsData}
						headerData={headerData}
						getOrderScheduleData={getOrderScheduleData}
						qtyRejectt={qtyRejectt}
						actionType={actionType}
						setActionType={setActionType}
						smShow={smShow}
						setSmShow={setSmShow}
						handleOkButtonClick={handleOkButtonClick}
						// qtyReject={qtyReject}
						// setQtyReject={setQtyReject}
						// rejectReason={rejectReason}
						// setRejectReason={setRejectReason}
						onHide={() => handleModalClose()}
					/>
				</div>
			</div>
			<div style={{ maxHeight: "400px", overflow: "auto" }}>
				<Table
					striped
					className="table-data border">
					<thead
						className="tableHeaderBGColor "
						style={{ whiteSpace: "nowrap", textAlign: "center" }}>
						<tr>
							<th>SL No</th>
							<th onClick={() => requestSort("DwgName")}>Dwg Name</th>
							<th onClick={() => requestSort("Mtrl_Code")}>Material</th>
							<th onClick={() => requestSort("Mtrl_Source")}>Source</th>
							<th onClick={() => requestSort("Operation")}>Process</th>
							<th onClick={() => requestSort("QtyScheduled")}>Scheduled</th>
							<th onClick={() => requestSort("QtyProduced")}>Produced</th>
							<th onClick={() => requestSort("QtyCleared")}>Cleared</th>
							<th onClick={() => requestSort("QtyRejected")}>Rejected</th>
							<th onClick={() => requestSort("QtyPacked")}>Packed</th>
							<th onClick={() => requestSort("QtyDelivered")}>Deliverd</th>
							<th onClick={() => requestSort("InDraftPN")}>In Draft PN</th>
							<th onClick={() => requestSort("Mtrl_Code")}>Pack Now</th>
							<th onClick={() => requestSort("JWCost")}>JW Cost</th>
							<th onClick={() => requestSort("MtrlCost")}>Mtrl Cost</th>
						</tr>
					</thead>
					<tbody
						className="tablebody"
						style={{ whiteSpace: "nowrap", textAlign: "center" }}>
						{/* {props.orderScheduleDetailsData?.map((val, key) => ( */}
						{sortedData()?.map((val, key) => (
							<tr
								className={
									props.selectedScheduleDetailsRows.includes(val)
										? "selectedRowClr"
										: ""
								}
								onClick={(e) => {
									if (props.selectedScheduleDetailsRows.includes(val)) {
										const newArray = props.selectedScheduleDetailsRows.filter(
											(obj) => obj.SchDetailsID != val.SchDetailsID
										);
										props.setSelectedScheduleDetailsRows(newArray);
									} else {
										props.setSelectedScheduleDetailsRows([
											...props.selectedScheduleDetailsRows,
											val,
										]);
									}
								}}>
								<td>{key + 1}</td>
								<td>{val.DwgName}</td>
								<td>{val.Mtrl_Code}</td>
								<td>{val.Mtrl_Source}</td>
								<td>{val.Operation}</td>
								<td>{val.QtyScheduled}</td>
								<td>{val.QtyProduced}</td>
								<td>{val.QtyCleared}</td>
								<td>{val.QtyRejected}</td>
								<td>{val.QtyPacked}</td>
								<td>{val.QtyDelivered}</td>
								<td>{val.InDraftPN}</td>
								<td>
									{parseInt(val.QtyCleared) -
										parseInt(val.QtyPacked) -
										parseInt(val.InDraftPN)}
								</td>
								<td>{parseFloat(val.JWCost).toFixed(2)}</td>
								<td>{parseFloat(val.MtrlCost).toFixed(2)}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</>
	);
}
