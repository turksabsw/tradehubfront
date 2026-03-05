/**
 * Legal Pages Content Data
 * Static Turkish content for Terms, Privacy, Cookies, Returns pages
 */

import type { LegalSection } from '../components/legal/LegalPageLayout';

export interface LegalPageData {
  pageTitle: string;
  lastUpdated: string;
  breadcrumbLabel: string;
  sections: LegalSection[];
}

export const termsContent: LegalPageData = {
  pageTitle: 'Kullanım Koşulları',
  lastUpdated: '15 Şubat 2026',
  breadcrumbLabel: 'Kullanım Koşulları',
  sections: [
    {
      id: 'tanimlar',
      title: '1. Tanımlar',
      content: `
        <p><strong>"Platform"</strong>, iSTOC TradeHub tarafından işletilen web sitesi ve mobil uygulamayı ifade eder.</p>
        <p><strong>"Kullanıcı"</strong>, Platforma üye olan veya üye olmadan hizmetlerden yararlanan gerçek ve tüzel kişileri ifade eder.</p>
        <p><strong>"Satıcı"</strong>, Platform üzerinden ürün ve hizmet sunan gerçek veya tüzel kişileri ifade eder.</p>
        <p><strong>"Alıcı"</strong>, Platform üzerinden ürün ve hizmet satın alan Kullanıcıları ifade eder.</p>
        <p><strong>"Hizmetler"</strong>, Platform aracılığıyla sunulan B2B ticaret, ödeme, lojistik ve diğer tüm hizmetleri kapsar.</p>
      `,
    },
    {
      id: 'kapsam',
      title: '2. Kapsam ve Kabul',
      content: `
        <p>Bu Kullanım Koşulları, Platform'a erişen ve/veya Platform'u kullanan tüm Kullanıcılar için geçerlidir. Platform'u kullanarak bu koşulları kabul etmiş sayılırsınız.</p>
        <p>iSTOC, bu koşulları önceden bildirmeksizin güncelleme hakkını saklı tutar. Güncellemeler yayınlandığı anda yürürlüğe girer. Platform'u kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.</p>
      `,
    },
    {
      id: 'uyelik',
      title: '3. Üyelik ve Hesap',
      content: `
        <p>Platform'a üye olmak için 18 yaşını doldurmuş olmak ve geçerli bir e-posta adresine sahip olmak gereklidir. Tüzel kişiler adına hareket eden temsilcilerin yetkili olması gerekmektedir.</p>
        <p>Kullanıcılar, hesap bilgilerinin gizliliğinden ve güvenliğinden sorumludur. Hesabınız üzerinden gerçekleştirilen tüm işlemlerden siz sorumlusunuz.</p>
        <p>iSTOC, önceden bildirimde bulunmaksızın şüpheli veya kurallara aykırı hesapları askıya alma veya kapatma hakkına sahiptir.</p>
      `,
    },
    {
      id: 'siparis',
      title: '4. Sipariş ve Sözleşme',
      content: `
        <p>Platform üzerinden verilen siparişler, Alıcı ile Satıcı arasında bir satış sözleşmesi oluşturur. iSTOC, bu sözleşmenin tarafı değildir; yalnızca aracı platform hizmeti sunmaktadır.</p>
        <p>Siparişin onaylanması, ödemenin başarıyla tamamlanması ve Satıcı tarafından kabul edilmesi koşuluna bağlıdır. Satıcılar, stok durumu veya diğer geçerli nedenlerle siparişi reddetme hakkına sahiptir.</p>
        <p>Sipariş detayları, teyit e-postası ve Platform üzerindeki sipariş takip sayfasından görüntülenebilir.</p>
      `,
    },
    {
      id: 'odeme',
      title: '5. Ödeme Koşulları',
      content: `
        <p>Platform üzerinden kredi kartı, banka kartı, havale/EFT ve Platform bakiyesi ile ödeme yapılabilir. Tüm ödemeler güvenli altyapılar üzerinden işlenir.</p>
        <p>Fiyatlar, aksi belirtilmedikçe KDV dahildir. B2B işlemlerde fatura bilgileri Satıcı tarafından düzenlenir.</p>
        <p>iSTOC Güvende Ödeme sistemi, ödemenin Satıcıya aktarılmasını ürün teslimatına kadar askıda tutar. Bu sistem Alıcıları koruma amaçlıdır.</p>
      `,
    },
    {
      id: 'kargo',
      title: '6. Kargo ve Teslimat',
      content: `
        <p>Tahmini teslimat süreleri ürün sayfasında belirtilir ve bilgilendirme amaçlıdır. Gerçek teslimat süreleri lojistik koşullara bağlı olarak değişebilir.</p>
        <p>Kargo sürecinde oluşabilecek hasarlardan kargo firması sorumludur. Teslimat sırasında paket kontrolü yapılması önerilir.</p>
        <p>Uluslararası gönderilerde gümrük vergisi ve ek masraflar Alıcıya aittir.</p>
      `,
    },
    {
      id: 'iade',
      title: '7. İade ve Cayma Hakkı',
      content: `
        <p>Tüketici mevzuatı kapsamında, ürün teslim tarihinden itibaren 14 gün içinde cayma hakkınızı kullanabilirsiniz. Detaylı iade koşulları için <a href="/pages/legal/returns.html" class="text-primary-500 hover:underline">İade Politikası</a> sayfamızı inceleyiniz.</p>
        <p>B2B satışlarda iade koşulları, Satıcı ile yapılan anlaşmaya göre belirlenir.</p>
      `,
    },
    {
      id: 'fikri-mulkiyet',
      title: '8. Fikri Mülkiyet Hakları',
      content: `
        <p>Platform üzerindeki tüm içerik, tasarım, logo, yazılım ve veritabanları iSTOC'un veya lisans verenlerinin fikri mülkiyetindedir.</p>
        <p>Kullanıcılar, Platform içeriğini kopyalayamaz, çoğaltamaz, dağıtamaz veya ticari amaçla kullanamaz. Satıcılar tarafından yüklenen ürün görselleri ve açıklamalarının sorumluluğu ilgili Satıcıya aittir.</p>
      `,
    },
    {
      id: 'sorumluluk',
      title: '9. Sorumluluk Sınırlaması',
      content: `
        <p>iSTOC, Platform üzerinden gerçekleştirilen alım-satım işlemlerinde aracı konumundadır. Ürünlerin kalitesi, uygunluğu ve teslimatından Satıcılar sorumludur.</p>
        <p>Platform, teknik arızalar, kesintiler veya üçüncü taraf hizmetlerindeki aksaklıklar nedeniyle doğabilecek zararlardan sorumlu tutulamaz.</p>
        <p>iSTOC'un toplam sorumluluğu, ilgili işleme ait hizmet bedelini aşamaz.</p>
      `,
    },
    {
      id: 'uygulanacak-hukuk',
      title: '10. Uygulanacak Hukuk ve Uyuşmazlık',
      content: `
        <p>Bu Kullanım Koşulları, Türkiye Cumhuriyeti kanunlarına tabidir.</p>
        <p>Taraflar arasında doğabilecek uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.</p>
        <p>Tüketici işlemlerinden kaynaklanan uyuşmazlıklarda, Ticaret Bakanlığı tarafından ilan edilen parasal sınırlar dahilinde Tüketici Hakem Heyetleri yetkilidir.</p>
      `,
    },
  ],
};

