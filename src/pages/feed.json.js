import jsonFeed from "../jsonFeed.js";

export async function GET() {
  const data = await jsonFeed();
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
