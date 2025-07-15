const projectList = ['project1', 'project2'];
const gallery = document.querySelector('.gallery');
projectList.forEach(proj => {
  fetch(`projects/${proj}/info.json`).then(res => res.json()).then(info => {
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