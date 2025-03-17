export type SwipeCardData = {
  userId: string;
  name: string;
  age: number;
  about: string;
  distance: number;
  normalizedLocation: string;
  profilePicture: string;
};

export type LikeCard = {
  userId: string;
  name: string;
  age: number;
  distance: number;
  profilePicture: string;
  likedOn: Date;
};
