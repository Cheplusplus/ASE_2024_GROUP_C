# Recipe App 🍳
## Project Overview
The Recipe App is your ultimate culinary companion, built with the power of Next.js to deliver a seamless and enjoyable experience for food enthusiasts. Whether you're a seasoned chef or a kitchen novice, this app simplifies your recipe discovery journey and brings delicious possibilities to your fingertips.

Why You'll Love It:
🍳 Explore Recipes with Ease
Discover a diverse collection of recipes tailored to your tastes. Filter by categories, tags, or cooking steps to find the perfect dish for any occasion.

🔍 Smart Search & Powerful Sorting
Easily search for recipes or sort them based on your preferences, saving time and making decision-making effortless.

📋 Step-by-Step Instructions
View detailed recipes with clear, step-by-step guidance, ensuring a stress-free cooking experience from start to finish.

💬 Text-to-Voice Conversion
Turn your kitchen into a hands-free zone! With our text-to-voice feature, the app reads out instructions and content, letting you focus on cooking without missing a beat.

📱 Progressive Web App (PWA)
Take the app with you wherever you go. As a PWA, it works seamlessly across devices and offers offline access, so you can cook even when you're off the grid.

💡 Manage Preferences Effortlessly
Keep track of your favorite recipes and personalize your experience with easy preference management.

Whether you're exploring new cuisines or perfecting a family classic, the Recipe App is here to inspire and guide you every step of the way.

🚀 Live Demo
Check out the live demo of the Recipe App in action! Explore recipes, leave reviews, and experience the features firsthand:

Visit Live Demo


## Screenshots of the App
 ![Top of the app](./public/Screenshot%20(124).png)
 ![middle part of the app](./public/Screenshot%20(125).png)
 ![bottom part of the app](./public/Screenshot%20(126).png)
 ![Inside the app](./public/Screenshot%20(132).png)
 ![Filtering](./public/Screenshot%20(128).png)
 ![Dark theme](./public/Screenshot%20(129).png)
 ![Signin page](./public/Screenshot%20(131).png)


## Feature List

## Core Features
### 🔍 Search Recipes
Find your desired recipes quickly by searching with keywords, titles, or ingredients.

#### Explore Our Recipe Collection
Delve into a curated library of recipes, each thoughtfully detailed with:

🥕 Ingredients – All the essentials you need for every dish.
🍳 Cooking Steps – Clear, step-by-step instructions to guide you effortlessly.
⏱️ Prep & Cook Time – Plan your meals with accurate time estimates.
🍽️ Servings – Easily scale recipes to match your needs.

## Navigate between recipes with an intuitive UI

### 🏷️ Filter & Sort Recipes
Narrow down your search by category, cooking time, difficulty, tags, or dietary preferences. Sort recipes by popularity, newest, or preparation time.


### User Features
#### 🔒 User Authentication

🔐 Secure Login & account management
🍴 Personalized Recipe Recommendations based on preferences
✨ Profile Customization with favorite cuisines and saved recipes
📊 Track Cooking History for easy access


#### ⭐ Personalization

❤️ Favorite Recipes
Save your favorite recipes for quick access anytime.

📂 Custom Recipe Collections
Organize saved recipes into personalized collections, such as “Dinner Ideas” or “Quick Snacks.”

📝 Recipe Notes
Add your own notes or tweaks to recipes for future reference.

#### 🛠️ Interactive Recipe Features
⭐ Rate & Review Recipes – Share your feedback and help others discover the best dishes.
💬 Add Comments – Join the conversation by discussing recipes and sharing your experiences.
🍴 Share Your Cooking Tips – Contribute your expertise to help the community elevate their culinary skills.

### Enhanced Functionality

📥 Offline Recipe Access
Download recipes to view them offline anytime, even without an internet connection.

📢 Push Notifications
Stay updated with the latest recipe recommendations, reminders, or personalized cooking tips.

🗣️ Text-to-Voice Conversion
Enjoy hands-free cooking with audio playback of recipe instructions and content.
#### 📤 Sharing Capabilities

### Progressive Web App(PWA) Features
📱 Cross-Device Compatibility
Access the app seamlessly on mobile, tablet, and desktop.

🛠️ Offline Functionality
Use the app without an internet connection to view downloaded recipes or saved collections.

⚡ Fast Loading
Experience lightning-fast performance, even on slow networks.

🌐 Share Your Favorite Recipes
📲 Social Media Sharing – Easily share recipes directly to platforms like Facebook, Twitter, and Instagram.
✉️ Email Recipes – Send delicious ideas straight to your friends' inboxes.
🔗 Create Shareable Links – Generate links to share recipes with anyone, anytime.
<!-- ##### 🔔 Smart Notifications (Planned)

