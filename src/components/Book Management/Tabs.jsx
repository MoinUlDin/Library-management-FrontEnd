import React, { useState, useEffect } from "react";

function Tabs() {
  const [activeTab, setActiveTab] = useState(1);
  const activeTabCss = "bg-amber-600 text-white";
  return (
    <div>
      <ul className="grid select-none grid-cols-4 justify-items-center items-center bg-gray-200">
        <li
          onClick={() => setActiveTab(1)}
          className={`w-full text-center py-4 ptr ${
            activeTab == 1 ? activeTabCss : ""
          }`}
        >
          Book Record
        </li>
        <li
          onClick={() => setActiveTab(2)}
          className={`w-full text-center py-4 ptr ${
            activeTab == 2 ? activeTabCss : ""
          }`}
        >
          Issue Book
        </li>
        <li
          onClick={() => setActiveTab(3)}
          className={`w-full text-center py-4 ptr ${
            activeTab == 3 ? activeTabCss : ""
          }`}
        >
          Retun Book
        </li>
        <li
          onClick={() => setActiveTab(4)}
          className={`w-full text-center py-4 ptr ${
            activeTab == 4 ? activeTabCss : ""
          }`}
        >
          Online Catalogue
        </li>
      </ul>
    </div>
  );
}

export default Tabs;
