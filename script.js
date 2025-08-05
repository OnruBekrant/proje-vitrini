document.addEventListener('DOMContentLoaded', function() {
    // Gerekli DOM elementlerini seç
    const projectList = document.getElementById('project-list');
    const projectFrame = document.getElementById('project-frame');
    const welcomeMessage = document.getElementById('welcome-message');
    const searchInput = document.getElementById('search-input');
    
    // Mobil menü için yeni elementler
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const nav = document.getElementById('project-nav');
    const overlay = document.getElementById('overlay');

    let allProjects = [];

    /**
     * Verilen proje dizisine göre menü listesini ekrana çizer.
     * @param {Array} projectsToRender - Ekrana çizilecek projelerin dizisi.
     */
    function renderProjects(projectsToRender) {
        projectList.innerHTML = '';
        if (projectsToRender.length === 0) {
            projectList.innerHTML = '<li><span class="text-gray-500 px-3 py-2">Sonuç bulunamadı.</span></li>';
            return;
        }
        projectsToRender.forEach(project => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.src = project.yol;
            link.className = 'project-link flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200';
            const icon = document.createElement('i');
            project.ikon.split(' ').forEach(cls => icon.classList.add(cls));
            icon.classList.add('fa-fw', 'text-gray-400');
            const span = document.createElement('span');
            span.textContent = project.adi;
            link.appendChild(icon);
            link.appendChild(span);
            listItem.appendChild(link);
            projectList.appendChild(listItem);
        });
    }

    /**
     * projeler.json dosyasını okur ve projeleri ekrana ilk kez çizer.
     */
    async function loadProjects() {
        try {
            const response = await fetch('projeler.json');
            if (!response.ok) throw new Error(`HTTP hatası! Durum: ${response.status}`);
            allProjects = await response.json();
            renderProjects(allProjects);
        } catch (error) {
            console.error("Projeler yüklenemedi:", error);
            projectList.innerHTML = '<li><span class="text-red-400 px-3 py-2">Projeler yüklenemedi.</span></li>';
        }
    }

    /**
     * Mobil menüyü açar veya kapatır.
     */
    function toggleMenu() {
        nav.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    }

    // Arama kutusuna her karakter girildiğinde filtreleme yap
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const filteredProjects = allProjects.filter(project => 
            project.adi.toLowerCase().includes(searchTerm)
        );
        renderProjects(filteredProjects);
    });

    // Proje linklerine tıklama olayını yönet
    projectList.addEventListener('click', function(e) {
        const link = e.target.closest('.project-link');
        if (!link) return;
        e.preventDefault();

        const projectSrc = link.dataset.src;
        if (projectSrc && projectSrc !== 'about:blank') {
            welcomeMessage.classList.add('hidden');
            projectFrame.classList.remove('hidden');
            projectFrame.src = projectSrc;
        } else {
            projectFrame.classList.add('hidden');
            welcomeMessage.classList.remove('hidden');
            projectFrame.src = 'about:blank';
        }
        
        document.querySelectorAll('.project-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Mobil görünümde bir projeye tıklandığında menüyü kapat
        if (window.innerWidth < 768) {
            toggleMenu();
        }
    });

    // Mobil menü butonu ve overlay için olay dinleyicileri
    menuToggleBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Sayfa yüklendiğinde projeleri yükle
    loadProjects();
});
