// thread.js — groups extracted records into items, resolves supersession.
// Input:  records from the LLM extraction pass (one per message)
// Output: one item per real-world subject, newest intent winning

const INTENT_RANK = { cancel: 4, extend: 3, update: 2, new: 1 };

export function thread(records) {
  // 1. Drop noise before grouping — it has no refers_to worth keeping.
  const signal = records.filter(r => r.type !== "noise");

  // 2. Group by the canonical subject the model produced.
  const groups = new Map();
  for (const r of signal) {
    const key = (r.refers_to || r.id).trim().toLowerCase();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  }

  // 3. Collapse each group into one item.
  return [...groups.values()].map(group => {
    // Oldest first, so history reads in order.
    group.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));

    // The winning record is the strongest intent; ties break on recency.
    const winner = [...group].sort((a, b) => {
      const d = (INTENT_RANK[b.intent] || 1) - (INTENT_RANK[a.intent] || 1);
      return d !== 0 ? d : new Date(b.sent_at) - new Date(a.sent_at);
    })[0];

    return {
      ...winner,
      sources: group.map(r => ({
        id: r.id, channel: r.channel, sender: r.sender,
        sent_at: r.sent_at, excerpt: r.text.slice(0, 120),
      })),
      // Nothing is discarded — the whole chain stays reachable.
      history: group.length > 1
        ? group.map(r => ({ at: r.sent_at, what: r.plain, intent: r.intent }))
        : null,
      supersedes: group.filter(r => r.id !== winner.id).map(r => r.id),
    };
  });
}
