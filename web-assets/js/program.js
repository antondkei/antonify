    const programData = {
        'stronger': { 
            title: 'Stronger Together', 
            svg: `<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`, 
            desc: 'Program ini difokuskan untuk memperbaiki dan memperkuat komunikasi antara orang tua dan anak remaja. Melalui sesi workshop interaktif dan bonding activities, kami memfasilitasi dialog yang jujur agar tercipta lingkungan rumah tangga yang mendukung pertumbuhan psikologis siswa.' 
        },
        'livein': { 
            title: 'Live In', 
            svg: `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`, 
            desc: 'Siswa akan tinggal selama beberapa hari di pedesaan atau komunitas marginal untuk mempelajari nilai-nilai kesederhanaan, kemandirian, dan kerja keras. Pengalaman ini dirancang untuk meruntuhkan tembok eksklusivitas dan membangun empati sosial yang nyata.' 
        },
        'cbc': { 
            title: 'Catholic Breakthrough Camp', 
            svg: `<svg viewBox="0 0 24 24"><path d="M4 22h16"></path><path d="M10 14l2-2 2 2"></path><path d="M12 2L2 22h20L12 2z"></path></svg>`, 
            desc: 'Sebuah retret spiritual mendalam yang menantang siswa untuk melakukan refleksi diri dan pembaharuan iman. Dengan suasana alam yang tenang, siswa diajak untuk menemukan kembali panggilan hidupnya sebagai pribadi yang melayani Tuhan dan sesama.' 
        },
        'leadership': { 
            title: 'Leadership Building Character', 
            svg: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`, 
            desc: 'Pelatihan kepemimpinan yang menggabungkan kedisiplinan fisik dan ketajaman berpikir. Siswa dilatih untuk memimpin kelompok kecil, menyelesaikan masalah secara kreatif, dan bertanggung jawab atas setiap keputusan yang diambil di bawah tekanan.' 
        },
        'festival': { 
            title: 'Festival Seniora', 
            svg: `<svg viewBox="0 0 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.03453 19.176 5.09631 19.4316 5.01637 19.6714C4.84643 20.1813 4.96582 20.7423 5.34114 21.1176C5.71646 21.493 6.27743 21.6124 6.78735 21.4424C7.02717 21.3625 7.2828 21.4243 7.45876 21.6002C9.26252 22.404 10.7332 22 12 22z"></path><circle cx="7.5" cy="10.5" r="1" fill="currentColor"></circle><circle cx="11.5" cy="7.5" r="1" fill="currentColor"></circle><circle cx="16.5" cy="9.5" r="1" fill="currentColor"></circle></svg>`, 
            desc: 'Perayaan tahunan yang menampilkan bakat terbaik siswa di bidang musik, tari, drama, dan rupa. Acara ini bukan sekadar kompetisi, melainkan sarana kolaborasi lintas angkatan untuk merayakan keberagaman bakat dan semangat kekeluargaan.' 
        },
        'outing': { 
            title: 'Outing Class', 
            svg: `<svg viewBox="0 0 24 24"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>`, 
            desc: 'Dunia adalah laboratorium belajar terbesar. Melalui kunjungan ke museum, institusi riset, situs bersejarah, atau industri kreatif, siswa diajarkan untuk menghubungkan teori buku dengan aplikasi praktis di lapangan.' 
        },
        'cooking': { 
            title: 'Cooking With Sanyus', 
            svg: `<svg viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>`, 
            desc: 'Program kuliner yang mengajarkan lebih dari sekadar memasak. Di sini siswa belajar manajemen biaya, higienitas, presentasi produk, hingga strategi pemasaran sederhana untuk menumbuhkan jiwa entrepreneur sejak dini.' 
        },
        'sip': { 
            title: 'Spiritual\'s Inspire (SIP)', 
            svg: `<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`, 
            desc: 'Inisiatif doa bersama yang melibatkan unit keluarga secara aktif. SIP bertujuan mengintegrasikan nilai-nilai spiritual dalam kehidupan sehari-hari melalui sesi doa terpandu dan pembagian refleksi harian yang menginspirasi.' 
        },
        'inspire': { 
            title: 'Inspire\'s Moment', 
            svg: `<svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`, 
            desc: 'Setiap minggu, siswa berkumpul untuk mendengarkan dan mendiskusikan kisah nyata dari tokoh-tokoh dunia maupun lokal yang telah memberikan dampak positif. Fokus utama adalah ekstraksi nilai keberanian, kejujuran, dan ketangguhan.' 
        }
    };

    function openModal(id) {
        const data = programData[id];
        const overlay = document.getElementById('modalOverlay');
        
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalIcon').innerHTML = data.svg;
        document.getElementById('modalDescription').innerText = data.desc;
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const overlay = document.getElementById('modalOverlay');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    document.getElementById('modalOverlay').addEventListener('click', (e) => {
        if (e.target === document.getElementById('modalOverlay')) closeModal();
    });
