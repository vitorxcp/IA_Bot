import cv2

body_cascade = cv2.CascadeClassifier("haarcascade_fullbody.xml")
videopath = input("Enter the video Path : ")
cap = cv2.VideoCapture(videopath)

while True:

    response, frame = cap.read()

    if response == False:
        break

    gray_img = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = body_cascade.detectMultiScale(gray_img, 1.1, 1)

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

        cv2.imshow('img', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
