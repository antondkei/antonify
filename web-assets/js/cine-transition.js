document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("cinematic-loader");
  const mainContent = document.getElementById("main-content");

  // INTRO: Munculkan konten secara bertahap setelah DOM siap
  // Kita beri jeda mikro agar browser selesai melakukan "paint" dasar di balik layar
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.add("is-loaded");
    }, 100); 
  });

  // OUTRO: Intersepsi klik link
  const links = document.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetUrl = link.getAttribute("href");

      if (
        link.hostname === window.location.hostname && 
        !link.getAttribute("target") && 
        targetUrl && 
        !targetUrl.startsWith("#") &&
        targetUrl !== "#"
      ) {
        e.preventDefault(); 

        // Jalankan animasi keluar (Konten nge-blur & Loader solid menutup kembali)
        document.body.classList.remove("is-loaded");
        document.body.classList.add("is-exiting");

        // Tunggu hingga transisi selesai (600ms match dengan CSS), lalu pindah halaman
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 600);
      }
    });
  });
});

// Solusi tombol Back/Forward browser
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    document.body.classList.remove("is-exiting");
    document.body.classList.add("is-loaded");
  }
});