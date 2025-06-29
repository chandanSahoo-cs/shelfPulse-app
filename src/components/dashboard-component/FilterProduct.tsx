"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal, Search, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "./DataTable"

const FILTER_FIELDS = [
  { id: "Historical_Sell_Through", label: "Historical Sell Through", min: 0, max: 100, unit: "%" },
  { id: "Spoilage_Risk_Score", label: "Spoilage Risk Score", min: 0, max: 1, unit: "" },
  { id: "Cold_Chain_Energy_Use", label: "Cold Chain Energy Use", min: 0, max: 1000, unit: "kWh" },
  { id: "Sensor_Anomalies", label: "Sensor Anomalies", min: 0, max: 50, unit: "" },
  { id: "Markdown_History", label: "Markdown History", min: 0, max: 100, unit: "%" },
  { id: "Transport_Emissions", label: "Transport Emissions", min: 0, max: 500, unit: "kg CO2" },
  { id: "Recyclability_Score", label: "Recyclability Score", min: 0, max: 1, unit: "" },
  { id: "Overstock_Risk", label: "Overstock Risk", min: 0, max: 1, unit: "" },
  { id: "Stockout_Risk", label: "Stockout Risk", min: 0, max: 1, unit: "" },
  { id: "Embedded_Carbon_Footprint", label: "Embedded Carbon Footprint", min: 0, max: 100, unit: "kg CO2" },
  { id: "Recycled_Content_Pct", label: "Recycled Content %", min: 0, max: 100, unit: "%" },
  { id: "Compostability_Score", label: "Compostability Score", min: 0, max: 1, unit: "" },
  { id: "Waste_Risk_Index", label: "Waste Risk Index", min: 0, max: 1, unit: "" },
  { id: "Days_to_Expiry", label: "Days to Expiry", min: 0, max: 365, unit: "days" },
  { id: "Forecasted_Demand", label: "Forecasted Demand", min: 0, max: 10000, unit: "units" },
]

const CATEGORIES = [
  "Electronics",
  "Food & Beverage",
  "Clothing",
  "Home & Garden",
  "Health & Beauty",
  "Sports & Outdoors",
]

const MOCK_PRODUCTS = [
  {
    id: "SKU001",
    name: "Organic Apples",
    category: "Food & Beverage",
    spoilage_risk: 0.3,
    waste_risk: 0.2,
    days_to_expiry: 7,
    forecasted_demand: 150,
  },
  {
    id: "SKU002",
    name: "Wireless Headphones",
    category: "Electronics",
    spoilage_risk: 0.1,
    waste_risk: 0.4,
    days_to_expiry: 365,
    forecasted_demand: 75,
  },
  {
    id: "SKU003",
    name: "Cotton T-Shirt",
    category: "Clothing",
    spoilage_risk: 0.05,
    waste_risk: 0.3,
    days_to_expiry: 180,
    forecasted_demand: 200,
  },
  {
    id: "SKU004",
    name: "Garden Fertilizer",
    category: "Home & Garden",
    spoilage_risk: 0.2,
    waste_risk: 0.25,
    days_to_expiry: 90,
    forecasted_demand: 50,
  },
  {
    id: "SKU005",
    name: "Protein Powder",
    category: "Health & Beauty",
    spoilage_risk: 0.15,
    waste_risk: 0.35,
    days_to_expiry: 365,
    forecasted_demand: 120,
  },
]

export function FilterProductsTab() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [filterValues, setFilterValues] = useState<Record<string, [number, number]>>({})
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [filteredProducts, setFilteredProducts] = useState(MOCK_PRODUCTS)

  const handleFilterToggle = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter((id) => id !== filterId))
      const newValues = { ...filterValues }
      delete newValues[filterId]
      setFilterValues(newValues)
    } else {
      setSelectedFilters([...selectedFilters, filterId])
      const field = FILTER_FIELDS.find((f) => f.id === filterId)
      if (field) {
        setFilterValues({
          ...filterValues,
          [filterId]: [field.min, field.max],
        })
      }
    }
  }

  const handleSliderChange = (filterId: string, value: [number, number]) => {
    setFilterValues({
      ...filterValues,
      [filterId]: value,
    })
  }

  const handleSearch = () => {
    // Mock filtering logic
    let filtered = MOCK_PRODUCTS

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
  }

  const columns = [
    { accessorKey: "id", header: "SKU" },
    { accessorKey: "name", header: "Product Name" },
    { accessorKey: "category", header: "Category" },
    {
      accessorKey: "spoilage_risk",
      header: "Spoilage Risk",
      cell: ({ row }: any) => (
        <Badge
          variant={
            row.original.spoilage_risk > 0.5
              ? "destructive"
              : row.original.spoilage_risk > 0.2
                ? "secondary"
                : "default"
          }
        >
          {(row.original.spoilage_risk * 100).toFixed(1)}%
        </Badge>
      ),
    },
    {
      accessorKey: "days_to_expiry",
      header: "Days to Expiry",
      cell: ({ row }: any) => `${row.original.days_to_expiry} days`,
    },
    {
      accessorKey: "forecasted_demand",
      header: "Forecasted Demand",
      cell: ({ row }: any) => `${row.original.forecasted_demand} units`,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Product Filters
          </CardTitle>
          <CardDescription>
            Select filter criteria and adjust ranges to find products matching your requirements
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filter Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Select Filters</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {FILTER_FIELDS.map((field) => (
                <div key={field.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.id}
                    checked={selectedFilters.includes(field.id)}
                    onCheckedChange={() => handleFilterToggle(field.id)}
                  />
                  <Label htmlFor={field.id} className="text-sm font-normal cursor-pointer">
                    {field.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Filters */}
          {selectedFilters.length > 0 && (
            <div className="space-y-2">
              <Label className="text-base font-medium">Selected Filters</Label>
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map((filterId) => {
                  const field = FILTER_FIELDS.find((f) => f.id === filterId)
                  return (
                    <Badge key={filterId} variant="secondary" className="flex items-center gap-1">
                      {field?.label}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterToggle(filterId)} />
                    </Badge>
                  )
                })}
              </div>
            </div>
          )}

          {/* Dynamic Sliders */}
          {selectedFilters.length > 0 && (
            <Card className="bg-slate-50/50">
              <CardHeader>
                <CardTitle className="text-lg">Filter Ranges</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-6 pr-4">
                    {selectedFilters.map((filterId) => {
                      const field = FILTER_FIELDS.find((f) => f.id === filterId)
                      if (!field) return null

                      const currentValue = filterValues[filterId] || [field.min, field.max]

                      return (
                        <div key={filterId} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label className="font-medium">{field.label}</Label>
                            <span className="text-sm text-slate-600">
                              {currentValue[0]} - {currentValue[1]} {field.unit}
                            </span>
                          </div>
                          <Slider
                            value={currentValue}
                            onValueChange={(value) => handleSliderChange(filterId, value as [number, number])}
                            min={field.min}
                            max={field.max}
                            step={(field.max - field.min) / 100}
                            className="w-full"
                          />
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} className="w-full flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Products
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Filtered Results</CardTitle>
          <CardDescription>{filteredProducts.length} products found matching your criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={filteredProducts} />
        </CardContent>
      </Card>
    </div>
  )
}
