"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircleIcon,
  BanIcon,
  BarChart2,
  BarChart2Icon,
  BoxIcon,
  CheckIcon,
  ClockAlertIcon,
  Loader2,
  Package,
  Search,
  SearchIcon,
  SproutIcon,
  TagIcon,
  Trash2Icon,
  TrendingDownIcon,
  TrendingUpIcon,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Edge,
  type Node,
} from "reactflow";

import "reactflow/dist/style.css";

// =========================
// Types
// =========================
type Product = {
  sku: string;
  features: {
    Dead_Inventory_Flag: number;
    Historical_Sell_Through: number;
    Waste_Risk_Index: number;
    Days_to_Expiry: number;
    Forecasted_Demand: number;
    category: string;
  };
  prediction: {
    trigger_markdown: boolean;
    forecasted_demand_pred: number;
    spoilage_risk: "Green" | "Yellow" | "Red";
    days_to_expiry_pred: number;
    dead_stock: boolean;
    suggested_markdown_percent: number;
  };
};

interface FlowGraph {
  nodes: Node[];
  edges: Edge[];
}

// =========================
// Graph Generators
// =========================
const generateMarkdownFlow = (product: Product): FlowGraph => {
  const { features, prediction } = product;

  const checks = [
    {
      id: "dead_inventory",
      label: (
        <div className="flex gap-2 items-center">
          <TriangleAlert className="size-6" />
          <span>DEAD INVENTORY</span>
        </div>
      ),
      condition: features.Dead_Inventory_Flag === 1,
      description: "Stock not moving",
    },
    {
      id: "low_demand",
      label: (
        <div className="flex gap-2 items-center">
          <TrendingDownIcon className="size-6" />
          <span>LOW DEMAND</span>
        </div>
      ),
      condition: prediction.forecasted_demand_pred < 1.0,
      description: `Demand: ${prediction.forecasted_demand_pred.toFixed(2)}`,
    },
    {
      id: "high_spoilage",
      label: (
        <div className="flex gap-2 items-center">
          <AlertCircleIcon className="size-6" />
          <span>HIGH SPOILAGE</span>
        </div>
      ),
      condition: prediction.spoilage_risk === "Red",
      description: `Risk: ${prediction.spoilage_risk}`,
    },
    {
      id: "low_sell_through",
      label: (
        <div className="flex gap-2 items-center">
          <BarChart2Icon className="size-6" />
          <span>LOW SELL THROUGH</span>
        </div>
      ),
      condition: features.Historical_Sell_Through < 0.5,
      description: `Rate: ${(features.Historical_Sell_Through * 100).toFixed(
        1
      )}%`,
    },
    {
      id: "low_days_expiry",
      label: (
        <div className="flex gap-2 items-center">
          <ClockAlertIcon className="size-6" />
          <span>EXPIRY</span>
        </div>
      ),
      condition: prediction.days_to_expiry_pred < 5,
      description: `${prediction.days_to_expiry_pred} days left`,
    },
    {
      id: "high_waste_risk",
      label: (
        <div className="flex gap-2 items-center">
          <Trash2Icon className="size-6" />
          <span>HIGH WASTE RISK
          </span>
        </div>
      ),
      condition: features.Waste_Risk_Index > 0.7,
      description: `Risk: ${(features.Waste_Risk_Index * 100).toFixed(1)}%`,
    },
  ];

  const nodes: Node[] = checks.map((check, i) => ({
    id: check.id,
    position: { x: 280 * (i % 3), y: Math.floor(i / 3) * 140 },
    data: {
      label: (
        <div className="text-center p-3 w-full h-full flex flex-col justify-center items-center">
          <div className="font-black text-xs mb-2 leading-tight break-words">
            {check.label}
          </div>
          <div className="text-xs font-bold leading-tight break-words">
            {check.description}
          </div>
        </div>
      ),
    },
    style: {
      background: check.condition ? "#16a34a" : "#dc2626",
      border: "4px solid #1f2937",
      borderRadius: 0,
      color: "white",
      fontWeight: "bold",
      width: 240,
      height: 100,
      boxShadow: "4px 4px 0px 0px #1f2937",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
  }));

  // Add result node
  nodes.push({
    id: "trigger_markdown",
    position: { x: 280, y: 320 },
    data: {
      label: (
        <div className="text-center p-4 w-full h-full flex flex-col justify-center items-center">
          <div className="font-black text-sm mb-2 leading-tight">
            {prediction.trigger_markdown ? (
              <div className="flex gap-2 items-center">
                <CheckIcon className="size-6" stroke="#00c950" />
                <span>TRIGGER MARKDOWN</span>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <BanIcon className="size-6" stroke="#fb2c36" />
                <span>NO MARKDOWN</span>
              </div>
            )}
          </div>
          <div className="text-xs font-bold leading-tight break-words">
            {prediction.suggested_markdown_percent > 0
              ? `${prediction.suggested_markdown_percent}% OFF`
              : "No discount needed"}
          </div>
        </div>
      ),
    },
    style: {
      background: prediction.trigger_markdown ? "#f59e0b" : "#6b7280",
      border: "6px solid #1f2937",
      borderRadius: 0,
      color: prediction.trigger_markdown ? "#1f2937" : "white",
      fontWeight: "bold",
      width: 280,
      height: 120,
      boxShadow: "6px 6px 0px 0px #1f2937",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
  });

  const edges: Edge[] = checks.map((check) => ({
    id: `e_${check.id}_trigger`,
    source: check.id,
    target: "trigger_markdown",
    label: check.condition ? "YES" : "NO",
    animated: check.condition,
    style: {
      stroke: check.condition ? "#16a34a" : "#dc2626",
      strokeWidth: 4,
    },
    labelStyle: {
      fontWeight: "bold",
      fontSize: "12px",
      color: "#1f2937",
    },
  }));

  return { nodes, edges };
};

const generateSustainabilityFlow = (product: Product): FlowGraph => {
  const { features, prediction } = product;

  const nodes: Node[] = [
    {
      id: "waste_risk",
      position: { x: 0, y: 0 },
      data: {
        label: (
          <div className="text-center p-3 w-full h-full flex flex-col justify-center">
            <div className="font-black text-xs mb-2 leading-tight flex gap-2 items-center">
              <Trash2Icon className="size-6" />
              WASTE RISK
            </div>
            <div className="text-xs font-bold leading-tight">
              {(features.Waste_Risk_Index * 100).toFixed(1)}%
            </div>
          </div>
        ),
      },
      style: {
        background: "#f59e0b",
        border: "4px solid #1f2937",
        borderRadius: 0,
        color: "white",
        fontWeight: "bold",
        width: 180,
        height: 100,
        boxShadow: "4px 4px 0px 0px #1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      },
    },
    {
      id: "sell_through",
      position: { x: 220, y: 0 },
      data: {
        label: (
          <div className="text-center p-3 w-full h-full flex flex-col justify-center">
            <div className="font-black text-xs mb-2 leading-tight flex items-center gap-2">
              <BarChart2 className="size-6" />
              SELL THROUGH
            </div>
            <div className="text-xs font-bold leading-tight">
              {(features.Historical_Sell_Through * 100).toFixed(1)}%
            </div>
          </div>
        ),
      },
      style: {
        background: "#2563eb",
        border: "4px solid #1f2937",
        borderRadius: 0,
        color: "white",
        fontWeight: "bold",
        width: 180,
        height: 100,
        boxShadow: "4px 4px 0px 0px #1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      },
    },
    {
      id: "label",
      position: { x: 110, y: 150 },
      data: {
        label: (
          <div className="text-center p-4 w-full h-full flex flex-col justify-center">
            <div className="font-black text-sm mb-2 leading-tight flex gap-2 items-center">
              <SproutIcon className="size-6" />
              SUSTAINABILITY
            </div>
            <div className="text-xs font-bold leading-tight break-words">
              {prediction.spoilage_risk} LABEL
            </div>
          </div>
        ),
      },
      style: {
        background:
          prediction.spoilage_risk === "Green"
            ? "#16a34a"
            : prediction.spoilage_risk === "Yellow"
            ? "#f59e0b"
            : "#dc2626",
        border: "6px solid #1f2937",
        borderRadius: 0,
        color: "white",
        fontWeight: "bold",
        width: 220,
        height: 120,
        boxShadow: "6px 6px 0px 0px #1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      },
    },
  ];

  const edges: Edge[] = [
    {
      id: "e1",
      source: "waste_risk",
      target: "label",
      label: "WASTE",
      style: { stroke: "#1f2937", strokeWidth: 3 },
      labelStyle: { fontWeight: "bold", fontSize: "12px" },
    },
    {
      id: "e2",
      source: "sell_through",
      target: "label",
      label: "PERFORMANCE",
      style: { stroke: "#1f2937", strokeWidth: 3 },
      labelStyle: { fontWeight: "bold", fontSize: "12px" },
    },
  ];

  return { nodes, edges };
};

const generateSpoilageRiskFlow = (product: Product): FlowGraph => {
  const { prediction } = product;

  const nodes: Node[] = [
    {
      id: "expiry",
      position: { x: 0, y: 0 },
      data: {
        label: (
          <div className="text-center p-3 w-full h-full flex flex-col justify-center items-center">
            <div className="font-black text-xs mb-2 flex gap-2 items-center">
              <ClockAlertIcon className="size-6" />
              EXPIRY
            </div>
            <div className="text-xs font-bold leading-tight">
              {prediction.days_to_expiry_pred} DAYS
            </div>
          </div>
        ),
      },
      style: {
        background: "#dc2626",
        border: "4px solid #1f2937",
        borderRadius: 0,
        color: "white",
        fontWeight: "bold",
        width: 180,
        height: 100,
        boxShadow: "4px 4px 0px 0px #1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      },
    },
    {
      id: "demand",
      position: { x: 220, y: 0 },
      data: {
        label: (
          <div className="text-center p-3 w-full h-full flex flex-col justify-center">
            <div className="font-black text-xs mb-2 leading-tight flex items-center gap-2">
              <TrendingUpIcon className="size-6" />
              DEMAND
            </div>
            <div className="text-xs font-bold leading-tight">
              {prediction.forecasted_demand_pred.toFixed(2)}
            </div>
          </div>
        ),
      },
      style: {
        background: "#2563eb",
        border: "4px solid #1f2937",
        borderRadius: 0,
        color: "white",
        fontWeight: "bold",
        width: 180,
        height: 100,
        boxShadow: "4px 4px 0px 0px #1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      },
    },
    {
      id: "spoilage",
      position: { x: 110, y: 150 },
      data: {
        label: (
          <div className="text-center p-4 w-full h-full flex flex-col justify-center">
            <div className="font-black text-sm mb-2 leading-tight items-center flex gap-2">
              <AlertCircleIcon className="size-6" />
              SPOILAGE RISK
            </div>
            <div className="text-xs font-bold leading-tight break-words">
              {prediction.spoilage_risk} LEVEL
            </div>
          </div>
        ),
      },
      style: {
        background:
          prediction.spoilage_risk === "Red"
            ? "#dc2626"
            : prediction.spoilage_risk === "Yellow"
            ? "#f59e0b"
            : "#16a34a",
        border: "6px solid #1f2937",
        borderRadius: 0,
        color: "white",
        fontWeight: "bold",
        width: 220,
        height: 120,
        boxShadow: "6px 6px 0px 0px #1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      },
    },
  ];

  const edges: Edge[] = [
    {
      id: "e1",
      source: "expiry",
      target: "spoilage",
      label: "TIME FACTOR",
      style: { stroke: "#1f2937", strokeWidth: 3 },
      labelStyle: { fontWeight: "bold", fontSize: "12px" },
    },
    {
      id: "e2",
      source: "demand",
      target: "spoilage",
      label: "DEMAND FACTOR",
      style: { stroke: "#1f2937", strokeWidth: 3 },
      labelStyle: { fontWeight: "bold", fontSize: "12px" },
    },
  ];

  return { nodes, edges };
};

// =========================
// Component
// =========================
export const VisualDashboardTab = () => {
  const [data, setData] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [viewType, setViewType] = useState<
    "markdown" | "sustainability" | "spoilage"
  >("markdown");
  const [flowData, setFlowData] = useState<FlowGraph>({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredData = data.filter((product) =>
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);
    fetch("https://shelfpulse.onrender.com/api/v1/products")
      .then((res) => res.json())
      .then((json: Product[]) => {
        setData(json);
        if (json.length > 0) {
          setFlowData(generateMarkdownFlow(json[0]));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    const product = data[selectedIndex];
    const graph =
      viewType === "markdown"
        ? generateMarkdownFlow(product)
        : viewType === "sustainability"
        ? generateSustainabilityFlow(product)
        : generateSpoilageRiskFlow(product);
    setFlowData(graph);
  }, [viewType, selectedIndex, data]);

  const handleSkuSelect = (sku: string) => {
    const index = data.findIndex((p) => p.sku === sku);
    if (index !== -1) {
      setSelectedIndex(index);
      setSearchTerm("");
      setIsDropdownOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
        <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0px_0px_#1f2937] p-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin mr-4 text-blue-600" />
            <span className="text-2xl font-black text-gray-900">
              LOADING DASHBOARD...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0px_0px_#1f2937] p-8 mb-8">
        <div className="mb-6">
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight flex items-center gap-2">
            <BarChart2 className="size-6" />
            VISUAL FLOW DASHBOARD
          </h1>
          <div className="w-24 h-2 bg-blue-600"></div>
        </div>

        {/* Controls Section */}
        <div className="bg-blue-50 border-4 border-gray-900 p-6 shadow-[4px_4px_0px_0px_#1f2937] mb-6">
          <Label className="text-xl font-black text-gray-900 mb-4 tracking-wide flex items-center gap-2">
            <SearchIcon className="size-6" />
            SELECT PRODUCT
          </Label>

          {/* Searchable SKU Dropdown */}
          <div className="relative mb-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-sm font-bold text-gray-900 mb-2 block">
                  SEARCH SKU
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                  <Input
                    placeholder="Type to search SKU..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="pl-10 border-4 border-gray-900 bg-white text-gray-900 font-bold text-lg h-12 shadow-[4px_4px_0px_0px_#1f2937] focus:shadow-[6px_6px_0px_0px_#1f2937] transition-all"
                  />
                </div>

                {/* Dropdown Results */}
                {isDropdownOpen && searchTerm && (
                  <div className="absolute z-10 w-full mt-2 bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_#1f2937] max-h-60 overflow-y-auto">
                    {filteredData.length > 0 ? (
                      filteredData.slice(0, 10).map((product) => (
                        <div
                          key={product.sku}
                          onClick={() => handleSkuSelect(product.sku)}
                          className="p-3 hover:bg-blue-50 cursor-pointer border-b-2 border-gray-900 font-bold text-gray-900 flex items-center justify-between">
                          <span>{product.sku}</span>
                          <Badge className="bg-gray-900 text-white font-bold border-2 border-gray-900">
                            {product.features.category?.toUpperCase() || "N/A"}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center font-bold text-gray-600">
                        No SKUs found
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <Label className="text-sm font-bold text-gray-900 mb-2 block">
                  CURRENT SELECTION
                </Label>
                <div className="bg-white border-4 border-gray-900 p-3 shadow-[4px_4px_0px_0px_#1f2937] h-12 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-black text-lg text-gray-900">
                    {data[selectedIndex]?.sku || "No selection"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* View Type Buttons */}
          <div className="mb-4">
            <Label className="text-sm font-bold text-gray-900 mb-2 block">
              ANALYSIS TYPE
            </Label>
            <div className="flex gap-4">
              <Button
                onClick={() => setViewType("markdown")}
                className={` flex items-center gap-2 font-black text-lg py-3 px-6 border-4 border-gray-900 shadow-[4px_4px_0px_0px_#1f2937] hover:shadow-[6px_6px_0px_0px_#1f2937] transition-all transform hover:-translate-x-1 hover:-translate-y-1 ${
                  viewType === "markdown"
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-900 hover:bg-red-50"
                }`}>
                <TagIcon className="size-6" />
                MARKDOWN FLOW
              </Button>

              <Button
                onClick={() => setViewType("sustainability")}
                className={`flex items-center gap-2 font-black text-lg py-3 px-6 border-4 border-gray-900 shadow-[4px_4px_0px_0px_#1f2937] hover:shadow-[6px_6px_0px_0px_#1f2937] transition-all transform hover:-translate-x-1 hover:-translate-y-1 ${
                  viewType === "sustainability"
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-900 hover:bg-green-50"
                }`}>
                <SproutIcon className="size-6" />
                SUSTAINABILITY
              </Button>

              <Button
                onClick={() => setViewType("spoilage")}
                className={`flex items-center gap-2 font-black text-lg py-3 px-6 border-4 border-gray-900 shadow-[4px_4px_0px_0px_#1f2937] hover:shadow-[6px_6px_0px_0px_#1f2937] transition-all transform hover:-translate-x-1 hover:-translate-y-1 ${
                  viewType === "spoilage"
                    ? "bg-amber-500 text-white"
                    : "bg-white text-gray-900 hover:bg-amber-50"
                }`}>
                <AlertCircleIcon className="size-6" />
                SPOILAGE RISK
              </Button>
            </div>
          </div>
        </div>

        {/* Product Info Card */}
        {data[selectedIndex] && (
          <div className="bg-indigo-50 border-4 border-gray-900 p-6 shadow-[4px_4px_0px_0px_#1f2937] mb-6">
            <h3 className="text-xl font-black text-gray-900 mb-4flex items-center gap-2">
              <BoxIcon className="size-6" /> PRODUCT OVERVIEW
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border-2 border-gray-900 p-3 text-center">
                <div className="font-bold text-sm text-gray-700">CATEGORY</div>
                <div className="font-black text-lg text-gray-900">
                  {data[selectedIndex].features.category?.toUpperCase() ||
                    "N/A"}
                </div>
              </div>
              <div className="bg-white border-2 border-gray-900 p-3 text-center">
                <div className="font-bold text-sm text-gray-700">
                  EXPIRES IN
                </div>
                <div className="font-black text-lg text-red-600">
                  {data[selectedIndex].prediction.days_to_expiry_pred} DAYS
                </div>
              </div>
              <div className="bg-white border-2 border-gray-900 p-3 text-center">
                <div className="font-bold text-sm text-gray-700">DEMAND</div>
                <div className="font-black text-lg text-blue-600">
                  {data[
                    selectedIndex
                  ].prediction.forecasted_demand_pred.toFixed(2)}
                </div>
              </div>
              <div className="bg-white border-2 border-gray-900 p-3 text-center">
                <div className="font-bold text-sm text-gray-700">
                  RISK LEVEL
                </div>
                <div
                  className={`font-black text-lg ${
                    data[selectedIndex].prediction.spoilage_risk === "Red"
                      ? "text-red-600"
                      : data[selectedIndex].prediction.spoilage_risk ===
                        "Yellow"
                      ? "text-amber-600"
                      : "text-green-600"
                  }`}>
                  {data[selectedIndex].prediction.spoilage_risk.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Flow Graph */}
      <div className="bg-white border-4 border-gray-900 shadow-[8px_8px_0px_0px_#1f2937] p-8">
        <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
          {viewType === "markdown" && (
            <div className="flex gap-2 items-center justify-center">
              <TagIcon className="size-6" />
              MARKDOWN DECISION FLOW
            </div>
          )}
          {viewType === "sustainability" && (
            <div className="flex gap-2 items-center justify-center">
              <SproutIcon className="size-6" />
              SUSTAINABILITY ANALYSIS
            </div>
          )}
          {viewType === "spoilage" && (
            <div className="flex gap-2 items-center justify-center">
              <AlertCircleIcon className="size-6 " />
              SPOILAGE RISK ASSESSMENT
            </div>
          )}
        </h2>

        <div
          className="border-4 border-gray-900 shadow-[4px_4px_0px_0px_#1f2937] bg-gray-50"
          style={{ height: 500 }}>
          <ReactFlow
            nodes={flowData.nodes}
            edges={flowData.edges}
            fitView
            attributionPosition="bottom-left">
            <Background color="#1f2937" gap={20} size={2} />
            <MiniMap
              style={{
                background: "#ffffff",
                border: "3px solid #1f2937",
              }}
              maskColor="rgba(0, 0, 0, 0.1)"
            />
            <Controls
              style={{
                background: "#ffffff",
                border: "3px solid #1f2937",
              }}
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};
