import React from "react";
import RolesWidget from "./RolesWidget";
import Table from "./Table";

function AccessesPageContent() {
  return (
    <div className="flex flex-wrap">
      <div className="w-3/12 p-16">
        <RolesWidget />
      </div>
      <div className="w-9/12">
        <Table />
      </div>
    </div>
  );
}

export default AccessesPageContent;
