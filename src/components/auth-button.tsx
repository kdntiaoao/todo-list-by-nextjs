'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { useUser } from '@/hooks/use-user'
import { signOut } from '@/lib/auth'

export const AuthButton = () => {
  const pathname = usePathname()
  const [user] = useUser()

  const handleClickSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      alert('サインアウトに失敗しました')
    }
  }

  // 認証情報の取得中は、ローディングスケルトンを表示する
  if (user.loading) {
    return <Skeleton className="h-10 w-20" />
  }

  // ログインしていない場合は、ログインボタンを表示する
  if (!user.data) {
    return (
      <div className="flex gap-4">
        {pathname !== '/signin' && (
          <Button asChild variant="outline">
            <Link href="/signin">Sign In</Link>
          </Button>
        )}
        {pathname !== '/signup' && (
          <Button asChild variant="outline">
            <Link href="/signup">Sign Up</Link>
          </Button>
        )}
      </div>
    )
  }

  return (
    <Button type="button" variant="outline" onClick={handleClickSignOut}>
      Sign Out
    </Button>
  )
}
