// Tiny key/value API backed by Netlify Blobs.
// GET    /.netlify/functions/data?key=surveys        -> { value: "...json string or null..." }
// POST   /.netlify/functions/data  { key, value }     -> { ok: true }
// DELETE /.netlify/functions/data?key=responses:xyz   -> { ok: true }

const { getStore, connectLambda } = require("@netlify/blobs");

exports.handler = async (event, context) => {
  try {
    connectLambda(event);
    const store = getStore("ideal-crane-survey-data");
    const key = event.queryStringParameters && event.queryStringParameters.key;

    if (event.httpMethod === "GET") {
      if (!key) return json(400, { error: "Missing key" });
      const value = await store.get(key);
      return json(200, { value: value === null ? null : value });
    }

    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      if (!body.key) return json(400, { error: "Missing key" });
      await store.set(body.key, body.value);
      return json(200, { ok: true });
    }

    if (event.httpMethod === "DELETE") {
      if (!key) return json(400, { error: "Missing key" });
      await store.delete(key);
      return json(200, { ok: true });
    }

    return json(405, { error: "Method not allowed" });
  } catch (err) {
    return json(500, { error: String(err) });
  }
};

function json(statusCode, obj) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj)
  };
}
