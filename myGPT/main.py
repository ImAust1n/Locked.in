from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from dotenv import load_dotenv
import os
from langchain_groq import ChatGroq

load_dotenv()

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Enable CORS for React


#Deepseek R1
@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    API_KEY = os.getenv("OPENROUTER_API_KEY")
    MODEL = "llama-3.3-70b-versatile"
    
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        f"Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are an expert in fitness. Give brief explaination and put it out in points. No need of much formating of the text."},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.8,  # Adjusts randomness; higher = more creative
        "top_p": 0.7,  # Controls token probability sampling
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        
        if response.status_code == 200:
            result = response.json()
            choice = result.get("choices", [{}])[0]
            bot_response = choice.get("message", {}).get("content", "No response available")
            finish_reason = choice.get("finish_reason", "")

            return jsonify({"response": bot_response.strip()})
        else:
            return jsonify({"response": "Error: " + response.text})

    except requests.exceptions.RequestException as e:
        return jsonify({"response": "Error: " + str(e)})

@app.route('/api/chat2', methods=['POST'])
def chat2():
    user_input = request.json.get('message')
    llm = ChatGroq(
        model_name="llama-3.3-70b-versatile", 
        api_key=os.getenv("GROQ_API_KEY")
    )

    res = llm.invoke(
       "give small and quick replies like human to the user query, " + user_input
    )

    return jsonify({"response": res.content})

@app.route('/api/trainer', methods=['POST'])
def trainer():
    user_input = request.json.get('message')
    API_KEY = os.getenv("OPENROUTER_API_KEY")
    MODEL = "deepseek/deepseek-r1:free"

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        f"Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are an expert in fitness trainer. Give brief explaination in a human centric way. No need of much formating of the text. Give answer to the user query breifly."},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.8,  # Adjusts randomness; higher = more creative
        "top_p": 0.7,  # Controls token probability sampling
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        
        if response.status_code == 200:
            result = response.json()
            choice = result.get("choices", [{}])[0]
            bot_response = choice.get("message", {}).get("content", "No response available")
            finish_reason = choice.get("finish_reason", "")

            return jsonify({"response": bot_response.strip()})
        else:
            return jsonify({"response": "Error: " + response.text})

    except requests.exceptions.RequestException as e:
        return jsonify({"response": "Error: " + str(e)}) 


@app.route('/api/dietian', methods=['POST'])
def dietian():
    user_input = request.json.get('message')
    API_KEY = os.getenv("OPENROUTER_API_KEY")
    MODEL = "deepseek/deepseek-r1:free"

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        f"Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are an expert in fitness dietian. Give brief explaination in a human centric way. No need of much formating of the text. Give answer to the user query breifly."},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.8,  # Adjusts randomness; higher = more creative
        "top_p": 0.7,  # Controls token probability sampling
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        
        if response.status_code == 200:
            result = response.json()
            choice = result.get("choices", [{}])[0]
            bot_response = choice.get("message", {}).get("content", "No response available")
            finish_reason = choice.get("finish_reason", "")

            return jsonify({"response": bot_response.strip()})
        else:
            return jsonify({"response": "Error: " + response.text})

    except requests.exceptions.RequestException as e:
        return jsonify({"response": "Error: " + str(e)})     

@app.route('/api/wellness', methods=['POST'])
def wellness():
    user_input = request.json.get('message')
    API_KEY = os.getenv("OPENROUTER_API_KEY")
    MODEL = "deepseek/deepseek-r1:free"

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        f"Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are an expert in stress management, sleep and meditation. Give brief explaination in a human centric way. No need of much formating of the text. Give answer to the user query breifly."},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.8,  # Adjusts randomness; higher = more creative
        "top_p": 0.7,  # Controls token probability sampling
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        
        if response.status_code == 200:
            result = response.json()
            choice = result.get("choices", [{}])[0]
            bot_response = choice.get("message", {}).get("content", "No response available")
            finish_reason = choice.get("finish_reason", "")

            return jsonify({"response": bot_response.strip()})
        else:
            return jsonify({"response": "Error: " + response.text})

    except requests.exceptions.RequestException as e:
        return jsonify({"response": "Error: " + str(e)}) 
    

#Llama 3.2
# @app.route('/api/chat2', methods=['POST'])
# def chat2():
#     user_input = request.json.get('message');
#     response = ollama.chat(
#         model="llama3.2",
#         messages=[
#             {"role": "system", "content": "You are an expert in business management. Give brief explaination and put it out in points."},
#             {"role": "user", "content": user_input},
#         ]
#     )

#     return jsonify({"response": response['message']['content']})


# import pandas as pd
# import numpy as np
# import ollama
# # For Apple Silicon Macs, use faiss-cpu package
# import faiss
# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from sentence_transformers import SentenceTransformer

# # Load and preprocess data
# # Handle inconsistent CSV formatting by skipping bad lines
# df = pd.read_csv("static/Dont_lose_your_mind_lose_your_weight_exercise.csv", on_bad_lines='skip')
# all_text = " ".join(df['Exercise Type'].dropna().astype(str).tolist())

# # Split text into chunks
# text_splitter = RecursiveCharacterTextSplitter(
#     chunk_size=500,
#     chunk_overlap=50
# )
# chunks = text_splitter.split_text(all_text)

# # Generate embeddings
# model = SentenceTransformer('all-MiniLM-L6-v2')
# embeddings = model.encode(chunks)

# # Create FAISS index
# dimension = embeddings[0].shape[0]
# index = faiss.IndexFlatL2(dimension)
# index.add(np.array(embeddings))

# def get_top_k_chunks(query, k=3):
#     query_embedding = model.encode([query])
#     distances, indices = index.search(np.array(query_embedding), k)
#     return [chunks[i] for i in indices[0]]

# @app.route('/api/rag', methods=['POST'])
# def generate_response():
#     user_input = request.json.get('message')
#     context = "\n".join(get_top_k_chunks(user_input))
    
#     response = ollama.chat(
#         model="llama3.2",
#         messages=[
#             {"role": "system", "content": "Answer based on the provided context only. Give brief explanation and put it out in points."},
#             {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {user_input}"}
#         ]
#     )
    
#     return jsonify({"response": response['message']['content']})

if __name__ == '__main__':
    # Create templates and static directories if they don't exist
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    app.run(debug=True)
