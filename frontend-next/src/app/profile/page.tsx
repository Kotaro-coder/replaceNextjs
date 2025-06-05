'use client'

import Profile from '../../components/Profile'
import { PrivateRoute } from '../../AuthRoute'

export default function SignInPage() {
  return <PrivateRoute><Profile /></PrivateRoute>
}