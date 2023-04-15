import requests
from django.shortcuts import render
from django.http import HttpResponse
import base64
from django.views.decorators.csrf import csrf_exempt
import json
import cv2
import numpy as np


@csrf_exempt
def home(request):
    exist = 0
    if request.method == 'POST':
        image_data = request.body
        image_obj = json.loads(image_data)
        image = image_obj['image']
        one_img_bytes = bytes(image['img']['data']['data'])
        one_img_data_uri = base64.b64encode(one_img_bytes)
        image1_array = np.frombuffer(one_img_data_uri, dtype=np.uint8)
        image1 = cv2.imdecode(image1_array, cv2.IMREAD_COLOR)
        response = requests.get('http://localhost:5000/Posts/getImages')
        images = response.json()
        imagesTab = []
        for i in range(len(images)):
            img_bytes = bytes(images[i]['img']['data']['data'])
            img_data_uri = base64.b64encode(img_bytes)
            imagesTab.append(img_data_uri)
        for image in imagesTab:
            image2_array = np.frombuffer(image, dtype=np.uint8)
            image2 = cv2.imdecode(image2_array, cv2.IMREAD_COLOR)
            diff = cv2.absdiff(image1, image2)
            diff_mean = cv2.mean(diff)[0]
            print(diff_mean)
            if diff_mean <= 1.0:
                exist = exist + 1
        return HttpResponse(exist)
    if request.method == 'GET':
        response = requests.get('http://localhost:5000/Posts/getImages')
        images = response.json()
        imagesTab = []
        for i in range(len(images)):
            img_bytes = bytes(images[i]['img']['data']['data'])
            img_data_uri = base64.b64encode(img_bytes).decode('utf-8')
            imagesTab.append(img_data_uri)
        context = {
            'images': imagesTab
        }
        return render(request, 'home.html', context)
