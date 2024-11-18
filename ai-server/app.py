from flask import Flask, request, jsonify
from flask_cors import CORS
from chat_module import (
    explain,
    generate_image_from_prompt,
    gpt_command_generate,
    gpt_generate_followup_questions
)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'This is a test route'})


@app.route('/get-command', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt')
    category = gpt_command_generate(prompt)
    return jsonify({'command': category})

@app.route('/get-questions', methods=['POST'])
def questions():
    data = request.json
    prompt = data.get('prompt')
    questions = gpt_generate_followup_questions(prompt)
    return jsonify({'questions': questions})

@app.route('/explain', methods=['POST'])
def explainThing():
    data = request.json
    prompt = data.get('prompt')
    print(prompt)
    explaination = explain(prompt)
    return jsonify({'explaination': explaination})

@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.json
    prompt = data.get('prompt')
    print(prompt)
    image_url = generate_image_from_prompt(prompt)
    print(image_url)
    return jsonify({'image_url': image_url})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)