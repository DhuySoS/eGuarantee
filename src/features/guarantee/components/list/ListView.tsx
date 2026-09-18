import React from "react";
import GuaranteeTable from "./GuaranteeTable";
import Filter from "./Filter";

const ListView = () => {
  return (
    <div className=" space-y-6">
      <Filter />
      <GuaranteeTable />
    </div>
  );
};

export default ListView;
