export interface Profile {
  id: string;
  email: string;
  name: string;
  profileImg: string;
  userId: string;

  follower?: [];
  following?: [];
  playlists?: [];
}
