from django.http import HttpResponse
import requests
from PIL import Image
from django.shortcuts import render
import base64
import io

import json


def home(request):
    # response = requests.get('http://localhost:5000/Posts/getImages')
    # data = response.json()
    # if request.method == "POST":
    #     return HttpResponse(data[0])
    # if request.method == "GET":
    #     print(data[0]["img"]["data"])
    return HttpResponse("hello")


def yosra(request):

    # Retrieve the list of images from http://localhost:5000/Posts/getImages
    response = requests.get('http://localhost:5000/Posts/getImages?page=2')

    # Extract the image data from the response
    # image_data = io.BytesIO(response.content).getvalue()
    # Return the image data as the response
    return HttpResponse(response.content, content_type='image/jpeg')
# def yosra(request):
#     # Fetch the images from the API
#     response = requests.get('http://localhost:5000/Posts/getImages')
#     images = response.json()

#     # Get the first image from the list of images
#     first_image = images[1]['img']['data']
#     print(first_image)
#     image_data = io.BytesIO(first_image).getvalue()


""" 
def yosra_v2(request):
    # Fetch the images from the API
    response = requests.get('http://localhost:5000/Posts/getImages')
    images = response.json()
    
    # Get the first image from the list of images
    first_image = images[1]['img']['data']
    
    # Render the image on a webpage using Django's HttpResponse
    return HttpResponse(first_image, content_type='image/png')
    
 """
