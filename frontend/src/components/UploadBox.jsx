import React, { useCallback, useState } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import Papa from "papaparse";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const UploadBox = ({ onFileUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState("");

  const processFile = (file) => {
    if (!file) return;
    
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError("Please upload a CSV file only");
      return;
    }

    setError("");
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length > 0) {
          setError("Error parsing CSV file");
          return;
        }
        onFileUpload(file, result.data);
      },
      error: () => {
        setError("Failed to read the file");
      }
    });
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Upload Medical Data
        </h2>
        <p className="text-gray-600">
          Upload your CSV file containing patient records, lab results, or medical data
        </p>
      </div>

      <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            isDragOver
              ? "border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50"
              : "border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`p-4 rounded-full ${
              isDragOver 
                ? "bg-gradient-to-br from-blue-100 to-purple-100" 
                : "bg-gradient-to-br from-gray-100 to-blue-100"
            }`}>
              <Upload className={`h-8 w-8 ${
                isDragOver ? "text-blue-600" : "text-gray-600"
              }`} />
            </div>
            
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop your CSV file here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or click to browse from your computer
              </p>
              
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  Select CSV File
                </label>
              </Button>
            </div>
            
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-gradient-to-r from-red-50 to-orange-50 px-3 py-2 rounded-md border border-red-200">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            
            <div className="text-xs text-gray-400">
              Supported format: .csv files only
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Sample Data Format:</h3>
          <div className="text-xs text-blue-800 font-mono bg-white p-2 rounded border shadow-sm">
            Patient_ID, Name, Age, Gender, Blood_Pressure, Heart_Rate, Temperature<br/>
            P001, John Doe, 45, M, 120/80, 72, 98.6
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UploadBox;