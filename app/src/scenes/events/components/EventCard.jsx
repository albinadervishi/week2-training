import { Link } from "react-router-dom"
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineUser } from "react-icons/ai"
import { useState, useEffect } from "react"
import api from "@/services/api"
import toast from "react-hot-toast"
import useStore from "@/services/store"

export default function EventCard({ event }) {
  const { user } = useStore()
  const [isRegistered, setIsRegistered] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [checkingRegistration, setCheckingRegistration] = useState(false)

  const isOrganizer = user && event.organizer_id === user._id
  const isEventPublished = event.status === "published"
  const isEventInFuture = new Date(event.start_date) > new Date()
  const canRegister = user && !isOrganizer && isEventPublished && isEventInFuture
  const showRegisterButton = canRegister && (event.capacity === 0 || event.available_spots > 0)

  // Check registration status when component mounts (only if user exists and can register)
  useEffect(() => {
    if (canRegister) {
      checkRegistrationStatus()
    }
  }, [event._id, user?._id])

  const checkRegistrationStatus = async () => {
    if (!user) return

    try {
      setCheckingRegistration(true)
      const { ok, data } = await api.post("/attendee/my-registrations/search", {
        per_page: 100,
        page: 1
      })

      if (ok && data) {
        const registered = data.some(reg => reg.event_id === event._id && reg.status !== "cancelled")
        setIsRegistered(registered)
      }
    } catch (error) {
      setIsRegistered(false)
    } finally {
      setCheckingRegistration(false)
    }
  }

  const handleRegister = async e => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.error("Please sign in to register for events")
      return
    }

    try {
      setRegistering(true)
      const { ok, data, code } = await api.post("/attendee/register", {
        event_id: event._id
      })

      if (!ok) {
        if (code === "ALREADY_REGISTERED") {
          toast.error("You are already registered for this event")
          setIsRegistered(true)
        } else if (code === "EVENT_FULL") {
          toast.error("This event is full")
        } else if (code === "EVENT_NOT_AVAILABLE") {
          toast.error("This event is not available for registration")
        } else if (code === "REGISTRATION_CLOSED") {
          toast.error("Registration deadline has passed")
        } else {
          toast.error("Failed to register. Please try again.")
        }
        return
      }

      toast.success("Successfully registered! 🎉")
      setIsRegistered(true)
    } catch (error) {
      if (error.code === "ALREADY_REGISTERED") {
        toast.error("You are already registered for this event")
        setIsRegistered(true)
      } else {
        toast.error("Failed to register. Please check your connection and try again.")
      }
    } finally {
      setRegistering(false)
    }
  }

  const formatDate = date => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  const formatTime = date => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <Link to={`/event/${event._id}`} className="block">
        {event.image_url && <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded">{event.category}</span>
            {event.price > 0 ? (
              <span className="text-sm font-bold text-gray-900">
                {event.price} {event.currency}
              </span>
            ) : (
              <span className="text-sm font-bold text-green-600">FREE</span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <AiOutlineCalendar className="w-4 h-4 mr-2" />
              <span>
                {formatDate(event.start_date)} at {formatTime(event.start_date)}
              </span>
            </div>

            {event.venue || event.city ? (
              <div className="flex items-center">
                <AiOutlineEnvironment className="w-4 h-4 mr-2" />
                <span className="line-clamp-1">{[event.venue, event.city].filter(Boolean).join(", ")}</span>
              </div>
            ) : null}

            {event.organizer_name && (
              <div className="flex items-center">
                <AiOutlineUser className="w-4 h-4 mr-2" />
                <span className="line-clamp-1">By {event.organizer_name}</span>
              </div>
            )}

            <div className="mt-2 pt-2 border-t border-gray-200">
              {event.capacity > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Available spots</span>
                    <span className="text-xs font-semibold text-gray-900">
                      {event.capacity - event.available_spots} / {event.capacity}
                    </span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${((event.capacity - event.available_spots) / event.capacity) * 100}%` }}></div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Available spots</span>
                  <span className="text-xs font-semibold text-gray-900">Unlimited</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
      {showRegisterButton && (
        <div className="px-4 pb-4">
          <button
            onClick={handleRegister}
            disabled={registering || isRegistered || (event.capacity > 0 && event.available_spots <= 0) || checkingRegistration}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {checkingRegistration
              ? "Checking..."
              : registering
              ? "Registering..."
              : isRegistered
              ? "Registered ✓"
              : event.capacity > 0 && event.available_spots <= 0
              ? "Event Full"
              : "Register"}
          </button>
        </div>
      )}
    </div>
  )
}
import { Link } from "react-router-dom"
import { AiOutlineCalendar, AiOutlineEnvironment, AiOutlineUser } from "react-icons/ai"
import { useState, useEffect } from "react"
import api from "@/services/api"
import toast from "react-hot-toast"
import useStore from "@/services/store"

export default function EventCard({ event }) {
  const { user } = useStore()
  const [isRegistered, setIsRegistered] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [checkingRegistration, setCheckingRegistration] = useState(false)

  const isOrganizer = user && event.organizer_id === user._id
  const isEventPublished = event.status === "published"
  const isEventInFuture = new Date(event.start_date) > new Date()
  const canRegister = user && !isOrganizer && isEventPublished && isEventInFuture
  const showRegisterButton = canRegister && (event.capacity === 0 || event.available_spots > 0)

  // Check registration status when component mounts (only if user exists and can register)
  useEffect(() => {
    if (canRegister) {
      checkRegistrationStatus()
    }
  }, [event._id, user?._id])

  const checkRegistrationStatus = async () => {
    if (!user) return

    try {
      setCheckingRegistration(true)
      const { ok, data } = await api.post("/attendee/my-registrations/search", {
        per_page: 100,
        page: 1
      })

      if (ok && data) {
        const registered = data.some(reg => reg.event_id === event._id && reg.status !== "cancelled")
        setIsRegistered(registered)
      }
    } catch (error) {
      setIsRegistered(false)
    } finally {
      setCheckingRegistration(false)
    }
  }

  const handleRegister = async e => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.error("Please sign in to register for events")
      return
    }

    try {
      setRegistering(true)
      const { ok, data, code } = await api.post("/attendee/register", {
        event_id: event._id
      })

      if (!ok) {
        if (code === "ALREADY_REGISTERED") {
          toast.error("You are already registered for this event")
          setIsRegistered(true)
        } else if (code === "EVENT_FULL") {
          toast.error("This event is full")
        } else if (code === "EVENT_NOT_AVAILABLE") {
          toast.error("This event is not available for registration")
        } else if (code === "REGISTRATION_CLOSED") {
          toast.error("Registration deadline has passed")
        } else {
          toast.error("Failed to register. Please try again.")
        }
        return
      }

      toast.success("Successfully registered! 🎉")
      setIsRegistered(true)
    } catch (error) {
      if (error.code === "ALREADY_REGISTERED") {
        toast.error("You are already registered for this event")
        setIsRegistered(true)
      } else {
        toast.error("Failed to register. Please check your connection and try again.")
      }
    } finally {
      setRegistering(false)
    }
  }

  const formatDate = date => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  const formatTime = date => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <Link to={`/event/${event._id}`} className="block">
        {event.image_url && <img src={event.image_url} alt={event.title} className="w-full h-48 object-cover" />}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded">{event.category}</span>
            {event.price > 0 ? (
              <span className="text-sm font-bold text-gray-900">
                {event.price} {event.currency}
              </span>
            ) : (
              <span className="text-sm font-bold text-green-600">FREE</span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <AiOutlineCalendar className="w-4 h-4 mr-2" />
              <span>
                {formatDate(event.start_date)} at {formatTime(event.start_date)}
              </span>
            </div>

            {event.venue || event.city ? (
              <div className="flex items-center">
                <AiOutlineEnvironment className="w-4 h-4 mr-2" />
                <span className="line-clamp-1">{[event.venue, event.city].filter(Boolean).join(", ")}</span>
              </div>
            ) : null}

            {event.organizer_name && (
              <div className="flex items-center">
                <AiOutlineUser className="w-4 h-4 mr-2" />
                <span className="line-clamp-1">By {event.organizer_name}</span>
              </div>
            )}

            {event.capacity > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Available spots</span>
                  <span className="text-xs font-semibold text-gray-900">
                    {event.capacity - event.available_spots} / {event.capacity}
                  </span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${((event.capacity - event.available_spots) / event.capacity) * 100}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>

      {showRegisterButton && (
        <div className="px-4 pb-4">
          <button
            onClick={handleRegister}
            disabled={registering || isRegistered || (event.capacity > 0 && event.available_spots <= 0) || checkingRegistration}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {checkingRegistration
              ? "Checking..."
              : registering
              ? "Registering..."
              : isRegistered
              ? "Registered ✓"
              : event.capacity > 0 && event.available_spots <= 0
              ? "Event Full"
              : "Register"}
          </button>
        </div>
      )}
    </div>
  )
}