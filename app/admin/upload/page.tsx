"use client"

import type React from "react"

import { useState } from "react"
import { upload } from "@vercel/blob/client"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/utils/image-urls"

export default function UploadPage() {
  const [uploading, setUploading] = useState(false)
  const [urls, setUrls] = useState<string[]>([])
  const [imageKitUrls, setImageKitUrls] = useState<string[]>([])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    setUploading(true)
    const newUrls = []
    const newImageKitUrls = []

    try {
      for (const file of Array.from(e.target.files)) {
        // Create a path based on the file type
        const pathname = file.name

        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          pathname: pathname,
        })

        newUrls.push(blob.url)

        // Also generate the equivalent ImageKit URL
        newImageKitUrls.push(getImageUrl(pathname))
      }

      setUrls((prev) => [...prev, ...newUrls])
      setImageKitUrls((prev) => [...prev, ...newImageKitUrls])
    } catch (error) {
      console.error("Error uploading files:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-serif text-navy mb-8">Upload Images</h1>

      <div className="mb-8">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => document.getElementById("file-upload")?.click()}
            className="bg-rose-gold hover:bg-rose-gold/90 text-white"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Select Images"}
          </Button>
          <input id="file-upload" type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
        </div>
        <p className="mt-2 text-sm text-navy/70">
          Tip: Name your files according to their purpose (e.g., hero-background.jpg, signature-ring-closeup.jpg)
        </p>
      </div>

      {urls.length > 0 && (
        <div>
          <h2 className="text-xl font-serif text-navy mb-4">Uploaded Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {urls.map((url, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Uploaded image ${i + 1}`}
                  className="w-full aspect-square object-cover"
                />
                <div className="p-3 bg-white">
                  <p className="text-sm text-navy/70 break-all">{url}</p>
                  <p className="text-sm text-green-600 mt-2 break-all">ImageKit URL: {imageKitUrls[i]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
