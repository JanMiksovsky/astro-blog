// Return the array of posts
// These are the post imports plus other data we care about
export async function allPosts() {
  const globs = import.meta.glob("../markdown/*.md");
  return Promise.all(
    Object.entries(globs).map(async ([path, resolver]) => {
      const post = await resolver();
      const fileName = path.split("/").pop();
      const slug = fileName.replace(/.md$/, "");
      const date = new Date(slug);
      return Object.assign({}, post, {
        date,
        slug,
      });
    })
  );
}
