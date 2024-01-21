import {
  type User,
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signIn,
} from 'firebase/auth'
import { auth } from './firebase/client'

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<{ user: User; error: null } | { user: null; error: Error }> => {
  try {
    const userCredential = await createUser(auth, email, password)
    const user = userCredential.user
    return { user, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { user: null, error }
    }
    throw error
  }
}

export const signInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<{ user: User; error: null } | { user: null; error: Error }> => {
  try {
    const userCredential = await signIn(auth, email, password)
    const user = userCredential.user
    return { user, error: null }
  } catch (error) {
    if (error instanceof Error) {
      return { user: null, error }
    }
    throw error
  }
}
