// ==========================================================================
// AUTOMATED WEBSITE STRUCTURE & ETA CALCULATOR SYSTEM
// ==========================================================================

function updateLiveStructureSummary() {
    // 1. Ambil semua checkbox halaman yang sedang dicentang oleh user
    // (Memastikan selector mengarah ke name="pages" atau class .page-card Anda)
    const checkedPages = document.querySelectorAll('.page-card input[type="checkbox"]:checked');
    const totalPages = checkedPages.length;

    // 2. Ambil elemen target Summary UI
    const txtPageCount = document.getElementById('calc-page-count');
    const txtPackageTier = document.getElementById('calc-package-tier');
    const txtEtaDelivery = document.getElementById('calc-eta-delivery');

    // Proteksi jika elemen tidak ditemukan di halaman aktif
    if (!txtPageCount || !txtPackageTier || !txtEtaDelivery) return;

    // Update jumlah halaman yang terpilih ke UI
    txtPageCount.innerText = `${totalPages} Halaman`;

    // 3. Matriks Logika Penentuan Otoritatif Paket & Estimasi Waktu (ETA)
    let recommendedValue = 'starter';
    let packageText = 'STARTER';
    let etaText = '3–5 Hari Kerja';

    if (totalPages > 5 && totalPages <= 10) {
        recommendedValue = 'standard';
        packageText = 'STANDAR';
        etaText = '7–10 Hari Kerja';
    } else if (totalPages > 10) {
        recommendedValue = 'premium';
        packageText = 'PREMIUM';
        etaText = '12–15 Hari Kerja';
    }

    // Perbarui teks informasi pada komponen Summary
    txtPackageTier.innerText = packageText;
    txtEtaDelivery.innerText = etaText;

    // 4. SINKRONISASI OTOMATIS: Nyalakan efek aktif pada kartu .package-card di atasnya
    // Menggunakan kecocokan nilai value radio: 'starter', 'standard', atau 'premium'
    const targetRadio = document.querySelector(`.package-card input[type="radio"][value="${recommendedValue}"]`);
    if (targetRadio && !targetRadio.checked) {
        targetRadio.checked = true;
        // Pemicu event change agar browser mendeteksi perubahan state manipulasi JS
        targetRadio.dispatchEvent(new Event('change', { bubbles: true }));
    }
}

// ==========================================================================
// INISIALISASI EVENT LISTENERS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Ambil seluruh input checkbox halaman
    const pageCheckboxes = document.querySelectorAll('.page-card input[type="checkbox"]');
    
    // Dengarkan setiap kali ada klik/perubahan pada kartu halaman
    pageCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateLiveStructureSummary);
    });

    // Jalankan fungsi satu kali di awal untuk setelan bawaan saat halaman dimuat
    updateLiveStructureSummary();
});

/* ==========================================================================
   ANTONIFY MULTI-STEP FORM & GAS INTEGRATION SYSTEM
   ========================================================================== */

// --- STATE MANAGEMENT & DOM INITIALIZATION ---
let currentStep = 0; // 0 = Welcome Screen, 1-7 = Steps Fungsional
const briefSteps = document.querySelectorAll('.brief-step');
const sidebarItems = document.querySelectorAll('.brief-navigation .step-item');
const progressBarFill = document.querySelector('.progress-fill');
const progressText = document.querySelector('.progress-text');
const btnBack = document.querySelector('.brief-footer .btn-outline');
const btnContinue = document.querySelector('.brief-footer .btn-primary');

// --- INTEGRASI PENGELOLAAN UNGGAHAN BERKAS (FUNGSI ASLI ANDA YANG DIOPTIMALKAN) ---
document.querySelectorAll('input[type="file"]').forEach(input => {
    let dataTransferContainer = new DataTransfer();
    
    input.addEventListener('change', function() {
        const card = this.closest('.form-group, .asset-card');
        if (!card) return;
        
        // Gabungkan berkas baru ke kontainer
        for (let file of this.files) {
            dataTransferContainer.items.add(file);
        }
        this.files = dataTransferContainer.files;
        renderSelectedFiles(card, dataTransferContainer, this);
        triggerValidation();
    });
});

