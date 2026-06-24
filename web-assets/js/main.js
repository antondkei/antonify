document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // 1. Deteksi Scroll untuk Efek Sticky Blur premium
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    // Fungsi pembantu untuk menutup drawer secara bersih
    const closeDrawer = () => {
        if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
            mobileToggle.classList.remove('is-active');
            mobileDrawer.classList.remove('is-open');
            mobileToggle.setAttribute('aria-expanded', 'false');
            // Mengembalikan kebebasan scroll layar touch mobile
            document.removeEventListener('touchmove', preventDefaultScroll);
        }
    };

    // Fungsi pembantu penahan scroll mobile tanpa merusak properti 'sticky'
    const preventDefaultScroll = (e) => {
        e.preventDefault();
    };

    // 2. Interaksi Menu Mobile (Open / Close)
    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah bentrok dengan detektor klik luar
            const isOpen = mobileDrawer.classList.toggle('is-open');
            mobileToggle.classList.toggle('is-active');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            
            // PERBAIKAN STICKY: Mengunci scroll di mobile tanpa merusak position: sticky induk
            if (isOpen) {
                document.addEventListener('touchmove', preventDefaultScroll, { passive: false });
            } else {
                document.removeEventListener('touchmove', preventDefaultScroll);
            }
        });
    }

    // KUNCI UTAMA: Tutup menu saat menyentuh area luar navigasi
    document.addEventListener('click', (event) => {
        // Jika menu terbuka, dan yang diklik bukan area dalam drawer, dan bukan tombol toggle
        if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
            if (!mobileDrawer.contains(event.target) && !mobileToggle.contains(event.target)) {
                closeDrawer();
            }
        }
    });

    // Dukungan touchstart ekstra responsif untuk perangkat iOS & Android
    document.addEventListener('touchstart', (event) => {
        if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
            if (!mobileDrawer.contains(event.target) && !mobileToggle.contains(event.target)) {
                closeDrawer();
            }
        }
    }, { passive: true });

    // 3. Efek Aktif saat Menu di-Klik & Penutupan Drawer Otomatis
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const contextLinks = link.classList.contains('nav-link') 
                ? document.querySelectorAll('.nav-link') 
                : document.querySelectorAll('.mobile-nav-link');
                
            contextLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            // Tutup drawer jika salah satu link di dalamnya di-klik
            closeDrawer();
        });
    });
});
const themeToggle = document.getElementById('themeToggle');

// Sinkronisasi Tema Saat Halaman Pertama Kali Dimuat
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Event Listener Klik dengan Micro-Interaction
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// Premium Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.site-header');

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener('click', function(e) {

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const startPosition = window.pageYOffset;

            const targetPosition =
                target.getBoundingClientRect().top
                + startPosition
                - headerHeight
                - 16;

            const distance =
                targetPosition - startPosition;

            const duration = 900;

            let start = null;

            function easeInOutCubic(t) {

                return t < 0.5
                    ? 4 * t * t * t
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function animation(currentTime) {

                if (!start) start = currentTime;

                const elapsed =
                    currentTime - start;

                const progress =
                    Math.min(elapsed / duration, 1);

                window.scrollTo(
                    0,
                    startPosition +
                    distance *
                    easeInOutCubic(progress)
                );

                if (elapsed < duration) {

                    requestAnimationFrame(animation);

                }

            }

            requestAnimationFrame(animation);

        });

    });

});

// Reveal Animations
  document.addEventListener("DOMContentLoaded", function() {
    // Pengaturan deteksi: elemen akan memicu animasi saat 15% bagiannya sudah terlihat di layar
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Tambahkan class is-visible untuk memicu CSS
          entry.target.classList.add("is-visible");
          
          // Hentikan observasi setelah animasi berjalan sekali agar tidak berulang-ulang mengganggu mata
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Cari semua elemen yang memiliki class reveal atau stagger-group
    const revealElements = document.querySelectorAll(".reveal, .stagger-group");
    revealElements.forEach(el => observer.observe(el));
  });

  // CInematic Reveal Animations
  document.addEventListener("DOMContentLoaded", function() {
    // Pengaturan deteksi: elemen akan memicu animasi saat 15% bagiannya sudah terlihat di layar
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Tambahkan class is-visible untuk memicu CSS
          entry.target.classList.add("is-visible");
          
          // Hentikan observasi setelah animasi berjalan sekali agar tidak berulang-ulang mengganggu mata
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Cari semua elemen yang memiliki class reveal atau stagger-group
    const revealElements = document.querySelectorAll(".cine-reveal, .cine-stagger-group");
    revealElements.forEach(el => observer.observe(el));
  });
  
