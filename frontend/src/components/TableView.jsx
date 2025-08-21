import React, { useState, useMemo } from "react";
import { Download, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const TableView = ({ data, onNewUpload }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Show only first 10 rows
  const displayData = useMemo(() => {
    return data.slice(0, 10);
  }, [data]);

  // Sort data (only the first 10 rows)
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return displayData;
    
    const sorted = [...displayData].sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return sorted;
  }, [displayData, sortConfig]);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleCancelFile = () => {
    onNewUpload();
  };

  const isAbnormalValue = (header, value) => {
    const lowerHeader = header.toLowerCase();
    const numericValue = parseFloat(value);
    
    if (isNaN(numericValue)) return false;
    
    // Define normal ranges for common medical values
    const normalRanges = {
      'blood_pressure': { max: 140, type: 'systolic' },
      'heart_rate': { min: 60, max: 100 },
      'temperature': { min: 97, max: 99.5 },
      'glucose': { max: 140 },
      'cholesterol': { max: 200 },
      'weight': { min: 50, max: 300 }
    };
    
    for (const [key, range] of Object.entries(normalRanges)) {
      if (lowerHeader.includes(key)) {
        if (range.min && numericValue < range.min) return true;
        if (range.max && numericValue > range.max) return true;
      }
    }
    
    return false;
  };

  const exportToCsv = () => {
    const csvContent = [
      headers.join(','),
      ...sortedData.map(row => headers.map(header => row[header] || '').join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'medical_data_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
            Medical Data Preview
          </h2>
          <p className="text-gray-600 mt-1">
            Showing first 10 records from {data.length} total records
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* File info with cancel button */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg px-3 py-2">
            <span className="text-sm text-gray-700">Current file loaded</span>
            <Button
              onClick={handleCancelFile}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Highlighted Download Button */}
          <Button 
            onClick={exportToCsv} 
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" 
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <Card className="overflow-hidden shadow-lg border-0">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-1 py-1">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50 border-b border-gray-200">
                  <tr>
                    {headers.map((header, index) => (
                      <th 
                        key={index}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-200"
                        onClick={() => handleSort(header)}
                      >
                        <div className="flex items-center space-x-1">
                          <span>{header.replace(/_/g, ' ')}</span>
                          {sortConfig.key === header && (
                            <span className="text-blue-600">
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedData.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex} 
                      className={`hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all duration-200 ${
                        rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                      }`}
                    >
                      {headers.map((header, colIndex) => {
                        const cellValue = row[header] || '';
                        const isAbnormal = isAbnormalValue(header, cellValue);
                        
                        return (
                          <td 
                            key={colIndex} 
                            className="px-4 py-3 text-sm"
                          >
                            <div className={`${
                              isAbnormal 
                                ? 'text-red-700 font-medium bg-gradient-to-r from-red-50 to-orange-50 px-2 py-1 rounded-md inline-block border border-red-200'
                                : 'text-gray-900'
                            }`}>
                              {cellValue}
                              {isAbnormal && (
                                <span className="ml-1 text-xs text-red-500">⚠</span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TableView;