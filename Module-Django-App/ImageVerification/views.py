from django.http import HttpResponse
import requests


def home(request):
    response = requests.get('http://localhost:5000/user/UserList')
    data = response.json()
    print(data)
    return HttpResponse("Hello, Django!")


def yosra(request):
    return HttpResponse("hello yosra")
# Create your views here.
