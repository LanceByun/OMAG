export async function getScheduleInfo(query: string) {
  return {
    type: "schedule",
    query,
    summary: "Mock: You have a team standup at 10:00 AM.",
    source: "mock-schedule-service",
  };
}
