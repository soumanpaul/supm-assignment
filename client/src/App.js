import './App.css';
import Header from './components/Header';
import SignInForm from './components/SignIn';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import store from './store/store';
import Dashboard from './components/Dashboard'; 

function App() {
  return (
    <Provider store={store}>
     <Header />
     <Router>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
