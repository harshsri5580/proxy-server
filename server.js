import http from "http"
import fetch from "node-fetch"

const server = http.createServer(async (req, res) => {
  const userAgent = req.headers["user-agent"] || ""

  let target = "https://httpbin.org/html"
  let safe = "https://google.com"

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
        "Accept": "*/*"
      }
    })

    const body = await response.text()

    res.writeHead(200, {
      "Content-Type": "text/html"
    })

    res.end(body)

  } catch (err) {
    console.log("REAL ERROR:", err)
    res.end("Still fetch error")
  }
})

server.listen(3000, () => {
  console.log("Server running on 3000")
})
