export default function UserCard({ user }) {
  // I make a small card so the data looks nice.
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>

      <p className="mt-2 text-sm text-gray-700">
        {/* I show the email field. */}
        <span className="font-medium">Email:</span> {user.email}
      </p>

      <p className="mt-1 text-sm text-gray-700">
        {/* I show the company name field. */}
        <span className="font-medium">Company:</span> {user.company?.name}
      </p>
    </div>
  )
}

