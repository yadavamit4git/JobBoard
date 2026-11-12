
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import PostJob from './pages/PostJob';
import MyJobs from './pages/MyJobs';
import JobDetails from './pages/JobDetails';
import MyApplications from './pages/MyApplications';
import EmployerApplications from './pages/EmployerApplications';

import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/employer-applications" element={<EmployerApplications />} />
                <Route path="/my-applications" element={<MyApplications />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/my-jobs" element={<MyJobs />} />
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/employer-dashboard"
                    element={<EmployerDashboard />}
                />

                <Route
                    path="/candidate-dashboard"
                    element={<CandidateDashboard />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
