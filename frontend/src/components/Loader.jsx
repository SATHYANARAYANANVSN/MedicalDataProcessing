import React from "react";
import Lottie from "lottie-react";
import { FileSearch } from "lucide-react";
import { Card } from "./ui/card";

// Simple loading animation data (since we don't have external lottie file)
const loadingAnimation = {
  v: "5.5.7",
  fr: 30,
  ip: 0,
  op: 90,
  w: 200,
  h: 200,
  nm: "Loading",
  ddd: 0,
  assets: [],
  layers: [{
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: "Circle",
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: {
        a: 1,
        k: [{
          i: { x: [0.833], y: [0.833] },
          o: { x: [0.167], y: [0.167] },
          t: 0,
          s: [0]
        }, {
          t: 90,
          s: [360]
        }]
      },
      p: { a: 0, k: [100, 100, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: { a: 0, k: [100, 100, 100] }
    },
    ao: 0,
    shapes: [{
      ty: "gr",
      it: [{
        d: 1,
        ty: "el",
        s: { a: 0, k: [50, 50] },
        p: { a: 0, k: [0, 0] }
      }, {
        ty: "st",
        c: { a: 0, k: [0.2, 0.6, 1, 1] },
        o: { a: 0, k: 100 },
        w: { a: 0, k: 4 }
      }, {
        ty: "tr",
        p: { a: 0, k: [0, 0] },
        a: { a: 0, k: [0, 0] },
        s: { a: 0, k: [100, 100] },
        r: { a: 0, k: 0 },
        o: { a: 0, k: 100 }
      }]
    }],
    ip: 0,
    op: 90,
    st: 0,
    bm: 0
  }]
};

const Loader = ({ fileName }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Lottie Animation */}
          <div className="w-32 h-32">
            <Lottie 
              animationData={loadingAnimation}
              loop={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          
          {/* Alternative CSS spinner if Lottie fails */}
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              Processing Medical Data...
            </h3>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <FileSearch className="h-4 w-4" />
              <span className="text-sm">Analyzing: {fileName}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md">
            <div className="space-y-2 text-sm text-blue-800">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Parsing CSV structure...</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span>Validating medical data...</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span>Preparing dashboard view...</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Loader;