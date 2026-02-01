import { useCallback } from 'react';

// ==========================================
// 🎵 SES EFEKT MOTORU (DÜZELTİLMİŞ)
// ==========================================

type SoundType = 'pop' | 'click' | 'success' | 'error';

export const useGameFx = () => {
  
  const playSound = useCallback((type: SoundType) => {
    // Ses linklerini güncelledik ve karışıklığı giderdik
    const soundMap: Record<SoundType, string> = {
      // Hafif bir baloncuk sesi (Level geçişi için)
      pop: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73467.mp3', 
      
      // Kuru, kısa bir tık sesi (Butonlar için) - ARTIK ZAFER SESİ DEĞİL
      click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', 
      
      // Coşkulu zafer/alkış sesi (Sadece kazaninca)
      success: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3', 
      
      // Hata sesi
      error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', 
    };

    try {
      const audio = new Audio(soundMap[type]);
      
      // Click sesi çok yüksek çıkmasın diye kıstık, Success coşkulu olsun
      audio.volume = type === 'click' ? 0.3 : 0.6;
      
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Tarayıcı hatası olursa sessiz kal
        });
      }
    } catch (e) {
      // Audio API hatası
    }
  }, []);

  return { playSound };
};