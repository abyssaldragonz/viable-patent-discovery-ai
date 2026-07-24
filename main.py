import os
from typing import List
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()
llm = genai.Client(api_key=(os.getenv("API_KEY"))) 

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Allow requests from your frontend origin


# classes and json structure
class References(BaseModel):
    name: str=Field(description="The name of the reference.")
    link: str=Field(description="The direct link to the reference.")

# Explain in simple terms what each patent provides. Do a simple scientific breakdown of the patent and do not provide scientific equations. Then create a value proposition based on viable competition in the market, highlighting economic insight and viable competition. Discuss key stakeholders and technical expertise needed. Then discuss market sizing, include all three TAM, SAM, and SOM (Total Addressable Market, Serviceable Addressable Market, Serviceable Obtainable Market. Rate the viability of the idea on a scale from 0-10. Provide 3 references for each patent idea as well as the direct link to the patent. 

class Idea(BaseModel):
    idea_name: str = Field(description="The name of the startup idea.")
    patent_summary: str = Field(description="The description of the patent and what it provides.")
    patent_link: str = Field(description="The direct link to the patent.")
    scientific_breakdown: str = Field(description="The scientific breakdown of the patent in simple terms. Do not provide scientific equations.")
    value_prop: str = Field(description="The value proposition based on viable competition in the market, highlighting economic insight and viable competition.")    
    key_stakeholders: str = Field(description="The key stakeholders and technical expertise needed for this idea.")    
    market_sizing: str = Field(description="The market sizing. Include all three TAM, SAM, and SOM (Total Addressable Market, Serviceable Addressable Market, Serviceable Obtainable Market.")    
    viability_rating: float = Field(description="The viability rating for this startup on a scale from 0 to 10.")    
    references: List[References] = Field(description="A list of three references for the scientific idea and market viability.")    

class BaseList(BaseModel):
    arr: List[Idea]
    

@app.route('/')  # Handles the main homepage URL
def home():
    return "Hello World!"
    
# Chatbot
@app.route('/chat', methods=['POST'])
def chat():
    """Simple chatbot endpoint. Expects JSON: { "message": "your text", "api_key": "your_gemini_api_key" }"""
    data = request.get_json()
    if not data or 'message' not in data or 'num' not in data:
        return jsonify({'error': 'Missing "message" in request.'}), 400

    user_message = data['message']
    user_num = data['num']

    prompt = "You are an AI chatbot tasked with generating startup ideas from the provided list of patents. Do not ask for followup questions. Order by viability rating. Search under the Google Patents engine for the following keywords: " + user_message + ". Pick " + str(user_num) + " reports."


    # https://pydantic.dev/docs/validation/dev/concepts/serialization/
    try:
        interaction = llm.interactions.create(
            model="gemini-3.1-flash-lite",
            input=prompt,
            response_format={
                "type": "text",
                "mime_type": "application/json",
                "schema": BaseList.model_json_schema()
            },
        )
        response = BaseList.model_validate_json(interaction.output_text)
        # print(interaction.output_text)
        print("Thoughts tokens:", interaction.usage.total_thought_tokens)
        print("Output tokens:", interaction.usage.total_output_tokens)
        # print(response)


        if not response:
            return jsonify({'error': 'AI model returned an empty response.'}), 500
        
        return {"base": [x.model_dump() for x in response.arr]}, 200
    except Exception as e:
        return jsonify({'error': f"AI error: {e}"}), 500
    

# Run the Flask application
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)