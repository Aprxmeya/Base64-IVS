
#-----------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------
#                              VERSION 1.0
#-----------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------



# # In server/app.py
# import os
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import base64
# import numpy as np
# import cv2

# # Initialize the Flask application
# app = Flask(__name__)
# CORS(app) # Enable Cross-Origin Resource Sharing

# # Define the directory to save uploaded images
# UPLOAD_FOLDER = 'uploads'
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)

# @app.route('/api/register', methods=['POST'])
# def register():
#     """Receives registration data, validates it, and processes the photo."""
#     try:
#         data = request.get_json()

#         # --- Basic Validation ---
#         required_fields = ['fullName', 'email', 'phoneNumber', 'photo']
#         if not all(field in data for field in required_fields):
#             return jsonify({"error": "Missing required fields"}), 400

#         # --- Image Processing with OpenCV ---
#         photo_data = data['photo'] # This is the Base64 string

#         # Decode the Base64 string
#         # It comes in the format "data:image/jpeg;base64,..." so we split it
#         header, encoded = photo_data.split(",", 1)
#         image_data = base64.b64decode(encoded)

#         # Convert the raw image data to an OpenCV image
#         nparr = np.frombuffer(image_data, np.uint8)
#         img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#         # **OpenCV Validation Logic**
#         # Example 1: Check if the image could be loaded
#         if img is None:
#             return jsonify({"error": "Invalid image file"}), 400

#         # Example 2: Check for a face in the image (more advanced)
#         # You would need to load a pre-trained Haar Cascade model for this
#         # face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
#         # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#         # faces = face_cascade.detectMultiScale(gray, 1.1, 4)

#         # if len(faces) == 0:
#         #     return jsonify({"error": "No face detected in the photo. Please upload a clear, passport-style photo."}), 400

#         # Save the validated image to the server
#         image_filename = f"{data['email']}.jpg"
#         image_path = os.path.join(UPLOAD_FOLDER, image_filename)
#         cv2.imwrite(image_path, img)

#         print(f"Successfully processed and saved image to: {image_path}")

#         # You can now save the rest of the data (data['fullName'], etc.) to a database
#         print(f"Received data for {data['fullName']}")

#         return jsonify({
#             "message": "Registration successful!",
#             "userId": data['email']
#         }), 201

#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000) # Runs the server on port 5000


#-----------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------
#                               VERSION  2.0
#-----------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------

# import os
# import sqlite3
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from dotenv import load_dotenv
# import base64
# import numpy as np
# import cv2

# load_dotenv()

# app = Flask(__name__)
# CORS(app)

# DATABASE = 'database.db'
# UPLOAD_FOLDER = 'uploads'
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)

# # --- Database Functions ---
# def get_db_connection():
#     conn = sqlite3.connect(DATABASE)
#     conn.row_factory = sqlite3.Row
#     return conn

# def init_db():
#     conn = get_db_connection()
#     with open('schema.sql') as f:
#         conn.executescript(f.read())
#     conn.close()
#     print("Database has been initialized.")

# def setup_database_if_needed():
#     if not os.path.exists(DATABASE):
#         with open('schema.sql', 'w') as f:
#             f.write("""
#             CREATE TABLE users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 fullName TEXT NOT NULL,
#                 email TEXT NOT NULL UNIQUE,
#                 phoneNumber TEXT NOT NULL,
#                 dateOfBirth TEXT NOT NULL,
#                 gender TEXT NOT NULL,
#                 photoPath TEXT NOT NULL,
#                 registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#             );
#             """)
#         init_db()

# # --- Load the face detection model ---
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# @app.route('/api/register', methods=['POST'])
# def register():
#     try:
#         data = request.get_json()
#         required_fields = ['fullName', 'email', 'phoneNumber', 'photo']
#         if not all(field in data and data[field] for field in required_fields):
#             return jsonify({"error": "Missing or empty required fields"}), 400

#         # --- IMAGE DECODING ---
#         photo_data = data['photo']
#         header, encoded = photo_data.split(",", 1)
#         image_data = base64.b64decode(encoded)
#         nparr = np.frombuffer(image_data, np.uint8)
#         img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

#         if img is None:
#             return jsonify({"error": "Invalid image data. Could not decode."}), 400

#         # --- VALIDATION 1: FACE DETECTION ---
#         gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#         faces = face_cascade.detectMultiScale(gray, 1.1, 5)

#         if len(faces) == 0:
#             return jsonify({"error": "No face detected. Please upload a clear, forward-facing photo."}), 400
#         if len(faces) > 1:
#             return jsonify({"error": "Multiple faces detected. Please upload a photo of only yourself."}), 400

#         # --- PREPROCESSING: CROP AND RESIZE ---
#         (x, y, w, h) = faces[0]
#         padding = 30
#         face_crop = img[y-padding:y+h+padding, x-padding:x+w+padding]
        
#         try:
#             processed_image = cv2.resize(face_crop, (512, 512), interpolation=cv2.INTER_AREA)
#         except cv2.error:
#             return jsonify({"error": "Face is too close to the edge of the photo. Please retake."}), 400

