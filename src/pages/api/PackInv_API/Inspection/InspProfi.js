import { url } from "../../API";

export const apipoints = {
  getCustomerdata: `${url}/customerdata/allcustomerdata`,
  getOrderSchdata: `${url}/inspprofiledata/getorderschdata`,
  getOrderSchforschdetails: `${url}/inspprofiledata/getorderschforschdetails`,
  updateSchDetails: `${url}/inspprofiledata/updateSchDetails`,
  getProRejectionsDetails: `${url}/inspprofiledata/getprorejectionsdetails`,
  getpckscheduledetails: `${url}/inspprofiledata/getpckscheduledetails`,

  //-------
  // getAllCust: `${url}/inspection/allcustomerdata`,
  getCustomerdata: `${url}/inspection/allcustomerdata`,
  getOrderSchdata: `${url}/inspection/getorderschdata`,
  getOrderSchforschdetails: `${url}/inspection/getorderschforschdetails`,
  updateSchDetails: `${url}/inspection/updateSchDetails`,
  getProRejectionsDetails: `${url}/inspection/getprorejectionsdetails`,
  getpckscheduledetails: `${url}/inspection/getpckscheduledetails`,
  insertdraftPNdetails: `${url}/inspection/insertdraftpndetails`,
  postInvoiceDataDetails: `${url}/inspection/postInvoiceDataDetails`,
  testRejectData: `${url}/inspection/testRejectData`,
  testInternalRejectData: `${url}/inspection/testInternalRejectData`,
  RejectionReport: `${url}/inspection/RejectionReport`,
  submitRejectionReport: `${url}/inspection/submitRejectionReport`,
  getOrderDataforFindSchedule: `${url}/inspection/getOrderDataforFindSchedule`,
  // ..............
  postCreateDraftPN: `${url}/inspection/postCreateDraftPN`,
  deleteDraftPN: `${url}/inspection/deleteDraftPN`,
  saveDraftPN: `${url}/inspection/saveDraftPN`,
  preparePN: `${url}/inspection/preparePN`,
  getOrderScheduleData: `${url}/inspection/getOrderScheduleData`,
};
