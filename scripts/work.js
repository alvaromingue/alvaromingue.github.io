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

Promise.all(
  projectList.map(proj =>
    fetch(`projects/${proj}/info.json`)
      .then(res => res.json())
      .then(info => ({
        proj,
        info
      }))
  )
).then(results => {
  results.forEach(({proj, info}) => {
    gallery.innerHTML += `
      <div class="gallery-item" onclick="window.location.href='project.html?id=${proj}'">
        <img src="projects/${proj}/thumb.jpg" alt="${info.title}">
        <div class="gallery-info">
          <div class="project-name">${info.title}</div>
          <div class="project-type">${info.tag}</div>
        </div>
      </div>`;
  });
});
