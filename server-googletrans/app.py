from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator, LANGUAGES

app = Flask(__name__)
CORS(app)

translator = Translator()

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    text = data.get('text')
    source = data.get('source', 'auto')
    target = data.get('target', 'en')

    if not text:
        return jsonify({'error': 'No text provided'}), 500
        
    try:
        # Translate to target language
        result = translator.translate(text, src=source, dest=target)
        
        # Translate to English (ESL) if source is not English
        esl_source = text if source == 'en' else translator.translate(text, src=source, dest='en').text
        
        # Translate target back to English (ESL) if target is not English
        esl_target = result.text if target == 'en' else translator.translate(result.text, src=target, dest='en').text
        
        return jsonify({
            'translatedText': result.text,
            'detectedLanguage': result.src,
            'eslSource': esl_source,
            'eslTarget': esl_target
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/languages', methods=['GET'])
def get_languages():
    return jsonify(LANGUAGES)

if __name__ == '__main__':
    app.run(debug=True)