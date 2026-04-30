export async function getYoutubeInfo(query: string) {
  return {
    type: "youtube",
    query,
    summary: "Mock: Found 3 relevant videos for your request.",
    source: "mock-youtube-service",
  };
}
