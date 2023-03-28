from django.http import HttpResponse
import requests
from io import BytesIO
from PIL import Image
from django.shortcuts import render
import base64


def home(request):
    response = requests.get('http://localhost:5000/Posts/getImages')
    data = response.json()
    if request.method == "POST":
        return HttpResponse(data[0])
    if request.method == "GET":
        print(data[0]["img"]["data"])
        return HttpResponse(str(data[0]['img']['data']))


def yosra(request):
    response = requests.get('http://localhost:5000/Posts/getImages')
    data = response.json()
    images = []
    # img = base64.b64decode(data[0]['img']['data']['data'])
    # for item in data:
    img = Image.open(BytesIO(data[0]['img']['data']['data']))
    # print(img)

    images.append(img)

    context = {'images': images}
    return render(request, 'home.html', context)
