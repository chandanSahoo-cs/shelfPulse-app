"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Filter, Upload, BarChart3 } from "lucide-react"
import { FilterProductsTab } from "@/components/dashboard-component/FilterProduct"
import { ProductDetailTab } from "@/components/dashboard-component/ProductDetailTab"
import { UploadCheckTab } from "@/components/dashboard-component/UploadCheckTab"
import { VisualDashboardTab } from "@/components/dashboard-component/VisualDashboardTab"

export default function ShelfPulseDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ShelfPulse
          </h1>
          <p className="text-slate-600 mt-2">Intelligent Product Management & Analytics</p>
        </div>

        {/* Main Tabbed Interface */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <Tabs defaultValue="filter" className="w-full">
              <div className="border-b bg-slate-50/50 px-6 py-4">
                <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
                  <TabsTrigger value="filter" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter Products
                  </TabsTrigger>
                  <TabsTrigger value="detail" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Product Detail
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Upload & Check
                  </TabsTrigger>
                  <TabsTrigger value="dashboard" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Visual Dashboard
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="filter" className="mt-0">
                  <FilterProductsTab />
                </TabsContent>

                <TabsContent value="detail" className="mt-0">
                  <ProductDetailTab />
                </TabsContent>

                <TabsContent value="upload" className="mt-0">
                  <UploadCheckTab />
                </TabsContent>

                <TabsContent value="dashboard" className="mt-0">
                  <VisualDashboardTab />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
