// import { useState } from "react";
// import QRCode from "qrcode"; // Import QR Code library

// const CreateProject = ({ user, onProjectCreated }) => {
//   const [projectName, setProjectName] = useState("");
//   const [qrCode, setQrCode] = useState(""); // Store QR Code
//   const [questions, setQuestions] = useState([
//     { questionText: "", type: "MULTIPLE_CHOICE", choices: [""] }
//   ]);

//   // Handle project name input
//   const handleProjectNameChange = (e) => setProjectName(e.target.value);

//   // Handle question updates
//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   // Add a new question
//   const addQuestion = () => {
//     setQuestions([...questions, { questionText: "", type: "MULTIPLE_CHOICE", choices: [""] }]);
//   };

//   // Remove a question
//   const removeQuestion = (index) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   // Generate QR Code
//   const generateQRCode = async (projectId) => {
//     try {
//       const url = `https://your-app.com/projects/${projectId}`; // Adjust URL structure
//       const qr = await QRCode.toDataURL(url);
//       setQrCode(qr);
//       return qr;
//     } catch (err) {
//       console.error("QR Code Generation Error:", err);
//       return "";
//     }
//   };

//   // Create Project in Database
//   const createProject = async (withQRCode = false) => {
//     try {
//       const projectId = crypto.randomUUID(); // Unique ID for project
//       const newProject = {
//         projectId,
//         owner: user.username, // Cognito user ID
//         name: projectName,
//         QRcode: withQRCode ? await generateQRCode(projectId) : undefined, // Generate QR Code if needed
//         questions: questions.map(q => ({
//           questionText: q.questionText,
//           type: q.type,
//           choices: q.choices.filter(choice => choice.trim() !== ""), // Remove empty choices
//         })),
//       };

//       const { data, errors } = await client.models.Project.create(newProject);

//       if (errors) {
//         console.error("Error creating project:", errors);
//         return;
//       }

//       console.log("Project created successfully:", data);
//       onProjectCreated(data); // Update UI with the new project
//     } catch (error) {
//       console.error("Error creating project:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Create New Project</h1>
      
//       {/* Project Name Input */}
//       <div>
//         <label>Project Name:</label>
//         <input type="text" value={projectName} onChange={handleProjectNameChange} required />
//       </div>

//       {/* Questions Section */}
//       <div>
//         <h3>Questions:</h3>
//         {questions.map((q, index) => (
//           <div key={index}>
//             <label>Question Text:</label>
//             <input
//               type="text"
//               value={q.questionText}
//               onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)}
//               required
//             />

//             <label>Type:</label>
//             <select
//               value={q.type}
//               onChange={(e) => handleQuestionChange(index, "type", e.target.value)}
//             >
//               <option value="MULTIPLE_CHOICE">Multiple Choice</option>
//               <option value="FREE_RESPONSE">Free Response</option>
//             </select>

//             {q.type === "MULTIPLE_CHOICE" && (
//               <div>
//                 <label>Choices (comma-separated):</label>
//                 <input
//                   type="text"
//                   value={q.choices.join(", ")}
//                   onChange={(e) =>
//                     handleQuestionChange(index, "choices", e.target.value.split(",").map(c => c.trim()))
//                   }
//                 />
//               </div>
//             )}

//             <button type="button" onClick={() => removeQuestion(index)}>Remove Question</button>
//           </div>
//         ))}

//         <button type="button" onClick={addQuestion}>Add Question</button>
//       </div>

//       {/* Action Buttons */}
//       <button type="button" onClick={() => createProject(false)}>Create</button>
//       <button type="button" onClick={() => createProject(true)}>Create & Deploy</button>

//       {/* Display QR Code */}
//       {qrCode && (
//         <div>
//           <h3>Generated QR Code:</h3>
//           <img src={qrCode} alt="QR Code" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateProject;
