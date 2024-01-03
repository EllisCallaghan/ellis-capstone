import {getPageSession} from '@/auth/lucia'
import {redirect} from 'next/navigation'

const Page = async () => {
  const session = await getPageSession()
  if (!session) {
    return redirect('/login')
  } else {
    return redirect('/projects')
  }
}

export default Page
