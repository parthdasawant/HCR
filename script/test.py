from ..hcr_related.extra_keras_datasets.extra_keras_datasets import emnist
import keras
# import tenorflow as tf
# import matplotlib as plt
import cv2
import numpy as np
model = keras.models.load_model('hcr_related\hcr3.h5', compile=False)
LABELS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          'a', 'b', 'd', 'e', 'f', 'g', 'h', 'n', 'q', 'r', 't']

(X_train, y_train), (X_test, y_test) = emnist.load_data(type='bymerge')

# It is a convention: X and y
test_img = cv2.imread("hcr_related\CanvasAsImage (5).png", cv2.IMREAD_GRAYSCALE)
test_img = cv2.resize(test_img, (28, 28))
print(test_img.shape)
prediction = model.predict(test_img)
lavel = str(LABELS[y_train[np.argmax(prediction)]])
print(lavel)
