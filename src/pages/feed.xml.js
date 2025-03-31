// import rss from "@astrojs/rss";
// import sanitizeHtml from "sanitize-html";
import jsonFeed from "../jsonFeed.js";
import rss from "../rss.js";

export async function GET() {
  // Convert JSON Feed data to the form expectd by the rss() helper
  const feed = await jsonFeed();
  const xml = rss(feed);
  // const { title, description, site, items: feedItems } = feed;
  // const items = feedItems.map((item) => ({
  //   title: item.title,
  //   pubDate: item.date_published,
  //   link: item.url,
  //   content: sanitizeHtml(item.content_html),
  // }));
  // return rss({
  //   title,
  //   description,
  //   site,
  //   items,
  //   // Also need this per https://docs.astro.build/en/recipes/rss/#removing-trailing-slashes
  //   trailingSlash: false,
  // });
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
