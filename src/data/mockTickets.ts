/**
 * Mock Support Tickets Data
 */

export interface TicketMessage {
  sender: 'user' | 'support';
  text: string;
  date: string;
}

export interface MockTicket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  createdDate: string;
  lastReply?: string;
  snippet?: string;
  messages: TicketMessage[];
}

export const mockTickets: MockTicket[] = [
  {
    id: 'TK-2024001',
    subject: 'Sipariş teslimatı gecikti',
    category: 'Kargo',
    status: 'open',
    priority: 'high',
    createdDate: '28 Şub 2026',
    lastReply: '1 Mar 2026',
    snippet: 'Kargonuz İstanbul aktarma merkezinde, tahmini teslimat yarın.',
    messages: [
      { sender: 'user', text: 'Siparişim 5 gündür teslim edilmedi. Kargo takip numarası güncellenmedi.', date: '28 Şub 2026' },
      { sender: 'support', text: 'Kargonuz İstanbul aktarma merkezinde, tahmini teslimat yarın.', date: '1 Mar 2026' },
    ],
  },
  {
    id: 'TK-2024002',
    subject: 'Fatura bilgilerinde hata var',
    category: 'Ödeme',
    status: 'pending',
    priority: 'normal',
    createdDate: '25 Şub 2026',
    lastReply: '27 Şub 2026',
    snippet: 'Fatura düzeltme talebiniz satıcıya iletildi.',
    messages: [
      { sender: 'user', text: 'Faturadaki şirket unvanı yanlış yazılmış, düzeltme talep ediyorum.', date: '25 Şub 2026' },
      { sender: 'support', text: 'Fatura düzeltme talebiniz satıcıya iletildi. 2 iş günü içinde güncellenecektir.', date: '27 Şub 2026' },
    ],
  },
  {
    id: 'TK-2024003',
    subject: 'Ürün açıklamasıyla uyuşmuyor',
    category: 'Sipariş',
    status: 'open',
    priority: 'high',
    createdDate: '2 Mar 2026',
    lastReply: '3 Mar 2026',
    snippet: 'Ürün fotoğraflarını aldık, inceleme süreci başlatıldı.',
    messages: [
      { sender: 'user', text: 'Aldığım ürün sitedeki açıklama ve görselle uyuşmuyor. Renk ve malzeme farklı.', date: '2 Mar 2026' },
      { sender: 'support', text: 'Ürün fotoğraflarını aldık, inceleme süreci başlatıldı.', date: '3 Mar 2026' },
    ],
  },
  {
    id: 'TK-2024004',
    subject: 'İade talebim onaylanmadı',
    category: 'Sipariş',
    status: 'pending',
    priority: 'urgent',
    createdDate: '20 Şub 2026',
    lastReply: '22 Şub 2026',
    snippet: 'İade talebiniz yeniden değerlendirilmek üzere üst birime iletildi.',
    messages: [
      { sender: 'user', text: '14 gün içinde iade talebinde bulundum ancak reddedildi. Sebep belirtilmedi.', date: '20 Şub 2026' },
      { sender: 'support', text: 'İade talebiniz yeniden değerlendirilmek üzere üst birime iletildi.', date: '22 Şub 2026' },
    ],
  },
  {
    id: 'TK-2024005',
    subject: 'Hesap şifremi değiştiremiyorum',
    category: 'Hesap',
    status: 'closed',
    priority: 'normal',
    createdDate: '15 Şub 2026',
    lastReply: '16 Şub 2026',
    snippet: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.',
    messages: [
      { sender: 'user', text: 'Şifre değiştirme sayfası hata veriyor.', date: '15 Şub 2026' },
      { sender: 'support', text: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Sorununuz çözülmüştür.', date: '16 Şub 2026' },
    ],
  },
  {
    id: 'TK-2024006',
    subject: 'Toplu sipariş için özel fiyat talebi',
    category: 'Sipariş',
    status: 'open',
    priority: 'normal',
    createdDate: '3 Mar 2026',
    snippet: 'Henüz yanıt bekleniyor.',
    messages: [
      { sender: 'user', text: '500 adet ürün almak istiyorum. Toplu sipariş indirimi mümkün mü?', date: '3 Mar 2026' },
    ],
  },
  {
    id: 'TK-2024007',
    subject: 'Kredi kartından çift çekim yapıldı',
    category: 'Ödeme',
    status: 'open',
    priority: 'urgent',
    createdDate: '4 Mar 2026',
    lastReply: '4 Mar 2026',
    snippet: 'Ödeme kaydınız inceleniyor, mükerrer çekim tespit edilirse iade edilecektir.',
    messages: [
      { sender: 'user', text: 'Aynı sipariş için kartımdan 2 kez çekim yapılmış.', date: '4 Mar 2026' },
      { sender: 'support', text: 'Ödeme kaydınız inceleniyor, mükerrer çekim tespit edilirse iade edilecektir.', date: '4 Mar 2026' },
    ],
  },
  {
    id: 'TK-2024008',
    subject: 'Kargo hasarlı geldi',
    category: 'Kargo',
    status: 'pending',
    priority: 'high',
    createdDate: '1 Mar 2026',
    lastReply: '2 Mar 2026',
    snippet: 'Hasar fotoğrafları alındı, kargo firmasına bildirim yapıldı.',
    messages: [
      { sender: 'user', text: 'Paket ezilmiş ve ürün hasarlı. Fotoğrafları ekliyorum.', date: '1 Mar 2026' },
      { sender: 'support', text: 'Hasar fotoğrafları alındı, kargo firmasına bildirim yapıldı. Yeni ürün gönderimi planlanacak.', date: '2 Mar 2026' },
    ],
  },
  {
    id: 'TK-2024009',
    subject: 'Satıcı mesajlara yanıt vermiyor',
    category: 'Sipariş',
    status: 'closed',
    priority: 'normal',
    createdDate: '10 Şub 2026',
    lastReply: '14 Şub 2026',
    snippet: 'Satıcıyla iletişim sağlandı, siparişiniz onaylandı.',
    messages: [
      { sender: 'user', text: 'Satıcıya 3 gündür mesaj atıyorum ama yanıt alamıyorum.', date: '10 Şub 2026' },
      { sender: 'support', text: 'Satıcıyla iletişim sağlandı, siparişiniz onaylandı.', date: '14 Şub 2026' },
    ],
  },
  {
    id: 'TK-2024010',
    subject: 'Kupon kodu çalışmıyor',
    category: 'Ödeme',
    status: 'closed',
    priority: 'low',
    createdDate: '8 Şub 2026',
    lastReply: '9 Şub 2026',
    snippet: 'Kupon kodunuzun geçerlilik süresi dolmuştu. Yeni bir kupon tanımlandı.',
    messages: [
      { sender: 'user', text: 'ISTOC20 kupon kodu uygulanmıyor.', date: '8 Şub 2026' },
      { sender: 'support', text: 'Kupon kodunuzun geçerlilik süresi dolmuştu. Yeni bir kupon tanımlandı: ISTOC25', date: '9 Şub 2026' },
    ],
  },
  {
    id: 'TK-2024011',
    subject: 'Teslimat adresi değişikliği',
    category: 'Kargo',
    status: 'closed',
    priority: 'normal',
    createdDate: '5 Şub 2026',
    lastReply: '6 Şub 2026',
    snippet: 'Adres güncellemeniz kargo firmasına bildirildi.',
    messages: [
      { sender: 'user', text: 'Siparişim henüz gönderilmediyse teslimat adresimi değiştirmek istiyorum.', date: '5 Şub 2026' },
      { sender: 'support', text: 'Adres güncellemeniz kargo firmasına bildirildi.', date: '6 Şub 2026' },
    ],
  },
  {
    id: 'TK-2024012',
    subject: 'Ürün kalitesi beklentinin altında',
    category: 'Ürün Kalitesi',
    status: 'pending',
    priority: 'normal',
    createdDate: '26 Şub 2026',
    lastReply: '28 Şub 2026',
    snippet: 'Kalite değerlendirme süreci başlatıldı.',
    messages: [
      { sender: 'user', text: 'Ürün malzeme kalitesi düşük, açıklamadaki özelliklerle uyuşmuyor.', date: '26 Şub 2026' },
      { sender: 'support', text: 'Kalite değerlendirme süreci başlatıldı. Ürün fotoğrafları inceleniyor.', date: '28 Şub 2026' },
    ],
  },
  {
    id: 'TK-2024013',
    subject: 'Verified satıcı başvurusu hakkında',
    category: 'Hesap',
    status: 'open',
    priority: 'low',
    createdDate: '4 Mar 2026',
    snippet: 'Henüz yanıt bekleniyor.',
    messages: [
      { sender: 'user', text: 'Verified satıcı statüsüne geçmek istiyorum. Gerekli belgeleri nereden yükleyebilirim?', date: '4 Mar 2026' },
    ],
  },
  {
    id: 'TK-2024014',
    subject: 'Para iadesi gecikti',
    category: 'Ödeme',
    status: 'open',
    priority: 'high',
    createdDate: '27 Şub 2026',
    lastReply: '1 Mar 2026',
    snippet: 'İade işlemi 2 iş günü içinde hesabınıza yansıyacaktır.',
    messages: [
      { sender: 'user', text: 'İade onaylandı ancak 7 gün geçti hala paramı alamadım.', date: '27 Şub 2026' },
      { sender: 'support', text: 'İade işlemi 2 iş günü içinde hesabınıza yansıyacaktır.', date: '1 Mar 2026' },
    ],
  },
  {
    id: 'TK-2024015',
    subject: 'Yanlış ürün gönderildi',
    category: 'Sipariş',
    status: 'closed',
    priority: 'high',
    createdDate: '12 Şub 2026',
    lastReply: '15 Şub 2026',
    snippet: 'Doğru ürün gönderildi, eski ürün için iade kargo etiketi oluşturuldu.',
    messages: [
      { sender: 'user', text: 'Sipariş ettiğim üründen farklı bir ürün geldi.', date: '12 Şub 2026' },
      { sender: 'support', text: 'Doğru ürün gönderildi, eski ürün için iade kargo etiketi oluşturuldu.', date: '15 Şub 2026' },
    ],
  },
];