document.addEventListener("DOMContentLoaded", () => {
    // 2. High-Performance 3D Mouse Parallax Tilt Effect (Hanya Aktif di Desktop)
    const showcase = document.querySelector(".hero-showcase");
    const parallaxElements = document.querySelectorAll(".laptop-wrapper, .floating-card");

    if (showcase && window.innerWidth > 992) {
        let ticking = false;

        showcase.addEventListener("mousemove", (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = showcase.getBoundingClientRect();
                    // Menghitung titik pusat elemen showcase
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    parallaxElements.forEach(el => {
                        // Mengambil intensitas kedalaman unik dari atribut data-depth
                        const depth = parseFloat(el.getAttribute("data-depth")) || 0.1;
                        const moveX = x * depth;
                        const moveY = y * depth;

                        // Terapkan translasi koordinat & rotasi 3D dinamis
                        if (el.classList.contains("laptop-wrapper")) {
                            el.style.transform = `rotateY(${moveX * 0.05}deg) rotateX(${-moveY * 0.05}deg) translate3d(${moveX}px, ${moveY}px, 0)`;
                        } else {
                            el.style.transform = `translate3d(${moveX}px, ${moveY}px, 20px) scale(1.02)`;
                        }
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Kembalikan ke posisi semula dengan smooth saat kursor keluar area
        showcase.addEventListener("mouseleave", () => {
            window.requestAnimationFrame(() => {
                parallaxElements.forEach(el => {
                    el.style.transform = "";
                });
            });
        });
    }
});


// Insight Section
document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("latestInsights");
    const feedUrl = "https://antonify.com/feeds/posts/default/-/Insight?alt=json&max-results=3";

    fetch(feedUrl)
        .then(response => response.json())
        .then(data => {

            const entries = data.feed.entry || [];

            if (entries.length === 0) {
                container.innerHTML = '<div class="insight-loading">Belum ada insight terbaru.</div>';
                return;
            }

            let html = '';

            entries.forEach(entry => {

                const title = entry.title.$t;
                const linkObj = entry.link.find(item => item.rel === 'alternate');
                const link = linkObj ? linkObj.href : '#';
                const published = new Date(entry.published.$t);

                const date = published.toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });

                // Menghasilkan struktur item list premium dengan SVG inline-arrow terintegrasi
                html += `
                    <article class="latest-insight-item">
                        <a href="${link}" class="latest-insight-link">
                            <div class="latest-insight-content">
                                <div class="latest-insight-title">${title}</div>
                                <div class="latest-insight-date">${date}</div>
                            </div>
                            <span class="latest-insight-arrow">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </span>
                        </a>
                    </article>
                `;
            });

            container.innerHTML = html;

        })
        .catch(error => {
            console.error("Error fetching insights:", error);
            container.innerHTML = '<div class="insight-loading">Gagal memuat insight terbaru.</div>';
        });

});

// Back to Top
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {

    if (window.scrollY > 500) {

        backToTop.classList.add('show');

    } else {

        backToTop.classList.remove('show');

    }

});


backToTop.addEventListener('click', () => {

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});

// Pop up Whatsapp
const messageToggle = document.getElementById('messageToggle');
const contactModal = document.getElementById('contactModal');
const modalClose = document.getElementById('modalClose');

// Fungsi Enkapsulasi Buka Modal dengan Aksesibilitas
function openModal() {
    contactModal.classList.add('is-open');
    contactModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Kunci scroll layar belakang
}

