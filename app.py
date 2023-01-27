import numpy as np
# from bidict import bidict
import cv2
import tensorflow as tf
from flask import (
    Flask, render_template, request,
    redirect, url_for, session
)
from random import choice
from tensorflow import keras

LABELS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          'a', 'b', 'd', 'e', 'f', 'g', 'h', 'n', 'q', 'r', 't']

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/", methods=['POST'])
def practice_post():
    # print(request.form)
    # pixels = request.form['pixels']
    # print(pixels)
    # print(pixels.shape())
    # pixels = pixels.split(',')
    # img = np.array(pixels).astype(float).reshape(1, 784)
    # img=img.reshape(784)
    img = cv2.imread('001158d595.jpg',cv2.IMREAD_COLOR)
    img = tf.reshape(img, (-1, 256, 256, 3))
    loaded_styled_generator = tf.keras.models.load_model('C:\\Users\\PARTH\\Desktop\\data\\saved_model\\styled_generator')

    pred_letter = loaded_styled_generator(img, training=False)[0].numpy()
    pred_letter= (pred_letter*127.5 +127.5).astype(np.uint8)

    # letter = str(LABELS[np.argmax(pred_letter)])
    cv2.imwrite('pridetcted.jpg',pred_letter)

    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
