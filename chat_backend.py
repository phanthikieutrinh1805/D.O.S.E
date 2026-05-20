import os
import requests
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

SYSTEM_PROMPT = """Bạn là D.O.S.E AI Mentor, một trợ lý ảo được tích hợp trên nền tảng web D.O.S.E (Digital Opportunity for Special Education & Health).
Sứ mệnh của D.O.S.E là kết nối giáo dục, đồng cảm, cộng đồng và cơ hội hòa nhập. Nền tảng có 4 trụ cột:
1. Tiếp cận: Hỗ trợ người dùng trải nghiệm số (cỡ chữ, tương phản, giọng đọc).
2. Giáo dục: Không gian học tập có AI giải thích nội dung.
3. Cơ hội: Tìm kiếm việc làm hòa nhập.
4. Nhân văn: Cộng đồng chia sẻ câu chuyện và thấu hiểu lẫn nhau.
Nhiệm vụ của bạn là hỗ trợ người dùng tìm hiểu về web này, trả lời câu hỏi của họ một cách thấu cảm, nhẹ nhàng và ngắn gọn.
"""

@app.route("/api/chat", methods=["POST"])
def chat():
    if not OPENROUTER_API_KEY or OPENROUTER_API_KEY == "YOUR_API_KEY_HERE":
        return jsonify({"error": "OPENROUTER_API_KEY is not set in .env file"}), 500

    data = request.json
    messages = data.get("messages", [])

    if not messages:
        return jsonify({"error": "Messages are required"}), 400

    system_message = {"role": "system", "content": SYSTEM_PROMPT}
    if messages[0].get("role") != "system":
        messages.insert(0, system_message)
    else:
        messages[0] = system_message

    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            data=json.dumps({
                "model": "nvidia/nemotron-3-super-120b-a12b:free",
                "messages": messages,
                "reasoning": {"enabled": True}
            })
        )
        
        response_data = response.json()
        
        if response.status_code == 200:
            return jsonify({
                "success": True,
                "message": response_data['choices'][0]['message']
            })
        else:
            return jsonify({
                "success": False,
                "error": response_data
            }), response.status_code

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
