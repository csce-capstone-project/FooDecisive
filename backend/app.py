from flask import Flask

app = Flask(__name__)

@app.route('/test')
def getMessage():
    return {'message': 'API works!'}

if __name__ == '__main__':
    app.debug = True
    app.run()