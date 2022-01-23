from time import sleep
from flask import Flask, jsonify, request, send_file, make_response
from werkzeug.utils import secure_filename
from flask_cors import cross_origin
import uuid
from os.path import getsize
app = Flask(__name__)
CHUNK_SIZE = 8192

def read_file_chunks(outputVideoName, outputJsonName):
    with open(outputJsonName, 'rb') as fd:
        while True:
            buf = fd.read(CHUNK_SIZE)
            if buf:
                yield buf
            else:
                break
    with open(outputVideoName, 'rb') as fd:
        while True:
            buf = fd.read(CHUNK_SIZE)
            if buf:
                yield buf
            else:
                break


@app.route("/upload", methods=['POST'])
@cross_origin(expose_headers='json-size')
def upload_file():
    print(request.files)
    if request.method == 'POST':
        if 'video' in request.files:
            file = request.files['video']
        filename = str(uuid.uuid4()) + '_' + secure_filename(file.filename)
        file.save(filename)
    '''
    pass the uploaded video and parameters to the pytorch model
    generate output.mp4 and output.json
    '''
    outputVideoName = 'output.mp4'
    outputJsonName = 'output.json'

    json_size = getsize(outputJsonName)
    response = app.response_class(read_file_chunks(outputVideoName, outputJsonName),mimetype='application/octet-stream')
    response.headers['json-size'] = json_size
    return response


@app.route("/params", methods=['POST'])
@cross_origin()
def uploadParams():
    print(request)
    if request.method == 'POST':
        print(request.json)
        return jsonify(succuss=True, status=200)



if __name__ == "__main__":
    app.run(debug=True)
