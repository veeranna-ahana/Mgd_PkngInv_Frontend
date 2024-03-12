import { url } from "../../API";

export const apipoints = {
  getAllCust: `${url}/invoice/getAllCust`,
  getCustAccnToListData: `${url}/invoice/getCustAccnToListData`,
  allMaterials: `${url}/invoice/allMaterials`,
  getAllStates: `${url}/invoice/getAllStates`,
  // postInvoiceData: `${url}/invoice/postInvoiceData`,
  createPN: `${url}/invoice/createPN`,
  getListData: `${url}/invoice/getListData`,
  invoiceDetails: `${url}/invoice/invoiceDetails`,
  getTaxDataInvoice: `${url}/invoice/getTaxDataInvoice`,
  updateInvoice: `${url}/invoice/updateInvoice`,
  createInvoice: `${url}/invoice/createInvoice`,
  getWholePrintData: `${url}/invoice/getWholePrintData`,
  cancelPN: `${url}/pnprofile/cancelPN`,
  getIVList: `${url}/invoice/getIVList`,
  getIVDetails: `${url}/invoice/getIVDetails`,
  insertRunNoRow: `${url}/invoice/insertRunNoRow`,
  getPDFData: `${url}/pdf/getPDFData`,
};
