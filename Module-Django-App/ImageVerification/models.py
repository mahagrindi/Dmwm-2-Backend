from django.db import models
# import cv2


# def compareImage(img1, img2):
#     img1 = cv2.imread(img1)
#     img2 = cv2.imread(img2)
#     sift = cv2.xfeatures2d.SIFT_create()
#     kp1, des1 = sift.detectAndCompute(img1, None)
#     kp2, des2 = sift.detectAndCompute(img2, None)

#     bf = cv2.BFMatcher()
#     matches = bf.knnMatch(des1, des2, k=2)

#     good_matches = []
#     for m, n in matches:
#         if m.distance < 0.75 * n.distance:
#             good_matches.append([m])

#     if len(good_matches) > 10:
#         print("Les images sont similaires")
#     else:
#         print("Les images sont différentes")
