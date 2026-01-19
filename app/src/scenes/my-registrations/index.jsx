import React from "react"
import { HiLockClosed } from "react-icons/hi"

export default function MyRegistrations() {
  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <HiLockClosed className="w-10 h-10 text-gray-400" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Week 2+ Feature</h1>

          <div className="text-left bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-3">📚 Why is this locked?</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>Week 1 Focus:</strong> Understanding the Event module (CRUD, search patterns, organizer flow)
              </p>
              <p>
                <strong>Week 2+:</strong> You'll build the Attendee/Registration system:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>
                  Study the existing <code className="bg-blue-100 px-1 rounded">Attendee</code> model and controller
                </li>
                <li>Add a "Register" button to event pages</li>
                <li>Build this "My Registrations" view</li>
                <li>Handle capacity checks, ticket generation, and payment flows</li>
              </ul>
            </div>
          </div>

          <div className="text-gray-600">
            <p className="mb-4">
              For now, focus on mastering the <strong>Event module</strong> and understanding how organizers create and manage events.
            </p>
            <p className="text-sm">The registration system will unlock in Week 2, where you'll implement the full attendee experience.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AiOutlineCalendar, AiOutlineEnvironment } from "react-icons/ai"
import { HiOutlineTicket } from "react-icons/hi"
import api from "@/services/api"
import toast from "react-hot-toast"

export default function MyRegistrations() {
  const navigate = useNavigate()
  const [registrations, setRegistrations] = useState([])
  const [events, setEvents] = useState({})
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [cancellingId, setCancellingId] = useState(null)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      setLoading(true)
      const { ok, data, total } = await api.post("/attendee/my-registrations/search", {
        per_page: 100,
        page: 1
      })

      if (!ok) throw new Error("Failed to fetch registrations")

      setRegistrations(data || [])
      setTotal(total || 0)
    } catch (error) {
      toast.error("Could not load your registrations")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (registrationId, eventId) => {
    if (!confirm("Are you sure you want to cancel this registration?")) {
      return
    }

    try {
      setCancellingId(registrationId)
      const { ok, code } = await api.delete(`/attendee/${registrationId}`)

      if (!ok) {
        if (code === "NOT_FOUND") {
          toast.error("This registration no longer exists")
        } else if (code === "FORBIDDEN") {
          toast.error("You don't have permission to cancel this registration")
        } else {
          toast.error("Failed to cancel registration. Please try again.")
        }
        return
      }

      toast.success("Registration cancelled successfully")
      fetchRegistrations()
    } catch (error) {
      toast.error("Failed to cancel registration. Please check your connection and try again.")
    } finally {
      setCancellingId(null)
    }
  }

  const formatDate = date => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getStatusBadge = status => {
    const statusStyles = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-gray-100 text-gray-800",
      checked_in: "bg-blue-100 text-blue-800"
    }

    return <span className={`px-2 py-1 text-xs font-semibold rounded capitalize ${statusStyles[status] || statusStyles.confirmed}`}>{status}</span>
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

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Registrations</h1>
        <p className="text-gray-600">{total > 0 ? `You have ${total} registration${total !== 1 ? "s" : ""}` : "You don't have any registrations yet"}</p>
      </div>

      {registrations.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
            <HiOutlineTicket className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No registrations yet</h3>
          <p className="text-gray-600 mb-6">Start exploring events and register to see them here.</p>
          <Link to="/" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Discover Events
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {registrations.map(registration => {
            const isCancelled = registration.status === "cancelled"

            return (
              <div key={registration._id} className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 ${isCancelled ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{registration.event_title}</h3>
                      {getStatusBadge(registration.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <AiOutlineCalendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>
                          <strong className="text-gray-700">Event Date:</strong> {formatDate(registration.event_start_date)}
                        </span>
                      </div>

                      {registration.event_city && (
                        <div className="flex items-center">
                          <AiOutlineEnvironment className="w-4 h-4 mr-2 text-gray-400" />
                          <span>
                            <strong className="text-gray-700">Location:</strong> {registration.event_city}
                            {registration.event_country && `, ${registration.event_country}`}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center">
                        <HiOutlineTicket className="w-4 h-4 mr-2 text-gray-400" />
                        <span>
                          <strong className="text-gray-700">Ticket:</strong> {registration.ticket_number}
                        </span>
                      </div>

                      <div>
                        <strong className="text-gray-700">Registered:</strong> {formatDate(registration.created_at)}
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col gap-2">
                    <Link
                      to={`/event/${registration.event_id}`}
                      className="px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                    >
                      View Event
                    </Link>
                    {!isCancelled && (
                      <button
                        onClick={() => handleCancel(registration._id, registration.event_id)}
                        disabled={cancellingId === registration._id}
                        className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {cancellingId === registration._id ? "Cancelling..." : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}