#         # --- VALIDATION 2: BLUR DETECTION ---
#         laplacian_var = cv2.Laplacian(processed_image, cv2.CV_64F).var()
#         blur_threshold = 100.0
#         if laplacian_var < blur_threshold:
#             print(f"❌ Validation Failed: Image is too blurry. Laplacian Variance: {laplacian_var}")
#             return jsonify({"error": f"Your photo is too blurry. Please upload a clearer image."}), 400
        
#         print(f"✅ Validation Passed: Image sharpness is good. (Laplacian Variance: {laplacian_var})")

#         # --- SAVE THE PROCESSED IMAGE ---
#         image_filename = f"{data['email']}_processed.jpg"
#         photoPath = os.path.join(UPLOAD_FOLDER, image_filename)
#         cv2.imwrite(photoPath, processed_image)

#         # --- DATABASE INSERTION ---
#         conn = get_db_connection()
#         try:
#             conn.execute(
#                 "INSERT INTO users (fullName, email, phoneNumber, dateOfBirth, gender, photoPath) VALUES (?, ?, ?, ?, ?, ?)",
#                 (data['fullName'], data['email'], data['phoneNumber'], data['dateOfBirth'], data['gender'], photoPath)
#             )
#             conn.commit()
#             print(f"✅ User {data['email']} successfully saved to database.")
#         except sqlite3.IntegrityError:
#             conn.close()
#             return jsonify({"error": f"A user with the email {data['email']} is already registered."}), 409
#         finally:
#             conn.close()

#         return jsonify({
#             "message": "Registration successful! Image processed and data stored.",
#             "userId": data['email']
#         }), 201

#     except Exception as e:
#         print(f"❌ An error occurred: {e}")
#         return jsonify({"error": "An internal server error occurred."}), 500

# # --- Main execution ---
# if __name__ == '__main__':
#     setup_database_if_needed()
#     port = int(os.environ.get('FLASK_RUN_PORT', 5000))
#     app.run(debug=True, port=port)

# old version idk

#-----------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------
#                              VERSION  ... 3.0
#-----------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------



# import os
# import sqlite3
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from dotenv import load_dotenv
# import base64
# import numpy as np
# import cv2

# load_dotenv()

# app = Flask(__name__)

# # --- CHANGE 1: Be explicit about the frontend URL ---
# CORS(app, resources={r"/api/*": {"origins": "http://localhost:9002"}})


# DATABASE = 'database.db'
# UPLOAD_FOLDER = 'uploads'
# if not os.path.exists(UPLOAD_FOLDER):
#     os.makedirs(UPLOAD_FOLDER)

# # --- (Database and other functions remain the same) ---
# def setup_database_if_needed():
#     if not os.path.exists(DATABASE):
#         with open('schema.sql', 'w') as f:
#             f.write("""
#             CREATE TABLE users (
#                 id INTEGER PRIMARY KEY AUTOINCREMENT,
#                 fullName TEXT NOT NULL,
#                 email TEXT NOT NULL,
#                 phoneNumber TEXT NOT NULL,
#                 dateOfBirth TEXT NOT NULL,
#                 gender TEXT NOT NULL,
#                 photoPath TEXT NOT NULL,
#                 registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
#             );
#             """)
#         conn = sqlite3.connect(DATABASE)
#         with open('schema.sql') as f:
#             conn.executescript(f.read())
#         conn.close()
#         print("Database has been initialized.")

# def get_db_connection():
#     conn = sqlite3.connect(DATABASE)
#     conn.row_factory = sqlite3.Row
#     return conn

# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# @app.route('/api/register', methods=['POST'])
# def register():
#     # --- (The entire register function remains the same) ---
#     try:
#         data = request.get_json()
#         required_fields = ['fullName', 'email', 'phoneNumber', 'photo']
#         if not all(field in data and data[field] for field in required_fields):
#             return jsonify({"error": "Missing or empty required fields"}), 400
#         photo_data = data['photo']
#         header, encoded = photo_data.split(",", 1)
#         image_data = base64.b64decode(encoded)
#         nparr = np.frombuffer(image_data, np.uint8)
#         img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#         if img is None:
#             return jsonify({"error": "Invalid image data. Could not decode."}), 400
#         gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#         faces = face_cascade.detectMultiScale(gray, 1.1, 5)
#         if len(faces) == 0:
#             return jsonify({"error": "No face detected. Please upload a clear, forward-facing photo."}), 400
#         if len(faces) > 1:
#             return jsonify({"error": "Multiple faces detected. Please upload a photo of only yourself."}), 400
#         (x, y, w, h) = faces[0]
#         padding = 30
#         face_crop = img[y-padding:y+h+padding, x-padding:x+w+padding]
#         try:
#             processed_image = cv2.resize(face_crop, (512, 512), interpolation=cv2.INTER_AREA)
#         except cv2.error:
#             return jsonify({"error": "Face is too close to the edge of the photo. Please retake."}), 400
#         laplacian_var = cv2.Laplacian(processed_image, cv2.CV_64F).var()

