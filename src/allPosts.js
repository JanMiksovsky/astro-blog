import parseDate from "./parseDate.js";

// Return the array of posts: the post import plus other data we care about
export default async function allPosts() {
  const globs = import.meta.glob("../markdown/*.md");
  const posts = await Promise.all(
    Object.entries(globs).map(async ([path, resolver]) => {
      const post = await resolver();
      const fileName = path.split("/").pop();
      const slug = fileName.replace(/.md$/, "");
      const date = parseDate(slug);
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
