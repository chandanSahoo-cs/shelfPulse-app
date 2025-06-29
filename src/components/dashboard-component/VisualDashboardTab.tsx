"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts"
import {
  TrendingUp,
  PieChartIcon,
  BarChart3,
  ScatterChartIcon as ScatterIcon,
  Activity,
  Eye,
  Grid3X3,
} from "lucide-react"

// Mock data for charts (keep existing data)
const spoilageRiskData = [
  { risk: "Low", count: 45, color: "#10b981" },
  { risk: "Medium", count: 32, color: "#f59e0b" },
  { risk: "High", count: 18, color: "#ef4444" },
]

const markdownDemandData = [
  { forecasted_demand: 50, suggested_markdown: 25 },
  { forecasted_demand: 75, suggested_markdown: 20 },
  { forecasted_demand: 100, suggested_markdown: 15 },
  { forecasted_demand: 125, suggested_markdown: 12 },
  { forecasted_demand: 150, suggested_markdown: 10 },
  { forecasted_demand: 175, suggested_markdown: 8 },
  { forecasted_demand: 200, suggested_markdown: 5 },
  { forecasted_demand: 225, suggested_markdown: 3 },
  { forecasted_demand: 250, suggested_markdown: 2 },
]

const sustainabilityData = [
  { label: "Green", value: 60, color: "#10b981" },
  { label: "Yellow", value: 25, color: "#f59e0b" },
  { label: "Red", value: 15, color: "#ef4444" },
]

const categoryWasteData = [
  { category: "Electronics", waste_risk: 0.35 },
  { category: "Food & Beverage", waste_risk: 0.65 },
  { category: "Clothing", waste_risk: 0.25 },
  { category: "Home & Garden", waste_risk: 0.45 },
  { category: "Health & Beauty", waste_risk: 0.3 },
  { category: "Sports & Outdoors", waste_risk: 0.2 },
]

const expiryHistogramData = [
  { days: "0-7", count: 12 },
  { days: "8-14", count: 18 },
  { days: "15-30", count: 25 },
  { days: "31-60", count: 35 },
  { days: "61-90", count: 28 },
  { days: "91-180", count: 22 },
  { days: "181-365", count: 15 },
  { days: "365+", count: 8 },
]

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

// Dashboard configuration
const DASHBOARD_OPTIONS = [
  {
    id: "spoilage-risk",
    title: "Spoilage Risk Distribution",
    description: "Count of products by spoilage risk level",
    icon: BarChart3,
    category: "Risk Analysis",
  },
  {
    id: "markdown-demand",
    title: "Markdown % vs Forecasted Demand",
    description: "Relationship between demand forecast and suggested markdown",
    icon: ScatterIcon,
    category: "Pricing Analysis",
  },
  {
    id: "sustainability",
    title: "Sustainability Label Breakdown",
    description: "Distribution of sustainability ratings",
    icon: PieChartIcon,
    category: "Sustainability",
  },
  {
    id: "category-waste",
    title: "Category vs Average Waste Risk",
    description: "Average waste risk index by product category",
    icon: TrendingUp,
    category: "Category Analysis",
  },
  {
    id: "expiry-histogram",
    title: "Predicted Expiry Histogram",
    description: "Distribution of products by days to expiry",
    icon: Activity,
    category: "Inventory Management",
  },
  {
    id: "overview",
    title: "Complete Overview",
    description: "View all dashboards in a comprehensive layout",
    icon: Grid3X3,
    category: "Overview",
  },
]

