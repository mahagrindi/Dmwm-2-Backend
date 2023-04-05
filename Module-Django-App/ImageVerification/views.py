import requests
from django.shortcuts import render
from django.http import HttpResponse
import base64
import cv2


def home(request):
    exist = 'false'
    if request.method == 'POST':
        image_data = request.POST.get('image')
        one_img_bytes = bytes(image_data['img']['data']['data'])
        one_img_data_uri = base64.b64encode(one_img_bytes).decode('utf-8')
        response = requests.get('http://localhost:5000/Posts/getImages')
        images = response.json()
        imagesTab = []
        for i in range(len(images)):
            img_bytes = bytes(images[i]['img']['data']['data'])
            img_data_uri = base64.b64encode(img_bytes).decode('utf-8')
            imagesTab.append(img_data_uri)
        for image in imagesTab:
            if image == one_img_data_uri:
                exist = 'true'

        context = {
            'response': exist
        }
        return render(request, 'home.html', context)
    if request.method == 'GET':
        return HttpResponse("Not Get request")


def yosra(request):
    if request.method == 'POST':
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
    if request.method == 'GET':
        return HttpResponse("Not Get request yosra")
