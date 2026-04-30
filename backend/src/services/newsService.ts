export async function getNewsInfo(query: string) {
  return {
    type: "news",
    query,
    summary: "Mock: Top headline is about AI productivity tools.",
    source: "mock-news-service",
  };
}