-New recipe alerts
- Cooking reminders
- Personalized recommendations -->


#### 🧭 SEO Optimization
- Implements meta tags and dynamic metadata for better search engine visibility.


### Technology Stack 

#### **Frontend**  
- ⚡ **Next.js (v13+)** – A powerful framework for server-rendered React applications.  
- ⚛️ **React (v18+)** – A robust library for building dynamic user interfaces.  
- 🎨 **Tailwind CSS (v3+)** – For sleek, responsive, and modern styling.  
- 🧩 **Radix UI Components** – Accessible, customizable, and high-quality UI components.  
- 🔽 **React Dropdown Select** – Smooth and interactive dropdown menus for enhanced UX.  

#### **Backend Services**  
- 🍃 **MongoDB** – A scalable and flexible NoSQL database.  
- 🔒 **Authentication** – Secure user login and session management.  
- ⚡ **Realtime Database** – Instant updates to keep data fresh and synchronized.  
- 🔥 **Cloud Functions** – Serverless backend logic for optimized performance.  

#### **Cloud Storage**  
- 🖼️ **Image Optimization** – High-quality visuals with reduced load times.  
- 📂 **Recipe Asset Management** – Effortless storage and retrieval of recipe-related assets.  

#### **Development Tools**  
- 🛠️ **ESLint & Prettier** – For clean, consistent, and error-free code.  
- 🌱 **Git** – Reliable version control to track and manage development changes.  
- 📝 **Markdown Support** – Simplified formatting for seamless documentation.  
- ✅ **Jest** – Comprehensive testing to ensure app stability and quality.  

This robust stack ensures a fast, reliable, and enjoyable experience for developers and users alike! 🚀

## **Installation Guide**  

