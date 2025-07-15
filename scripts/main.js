const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
fetch(`projects/${projectId}/info.json`).then(res => res.json()).then(info => {
  document.title = info.title + ' - ALVAROMINGUE';
  document.getElementById('pj-image').innerHTML =
    `<img src="projects/${projectId}/main.jpg" alt="${info.title}">`;
  document.getElementById('pj-info').innerHTML =
    `<h1>${info.title}</h1>
     <div style="margin:24px 0;">
       <span class="project-type">${info.tag}</span>
     </div>
     <p>${info.desc}</p>`;
});