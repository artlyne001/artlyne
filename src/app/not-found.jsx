import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-foreground bg-background">
      <h2 className="text-3xl font-bold">404 - Not Found</h2>
      <p className="text-muted-foreground">Could not find requested resource</p>
      <Link href="/" className="px-4 py-2 bg-brand-primary text-white rounded-xl hover:bg-brand-primary-hover transition-colors">
        Return Home
      </Link>
    </div>
  )
}
