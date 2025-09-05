# VeriForm: AI-Powered Registration Portal ✨

A full-stack application for user registration featuring AI-powered face detection and data validation, built with Next.js and Flask. Deployed on Vercel and Render.

---
## 🚀 Built With

This project uses a modern tech stack to deliver a seamless user experience:

* **Frontend:** [Next.js](https://nextjs.org/) & [React](https://reactjs.org/)
* **Backend:** [Flask](https://flask.palletsprojects.com/) & [Python](https://www.python.org/)
* **Database:** [Neon](https://neon.tech/) (PostgreSQL)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Deployment:**
    * Frontend on [Vercel](https://vercel.com/)
    * Backend on [Render](https://render.com/)

---
## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You'll need Node.js and npm for the frontend, and Python and pip for the backend.
* **Node.js:** [Download here](https://nodejs.org/)
* **Python:** [Download here](https://www.python.org/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Aprxmeya/Base64-IVS.git](https://github.com/Aprxmeya/Base64-IVS.git)
    cd Base64-IVS
    ```

2.  **Setup the Frontend:**
    * Navigate to your frontend directory.
    * Install npm packages:
        ```sh
        npm install
        ```

3.  **Setup the Backend:**
    * Navigate to the `server` directory.
    * Create and activate a Python virtual environment:
        ```sh
        # For macOS/Linux
        python3 -m venv venv
        source venv/bin/activate

        # For Windows
        python -m venv venv
        .\venv\Scripts\activate
        ```
    * Install the required Python packages:
        ```sh
        pip install -r requirements.txt
        ```
    * Create a `.env` file in the `server` directory and add your database URL:
        ```
        DATABASE_URL="your_neon_database_connection_string"
        ```

---
## 📖 Usage

To run the application locally, you will need to start both the frontend and backend servers in separate terminals.

* **Run the Backend Server:**
    In the `server` directory, run:
    ```sh
    python app.py
    ```
    The server will start on `http://localhost:5000`.

* **Run the Frontend Server:**
    In your frontend directory, run:
    ```sh
    npm run dev
    ```
    The application will open in your browser at `http://localhost:9002`.

---
##  Authors & Contributors

This project is proudly built and maintained by:

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <a href="https://github.com/Aprxmeya">
        <img src="https://github.com/Aprxmeya.png?size=120" width="120px;" style="border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.2);" alt="Aprameya P"/>
        <br /><br />
        <sub><b>Aprameya P</b></sub>
      </a>
      <br />
      <a href="https://github.com/Aprxmeya">
        <img src="https://img.shields.io/badge/GitHub-Follow-black?logo=github&style=flat-square"/>
      </a>
    </td>
    <td align="center" style="padding: 20px;">
      <a href="https://github.com/Gagan7411082471">
        <img src="https://github.com/Gagan7411082471.png?size=120" width="120px;" style="border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.2);" alt="Gagan K"/>
        <br /><br />
        <sub><b>Gagan K</b></sub>
      </a>
      <br />
      <a href="https://github.com/Gagan7411082471">
        <img src="https://img.shields.io/badge/GitHub-Follow-black?logo=github&style=flat-square"/>
      </a>
    </td>
  </tr>
</table>

---
## ©️ License

This project is licensed under the MIT License. See the `LICENSE` file for details.