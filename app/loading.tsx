import Image from "next/image"

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex h-screen items-center justify-center">
      <Image src="/logo_a.png" alt="" width={200} height={200} />
    </div>
  )
}
