import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WithNav from "./Layout/WithNav";
import Parentroute from "./Layout/Parentroute";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import HomeOne from "./pages/HomeOne";
import UserRolesModules from "./pages/admin/userrolesmodules";
import CreateUsers from "./pages/admin/createusers";
import MenuRoleMapping from "./pages/admin/menurolemapping";
import SendMail from "./pages/sendmail/sendmails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvoiceForm from "./pages/Sales/Packing&Invoicing/Menu/Inspection/InspectionPages/InvoiceForm";
import "react-toastify/dist/ReactToastify.css";
//PACKING NOTE
import PNDescription from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/PackingNotePages/PNDescription";
import ProfileOpenForm from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/Menus/Profile/ProfileOpenForm";
import MiscOpenForm from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/Menus/Misc/MiscOpenForm";
import ServicesOpenForm from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/Menus/Services/ServicesOpenForm";
import FabricationOpenForm from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/Menus/Fabrication/FabricationOpenForm";
// import Services from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/Services/Services";
// import Misc from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/Misc/Misc";
// import Fabrication from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/Fabrication/Fabrication";
//import FabPakNote from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/Fabrication/FabPakNote";
//import FabMiscSalesConsinee from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/Fabrication/FabMiscSalesConsinee";
// import Profile from "./pages/Sales/Packing&Invoicing/Menu/PackingNote/Profile/Profile";

// INVOICE
// import Lists from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Lists/Lists";
// import CreateNew from "./pages/Sales/Packing&Invoicing/Menu/Invoice/CreateNew/CreateNew";
// import InvoiceDetails from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Lists/InvoiceDetails/InvoiceDetails";
// import CreateNewForm from "./pages/Sales/Packing&Invoicing/Menu/Invoice/CreateNewForm/CreateNewForm";
//Misc Invoices
// import MiscInvoicesCreateNew from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Misc Invoices/CreateNew/MiscInvoicesCreateNew";
// // PN List
// import MiscPNList from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Misc Invoices/PNLists/MiscPNList";
// import MiscPNListOpenForm from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Misc Invoices/PNLists/MiscPNListOpenForm";
// // InvoicesList
// import MiscInvoicesList from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Misc Invoices/InvoicesList/MiscInvoicesList";
// import MiscInvoicesListOpenForm from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Misc Invoices/InvoicesList/MiscInvoicesListOpenForm";
// import FabricationInvoiceOpenForm from "./pages/Sales/Packing&Invoicing/Menu/Invoice/FabricationInvoice/FabricationInvoiceOpenForm";
// import FabricationInvoice from "./pages/Sales/Packing&Invoicing/Menu/Invoice/FabricationInvoice/FabricationInvoice";
// // Material Scrap Invoice
// import MatScrapInvoicesScrap from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Material Scrap Invoices/MatScrapInvoicesScrap";

// RETURNBLE DC
import DCCreateNew from "./pages/Sales/Packing&Invoicing/Menu/ReturnableDC/CreateNew/DCCreateNew";
import DCList from "./pages/Sales/Packing&Invoicing/Menu/ReturnableDC/DCList/DCList";
import CreateNewJobWork from "./pages/Sales/Packing&Invoicing/Menu/ReturnableDC/Modals/CreateNewJobWork";
import DCListCreated from "./pages/Sales/Packing&Invoicing/Menu/ReturnableDC/DCList/DCListCreated";
import DCListDespatched from "./pages/Sales/Packing&Invoicing/Menu/ReturnableDC/DCList/DCListDespatched";
import DCListClosed from "./pages/Sales/Packing&Invoicing/Menu/ReturnableDC/DCList/DCListClosed";
import DCListAll from "./pages/Sales/Packing&Invoicing/Menu/ReturnableDC/DCList/DCListAll";

//INSPECTION
import ScheduleList from "./pages/Sales/Packing&Invoicing/Menu/Inspection/InspectionPages/ScheduleList";
import FindSchedule from "./pages/Sales/Packing&Invoicing/Menu/Inspection/InspectionPages/FindSchedule";
import OrderSchDetails from "./pages/Sales/Packing&Invoicing/Menu/Inspection/InspectionPages/OrderSchDetails";
import InternalRejectionModal from "./pages/Sales/Packing&Invoicing/Menu/Inspection/InspectionPages/Modals/InternalRejectionModal";

// invoice new

