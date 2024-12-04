# nest-firebase
A submodule for integrating Firebase functionality within a NestJS application, utilizing the `firebase-admin` library.

### Prerequisites
Ensure the following library is installed in your NestJS project:

1. `firebase-admin`

### Installation
To add the necessary dependency, run:
```yarn
yarn add firebase-admin
```

### Uninstallation:
To remove these dependencies, run:
```yarn
yarn remove firebase-admin
```

### Environment Variables
Configure your Firebase integration by setting the following environment variables in your .env file:
```dotenv
# Firebase module environments
FIREBASE_ACCOUNT_PATH=app-firebase.json
```
•	FIREBASE_ACCOUNT_PATH: Path to your Firebase service account JSON file,
        which contains your credentials for Firebase Admin SDK.
