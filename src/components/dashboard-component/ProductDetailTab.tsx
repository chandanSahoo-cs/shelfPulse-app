"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Package,
  AlertTriangle,
  Leaf,
  Clock,
  TrendingDown,
  CheckCircle,
  XCircle,
  BarChart3,
  Recycle,
} from "lucide-react"

type ProductDetail = {
  features: {
    Average_Turnover_Time: number
    Cold_Chain_Energy_Use: number
    Compostability_Score: number
    Days_Since_Last_Sale: number
    Days_to_Expiry: number
    Dead_Inventory_Flag: number
    Embedded_Carbon_Footprint: number
    Festival_Sales_Boost: number
    Footprint_Factor: number
    Forecasted_Demand: number
    Historical_Sell_Through: number
    Holiday_Demand_Amplifier: number
    Markdown_History: number
    Overstock_Risk: number
    Promo_Effectiveness: number
    Recyclability_Score: number
    Recycled_Content_Pct: number
    Redundancy_Index: number
    Sensor_Anomalies: number
    Shelf_Space_Efficiency: number
    Spoilage_Risk_Score: number
    Stockout_Risk: number
    Take_Back_Eligible: number
    Transport_Emissions: number
    Upcoming_Local_Events: number
    Waste_Risk_Index: number
    category: string
  }
  prediction: {
    days_to_expiry_pred: number
    dead_stock: boolean
    forecasted_demand_pred: number
    spoilage_risk: "Red" | "Yellow" | "Green"
    suggested_markdown_percent: number
    sustainability_label: "Red" | "Yellow" | "Green"
    trigger_markdown: boolean
  }
  sku: string
}