// misc invoice
import MiscCreateNew from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/MiscInvoice/MiscCreateNew";
import MiscPNList from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/MiscInvoice/MiscPNList";
import MiscInvoiceList from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/MiscInvoice/MiscInvoiceList";
// material Scrap invoice
import MSIScrap from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/MaterialScrapInvoice/MSIScrap";
import MSIMaterialReturn from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/MaterialScrapInvoice/MSIMaterialReturn";
import MSIPNListScrap from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/MaterialScrapInvoice/PNList/MSIPNListScrap";
import MSIPNListMaterial from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/MaterialScrapInvoice/PNList/MSIPNListMaterial";
import MSIInvoiceList from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/MaterialScrapInvoice/MSIInvoiceList";
import MSICreateNew from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/MaterialScrapInvoice/MSICreateNew";
// services invoice
import ServicesInvoice from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/ServicesInvoice/ServicesInvoice";
// sales invoice
import SalesInvoice from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/SalesInvoice/SalesInvoice";
// fabrication invoice
import FabricationInvoice from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Menus/FabricationInvoice/FabricationInvoice";
// invoice details
import InvoiceDetails from "./pages/Sales/Packing&Invoicing/Menu/Invoice/Pages/InvoiceDetails/InvoiceDetails";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" />
      <Routes>
        <Route element={<Login />} path="/" />

        <Route path="/home" element={<Home />} />
        <Route path="/salesHome" element={<HomeOne />} />

        <Route element={<WithNav />}>
          <Route exact path="/mailer" element={<SendMail />} />
          <Route path="/admin" element={<Parentroute />}>
            <Route index={true} />
            <Route path="roles" element={<UserRolesModules />} />
            <Route path="mapping" element={<MenuRoleMapping />} />
            <Route path="users" element={<CreateUsers />} />
          </Route>

          <Route path="/PackingAndInvoices" element={<Parentroute />}>
            <Route index={true} />
            <Route path="Inspection">
              <Route path="ScheduleList" element={<ScheduleList />} />
              <Route path="FindSchedule" element={<FindSchedule />} />
              <Route
                path="InternalRejectionForm"
                element={<InternalRejectionModal />}
              />
              <Route
                path="OrderScheduleDetails"
                element={<OrderSchDetails />}
              ></Route>
            </Route>

            <Route path="PackingNote">
              <Route index={true} />
              {/* <Route path="Fabrication" element={<FabPakNote />} />
              <Route path="FabInvoiceForm" element={<FabMiscSalesConsinee />} /> */}
              <Route path="ProfileOpenForm" element={<ProfileOpenForm />} />
              <Route path="Description" element={<PNDescription />} />
              <Route path="MiscOpenForm" element={<MiscOpenForm />} />
              {/* <Route path="Misc" element={<Misc />} /> */}
              <Route path="ServicesOpenForm" element={<ServicesOpenForm />} />
              {/* <Route path="Services" element={<Services />} /> */}
              <Route
                path="FabricationOpenForm"
                element={<FabricationOpenForm />}
              />
              {/* <Route path="Fabrication" element={<Fabrication />} /> */}
            </Route>

            <Route path="Invoice">
              <Route index={true} />

              {/* <Route path="Lists" element={<Lists />} />
              <Route path="CreateNew" element={<CreateNew />} />
              <Route path="InvoiceDetails" element={<InvoiceDetails />} /> */}
              <Route path="MiscInvoice">
                <Route index={true} />

                <Route path="CreateNew" element={<MiscCreateNew />} />
                <Route path="PNList" element={<MiscPNList />} />
                <Route path="InvoiceList" element={<MiscInvoiceList />} />
              </Route>

              <Route path="MaterialScrapInvoice">
                <Route index={true} />

                <Route path="Scrap" element={<MSIScrap />} />
                <Route path="MaterialReturn" element={<MSIMaterialReturn />} />
                <Route path="PNList">
                  <Route index={true} />

                  <Route path="Scrap" element={<MSIPNListScrap />} />
                  <Route path="Material" element={<MSIPNListMaterial />} />
                </Route>
                <Route path="InvoiceList" element={<MSIInvoiceList />} />
                <Route path="CreateNew" element={<MSICreateNew />} />
              </Route>
              <Route path="ServicesInvoice" element={<ServicesInvoice />} />
              <Route path="SalesInvoice" element={<SalesInvoice />} />
              <Route
                path="FabricationInvoice"
                element={<FabricationInvoice />}
              />
              <Route path="InvoiceDetails" element={<InvoiceDetails />} />
            </Route>

            <Route path="ReturnableDC">
              <Route index={true} />

              <Route path="DCCreateNew" element={<DCCreateNew />} />
              <Route path="JobWork" element={<CreateNewJobWork />} />
              <Route path="DCList" element={<DCList />} />
              <Route path="DCList">
                <Route index={true} />
                <Route path="DCListClosed" element={<DCListClosed />} />
                <Route path="DCListCreated" element={<DCListCreated />} />
                <Route path="DCListDispatched" element={<DCListDespatched />} />
                <Route path="DCListAll" element={<DCListAll />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
