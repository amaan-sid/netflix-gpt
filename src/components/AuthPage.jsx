import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleAuth();
  }
};

  const handleAuth = async () => {
    setError(''); // clear previous error
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/home")
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/home")
      }
    } catch (err) {
      setError(err.message); // set error for display
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-gray-400 p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          {isLogin ? 'Welcome Back 👋' : 'Create an Account'}
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {isLogin ? 'Signup' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
