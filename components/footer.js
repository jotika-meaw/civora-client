import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-[#172554] text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold text-white">CIVORA</p>
          <p className="mt-1 text-[11px] tracking-[0.2em] text-slate-400">COMMUNITY • PEOPLE • ACTION</p>
          <p className="mt-4 text-sm text-slate-300">
            Turn local care into collective action. Discover events, organize initiatives, create impact.
          </p>
        </div>
        <div>
          <p className="font-display font-semibold text-white">Explore</p>
          <div className="mt-3 space-y-2 text-sm">
            <Link href="/" className="block hover:text-white">Home</Link>
            <Link href="/events" className="block hover:text-white">Upcoming Events</Link>
            <Link href="/create-event" className="block hover:text-white">Organize an Event</Link>
          </div>
        </div>
        <div>
          <p className="font-display font-semibold text-white">Account</p>
          <div className="mt-3 space-y-2 text-sm">
            <Link href="/login" className="block hover:text-white">Login</Link>
            <Link href="/register" className="block hover:text-white">Register</Link>
            <Link href="/profile" className="block hover:text-white">Profile</Link>
          </div>
        </div>
        <div>
          <p className="font-display font-semibold text-white">Impact</p>
          <div className="mt-3 space-y-2 text-sm">
            <Link href="/manage-events" className="block hover:text-white">Manage Events</Link>
            <Link href="/joined-events" className="block hover:text-white">Joined Events</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        © CIVORA • Built for community impact
      </div>
    </footer>
  );
}
