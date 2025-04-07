import config from "../astro.config.js";
import allPosts from "./allPosts.js";
import siteInfo from "./siteInfo.js";

const { description, title } = siteInfo;

export default async function () {
  const { site } = config;
  const posts = await allPosts();
  const items = await Promise.all(
    posts.map(async (post) => ({
      content_html: await post.compiledContent(),
      date_published: post.date,
      id: `${site}/posts/${post.slug}`,
      title: post.frontmatter.title,
      url: `${site}/posts/${post.slug}`,
    }))
  );
  return {
    title,
    description,
    site,
    items,
  };
}
