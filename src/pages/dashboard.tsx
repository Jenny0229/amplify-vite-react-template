import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useNavigate } from 'react-router-dom';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import '../CSS/DashboardPage.css';

type QuestionType = 'MULTIPLE_CHOICE' | 'FREE_RESPONSE';

type Question = {
  type: QuestionType;
  questionText: string;
  choices?: string[]; // Nullable array of strings
};

type Project = {
  projectId: string;
  owner: string;
  name: string;
  QRcode?: string;
  questions?: Question[];
  id: string;
  createdAt: string;
  updatedAt: string;
};



Amplify.configure(outputs);

const client = generateClient<Schema>({
    authMode: 'userPool',
});

//create
const createProjects = async () => {

};

//update
const editProject = async () => {

};

//delete
const deleteProject = async () => {

};



const Dashboard = () => {
  const [user, setUser] = useState<{ username?: string; userId?: string }>({});
  const [loading, setLoading] = useState(true); // Prevent flickering on load
  const navigate = useNavigate();
  const [researchProjects, setResearchProjects] = useState<Project[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  /*const [researchProjects, setResearchProjects] = useState([
    { id: 1, title: "Wheelchair Research 1", date: "2025-02-01", sequence: null },
    { id: 2, title: "Motion Sickness Research 1", date: "2025-01-25", sequence: null },
  ]);*/


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
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

    const fetchProjects = async () => {
      try { 
        const { data: projects, errors } = await client.models.Project.list({
          filter: {
              owner: { eq: user.username }
          }
      });
      
        if (errors) {
          console.error("Error fetching projects:", errors);
          return {};
        }

        if (!projects) {
          console.log('No projects found.');
          setResearchProjects([]); // Set empty array if no data
          return;
        }

        const normalizedProjects = projects.map((project) => ({
          ...project,
          QRcode: project.QRcode ?? undefined, // Normalize QRcode
          questions: project.questions
        ? project.questions.map((q) => ({
            ...q,
            choices: q.choices ?? [], // Ensure choices is always an array
          }))
        : undefined, // If null, set to undefined
        }));
        
        setResearchProjects(normalizedProjects);
        
        
        
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchUser();
    fetchProjects();
  }, []);

  async function handleSignOut() {
    await signOut();
    navigate("/");
    
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/create");
  };

  if (loading) return <p>Loading...</p>; // Prevents UI flickering

  return (
    <div className="dashboard-page">
      <div className="top-bar">
        {!loading && user && (
          <div className="user-menu">
            <button onClick={() => setMenuOpen(!menuOpen)} className="user-button">
              {user.username} ⬇
            </button>
            {menuOpen && (
              <div className="dropdown-menu">
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="title">
        <h1 className="dashboard-title">Research Dashboard</h1>
      </div>

      <button className="create-button" onClick={handleCreate}>
        Create New Research Project
      </button>

      <div className="research-list">
        {researchProjects.length > 0 ? (
          researchProjects.map((project) => (
            <div key={project.id} className="research-card">
              <div className="research-details">
                <h2 className="research-title">{project.title}</h2>
                <p className="research-date">Created on: {project.date}</p>
              </div>
              <div className="deploy-edit-container">
                <button className="edit-button" onClick={() => handleEdit(project.id)}>
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No research projects available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
