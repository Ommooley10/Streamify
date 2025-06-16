#  Streamify

A real‑time, full‑featured language exchange platform created with the power and flexibility of the MERN stack. Streamify empowers users to connect with people across the world regardless of which tongue they speak—by seamlessly blending text chat, voice interactions, and face‑to‑face video conversations. Leveraging Stream’s chat and video APIs, every message, emoji reaction, and live video call flows instantly and reliably, creating an immersive, barrier‑free environment for cultural exchange, language practice, and genuine human connection. Whether you’re honing your fluency, discovering new idioms, or simply making friends from halfway around the world, Streamify brings people together in one intuitive, highly responsive platform.

---

##  Features

- **User Authentication**  
  Secure sign‑up and login with JWT-based sessions.

- **Real‑Time Chat & Video Calls**  
  Powered by [Stream Chat](https://getstream.io/chat/) and [Stream Video](https://getstream.io/video/).

- **Language Matching**  
  Connect with users based on the language(s) they’re learning or fluent in.

- **Responsive UI**  
  Built with Tailwind CSS and DaisyUI to ensure a seamless experience on desktop & mobile.

- **Data Fetching & State Management**  
  Efficiently synchronized with TanStack Query (formerly React Query).

---

##  Tech Stack

- **Frontend:**  
  - React  
  - Tailwind CSS + DaisyUI  
  - TanStack Query  
  - Stream Chat & Video React SDKs

- **Backend:**  
  - Node.js & Express  
  - MongoDB (via Mongoose)  
  - Stream Chat & Video server-side integrations

- **Deployment:**  
  - Render (single URL serving both frontend & backend)

---

##  Running Locally

1. Build the project dependencies and assets:

```bash
npm run build
```

2. Start the application (both server and client):

```bash
npm run start
```

3. Open your browser at http://localhost:5001

---

##  Deployment

The app is deployed on Render as a single unified service.  
🔗 [View Streamify](https://streamify-rb9i.onrender.com/)

---

## Project Structure

```bash
Streamify/
├── backend/
│   ├── controllers/
│   ├── lib/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── constants/
│   └── tailwind.config.js
├── package.json
└── README.md
```

---
