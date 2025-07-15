const projectList = [
  'project1',
  'project2',
  'project3',
  'project4',
  'project5',
  'project6',
  'project7'
];

const gallery = document.querySelector('.gallery');
gallery.innerHTML = projectData.map(project => `
  <div class="gallery-item" onclick="window.location.href='project.html?id=${project.id}'">
    <img src="${project.thumb}" alt="${project.title}">
    <div class="gallery-info">
      <div class="project-name">${project.title}</div>
      <div class="project-type">${project.tag}</div>
    </div>
  </div>
`).join('');
