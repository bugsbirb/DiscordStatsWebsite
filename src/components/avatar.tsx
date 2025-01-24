
interface UserAvatarProps {
  user: {
    image?: string | null
    name?: string | null
  }
  className?: string
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  return (
    <img
      src={user.image || "/assets/placeholder.jpg"}
      alt={user.name || "User"}
      className={`rounded-full ${className}`}
    />

  )
}