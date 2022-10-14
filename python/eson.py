import json
import re
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
import AIcontrol
app = Flask(__name__)
CORS(app, resources=r'/*', supports_credentials=True)


@app.route('/pve', methods=['POST'])
def aAI():
    data=request.get_json()
    next_step=AIcontrol.AI_decide(data['dataA'], data['dataB'], data['point'])
    print(next_step)
    next_step=str(next_step)
    return next_step


if __name__ == '__main__':

    '''set = {
        'next': AIcontrol.AI_decide(data1, data2, point)
    }'''

    app.run()   # 这样子会直接运行在本地服务器，也即是 localhost:5000
   # app.run(host='your_ip_address') # 这里可通过 host 指定在公网IP上运行