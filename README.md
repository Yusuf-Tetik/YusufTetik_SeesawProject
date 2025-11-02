# Tahterevalli Simülasyonu

Bu proje, saf **HTML, CSS ve JavaScript** kullanılarak geliştirdiğim bir tahterevalli simülasyonudur.  
Kullanıcı, tahtanın istediği noktasına tıklayarak **1–10 kg** arasında rastgele bir ağırlık bırakabiliyor.  
Her tıklamada sistem, ağırlıkları dikkate alıp **tork hesaplamasını** yapıyor ve tahtanın **denge ve eğimini** gerçek zamanlı olarak güncelliyor.

---

## 💡 Düşünce ve Tasarım Süreci

Projeye başlamadan önce hangi adımlarla ilerleyeceğimi netleştirdim.  
İlk olarak HTML yapısını kurup, CSS ile genel tasarımı oturttum.  
Daha sonra JavaScript tarafında kullanıcı etkileşimi, fizik hesaplamaları ve animasyon geçişlerini adım adım ekledim.  
Projeyi aşamalara bölmek, hem hataları daha kolay fark etmemi sağladı hem de mantıklı bir gelişim süreci oluşturdu.

Tasarım olarak bana verilen örneğin yapısını korudum ama kendi dokunuşlarımı da ekledim.  
Ağırlıkları 1’den 10’a kadar açık renkten koyuya giden tonlarla tasarladım.  
Bu hem görsel olarak daha dengeli bir görüntü verdi hem de kullanıcı hangi ağırlığın daha fazla olduğunu kolayca fark edebiliyor.  
Her eklenen ağırlığın üzerinde **kilo değeri** bulunuyor ve altta da tüm eklemelerin listelendiği **düşüş geçmişi** bölümü yer alıyor.

---

## ⚙️ Karşılaşılan Zorluklar

Gerçek dünyadaki dengeyi ekrana sade ama tutarlı bir şekilde yansıtmak biraz zaman aldı.  
Bazı değerleri deneme-yanılma yöntemiyle ayarladım.  
Özellikle pivot hizalamasında tahtayla arasında boşluk kalıyordu. Bu sorunu CSS üzerinde ince oynamalar yaparak düzelttim.  

Ayrıca animasyonun ani hareket etmesi sorununu requestAnimationFrame ve küçük bir easing değeriyle yumuşatarak çözdüm.  
Renk geçişlerinde ise aynı ağırlığın her zaman aynı renkte görünmesini sağlamak için ağırlıklara özel renk eşlemesi kullandım.

---

## 🧠 AI Desteği

Kodun tamamını kendim yazdım, ancak geliştirme sürecinde CSS düzenlemelerinde,  
README taslağını toparlama kısmında ve bazı hataları fark etme aşamasında AI’dan destek aldım.  
Özellikle zamanımın kısıtlı olduğu ve Cumartesi günü projeye maalesef vakit ayıramadığım için,  
hataları daha hızlı bulmamı sağladı ve bu da bana ciddi şekilde zaman kazandırdı.  
Ayrıca bazı fiziksel hesaplamaların doğruluğunu kontrol ederken kısa süreli fikir desteği aldım.

---

