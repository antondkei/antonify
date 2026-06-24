        function sendWhatsApp() {
            const name = document.getElementById('name').value;
            const category = document.getElementById('category').value;
            const message = document.getElementById('message').value;

            if (!name || !category || !message) {
                alert('Silakan lengkapi semua field yang tersedia.');
                return;
            }

            const phoneNumber = '6282190006065';
            const formattedMessage = `Nama: ${name}\nKategori: ${category}\nPesan: ${message}`;
            const encodedMessage = encodeURIComponent(formattedMessage);
            const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            window.open(waUrl, '_blank');
        }

        document.querySelector('.mobile-toggle').addEventListener('click', () => {
            alert('Mobile menu toggle triggered');
        });