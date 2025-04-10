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

  // Sort posts by date
  posts.sort((a, b) => a.date - b.date);

  // Add next/previous links before reversing
  posts.forEach((post, index) => {
    const nextKey = posts[index + 1]?.slug || null;
    const previousKey = posts[index - 1]?.slug || null;
    return Object.assign(post, { nextKey, previousKey });
  });

  // Reverse the order of the posts
  const reversed = posts.reverse();

  return reversed;
}