export const privacyContent: LegalPageData = {
  pageTitle: 'Gizlilik Politikası',
  lastUpdated: '15 Şubat 2026',
  breadcrumbLabel: 'Gizlilik Politikası',
  sections: [
    {
      id: 'veri-sorumlusu',
      title: '1. Veri Sorumlusu',
      content: `
        <p>Kişisel verilerinizin işlenmesinde veri sorumlusu sıfatıyla hareket eden taraf:</p>
        <p><strong>iSTOC Teknoloji A.Ş.</strong><br>
        Adres: İstanbul Ticaret Merkezi, Kat 12, Maslak, İstanbul<br>
        E-posta: kvkk@istoc.com<br>
        Telefon: +90 800 123 4567</p>
      `,
    },
    {
      id: 'toplanan-veriler',
      title: '2. Toplanan Kişisel Veriler',
      content: `
        <p>Platform hizmetlerinin sunulması kapsamında aşağıdaki kişisel veriler toplanmaktadır:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (satıcılar için), vergi numarası</li>
          <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, adres</li>
          <li><strong>Finansal Bilgiler:</strong> Banka hesap bilgileri, kredi kartı bilgileri (maskelenerek saklanır)</li>
          <li><strong>İşlem Bilgileri:</strong> Sipariş geçmişi, ödeme kayıtları, iade talepleri</li>
          <li><strong>Dijital İzler:</strong> IP adresi, çerez verileri, cihaz bilgileri, tarayıcı bilgileri</li>
          <li><strong>Kullanım Verileri:</strong> Arama geçmişi, sayfa görüntülemeleri, tıklama verileri</li>
        </ul>
      `,
    },
    {
      id: 'isleme-amaclari',
      title: '3. Veri İşleme Amaçları',
      content: `
        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Üyelik kaydı oluşturma ve hesap yönetimi</li>
          <li>Sipariş işleme, kargo ve teslimat süreçlerinin yürütülmesi</li>
          <li>Ödeme işlemlerinin güvenli bir şekilde gerçekleştirilmesi</li>
          <li>Müşteri destek hizmetlerinin sunulması</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi (fatura düzenleme, vergi bildirimi)</li>
          <li>Platform güvenliğinin sağlanması ve dolandırıcılığın önlenmesi</li>
          <li>Hizmetlerimizin iyileştirilmesi ve kişiselleştirilmesi</li>
        </ul>
      `,
    },
    {
      id: 'hukuki-dayanak',
      title: '4. Hukuki Dayanak',
      content: `
        <p>Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında aşağıdaki hukuki dayanaklara istinaden işlenmektedir:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>Açık rıza:</strong> Pazarlama iletişimleri ve çerez tercihleri</li>
          <li><strong>Sözleşmenin ifası:</strong> Sipariş, ödeme ve teslimat süreçleri</li>
          <li><strong>Yasal yükümlülük:</strong> Vergi mevzuatı, tüketici hukuku</li>
          <li><strong>Meşru menfaat:</strong> Platform güvenliği, hizmet iyileştirme</li>
        </ul>
      `,
    },
    {
      id: 'veri-paylasimi',
      title: '5. Veri Paylaşımı',
      content: `
        <p>Kişisel verileriniz, yalnızca aşağıdaki durumlarda üçüncü taraflarla paylaşılabilir:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Sipariş teslimatı için kargo şirketleriyle</li>
          <li>Ödeme işlemleri için ödeme kuruluşlarıyla</li>
          <li>Yasal zorunluluklar kapsamında yetkili kamu kurumlarıyla</li>
          <li>Hizmet sağlayıcılarımızla (hosting, analitik, müşteri destek araçları)</li>
        </ul>
        <p>Verileriniz hiçbir koşulda üçüncü taraflara satılmaz.</p>
      `,
    },
    {
      id: 'uluslararasi-transfer',
      title: '6. Uluslararası Veri Transferi',
      content: `
        <p>Bazı hizmet sağlayıcılarımız yurt dışında bulunmaktadır. Bu durumda verileriniz, KVKK'nın 9. maddesi kapsamında yeterli koruma bulunan ülkelere veya yeterli korumayı yazılı olarak taahhüt eden veri sorumlularına aktarılabilir.</p>
        <p>Veri transferi yapılan başlıca ülkeler: Avrupa Birliği ülkeleri, Amerika Birleşik Devletleri (standart sözleşme maddeleri ile).</p>
      `,
    },
    {
      id: 'veri-hakklari',
      title: '7. Veri Sahibi Hakları',
      content: `
        <p>KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>KVKK'nın 7. maddesi kapsamında silinmesini veya yok edilmesini isteme</li>
          <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
        </ul>
      `,
    },
    {
      id: 'iletisim',
      title: '8. İletişim',
      content: `
        <p>Kişisel verilerinizle ilgili taleplerinizi aşağıdaki kanallardan iletebilirsiniz:</p>
        <p><strong>E-posta:</strong> kvkk@istoc.com<br>
        <strong>Posta:</strong> iSTOC Teknoloji A.Ş., İstanbul Ticaret Merkezi, Kat 12, Maslak, İstanbul<br>
        <strong>KEP:</strong> istoc@hs01.kep.tr</p>
        <p>Başvurularınız en geç 30 gün içinde değerlendirilecek ve sonuçlandırılacaktır.</p>
      `,
    },
  ],
};

