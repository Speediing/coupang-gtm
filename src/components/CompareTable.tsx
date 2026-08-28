const TOOLS = [
  "SpaceXAI agent fleet",
  "Claude Cowork",
  "ChatGPT",
  "Perplexity",
] as const;

const ROWS: { label: string; values: string[] }[] = [
  {
    label: "What it is",
    values: [
      "A persistent agent fleet with one computer per agent",
      "General computer agent",
      "General AI assistant",
      "AI research engine",
    ],
  },
  {
    label: "What starts it",
    values: [
      "A review, question, schedule, or system change",
      "You assign a task",
      "You start a chat or task",
      "You ask a question",
    ],
  },
  {
    label: "What you get",
    values: [
      "A checked artifact for the team to review",
      "A completed task or artifact",
      "An answer, analysis, or draft",
      "A sourced research answer",
    ],
  },
];

export function CompareTable() {
  return (
    <section id="compare" className="compare">
      <h2>Why the computer matters</h2>
      <p className="section-lede">
        Each agent has a computer, a clear task, and the source tools it needs.
        Your team stays in control of the final action.
      </p>
      <div className="compare-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Capability</span>
              </th>
              {TOOLS.map((tool) => (
                <th key={tool} scope="col">
                  {tool}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, index) => (
                  <td key={TOOLS[index]}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
