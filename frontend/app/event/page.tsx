"use client"

import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { BsGraphUp } from "react-icons/bs"
import { FiInfo } from "react-icons/fi"

const EventsPage = () => {
  const [events, setEvents] = useState<string[]>([])
  const images = [
    "authbridge",
    "BGMI",
    "bitcoin",
    "blrvpun",
    "breakingnew",
    "climate",
    "coma",
    "datamuni",
    "downloadapp",
    "Endquotes",
    "error",
    "esports",
    "indevsnz",
    "patvtam",
  ]

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001"}/orderbook`
        )

        const allEvents = Object.keys(response.data)
        setEvents(allEvents)
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {events.map((event, index) => (
        <Link href={`/event/${encodeURIComponent(event)}`} key={event} passHref> {/* encodeURIComponent helps make the url with spaces to be passed easily */} 
          <div
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition duration-300 bg-white h-60 flex flex-col justify-between"
          >
            {/* Top Section: Traders Count */}
            <div className="flex items-center text-xs text-gray-500 px-4 py-2 border-b border-gray-100">
              <BsGraphUp className="text-red-500 mr-1" />
              <span>34,348 traders</span>
            </div>

            {/* Main Content: Image and Event */}
            <div className="flex items-start space-x-4 p-4 flex-grow">
              <Image
                src={`/${images[index % images.length]}.avif`}
                width={50}
                height={50}
                alt="event logo"
                className="rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 leading-snug">
                  {event.replace(/-/g, " ")}?
                </p>
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                  <FiInfo className="mr-1" />
                  H2H last 5 T20: Chennai 4, Mumbai 1, DRAW 0{" "}
                  <span className="text-blue-500 ml-1 cursor-pointer">Read more</span>
                </p>
              </div>
            </div>

            {/* Yes/No Section */}
            <div className="flex items-center justify-between p-3 bg-gray-50">
              <button
                className="w-1/2 text-center text-blue-600 bg-blue-100 border border-blue-300 rounded-l-lg py-2 font-medium hover:bg-blue-200"
                onClick={(e) => {
                  e.preventDefault()
                  console.log("Yes clicked for:", event)
                }}
              >
                Yes ₹6
              </button>
              <button
                className="w-1/2 text-center text-red-600 bg-red-100 border border-red-300 rounded-r-lg py-2 font-medium hover:bg-red-200"
                onClick={(e) => {
                  e.preventDefault()
                  console.log("No clicked for:", event)
                }}
              >
                No ₹4
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default EventsPage