export function VisualDashboardTab() {
  const [selectedDashboard, setSelectedDashboard] = useState<string>("")
  const [viewMode, setViewMode] = useState<"select" | "view">("select")

  const handleDashboardSelect = (dashboardId: string) => {
    setSelectedDashboard(dashboardId)
    setViewMode("view")
  }

  const handleBackToSelection = () => {
    setViewMode("select")
    setSelectedDashboard("")
  }

  const renderSelectedDashboard = () => {
    switch (selectedDashboard) {
      case "spoilage-risk":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Spoilage Risk Distribution
              </CardTitle>
              <CardDescription>Count of products by spoilage risk level</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={spoilageRiskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="risk" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "markdown-demand":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScatterIcon className="h-5 w-5" />
                Markdown % vs Forecasted Demand
              </CardTitle>
              <CardDescription>Relationship between demand forecast and suggested markdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={markdownDemandData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="forecasted_demand" name="Forecasted Demand" unit=" units" />
                  <YAxis dataKey="suggested_markdown" name="Suggested Markdown" unit="%" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name) => [
                      `${value}${name === "suggested_markdown" ? "%" : " units"}`,
                      name === "suggested_markdown" ? "Markdown" : "Demand",
                    ]}
                  />
                  <Scatter dataKey="suggested_markdown" fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "sustainability":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Sustainability Label Breakdown
              </CardTitle>
              <CardDescription>Distribution of sustainability ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={sustainabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={150}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sustainabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {sustainabilityData.map((entry, index) => (
                  <div key={entry.label} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm">
                      {entry.label}: {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "category-waste":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Category vs Average Waste Risk
              </CardTitle>
              <CardDescription>Average waste risk index by product category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={categoryWasteData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 1]} />
                  <YAxis dataKey="category" type="category" width={120} />
                  <Tooltip formatter={(value) => [`${((value as number) * 100).toFixed(1)}%`, "Waste Risk"]} />
                  <Bar dataKey="waste_risk" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "expiry-histogram":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Predicted Expiry Histogram
              </CardTitle>
              <CardDescription>Distribution of products by days to expiry</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={expiryHistogramData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="days" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Spoilage Risk Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Spoilage Risk Distribution
                  </CardTitle>
                  <CardDescription>Count of products by spoilage risk level</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={spoilageRiskData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="risk" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Sustainability Label Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Sustainability Label Breakdown
                  </CardTitle>
                  <CardDescription>Distribution of sustainability ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={sustainabilityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sustainabilityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-4">
                    {sustainabilityData.map((entry, index) => (
                      <div key={entry.label} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">
                          {entry.label}: {entry.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Markdown vs Forecasted Demand */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ScatterIcon className="h-5 w-5" />
                    Markdown % vs Forecasted Demand
                  </CardTitle>
                  <CardDescription>Relationship between demand forecast and suggested markdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart data={markdownDemandData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="forecasted_demand" name="Forecasted Demand" unit=" units" />
                      <YAxis dataKey="suggested_markdown" name="Suggested Markdown" unit="%" />
                      <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        formatter={(value, name) => [
                          `${value}${name === "suggested_markdown" ? "%" : " units"}`,
                          name === "suggested_markdown" ? "Markdown" : "Demand",
                        ]}
                      />
                      <Scatter dataKey="suggested_markdown" fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category vs Average Waste Risk */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Category vs Average Waste Risk
                  </CardTitle>
                  <CardDescription>Average waste risk index by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryWasteData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 1]} />
                      <YAxis dataKey="category" type="category" width={100} />
                      <Tooltip formatter={(value) => [`${((value as number) * 100).toFixed(1)}%`, "Waste Risk"]} />
                      <Bar dataKey="waste_risk" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Predicted Expiry Histogram */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Predicted Expiry Histogram
                </CardTitle>
                <CardDescription>Distribution of products by days to expiry</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={expiryHistogramData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="days" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  if (viewMode === "select") {
    return (
      <div className="space-y-6">
        {/* Dashboard Selection Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Select Dashboard View
            </CardTitle>
            <CardDescription>Choose which analytics dashboard you want to explore</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Quick Select</label>
                <Select value={selectedDashboard} onValueChange={handleDashboardSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a dashboard..." />
                  </SelectTrigger>
                  <SelectContent>
                    {DASHBOARD_OPTIONS.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DASHBOARD_OPTIONS.map((option) => {
            const IconComponent = option.icon
            return (
              <Card
                key={option.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => handleDashboardSelect(option.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                    <Badge variant="outline" className="text-xs">
                      {option.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{option.description}</CardDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDashboardSelect(option.id)
                    }}
                  >
                    View Dashboard
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handleBackToSelection} className="flex items-center gap-2 bg-transparent">
          ← Back to Dashboard Selection
        </Button>
        <Badge variant="secondary" className="flex items-center gap-2">
          <Eye className="h-3 w-3" />
          {DASHBOARD_OPTIONS.find((d) => d.id === selectedDashboard)?.title}
        </Badge>
      </div>

      {/* Selected Dashboard */}
      {renderSelectedDashboard()}
    </div>
  )
}
