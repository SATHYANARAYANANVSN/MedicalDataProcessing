import React from "react";
import { Activity } from "lucide-react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Medical Data Dashboard
              </h1>
            </div>
            <div className="hidden md:block">
              <span className="text-blue-100 text-sm font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                Secure • Professional • Reliable
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;