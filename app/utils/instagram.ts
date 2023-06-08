import { InstagramI } from '@/context/instagram';

// Get cover image.
export function get_cover(instagram: InstagramI) {
  if (instagram) {
    return instagram.data.filter((data) =>
      data.caption?.split(' ').find((hashtag) => hashtag === '#cover')
    )[0].media_url;
  }
}
