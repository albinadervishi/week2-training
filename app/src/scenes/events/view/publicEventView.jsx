import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import api from "@/services/api"
import toast from "react-hot-toast"
import { HiOutlineShare } from "react-icons/hi"
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaLink } from "react-icons/fa"

export default function PublicEventView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showShareMenu, setShowShareMenu] = useState(false)

  useEffect(() => {
    fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    try {
      const { ok, data } = await api.get(`/event/${id}`)
      if (!ok) throw new Error("Failed to fetch event")
      if (data.status !== "published") {
        toast.error("This event is not available")
        navigate("/")
        return
      }
      setEvent(data)
    } catch (error) {
      toast.error("Could not load event")
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  const handleShare = platform => {
    const shareUrl = window.location.href
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

  const formatDate = date => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!event) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>

          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
            >
              <HiOutlineShare className="w-5 h-5" />
              Share
            </button>

            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
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
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {event.image_url && (
          <div className="mb-6">
            <img src={event.image_url} alt={event.title} className="w-full h-64 object-cover rounded-lg shadow-md" />
          </div>
        )}

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500">Description</div>
              <div className="text-sm text-gray-900 mt-1">{event.description || "No description"}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Start Date</div>
                <div className="text-sm text-gray-900 mt-1">{formatDate(event.start_date)}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">End Date</div>
                <div className="text-sm text-gray-900 mt-1">{event.end_date ? formatDate(event.end_date) : "N/A"}</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Location</div>
              <div className="text-sm text-gray-900 mt-1">{[event.venue, event.city, event.country].filter(Boolean).join(", ") || "TBA"}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-500">Capacity</div>
                <div className="text-sm text-gray-900 mt-1">{event.capacity > 0 ? `${event.available_spots} / ${event.capacity} available` : "Unlimited"}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Price</div>
                <div className="text-sm text-gray-900 mt-1">{event.price > 0 ? `${event.price} ${event.currency}` : "Free"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Organizer</h2>
          <div className="space-y-2">
            <div>
              <div className="text-sm font-medium text-gray-500">Name</div>
              <div className="text-sm text-gray-900 mt-1">{event.organizer_name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">Email</div>
              <div className="text-sm text-gray-900 mt-1">{event.organizer_email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
