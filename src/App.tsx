import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login.tsx';
import DashboardPage from './pages/dashboard.tsx';
//import QuestionPage from './pages/questions.tsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* <Route path="/edit/:id" element={<QuestionPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
