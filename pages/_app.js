// pages/_app.js
import '../styles/globals.css'; // This is correct, ensuring you use '../'
import { AuthProvider } from '../lib/firebase'; 
// ... rest of the code
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
