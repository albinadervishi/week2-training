import React, { useEffect, useState } from "react"
import { Routes, Route, useParams, useNavigate } from "react-router-dom"
import api from "@/services/api"
import toast from "react-hot-toast"
import useStore from "@/services/store"
import OverviewTab from "./overview"
import EditTab from "./edit"
import AttendeesTab from "./attendees"
import PaymentsTab from "./payments"
import RawView from "./raw"
import { HiOutlineShare } from "react-icons/hi"
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaLink } from "react-icons/fa"

export default function EventView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useStore()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [showShareMenu, setShowShareMenu] = useState(false)

  useEffect(() => {
    fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    try {
      const { ok, data } = await api.get(`/event/${id}`)
      if (!ok) throw new Error("Failed to fetch event")
      setEvent(data)
    } catch (error) {
      toast.error("Could not load event")
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  const handleShare = platform => {
    const shareUrl = `${window.location.origin}/public/event/${id}`
    const shareText = `Check out this event: ${event.title}`

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      link: shareUrl
    }

    if (platform === "link") {
      navigator.clipboard.writeText(shareUrl).then(() => {
        toast.success("Link copied to clipboard!")
        setShowShareMenu(false)
      })
    } else {
      window.open(shareUrls[platform], "_blank", "width=600,height=400")
      setShowShareMenu(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (!event) return null

  const isOrganizer = user && event.organizer_id === user._id

  const handleTabClick = tab => {
    setActiveTab(tab)
    if (tab === "overview") {
      navigate(`/event/${id}`)
    } else {
      navigate(`/event/${id}/${tab}`)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>

        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
          >
            <HiOutlineShare className="w-5 h-5" />
            Share
          </button>

          {showShareMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                <button onClick={() => handleShare("facebook")} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaFacebook className="w-5 h-5 text-blue-600" />
                  Facebook
                </button>
                <button onClick={() => handleShare("twitter")} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaTwitter className="w-5 h-5 text-blue-400" />
                  Twitter
                </button>
                <button onClick={() => handleShare("linkedin")} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaLinkedin className="w-5 h-5 text-blue-700" />
                  LinkedIn
                </button>
                <button onClick={() => handleShare("whatsapp")} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaWhatsapp className="w-5 h-5 text-green-500" />
                  WhatsApp
                </button>
                <div className="border-t border-gray-200"></div>
                <button onClick={() => handleShare("link")} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaLink className="w-5 h-5 text-gray-500" />
                  Copy Link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-8 pb-3">
          <button
            onClick={() => handleTabClick("overview")}
            className={`px-3 py-2 text-sm font-medium  transition-colors ${activeTab === "overview" ? "bg-blue-100 text-blue-800 rounded" : " text-gray-600 hover:text-gray-900"}`}
          >
            Overview
          </button>
          {isOrganizer && (
            <button
              onClick={() => handleTabClick("edit")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${activeTab === "edit" ? "bg-blue-100 text-blue-800 rounded" : " text-gray-600 hover:text-gray-900"}`}
            >
              Edit
            </button>
          )}
          <button
            onClick={() => handleTabClick("attendees")}
            className={`px-3 py-2 text-sm font-medium transition-colors ${activeTab === "attendees" ? "bg-blue-100 text-blue-800 rounded" : " text-gray-600 hover:text-gray-900"}`}
          >
            Attendees
          </button>
          <button
            onClick={() => handleTabClick("payments")}
            className={`px-3 py-2 text-sm font-medium transition-colors ${activeTab === "payments" ? "bg-blue-100 text-blue-800 rounded" : " text-gray-600 hover:text-gray-900"}`}
          >
            Payments
          </button>
          <button
            onClick={() => handleTabClick("raw")}
            className={`px-3 py-2 text-sm font-medium transition-colors ${activeTab === "raw" ? "bg-blue-100 text-blue-800 rounded" : " text-gray-600 hover:text-gray-900"}`}
          >
            Raw
          </button>
        </div>
      </div>

      {/* Content */}
      <Routes>
        <Route index element={<OverviewTab event={event} />} />
        <Route path="edit" element={<EditTab event={event} fetchEvent={fetchEvent} />} />
        <Route path="attendees" element={<AttendeesTab eventId={id} />} />
        <Route path="payments" element={<PaymentsTab eventId={id} />} />
        <Route path="raw" element={<RawView event={event} />} />
      </Routes>
    </div>
  )
}
