
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
      src={user.image || "https://cdn.discordapp.com/embed/avatars/0.png"}
      alt={user.name || "User"}
      className={`rounded-full ${className}`}
    />

  )
}