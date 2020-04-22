export type UserSchema = {
  /**
   * Unique username.
   */
  handle?: string
  /**
   * Boolean that indicates whether or not the user has connected Spotify.
   */
  has_auth?: boolean
  /**
   * Array of profile pictures.
   */
  images?: { height: number | null; width: number | null; url?: string }[]
  /**
   * Spotify display name.
   */
  display_name?: string
}
