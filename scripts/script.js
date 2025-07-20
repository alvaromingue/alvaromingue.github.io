function updateTextMask() {
  const svg = document.getElementById('svg-overlay');
  const gallery = document.querySelector('.gallery');
  const images = Array.from(document.querySelectorAll('.gallery-item img'));

  const svgRect = svg.getBoundingClientRect();
  const galleryRect = gallery.getBoundingClientRect();

  // Calcula la franja horizontal de la galería DENTRO del SVG en pantalla
  // Puede que la galería sea más pequeña o esté desplazada respecto al SVG
  const interLeft = Math.max(svgRect.left, galleryRect.left);
  const interRight = Math.min(svgRect.right, galleryRect.right);

  // Solo se dibuja máscara para la parte del SVG que está encima de la galería
  // El área útil del SVG en el eje X es [visibleX1, visibleX2]
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
}

window.addEventListener('scroll', updateTextMask);
window.addEventListener('resize', updateTextMask);
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(updateTextMask, 200);
  document.querySelectorAll('.gallery-item img').forEach(img => img.onload = updateTextMask);
});
