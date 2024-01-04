import React from "react";
import ProductionRejections from "./ProductionRejections";
import ReadyForPacking from "./ReadyForPacking";
import ScheduleDeatails from "./ScheduleDeatails";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function ProfileSRP() {
  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <div className="col-md-4 col-sm-12">
            <button className="button-style">Select all</button>
          </div>
          <div className="col-md-4 col-sm-12">
            <button className="button-style">Reverse</button>
          </div>
        </div>

        <div className="col-md-10">
          <Tabs id="controlled-tab-example" className="mb-3 mt-3 tab_font">
            <Tab eventKey="mat_rece" title="Schedule Deatails">
              <ScheduleDeatails />
            </Tab>

            <Tab eventKey="mat_retu" title="Ready For Packing">
              <ReadyForPacking />
            </Tab>

            <Tab eventKey="mat_st_posi" title="Production Rejections">
              <ProductionRejections />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default ProfileSRP;