export const cookiesContent: LegalPageData = {
  pageTitle: 'Çerez Politikası',
  lastUpdated: '15 Şubat 2026',
  breadcrumbLabel: 'Çerez Politikası',
  sections: [
    {
      id: 'cerez-nedir',
      title: '1. Çerez Nedir?',
      content: `
        <p>Çerezler, web sitelerinin tarayıcınıza gönderdiği ve cihazınızda saklanan küçük metin dosyalarıdır. Bu dosyalar, siteyi tekrar ziyaret ettiğinizde sizi tanımamıza ve deneyiminizi kişiselleştirmemize yardımcı olur.</p>
        <p>Çerezler, oturum çerezleri (tarayıcı kapatıldığında silinen) ve kalıcı çerezler (belirli bir süre boyunca cihazınızda kalan) olmak üzere ikiye ayrılır.</p>
      `,
    },
    {
      id: 'zorunlu',
      title: '2. Zorunlu Çerezler',
      content: `
        <p>Bu çerezler, Platform'un temel işlevlerinin çalışması için gereklidir ve devre dışı bırakılamazlar. Bunlar olmadan oturum açma, sepete ürün ekleme gibi temel işlemleri gerçekleştiremezsiniz.</p>
        <p><strong>Örnekler:</strong> Oturum yönetimi çerezleri, CSRF koruma çerezleri, yük dengeleme çerezleri.</p>
      `,
    },
    {
      id: 'fonksiyonel',
      title: '3. Fonksiyonel Çerezler',
      content: `
        <p>Bu çerezler, tercihlerinizi hatırlayarak daha kişiselleştirilmiş bir deneyim sunar. Dil seçiminiz, para birimi tercihiniz veya bölge ayarlarınız gibi bilgileri saklar.</p>
        <p>Bu çerezleri devre dışı bırakırsanız, bazı kişiselleştirme özellikleri çalışmayabilir.</p>
      `,
    },
    {
      id: 'analitik',
      title: '4. Analitik Çerezler',
      content: `
        <p>Bu çerezler, ziyaretçilerin sitemizi nasıl kullandığını anlamamıza yardımcı olur. Sayfa görüntülemeleri, oturum süresi, hemen çıkma oranı gibi istatistiksel veriler toplar.</p>
        <p>Toplanan veriler anonimleştirilir ve yalnızca Platform hizmetlerinin iyileştirilmesi amacıyla kullanılır. Bu amaçla Google Analytics ve benzeri araçlar kullanılmaktadır.</p>
      `,
    },
    {
      id: 'pazarlama',
      title: '5. Pazarlama Çerezleri',
      content: `
        <p>Bu çerezler, ilgi alanlarınıza uygun reklamlar göstermek için kullanılır. Farklı web sitelerinde gezinme alışkanlıklarınızı takip edebilir.</p>
        <p>Bu çerezleri devre dışı bırakmak, reklam görmeyeceğiniz anlamına gelmez; yalnızca size gösterilen reklamların ilgi alanlarınıza göre kişiselleştirilmediği anlamına gelir.</p>
      `,
    },
    {
      id: 'yonetim',
      title: '6. Çerez Yönetimi',
      content: `
        <p>Tarayıcı ayarlarınızdan çerezleri silme veya engelleme seçeneğiniz bulunmaktadır. Ancak zorunlu çerezlerin engellenmesi, Platform'un düzgün çalışmamasına neden olabilir.</p>
        <p>Aşağıdaki bağlantılardan popüler tarayıcıların çerez ayarlarına erişebilirsiniz:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Google Chrome: Ayarlar > Gizlilik ve Güvenlik > Çerezler</li>
          <li>Mozilla Firefox: Seçenekler > Gizlilik ve Güvenlik</li>
          <li>Safari: Tercihler > Gizlilik</li>
          <li>Microsoft Edge: Ayarlar > Gizlilik, Arama ve Hizmetler</li>
        </ul>
        <p class="mt-3">Ayrıca bu sayfadaki çerez tercih panelini kullanarak kategori bazında çerez izinlerinizi yönetebilirsiniz.</p>
      `,
    },
  ],
};

