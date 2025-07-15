fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('work-grid');
    grid.innerHTML = data.map(project => `
      <a href="project.html?id=${project.id}">
        <img src="${project.thumb}" alt="${project.title}" />
      </a>
    `).join('');
  });