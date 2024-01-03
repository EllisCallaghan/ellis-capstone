'use client'

import React from 'react'
import {Button, Text} from '@radix-ui/themes'
import {LogOut} from 'lucide-react'
import {logoutAction} from '@/app/actions/login'
import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast'

type Props = {
  name: string
}

export default function NavBar({name}: Props) {
  async function onSubmit() {
    const statusCode: Number = await logoutAction()
    if (statusCode === 401) {
      toast.error('Unauthorized')
    }
  }

  return (
    <div className="container px-4 mx-auto py-2">
      <div className="flex flex-wrap items-center mb-3">
        <div>
          <Text>Welcome, {name} </Text>
        </div>
        <div className="ml-auto flex items-center py-2 px-3">
          <Button onClick={onSubmit} variant="solid">
            <LogOut size={16} /> Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}
