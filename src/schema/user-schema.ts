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
  /**
   * Optional dictionary showing the party this user is subscribed to.
   *
   * The details are those of the DJ.
   */
  subscribed_to?: {
    /**
     * DJ handle
     */
    handle?: string
    /**
     * DJ user ID
     */
    uid?: string
    /**
     * DJ display name
     */
    display_name?: string
    /**
     * DJ profile photo.
     */
    images?: { height: number | null; width: number | null; url?: string }[]
  }
  is_dj?: boolean
}
