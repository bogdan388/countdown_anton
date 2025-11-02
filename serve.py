#!/usr/bin/env python3
"""
Simple HTTP server to test the countdown animation.
Run with: python3 serve.py
Then open http://localhost:8000 in your browser
"""

import http.server
import socketserver
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()

# Change to the script's directory
os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"🔥 Concert Countdown Server running at http://localhost:{PORT}")
    print("📱 Press Ctrl+C to stop the server")
    print("\n✨ Open your browser and tap the screen to reveal the burning countdown!")
    httpd.serve_forever()