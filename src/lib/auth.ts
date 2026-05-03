export const getCurrentUserId = (): string => {
  // TODO: change before production to get the user id from the auth provider
  return process.env.NEXT_PUBLIC_DEV_USER_ID!
}