"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, Upload, Loader2, Download, AlertCircle } from "lucide-react"
import { useState } from "react"

export function UploadCheckTab() {
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log(file)
      setUploadedFile(file)
      setError(null)
      setSuccess(false)
    }
  }

  const handleCSVProcess = async () => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      if (!uploadedFile) {
        setError("Please upload a file first")
        return
      }

      const formData = new FormData()
      formData.append("file", uploadedFile)

      const res = await fetch(`https://shelfpulse.onrender.com/api/v1/predict_csv`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`Failed to process file: ${res.statusText}`)
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "result.csv"
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process CSV file")
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-yellow-300 min-h-screen">
      {/* Main Container */}
      <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000000] p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">CSV UPLOAD & PROCESS</h1>
          <div className="w-24 h-2 bg-black"></div>
        </div>

        {/* Upload Section */}
        <div className="bg-cyan-200 border-4 border-black p-8 shadow-[6px_6px_0px_0px_#000000] mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Upload className="w-8 h-8 text-black" />
            <h2 className="text-2xl font-black text-black tracking-wide">UPLOAD CSV FILE</h2>
          </div>

          {/* File Drop Zone */}
          <div className="bg-white border-4 border-dashed border-black p-12 text-center shadow-[4px_4px_0px_0px_#000000] mb-6">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <div className="space-y-4">
              <Label htmlFor="csv-upload" className="cursor-pointer block">
                <span className="text-2xl font-black text-black hover:text-gray-700 transition-colors">
                  📁 DROP YOUR CSV FILE HERE OR CLICK TO BROWSE
                </span>
              </Label>
              <Input id="csv-upload" type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
              <div className="bg-gray-100 border-2 border-black p-4 inline-block">
                <p className="text-lg font-bold text-black">📋 SUPPORTED FORMAT: CSV WITH PRODUCT DATA COLUMNS</p>
              </div>
            </div>
          </div>

          {/* Uploaded File Display */}
          {uploadedFile && (
            <div className="bg-green-200 border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000000]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-green-700" />
                  <div>
                    <p className="text-xl font-black text-black">{uploadedFile.name}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className="bg-black text-white font-bold border-2 border-black">
                        📊 {(uploadedFile.size / 1024).toFixed(1)} KB
                      </Badge>
                      <Badge className="bg-blue-500 text-white font-bold border-2 border-black">📄 CSV FILE</Badge>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleCSVProcess}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-white font-black text-xl py-4 px-8 border-4 border-black shadow-[6px_6px_0px_0px_#000000] hover:shadow-[8px_8px_0px_0px_#000000] transition-all transform hover:-translate-x-1 hover:-translate-y-1 tracking-wider disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6 mr-2" />
                      PROCESS CSV
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-200 border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000000] mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-700" />
              <div>
                <h3 className="text-xl font-black text-red-800 mb-2">❌ ERROR OCCURRED</h3>
                <p className="text-lg font-bold text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Display */}
        {success && (
          <div className="bg-green-200 border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000000] mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-700" />
              <div>
                <h3 className="text-xl font-black text-green-800 mb-2">✅ SUCCESS!</h3>
                <p className="text-lg font-bold text-green-700">
                  Your CSV file has been processed and downloaded successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Instructions Section */}
        <div className="bg-purple-200 border-4 border-black p-8 shadow-[6px_6px_0px_0px_#000000]">
          <h3 className="text-2xl font-black text-black mb-6 tracking-wide">📋 HOW IT WORKS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border-3 border-black p-6 shadow-[3px_3px_0px_0px_#000000]">
              <div className="text-3xl font-black text-purple-600 mb-3">1️⃣</div>
              <h4 className="text-lg font-black text-black mb-2">UPLOAD CSV</h4>
              <p className="text-sm font-bold text-gray-700">
                Upload your CSV file containing product data with all required columns
              </p>
            </div>

            <div className="bg-white border-3 border-black p-6 shadow-[3px_3px_0px_0px_#000000]">
              <div className="text-3xl font-black text-purple-600 mb-3">2️⃣</div>
              <h4 className="text-lg font-black text-black mb-2">PROCESS DATA</h4>
              <p className="text-sm font-bold text-gray-700">
                Our AI analyzes each product and generates predictions for all items
              </p>
            </div>

            <div className="bg-white border-3 border-black p-6 shadow-[3px_3px_0px_0px_#000000]">
              <div className="text-3xl font-black text-purple-600 mb-3">3️⃣</div>
              <h4 className="text-lg font-black text-black mb-2">DOWNLOAD RESULTS</h4>
              <p className="text-sm font-bold text-gray-700">
                Get your processed CSV with predictions, risk scores, and recommendations
              </p>
            </div>
          </div>
        </div>

        {/* CSV Format Guide */}
        <div className="bg-orange-200 border-4 border-black p-8 shadow-[6px_6px_0px_0px_#000000] mt-8">
          <h3 className="text-2xl font-black text-black mb-6 tracking-wide">📊 CSV FORMAT REQUIREMENTS</h3>
          <div className="bg-white border-3 border-black p-6 shadow-[3px_3px_0px_0px_#000000]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-black text-black mb-3">REQUIRED COLUMNS:</h4>
                <ul className="space-y-2 text-sm font-bold text-gray-700">
                  <li>• SKU (Product identifier)</li>
                  <li>• Category (Product category)</li>
                  <li>• Days_to_Expiry</li>
                  <li>• Forecasted_Demand</li>
                  <li>• Historical_Sell_Through</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-black text-black mb-3">OPTIONAL COLUMNS:</h4>
                <ul className="space-y-2 text-sm font-bold text-gray-700">
                  <li>• Average_Turnover_Time</li>
                  <li>• Overstock_Risk</li>
                  <li>• Spoilage_Risk_Score</li>
                  <li>• Sustainability metrics</li>
                  <li>• Environmental scores</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
