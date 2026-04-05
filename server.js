import http from "http"
import fetch from "node-fetch"

// DEFAULT fallback (jab DB nahi hai)
const DEFAULT_OFFER = "https://httpbin.org/html"
const DEFAULT_SAFE = "https://google.com"

const server = http.createServer(async (req, res) => {
  const host = req.headers.host || ""

  const userAgent = (req.headers["user-agent"] || "").toLowerCase()

  const isBot =
    userAgent.includes("facebook") ||
    userAgent.includes("bot") ||
    userAgent.includes("crawler")

  // 👉 dynamic logic (future DB replace karega)
  let offer = DEFAULT_OFFER
  let safe = DEFAULT_SAFE

  // Example: subdomain based auto logic
  if (host.includes("test")) {
    offer = "https://example.com"
    safe = "https://bing.com"
  }

  const finalURL = isBot ? safe : offer

  try {
    const response = await fetch(finalURL)
    const body = await response.text()

    res.writeHead(200, {
      "Content-Type": "text/html"
    })

    res.end(body)

  } catch (err) {
    res.end("Fetch error")
  }
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log("Server running on port", PORT)
})
