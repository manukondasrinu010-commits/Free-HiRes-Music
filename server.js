import express from "express";

const app = express();
app.disable("x-powered-by");
const PORT = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.type("text").send("Free Lossless Catalogue addon is running.");
});

app.get("/manifest.json", (_req, res) => {
  res.json({
    id: "org.sunny.free-lossless-catalogue",
    name: "Free Lossless Catalogue",
    version: "1.0.0",
    description: "Free legal music catalogue search with honest quality metadata.",
    resources: ["search", "stream"],
    types: ["music"],
    catalogs: [{ type: "music", id: "free-lossless", name: "Free Lossless Catalogue" }]
  });
});

/*
 * This starter intentionally does not scrape paid services or expose unauthorized
 * copyrighted streams. Add a provider only after verifying its public API,
 * licensing/terms, and BitChord's exact addon response schema.
 */
app.get("/search", async (req, res) => {
  const query = String(req.query.q || req.query.query || "").trim();
  if (!query) return res.status(400).json({ error: "Missing search query. Use ?q=artist%20song" });

  // TODO: Connect a permitted public catalogue API here.
  // Return real provider IDs, URLs, and quality metadata; never infer FLAC/Hi-Res
  // from bitrate or a filename alone.
  return res.json({
    query,
    results: [],
    message: "Addon scaffold is running, but no music provider is connected yet. Provider integration requires a permitted API and BitChord's expected response schema."
  });
});

app.get("/stream", (_req, res) => {
  res.status(501).json({
    error: "No stream provider is connected yet.",
    message: "Only return streams that the source is authorized to provide. Do not label audio lossless unless the source confirms it."
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Free Lossless Catalogue listening on ${PORT}`);
});
