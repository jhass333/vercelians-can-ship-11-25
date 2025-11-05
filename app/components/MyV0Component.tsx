"use client"

import { useState } from "react"
import { CheckCircle2, Plus, Trash2, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Walk {
  id: string
  time: string
  duration: string
  location: string
  completed: boolean
}

export default function DogWalkScheduler() {
  const [walks, setWalks] = useState<Walk[]>([
    {
      id: "1",
      time: "08:00 AM",
      duration: "30 mins",
      location: "Park",
      completed: false,
    },
    {
      id: "2",
      time: "12:30 PM",
      duration: "20 mins",
      location: "Neighborhood",
      completed: false,
    },
    {
      id: "3",
      time: "05:00 PM",
      duration: "45 mins",
      location: "Trail",
      completed: false,
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    time: "",
    duration: "",
    location: "",
  })

  const toggleWalkComplete = (id: string) => {
    setWalks(walks.map((walk) => (walk.id === id ? { ...walk, completed: !walk.completed } : walk)))
  }

  const deleteWalk = (id: string) => {
    setWalks(walks.filter((walk) => walk.id !== id))
  }

  const addWalk = () => {
    if (formData.time && formData.duration && formData.location) {
      const newWalk: Walk = {
        id: Date.now().toString(),
        time: formData.time,
        duration: formData.duration,
        location: formData.location,
        completed: false,
      }
      setWalks([...walks, newWalk])
      setFormData({ time: "", duration: "", location: "" })
      setShowForm(false)
    }
  }

  const completedCount = walks.filter((w) => w.completed).length

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🐕 Dog Walk Schedule</h1>
          <p className="text-gray-600 text-lg">Keep track of your furry friend's daily walks</p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-lg shadow-sm border border-yellow-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Walks Completed Today</p>
              <p className="text-3xl font-bold text-yellow-600">
                {completedCount} / {walks.length}
              </p>
            </div>
            <div className="text-5xl">🎾</div>
          </div>
        </div>

        {/* Walks List */}
        <div className="space-y-3 mb-6">
          {walks.map((walk) => (
            <div
              key={walk.id}
              className={`bg-white rounded-lg shadow-sm border-2 transition-all p-4 flex items-center gap-4 ${
                walk.completed ? "border-green-300 bg-green-50" : "border-yellow-200 hover:border-yellow-300"
              }`}
            >
              <button onClick={() => toggleWalkComplete(walk.id)} className="flex-shrink-0">
                <CheckCircle2
                  className={`w-6 h-6 transition-colors ${
                    walk.completed ? "text-green-500 fill-green-500" : "text-gray-300 hover:text-yellow-400"
                  }`}
                />
              </button>

              <div className="flex-1">
                <p
                  className={`font-semibold text-lg ${walk.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
                >
                  {walk.time}
                </p>
                <div className="flex gap-4 mt-1 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {walk.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {walk.location}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteWalk(walk.id)}
                className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Walk Form */}
        {showForm ? (
          <div className="bg-white rounded-lg shadow-sm border-2 border-yellow-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Add New Walk</h3>
            <div className="space-y-4">
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                placeholder="Time"
              />
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                placeholder="Duration (e.g., 30 mins)"
              />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                placeholder="Location"
              />
              <div className="flex gap-2 pt-2">
                <Button onClick={addWalk} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
                  Save Walk
                </Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowForm(true)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 text-lg gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Walk
          </Button>
        )}
      </div>
    </main>
  )
}
