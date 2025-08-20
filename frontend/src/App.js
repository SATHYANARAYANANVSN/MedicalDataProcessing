import React, { useState } from "react";
import "./App.css";
import DashboardLayout from "./components/DashboardLayout";
import UploadBox from "./components/UploadBox";
import Loader from "./components/Loader";
import TableView from "./components/TableView";
import { mockMedicalData } from "./data/mockData";

function App() {
  const [currentView, setCurrentView] = useState("upload"); // upload, loading, table
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (file, data) => {
    setFileName(file.name);
    setCurrentView("loading");
    
    // Simulate processing delay
    setTimeout(() => {
      setCsvData(data);
      setCurrentView("table");
    }, 2000);
  };

  const handleNewUpload = () => {
    setCurrentView("upload");
    setCsvData([]);
    setFileName("");
  };

  // Use mock data if no real data uploaded (for demo purposes)
  const displayData = csvData.length > 0 ? csvData : mockMedicalData;

  const renderContent = () => {
    switch (currentView) {
      case "loading":
        return <Loader fileName={fileName} />;
      case "table":
        return <TableView data={displayData} onNewUpload={handleNewUpload} />;
      default:
        return <UploadBox onFileUpload={handleFileUpload} />;
    }
  };

  return (
    <div className="App">
      <DashboardLayout>
        {renderContent()}
      </DashboardLayout>
    </div>
  );
}

export default App;