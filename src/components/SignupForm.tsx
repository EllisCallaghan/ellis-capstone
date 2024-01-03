'use client'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {Card, Heading, TextFieldInput, Button, Text, Link} from '@radix-ui/themes'
import {LoginSchema} from '@/app/zodSchema/schemas'
import {redirectHome} from '@/app/actions/login'
import toast from 'react-hot-toast'
import * as z from 'zod'
import {signupAction} from '@/app/actions/signup'

type FormData = z.infer<typeof LoginSchema>

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(LoginSchema),
  })

  async function onSubmit(data: FormData) {
    const statusCode: Number = await signupAction(data)

    if (statusCode === 400) {
      toast.error('Username already exists')
      return
    } else if (statusCode === 500) {
      toast.error('An unknown error occurred')
      return
    }
    await redirectHome()
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading size="4" className="pb-4 pl-1">
          Sign Up
        </Heading>
        <TextFieldInput
          {...register('username', {required: true})}
          name="username"
          id="username"
          size="3"
          mb="3"
          placeholder="Enter Username"
          autoComplete="off"
        />
        {errors?.username && <p className="text-red-400 text-sm pb-2">{errors?.username?.message}</p>}
        <TextFieldInput
          {...register('password', {required: true})}
          id="password"
          name="password"
          type="password"
          mb="3"
          size="3"
          placeholder="Password"
          autoComplete="off"
        />
        {errors?.password && <p className="text-red-400 text-sm pb-2">{errors?.password?.message}</p>}
        <Button type="submit" mb="3" size="3" variant="solid">
          Sign Up
        </Button>
      </form>
      <Text>
        Already have an account?
        <span>
          <Link href="/login"> Sign in here</Link>
        </span>
      </Text>
    </Card>
  )
}
