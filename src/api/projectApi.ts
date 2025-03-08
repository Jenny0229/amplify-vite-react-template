// import { generateClient } from "aws-amplify/data";
// import type { Schema } from "../../amplify/data/resource";

// const client = generateClient<Schema>({
//     authMode: 'userPool',
//   });



// export const fetchProjects = async () => {
//   const user = await Auth.currentAuthenticatedUser();
//   const { data } = await client.models.Project.list({
//     filter: { owner: { eq: user.attributes.sub } },
//   });
//   return data;
// };

// // 📌 Create a new project
// export const addProject = async () => {
//   return await client.models.Project.create({
//     name: "New Project",
//     owner: user.attributes.sub,
//     QRcode: "https://example.com/qrcode",
//     questions: [
//       { type: "MULTIPLE_CHOICE", questionText: "What is your favorite color?", choices: ["Red", "Blue", "Green"] },
//       { type: "FREE_RESPONSE", questionText: "Describe your experience." },
//     ],
//   });
// };

// // 📌 Update a project
// export const updateProject = async (projectId) => {
//   return await client.models.Project.update({
//     id: projectId,
//     name: "Updated Project Name",
//   });
// };

// // 📌 Delete a project
// export const deleteProject = async (projectId) => {
//   return await client.models.Project.delete({ id: projectId });
// };
