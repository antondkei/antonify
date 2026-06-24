document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    "Saya mengasihi Yesus dan saya haus untuk menyebarkan ajaran-Nya kepada semakin banyak orang.",
    "Saya berusaha menjadi seorang Katolik yang beriman dan taat beribadah.",
    "Saya mencintai kehidupan doa dan berusaha untuk mengembangkannya menjadi lebih baik.",
    "Saya ingin membaktikan hidup saya dalam pelayanan kepada Gereja.",
    "Saya merasakan dorongan untuk menjadi seorang imam (walaupun itu tidak selalu kuat).",
    "Ada orang yang mengatakan bahwa saya dapat menjadi seorang imam yang baik.",
    "Membaca Kitab Suci sambil berdoa membuat saya merasa memiliki dorongan untuk menjadi seorang imam.",
    "Saya berusaha untuk menghidupi norma-norma Kristiani dan hidup dalam kesucian.",
    "Saya senang bergaul dengan orang banyak dan memiliki keterampilan sosial yang cukup untuk melibatkan orang lain.",
    "Saya memiliki kemampuan intelektual yang cukup untuk menyelesaikan pendidikan hingga tingkat pascasarjana.",
    "Saya memiliki fisik, emosional, dan psikologis yang sehat untuk menjadi seorang imam.",
    "Saya orang yang periang dan memiliki selera humor yang baik.",
    "Saya sepertinya memiliki hati seorang gembala yang berempati terhadap penderitaan orang lain dan ingin membantu banyak orang untuk dekat pada Tuhan.",
    "Saya mau mengembangkan pengendalian diri (ugahari) untuk menjadi seorang imam yang baik.",
    "Secara umum, saya telah memiliki gaya hidup yang stabil dan sehat.",
    "Orang-orang yang mengenal saya mengatakan bahwa saya seorang Katolik yang baik.",
    "Peristiwa-peristiwa dalam hidupku nampaknya merupakan tanda yang mengarah kepada imamat.",
    "Saya biasanya mampu menerima keberhasilan dan kegagalan tanpa kehilangan kedamaian.",
    "Saya yakin bahwa saya memiliki perkembangan dan orientasi psikoseksual yang sehat.",
    "Saya berusaha untuk benar-benar terbuka pada kehendak Tuhan dalam hidup saya."
  ];

  let currentTrack = 0;
  let userScores = new Array(questions.length).fill(null);

  // Elemen DOM
  const interactiveZone = document.getElementById("quiz-interactive-zone");
  const questionText = document.getElementById("question-text");
  const progressText = document.getElementById("progress-text");
  const progressPercent = document.getElementById("progress-percent");
  const progressFill = document.getElementById("progress-fill");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const scaleBtns = document.querySelectorAll(".scale-btn");
  
  const screenQuestions = document.getElementById("quiz-screen-questions");
  const screenResults = document.getElementById("quiz-screen-results");
  const finalScoreDisplay = document.getElementById("final-score");
  const interpretationText = document.getElementById("interpretation-text");
  const btnRestart = document.getElementById("btn-restart");

  // Fungsi Transisi Elegan (Fade out -> Swap Data -> Fade in)
  function executeSmoothTransition(updateStateCallback) {
    interactiveZone.classList.add("sp-blur-out");

    // Tunggu animasi blur keluar selesai (400ms)
    setTimeout(() => {
      updateStateCallback();
      // Kembalikan ke kondisi normal (Fading In)
      interactiveZone.classList.remove("sp-blur-out");
    }, 400);
  }

  // Fungsi Render Pertanyaan (Inti Data)
  function renderQuestionData() {
    questionText.innerHTML = `${currentTrack + 1}. ${questions[currentTrack]}`;

    // Update Progress Bar
    const progressCurrent = currentTrack + 1;
    const percent = Math.round((progressCurrent / questions.length) * 100);
    progressText.innerText = `Pertanyaan ${progressCurrent} dari ${questions.length}`;
    progressPercent.innerText = `${percent}%`;
    progressFill.style.width = `${percent}%`;

    // Atur status aktif tombol angka skala
    scaleBtns.forEach(btn => {
      btn.classList.remove("active");
      if (userScores[currentTrack] !== null && btn.getAttribute("data-value") == userScores[currentTrack]) {
        btn.classList.add("active");
      }
    });

    // Kontrol Tombol Navigasi
    btnPrev.disabled = (currentTrack === 0);
    btnNext.disabled = (userScores[currentTrack] === null);

    if (currentTrack === questions.length - 1) {
      btnNext.innerText = "Lihat Hasil Tes";
    } else {
      btnNext.innerText = "Pertanyaan Berikutnya";
    }
  }

  // Handler Klik Angka Skor (0-5)
  scaleBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const selectedValue = parseInt(this.getAttribute("data-value"));
      userScores[currentTrack] = selectedValue;

      scaleBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      btnNext.disabled = false;
    });
  });

  // Handler Tombol Navigasi Lanjut (Menggunakan Efek Transisi)
  btnNext.addEventListener("click", function () {
    if (currentTrack < questions.length - 1) {
      executeSmoothTransition(() => {
        currentTrack++;
        renderQuestionData();
      });
    } else {
      // Untuk transisi ke halaman hasil akhir
      screenQuestions.style.opacity = "0";
      setTimeout(() => {
        screenQuestions.style.display = "none";
        calculateAndShowResults();
      }, 400);
    }
  });

  // Handler Tombol Navigasi Mundur (Menggunakan Efek Transisi)
  btnPrev.addEventListener("click", function () {
    if (currentTrack > 0) {
      executeSmoothTransition(() => {
        currentTrack--;
        renderQuestionData();
      });
    }
  });

  // Kalkulasi Skor Akhir
  function calculateAndShowResults() {
    const totalScore = userScores.reduce((sum, val) => sum + val, 0);
    finalScoreDisplay.innerText = totalScore;

    let analysis = "";
    if (totalScore > 70) {
      analysis = `<strong>Skor di atas 70 (${totalScore})</strong> berarti Anda diajak sungguh mempertimbangkan panggilan Imamat lebih jauh. Namun, perlu diingat bahwa skor yang tinggi belum cukup menjadi bukti langsung bahwa Anda dipanggil untuk menjadi seorang imam. Panggilan membutuhkan proses diskresi (pembedaan roh) yang mendalam bersama Gereja.`;
    } else if (totalScore >= 50 && totalScore <= 70) {
      analysis = `<strong>Skor Anda berada di fase menengah (${totalScore})</strong>. Ini mengindikasikan adanya benih-benih ketertarikan spiritual dan dasar kehidupan Katolik yang baik. Anda disarankan untuk meluangkan waktu lebih intim dalam doa harian demi menguji stabilitas arah panggilan tersebut secara jernih.`;
    } else {
      analysis = `<strong>Skor di bawah 50 (${totalScore})</strong> berarti Anda perlu untuk mengembangkan kehidupan rohani Anda. Namun, itu juga tidak secara otomatis menutup kemungkinan Anda dari panggilan untuk menjadi seorang imam di masa depan.`;
    }

    interpretationText.innerHTML = analysis;
    screenResults.style.display = "block";
    document.getElementById("quiz-container").scrollIntoView({ behavior: 'smooth' });
  }

  // Reset Kuis
  btnRestart.addEventListener("click", function () {
    currentTrack = 0;
    userScores = new Array(questions.length).fill(null);
    screenResults.style.display = "none";
    screenQuestions.style.display = "block";
    screenQuestions.style.opacity = "1";
    renderQuestionData();
  });

  // Ambil inisialisasi awal kuis tanpa animasi agar instan saat load pertama
  renderQuestionData();
});