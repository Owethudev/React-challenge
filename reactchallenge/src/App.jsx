import { useEffect, useMemo, useState } from 'react'
import UserCard from './components/UserCard'

export default function App() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // I use useEffect so I can fetch the users one time.
  useEffect(() => {
    async function loadUsers() {
      try {
        setIsLoading(true)
        setError(null)

        // I fetch the users from this url.
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) {
          throw new Error('Fetch failed')
        }

        const data = await res.json()

        // I store the users in state so the UI updates.
        setUsers(data)
      } catch (err) {
        // I show a simple error.
        setError('Sorry, I could not load users.')
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()
  }, [])

  // I filter the list as the user types.
  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return users

    return users.filter((u) => {
      return String(u.name || '').toLowerCase().includes(q)
    })
  }, [users, search])

  return (
    <div className="min-h-[100svh] bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">User Directory</h1>
        <p className="mb-6 text-gray-600">
          I type in the search box and it filters the names.
        </p>

        <label className="block text-sm font-medium text-gray-800">
          Search by name
          <input
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a name..."
          />
        </label>

        {isLoading && (
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4 text-gray-700">
            I am loading users...
          </div>
        )}

        {error && !isLoading && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <div className="mt-6 space-y-3">
            {filteredUsers.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-4 text-gray-700">
                No users found.
              </div>
            ) : (
              filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

