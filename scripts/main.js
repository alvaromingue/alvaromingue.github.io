fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('project-container');
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const project = data.find(p => p.id === id);
    if (project) {
      container.innerHTML = `
        <h1>${project.title}</h1>
        <p>${project.description}</p>
        <div>${project.images.map(img => `<img src="${img}" />`).join('')}</div>
      `;
    }
  });