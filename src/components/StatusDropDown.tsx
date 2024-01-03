import {updateStatusAction} from '@/app/actions/updateStatus'
import {SelectContent, SelectGroup, SelectItem, SelectRoot, SelectTrigger} from '@radix-ui/themes'
import React from 'react'
import toast from 'react-hot-toast'

type Props = {
  id: string
  status: string
}

export default function StatusDropDown({id, status}: Props) {
  async function handleChange(value: any) {
    const result = await updateStatusAction(value, Number(id))
    if (result === null) {
      toast.error('Failed to update status')
      return
    }
  }
  return (
    <SelectRoot onValueChange={handleChange} defaultValue={status}>
      <SelectTrigger color="plum" variant="soft" />
      <SelectContent position="popper" color="plum">
        <SelectGroup>
          <SelectItem value="stuck">Stuck</SelectItem>
          <SelectItem value="done">Done</SelectItem>
          <SelectItem value="Working on it">Working on it</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  )
}
