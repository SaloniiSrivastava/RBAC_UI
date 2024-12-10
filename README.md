# RBAC_UI
# RBAC Dashboard

This is a role-based access control (RBAC) application that provides a secure way to manage user access based on roles and permissions. It allows administrators to manage users, define roles, assign permissions, and control access to different parts of the application.

# Features
# General Features
- User authentication (login) with role-based and status-based access control.
- Role management: Define roles with specific permissions (e.g., Read, Write, Delete).
- Status management: Control user access through active or inactive status.
  
# Admin Features
- View a list of all users.
- Add new users with default roles and statuses.
- Update user roles and statuses.
- Delete users except for oneself.
- Real-time updates of user information stored in a JSON server
# User Features
- Role-based redirection to specific dashboards (e.g., admin, editor, viewer).
- Inactive users cannot log in and are redirected to an inactive account page
# Technologies Used
- Frontend: ReactJS
- Backend: JSON Server (Mock API)
- Styling: CSS
- Routing: React Router DOM
- API: FetchAPI
# **Setup Instructions**
1. Clone the Repository 
    - git clone [<repository-url>](https://github.com/SaloniiSrivastava/RBAC_UI.git)
    - cd rbac-demo
2. Install Dependencies
   - npm install
3. Start the JSON Server
  - Run the mock backend using JSON Server:
  - json-server --watch db.json --port 3001
4. Start the React Application
    - npm start
# **File Structure**
```
rbac-demo/
├── public/
├── src/
│   ├── components/
│   |   ├── AdminDashboard.js
│   │   ├── LoginPage.js
│   │   ├── InactiveAccount.js
│   │   └── ProtectedRoute.js
|   |   ├── LogoutButton.js
|   ├── styles
│   ├── App.js
|   ├── ProtectedRoute.js
│   ├── index.js
│   └── styles/
│       └── App.css
├── db.json
└── package.json
```

# How It Works
# Login Flow
- Users log in using their credentials.
- The app checks the user's role and status.
- If the status is inactive, redirect to the Inactive Account page.
- If the role is not authorized, redirect to a 403 - Forbidden page.
- Successful login redirects users to their respective dashboards.
# Admin Dashboard
- Add User: Opens a popup to add new users. The ID and status are auto-assigned.
- Update User: Admin can change the role or status of users.
- Delete User: Admin can delete users except for themselves.
- Inactive Account Page
- Displays a message informing users about their inactive status.
- Provides a logout option.
# **Permissions**
# **Role	    Permissions**
- **Admin**	  Full access: Add, Update, Delete users
- **Editor**	Edit-specific access
- **Viewer**	View-only access

# **API Endpoints**
- GET /users: Retrieve all users.
- POST /users: Add a new user.
- PUT /users/:id: Update a user.
- DELETE /users/:id: Delete a user.

# Contributors
- Saloni Srivastava
 


