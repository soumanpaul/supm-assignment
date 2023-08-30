import logo from './logo.svg';
import './App.css';
import Header from './components/HeaderComponent';
import SignInForm from './components/SignIn';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import store from './store';
import Dashboard from './components/Dashboard'; 

function App() {
  return (
    <Provider store={store}>
     
     <Header />
     <Router>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add this route */}
        <Route path="*" element={<Navigate to="/" />} /> {/* Handle other routes */}
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
