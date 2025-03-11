// import { generateClient } from "aws-amplify/data";
// import type { Schema } from "../../amplify/data/resource";
// import React, { useState } from "react";
// import "../CSS/DashboardPage.css";
// import { useNavigate } from "react-router-dom";

// const client = generateClient<Schema>({
//     authMode: 'userPool',
// });

// interface ResearchProject {
//   id: number;
//   title: string;
//   date: string;
//   sequence: number | null; // `sequence` can be a number or null
// }

// const DashboardPage: React.FC = () => {
//   const navigate = useNavigate();

//   const [researchProjects, setResearchProjects] = useState<ResearchProject[]>([
//     { id: 1, title: "Wheelchair Research 1", date: "2025-02-01", sequence: null },
//     { id: 2, title: "Motion Sickness Research 1", date: "2025-01-25", sequence: null },
//   ]);

//   const handleEdit = (id: number): void => {
//     navigate(`/edit/${id}`);
//   };

//   const generateSequence = (): number => {
//     return Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
//   };

//   const handleDeploy = (id: number): void => {
//     const newSequence = generateSequence();

//     // Ensure uniqueness of sequence (optional)
//     const isSequenceUnique = !researchProjects.some(
//       (project) => project.sequence === newSequence
//     );
//     if (!isSequenceUnique) {
//       handleDeploy(id); // Retry until a unique sequence is found
//       return;
//     }

//     const updatedProjects = researchProjects.map((project) =>
//       project.id === id ? { ...project, sequence: newSequence } : project
//     );

//     setResearchProjects(updatedProjects);

//     const deployedProject = researchProjects.find((p) => p.id === id);
//     if (deployedProject) {
//       alert(`Research "${deployedProject.title}" has been deployed with sequence: ${newSequence}`);
//     }
//   };

//   const handleCreate = (): void => {
//     navigate("/create");
//   };

//   return (
//     <div className="dashboard-page">
//       <h1 className="dashboard-title">Research Dashboard</h1>
//       <button className="create-button" onClick={handleCreate}>
//         Create New Research Project
//       </button>
//       <div className="research-list">
//         {researchProjects.map((project) => (
//           <div key={project.id} className="research-card">
//             <div className="research-details">
//               <h2 className="research-title">{project.title}</h2>
//               <p className="research-date">Created on: {project.date}</p>
//             </div>
//             <div className="deploy-edit-container">
//               <button className="deploy-button" onClick={() => handleDeploy(project.id)}>
//                 Deploy
//               </button>
//               <button className="edit-button" onClick={() => handleEdit(project.id)}>
//                 Edit
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useNavigate } from 'react-router-dom';


Amplify.configure(outputs);

const Dashboard = () => {
  const [user, setUser] = useState<{ username?: string; userId?: string }>({});
  const [loading, setLoading] = useState(true); // Prevent flickering on load
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser(); // ✅ Fetch user inside useEffect
        setUser({
          username: currentUser.username,
          userId: currentUser.userId,
        });
      } catch (error) {
        console.error("User not authenticated:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  async function handleSignOut() {
    await signOut();
    navigate("/");
    
  }

  if (loading) return <p>Loading...</p>; // Prevents UI flickering

  return (
    <div>
      <h1>Welcome, {user.username || "User"}!</h1>
      <p>User ID: {user.userId || "No user ID available"}</p>
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;
