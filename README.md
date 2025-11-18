# ForumApp - React Native (bare)

Simple forum app using JSONPlaceholder API  
Built with React Native 0.79 + TypeScript (no Expo)

### What it does

- List of posts (title + username)
- Tap username → user profile
- Tap post → post detail + all comments
- Search by title or username (client-side, no extra calls after first load)
- Search stays when you press back
- Loading skeletons + cached data = instant navigation

### Stack

- React Navigation v7 (native stack)
- TanStack React Query v5
- Zustand (just for the search text)
- Axios + small service layer
- Pure StyleSheet (no fancy styling lib)

### Run it

```bash
npm install
cd ios && pod install && cd ..
npx react-native run-android
# or
npx react-native run-ios
```
# ForumApp
