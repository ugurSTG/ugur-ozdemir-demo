from flask import Flask, render_template, Response
from flask import Flask,request,jsonify
from camera import VideoCamera
import cv2
from gaze_tracking import GazeTracking
from flask_cors import CORS, cross_origin

app = Flask(__name__)
gaze = GazeTracking()
CORS(app)

position = ""

@app.route('/')
def index():
    return render_template('index.js')
    
def genx(camera):

    frame = camera.get_frame()

    gaze.refresh(frame)

    frame = gaze.annotated_frame()

    isRight, eye_cor = gaze.is_right()
    isLeft , eye_cor = gaze.is_left()
    if isRight:
        position = "right"
    elif isLeft:
        position = "left"
    else:
        position = "blink"

#    cv2.putText(frame, position, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, (147, 58, 31), 2)

#    left_pupil = gaze.pupil_left_coords()
#    right_pupil = gaze.pupil_right_coords()
#    cv2.putText(frame, "Left pupil:  " + str(left_pupil), (90, 130), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
#    cv2.putText(frame, "Right pupil: " + str(right_pupil), (90, 165), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
    print('Eye Position: ', position)
    print('Ratio: ', eye_cor)
    return position       

#@app.route('/video_feed', methods=['POST', 'GET'])
#def video_feed():
#    return Response(genx(VideoCamera()),  mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route("/result" , methods=['GET'])
@cross_origin(origin='*')
def result():
    return jsonify({"result" : genx(VideoCamera())})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, threaded=True, use_reloader=False)
