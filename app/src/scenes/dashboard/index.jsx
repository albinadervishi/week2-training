import React from "react"
import { Link } from "react-router-dom"
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai"
import useStore from "@/services/store"

export default function Dashboard() {
  const { user } = useStore()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Week 2: Shipping Quality Code</h1>
          <p className="text-sm text-gray-600 mt-1">Learn how to collaborate effectively and ship small, focused PRs in a team environment</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-medium">
            ✅ Week 1 Complete
          </div>
        </div>
      </div>

      {/* Week 2: Collaboration & Tickets */}
      <div className="max-w-5xl">
        <div className="space-y-6">
          {/* MONDAY: Kickoff */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🚀</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900">MONDAY: Kickoff with your manager</h2>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded font-medium">9am-1pm</span>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2 text-sm">Collaboration Patterns</h4>
                    <ul className="text-xs text-purple-800 space-y-1">
                      <li>• How to read tickets</li>
                      <li>• How to ask good questions</li>
                      <li>• Code review feedback</li>
                      <li>• When to ask vs research</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2 text-sm">Coding Mindset</h4>
                    <ul className="text-xs text-purple-800 space-y-1">
                      <li>• Ship small, ship often</li>
                      <li>• Self-review before submitting</li>
                      <li>• Test edge cases first</li>
                      <li>• Clarity over cleverness</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2 text-sm">Priorities</h4>
                    <ul className="text-xs text-purple-800 space-y-1">
                      <li>• Urgent vs Important</li>
                      <li>• Unblock others first</li>
                      <li>• Communicate delays early</li>
                      <li>• Realistic estimates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DAILY WORKFLOW */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">📅</span>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">TUE-FRI: Daily Workflow</h2>
                <p className="text-sm text-gray-600">Practice shipping quality code with real tickets</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="font-mono text-blue-600 font-bold">9:00am</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Standup</div>
                  <div className="text-gray-600 text-xs mt-1">Yesterday, Today, Blockers - be clear and concise</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="font-mono text-green-600 font-bold">9:15am-4pm</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Work on Tickets (3-4/day)</div>
                  <div className="text-gray-600 text-xs mt-1 space-y-1">
                    <div>• Start with 1-2 quick bugs (warm up)</div>
                    <div>• Each ticket = one focused PR (30min-1.5hrs)</div>
                    <div>• Ask questions after 30min if stuck</div>
                    <div>• Self-review + test before submitting</div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="font-mono text-purple-600 font-bold">Throughout</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Submit PRs as you go</div>
                  <div className="text-gray-600 text-xs mt-1">Don't wait til end of day! Submit each ticket when done. Small PRs = fast reviews.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="font-mono text-orange-600 font-bold">4:30pm</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">Trainer Review</div>
                  <div className="text-gray-600 text-xs mt-1">Receive feedback, extract 1 improvement for next PR</div>
                </div>
              </div>
            </div>
          </div>

          {/* AVAILABLE TICKETS */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">🎫</span>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Available Tickets (Goal: 12-15 this week)</h2>
                <p className="text-sm text-gray-600">Each ticket = 30min-1.5hrs. Ship 3-4 tickets/day. One PR per ticket.</p>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="px-2 py-1 bg-red-50 text-red-700 rounded">🐛 Bug = Something is broken, fix it</span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">✨ Feature = Build something new</span>
                  <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded">🔧 Refactor = Improve existing code</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* BUG FIXES (30min-1hr each) */}
              <div>
                <h4 className="text-sm font-semibold text-red-700 mb-2">🐛 Bugs to Fix</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  <TicketCard number="201" type="bug" title="Event creation crashes with empty venue" duration="30min" complexity="Easy" />
                  <TicketCard number="202" type="bug" title="Past events show in public search" duration="45min" complexity="Easy" />
                  <TicketCard number="203" type="bug" title="Can delete other user's events (security!)" duration="1hr" complexity="Medium" />
                  <TicketCard number="204" type="bug" title="Search filters don't reset properly" duration="30min" complexity="Easy" />
                  <TicketCard number="205" type="bug" title="Event edit page shows wrong organizer" duration="45min" complexity="Easy" />
                  <TicketCard number="206" type="bug" title="Pagination breaks on last page" duration="1hr" complexity="Medium" />
                  <TicketCard number="207" type="bug" title="Email validation accepts invalid formats" duration="30min" complexity="Easy" />
                  <TicketCard number="208" type="bug" title="Console errors on event detail page" duration="45min" complexity="Easy" />
                </div>
              </div>

              {/* FEATURES (45min-1.5hrs each) */}
              <div>
                <h4 className="text-sm font-semibold text-blue-700 mb-2">✨ Features to Build</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  <TicketCard number="209" type="feature" title="Add event capacity badge (sold out/spots left)" duration="45min" complexity="Easy" />
                  <TicketCard number="210" type="feature" title="Add 'Copy event' functionality" duration="1hr" complexity="Medium" />
                  <TicketCard number="211" type="feature" title="Add event category filter chips" duration="1hr" complexity="Medium" />
                  <TicketCard number="212" type="feature" title="Show upcoming events count on dashboard" duration="45min" complexity="Easy" />
                  <TicketCard number="213" type="feature" title="Add event status badges (draft/published)" duration="45min" complexity="Easy" />
                  <TicketCard number="214" type="feature" title="Add quick actions menu (3-dot menu)" duration="1hr" complexity="Medium" />
                  <TicketCard number="215" type="feature" title="Add event sorting (date/price/capacity)" duration="1.5hrs" complexity="Medium" />
                </div>
              </div>

              {/* REFACTORING (1-1.5hrs each) */}
              <div>
                <h4 className="text-sm font-semibold text-purple-700 mb-2">🔧 Refactoring Tasks</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  <TicketCard number="216" type="refactor" title="Extract event card into reusable component" duration="1hr" complexity="Medium" />
                  <TicketCard number="217" type="refactor" title="Remove duplicate API calls on event page" duration="1hr" complexity="Medium" />
                  <TicketCard number="218" type="refactor" title="Cleanup console.logs and commented code" duration="45min" complexity="Easy" />
                  <TicketCard number="219" type="refactor" title="Add loading states to all buttons" duration="1hr" complexity="Easy" />
                  <TicketCard number="220" type="refactor" title="Improve error messages (be specific!)" duration="1hr" complexity="Medium" />
                </div>
              </div>

              {/* EDGE CASES (30min-1hr each) */}
              <div>
                <h4 className="text-sm font-semibold text-orange-700 mb-2">⚠️ Edge Cases to Handle</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  <TicketCard number="221" type="bug" title="Handle events with 0 capacity" duration="30min" complexity="Easy" />
                  <TicketCard number="222" type="bug" title="Handle timezone display issues" duration="1hr" complexity="Medium" />
                  <TicketCard number="223" type="bug" title="Handle empty search results gracefully" duration="30min" complexity="Easy" />
                  <TicketCard number="224" type="bug" title="Handle event title > 100 characters" duration="45min" complexity="Easy" />
                </div>
              </div>

              {/* COMMUNICATION TESTS (require asking questions!) */}
              <div>
                <h4 className="text-sm font-semibold text-pink-700 mb-2">💬 Communication Tests (ASK BEFORE CODING!)</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  <TicketCard number="225" type="feature" title="Add event image upload" duration="???" complexity="???" />
                  <TicketCard number="226" type="feature" title="Add event sharing feature" duration="???" complexity="???" />
                  <TicketCard number="227" type="feature" title="Export attendee list" duration="???" complexity="???" />
                  <TicketCard number="228" type="feature" title="Add event reminders" duration="???" complexity="???" />
                  <TicketCard number="229" type="bug" title="Search performance is slow" duration="???" complexity="???" />
                  <TicketCard number="230" type="feature" title="Make registration deadline configurable" duration="???" complexity="???" />
                </div>
                <div className="mt-2 p-3 bg-pink-50 border border-pink-200 rounded text-xs text-pink-800">
                  <p className="font-semibold mb-1">⚠️ These tickets are missing critical details!</p>
                  <p>Ask questions about: scope, behavior, edge cases, format, who/when/where. Don't assume - clarify first.</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
              <p className="font-semibold text-yellow-900 mb-1">💡 Week 2 Strategy:</p>
              <p className="text-yellow-800 text-xs">
                Start each day with 1-2 bugs (quick wins), then tackle features/refactoring. Mix easy + medium tickets. 
                Ask for help after 30min if stuck - don't waste time!
              </p>
            </div>
          </div>

          {/* WEEK 2 GATEKEEPER */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🚪</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Week 2 Gatekeeper: Collaboration & Quality</h3>
                <p className="text-sm text-gray-700 mb-3">
                  To move to Week 3, you must demonstrate:
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-indigo-900 mb-2">Technical</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>12-15 PRs merged (3-4/day)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>Mix: bugs + features + refactoring</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>Code quality consistent</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>All PRs small & focused</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-indigo-900 mb-2">Collaboration</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>PRs are small, focused</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>Good commit messages</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>Self-reviews before submitting</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>Asks when stuck (doesn't waste time)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>Addresses feedback quickly</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">✓</span>
                        <span>Estimates improve over week</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-indigo-200 grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-red-700 mb-1">🚨 RED FLAGS (1-on-1 required):</p>
                    <p className="text-xs text-red-600">No commits 24hrs+, stuck 3+ days, missing standups, can't explain code</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-700 mb-1">💡 FAST-TRACK:</p>
                    <p className="text-xs text-green-600">Finishes early, insightful questions, proactive, applies feedback immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TicketCard({ number, type, title, duration, complexity }) {
  const typeConfig = {
    bug: { icon: "🐛", color: "border-red-200 bg-red-50 hover:border-red-300" },
    feature: { icon: "✨", color: "border-blue-200 bg-blue-50 hover:border-blue-300" },
    refactor: { icon: "🔧", color: "border-purple-200 bg-purple-50 hover:border-purple-300" }
  }

  const complexityColors = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700"
  }

  const config = typeConfig[type] || typeConfig.feature

  return (
    <div className={`p-3 border-2 rounded-lg transition-colors ${config.color}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-sm">{config.icon}</span>
          <span className="font-mono text-xs font-bold text-gray-700">#{number}</span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded font-medium ${complexityColors[complexity]}`}>
          {complexity}
        </span>
      </div>
      <div className="text-sm font-medium text-gray-900 mb-1">{title}</div>
      <div className="text-xs text-gray-500">⏱️ {duration}</div>
    </div>
  )
}
