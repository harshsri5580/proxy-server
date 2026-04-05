import http from "http"
import fetch from "node-fetch"

const server = http.createServer(async (req, res) => {
  const host = req.headers.host

  let target = "https://example.com"
  let safe = "https://google.com"

  const isBot = req.headers["user-agent"]?.includes("facebook")

  const finalURL = isBot ? safe : target

  try {
    const response = await fetch(finalURL)
    const body = await response.text()

    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(body)
  } catch (err) {
    res.end("Error loading page")
  }
})

server.listen(3000, () => {
  console.log("Server running on 3000")
})
