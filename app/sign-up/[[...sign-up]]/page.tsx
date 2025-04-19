import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
  <BackgroundBeamsWithCollision>

  <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <SignUp />
      </section>
  </BackgroundBeamsWithCollision>)
}