"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Download, CheckCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UploadCheckTab() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [manualData, setManualData] = useState({
    sku: "",
    name: "",
    category: "",
    days_to_expiry: "",
    forecasted_demand: "",
    historical_sell_through: "",
    spoilage_risk_score: "",
    waste_risk_index: "",
  })
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleManualSubmit = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResults({
        type: "single",
        data: {
          sku: manualData.sku,
          name: manualData.name,
          predictions: {
            spoilage_label: "Medium",
            sustainability_label: "Green",
            suggested_markdown_percent: 15,
            optimal_stock_level: 180,
            predicted_waste_amount: 3.2,
          },
        },
      })
      setLoading(false)
    }, 1000)
  }

  const handleCSVProcess = () => {
    setLoading(true)
    // Simulate CSV processing
    setTimeout(() => {
      setResults({
        type: "batch",
        processed: 150,
        successful: 147,
        failed: 3,
        downloadUrl: "#",
      })
      setLoading(false)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setManualData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload & Check Products
          </CardTitle>
          <CardDescription>
            Upload a CSV file for batch processing or manually enter product data for individual analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="csv" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="csv">CSV Upload</TabsTrigger>
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            </TabsList>

            <TabsContent value="csv" className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="csv-upload" className="cursor-pointer">
                    <span className="text-lg font-medium">Drop your CSV file here or click to browse</span>
                  </Label>
                  <Input id="csv-upload" type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
                  <p className="text-sm text-slate-500">Supported format: CSV with product data columns</p>
                </div>
              </div>

              {uploadedFile && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">{uploadedFile.name}</p>
                          <p className="text-sm text-slate-600">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <Button onClick={handleCSVProcess} disabled={loading}>
                        {loading ? "Processing..." : "Process CSV"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    placeholder="Enter product SKU"
                    value={manualData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={manualData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={manualData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="health">Health & Beauty</SelectItem>
                      <SelectItem value="sports">Sports & Outdoors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days_to_expiry">Days to Expiry</Label>
                  <Input
                    id="days_to_expiry"
                    type="number"
                    placeholder="Enter days to expiry"
                    value={manualData.days_to_expiry}
                    onChange={(e) => handleInputChange("days_to_expiry", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="forecasted_demand">Forecasted Demand</Label>
                  <Input
                    id="forecasted_demand"
                    type="number"
                    placeholder="Enter forecasted demand"
                    value={manualData.forecasted_demand}
                    onChange={(e) => handleInputChange("forecasted_demand", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="historical_sell_through">Historical Sell Through (%)</Label>
                  <Input
                    id="historical_sell_through"
                    type="number"
                    placeholder="Enter sell through percentage"
                    value={manualData.historical_sell_through}
                    onChange={(e) => handleInputChange("historical_sell_through", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleManualSubmit}
                  disabled={!manualData.sku || !manualData.name || loading}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  {loading ? "Analyzing..." : "Analyze Product"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results.type === "single" ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-600">Product</Label>
                    <p className="font-medium">
                      {results.data.name} ({results.data.sku})
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-slate-600">Predictions</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-600">Spoilage Risk</p>
                      <Badge variant="secondary" className="mt-1">
                        {results.data.predictions.spoilage_label}
                      </Badge>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-600">Sustainability</p>
                      <Badge variant="default" className="mt-1">
                        {results.data.predictions.sustainability_label}
                      </Badge>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-sm text-slate-600">Suggested Markdown</p>
                      <p className="text-lg font-semibold mt-1">
                        {results.data.predictions.suggested_markdown_percent}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600">Total Processed</p>
                    <p className="text-2xl font-bold text-blue-700">{results.processed}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600">Successful</p>
                    <p className="text-2xl font-bold text-green-700">{results.successful}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600">Failed</p>
                    <p className="text-2xl font-bold text-red-700">{results.failed}</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Results CSV
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
