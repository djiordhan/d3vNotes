[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# d3vNotes

![d3vNotes_demo](https://github.com/djiordhan/d3vNotes/blob/main/demo/demo1.png)
![d3vNotes_demo](https://github.com/djiordhan/d3vNotes/blob/main/demo/demo2.png)
![d3vNotes_demo](https://github.com/djiordhan/d3vNotes/blob/main/demo/demo3.png)

`d3vNotes` is a markdown repository hosted on Firebase, built with React, Vite, and Tailwind CSS.

**Demo:** [https://d3vnotes-ff651.web.app/](https://d3vnotes-ff651.web.app/)

## Overview

`d3vNotes` allows you to store and organize development-related content such as repeatable commands, setup instructions, code snippets, and more. You can even save code snippets containing API keys, passwords, or other confidential data by hosting d3vNotes on your own Firebase account, ensuring complete control over your data. Ensure your account is secure and that necessary permissions are applied.

## Hosting d3vNotes on Your Own Firebase Account

Follow these steps to set up and host d3vNotes on Firebase:

### 1. Clone the Repository and Install Modules

```bash
git clone https://github.com/djiordhan/d3vNotes
cd d3vNotes
npm install
```

### 2. Set Up Firebase

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Once the project is created, click on the web button `</>` to add a new web app.
4. Set the app name (e.g., `<YourName>-d3vNotes`).
5. Copy the Firebase configuration displayed on the screen and paste it into `src/firebase.ts`:

    ```javascript
    const firebaseConfig = {
        apiKey: "<YourApiKey>",
        authDomain: "<authDomain>",
        projectId: "<projectId>",
        storageBucket: "<storageBucket>",
        messagingSenderId: "<messagingSenderId>",
        appId: "<appId>",
        measurementId: "<measurementId>"
    };
    ```

6. Install the necessary Firebase libraries by running the following commands in the terminal:

    ```bash
    npm install firebase
    npm install -g firebase-tools
    ```

7. Log in to Firebase from the command line:

    ```bash
    firebase login
    ```

### 3. Set Up Your Database

1. In the Firebase console, navigate to your app and click on Firestore Database (click "All Products" if not visible).
2. Create a database and choose the server location (e.g., asia-southeast1 for Singapore).
3. After creating the database, go to the Rules tab and apply the following rules:

    ```plaintext
    service cloud.firestore {
        match /databases/{database}/documents {

            match /users/{userId} {
                allow read, write: if request.auth != null && request.auth.uid == userId;
            }

            match /docs/{collectionId} {
                allow read, write: if request.auth != null && request.auth.uid == collectionId;
            }
        }
    }
    ```

### 4. Set Up Authentication

1. In the Firebase console, navigate to your app and click on Authentication (click "All Products" if not visible).
2. Go to the Sign-in method tab.
3. Click on Google, enable it, set your support email, and save the changes.

### 5. Build the d3vNotes App

```bash
npm run build
```

### 6. Deploy the App

```bash
firebase deploy
```

### 7. Access Your Hosted App

After a successful deployment, go to the "Hosting" tab in the Firebase console to check the domains. Your app will be hosted at a URL like:

```plaintext
https://<YourName>-d3vNotes.web.app
```

### Contributions
If you have something to contribute, pull requests are welcome! Please feel free to improve the project by adding new features, fixing bugs, or enhancing the documentation.

### Support
If you find d3vNotes useful, please consider starring the repository on GitHub. Your support helps to improve the project and keeps it alive!
