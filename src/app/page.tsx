"use client"

import { FilterProductsTab } from "@/components/dashboard-component/FilterProduct"
import { ProductDetailTab } from "@/components/dashboard-component/ProductDetailTab"
import { UploadCheckTab } from "@/components/dashboard-component/UploadCheckTab"
import { VisualDashboardTab } from "@/components/dashboard-component/VisualDashboardTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Filter, Upload, BarChart3, Zap, Target, TrendingUp } from "lucide-react"


export default function ShelfPulseDashboard() {
  return (
    <div className="min-h-screen bg-yellow-300">
      {/* Neobrutalist Header */}
      <div className="bg-black border-b-8 border-black p-8 shadow-[0px_8px_0px_0px_#000000]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-red-500 border-4 border-black p-4 shadow-[6px_6px_0px_0px_#000000] transform rotate-3">
                <Zap className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-6xl font-black text-white tracking-tight transform -skew-x-6">
                  SHELF<span className="text-yellow-300">PULSE</span>
                </h1>
                <p className="text-xl font-bold text-gray-300 mt-2 tracking-wide">
                  🚀 INTELLIGENT PRODUCT MANAGEMENT & ANALYTICS
                </p>
              </div>
            </div>

            {/* Stats Cards in Header */}
            <div className="hidden lg:flex gap-4">
              <div className="bg-green-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000000] transform -rotate-2">
                <div className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-black" />
                  <div>
                    <div className="text-2xl font-black text-black">90%</div>
                    <div className="text-xs font-bold text-black">ACCURACY</div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-400 border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000000] transform rotate-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-black" />
                  <div>
                    <div className="text-2xl font-black text-black">24/7</div>
                    <div className="text-xs font-bold text-black">MONITORING</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_#000000] transform rotate-1">
          {/* Tabs Navigation */}
          <div className="bg-black border-b-8 border-black p-6">
            <Tabs defaultValue="filter" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-transparent gap-4 h-auto p-0">
                <TabsTrigger
                  value="filter"
                  className="data-[state=active]:bg-cyan-400 data-[state=active]:text-black data-[state=active]:shadow-[6px_6px_0px_0px_#000000] bg-white text-black font-black text-lg py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] transition-all transform hover:-translate-x-1 hover:-translate-y-1"
                >
                  <Filter className="w-6 h-6 mr-2" />FILTER
                </TabsTrigger>

                <TabsTrigger
                  value="detail"
                  className="data-[state=active]:bg-pink-400 data-[state=active]:text-black data-[state=active]:shadow-[6px_6px_0px_0px_#000000] bg-white text-black font-black text-lg py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] transition-all transform hover:-translate-x-1 hover:-translate-y-1"
                >
                  <Package className="w-6 h-6 mr-2" />DETAIL
                </TabsTrigger>

                <TabsTrigger
                  value="upload"
                  className="data-[state=active]:bg-green-400 data-[state=active]:text-black data-[state=active]:shadow-[6px_6px_0px_0px_#000000] bg-white text-black font-black text-lg py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] transition-all transform hover:-translate-x-1 hover:-translate-y-1"
                >
                  <Upload className="w-6 h-6 mr-2" /> UPLOAD
                </TabsTrigger>

                <TabsTrigger
                  value="dashboard"
                  className="data-[state=active]:bg-purple-400 data-[state=active]:text-black data-[state=active]:shadow-[6px_6px_0px_0px_#000000] bg-white text-black font-black text-lg py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000] transition-all transform hover:-translate-x-1 hover:-translate-y-1"
                >
                  <BarChart3 className="w-6 h-6 mr-2" />DASHBOARD
                </TabsTrigger>
              </TabsList>

              {/* Tab Content */}
              <div className="bg-yellow-300 p-0 mt-0">
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

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-red-400 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000] transform rotate-2">
            <div className="text-center">
              <div className="text-3xl font-black text-black mb-2">⚡</div>
              <div className="text-2xl font-black text-black">FAST</div>
              <div className="text-sm font-bold text-black">PROCESSING</div>
            </div>
          </div>

          <div className="bg-blue-400 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000] transform -rotate-1">
            <div className="text-center">
              <div className="text-3xl font-black text-black mb-2">🎯</div>
              <div className="text-2xl font-black text-black">PRECISE</div>
              <div className="text-sm font-bold text-black">PREDICTIONS</div>
            </div>
          </div>

          <div className="bg-green-400 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000] transform rotate-1">
            <div className="text-center">
              <div className="text-3xl font-black text-black mb-2">🚀</div>
              <div className="text-2xl font-black text-black">SMART</div>
              <div className="text-sm font-bold text-black">ANALYTICS</div>
            </div>
          </div>

          <div className="bg-purple-400 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000] transform -rotate-2">
            <div className="text-center">
              <div className="text-3xl font-black text-black mb-2">💡</div>
              <div className="text-2xl font-black text-black">INSIGHTS</div>
              <div className="text-sm font-bold text-black">DRIVEN</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