function renderSelectedFiles(card, dt, inputElement) {
    let listContainer = card.querySelector('.uploaded-files-list');
    if (!listContainer) {
        // Jika belum ada kontainer list di HTML, buat otomatis untuk penempatan rapi
        listContainer = document.createElement('div');
        listContainer.className = 'uploaded-files-list';
        card.appendChild(listContainer);
    }
    listContainer.innerHTML = '';
    
    Array.from(dt.files).forEach((file, index) => {
        const row = document.createElement('div');
        row.className = 'asset-upload-action';
        row.style.margin = "8px 0";
        row.innerHTML = `
            <div class="file-status">
                <svg viewBox="0 0 20 20" fill="currentColor" style="width:16px; height:16px; color:#10b981;">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 220px; font-size: 13px; font-weight:500;">
                    ${file.name}
                </span>
            </div>
            <button type="button" class="btn-remove-file" style="color:#ef4444; border:none; background:none; cursor:pointer; font-size:12px; font-weight:600;">Hapus</button>
        `;
        
        row.querySelector('.btn-remove-file').addEventListener('click', () => {
            dt.items.remove(index);
            inputElement.files = dt.files;
            renderSelectedFiles(card, dt, inputElement);
            triggerValidation();
        });
        listContainer.appendChild(row);
    });
}

// --- SISTEM VALIDASI & NAVIGASI MULTI-STEP ---
function validateCurrentStep() {
    const currentStepEl = briefSteps[currentStep];
    if (!currentStepEl) return true;

    // Khusus Step 7: Validasi seluruh checkbox konfirmasi wajib dicentang
    if (currentStep === 7) {
        const confirmationCheckboxes = currentStepEl.querySelectorAll('.final-confirm-item input[type="checkbox"]');
        let allChecked = true;
        confirmationCheckboxes.forEach(cb => { if (!cb.checked) allChecked = false; });
        return allChecked;
    }

    // Periksa kolom input, textarea, dan select dengan atribut HTML 'required' pada step aktif
    const requiredFields = currentStepEl.querySelectorAll('input[required], textarea[required], select[required]');
    for (let field of requiredFields) {
        if (field.type === 'checkbox' || field.type === 'radio') {
            if (!field.checked) return false;
        } else {
            if (!field.value.trim()) return false;
        }
    }
    return true;
}

function triggerValidation() {
    const isValid = validateCurrentStep();
    if (isValid) {
        btnContinue.disabled = false;
        btnContinue.style.opacity = "1";
        btnContinue.style.cursor = "pointer";
    } else {
        btnContinue.disabled = true;
        btnContinue.style.opacity = "0.4";
        btnContinue.style.cursor = "not-allowed";
    }
}

function updateStepUI() {
    // Tampilkan panel langkah aktif, sembunyikan sisanya
    briefSteps.forEach((step, idx) => {
        step.style.display = (idx === currentStep) ? 'block' : 'none';
        if (idx === currentStep) step.classList.add('active');
    });

    // Sinkronisasi status navigasi sidebar kiri
    sidebarItems.forEach((item, idx) => {
        if (currentStep > 0 && idx === currentStep - 1) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
        
        // Membatasi akses klik acak sidebar sebelum step divalidasi
        if (idx >= currentStep) {
            item.style.opacity = "0.5";
            item.style.pointerEvents = "none";
        } else {
            item.style.opacity = "1";
            item.style.pointerEvents = "auto";
        }
    });

    // Mengubah tekstur & konten tombol navigasi bawah
    if (currentStep === 0) {
        btnBack.style.display = 'none';
        btnContinue.innerHTML = `<span>Mulai Pengisian</span><svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
    } else {
        btnBack.style.display = 'inline-flex';
        btnBack.innerText = 'Kembali';
        
        if (currentStep === briefSteps.length - 1) {
            btnContinue.innerHTML = `<span>Kirim Project Brief</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; margin-left:8px; display:inline-block; vertical-align:middle;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`;
        } else {
            btnContinue.innerHTML = `<span>Lanjutkan</span><svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
        }
    }

    // Atur visual bar kemajuan (Progress Bar)
    const activeProgressStep = currentStep === 0 ? 1 : currentStep;
    const computedPercentage = (activeProgressStep / 7) * 100;
    progressBarFill.style.width = `${computedPercentage}%`;
    progressText.innerText = `Step ${activeProgressStep} of 7`;

    // Eksekusi kunci pengisian
    triggerValidation();
}