export const returnsContent: LegalPageData = {
  pageTitle: 'İade Politikası',
  lastUpdated: '15 Şubat 2026',
  breadcrumbLabel: 'İade Politikası',
  sections: [
    {
      id: 'genel-kosullar',
      title: '1. Genel Koşullar',
      content: `
        <p>iSTOC TradeHub üzerinden satın aldığınız ürünleri, teslim tarihinden itibaren <strong>14 gün</strong> içinde iade edebilirsiniz. Bu hak, 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında tanınmaktadır.</p>
        <p>İade edilecek ürünlerin kullanılmamış, orijinal ambalajında ve tüm aksesuarlarıyla birlikte olması gerekmektedir.</p>
      `,
    },
    {
      id: 'iade-suresi',
      title: '2. İade Süresi',
      content: `
        <p>Standart ürünler için iade süresi teslim tarihinden itibaren <strong>14 takvim günüdür</strong>.</p>
        <p>Hasarlı veya hatalı ürünlerde bu süre <strong>30 güne</strong> uzatılmaktadır. Hasarlı ürün bildirimi, teslimattan itibaren ilk 48 saat içinde fotoğraflı olarak yapılmalıdır.</p>
        <p>B2B toplu siparişlerde iade süreleri satıcı ile yapılan sözleşmeye göre belirlenir.</p>
      `,
    },
    {
      id: 'iade-sureci',
      title: '3. İade Süreci',
      content: `
        <p>İade sürecinizi başlatmak için aşağıdaki adımları takip ediniz:</p>
        <ol class="list-decimal pl-5 space-y-2">
          <li><strong>İade talebi oluşturun:</strong> Hesabınızdaki "Siparişlerim" bölümünden veya <a href="/pages/help/help-ticket-new.html" class="text-primary-500 hover:underline">Destek Talebi</a> sayfasından iade talebinizi oluşturun.</li>
          <li><strong>Onay bekleyin:</strong> Talebiniz 24 saat içinde değerlendirilecektir.</li>
          <li><strong>Ürünü gönderin:</strong> Onay sonrası size iletilen kargo koduyla ürünü gönderin.</li>
          <li><strong>İnceleme süreci:</strong> Ürün teslim alındıktan sonra 2 iş günü içinde incelenir.</li>
          <li><strong>İade tamamlanır:</strong> Onay sonrası ödemeniz iade edilir.</li>
        </ol>
      `,
    },
    {
      id: 'kargo',
      title: '4. İade Kargo',
      content: `
        <p><strong>Ücretsiz iade kargo:</strong> Üretim hatası, yanlış ürün gönderimi veya hasarlı ürün durumlarında kargo ücreti tarafımızca karşılanır.</p>
        <p><strong>Alıcı karşılar:</strong> Cayma hakkı kullanımı veya fikir değişikliği nedenli iadelerde kargo ücreti alıcıya aittir.</p>
        <p>İade kargolarında anlaşmalı kargo firmalarımız üzerinden gönderim yapılması gerekmektedir. Aksi takdirde kargo güvencesi sağlanamaz.</p>
      `,
    },
    {
      id: 'inceleme',
      title: '5. Ürün İnceleme',
      content: `
        <p>İade edilen ürünler, depomuzda kalite kontrol ekibimiz tarafından incelenir. İnceleme kriterleri:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Ürünün kullanılmamış ve hasarsız olması</li>
          <li>Orijinal ambalaj ve etiketlerin mevcut olması</li>
          <li>Tüm aksesuarların eksiksiz iade edilmesi</li>
          <li>Ürünün hijyen koşullarına uygun olması</li>
        </ul>
        <p>İnceleme sonucu olumsuz ise, ürün masrafları alıcıya ait olmak üzere geri gönderilir.</p>
      `,
    },
    {
      id: 'para-iadesi',
      title: '6. Para İadesi',
      content: `
        <p>İade onaylandıktan sonra ödemeniz, orijinal ödeme yöntemine göre iade edilir:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li><strong>Kredi/Banka kartı:</strong> 3-5 iş günü içinde kartınıza iade edilir</li>
          <li><strong>Havale/EFT:</strong> 1-3 iş günü içinde banka hesabınıza aktarılır</li>
          <li><strong>Platform bakiyesi:</strong> Anında bakiyenize eklenir</li>
        </ul>
        <p>Taksitli ödemelerde iade, bankanız tarafından taksit planınıza yansıtılır. Bu süre bankadan bankaya farklılık gösterebilir.</p>
      `,
    },
    {
      id: 'istisnalar',
      title: '7. İade Edilemeyecek Ürünler',
      content: `
        <p>Aşağıdaki ürün kategorileri iade kapsamı dışındadır:</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Kişiye özel üretilen veya özelleştirilen ürünler</li>
          <li>Ambalajı açılmış hijyen ürünleri (iç giyim, kozmetik vb.)</li>
          <li>Dijital ürünler ve yazılım lisansları (kullanılmaya başlandıysa)</li>
          <li>Hızlı bozulabilir veya son kullanma tarihi geçme riski olan ürünler</li>
          <li>Gazete, dergi gibi süreli yayınlar</li>
          <li>Satıcı tarafından "iade edilemez" olarak belirtilen kampanya ürünleri</li>
        </ul>
        <p>Bu istisnalar, ürünün hatalı veya hasarlı olması durumunda geçerli değildir. Hatalı/hasarlı ürünlerde her koşulda iade hakkınız saklıdır.</p>
      `,
    },
  ],
};
