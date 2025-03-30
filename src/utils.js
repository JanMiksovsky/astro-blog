export function slugFromPath(filePath) {
  const fileName = filePath.split("/").pop();
  return fileName.replace(/.md$/, "");
}

// Given a file path like `/posts/2025-12-25.md`, return the date
export function dateFromPath(filePath) {
  const slug = slugFromPath(filePath);
  const dateObj = new Date(slug);
  return dateObj.toLocaleDateString();
}

export function allPosts() {
  return import.meta.glob("../posts/*.md");
}