// --- EVENT LISTENERS NAVIGASI ---
btnContinue.addEventListener('click', () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep === briefSteps.length - 1) {
        processFormSubmission(); // Eksekusi kirim akhir ke GAS
    } else {
        currentStep++;
        updateStepUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateStepUI();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Pemantau perubahan kolom pengisian formulir
document.addEventListener('input', triggerValidation);
document.addEventListener('change', triggerValidation);

// --- KOMPILASI DATA & PROSES SUBMIT GAS ---
async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({
            filename: file.name,
            mimeType: file.type,
            base64Data: reader.result.split(',')[1]
        });
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

async function processFormSubmission() {
    showLoadingOverlay("Menyusun seluruh data brief Anda...");
    
    try {
        const payload = {};
        
        // 1. DATA SEKOLAH (STEP 1)
        payload.schoolName = document.querySelector('input[placeholder*="SDK Wijana Mojoagung"]')?.value || '';
        payload.educationLevel = document.getElementById('layanan')?.value || '';
        payload.foundationName = document.querySelector('input[placeholder*="Yayasan Pendidikan"]')?.value || '';
        
        const akredInput = document.getElementById('akreditasi');
        payload.accreditation = akredInput ? akredInput.value : '';
        // Cari input Tahun Berdiri (input persis sebelum akreditasi)
        payload.establishedYear = akredInput?.closest('.form-grid')?.querySelector('input[type="text"]')?.value || '';
        
        const contactInputs = document.querySelectorAll('input[placeholder*="Antonius"], input[placeholder*="Operator"], input[placeholder*="0812"], input[type="email"]');
        payload.picName = contactInputs[0]?.value || '';
        payload.picRole = contactInputs[1]?.value || '';
        payload.whatsapp = contactInputs[2]?.value || '';
        payload.email = contactInputs[3]?.value || '';
        
        payload.address = document.querySelector('.brief-step:nth-child(2) textarea')?.value || ''; 
        payload.oldWebsite = document.querySelector('input[type="url"]')?.value || '';

        // 2. DATA BRAND & IDENTITAS (STEP 2)
        const colors = document.querySelectorAll('input[type="color"]');
        payload.colorPrimary = colors[0]?.value || '';
        payload.colorSecondary = colors[1]?.value || '';
        payload.colorAccent = colors[2]?.value || '';
        
        const step2TextAreas = document.querySelectorAll('.brief-step:nth-child(3) textarea');
        payload.vision = step2TextAreas[0]?.value || '';
        payload.mission = step2TextAreas[1]?.value || '';
        payload.reflection = step2TextAreas[2]?.value || ''; // DATA REFLEKSI / ESENSI MEMORI

        const textInputsBrand = document.querySelectorAll('.brief-step:nth-child(3) input[type="text"]');
        payload.motto = textInputsBrand[0]?.value || '';
        payload.tagline = textInputsBrand[1]?.value || '';

        const urlInputsBrand = document.querySelectorAll('.brief-step:nth-child(3) input[type="url"]');
        payload.instagram = urlInputsBrand[0]?.value || '';
        payload.facebook = urlInputsBrand[1]?.value || '';
        payload.youtube = urlInputsBrand[2]?.value || '';

        const personalities = [];
        document.querySelectorAll('input[name="personality"]:checked').forEach(cb => {
            personalities.push(cb.closest('label').textContent.trim());
        });
        payload.personalities = personalities;

        // 3. STRUKTUR & FITUR (STEP 3)
        payload.package = document.querySelector('.package-card input[type="radio"]:checked')?.value || document.querySelector('input[name="package"]:checked')?.value || '';
        
        const pages = [];
        document.querySelectorAll('input[name="pages"]:checked').forEach(cb => {
            pages.push(cb.closest('label').querySelector('h4')?.textContent.trim() || cb.value);
        });
        payload.pages = pages;

        const features = [];
        document.querySelectorAll('input[name="features"]:checked').forEach(cb => {
            features.push(cb.closest('label').textContent.trim() || cb.value);
        });
        payload.features = features; // DATA FITUR LANJUTAN

        // 4. MATERI KONTEN (STEP 4)
        const step4TextAreas = document.querySelectorAll('.brief-step:nth-child(5) textarea');
        payload.sejarah = step4TextAreas[0]?.value || '';
        payload.programUnggulan = step4TextAreas[1]?.value || '';

        // 5. INSPIRASI DESAIN (STEP 5)
        const step5InputsUrl = document.querySelectorAll('.brief-step:nth-child(6) input[type="url"]');
        payload.refWebsite = step5InputsUrl[0]?.value || ''; // URL REFERENSI
        
        const step5TextAreas = document.querySelectorAll('.brief-step:nth-child(6) textarea');
        payload.refReason = step5TextAreas[0]?.value || ''; // ALASAN SUKA
        payload.avoidElements = step5TextAreas[1]?.value || ''; // HAL DIHINDARI
        payload.messageToTeam = step5TextAreas[2]?.value || ''; // PESAN / CATATAN ANTONIFY
        
        const likedElements = [];
        document.querySelectorAll('.inspiration-card input[type="checkbox"]:checked').forEach(cb => {
            likedElements.push(cb.nextElementSibling?.textContent.trim() || cb.closest('label').textContent.trim());
        });
        payload.likedElements = likedElements; // ELEMEN DISUKAI

        // 6. TUJUAN (STEP 6)
        const objectives = [];
        document.querySelectorAll('.objective-card input[type="checkbox"]:checked').forEach(cb => {
            objectives.push(cb.closest('label').querySelector('h4')?.textContent.trim() || cb.value);
        });
        payload.objectives = objectives;
        
        const targets = [];
        document.querySelectorAll('.target-chip input[type="checkbox"]:checked').forEach(cb => {
            targets.push(cb.nextElementSibling?.textContent.trim() || cb.value);
        });
        payload.targets = targets;
        payload.harapan = document.querySelector('.brief-step:nth-child(7) textarea')?.value || '';

        // 7. CATATAN AKHIR (STEP 7)
        payload.catatanTambahan = document.querySelector('.brief-step:nth-child(8) textarea')?.value || '';

        // 8. PROSES FILES KE BASE64
        showLoadingOverlay("Memproses konversi dokumen lampiran...");
        payload.files = [];
        const fileInputs = document.querySelectorAll('input[type="file"]');
        for (let input of fileInputs) {
            if (input.files && input.files.length > 0) {
                for (let file of input.files) {
                    const encodedFile = await fileToBase64(file);
                    encodedFile.fieldId = input.closest('.asset-card, .form-group')?.querySelector('h4, label')?.textContent.trim() || input.name || 'Berkas';
                    payload.files.push(encodedFile);
                }
            }
        }

        // 9. FETCH KE GAS
        showLoadingOverlay("Mengunggah berkas & merangkum PDF di Google Drive...");
        // ⚠️ PASTIKAN URL WEB APP GAS ANDA BENAR DI BAWAH INI
        const gasWebUrl = 'https://script.google.com/macros/s/AKfycbx2oMTALQJgegJAhGqc3eOgcmNoSjcMy0xOcdFHcFc2495KMnhLJ6Es5maTuGkZsXrn/exec'; 

        fetch(gasWebUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(responseData => handleBackendSuccess(responseData))
        .catch(err => handleBackendFailure(err));

    } catch (err) {
        alert("Gagal memproses formulir: " + err.toString());
        hideLoadingOverlay();
    }
}

// --- HANDLER RESPONS BACKEND ---
function handleBackendSuccess(response) {
    hideLoadingOverlay();
    if (response.success) {
        // 1. Eksekusi download file PDF instan via blob
        try {
            const byteCharacters = atob(response.pdfBase64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
            
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = response.filename;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (downloadErr) {
            console.error("Gagal mendownload PDF secara otomatis: ", downloadErr);
        }
        
        // 2. Perombakan Tampilan UI (Dibuat Aman dari Error "null")
        // Skrip akan mencari elemen mana yang tersedia di HTML Anda
        const mainContainer = document.querySelector('.brief-content') || document.querySelector('.step-content') || document.querySelector('.form-container');
        
        if (mainContainer) {
            mainContainer.innerHTML = `
                <div class="final-success-card" style="display:block; margin: 40px auto; max-width:650px; text-align:center; padding: 40px; background: rgba(255,255,255,0.8); border-radius: 20px; border: 1px solid #e2e8f0;">
                    <div class="final-success-icon" style="margin-bottom: 20px; color: #4338CA;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 64px; height: 64px; margin: 0 auto;">
                            <circle cx="12" cy="12" r="10"></circle><path d="M8 12l3 3 5-6"></path>
                        </svg>
                    </div>
                    <h3 style="font-size: 24px; color: #1e293b; margin-bottom: 12px; font-family: 'Clash Display', sans-serif;">Brief Berhasil Dikirim!</h3>
                    <p style="color: #64748b; font-size: 15px; line-height: 1.6;">Dokumen PDF Project Brief Anda telah sukses diunduh otomatis. Tim Antonify akan segera menganalisis data institusi Anda dan menghubungi Anda kembali melalui WhatsApp.</p>
                </div>
            `;
        }

        // Cek dan sembunyikan footer jika elemennya ada
        const briefFooter = document.querySelector('.brief-footer');
        if (briefFooter) briefFooter.style.display = 'none';

        // Cek dan perbarui progress bar jika elemennya ada
        const pFill = document.querySelector('.progress-fill');
        const pText = document.querySelector('.progress-text');
        if (pFill) pFill.style.width = '100%';
        if (pText) pText.innerText = `Project Submitted Successfully`;

    } else {
        alert("Server Error: " + response.error);
    }
}

function handleBackendFailure(error) {
    hideLoadingOverlay();
    alert("Koneksi gagal: " + error.toString());
}

// --- KOLEKSI UI UTILITY OVERLAY LOADING PREMIUM ---
function showLoadingOverlay(message) {
    let overlay = document.getElementById('premium-loading-screen');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'premium-loading-screen';
        overlay.innerHTML = `
            <div class="loader-box" style="text-align:center; background:rgba(255,255,255,0.92); padding:40px; border-radius:24px; box-shadow:0 20px 40px rgba(0,0,0,0.1); backdrop-filter:blur(10px);">
                <div class="spinner" style="width:50px; height:50px; border:4px dashed #4338CA; border-radius:50%; margin:0 auto 20px; animation: spin 1.5s linear infinite;"></div>
                <h4 id="loading-text" style="color:#1e293b; font-family:'General Sans',sans-serif; font-size:16px; font-weight:600;">${message}</h4>
            </div>
            <style>
                #premium-loading-screen { position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15,23,42,0.6); display:flex; align-items:center; justify-content:center; z-index:99999; }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
        `;
        document.body.appendChild(overlay);
    } else {
        document.getElementById('loading-text').innerText = message;
        overlay.style.display = 'flex';
    }
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('premium-loading-screen');
    if (overlay) overlay.style.display = 'none';
}

// Jalankan inisialisasi awal saat halaman termuat sempurna
document.addEventListener('DOMContentLoaded', updateStepUI);