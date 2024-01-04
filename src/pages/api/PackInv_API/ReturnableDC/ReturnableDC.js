import { url } from "../../API";

// console.log('url', url)

export const apipoints = {
  setup: `${url}/pnrdc/setup`,
  getAllCust: `${url}/pnrdc/getAllCust`,
  getCustomerDetails: `${url}/pnrdc/getCustomerDetails`,
  postCustDetails: `${url}/pnrdc/postCustDetails`,
  getStates: `${url}/pnrdc/getStates`,
  loadTaxes: `${url}/pnrdc/loadTaxes`,
  taxSelection: `${url}/pnrdc/taxSelection`,
  updateCust: `${url}/pnrdc/updateCust`,
  materials: `${url}/pnrdc/materials`,
  returnDetails: `${url}/pnrdc/returnDetails`,
  getTableData: `${url}/pnrdc/getTableData`,
  deleteRow: `${url}/pnrdc/deleteRow`,
  updateSave: `${url}/pnrdc/updateSave`,
  createDC: `${url}/pnrdc/createDC`,
  receiveReturns: `${url}/pnrdc/receiveReturns`,
  firstTable: `${url}/pnrdc/firstTable`,
  secondTable: `${url}/pnrdc/secondTable`,
  removeFirstTableData: `${url}/pnrdc/removeFirstTableData`,
  addToFirstTable: `${url}/pnrdc/addToFirstTable`,
  saveJobWork: `${url}/pnrdc/saveJobWork`,
  updateSrl: `${url}/pnrdc/updateSrl`,
  accept: `${url}/pnrdc/accept`,
  cancel: `${url}/pnrdc/cancel`,
  receiveTable: `${url}/pnrdc/receiveTable`,
  dcCancel: `${url}/pnrdc/dcCancel`,
  dcDraft: `${url}/pnrdc/dcDraft`,
  dcDespatched: `${url}/pnrdc/dcDespatched`,
  dcClosed: `${url}/pnrdc/dcClosed`,
  dcAll: `${url}/pnrdc/dcAll`,
  allCreateNewData: `${url}/pnrdc/allCreateNewData`,

  getDC: `${url}/pnrdc/getDC`,
};
