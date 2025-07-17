## Firebase Configuration

This directory contains placeholder files for Firebase configuration. To connect the app to your Firebase project, you need to replace the placeholder files with your own Firebase configuration files.

### 1. Get your Firebase configuration files

1.  Go to the [Firebase console](https://console.firebase.google.com/).
2.  Create a new project or select an existing one.
3.  Add an Android app to your project and follow the instructions to download the `google-services.json` file.
4.  Add an iOS app to your project and follow the instructions to download the `GoogleService-Info.plist` file.

### 2. Replace the placeholder files

1.  Replace `google-services.json` with the file you downloaded for your Android app.
2.  Replace `GoogleService-Info.plist` with the file you downloaded for your iOS app.

### 3. Important

*   **Do not commit your actual Firebase configuration files to a public repository.** These files contain sensitive information. Make sure to add them to your `.gitignore` file if you are working with a public repository.
*   The placeholder files in this directory are for setup purposes only and will not work without being replaced.
