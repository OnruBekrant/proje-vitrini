/*document.addEventListener('DOMContentLoaded', () => {
    const newCounterNameInput = document.getElementById('new-counter-name');
    const addCounterBtn = document.getElementById('add-counter-btn');
    const countersContainer = document.getElementById('counters-container');

    // Tarayıcının yerel deposundan sayaçları yükle, yoksa boş bir dizi başlat
    let counters = JSON.parse(localStorage.getItem('counters')) || [];

    // Sayaçları yerel depoya kaydeden fonksiyon
    const saveCounters = () => {
        localStorage.setItem('counters', JSON.stringify(counters));
    };

    // Sayaçları ekrana çizen (render eden) fonksiyon
    const renderCounters = () => {
        countersContainer.innerHTML = ''; // Konteyneri temizle
        if (counters.length === 0) {
            countersContainer.innerHTML = '<p style="text-align: center; color: #888; grid-column: 1 / -1;">Henüz hiç sayaç eklenmemiş.</p>';
        }

        counters.forEach(counter => {
            const counterCard = document.createElement('div');
            counterCard.classList.add('counter-card');
            counterCard.dataset.id = counter.id;

            counterCard.innerHTML = `
                <div class="counter-header">
                    <span class="counter-name">${counter.name}</span>
                    <button class="delete-btn" title="Sayacı Sil">&times;</button>
                </div>
                <div class="counter-body">
                    <button class="control-btn decrease-btn">-</button>
                    <span class="count">${counter.count}</span>
                    <button class="control-btn increase-btn">+</button>
                </div>
            `;
            countersContainer.appendChild(counterCard);
        });
    };

    // Yeni sayaç ekleme
    addCounterBtn.addEventListener('click', () => {
        const name = newCounterNameInput.value.trim();
        if (name) {
            const newCounter = {
                id: Date.now(), // Benzersiz bir ID oluşturur
                name: name,
                count: 0
            };
            counters.push(newCounter);
            newCounterNameInput.value = ''; // Input'u temizle
            saveCounters();
            renderCounters();
        }
    });
    
    // Enter tuşuyla da sayaç ekleyebilmek için
    newCounterNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addCounterBtn.click();
        }
    });

    // Artırma, azaltma ve silme butonlarına tıklama yönetimi
    countersContainer.addEventListener('click', (e) => {
        const target = e.target;
        const card = target.closest('.counter-card');
        if (!card) return;

        const id = Number(card.dataset.id);
        const counterIndex = counters.findIndex(c => c.id === id);
        
        if (counterIndex === -1) return;

        if (target.classList.contains('increase-btn')) {
            counters[counterIndex].count++;
        } else if (target.classList.contains('decrease-btn')) {
            counters[counterIndex].count--;
        } else if (target.classList.contains('delete-btn')) {
            if (confirm(`"${counters[counterIndex].name}" sayacını silmek istediğinize emin misiniz?`)) {
                counters.splice(counterIndex, 1);
            }
        }
        
        saveCounters();
        renderCounters();
    });

    // Sayfa ilk yüklendiğinde sayaçları ekrana çiz
    renderCounters();
});*/
document.addEventListener('DOMContentLoaded', () => {
    const newCounterNameInput = document.getElementById('new-counter-name');
    const addCounterBtn = document.getElementById('add-counter-btn');
    const countersContainer = document.getElementById('counters-container');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const exportBtn = document.getElementById('export-btn');
    const importFileInput = document.getElementById('import-file');

    let counters = JSON.parse(localStorage.getItem('counters')) || [];
    let currentTheme = localStorage.getItem('theme') || 'light';

    const saveCounters = () => {
        localStorage.setItem('counters', JSON.stringify(counters));
    };

    const applyTheme = (theme) => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        currentTheme = theme;
        localStorage.setItem('theme', theme);
    };

    const renderCounters = () => {
        countersContainer.innerHTML = '';
        if (counters.length === 0) {
            countersContainer.innerHTML = '<p style="text-align: center; color: #888; grid-column: 1 / -1;">Başlamak için bir sayaç ekleyin.</p>';
        }

        counters.forEach(counter => {
            const counterCard = document.createElement('div');
            counterCard.className = 'counter-card';
            counterCard.dataset.id = counter.id;

            const lastUpdated = counter.lastUpdated ? new Date(counter.lastUpdated).toLocaleString('tr-TR') : 'Hiç güncellenmedi';

            counterCard.innerHTML = `
                <div class="counter-header">
                    <span class="counter-name" contenteditable="false" spellcheck="false">${counter.name}</span>
                    <div class="counter-actions">
                        <button class="action-btn edit-btn" title="Düzenle"><i class="fa-solid fa-pen"></i></button>
                        <button class="action-btn reset-btn" title="Sıfırla"><i class="fa-solid fa-rotate-left"></i></button>
                        <button class="action-btn delete-btn" title="Sil"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <div class="counter-body">
                    <button class="control-btn decrease-btn">-</button>
                    <span class="count">${counter.count}</span>
                    <button class="control-btn increase-btn">+</button>
                </div>
                <div class="counter-footer">
                    Son Güncelleme: ${lastUpdated}
                </div>
            `;
            countersContainer.appendChild(counterCard);
        });
    };

    const updateCounter = (id, action, value = null) => {
        const counterIndex = counters.findIndex(c => c.id === id);
        if (counterIndex === -1) return;

        const counter = counters[counterIndex];
        let needsRender = true;

        switch (action) {
            case 'increase':
                counter.count++;
                break;
            case 'decrease':
                counter.count--;
                break;
            case 'reset':
                if (counter.count !== 0) counter.count = 0;
                else return; // Değişiklik yoksa güncelleme
                break;
            case 'rename':
                if (counter.name !== value) counter.name = value;
                else return; // Değişiklik yoksa güncelleme
                needsRender = false; // Sadece ismi değiştirdiğimiz için tam render gereksiz
                break;
            case 'delete':
                if (confirm(`"${counter.name}" sayacını silmek istediğinize emin misiniz?`)) {
                    counters.splice(counterIndex, 1);
                } else {
                    return; // Silme iptal edildi
                }
                break;
        }

        if (action !== 'rename' && action !== 'delete') {
           counter.lastUpdated = new Date().toISOString();
        }
        
        saveCounters();
        if (needsRender) {
            renderCounters();
        }
    };

    addCounterBtn.addEventListener('click', () => {
        const name = newCounterNameInput.value.trim();
        if (name) {
            const newCounter = {
                id: Date.now(),
                name: name,
                count: 0,
                lastUpdated: null
            };
            counters.push(newCounter);
            newCounterNameInput.value = '';
            saveCounters();
            renderCounters();
        }
    });

    newCounterNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addCounterBtn.click();
    });

    countersContainer.addEventListener('click', (e) => {
        const target = e.target;
        const card = target.closest('.counter-card');
        if (!card) return;

        const id = Number(card.dataset.id);
        
        if (target.closest('.increase-btn')) updateCounter(id, 'increase');
        if (target.closest('.decrease-btn')) updateCounter(id, 'decrease');
        if (target.closest('.reset-btn')) updateCounter(id, 'reset');
        if (target.closest('.delete-btn')) updateCounter(id, 'delete');
        if (target.closest('.edit-btn')) {
            const nameSpan = card.querySelector('.counter-name');
            nameSpan.contentEditable = true;
            nameSpan.focus();
            // Metnin sonuna imleci konumlandır
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(nameSpan);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
            
            nameSpan.addEventListener('blur', () => {
                nameSpan.contentEditable = false;
                updateCounter(id, 'rename', nameSpan.innerText.trim());
            }, { once: true }); // Olay dinleyici bir kez çalışıp kendini kaldırsın

            nameSpan.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    nameSpan.blur();
                }
            });
        }
    });

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    exportBtn.addEventListener('click', () => {
        const dataStr = JSON.stringify(counters, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `sayaclar_yedek_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });

    importFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedCounters = JSON.parse(e.target.result);
                if (Array.isArray(importedCounters) && confirm('Mevcut sayaçlarınızın üzerine içe aktarılan veriler yazılsın mı? Bu işlem geri alınamaz.')) {
                    counters = importedCounters;
                    saveCounters();
                    renderCounters();
                } else {
                    alert('Geçersiz dosya formatı.');
                }
            } catch (error) {
                alert('Dosya okunurken bir hata oluştu: ' + error.message);
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Aynı dosyayı tekrar seçebilmek için
    });
    
    // Sürükle-Bırak'ı başlat
    new Sortable(countersContainer, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: (evt) => {
            const element = counters.splice(evt.oldIndex, 1)[0];
            counters.splice(evt.newIndex, 0, element);
            saveCounters();
        }
    });

    // İlk yükleme
    applyTheme(currentTheme);
    renderCounters();
});