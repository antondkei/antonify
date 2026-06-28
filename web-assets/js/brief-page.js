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
    showLoadingOverlay("Menyusun ringkasan data brief Anda...");
    
    try {
        const payload = {};
        
        // 1. Ekstraksi Data Input Teks, Select, Textarea secara komprehensif
        payload.schoolName = document.querySelector('#step-school input[placeholder*="Mojoagung"]')?.value || '';
        payload.educationLevel = document.getElementById('layanan')?.value || '';
        payload.foundationName = document.querySelector('#step-school input[placeholder*="Santo Yosef"]')?.value || '';
        
        const yearAndAccredInputs = document.querySelectorAll('#step-school .form-grid input, #step-school .form-grid select');
        payload.establishedYear = yearAndAccredInputs[0]?.value || '';
        payload.accreditation = document.getElementById('akreditasi')?.value || '';
        
        const contactInputs = document.querySelectorAll('#step-school .form-section:nth-of-type(2) input');
        payload.picName = contactInputs[0]?.value || '';
        payload.picRole = contactInputs[1]?.value || '';
        payload.whatsapp = contactInputs[2]?.value || '';
        payload.email = contactInputs[3]?.value || '';
        
        payload.address = document.querySelector('#step-school textarea')?.value || '';
        payload.oldWebsite = document.querySelector('#step-school input[type="url"]')?.value || '';
        
        // Data Step 2 (Identitas Brand)
        payload.motto = document.querySelector('#step-brand input[placeholder*="Love and Care"]')?.value || '';
        payload.tagline = document.querySelectorAll('#step-brand .form-grid input')[1]?.value || '';
        const textAreasBrand = document.querySelectorAll('#step-brand textarea');
        payload.vision = textAreasBrand[0]?.value || '';
        payload.mission = textAreasBrand[1]?.value || '';
        
        payload.colors = {
            primary: document.querySelectorAll('input[type="color"]')[0]?.value || '',
            secondary: document.querySelectorAll('input[type="color"]')[1]?.value || '',
            accent: document.querySelectorAll('input[type="color"]')[2]?.value || ''
        };
        
        const personalities = [];
        document.querySelectorAll('input[name="personality"]:checked').forEach(cb => personalities.push(cb.value));
        payload.personalities = personalities;
        payload.reflection = textAreasBrand[2]?.value || '';

        // Data Step 3 (Paket & Struktur)
        payload.package = document.querySelector('input[name="package"]:checked')?.value || '';
        const selectedPages = [];
        document.querySelectorAll('input[name="pages"]:checked').forEach(cb => selectedPages.push(cb.value));
        payload.pages = selectedPages;

        // Data Step 5 & 6 (Inspirasi & Tujuan)
        payload.referenceUrl = document.querySelector('input[type="url"].premium-input')?.value || '';
        payload.referenceReason = document.querySelector('.premium-textarea')?.value || '';
        
        const objectives = [];
        document.querySelectorAll('input[name="objectives"]:checked').forEach(cb => objectives.push(cb.value));
        payload.objectives = objectives;

        payload.additionalNotes = document.querySelector('textarea[placeholder*="catatan tambahan"]').value || '';

        // 2. Ekstraksi Berkas Lampiran Gambar & Dokumen
        showLoadingOverlay("Memproses konversi dokumen lampiran...");
        payload.files = [];
        const fileInputs = document.querySelectorAll('input[type="file"]');
        for (let input of fileInputs) {
            if (input.files && input.files.length > 0) {
                for (let file of input.files) {
                    const encodedFile = await fileToBase64(file);
                    encodedFile.fieldId = input.id || input.name || 'unspecified_asset';
                    payload.files.push(encodedFile);
                }
            }
        }

    // 3. Pengiriman Menggunakan Fetch API ke Web App GAS (Karena di-host di Blogger)
            showLoadingOverlay("Mengunggah berkas & menyusun PDF di Google Drive...");
            
            // ⚠️ GANTI DENGAN URL WEB APP GAS ANDA YANG BERAKHIRAN /exec
            const gasWebUrl = 'https://script.google.com/macros/s/AKfycbx9A_Yr1iuEOo8Fd7y1A4XyrPnwc-lRRDHD9bzdv-otgvjuKQVX8jhDhmWCMDh6_-m9/exec'; 

            fetch(gasWebUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8' // Menggunakan text/plain untuk bypass CORS di Blogger
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) throw new Error('Respon server bermasalah');
                return response.json();
            })
            .then(responseData => {
                // Langsung oper data ke handler sukses bawaan Anda
                handleBackendSuccess(responseData); 
            })
            .catch(err => {
                // Langsung oper error ke handler gagal bawaan Anda
                handleBackendFailure(err);
            });

    } catch (err) {
        alert("Gagal memproses formulir: " + err.toString());
        hideLoadingOverlay();
    }
}

// --- HANDLER RESPONS BACKEND ---
function handleBackendSuccess(response) {
    hideLoadingOverlay();
    if (response.success) {
        // Eksekusi download file PDF instan via blob klien tanpa meninggalkan tab halaman
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
        
        // Geser visual form langsung ke kartu ucapan terima kasih akhir (Success Card Screen)
        document.querySelector('.brief-content').innerHTML = `
            <div class="final-success-card" style="display:block; margin: 40px auto; max-width:650px;">
                <div class="final-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <circle cx="12" cy="12" r="10"></circle><path d="M8 12l3 3 5-6"></path>
                    </svg>
                </div>
                <h3>Brief Berhasil Dikirim & Diunduh!</h3>
                <p>Dokumen PDF Project Brief Anda telah sukses di-generate otomatis. Tim Antonify akan segera menganalisis data institusi Anda dan menghubungi Anda kembali melalui WhatsApp dalam waktu dekat.</p>
            </div>
        `;
        document.querySelector('.brief-footer').style.display = 'none';
        progressBarFill.style.width = '100%';
        progressText.innerText = `Project Submitted Successfully`;
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