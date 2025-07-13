"use client";

import { FaBoxOpen } from "react-icons/fa";

import { FilterProductsTab } from "@/components/dashboard-component/FilterProduct";
import { ProductDetailTab } from "@/components/dashboard-component/ProductDetailTab";
import { UploadCheckTab } from "@/components/dashboard-component/UploadCheckTab";
import { VisualDashboardTab } from "@/components/dashboard-component/VisualDashboardTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Building2,
  Filter,
  LightbulbIcon,
  Package,
  RocketIcon,
  Target,
  TargetIcon,
  TrendingUp,
  Upload,
  Zap,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";

export default function ShelfPulseDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-white border-b-4 border-gray-900 shadow-[0px_4px_0px_0px_#1f2937]">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-green-600 border-4 border-gray-900 p-2 shadow-[4px_4px_0px_0px_#1f2937] transform rotate-2">
                <Image alt="logo" width={60} height={60} src="/transparent.svg" />
              </div>
              <div>
                <h1 className="text-5xl font-black text-gray-900 tracking-tight transform -skew-x-3">
                  SHELF<span className="text-green-600">PULSE</span>
                </h1>
                <p className="text-lg font-bold text-gray-600 mt-1 tracking-wide flex items-center gap-2">
                  <FaBoxOpen className="size-6 " /> INTELLIGENT PRODUCT
                  MANAGEMENT & ANALYTICS
                </p>
              </div>
            </div>

            {/* Professional Stats Cards */}
            <div className="hidden lg:flex gap-4">
              <div className="bg-green-50 border-3 border-gray-900 p-4 shadow-[3px_3px_0px_0px_#1f2937] transform -rotate-1">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-xl font-black text-gray-900">90%</div>
                    <div className="text-xs font-bold text-gray-600">
                      ACCURACY
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-3 border-gray-900 p-4 shadow-[3px_3px_0px_0px_#1f2937] transform rotate-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xl font-black text-gray-900">24/7</div>
                    <div className="text-xs font-bold text-gray-600">
                      MONITORING
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border-3 border-gray-900 p-4 shadow-[3px_3px_0px_0px_#1f2937] transform -rotate-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-xl font-black text-gray-900">
                      ENTERPRISE
                    </div>
                    <div className="text-xs font-bold text-gray-600">READY</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white border-4 border-gray-900 shadow-[12px_12px_0px_0px_#1f2937] transform">
          {/* Professional Tabs Navigation */}
          <div className="bg-gray-100 border-b-4 border-gray-900 p-6">
            <Tabs defaultValue="filter" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-transparent gap-4 h-auto p-0">
                <TabsTrigger
                  value="filter"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-[4px_4px_0px_0px_#1f2937] bg-white text-gray-900 font-black text-lg py-4 px-6 border-4 border-gray-900 shadow-[3px_3px_0px_0px_#1f2937] hover:shadow-[4px_4px_0px_0px_#1f2937] transition-all transform hover:-translate-x-1 hover:-translate-y-1">
                  <Filter className="w-5 h-5 mr-2" />
                  FILTER
                </TabsTrigger>

                <TabsTrigger
                  value="detail"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-[4px_4px_0px_0px_#1f2937] bg-white text-gray-900 font-black text-lg py-4 px-6 border-4 border-gray-900 shadow-[3px_3px_0px_0px_#1f2937] hover:shadow-[4px_4px_0px_0px_#1f2937] transition-all transform hover:-translate-x-1 hover:-translate-y-1">
                  <Package className="w-5 h-5 mr-2" />
                  DETAIL
                </TabsTrigger>

                <TabsTrigger
                  value="upload"
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-[4px_4px_0px_0px_#1f2937] bg-white text-gray-900 font-black text-lg py-4 px-6 border-4 border-gray-900 shadow-[3px_3px_0px_0px_#1f2937] hover:shadow-[4px_4px_0px_0px_#1f2937] transition-all transform hover:-translate-x-1 hover:-translate-y-1">
                  <Upload className="w-5 h-5 mr-2" />
                  UPLOAD
                </TabsTrigger>

                <TabsTrigger
                  value="dashboard"
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-[4px_4px_0px_0px_#1f2937] bg-white text-gray-900 font-black text-lg py-4 px-6 border-4 border-gray-900 shadow-[3px_3px_0px_0px_#1f2937] hover:shadow-[4px_4px_0px_0px_#1f2937] transition-all transform hover:-translate-x-1 hover:-translate-y-1">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  DASHBOARD
                </TabsTrigger>
              </TabsList>

              {/* Tab Content with Professional Background */}
              <div className="bg-gray-50 p-0 mt-0">
                <TabsContent value="filter" className="mt-0 p-0">
                  <FilterProductsTab />
                </TabsContent>

                <TabsContent value="detail" className="mt-0 p-0">
                  <ProductDetailTab />
                </TabsContent>

                <TabsContent value="upload" className="mt-0 p-0">
                  <UploadCheckTab />
                </TabsContent>

                <TabsContent value="dashboard" className="mt-0 p-0">
                  <VisualDashboardTab />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Professional Feature Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0px_0px_#1f2937] transform rotate-1 hover:shadow-[6px_6px_0px_0px_#1f2937] transition-all">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-gray-900">
                <ZapIcon className="size-6" />
              </div>
              <div className="text-xl font-black text-gray-900 mb-1">FAST</div>
              <div className="text-sm font-bold text-gray-600">
                Real-time Processing
              </div>
            </div>
          </div>

          <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0px_0px_#1f2937] transform -rotate-1 hover:shadow-[6px_6px_0px_0px_#1f2937] transition-all">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-gray-900">
                <TargetIcon className="size-6" />
              </div>
              <div className="text-xl font-black text-gray-900 mb-1">
                PRECISE
              </div>
              <div className="text-sm font-bold text-gray-600">
                AI-Powered Predictions
              </div>
            </div>
          </div>

          <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0px_0px_#1f2937] transform rotate-1 hover:shadow-[6px_6px_0px_0px_#1f2937] transition-all">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-gray-900">
                <RocketIcon className="size-6" />
              </div>
              <div className="text-xl font-black text-gray-900 mb-1">SMART</div>
              <div className="text-sm font-bold text-gray-600">
                Advanced Analytics
              </div>
            </div>
          </div>

          <div className="bg-white border-4 border-gray-900 p-6 shadow-[4px_4px_0px_0px_#1f2937] transform -rotate-1 hover:shadow-[6px_6px_0px_0px_#1f2937] transition-all">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3 border-2 border-gray-900">
                <LightbulbIcon className="size-6" />
              </div>
              <div className="text-xl font-black text-gray-900 mb-1">
                INSIGHTS
              </div>
              <div className="text-sm font-bold text-gray-600">
                Data-Driven Decisions
              </div>
            </div>
          </div>
        </div>

        {/* Professional Footer Section */}
        <div className="mt-12 bg-white border-4 border-gray-900 shadow-[6px_6px_0px_0px_#1f2937] p-8">
          <div className="text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-4">
              ENTERPRISE PRODUCT MANAGEMENT
            </h3>
            <p className="text-lg font-bold text-gray-600 max-w-3xl mx-auto">
              Leverage AI-powered analytics to optimize inventory, reduce waste,
              and maximize profitability across your entire product portfolio
              with real-time insights and predictive intelligence.
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <div className="bg-blue-50 border-2 border-gray-900 px-4 py-2 shadow-[2px_2px_0px_0px_#1f2937]">
                <span className="font-black text-gray-900">
                  INVENTORY OPTIMIZATION
                </span>
              </div>
              <div className="bg-green-50 border-2 border-gray-900 px-4 py-2 shadow-[2px_2px_0px_0px_#1f2937]">
                <span className="font-black text-gray-900">
                  WASTE REDUCTION
                </span>
              </div>
              <div className="bg-purple-50 border-2 border-gray-900 px-4 py-2 shadow-[2px_2px_0px_0px_#1f2937]">
                <span className="font-black text-gray-900">
                  PROFIT MAXIMIZATION
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
