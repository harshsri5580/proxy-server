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
        "User-Agent": userAgent
      }
    })

    const contentType = response.headers.get("content-type")

    res.writeHead(200, {
      "Content-Type": contentType || "text/html"
    })

    const body = await response.text()
    res.end(body)

  } catch (err) {
    console.log(err)
    res.end("Proxy working but fetch failed")
  }
})

server.listen(3000, () => {
  console.log("Server running on 3000")
})
