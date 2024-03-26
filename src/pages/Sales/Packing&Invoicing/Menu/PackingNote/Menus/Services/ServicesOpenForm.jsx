import React, { useEffect, useState } from "react";

import PNAccountSelect from "../../Pages/PNAccountSelect";

export default function ServicesOpenForm() {
  const [ServicesPNType, setServicesPNType] = useState("Services");
  return (
    <>
      <PNAccountSelect PNType={ServicesPNType} />
    </>
  );
}
