import { url } from "../../API";

export const apipoints = {
  pnprofileinvoices: `${url}/pnprofile/pnprofileinvoices`,
  aboutInvoicePN: `${url}/pnprofile/aboutInvoicePN`,
  // invoiceDetailTableData: `${url}/pnprofile/invoiceDetailTableData`,
  getTaxData: `${url}/pnprofile/getTaxData`,
  getSetRateConsumerData: `${url}/pnprofile/getSetRateConsumerData`,
  updateRatesPN: `${url}/pnprofile/updateRatesPN`,
  updatePNProfileData: `${url}/pnprofile/updatePNProfileData`,
  getPrintData: `${url}/pnprofile/getPrintData`,
  cancelPN: `${url}/pnprofile/cancelPN`,
  createInvoice: `${url}/invoice/createInvoice`,
  getAllStates: `${url}/invoice/getAllStates`,
};
