'use client'

import { FormEvent, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signInWithEmailAndPassword } from '@/lib/auth'
import Link from 'next/link'

export default function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async () => {
    const { user, error } = await signInWithEmailAndPassword(email, password)
    if (error) {
      alert('サインインに失敗しました')
    } else {
      console.log(`Signed in:`, user)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signIn()
  }

  return (
    <div className="py-4">
      <div className="mx-auto w-[350px]">
        <div className="pb-2">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      // TODO: デバッグ用に type="text" にしている
                      // type="email"
                      autoComplete="email"
                      placeholder="sample@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>Submit</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
        <p>
          <Button asChild size="sm" variant="link">
            <Link href="/signup">新しいアカウントを作成する</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
