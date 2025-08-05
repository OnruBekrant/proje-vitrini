Proje Vitrini

Bu proje, çeşitli web tabanlı mini projeleri tek bir arayüz altında sergilemek için oluşturulmuş dinamik ve modern bir portföy uygulamasıdır. Ana arayüz, projeler arasında kolayca geçiş yapmayı sağlayan bir navigasyon menüsü ve seçilen projenin görüntülendiği bir içerik alanından oluşur.
✨ Özellikler

    Dinamik Proje Listesi: Sol menüdeki proje listesi, projeler.json dosyasından otomatik olarak okunur. Yeni proje eklemek için HTML'e dokunmanıza gerek yoktur.

    Canlı Arama: Proje sayısı arttıkça istediğiniz projeyi hızlıca bulabilmeniz için anında filtreleme yapan bir arama çubuğu bulunur.

    İzole Proje Ortamı: Her bir proje, kendi HTML, CSS ve JavaScript dosyalarıyla birlikte bir <iframe> içinde çalışır. Bu sayede projelerin stilleri ve kodları birbiriyle çakışmaz.

    Modern ve Duyarlı Tasarım: Tailwind CSS ile oluşturulmuş şık, modern ve tüm ekran boyutlarına (mobil, tablet, masaüstü) uyumlu bir arayüze sahiptir.

    Kolay Genişletilebilirlik: Yeni bir proje eklemek, sadece dosyaları ilgili klasöre kopyalamak ve projeler.json dosyasına yeni bir giriş eklemek kadar basittir.

📂 Proje Yapısı

Proje, kodun daha okunaklı ve yönetilebilir olması için mantıksal olarak dosyalara ve klasörlere ayrılmıştır.

/PortfolioProjem
|
|-- index.html         (Ana HTML iskeleti)
|-- style.css          (Ana sayfanın genel stilleri)
|-- script.js          (Dinamik menü, arama ve iframe mantığı)
|-- projeler.json      (Tüm projelerin listelendiği yapılandırma dosyası)
|-- README.md          (Bu dosya)
|
|-- /projeler          (Tüm alt projelerin bulunduğu klasör)
|   |
|   |-- /sayac/
|   |   |-- index.html
|   |   |-- style.css
|   |   |-- script.js
|   |
|   |-- /renk-degistirici/
|   |   |-- index.html
|   |   |-- ...
|   |
|   |-- /baska-bir-proje/
|       |-- ...

🚀 Nasıl Çalıştırılır?

Bu projenin yerel dosyaları (projeler.json) okuyabilmesi için bir lokal sunucu üzerinden çalıştırılması gerekmektedir. Bunun en kolay yolu Visual Studio Code ve Live Server eklentisidir.

    Visual Studio Code'u açın.

    Sol taraftaki "Eklentiler" (Extensions) sekmesinden Live Server eklentisini aratıp kurun.

    Proje klasörünü VS Code ile açın.

    index.html dosyasına sağ tıklayıp "Open with Live Server" seçeneğini seçin.

    Proje, tarayıcınızda otomatik olarak açılacaktır.

➕ Yeni Proje Nasıl Eklenir?

    Yeni projenizin tüm dosyalarını içeren bir klasör oluşturun (örneğin, yeni-projem).

    Bu klasörü ana dizindeki /projeler klasörünün içine kopyalayın.

    Ana dizindeki projeler.json dosyasını açın.

    Aşağıdaki şablona uygun olarak yeni projenizin bilgilerini bir JSON nesnesi olarak listeye ekleyin:

{
    "adi": "Yeni Projemin Adı",
    "ikon": "fa-solid fa-rocket", // Font Awesome ikon sınıfı
    "yol": "./projeler/yeni-projem/index.html"
}

    Dosyayı kaydedin. Sayfa otomatik olarak güncellenecek ve yeni projeniz menüde görünecektir.

🛠️ Kullanılan Teknolojiler

    HTML5

    CSS3

    JavaScript (ES6+)

    Tailwind CSS - Hızlı ve modern arayüz geliştirme için.

    Font Awesome - İkonlar için.