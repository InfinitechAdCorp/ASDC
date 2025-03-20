"use client"

import type React from "react"
import { useRef } from "react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { Download } from "lucide-react"
import { Button } from "@heroui/button"

interface Certificate {
  id: number
  name: string
  user_id: number
  certificateNumber: string
  date_issued: string
  expiryDate: string | null
  level: "beginner" | "intermediate" | "advanced"
  type: string
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const ScubaDiverCertificate: React.FC<{ certificate: Certificate }> = ({ certificate }) => {
  const certificateRef = useRef<HTMLDivElement>(null)

  const first_name = localStorage.getItem("first_name") || "John"
  const last_name = localStorage.getItem("last_name") || "Doe"

  const generatePDF = async () => {
    const offscreenContainer = document.createElement("div")

    // Set up for landscape orientation
    offscreenContainer.style.position = "absolute"
    offscreenContainer.style.top = "-9999px"
    offscreenContainer.style.left = "-9999px"
    offscreenContainer.style.width = "297mm" // A4 width in landscape
    offscreenContainer.style.height = "210mm" // A4 height in landscape
    offscreenContainer.style.padding = "0"
    offscreenContainer.style.backgroundColor = "#fff"

    document.body.appendChild(offscreenContainer)

    // Certificate HTML with improved design and logos
    offscreenContainer.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: space-between; border: 8px solid #0066cc; background: linear-gradient(135deg, #ffffff 0%, #e6f7ff 100%); font-family: 'Arial', sans-serif; position: relative; overflow: hidden;">
        <!-- Background wave pattern -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.05; z-index: 0;">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="wave" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 25 0, 50 50 T 100 50" stroke="#0066cc" fill="none" strokeWidth="2"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#wave)" />
          </svg>
        </div>
        
        <!-- Header with logos -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; z-index: 1;">
          <div style="text-align: left;">
            <img src="https://wq8gj23taekk62rr.public.blob.vercel-storage.com/asdc_logo_crop_no_text-removebg-preview-aO0w9LhqJ1WfU4AbHK3ZuZwTEXGenu.png" alt="ASDC Logo" style="height: 80px; width: auto;" />
          </div>
          <div style="text-align: right;">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Logo_of_PADI.svg/800px-Logo_of_PADI.svg.png" alt="PADI Logo" style="height: 80px; width: auto;" />
          </div>
        </div>
        
        <!-- Certificate content -->
        <div style="text-align: center; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; z-index: 1; padding: 0 40px;">
          <h1 style="font-size: 42px; font-weight: bold; margin-bottom: 10px; color: #0066cc; text-transform: uppercase; letter-spacing: 2px;">Certificate of Achievement</h1>
          <h2 style="font-size: 32px; margin-bottom: 20px; color: #333;">${certificate.type} Certification</h2>
          
          <p style="font-size: 24px; margin-bottom: 10px; color: #555;">This is to certify that</p>
          <p style="font-size: 36px; font-weight: bold; margin-bottom: 10px; color: #0066cc; text-transform: uppercase;">${first_name} ${last_name}</p>
          <p style="font-size: 24px; margin-bottom: 10px; color: #555;">has successfully completed the requirements for</p>
          <p style="font-size: 32px; font-weight: bold; margin-bottom: 20px; color: #0066cc;">${certificate.type}</p>
          
          <div style="display: flex; justify-content: center; gap: 40px; margin-top: 20px;">
            <div style="text-align: center;">
              <p style="font-size: 18px; color: #555;">Certification Date</p>
              <p style="font-size: 20px; font-weight: bold; color: #333;">${formatDate(certificate.date_issued)}</p>
            </div>
            <div style="text-align: center;">
              <p style="font-size: 18px; color: #555;">Certification Number</p>
              <p style="font-size: 20px; font-weight: bold; color: #333;">${certificate.certificateNumber || certificate.id}</p>
            </div>
          </div>
        </div>
        
        <!-- Footer with signatures -->
        <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 20px 40px; z-index: 1;">
          <div style="text-align: center;">
            <img src="https://placeholder.com/150x60?text=Signature" alt="Signature" style="height: 60px; width: auto; margin-bottom: 5px;" />
            <div style="width: 200px; height: 1px; background-color: #0066cc; margin: 0 auto;"></div>
            <p style="font-size: 18px; font-weight: bold; margin-top: 5px; color: #333;">Instructor Signature</p>
          </div>
        
          <div style="text-align: center;">
            <img src="https://placeholder.com/150x60?text=Signature" alt="Signature" style="height: 60px; width: auto; margin-bottom: 5px;" />
            <div style="width: 200px; height: 1px; background-color: #0066cc; margin: 0 auto;"></div>
            <p style="font-size: 18px; font-weight: bold; margin-top: 5px; color: #333;">Director Signature</p>
          </div>
        </div>
      </div>
    `

    const canvas = await html2canvas(offscreenContainer, {
      scale: 2,
      x: 0,
      y: 0,
      width: offscreenContainer.offsetWidth,
      height: offscreenContainer.offsetHeight,
      useCORS: true,
      allowTaint: true,
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    })

    pdf.addImage(imgData, "PNG", 0, 0, 297, 210)
    pdf.save(`ASDC-${certificate.type}_certificate.pdf`)

    document.body.removeChild(offscreenContainer)
  }

  return (
    <Button
      size="sm"
      color="primary"
      onClick={generatePDF}
      startContent={<Download size={16} />}
    >
      Download Certificate (PDF)
    </Button>
  )
}

export default ScubaDiverCertificate