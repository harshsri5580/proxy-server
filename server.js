import http from "http"
import fetch from "node-fetch"

const campaigns = {
  "go.rollroyale.com": {
    offer: "https://httpbin.org/html",
    safe: "https://google.com"
  },
  "go.test.com": {
    offer: "https://example.com",
    safe: "https://bing.com"
  }
}

const server = http.createServer(async (req, res) => {
  const host = req.headers.host

  const userAgent = req.headers["user-agent"] || ""

  const isBot =
    userAgent.includes("facebook") ||
    userAgent.includes("bot") ||
    userAgent.includes("crawler")

  const campaign = campaigns[host]

  if (!campaign) {
    return res.end("No campaign found")
  }

  const finalURL = isBot ? campaign.safe : campaign.offer

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

server.listen(3000)
