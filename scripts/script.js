
function updateTextMask() {
  const svg = document.getElementById('svg-overlay');
  const images = Array.from(document.querySelectorAll('.gallery-item img'));
  const svgRect = svg.getBoundingClientRect();

  svg.querySelector('#clip-white').innerHTML = '';
  svg.querySelector('#clip-black').innerHTML = '<rect x="0" y="0" width="800" height="120" />';

  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    // ¿Se cruza con el SVG?
    const overlapTop = Math.max(rect.top, svgRect.top);
    const overlapBottom = Math.min(rect.bottom, svgRect.bottom);
    const overlapLeft = Math.max(rect.left, svgRect.left);
    const overlapRight = Math.min(rect.right, svgRect.right);

    if (overlapTop < overlapBottom && overlapLeft < overlapRight) {
      // El área solapada en coordenadas SVG:
      const svgX1 = ((overlapLeft - svgRect.left) / svgRect.width) * 800;
      const svgX2 = ((overlapRight - svgRect.left) / svgRect.width) * 800;
      const svgY1 = ((overlapTop - svgRect.top) / svgRect.height) * 120;
      const svgY2 = ((overlapBottom - svgRect.top) / svgRect.height) * 120;
      const color = img.getAttribute('data-text-color') || 'black';
      if(color === "white") {
        svg.querySelector('#clip-white').innerHTML +=
          `<rect x="${svgX1}" y="${svgY1}" width="${svgX2 - svgX1}" height="${svgY2 - svgY1}" />`;
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
