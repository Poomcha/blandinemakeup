import { InstagramI, InstagramMediaI } from '@/context/instagram';

// Filter for usable images.
export function filter_medias(instagram: InstagramI) {
  if (instagram) {
    const filtered_data = {
      ...instagram,
      data: instagram.data.filter((media: InstagramMediaI) =>
        media.caption ? !media.caption.includes('#hide') : false
      ),
    };
    return filtered_data;
  }
}

// Get media by hashtag.
export function get_media_by_hashtag(instagram: InstagramI, hashtag: string) {
  if (instagram) {
    return instagram.data.filter((media) =>
      media.caption?.includes(`#${hashtag}`)
    )[0].media_url;
  }
}
