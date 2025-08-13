# In server/app.py
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import cv2

# Initialize the Flask application
app = Flask(__name__)
CORS(app) # Enable Cross-Origin Resource Sharing

# Define the directory to save uploaded images
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/register', methods=['POST'])
def register():
    """Receives registration data, validates it, and processes the photo."""
    try:
        data = request.get_json()

        # --- Basic Validation ---
        required_fields = ['fullName', 'email', 'phoneNumber', 'photo']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # --- Image Processing with OpenCV ---
        photo_data = data['photo'] # This is the Base64 string

        # Decode the Base64 string
        # It comes in the format "data:image/jpeg;base64,..." so we split it
        header, encoded = photo_data.split(",", 1)
        image_data = base64.b64decode(encoded)

        # Convert the raw image data to an OpenCV image
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # **OpenCV Validation Logic**
        # Example 1: Check if the image could be loaded
        if img is None:
            return jsonify({"error": "Invalid image file"}), 400

        # Example 2: Check for a face in the image (more advanced)
        # You would need to load a pre-trained Haar Cascade model for this
        # face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        # faces = face_cascade.detectMultiScale(gray, 1.1, 4)

        # if len(faces) == 0:
        #     return jsonify({"error": "No face detected in the photo. Please upload a clear, passport-style photo."}), 400

        # Save the validated image to the server
        image_filename = f"{data['email']}.jpg"
        image_path = os.path.join(UPLOAD_FOLDER, image_filename)
        cv2.imwrite(image_path, img)

        print(f"Successfully processed and saved image to: {image_path}")

        # You can now save the rest of the data (data['fullName'], etc.) to a database
        print(f"Received data for {data['fullName']}")

        return jsonify({
            "message": "Registration successful!",
            "userId": data['email']
        }), 201

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) # Runs the server on port 5000