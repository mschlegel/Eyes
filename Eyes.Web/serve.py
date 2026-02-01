
import http.server
import socketserver
import webbrowser

PORT = 8000

webbrowser.open(f"http://localhost:{PORT}/eyes.html")

handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), handler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()