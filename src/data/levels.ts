export interface Animal {
  id: number;
  type: 'sheep' | 'cow' | 'duck' | 'farmer' | 'goat' | 'logo' | 'link' | 'profile';
  color: 'red' | 'blue' | 'yellow' | 'default';
}

export interface Barn {
  id: number;
  color: 'red' | 'blue' | 'yellow' | 'default';
}

export interface Level {
  id: number;
  title: string;
  desc: string;
  tip: string;
  correctCss: string;
  barnsCss: string;
  animals: Animal[];
  barns: Barn[];
}

export const levels: Level[] = [
  // --- BOLUM 1: YATAY HIZALAMA (JUSTIFY) ---
  {
    id: 1,
    title: "Güneş Batıyor!",
    desc: "Hava kararmak üzere ve ahırın kapısı doğu tarafında (sağda) kaldı. Koyun üşümeden onu hemen içeri al.",
    tip: "Sağa yaslamak için `justify-content: flex-end;` kullanabilirsin.",
    correctCss: "justify-content: flex-end;",
    barnsCss: "justify-content: flex-end;", 
    animals: [{ id: 1, type: "sheep", color: "red" }],
    barns: [{ id: 1, color: "red" }]
  },
  {
    id: 2,
    title: "Kurt Saldırısı",
    desc: "DİKKAT! Sol taraftaki ormanda bir kurt görüldü. Sürüyü korumak için hepsini tarlanın tam ortasında topla.",
    tip: "Merkeze toplamak için `justify-content: center;` kullan.",
    correctCss: "justify-content: center;",
    barnsCss: "justify-content: center;", 
    animals: [
      { id: 1, type: "sheep", color: "blue" },
      { id: 2, type: "sheep", color: "blue" }
    ],
    barns: [
      { id: 1, color: "blue" },
      { id: 2, color: "blue" }
    ]
  },
  {
    id: 3,
    title: "Salgın Var!",
    desc: "Veteriner uyardı: Hayvanlar çok dip dibe durursa hastalık yayılıyor. Onların etrafını açarak ferahlamalarını sağla.",
    tip: "Her elemanın etrafına eşit boşluk vermek için `justify-content: space-around;` kullan.",
    correctCss: "justify-content: space-around;",
    barnsCss: "justify-content: space-around;",
    animals: [
      { id: 1, type: "sheep", color: "yellow" },
      { id: 2, type: "sheep", color: "yellow" },
      { id: 3, type: "sheep", color: "yellow" }
    ],
    barns: [
      { id: 1, color: "yellow" },
      { id: 2, color: "yellow" },
      { id: 3, color: "yellow" }
    ]
  },
  {
    id: 4,
    title: "Kavgalı Koyunlar",
    desc: "Bu kırmızı koyunlar birbiriyle hiç anlaşamıyor. Sürekli tosluyorlar! Onları birbirlerinden mümkün olduğunca uzağa, en uçlara gönder.",
    tip: "Elemanları en uçlara itmek ve aralarını açmak için `justify-content: space-between;` kullan.",
    correctCss: "justify-content: space-between;",
    barnsCss: "justify-content: space-between;",
    animals: [
      { id: 1, type: "sheep", color: "red" },
      { id: 2, type: "sheep", color: "red" },
      { id: 3, type: "sheep", color: "red" }
    ],
    barns: [
      { id: 1, color: "red" },
      { id: 2, color: "red" },
      { id: 3, color: "red" }
    ]
  },

  // --- BOLUM 2: DIKEY HIZALAMA (ALIGN) ---
  {
    id: 5,
    title: "Dere Kenarı",
    desc: "Hava çok sıcak! Koyunlar tarlanın aşağısındaki (sonundaki) dere kenarına inip serinlemek istiyor.",
    tip: "Dikey eksende aşağı (sona) itmek için `align-items: flex-end;` kullan.",
    correctCss: "align-items: flex-end;",
    barnsCss: "align-items: flex-end;",
    animals: [
      { id: 1, type: "sheep", color: "blue" },
      { id: 2, type: "sheep", color: "blue" }
    ],
    barns: [
      { id: 1, color: "blue" },
      { id: 2, color: "blue" }
    ]
  },
  {
    id: 6,
    title: "Ördek Yüzüşü",
    desc: "Ördek ne dipten gitmek istiyor ne de yüzeyden uçmak. Tam ortadan süzülmek istiyor.",
    tip: "Dikeyde ortalamak için `align-items: center;` kullan.",
    correctCss: "align-items: center;",
    barnsCss: "align-items: center;",
    animals: [{ id: 1, type: "duck", color: "yellow" }],
    barns: [{ id: 1, color: "yellow" }]
  },
  {
    id: 7,
    title: "Hatıra Fotoğrafı",
    desc: "Çiftçi Celal ineğiyle hatıra fotoğrafı çektirecek. İneği kadrajın tam göbeğine (hem yatay hem dikey) yerleştir.",
    tip: "Hem `justify-content` hem de `align-items` özelliklerini `center` yap.",
    correctCss: "justify-content: center; align-items: center;",
    barnsCss: "justify-content: center; align-items: center;",
    animals: [{ id: 1, type: "cow", color: "default" }],
    barns: [{ id: 1, color: "default" }]
  },

  // --- BOLUM 3: YON (DIRECTION) ---
  {
    id: 8,
    title: "Traktör Kazası",
    desc: "Eyvah! Ahırın ana girişine traktör devrildi. Hayvanları arka kapıdan, yani tersten sıraya sokman gerekiyor.",
    tip: "Sıralamayı tersine çevirmek için `flex-direction: row-reverse;` kullan.",
    correctCss: "flex-direction: row-reverse;",
    barnsCss: "flex-direction: row-reverse;", 
    animals: [
      { id: 1, type: "sheep", color: "red" },
      { id: 2, type: "sheep", color: "blue" }
    ],
    barns: [
      { id: 1, color: "red" },
      { id: 2, color: "blue" }
    ]
  },
  {
    id: 9,
    title: "Mısır Tarlası",
    desc: "Mısır tarlasındaki patika çok dar. Hayvanlar yan yana sığmıyor, onları tek sıra halinde alt alta dizmelisin.",
    tip: "Dizilimi sütun (alt alta) yapmak için `flex-direction: column;` kullan.",
    correctCss: "flex-direction: column;",
    barnsCss: "flex-direction: column;",
    animals: [
      { id: 1, type: "sheep", color: "yellow" },
      { id: 2, type: "sheep", color: "yellow" },
      { id: 3, type: "sheep", color: "yellow" }
    ],
    barns: [
      { id: 1, color: "yellow" },
      { id: 2, color: "yellow" },
      { id: 3, color: "yellow" }
    ]
  },
  {
    id: 10,
    title: "Yokuş Yukarı",
    desc: "Ahır tepede! Hayvanları hem alt alta diz hem de yokuş yukarı (tersten) sırala.",
    tip: "`column-reverse` kullanarak sütunu tersten dizebilirsin.",
    correctCss: "flex-direction: column-reverse;",
    barnsCss: "flex-direction: column-reverse;",
    animals: [
      { id: 1, type: "cow", color: "default" },
      { id: 2, type: "sheep", color: "red" }
    ],
    barns: [
      { id: 1, color: "default" },
      { id: 2, color: "red" }
    ]
  },
  {
    id: 11,
    title: "Kuyuya İniş",
    desc: "Ördekler kuyunun dibindeki suya inmek istiyor. Sütun oluştur ve onları en aşağı gönder.",
    tip: "DİKKAT: `column` modunda `justify-content` dikey ekseni kontrol eder.",
    correctCss: "flex-direction: column; justify-content: flex-end;",
    barnsCss: "flex-direction: column; justify-content: flex-end;",
    animals: [
      { id: 1, type: "duck", color: "blue" },
      { id: 2, type: "duck", color: "blue" }
    ],
    barns: [
      { id: 1, color: "blue" },
      { id: 2, color: "blue" }
    ]
  },
  {
    id: 12,
    title: "Asansör Bozuldu",
    desc: "Tahıl asansörü bozuldu. Hayvanları tersten sırala ve tam ortada bekle.",
    tip: "`column-reverse` ve `justify-content: center` ikilisi işini görür.",
    correctCss: "flex-direction: column-reverse; justify-content: center;",
    barnsCss: "flex-direction: column-reverse; justify-content: center;",
    animals: [
      { id: 1, type: "sheep", color: "red" }, 
      { id: 2, type: "goat", color: "default" }
    ],
    barns: [
      { id: 1, color: "red" }, 
      { id: 2, color: "default" }
    ]
  },

  // --- BOLUM 4: SIRALAMA (ORDER) ---
  {
    id: 13,
    title: "Lider Çiftçi",
    desc: "Çiftçi Celal sürünün arkasında kalmış! O en önde (başta) olmazsa hayvanlar yürümüyor. Onu sıranın başına al.",
    tip: "Bir elemanı en başa almak için `order` değerini negatif (örn: -1) yap.",
    correctCss: "order: -1;",
    barnsCss: "", 
    animals: [
      { id: 1, type: "sheep", color: "red" },
      { id: 2, type: "sheep", color: "red" },
      { id: 3, type: "farmer", color: "default" }
    ],
    barns: [
      { id: 3, color: "default" }, // Celal
      { id: 1, color: "red" },
      { id: 2, color: "red" }
    ]
  },
  {
    id: 14,
    title: "Uykucu Çiftçi",
    desc: "Çiftçi Celal çok yoruldu ve uykusu geldi. Onu sürünün en arkasına (sonuna) gönder ki biraz kestirsin.",
    tip: "En sona göndermek için pozitif bir `order` değeri (örn: 1) ver.",
    correctCss: "order: 1;",
    barnsCss: "",
    animals: [
      { id: 1, type: "farmer", color: "default" },
      { id: 2, type: "sheep", color: "blue" },
      { id: 3, type: "sheep", color: "blue" }
    ],
    barns: [
      { id: 2, color: "blue" },
      { id: 3, color: "blue" },
      { id: 1, color: "default" } // Celal
    ]
  },
  {
    id: 15,
    title: "Karışıklık",
    desc: "Her şey karıştı! Çiftçi Celal ortada sıkışıp kaldı. Onu liderliğe (-1) taşı.",
    tip: "Sadece Çiftçi'ye kod yazıyorsun. `order: -1` onu kurtarır.",
    correctCss: "order: -1;",
    barnsCss: "",
    animals: [
      { id: 1, type: "sheep", color: "yellow" },
      { id: 2, type: "farmer", color: "default" },
      { id: 3, type: "sheep", color: "yellow" }
    ],
    barns: [
      { id: 2, color: "default" }, // Celal
      { id: 1, color: "yellow" },
      { id: 3, color: "yellow" }
    ]
  },

  // --- BOLUM 5: ALIGN SELF ---
  {
    id: 16,
    title: "İnatçı Keçi",
    desc: "Bu keçi çok inatçı! Sürü hizaya girdi ama keçi en aşağıda, gölgede durmak istiyor. Sadece onu hareket ettir.",
    tip: "Tek bir elemanı hizalamak için `align-self` kullanılır.",
    correctCss: "align-self: flex-end;",
    barnsCss: "", 
    animals: [
      { id: 1, type: "sheep", color: "default" },
      { id: 2, type: "sheep", color: "default" },
      { id: 3, type: "goat", color: "red" }
    ],
    barns: [
      { id: 1, color: "default" },
      { id: 2, color: "default" },
      { id: 3, color: "red" }
    ]
  },

  // --- BOLUM 6: WRAP (PAZAR YERI) ---
  {
    id: 17,
    title: "Pazar Tezgahı",
    desc: "Pazar yerine geldik! Ama elimizdeki hayvanlar tek bir sıraya sığmıyor, taşıyorlar. Alt rafa (satıra) geçmelerine izin ver.",
    tip: "Sığmayan elemanları alt satıra geçirmek için `flex-wrap: wrap;` kullan.",
    correctCss: "flex-wrap: wrap;",
    barnsCss: "flex-wrap: wrap;", 
    animals: [
      { id: 1, type: "sheep", color: "red" }, { id: 2, type: "sheep", color: "red" },
      { id: 3, type: "sheep", color: "red" }, { id: 4, type: "sheep", color: "red" },
      { id: 5, type: "sheep", color: "red" }, { id: 6, type: "sheep", color: "red" },
      { id: 7, type: "sheep", color: "red" }
    ],
    barns: [
      { id: 1, color: "red" }, { id: 2, color: "red" },
      { id: 3, color: "red" }, { id: 4, color: "red" },
      { id: 5, color: "red" }, { id: 6, color: "red" },
      { id: 7, color: "red" }
    ]
  },
  {
    id: 18,
    title: "Depo Sayımı",
    desc: "Depoda yer kalmadı. Hayvanları dikey (sütun) diz ama tavan alçak olduğu için sığmayanlar yan tarafa geçsin.",
    tip: "Hem `column` yap hem de `wrap` özelliğini aç.",
    correctCss: "flex-direction: column; flex-wrap: wrap;",
    barnsCss: "flex-direction: column; flex-wrap: wrap;",
    animals: [
      { id: 1, type: "sheep", color: "blue" }, { id: 2, type: "sheep", color: "blue" },
      { id: 3, type: "sheep", color: "blue" }, { id: 4, type: "sheep", color: "blue" },
      { id: 5, type: "sheep", color: "blue" }, { id: 6, type: "sheep", color: "blue" },
      { id: 7, type: "sheep", color: "blue" }
    ],
    barns: [
      { id: 1, color: "blue" }, { id: 2, color: "blue" },
      { id: 3, color: "blue" }, { id: 4, color: "blue" },
      { id: 5, color: "blue" }, { id: 6, color: "blue" },
      { id: 7, color: "blue" }
    ]
  },
  {
    id: 19,
    title: "Kısayol Ustası",
    desc: "Çiftçi Celal aceleci. Hem yönü hem de sarmayı (wrap) tek satırda yazmanı istiyor.",
    tip: "`flex-flow`, direction ve wrap özelliklerinin kısayoludur. Örn: `flex-flow: column wrap;`",
    correctCss: "flex-flow: column wrap;",
    barnsCss: "flex-flow: column wrap;",
    animals: [
      { id: 1, type: "sheep", color: "yellow" }, { id: 2, type: "sheep", color: "yellow" },
      { id: 3, type: "sheep", color: "yellow" }, { id: 4, type: "sheep", color: "yellow" },
      { id: 5, type: "sheep", color: "yellow" }, { id: 6, type: "sheep", color: "yellow" },
      { id: 7, type: "sheep", color: "yellow" }
    ],
    barns: [
      { id: 1, color: "yellow" }, { id: 2, color: "yellow" },
      { id: 3, color: "yellow" }, { id: 4, color: "yellow" },
      { id: 5, color: "yellow" }, { id: 6, color: "yellow" },
      { id: 7, color: "yellow" }
    ]
  },

  // --- BOLUM 7: ALIGN CONTENT ---
  {
    id: 20,
    title: "Büyük Festival",
    desc: "Büyük Panayır başladı! Satırlar çok sıkışık duruyor. Satırların arasını açarak (space-between) festival alanını ferahlat.",
    tip: "Satırların arasını kontrol etmek için `align-content: space-between;` kullan. (Önce wrap gerekir, o bizden!)",
    correctCss: "flex-wrap: wrap; align-content: space-between;",
    barnsCss: "flex-wrap: wrap; align-content: space-between;",
    animals: [
      { id: 1, type: "sheep", color: "red" }, { id: 2, type: "sheep", color: "red" },
      { id: 3, type: "sheep", color: "red" }, { id: 4, type: "sheep", color: "red" },
      { id: 5, type: "sheep", color: "red" }, { id: 6, type: "sheep", color: "red" },
      { id: 7, type: "sheep", color: "red" }, { id: 8, type: "sheep", color: "red" }
    ],
    barns: [
      { id: 1, color: "red" }, { id: 2, color: "red" },
      { id: 3, color: "red" }, { id: 4, color: "red" },
      { id: 5, color: "red" }, { id: 6, color: "red" },
      { id: 7, color: "red" }, { id: 8, color: "red" }
    ]
  },

  // --- BOLUM 8: GERCEK DUNYA (BONUS) ---
  {
    id: 21,
    title: "Bonus: Navbar Tasarımı",
    desc: "Artık ahır yok! Burası gerçek bir web sitesi header'ı. Logoyu en sola, linkleri ve profili en sağa yaslaman gerekiyor.",
    tip: "İki grubu (logo ve linkler) uçlara itmek için `space-between` kullan.",
    correctCss: "justify-content: space-between;",
    barnsCss: "", // Ahir stili yok
    animals: [
      { id: 1, type: "logo", color: "default" }, 
      { id: 2, type: "link", color: "default" },
      { id: 3, type: "link", color: "default" },
      { id: 4, type: "profile", color: "default" }
    ],
    barns: [] // AHIR YOK
  }
];