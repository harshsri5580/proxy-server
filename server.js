import http from "http"

const server = http.createServer(async (req, res) => {
  const host = req.headers.host

  let target = "https://example.com"
  let safe = "https://google.com"

  const userAgent = req.headers["user-agent"] || ""

  const isBot =
    userAgent.includes("facebook") ||
    userAgent.includes("bot") ||
    userAgent.includes("crawler")

  const finalURL = isBot ? safe : target

  try {
    const response = await fetch(finalURL, {
      method: "GET",
      headers: {
        "User-Agent": userAgent,
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9"
      },
      redirect: "follow" // 🔥 important
    })

    const buffer = await response.arrayBuffer()

    res.writeHead(response.status, {
      "Content-Type": response.headers.get("content-type") || "text/html"
    })

    res.end(Buffer.from(buffer))

  } catch (err) {
    console.log("FETCH ERROR:", err.message)
    res.end("Proxy working but fetch failed")
  }
})

server.listen(3000, () => {
  console.log("Server running on 3000")
})
