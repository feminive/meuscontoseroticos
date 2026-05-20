type PostLike = {
  id: string;
  data: {
    slug?: string;
  };
};

export function postSlug(post: PostLike) {
  return post.data.slug ?? post.id;
}

export function postPath(post: PostLike) {
  return `/${postSlug(post)}/`;
}
