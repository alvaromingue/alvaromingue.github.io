function updateTextMask() {
  const svg = document.getElementById('svg-overlay');
  const gallery = document.querySelector('.gallery');
  const images = Array.from(document.querySelectorAll('.gallery-item img'));

  const svgRect = svg.getBoundingClientRect();
  const galleryRect = gallery.getBoundingClientRect();

  // Calcula la franja horizontal de la galería DENTRO del SVG en pantalla
  const interLeft = Math.max(svgRect.left, galleryRect.left);
  const interRight = Math.min(svgRect.right, galleryRect.right);

  // Solo se dibuja máscara para la parte del SVG que está encima de la galería
  const visibleX1 = ((interLeft - svgRect.left) / svgRect.width) * 800;
  const visibleX2 = ((interRight - svgRect.left) / svgRect.width) * 800;

  // Limpia la máscara antes de pintar
  svg.querySelector('#clip-white').innerHTML = '';
  svg.querySelector('#clip-black').innerHTML = '<rect x="0" y="0" width="800" height="120" />';

  images.forEach(img => {
    const rect = img.getBoundingClientRect();

    // Calcula el área de solapamiento entre la imagen y el SVG (en pantalla)
    const overlapLeft = Math.max(rect.left, svgRect.left, galleryRect.left);
    const overlapRight = Math.min(rect.right, svgRect.right, galleryRect.right);
    const overlapTop = Math.max(rect.top, svgRect.top, galleryRect.top);
    const overlapBottom = Math.min(rect.bottom, svgRect.bottom, galleryRect.bottom);

    if (overlapTop < overlapBottom && overlapLeft < overlapRight) {
      // El área solapada en coordenadas del SVG interno (800x120)
      const svgX1 = ((overlapLeft - svgRect.left) / svgRect.width) * 800;
      const svgX2 = ((overlapRight - svgRect.left) / svgRect.width) * 800;
      const svgY1 = ((overlapTop - svgRect.top) / svgRect.height) * 120;
      const svgY2 = ((overlapBottom - svgRect.top) / svgRect.height) * 120;
      const color = img.getAttribute('data-text-color') || 'black';

      // Solo pinta el rect si está dentro del área visible (sobre la galería)
      const maskX1 = Math.max(svgX1, visibleX1);
      const maskX2 = Math.min(svgX2, visibleX2);

      if (maskX2 > maskX1 && color === "white") {
        svg.querySelector('#clip-white').innerHTML +=
          `<rect x="${maskX1}" y="${svgY1}" width="${maskX2 - maskX1}" height="${svgY2 - svgY1}" />`;
      }
    }
  });

  // --- Aquí se actualiza el GIF dual ---
  updateDualGif();
}

// Esta función cambia el GIF según si está sobre una imagen blanca o negra
function updateDualGif() {
  const svg = document.getElementById('svg-overlay');
  const gallery = document.querySelector('.gallery');
  const gif = document.getElementById('dual-gif');
  if (!svg || !gallery || !gif) return;

  const svgRect = svg.getBoundingClientRect();
  const galleryRect = gallery.getBoundingClientRect();
  const gifRect = gif.getBoundingClientRect();

  // Centro del GIF
  const gifCenterX = gifRect.left + gifRect.width / 2;
  const gifCenterY = gifRect.top + gifRect.height / 2;

  // 1. ¿El centro del GIF está dentro del área de la galería y dentro del SVG?
  const inGallery =
    gifCenterX >= Math.max(svgRect.left, galleryRect.left) &&
    gifCenterX <= Math.min(svgRect.right, galleryRect.right) &&
    gifCenterY >= Math.max(svgRect.top, galleryRect.top) &&
    gifCenterY <= Math.min(svgRect.bottom, galleryRect.bottom);

  let gifIsWhite = false;

  if (inGallery) {
    // 2. Ahora, ¿ese punto está sobre una imagen blanca?
    const images = Array.from(document.querySelectorAll('.gallery-item img'));
    images.forEach(img => {
      if (img.getAttribute('data-text-color') !== "white") return;
      const rect = img.getBoundingClientRect();
      if (
        gifCenterX >= rect.left &&
        gifCenterX <= rect.right &&
        gifCenterY >= rect.top &&
        gifCenterY <= rect.bottom
      ) {
        gifIsWhite = true;
      }
    });
  }

  // 3. Solo cambia a blanco si está dentro de la galería, el SVG y una máscara blanca. 
  // Si no, negro.
  if (gifIsWhite) {
    gif.src = "assets/imagen_icon_static_white.gif";
  } else {
    gif.src = "assets/imagen_icon_static.gif";
  }
}



// Listeners
window.addEventListener('scroll', updateTextMask);
window.addEventListener('resize', updateTextMask);
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(updateTextMask, 200);
  document.querySelectorAll('.gallery-item img').forEach(img => img.onload = updateTextMask);
});
