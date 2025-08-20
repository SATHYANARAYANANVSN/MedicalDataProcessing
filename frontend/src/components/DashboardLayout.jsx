import React from "react";
import { Activity, Heart } from "lucide-react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-white" />
              <h1 className="text-xl font-bold text-white">
                Medical Data Dashboard
              </h1>
            </div>
            <div className="hidden md:block">
              <span className="text-blue-100 text-sm">
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>using React + Emergent UI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;