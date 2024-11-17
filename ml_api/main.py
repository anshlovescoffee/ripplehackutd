from flask import Flask, jsonify, request
from flask_cors import CORS 
import pandas as pd
import numpy as np
import pickle

with open('model/model.pkl', 'rb') as f:
    info = pickle.load(f)

model = info['model']
wireless_clients_median = info['wireless_clients_median']
wired_clients_median = info['wired_clients_median']

app = Flask(__name__)
CORS = CORS(app)

@app.route('/', methods=['GET'])
def index():
    return jsonify({ 'message': 'Working' })

# Should we inference on the GPU instead? 
# find out on the next episode of WOW THIS SHIT IS SLOW
@app.route('/predict', methods=['GET'])
def predict():
    data = request.args.get('features') # Expect as list

    if type(data) != dict:
        return jsonify({ 'error': 'Features must be a dict' })

    data = pd.DataFrame(data)
    data['wired_clients_over_median'] = (data['lan_users'] - wired_clients_median) / wired_clients_median
    data['wireless_clients_over_median'] = (data['wlan_users'] - wireless_clients_over_median) / wireless_clients_median

    pred = model.predict(data)
    
    return jsonify({ 'results': pred }) 

app.run(host='0.0.0.0', port=5000)
