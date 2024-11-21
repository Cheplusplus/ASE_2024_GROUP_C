# Recipe App 🍳
## Project Overview
The Recipe App is a user-friendly web application built using Next.js that helps users explore, search, and manage a variety of recipes. Designed for food enthusiasts, it offers powerful filtering and sorting options to simplify the process of finding recipes based on categories, tags, and cooking steps. Users can view detailed recipes with step-by-step instructions and manage their preferences with ease.
## Features
## Core Features
### 🍳 Recipe Browsing

#### Browse a collection of recipes with:

- Ingredients
- Cooking steps
- Prep time and cook time
- Number of servings


## Navigate between recipes with an intuitive UI

### 🔍 Search and Filtering

- Search recipes by keywords or ingredients
- Filter recipes based on:
Categories (e.g., Vegan, Desserts, Quick Meals)
Tags (e.g., Gluten-Free, High Protein)
Number of steps or complexity



### 📊 Sorting Options

 Sort recipes by:

- Preparation time
- Cooking time
- Number of steps



### User Features
#### 🔒 User Authentication

- Secure login and account management
- Personalized recipe recommendations
- Profile customization

#### ⭐ Personal Collections

Save favorite recipes to wishlist
Create custom recipe collections
Download recipes for offline access (Planned)

#### 🛠️ Recipe Interaction

- Leave reviews and ratings
- Comment on recipes
- Share cooking tips

### Social Features
#### 📤 Sharing Capabilities

- Share recipes via social media
- Email recipes to friends
- Generate shareable links

<!-- ##### 🔔 Smart Notifications (Planned)

-New recipe alerts
- Cooking reminders
- Personalized recommendations -->

### Technical Features
#### 📱 Responsive Design

- Optimized for all devices
- Adaptive UI components
- Touch-friendly interface

#### 🧭 Navigation

- Interactive navbar
- Quick search functionality
- Advanced filtering system

### Technology Stack
#### Frontend

- Next.js (v13+)
- React (v18+)
- Tailwind CSS (v3+)
- Radix UI components
- React Dropdown Select

#### Backend Services

- Mongodb
- Authentication
- Realtime Database
- Cloud Functions


#### Cloud Storage

- Image optimization
- Recipe asset management


### Development Tools

- ESLint & Prettier
- Git for version control
- Markdown support
- Jest for testing

### Installation
#### Prerequisites

- Node.js (v18.x or later) - Download
- npm or yarn
- Git - Download
- VS Code (recommended) - Download

#### Setup Steps

1. Clone the Repository
        git clone https://github.com/Cheplusplus/ASE_2024_GROUP_C.git
2. Navigate to the  project directory(if necessary)
        -cd recipe-app

3. Install Dependencies
- npm install
 or
-yarn install

4. Configure Environment Variables
cp .env.example .env.local


5. Edit .env.local with your configuration:

    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_aut_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

6. Start Development Server: (Ensure that it's running on https://localhost:3000)

    npm run dev

    yarn dev

7. Build for Production:

    npm run build

    yarn build

8. Troubleshooting

- Clear .next folder if you encounter build issues:
rm -rf .next

- Reset node modules if you face dependency issues:
rm -rf node_modules
npm install


<!-- ##### API Documentation
Authentication Endpoints
Login
httpCopyPOST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
Response:
jsonCopy{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
Recipe Endpoints
Get Recipes
httpCopyGET /api/recipes
Query Parameters:
  - page (number)
  - limit (number)
  - category (string)
  - tags (array)
Response:
jsonCopy{
  "recipes": [
    {
      "id": "recipe123",
      "title": "Chocolate Cake",
      "prepTime": "20 mins",
      "cookTime": "35 mins",
      "difficulty": "medium",
      "ingredients": [
        "2 cups flour",
        "1 cup sugar",
        "3/4 cup cocoa"
      ]
    }
  ],
  "total": 100,
  "currentPage": 1
}
Create Recipe
httpCopyPOST /api/recipes
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "New Recipe",
  "ingredients": ["item1", "item2"],
  "instructions": ["Step 1", "Step 2"],
  "prepTime": "15 mins",
  "cookTime": "30 mins"
}
Development Environment
VS Code Extensions

ESLint
Prettier
Tailwind CSS IntelliSense
GitLens

Recommended Settings
jsonCopy{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
} -->
### Contact & Support

-📧 Email: support@recipeapp.dev

-📞 Phone: +1 555 123 4567

-💬 Discord: Join our community

-📝 Documentation: docs.recipeapp.dev

#### Contributing
We welcome contributions! Please see our Contributing Guide for guidelines.

#### License
This project is licensed under the MIT License - see the LICENSE file for details.