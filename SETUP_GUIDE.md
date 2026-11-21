# Setup guide (simple steps)

## 1. Install tools
- Install Node.js LTS from the official Node website.
- Install VS Code.
- Install MongoDB Community Server, or create a free MongoDB Atlas cluster.

Check Node in VS Code Terminal:
```bash
node -v
npm -v
```

## 2. Open project
Extract the ZIP. In VS Code, open the `bug-tracker-project` folder.

## 3. Configure backend
Open Terminal and:
```bash
cd backend
npm install
```
Copy `.env.example` to `.env`. Set a private JWT secret. Set MongoDB URI.

Start server:
```bash
npm run dev
```
You should see MongoDB connected and server running on port 5000.

## 4. Configure frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Visit the URL Vite prints (usually http://localhost:5173).

## 5. Use the app
1. Create a new account.
2. Sign in.
3. Go to Projects and create a project.
4. Return to Dashboard and create issues.
5. Change issue status using the status dropdown.
6. Search issue titles using the search box.

## Common fixes
- If MongoDB connection fails, check the MongoDB service is running and the URI in `.env` is correct.
- If API requests fail, ensure backend terminal is running on port 5000.
- If port 5000 is already occupied, change `PORT` in `.env` and update `VITE_API_URL` (see optional environment setup below).

## Optional frontend API URL
Create `frontend/.env` if your backend is not at localhost:5000:
```env
VITE_API_URL=http://localhost:5000/api
```