#         #------------------------- blurness --------------------------
#         blur_threshold = 10.0
#          #------------------------- blurness --------------------------

#         if laplacian_var < blur_threshold:
#             return jsonify({"error": f"Your photo is too blurry. Please upload a clearer image."}), 400
#         image_filename = f"{data['email']}_processed.jpg"
#         photoPath = os.path.join(UPLOAD_FOLDER, image_filename)
#         cv2.imwrite(photoPath, processed_image)
#         conn = get_db_connection()
#         try:
#             conn.execute(
#                 "INSERT INTO users (fullName, email, phoneNumber, dateOfBirth, gender, photoPath) VALUES (?, ?, ?, ?, ?, ?)",
#                 (data['fullName'], data['email'], data['phoneNumber'], str(data['dateOfBirth']), data['gender'], photoPath)
#             )
#             conn.commit()
#         except sqlite3.IntegrityError:
#             conn.close()
#             return jsonify({"error": f"A user with the email {data['email']} is already registered."}), 409
#         finally:
#             conn.close()
#         return jsonify({"message": "Registration successful!", "userId": data['email']}), 201
#     except Exception as e:
#         print(f"❌ An error occurred: {e}")
#         return jsonify({"error": "An internal server error occurred."}), 500


# if __name__ == '__main__':
#     setup_database_if_needed()
#     # --- CHANGE 2: Be explicit about the backend port ---
#     port = 5000
#     print(f"--- Backend server starting on http://localhost:{port} ---")
#     app.run(debug=True, port=port)


#-----------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------
#                              VERSION  ... 4.0
#-----------------------------------------------------------------------------------------------------------------------
#-----------------------------------------------------------------------------------------------------------------------


import os
import psycopg2 # The PostgreSQL driver
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import base64
import numpy as np
import cv2

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:9002"}})

# --- Get the database URL from your .env file ---
DATABASE_URL = os.environ.get('DATABASE_URL')

def get_db_connection():
    """Creates a connection to the Neon (PostgreSQL) database."""
    conn = psycopg2.connect(DATABASE_URL)
    return conn

def setup_database_if_needed():
    """Initializes the database and creates the users table if it doesn't exist."""
    conn = get_db_connection()
    cur = conn.cursor()
    # Check if the 'users' table exists
    cur.execute("SELECT to_regclass('public.users');")
    table_exists = cur.fetchone()[0]
    
    if not table_exists:
        cur.execute("""
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            fullName TEXT NOT NULL,
            email TEXT NOT NULL,
            phoneNumber TEXT NOT NULL,
            dateOfBirth TEXT NOT NULL,
            gender TEXT NOT NULL,
            photoData TEXT NOT NULL,
            registered_at TIMESTAMPTZ DEFAULT NOW()
        );
        """)
        conn.commit()
        print("Database has been initialized with the 'users' table.")
    
    cur.close()
    conn.close()

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        # ... (Image validation logic is the same) ...
        photo_data = data['photo']
        header, encoded = photo_data.split(",", 1)
        image_data = base64.b64decode(encoded)
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None: return jsonify({"error": "Invalid image data."}), 400
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.1, 5)

        if len(faces) == 0: return jsonify({"error": "No face detected."}), 400
        if len(faces) > 1: return jsonify({"error": "Multiple faces detected."}), 400
        
        (x, y, w, h) = faces[0]
        padding = 30
        face_crop = img[y-padding:y+h+padding, x-padding:x+w+padding]
        
        try:
            processed_image = cv2.resize(face_crop, (512, 512), interpolation=cv2.INTER_AREA)
        except cv2.error:
            return jsonify({"error": "Face is too close to the edge."}), 400

        if cv2.Laplacian(processed_image, cv2.CV_64F).var() < 10.0:
            return jsonify({"error": f"Photo is too blurry."}), 400

        # --- Convert the validated image to a Base64 string ---
        _, buffer = cv2.imencode('.jpg', processed_image)
        processed_image_base64 = base64.b64encode(buffer).decode('utf-8')
        final_image_string = f"data:image/jpeg;base64,{processed_image_base64}"

        # --- Save the user and the image string to Neon ---
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (fullName, email, phoneNumber, dateOfBirth, gender, photoData) VALUES (%s, %s, %s, %s, %s, %s)",
            (data['fullName'], data['email'], data['phoneNumber'], str(data['dateOfBirth']), data['gender'], final_image_string)
        )
        conn.commit()
        cur.close()
        conn.close()

        print(f"✅ User {data['email']} and their image string saved to Neon database.")

        return jsonify({"message": "Registration successful!", "userId": data['email']}), 201

    except Exception as e:
        print(f"❌ An error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

if __name__ == '__main__':
    setup_database_if_needed() # This will now check/create the table in Neon
    port = 5000
    print(f"--- Backend server starting on http://localhost:{port} ---")
    app.run(debug=True, port=port)