### **Prerequisites**  
Ensure you have the following installed on your machine before proceeding:  
- **Node.js (v18.x or later)** – [Download Here](https://nodejs.org/)  
- **npm ** – Comes with Node.js 
- **Git** – [Download Here](https://git-scm.com/)  
- **Visual Studio Code (recommended)** – [Download Here](https://code.visualstudio.com/)  

---

### **Setup Steps**  

1. **Clone the Repository**  
   Clone the project to your local machine using Git:  
   ```bash  
   git clone https://github.com/Cheplusplus/ASE_2024_GROUP_C.git  
   ```  

2. **Navigate to the Project Directory**  
   If necessary, move into the project directory:  
   ```bash  
   cd recipe-app  
   ```  

3. **Install Dependencies**  
   Install the required dependencies using npm:  
   ```bash  
   npm install  
   
4. **Configure Environment Variables**  
   Copy the example environment file to create your own configuration:  
   ```bash  
   cp .env.example .env.local  
   ```  

5. **Edit the Environment File**  
   Open `.env.local` in a code editor and provide your Firebase configuration:  
   ```bash  
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key  
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain  
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id  
   ```  

6. **Start the Development Server**  
   Run the server in development mode and access it at `http://localhost:3000`:  
   ```bash  
   npm run dev  
   

7. **Build for Production**  
   If you need a production-ready build, use the following command:  
   ```bash  
   npm run build  
   
8. **Troubleshooting**  
   - If you encounter build issues, clear the `.next` folder:  
     ```bash  
     rm -rf .next  
     ```  
   - If there are dependency issues, reset the `node_modules` folder:  
     ```bash  
     rm -rf node_modules  
     npm install  
      
These step-by-step instructions should ensure a smooth setup for your project. 

### Setting Up Environment Variables

## **Setting Up Environment Variables**  

Environment variables are essential for securely storing sensitive configuration details like API keys, project IDs, and other settings required by the app. Here's how you can set them up for local development:  

---

### **Step-by-Step Instructions**  

1. **Locate the `.env.example` File**  
   In the root directory of your project, there should be a file named `.env.example`. This file contains placeholders for the required environment variables.  

2. **Create a Local Environment File**  
   Copy the `.env.example` file to a new file named `.env.local`:  
   ```bash  
   cp .env.example .env.local  
   ```  

3. **Edit the `.env.local` File**  
   Open the `.env.local` file in your code editor (e.g., Visual Studio Code) and replace the placeholders with your actual configuration values.  

   Example:  
   ```bash  
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key  
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain  
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id  
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket  
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id  
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id  
   ```  

4. **Obtain Your Firebase Configuration**  
   - Go to the Firebase Console: [Firebase Console](https://console.firebase.google.com/)  
   - Select your project.  
   - Navigate to **Project Settings > General > Your apps (Firebase SDK snippet)**.  
   - Copy the Firebase configuration object and extract the required values.  

   Example Firebase Configuration Object:  
   ```javascript  
   const firebaseConfig = {  
     apiKey: "your_api_key",  
     authDomain: "your_auth_domain",  
     projectId: "your_project_id",  
     storageBucket: "your_storage_bucket",  
     messagingSenderId: "your_messaging_sender_id",  
     appId: "your_app_id",  
   };  
   ```  

5. **Verify the Setup**  
   - Ensure the `.env.local` file is saved and properly formatted.  
   - Double-check that there are no spaces around the `=` signs.  

6. **Restart the Development Server**  
   After setting up or modifying the `.env.local` file, restart your development server to apply the changes:  
   bash  
   npm run dev  

### **Best Practices**  
- **Do Not Commit the `.env.local` File:**  
  Add `.env.local` to your `.gitignore` file to ensure sensitive information is not pushed to version control.  

- **Use Descriptive Variable Names:**  
  Clearly label environment variables to make them understandable for future developers.  

- **Validate Your Configuration:**  
  Test the app locally to confirm that the environment variables are correctly applied. 

This setup ensures your app runs locally with all the necessary configurations while keeping sensitive information secure. 

##### API Documentation
All API requests are made to the following base URL:<!--https://your-api-url.com/api


### **Endpoints Overview**

| HTTP Method | Endpoint Path                         | Description                               |
|-------------|---------------------------------------|-------------------------------------------|
| GET         | `/recipes`                            | Fetch a list of all recipes.              |
| GET         | `/recipes/{id}`                       | Fetch a single recipe by its ID.          |
| POST        | `/recipes`                            | Add a new recipe to the database.         |
| PUT         | `/recipes/{id}`                       | Update an existing recipe by ID.          |
| DELETE      | `/recipes/{id}`                       | Delete a recipe by its ID.                |
| GET         | `/categories`                         | Fetch all available categories.           |
| POST        | `/reviews`                            | Add a review to a recipe.                 |
| GET         | `/reviews/{recipeId}`                 | Get all reviews for a specific recipe.    |

---

### **1. Fetch All Recipes**

#### **GET /api/recipes**

Fetch a list of all recipes with the option to filter, sort, and paginate results.

**Query Parameters:**
- `page` (optional): Page number for pagination (default is 1).
- `limit` (optional): Number of recipes per page (default is 10).
- `sort` (optional): Sort order for recipes. Can be `asc` (ascending) or `desc` (descending).
- `category` (optional): Filter by category (e.g., `vegan`, `dessert`).

#### **Request Example:**

```
GET /api/recipes?page=1&limit=10&sort=asc&category=vegan
```

#### **Response Example:**

```json
{
  "data": [
    {
      "id": "1",
      "title": "Vegan Pancakes",
      "ingredients": ["Flour", "Almond Milk", "Baking Powder", "Sugar"],
      "steps": ["Mix ingredients", "Cook on griddle"],
      "category": "Vegan",
      "prep_time": "10 minutes",
      "cook_time": "15 minutes",
      "servings": 4
    },
    {
      "id": "2",
      "title": "Vegan Burger",
      "ingredients": ["Black Beans", "Lettuce", "Tomato", "Vegan Mayo"],
      "steps": ["Mash beans", "Form patties", "Cook on grill"],
      "category": "Vegan",
      "prep_time": "20 minutes",
      "cook_time": "25 minutes",
      "servings": 2
    }
  ],
  "pagination": {
    "page": 1,
    "total_pages": 5,
    "total_count": 50
  }
}
```

---

### **2. Fetch Single Recipe by ID**

#### **GET /api/recipes/{id}**

Fetch the details of a single recipe by its unique ID.

#### **Request Example:**

```
GET /api/recipes/1
```

#### **Response Example:**

```json
{
  "id": "1",
  "title": "Vegan Pancakes",
  "ingredients": ["Flour", "Almond Milk", "Baking Powder", "Sugar"],
  "steps": ["Mix ingredients", "Cook on griddle"],
  "category": "Vegan",
  "prep_time": "10 minutes",
  "cook_time": "15 minutes",
  "servings": 4,
  "reviews": [
    {
      "user": "Jane Doe",
      "rating": 5,
      "comment": "Delicious and easy to make!"
    }
  ]
}
```

---

### **3. Add a New Recipe**

#### **POST /api/recipes**

Create a new recipe and add it to the database.

#### **Request Body Example:**

```json
{
  "title": "Spaghetti Aglio e Olio",
  "ingredients": ["Spaghetti", "Garlic", "Olive Oil", "Chili Flakes", "Parsley"],
  "steps": ["Boil spaghetti", "Sauté garlic in olive oil", "Toss spaghetti in oil"],
  "category": "Italian",
  "prep_time": "5 minutes",
  "cook_time": "10 minutes",
  "servings": 2
}
```

#### **Response Example:**

```json
{
  "message": "Recipe created successfully",
  "data": {
    "id": "10",
    "title": "Spaghetti Aglio e Olio",
    "ingredients": ["Spaghetti", "Garlic", "Olive Oil", "Chili Flakes", "Parsley"],
    "steps": ["Boil spaghetti", "Sauté garlic in olive oil", "Toss spaghetti in oil"],
    "category": "Italian",
    "prep_time": "5 minutes",
    "cook_time": "10 minutes",
    "servings": 2
  }
}
```

---

### **4. Update an Existing Recipe**

#### **PUT /api/recipes/{id}**

Update the details of an existing recipe.

#### **Request Body Example:**

```json
{
  "title": "Vegan Pancakes",
  "ingredients": ["Flour", "Almond Milk", "Baking Powder", "Sugar", "Vanilla Extract"],
  "steps": ["Mix ingredients", "Cook on griddle", "Serve with syrup"],
  "category": "Vegan",
  "prep_time": "10 minutes",
  "cook_time": "15 minutes",
  "servings": 4
}
```

#### **Response Example:**

```json
{
  "message": "Recipe updated successfully",
  "data": {
    "id": "1",
    "title": "Vegan Pancakes",
    "ingredients": ["Flour", "Almond Milk", "Baking Powder", "Sugar", "Vanilla Extract"],
    "steps": ["Mix ingredients", "Cook on griddle", "Serve with syrup"],
    "category": "Vegan",
    "prep_time": "10 minutes",
    "cook_time": "15 minutes",
    "servings": 4
  }
}
```

---

### **5. Delete a Recipe**

#### **DELETE /api/recipes/{id}**

Delete a recipe by its ID.

#### **Request Example:**

```
DELETE /api/recipes/1
```

#### **Response Example:**

```json
{
  "message": "Recipe deleted successfully"
}
```

---

### **6. Fetch Categories**

#### **GET /api/categories**

Fetch a list of all available recipe categories.

#### **Request Example:**

```
GET /api/categories
```

#### **Response Example:**

```json
{
  "data": [
    "Vegan",
    "Dessert",
    "Italian",
    "Mexican",
    "Asian"
  ]
}
```

---

### **7. Add a Review**

#### **POST /api/reviews**

Add a review for a recipe.

#### **Request Body Example:**

```json
{
  "recipe_id": "1",
  "user": "John Doe",
  "rating": 5,
  "comment": "Fantastic recipe! Loved it."
}
```

#### **Response Example:**

```json
{
  "message": "Review added successfully",
  "data": {
    "user": "John Doe",
    "rating": 5,
    "comment": "Fantastic recipe! Loved it."
  }
}
```

---

### **8. Get Reviews for a Recipe**

#### **GET /api/reviews/{recipeId}**

Fetch all reviews for a specific recipe by its ID.

#### **Request Example:**

```
GET /api/reviews/1
```

#### **Response Example:**

```json
{
  "data": [
    {
      "user": "Jane Doe",
      "rating": 5,
      "comment": "Delicious and easy to make!"
    },
    {
      "user": "John Doe",
      "rating": 4,
      "comment": "Tasty, but I would add more seasoning next time."
    }
  ]
}
```

---

### **Authentication (Optional)**
If your app requires authentication, you will need to include authentication headers with your API requests.

#### **Example Authorization Header:**

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

### **Error Handling**

In case of errors, your API should return appropriate HTTP status codes and error messages.

#### **Error Response Example:**

```json
{
  "error": "Bad Request",
  "message": "Missing required field 'title'"
}
```

---

### **Conclusion**

This API documentation should provide you with the necessary information to interact with the recipe app's backend. You can use the endpoints to create, read, update, delete, and interact with recipes and reviews, as well as handle categories and more.

Feel free to adjust and extend the documentation based on your app's specific features and functionality!


### Contact & Support

-📧 Email: support@recipeapp.dev

-📞 Phone: +1 555 123 4567

-💬 Discord: Join our community

-📝 Documentation: docs.recipeapp.dev

#### Contributing
We welcome contributions! Please see our Contributing Guide for guidelines.

#### License
This project is licensed under the MIT License - see the LICENSE file for details.