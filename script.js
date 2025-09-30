document.addEventListener('DOMContentLoaded', function () {
  const layerStars = document.getElementById('layerStars');
  if (layerStars) {
    let mouseX = 0, mouseY = 0;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let time = 0;

    window.addEventListener('resize', () => {
      cx = window.innerWidth / 2;
      cy = window.innerHeight / 2;
    });

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - cx) / cx;
      mouseY = (e.clientY - cy) / cy;
    });

    function updateParallax() {
      time += 0.002;
      const translateStarsX = mouseX * 40 + Math.sin(time) * 30;
      const translateStarsY = mouseY * 25 + Math.cos(time) * 20;

      layerStars.style.transform = `translate(${translateStarsX}px, ${translateStarsY}px) scale(1.08)`;
      requestAnimationFrame(updateParallax);
    }

    requestAnimationFrame(updateParallax);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;
  const map = L.map(mapContainer).setView([49.0, 31.0], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const wonders = {
    sofievka: { name: "Софіївка (Умань)", coords: [48.7565, 30.2218] },
    lavra: { name: "Києво-Печерська лавра", coords: [50.4345, 30.5579] },
    hortytsia: { name: "Хортиця (Запоріжжя)", coords: [47.8371, 35.0815] },
    kamianets: { name: "Кам’янець-Подільська фортеця", coords: [48.6741, 26.5840] },
    khersones: { name: "Херсонес Таврійський", coords: [44.6117, 33.4860] },
    khotyn: { name: "Хотинська фортеця", coords: [48.5093, 26.4972] },
    sofiyivka: { name: "Софійський собор (Київ)", coords: [50.4523, 30.5145] }
  };

  let currentMarker = null;

  document.querySelectorAll('.buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-place');
      const place = wonders[key];

      if (currentMarker) map.removeLayer(currentMarker);

      currentMarker = L.marker(place.coords, { title: place.name })
        .addTo(map)
        .bindPopup(`<b>${place.name}</b>`)
        .openPopup();

      map.flyTo(place.coords, 9, { duration: 1.5 });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', nav.classList.contains('show'));
    });
  }
});
