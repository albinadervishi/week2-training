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

export default function EventView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useStore()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  console.log("activeTab", activeTab)

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

  const isOrganizer = user && event.organizer_id === user.id

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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
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
