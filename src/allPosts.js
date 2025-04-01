// Return the array of posts
// These are the post imports plus other data we care about
export default async function allPosts() {
  const globs = import.meta.glob("../markdown/*.md");
  const posts = await Promise.all(
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
  // Sort posts by date, latest first
  const reversed = posts.sort((a, b) => {
    return b.date - a.date;
  });
  return reversed;
}
