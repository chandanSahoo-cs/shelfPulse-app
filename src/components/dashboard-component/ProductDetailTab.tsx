"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Package, AlertTriangle, Leaf, TrendingUp } from "lucide-react"

const MOCK_PRODUCT_DETAILS = {
  SKU001: {
    name: "Organic Apples",
    category: "Food & Beverage",
    description: "Fresh organic apples sourced from local farms",
    features: {
      historical_sell_through: 85,
      spoilage_risk_score: 0.3,
      cold_chain_energy_use: 45,
      sensor_anomalies: 2,
      markdown_history: 15,
      transport_emissions: 12.5,
      recyclability_score: 0.9,
      overstock_risk: 0.2,
      stockout_risk: 0.1,
      embedded_carbon_footprint: 8.2,
      recycled_content_pct: 0,
      compostability_score: 1.0,
      waste_risk_index: 0.25,
      days_to_expiry: 7,
      forecasted_demand: 150,
    },
    predictions: {
      spoilage_label: "Medium",
      sustainability_label: "Green",
      suggested_markdown_percent: 10,
      optimal_stock_level: 200,
      predicted_waste_amount: 5.2,
    },
  },
}

export function ProductDetailTab() {
  const [sku, setSku] = useState("")
  const [productData, setProductData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const data = MOCK_PRODUCT_DETAILS[sku as keyof typeof MOCK_PRODUCT_DETAILS]
      setProductData(data || null)
      setLoading(false)
    }, 500)
  }

  const getSpoilageColor = (label: string) => {
    switch (label.toLowerCase()) {
      case "low":
        return "default"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getSustainabilityColor = (label: string) => {
    switch (label.toLowerCase()) {
      case "green":
        return "default"
      case "yellow":
        return "secondary"
      case "red":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Detail Search
          </CardTitle>
          <CardDescription>Enter a SKU to view detailed product information and predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="sku">Product SKU</Label>
              <Input
                id="sku"
                placeholder="Enter SKU (e.g., SKU001)"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={!sku || loading}>
                <Search className="h-4 w-4 mr-2" />
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {productData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>{productData.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-600">Category</Label>
                  <p className="font-medium">{productData.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-600">SKU</Label>
                  <p className="font-medium">{sku}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-600">Description</Label>
                <p className="text-sm text-slate-700">{productData.description}</p>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-600">Key Metrics</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600">Days to Expiry</p>
                    <p className="text-lg font-semibold">{productData.features.days_to_expiry}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600">Forecasted Demand</p>
                    <p className="text-lg font-semibold">{productData.features.forecasted_demand}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600">Sell Through %</p>
                    <p className="text-lg font-semibold">{productData.features.historical_sell_through}%</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600">Waste Risk</p>
                    <p className="text-lg font-semibold">{(productData.features.waste_risk_index * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Predictions & Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Predictions & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Badges */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-600">Status Labels</Label>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Spoilage Risk:</span>
                    <Badge variant={getSpoilageColor(productData.predictions.spoilage_label)}>
                      {productData.predictions.spoilage_label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Sustainability:</span>
                    <Badge variant={getSustainabilityColor(productData.predictions.sustainability_label)}>
                      {productData.predictions.sustainability_label}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Predictions */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-600">AI Predictions</Label>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Suggested Markdown</span>
                    <span className="font-semibold text-blue-700">
                      {productData.predictions.suggested_markdown_percent}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Optimal Stock Level</span>
                    <span className="font-semibold text-green-700">
                      {productData.predictions.optimal_stock_level} units
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium">Predicted Waste</span>
                    <span className="font-semibold text-orange-700">
                      {productData.predictions.predicted_waste_amount} kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Environmental Metrics */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-600">Environmental Impact</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600">Carbon Footprint</p>
                    <p className="font-semibold">{productData.features.embedded_carbon_footprint} kg CO2</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm text-slate-600">Recyclability</p>
                    <p className="font-semibold">{(productData.features.recyclability_score * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {productData === null && sku && !loading && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No product found with SKU: {sku}</p>
            <p className="text-sm text-slate-500 mt-2">Try searching for SKU001 for demo data</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
