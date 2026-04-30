import { FormEvent, useState } from "react";

type JarvisResponse = {
  originalInput: string;
  preprocessedInput: string;
  intent: string;
  result: unknown;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export default function App() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<JarvisResponse | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/jarvis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed with ${res.status}`);
      }

      const data = (await res.json()) as JarvisResponse;
      setResponse(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <section className="card">
        <h1>Jarvis Console</h1>
        <p className="subtitle">Dark mode frontend for backend command routing.</p>

        <form onSubmit={onSubmit} className="form">
          <label htmlFor="input">Command</label>
          <div className="inputRow">
            <input
              id="input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Try: "야야 뉴스 알려줘"'
            />
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>

        {error && <p className="error">Error: {error}</p>}

        {response && (
          <div className="response">
            <h2>Response</h2>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </section>
    </main>
  );
}
