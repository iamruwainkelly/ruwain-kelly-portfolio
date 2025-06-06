import projectsData from './src/data/projects.json' assert { type: 'json' };

console.log('Total projects:', projectsData.length);
console.log('Project 4 (SCM):', projectsData[3]);
console.log('SCM Title:', projectsData[3]?.title);
console.log('SCM Mock Data:', projectsData[3]?.mockData);

// Check if all required fields exist
const scmProject = projectsData[3];
if (scmProject) {
  console.log('✅ SCM Order Tracker exists');
  console.log('✅ Title:', scmProject.title);
  console.log('✅ GitHub:', scmProject.github);
  console.log('✅ Live Demo:', scmProject.liveDemo);
  console.log('✅ Technologies:', scmProject.technologies);
  console.log('✅ Mock Data:', scmProject.mockData);
  console.log('✅ Charts:', scmProject.charts);
} else {
  console.log('❌ SCM Order Tracker not found');
}
