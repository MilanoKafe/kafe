import React from 'react';
import { Award, Users, Leaf, Heart, Target, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: 'Tabiiy ingredientlar',
      description: 'Faqat tabiiy va sifatli xom ashyolardan foydalanib mahsulot ishlab chiqaramiz'
    },
    {
      icon: <Heart className="w-8 h-8 text-green-600" />,
      title: 'Sog\'liq uchun foydali',
      description: 'Mahsulotlarimiz vitaminlar va foydali moddalar bilan boyitilgan'
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: 'Yuqori sifat',
      description: 'Xalqaro standartlarga mos keladigan sifat nazorati tizimi'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Mijozlar mamnuniyati',
      description: 'Har bir mijozimizning mamnuniyati bizning asosiy maqsadimiz'
    }
  ];

  const team = [
    {
      name: 'Aziz Karimov',
      position: 'Bosh direktor',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: '15 yillik tajriba bilan oziq-ovqat sanoatida'
    },
    {
      name: 'Malika Tosheva',
      position: 'Ishlab chiqarish menejeri',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Sifat nazorati va texnologik jarayonlar mutaxassisi'
    },
    {
      name: 'Bobur Rahimov',
      position: 'Marketing direktori',
      image: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Brend rivojlantirish va mijozlar bilan ishlash bo\'yicha ekspert'
    }
  ];

  const achievements = [
    {
      number: '10,000+',
      label: 'Mamnun mijozlar'
    },
    {
      number: '50+',
      label: 'Mahsulot turlari'
    },
    {
      number: '5',
      label: 'Yillik tajriba'
    },
    {
      number: '100%',
      label: 'Tabiiy mahsulotlar'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {t('aboutTitle')}
            </h1>
            <p className="text-xl lg:text-2xl text-green-100 max-w-3xl mx-auto">
              O'zbekistondagi eng yaxshi jele mahsulotlari ishlab chiqaruvchisi
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('ourMission')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Jelai kompaniyasi sifatida bizning asosiy maqsadimiz - O'zbekiston xalqiga 
                eng mazali, sog'lom va tabiiy jele mahsulotlarini taqdim etishdir. 
                Biz har bir mahsulotimizni sevgi va g'amxo'rlik bilan tayyorlaymiz.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                2019-yilda tashkil etilgan kompaniyamiz bugungi kunda minglab oilalarga 
                mazali va foydali mahsulotlar yetkazib bermoqda. Bizning muvaffaqiyatimiz 
                mijozlarimizning ishonchi va mahsulotlarimizning sifatiga asoslanadi.
              </p>
              <div className="flex items-center space-x-4">
                <Target className="w-8 h-8 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">
                  Sifat va ta'm - bizning ustuvorligimiz
                </span>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Jelai Factory"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">5+</div>
                  <div className="text-sm">Yillik tajriba</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bizning qadriyatlarimiz
            </h2>
            <p className="text-xl text-gray-600">
              Har bir qarorni qabul qilishda bizni yo'naltiruvchi asosiy tamoyillar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bizning jamoa
            </h2>
            <p className="text-xl text-gray-600">
              Jelai muvaffaqiyati ortidagi professional mutaxassislar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Bizning yutuqlarimiz
            </h2>
            <p className="text-xl text-green-100">
              Raqamlar orqali Jelai muvaffaqiyati
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">
                  {achievement.number}
                </div>
                <div className="text-green-100">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Quality Control"
                className="rounded-lg shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Sifat nazorati
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Jelai mahsulotlarining sifati bizning eng muhim ustuvorligimizdir. 
                Har bir mahsulot ishlab chiqarish jarayonida qat'iy sifat nazoratidan o'tadi.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">
                    Xom ashyolarning sifati dastlabki bosqichda tekshiriladi
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">
                    Ishlab chiqarish jarayoni zamonaviy uskunalar yordamida nazorat qilinadi
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">
                    Tayyor mahsulotlar laboratoriya sharoitida sinovdan o'tkaziladi
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">
                    Xalqaro sifat standartlariga muvofiq sertifikatlashtirish
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Kelajak rejalari
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Jelai kompaniyasi sifatida biz faqat mahalliy bozorda emas, balki 
            xalqaro bozorda ham o'z o'rnimizni egallashni maqsad qilganmiz. 
            Yangi mahsulotlar ishlab chiqish va texnologiyalarni rivojlantirish 
            orqali mijozlarimizga yanada yaxshi xizmat ko'rsatishga intilamiz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2025-yil
              </h3>
              <p className="text-gray-600">
                Yangi ishlab chiqarish sexini ochish va mahsulot turlarini kengaytirish
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2026-yil
              </h3>
              <p className="text-gray-600">
                Markaziy Osiyo davlatlariga eksport qilishni boshlash
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2027-yil
              </h3>
              <p className="text-gray-600">
                Organik mahsulotlar liniyasini ishga tushirish
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;