// Fungsi Enkapsulasi Tutup Modal
function closeModal() {
    contactModal.classList.remove('is-open');
    contactModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Mengembalikan scroll layar utama
}

// Event Listeners Pemicu Kontrol
if (messageToggle) {
    messageToggle.addEventListener('click', openModal);
}

modalClose.addEventListener('click', closeModal);

// Tutup otomatis saat pengguna mengklik area luar kartu (Overlay)
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        closeModal();
    }
});

// Menutup modal dengan menekan tombol tombol 'Escape' di keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('is-open')) {
        closeModal();
    }
});

// Penanganan Form Pengiriman WhatsApp
document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Sanitasi value input agar bersih dari whitespace kosong berlebih
    const school = document.getElementById('schoolName').value.trim();
    const type = document.getElementById('schoolType').value;
    const discussion = document.getElementById('discussion').value.trim();

    const message = `Halo Antonify,

Saya tertarik untuk berdiskusi mengenai kebutuhan digital sekolah kami.

• Nama Sekolah : ${school}
• Jenjang Pendidikan : ${type}

Kebutuhan Utama Diskusi:
${discussion}

Terima kasih.`;

    // Nomor tujuan WhatsApp resmi Antonify
    const whatsappUrl = `https://wa.me/6282124327454?text=${encodeURIComponent(message)}`;

    // Buka tautan di tab baru dengan proteksi keamanan rel
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Tutup modal pasca submit selesai dilakukan
    closeModal();
});

// LIQUID GLOW
document.querySelectorAll('.liquid-glow').forEach(card => {
    // Inisialisasi data koordinat untuk teknik Lerping (Linear Interpolation)
    const state = {
        targetX: 0,
        targetY: 0,
        currentX: 0,
        currentY: 0,
        isHovered: false,
        animationFrameId: null
    };

    // Nilai Ease menentukan tingkat kelembutan seret cahaya (Semakin kecil = semakin lembut efek slidenya)
    const EASE_FACTOR = 0.085; 

    // Loop Animasi Performa Tinggi (Decoupled dari Event Mouse)
    const updateGlowPosition = () => {
        if (!state.isHovered && Math.abs(state.currentX - state.targetX) < 0.1 && Math.abs(state.currentY - state.targetY) < 0.1) {
            // Hentikan loop jika kursor keluar dan cahaya sudah sampai di titik tujuan terakhir
            cancelAnimationFrame(state.animationFrameId);
            state.animationFrameId = null;
            return;
        }

        // Rumus Inti Lerp: Current = Current + (Target - Current) * Ease
        state.currentX += (state.targetX - state.currentX) * EASE_FACTOR;
        state.currentY += (state.targetY - state.currentY) * EASE_FACTOR;

        // Terapkan koordinat hasil kalkulasi ke properti CSS variabel
        card.style.setProperty('--mouse-x', `${state.currentX.toFixed(2)}px`);
        card.style.setProperty('--mouse-y', `${state.currentY.toFixed(2)}px`);

        // Lanjutkan loop frame berikutnya
        state.animationFrameId = requestAnimationFrame(updateGlowPosition);
    };

    // Event Pelacakan Gerakan Kursor
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Simpan titik target koordinat asli kursor
        state.targetX = e.clientX - rect.left;
        state.targetY = e.clientY - rect.top;

        // Aktifkan loop jika belum berjalan
        if (!state.animationFrameId) {
            state.animationFrameId = requestAnimationFrame(updateGlowPosition);
        }
    });

    // Event Saat Kursor Masuk Area Kartu
    card.addEventListener('mouseenter', () => {
        state.isHovered = true;
    });

    // Event Saat Kursor Keluar Area Kartu
    card.addEventListener('mouseleave', () => {
        state.isHovered = false;
        
        // Buat target akhir meluncur sedikit ke tengah kartu saat kursor pergi sebelum memudar hilang
        const rect = card.getBoundingClientRect();
        state.targetX = rect.width / 2;
        state.targetY = rect.height / 2;
    });
});