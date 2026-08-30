const cache = new Map();

const normalizeCategory = value => {
  const s = String(value || "").toLowerCase();
  if (s === "physical") return "Physical";
  if (s === "special") return "Special";
  if (s === "status") return "Status";
  return null;
};

const getBlackWhiteValues = move => {
  const past = Array.isArray(move.past_values) ? move.past_values : [];
  return past.find(x => x?.version_group?.name === "black-white")
      || past.find(x => x?.version_group?.name === "black-white-2")
      || null;
};

async function getMove(id) {
  if (cache.has(id)) return cache.get(id);

  const response = await fetch(`https://pokeapi.co/api/v2/move/${id}/`);
  if (!response.ok) throw new Error(`move ${id}: HTTP ${response.status}`);

  const move = await response.json();
  const old = getBlackWhiteValues(move);

  const meta = {
    id,
    name: String(move.name || "").replace(/-/g, " ").toUpperCase(),
    type: String(old?.type?.name || move.type?.name || "").toUpperCase() || null,
    power: old && old.power !== null ? old.power : move.power,
    accuracy: old && old.accuracy !== null ? old.accuracy : move.accuracy,
    category: normalizeCategory(move.damage_class?.name)
  };

  cache.set(id, meta);
  return meta;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.op !== "get-move-meta") return;

  const ids = [...new Set((msg.ids || []).map(Number).filter(x => x > 0 && x <= 2000))];

  Promise.all(ids.map(async id => {
    try { return [id, await getMove(id)]; }
    catch { return [id, null]; }
  })).then(entries => {
    const out = {};
    for (const [id, meta] of entries) if (meta) out[id] = meta;
    sendResponse(out);
  });

  return true;
});