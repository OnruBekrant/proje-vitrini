document.addEventListener('DOMContentLoaded', () => {
    const hexInput = document.getElementById('hex-input');
    const colorPreview = document.getElementById('color-preview');
    const message = document.getElementById('message');
    const body = document.body;

    /**
     * Girilen metnin geçerli bir hex kodu olup olmadığını kontrol eder.
     * Regex, başındaki # işaretini zorunlu tutar.
     * @param {string} hex - Kontrol edilecek metin.
     * @returns {boolean} - Geçerli olup olmadığı.
     */
    function isValidHex(hex) {
        return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
    }

    /**
     * Input'taki değere göre sayfa rengini ve önizlemeyi günceller.
     * Kullanıcının '#' girmesi zorunlu değildir.
     */
    function updateColor() {
        let hexValue = hexInput.value.trim();

        // Eğer kullanıcı '#' girmemişse ve input boş değilse, biz ekleyelim.
        if (hexValue.length > 0 && hexValue[0] !== '#') {
            hexValue = '#' + hexValue;
        }

        if (isValidHex(hexValue)) {
            body.style.backgroundColor = hexValue;
            colorPreview.style.backgroundColor = hexValue;
            message.textContent = ''; // Başarılıysa hata mesajını temizle
        } else {
            // Sadece input'ta bir değer varsa hata göster.
            if (hexInput.value.trim() !== '') {
                message.textContent = 'Geçersiz Hex Kodu!';
            } else {
                // Input boşsa hata mesajını da temizle
                message.textContent = '';
            }
        }
    }

    // Input alanına her karakter girildiğinde rengi güncelle
    hexInput.addEventListener('input', updateColor);

    // Sayfa ilk yüklendiğinde başlangıç rengini ayarla
    updateColor();
});
