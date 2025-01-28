const treatments = {
  AKIEC: {
    title: "Aktinik Keratoz ve İntraepitelyal Karsinom (AKIEC)",
    natural: [
      "Güneşten Korunma: Uzun süreli ultraviyole radyasyona maruz kalmak, özellikle melanom gelişme riskini artırır. Bu nedenle, güneş ışınlarından korunmak ve düzenli cilt kontrolleri yapmak önemlidir.",
    ],
    medical: [
      "Topikal Tedaviler: 5-fluorourasil veya imikimod gibi kremler kullanılabilir.",
      "Kriyoterapi: Sıvı nitrojen ile lezyonların dondurulması.",
      "Cerrahi Müdahale: Lezyonun cerrahi olarak çıkarılması.",
    ],
  },
  BCC: {
    title: "Bazal Hücreli Karsinom (BCC)",
    natural: [
      "Güneşten Korunma: Güneş ışınlarından korunmak ve düzenli cilt kontrolleri yapmak önemlidir.",
    ],
    medical: [
      "Cerrahi Eksizyon: Lezyonun cerrahi olarak çıkarılması.",
      "Mohs Mikrocerrahisi: Özellikle yüz bölgesindeki lezyonlar için tercih edilir.",
      "Radyoterapi: Cerrahiye alternatif olarak kullanılabilir.",
    ],
  },
  BKL: {
    title: "Benign Keratoz Benzeri Lezyonlar (BKL)",
    natural: [
      "Cilt Hijyeni: Cildin temiz ve nemli tutulması.",
      "Tahrişten Kaçınma: Kimyasal maddelerden ve aşırı sürtünmeden kaçınmak.",
    ],
    medical: [
      "Kriyoterapi: Lezyonların dondurulması.",
      "Lazer Tedavisi: Lezyonların lazer ile çıkarılması.",
      "Biyopsi: Şüpheli durumlarda tanı için örnek alınması.",
    ],
  },
  DF: {
    title: "Dermatofibrom (DF)",
    natural: [
      "İzlem: Genellikle zararsızdır ve tedavi gerektirmez; düzenli kontrol yeterlidir.",
    ],
    medical: [
      "Cerrahi Eksizyon: Kozmetik veya rahatsızlık durumunda çıkarılabilir.",
      "Kriyoterapi: Lezyonun küçültülmesi için kullanılabilir.",
    ],
  },
  MEL: {
    title: "Melanom (MEL)",
    natural: [
      "Erken Teşhis: Düzenli cilt kontrolleri ve şüpheli lezyonların takibi önemlidir.",
    ],
    medical: [
      "Cerrahi Eksizyon: Lezyonun geniş bir alanla birlikte çıkarılması.",
      "İmmünoterapi: Bağışıklık sistemini güçlendiren tedaviler.",
      "Hedefe Yönelik Tedaviler: Spesifik gen mutasyonlarına yönelik ilaçlar.",
      "Kemoterapi: İleri evrelerde kullanılabilir.",
    ],
  },
  NV: {
    title: "Melanositik Nevus (NV)",
    natural: [
      "Gözlem: Düzenli olarak benlerin takibi ve değişikliklerin izlenmesi.",
    ],
    medical: [
      "Cerrahi Eksizyon: Şüpheli veya kozmetik nedenlerle çıkarılabilir.",
      "Lazer Tedavisi: Bazı durumlarda kullanılabilir.",
    ],
  },
  VASC: {
    title: "Vasküler Lezyonlar (VASC)",
    natural: [
      "İzlem: Küçük ve zararsız lezyonlar için düzenli takip yeterlidir.",
    ],
    medical: [
      "Lazer Tedavisi: Kan damarlarını hedef alarak lezyonları küçültür.",
      "Skleroterapi: Özellikle daha büyük lezyonlar için damar içine sklerozan madde enjeksiyonu.",
      "Cerrahi Eksizyon: Gerekli durumlarda lezyonun çıkarılması.",
    ],
  },
};

export default treatments;
