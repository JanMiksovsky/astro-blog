import config from "../astro.config.js";
import allPosts from "./posts.js";
import siteInfo from "./siteInfo.js";

const { description, title } = siteInfo;

export default async function () {
  const { site } = config;
  const posts = await allPosts();
  const items = await Promise.all(
    posts.map(async (post) => ({
      // Patch image URLs to be absolute
      content_html: (
        await post.compiledContent()
      ).replace(/src="\//g, `src="${site}/`),
      date_published: post.date,
      id: `${site}/posts/${post.slug}`,
      title: post.frontmatter.title,
      url: `${site}/posts/${post.slug}`,
    }))
  );
  return {
    version: "https://jsonfeed.org/version/1.1",
    title,
    description,
    home_page_url: site,
    feed_url: `${site}/feed.json`,
    items,
  };
}
