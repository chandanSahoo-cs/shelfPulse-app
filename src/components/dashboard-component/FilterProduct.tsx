"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package, AlertTriangle, Leaf, Clock, TrendingDown, CheckCircle, XCircle } from "lucide-react"

type Filters = {
  expireMinThan?: number
  expireMaxThan?: number
  forecastMinThan?: number
  forecastMaxThan?: number
  suggestedMarkdownPercentMinThan?: number
  suggestedMarkdownPercentMaxThan?: number
  deadStock?: boolean
  triggerMarkdown?: boolean
  spoilageRisk?: "green" | "yellow" | "red"
  sustainabilityLabel?: "green" | "yellow" | "red"
}

type ProductResult = {
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

export function FilterProductsTab() {
  const [filters, setFilters] = useState<Filters>({})
  const [results, setResults] = useState<ProductResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())

  const handleNumberChange = (key: keyof Filters) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setFilters((prev) => ({
      ...prev,
      [key]: val ? Number.parseFloat(val) : undefined,
    }))
  }

  const handleCheckedChange = (key: keyof Filters) => (checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const handleSelectChange = (key: keyof Filters) => (value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const params = new URLSearchParams()

    // Fix the parameter mapping
    if (filters.expireMaxThan) params.append("days_to_expiry_pred_lt", filters.expireMaxThan.toString())
    if (filters.expireMinThan) params.append("days_to_expiry_pred_gt", filters.expireMinThan.toString())
    if (filters.forecastMaxThan) params.append("forecasted_demand_pred_lt", filters.forecastMaxThan.toString())
    if (filters.forecastMinThan) params.append("forecasted_demand_pred_gt", filters.forecastMinThan.toString())
    if (filters.suggestedMarkdownPercentMaxThan)
      params.append("suggested_markdown_percent_lt", filters.suggestedMarkdownPercentMaxThan.toString())
    if (filters.suggestedMarkdownPercentMinThan)
      params.append("suggested_markdown_percent_gt", filters.suggestedMarkdownPercentMinThan.toString())
    if (filters.deadStock) params.append("dead_stock", filters.deadStock.toString())
    if (filters.triggerMarkdown) params.append("trigger_markdown", filters.triggerMarkdown.toString())
    if (filters.spoilageRisk) params.append("spoilage_risk", filters.spoilageRisk)
    if (filters.sustainabilityLabel) params.append("sustainability_label", filters.sustainabilityLabel)

    const url = `https://shelfpulse.onrender.com/api/v1/products?${params.toString()}`

    try {
      console.log(url)
      const res = await fetch(url)
      if (!res.ok) {
        console.log("Failed to fetch data")
        setResults([])
      } else {
        const result = await res.json()
        console.log(result)
        setResults(result)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setResults([])
    } finally {
      setIsLoading(false)
      setHasSearched(true)
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

  return (
    <div className="max-w-6xl mx-auto p-8 bg-yellow-300 min-h-screen">
      {/* Main Container */}
      <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000000] p-8 mb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">PRODUCT FILTERS</h1>
          <div className="w-24 h-2 bg-black"></div>
        </div>

        {/* Filter Selection */}
        <div className="bg-gray-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000] mb-8">
          <Label className="text-xl font-black text-black mb-4 block tracking-wide">SELECT FILTERS TO USE</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "expire", label: "Days to Expire" },
              { key: "forecast", label: "Forecasted Demand" },
              { key: "markdown", label: "Markdown %" },
              { key: "stock", label: "Stock Status" },
              { key: "spoilage", label: "Spoilage Risk" },
              { key: "sustainability", label: "Sustainability" },
            ].map((filter) => (
              <div key={filter.key} className="flex items-center space-x-3">
                <Checkbox
                  id={filter.key}
                  checked={activeFilters.has(filter.key)}
                  onCheckedChange={(checked) => {
                    const newFilters = new Set(activeFilters)
                    if (checked) {
                      newFilters.add(filter.key)
                    } else {
                      newFilters.delete(filter.key)
                    }
                    setActiveFilters(newFilters)
                  }}
                  className="w-5 h-5 border-3 border-black data-[state=checked]:bg-black data-[state=checked]:text-white shadow-[2px_2px_0px_0px_#000000]"
                />
                <Label htmlFor={filter.key} className="text-sm font-bold text-black cursor-pointer">
                  {filter.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Days to Expire Section */}
          {activeFilters.has("expire") && (
            <div className="bg-cyan-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
              <Label className="text-xl font-black text-black mb-4 block tracking-wide">DAYS TO EXPIRE</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-bold text-black mb-2 block">MIN</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.expireMinThan ?? ""}
                    onChange={handleNumberChange("expireMinThan")}
                    className="border-4 border-black bg-white text-black font-bold text-lg h-12 shadow-[4px_4px_0px_0px_#000000] focus:shadow-[6px_6px_0px_0px_#000000] transition-all"
                  />
                </div>
                <div>
                  <Label className="text-sm font-bold text-black mb-2 block">MAX</Label>
                  <Input
                    type="number"
                    placeholder="999"
                    value={filters.expireMaxThan ?? ""}
                    onChange={handleNumberChange("expireMaxThan")}
                    className="border-4 border-black bg-white text-black font-bold text-lg h-12 shadow-[4px_4px_0px_0px_#000000] focus:shadow-[6px_6px_0px_0px_#000000] transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Forecasted Demand Section */}
          {activeFilters.has("forecast") && (
            <div className="bg-pink-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
              <Label className="text-xl font-black text-black mb-4 block tracking-wide">FORECASTED DEMAND</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-bold text-black mb-2 block">MIN</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={filters.forecastMinThan ?? ""}
                    onChange={handleNumberChange("forecastMinThan")}
                    className="border-4 border-black bg-white text-black font-bold text-lg h-12 shadow-[4px_4px_0px_0px_#000000] focus:shadow-[6px_6px_0px_0px_#000000] transition-all"
                  />
                </div>
                <div>
                  <Label className="text-sm font-bold text-black mb-2 block">MAX</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="999.99"
                    value={filters.forecastMaxThan ?? ""}
                    onChange={handleNumberChange("forecastMaxThan")}
                    className="border-4 border-black bg-white text-black font-bold text-lg h-12 shadow-[4px_4px_0px_0px_#000000] focus:shadow-[6px_6px_0px_0px_#000000] transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Suggested Markdown Percent Section */}
          {activeFilters.has("markdown") && (
            <div className="bg-green-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
              <Label className="text-xl font-black text-black mb-4 block tracking-wide">SUGGESTED MARKDOWN %</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-bold text-black mb-2 block">MIN</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={filters.suggestedMarkdownPercentMinThan ?? ""}
                    onChange={handleNumberChange("suggestedMarkdownPercentMinThan")}
                    className="border-4 border-black bg-white text-black font-bold text-lg h-12 shadow-[4px_4px_0px_0px_#000000] focus:shadow-[6px_6px_0px_0px_#000000] transition-all"
                  />
                </div>
                <div>
                  <Label className="text-sm font-bold text-black mb-2 block">MAX</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="100.00"
                    value={filters.suggestedMarkdownPercentMaxThan ?? ""}
                    onChange={handleNumberChange("suggestedMarkdownPercentMaxThan")}
                    className="border-4 border-black bg-white text-black font-bold text-lg h-12 shadow-[4px_4px_0px_0px_#000000] focus:shadow-[6px_6px_0px_0px_#000000] transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Checkboxes Section */}
          {activeFilters.has("stock") && (
            <div className="bg-orange-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
              <Label className="text-xl font-black text-black mb-4 block tracking-wide">STOCK STATUS</Label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id="deadStock"
                    checked={filters.deadStock ?? false}
                    onCheckedChange={handleCheckedChange("deadStock")}
                    className="w-6 h-6 border-4 border-black data-[state=checked]:bg-black data-[state=checked]:text-white shadow-[3px_3px_0px_0px_#000000]"
                  />
                  <Label htmlFor="deadStock" className="text-lg font-bold text-black cursor-pointer">
                    DEAD STOCK
                  </Label>
                </div>

                <div className="flex items-center space-x-4">
                  <Checkbox
                    id="triggerMarkdown"
                    checked={filters.triggerMarkdown ?? false}
                    onCheckedChange={handleCheckedChange("triggerMarkdown")}
                    className="w-6 h-6 border-4 border-black data-[state=checked]:bg-black data-[state=checked]:text-white shadow-[3px_3px_0px_0px_#000000]"
                  />
                  <Label htmlFor="triggerMarkdown" className="text-lg font-bold text-black cursor-pointer">
                    TRIGGER MARKDOWN
                  </Label>
                </div>
              </div>
            </div>
          )}

          {/* Dropdowns Section */}
          {activeFilters.has("spoilage") || activeFilters.has("sustainability") ? (
            <div className="bg-purple-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
              <Label className="text-xl font-black text-black mb-4 block tracking-wide">RISK ASSESSMENT</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-bold text-black mb-2 block">SPOILAGE RISK</Label>
                  <Select value={filters.spoilageRisk ?? ""} onValueChange={handleSelectChange("spoilageRisk")}>
                    <SelectTrigger className="w-full border-4 border-black bg-white text-black font-bold text-lg h-12 shadow-[4px_4px_0px_0px_#000000] focus:shadow-[6px_6px_0px_0px_#000000]">
                      <SelectValue placeholder="-- SELECT --" />
                    </SelectTrigger>
                    <SelectContent className="border-4 border-black bg-white">
                      <SelectItem value="green" className="font-bold text-green-700">
                        🟢 GREEN
                      </SelectItem>
                      <SelectItem value="yellow" className="font-bold text-yellow-700">
                        🟡 YELLOW
                      </SelectItem>
                      <SelectItem value="red" className="font-bold text-red-700">
                        🔴 RED
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-bold text-black mb-2 block">SUSTAINABILITY LABEL</Label>
                  <Select
                    value={filters.sustainabilityLabel ?? ""}
                    onValueChange={handleSelectChange("sustainabilityLabel")}
                  >
                    <SelectTrigger className="w-full border-4 border-black bg-white text-black font-bold text-lg h-12 shadow-[4px_4px_0px_0px_#000000] focus:shadow-[6px_6px_0px_0px_#000000]">
                      <SelectValue placeholder="-- SELECT --" />
                    </SelectTrigger>
                    <SelectContent className="border-4 border-black bg-white">
                      <SelectItem value="green" className="font-bold text-green-700">
                        🟢 GREEN
                      </SelectItem>
                      <SelectItem value="yellow" className="font-bold text-yellow-700">
                        🟡 YELLOW
                      </SelectItem>
                      <SelectItem value="red" className="font-bold text-red-700">
                        🔴 RED
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ) : null}

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-2xl py-6 px-8 border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-[10px_10px_0px_0px_#000000] transition-all transform hover:-translate-x-1 hover:-translate-y-1 tracking-wider disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  SEARCHING...
                </>
              ) : (
                <>🔍 FILTER PRODUCTS</>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000000] p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-black mb-2 tracking-tight">SEARCH RESULTS ({results.length})</h2>
            <div className="w-20 h-2 bg-black"></div>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl font-bold text-gray-600">No products found matching your criteria</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {results.map((product, index) => (
                <Card
                  key={product.sku}
                  className="border-4 border-black shadow-[6px_6px_0px_0px_#000000] bg-gradient-to-r from-blue-100 to-purple-100"
                >
                  <CardHeader className="border-b-4 border-black bg-white">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Package className="w-6 h-6" />
                        <span className="text-2xl font-black">{product.sku}</span>
                        <Badge className="bg-black text-white font-bold border-2 border-black">
                          {product.features.category.toUpperCase()}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Predictions Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-white border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000000]">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="font-bold text-sm">EXPIRES IN</span>
                        </div>
                        <div className="text-2xl font-black text-red-600">
                          {product.prediction.days_to_expiry_pred} DAYS
                        </div>
                      </div>

                      <div className="bg-white border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000000]">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="w-4 h-4" />
                          <span className="font-bold text-sm">DEMAND</span>
                        </div>
                        <div className="text-2xl font-black text-blue-600">
                          {product.prediction.forecasted_demand_pred.toFixed(2)}
                        </div>
                      </div>

                      <div className="bg-white border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000000]">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="font-bold text-sm">SPOILAGE</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 text-white font-black px-2 py-1 ${getRiskColor(product.prediction.spoilage_risk)}`}
                        >
                          {getRiskIcon(product.prediction.spoilage_risk)}
                          {product.prediction.spoilage_risk.toUpperCase()}
                        </div>
                      </div>

                      <div className="bg-white border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000000]">
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="w-4 h-4" />
                          <span className="font-bold text-sm">SUSTAINABILITY</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 text-white font-black px-2 py-1 ${getRiskColor(product.prediction.sustainability_label)}`}
                        >
                          {getRiskIcon(product.prediction.sustainability_label)}
                          {product.prediction.sustainability_label.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex gap-3 mb-4">
                      {product.prediction.dead_stock && (
                        <Badge className="bg-red-500 text-white font-bold border-2 border-black">💀 DEAD STOCK</Badge>
                      )}
                      {product.prediction.trigger_markdown && (
                        <Badge className="bg-orange-500 text-white font-bold border-2 border-black">
                          🏷️ MARKDOWN TRIGGER
                        </Badge>
                      )}
                      {product.prediction.suggested_markdown_percent > 0 && (
                        <Badge className="bg-yellow-500 text-black font-bold border-2 border-black">
                          📉 {product.prediction.suggested_markdown_percent}% MARKDOWN
                        </Badge>
                      )}
                    </div>

                    {/* Key Features */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div className="bg-gray-100 border-2 border-black p-2">
                        <span className="font-bold">Turnover:</span> {product.features.Average_Turnover_Time.toFixed(1)}{" "}
                        days
                      </div>
                      <div className="bg-gray-100 border-2 border-black p-2">
                        <span className="font-bold">Last Sale:</span> {product.features.Days_Since_Last_Sale} days ago
                      </div>
                      <div className="bg-gray-100 border-2 border-black p-2">
                        <span className="font-bold">Overstock Risk:</span>{" "}
                        {(product.features.Overstock_Risk * 100).toFixed(1)}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
