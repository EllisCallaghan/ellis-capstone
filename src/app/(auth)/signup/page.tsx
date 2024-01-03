import {getPageSession} from '@/auth/lucia'
import {redirect} from 'next/navigation'
import SignupForm from '@/components/SignupForm'

const Page = async () => {
  const session = await getPageSession()
  if (session) redirect('/')
  return (
    <main className="w-full max-w-md mx-auto p-6">
      <SignupForm />
    </main>
  )
}

export default Page
