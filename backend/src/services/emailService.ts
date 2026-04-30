export async function getEmailInfo(query: string) {
  return {
    type: "email",
    query,
    summary: "Mock: 2 unread important emails from today.",
    source: "mock-email-service",
  };
}
