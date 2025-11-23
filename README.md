# Blog Website - Modern React + Tailwind CSS

A beautiful, responsive blog platform inspired by roar.media, built with React, Tailwind CSS, and Express.js.

## ✨ Features

- 📱 **Fully Responsive Design** - Beautiful UI that works on all devices
- 🎨 **Tailwind CSS** - Modern utility-first styling
- 🔄 **Dynamic Routing** - React Router for seamless navigation
- 📝 **Rich Post Display** - Full blog post pages with related articles
- 🏷️ **Categories & Tags** - Organized content structure
- ⚡ **Fast Loading** - Skeleton loaders and optimized performance
- 🔍 **SEO Ready** - Dynamic meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend

- React 19
- React Router DOM
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd blog
```

### 2. Backend Setup

```bash
cd blogapi
npm install

# Create .env file
cat > .env << EOF
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogdb
JWT_SECRET=your_jwt_secret_key_here
EOF

# Start the backend server
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install

# The .env file is already created with:
# VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd blogapi
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will run on `http://localhost:5000`

## 📁 Project Structure

```
blog/
├── blogapi/                 # Backend Express server
│   ├── config/
│   │   └── db.js           # MongoDB connection
│   ├── controllers/
│   │   ├── postController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── postModel.js    # Enhanced with slug, excerpt, coverImage, etc.
│   │   └── userModel.js
│   ├── routes/
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   └── server.js
│
└── client/                  # Frontend React app
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── PostCard.jsx
    │   │   ├── RelatedPosts.jsx
    │   │   └── SkeletonCard.jsx
    │   ├── hooks/
    │   │   └── usePosts.js  # Custom hooks for API calls
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   └── PostDetailPage.jsx
    │   ├── services/
    │   │   └── api.js       # Axios API client
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css        # Tailwind directives
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## 🔑 API Endpoints

### Posts

- `GET /api/posts` - Get all posts (with optional filters: category, tag, search)
- `GET /api/posts/:id` - Get post by ID
- `GET /api/posts/slug/:slug` - Get post by slug
- `GET /api/posts/:id/related` - Get related posts
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)

### Users

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

## 📝 Post Model Schema

```javascript
{
  title: String,
  slug: String (auto-generated from title),
  excerpt: String (auto-generated from content),
  content: String,
  coverImage: String (URL),
  category: String,
  tags: [String],
  author: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Customization

### Tailwind Theme

Edit `tailwind.config.js` to customize colors, fonts, and other design tokens.

### API Configuration

Update `.env` to point to a different backend:

```env
VITE_API_URL=https://your-api-domain.com/api
```

## 🧪 Creating Sample Posts

You can create posts via the API or directly in MongoDB.

## 🔧 Production Build

```bash
npm run build
npm run preview  # Preview production build
```

## 📱 Responsive Breakpoints

- `sm`: 640px (Mobile landscape)
- `md`: 768px (Tablet)
- `lg`: 1024px (Desktop)
- `xl`: 1280px (Large desktop)

---

**Happy Coding! 🚀**