export function ProductDetailTab() {
  const [sku, setSku] = useState<string>("")
  const [result, setResult] = useState<ProductDetail | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!sku.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const url = `https://shelfpulse.onrender.com/api/v1/product/${sku}`
      const res = await fetch(url)

      if (!res.ok) {
        throw new Error("Product not found")
      }

      const data = await res.json()
      console.log(data)
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product")
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "green":
        return "bg-green-500"
      case "yellow":
        return "bg-yellow-500"
      case "red":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "green":
        return <CheckCircle className="w-4 h-4" />
      case "yellow":
        return <AlertTriangle className="w-4 h-4" />
      case "red":
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getScoreColor = (score: number, isPercentage = false) => {
    const threshold = isPercentage ? 50 : 0.5
    if (score >= threshold) return "text-red-600"
    if (score >= threshold * 0.5) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <div className="max-w-6xl mx-auto p-8 bg-yellow-300 min-h-screen">
      {/* Search Form */}
      <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000000] p-8 mb-8">
        <div className="mb-6">
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">PRODUCT LOOKUP</h1>
          <div className="w-24 h-2 bg-black"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-cyan-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
            <Label className="text-xl font-black text-black mb-4 block tracking-wide">ENTER SKU ID</Label>
            <Input
              placeholder="SKU-1005"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="border-4 border-black bg-white text-black font-bold text-lg h-12 shadow-[4px_4px_0px_0px_#000000] focus:shadow-[6px_6px_0px_0px_#000000] transition-all mb-4"
            />
            <Button
              type="submit"
              // disabled={isLoading || !sku.trim()}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-xl py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_#000000] hover:shadow-[8px_8px_0px_0px_#000000] transition-all transform hover:-translate-x-1 hover:-translate-y-1 tracking-wider"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  SEARCHING...
                </>
              ) : (
                <>🔍 LOOKUP PRODUCT</>
              )}
            </Button>
          </div>
        </form>

        {error && (
          <div className="mt-6 bg-red-200 border-4 border-black p-4 shadow-[4px_4px_0px_0px_#000000]">
            <p className="text-red-800 font-bold text-lg">❌ {error}</p>
          </div>
        )}
      </div>

      {/* Product Details */}
      {result && (
        <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000000] p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-black mb-2 tracking-tight">PRODUCT DETAILS</h2>
            <div className="w-20 h-2 bg-black"></div>
          </div>

          <Card className="border-4 border-black shadow-[6px_6px_0px_0px_#000000] bg-gradient-to-r from-blue-100 to-purple-100 mb-8">
            <CardHeader className="border-b-4 border-black bg-white">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-8 h-8" />
                  <span className="text-3xl font-black">{result.sku}</span>
                  <Badge className="bg-black text-white font-bold border-2 border-black text-lg px-3 py-1">
                    {result.features.category.toUpperCase()}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Key Predictions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000000]">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-6 h-6" />
                    <span className="font-black text-lg">EXPIRES IN</span>
                  </div>
                  <div className="text-3xl font-black text-red-600">{result.prediction.days_to_expiry_pred} DAYS</div>
                  <div className="text-sm font-bold text-gray-600 mt-1">
                    Actual: {result.features.Days_to_Expiry} days
                  </div>
                </div>

                <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000000]">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-6 h-6" />
                    <span className="font-black text-lg">DEMAND</span>
                  </div>
                  <div className="text-3xl font-black text-blue-600">
                    {result.prediction.forecasted_demand_pred.toFixed(2)}
                  </div>
                  <div className="text-sm font-bold text-gray-600 mt-1">
                    Historical: {result.features.Forecasted_Demand.toFixed(2)}
                  </div>
                </div>

                <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000000]">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-6 h-6" />
                    <span className="font-black text-lg">SPOILAGE</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 text-white font-black px-3 py-2 ${getRiskColor(result.prediction.spoilage_risk)}`}
                  >
                    {getRiskIcon(result.prediction.spoilage_risk)}
                    {result.prediction.spoilage_risk.toUpperCase()}
                  </div>
                  <div className="text-sm font-bold text-gray-600 mt-2">
                    Score: {(result.features.Spoilage_Risk_Score * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000000]">
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf className="w-6 h-6" />
                    <span className="font-black text-lg">SUSTAINABILITY</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 text-white font-black px-3 py-2 ${getRiskColor(result.prediction.sustainability_label)}`}
                  >
                    {getRiskIcon(result.prediction.sustainability_label)}
                    {result.prediction.sustainability_label.toUpperCase()}
                  </div>
                  <div className="text-sm font-bold text-gray-600 mt-2">
                    Recyclability: {(result.features.Recyclability_Score * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Status Alerts */}
              <div className="flex flex-wrap gap-4 mb-8">
                {result.prediction.dead_stock && (
                  <Badge className="bg-red-500 text-white font-bold border-3 border-black text-lg px-4 py-2">
                    💀 DEAD STOCK
                  </Badge>
                )}
                {result.prediction.trigger_markdown && (
                  <Badge className="bg-orange-500 text-white font-bold border-3 border-black text-lg px-4 py-2">
                    🏷️ MARKDOWN TRIGGER
                  </Badge>
                )}
                {result.prediction.suggested_markdown_percent > 0 && (
                  <Badge className="bg-yellow-500 text-black font-bold border-3 border-black text-lg px-4 py-2">
                    📉 {result.prediction.suggested_markdown_percent}% MARKDOWN
                  </Badge>
                )}
                {result.features.Take_Back_Eligible === 1 && (
                  <Badge className="bg-green-500 text-white font-bold border-3 border-black text-lg px-4 py-2">
                    ♻️ TAKE-BACK ELIGIBLE
                  </Badge>
                )}
              </div>

              {/* Detailed Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sales & Performance */}
                <div className="bg-pink-200 border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000000]">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    SALES & PERFORMANCE
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-bold">Turnover Time:</span>
                      <span className={`font-black ${getScoreColor(result.features.Average_Turnover_Time / 30)}`}>
                        {result.features.Average_Turnover_Time.toFixed(1)} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Last Sale:</span>
                      <span className={`font-black ${getScoreColor(result.features.Days_Since_Last_Sale / 30)}`}>
                        {result.features.Days_Since_Last_Sale} days ago
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Sell Through:</span>
                      <span className={`font-black ${getScoreColor(1 - result.features.Historical_Sell_Through)}`}>
                        {(result.features.Historical_Sell_Through * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Markdown History:</span>
                      <span className={`font-black ${getScoreColor(result.features.Markdown_History / 5)}`}>
                        {result.features.Markdown_History} times
                      </span>
                    </div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="bg-orange-200 border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000000]">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    RISK ASSESSMENT
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-bold">Overstock Risk:</span>
                      <span className={`font-black ${getScoreColor(result.features.Overstock_Risk)}`}>
                        {(result.features.Overstock_Risk * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Stockout Risk:</span>
                      <span className={`font-black ${getScoreColor(result.features.Stockout_Risk)}`}>
                        {(result.features.Stockout_Risk * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Waste Risk:</span>
                      <span className={`font-black ${getScoreColor(result.features.Waste_Risk_Index)}`}>
                        {(result.features.Waste_Risk_Index * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Sensor Anomalies:</span>
                      <span className={`font-black ${getScoreColor(result.features.Sensor_Anomalies / 10)}`}>
                        {result.features.Sensor_Anomalies}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="bg-green-200 border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000000]">
                  <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                    <Recycle className="w-5 h-5" />
                    ENVIRONMENTAL
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-bold">Carbon Footprint:</span>
                      <span className={`font-black ${getScoreColor(result.features.Embedded_Carbon_Footprint / 10)}`}>
                        {result.features.Embedded_Carbon_Footprint.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Transport Emissions:</span>
                      <span className={`font-black ${getScoreColor(result.features.Transport_Emissions / 10)}`}>
                        {result.features.Transport_Emissions.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Compostability:</span>
                      <span className={`font-black ${getScoreColor(1 - result.features.Compostability_Score)}`}>
                        {(result.features.Compostability_Score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Recycled Content:</span>
                      <span className={`font-black ${getScoreColor(1 - result.features.Recycled_Content_Pct)}`}>
                        {(result.features.Recycled_Content_Pct * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
