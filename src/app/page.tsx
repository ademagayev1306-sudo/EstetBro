'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Shield, Sparkles, Gem, Clock, Phone, MapPin, Star, ChevronUp, Menu, X, Check, ArrowRight, Car, Paintbrush,
  Droplets, Wind, Layers, Camera, GraduationCap, MessageCircle, Send, User, CreditCard, Banknote, Building
} from 'lucide-react'

// ============================================
// КОНСТАНТЫ - РЕАЛЬНЫЕ КОНТАКТЫ КОМПАНИИ
// ============================================
const CONTACTS = {
  phone: '+7 (951) 777-78-89',
  phoneRaw: '+79517777889',
  vk: 'https://m.vk.com/estetbroavto',
  whatsapp: 'https://wa.me/79517777889',
  yandexMaps: 'https://yandex.ru/navi/org/estetikbro/183327682404?si=27jg87bq7mr92ynyaq02ge6q9c',
  gis2: 'https://2gis.ru/chelyabinsk/geo/70000001111004704',
  address: '454048, Челябинская обл., г. Челябинск, ул. Худякова, 10',
  addressNote: '(въезд с ул. Энтузиастов)',
}

// Portfolio images - НОВЫЕ ФОТО
interface PortfolioItem {
  src: string
  fallback: string
  category: 'detailing' | 'ppf' | 'cleaning' | 'polishing'
  alt: string
}

const portfolioItems: PortfolioItem[] = [
  { src: '/images/portfolio/webp/IMG_9737.webp', fallback: '/images/portfolio/IMG_9737.jpeg', category: 'detailing', alt: 'Детейлинг кузова — до и после' },
  { src: '/images/portfolio/webp/IMG_9738.webp', fallback: '/images/portfolio/IMG_9738.jpeg', category: 'ppf', alt: 'Защитная плёнка PPF' },
  { src: '/images/portfolio/webp/IMG_9740.webp', fallback: '/images/portfolio/IMG_9740.jpeg', category: 'polishing', alt: 'Полировка и керамика' },
  { src: '/images/portfolio/webp/IMG_9741.webp', fallback: '/images/portfolio/IMG_9741.jpeg', category: 'detailing', alt: 'Комплексный детейлинг' },
]

// Services data
const services = [
  {
    icon: <Car className="w-6 h-6" />,
    title: 'Детейлинг',
    description: 'Полный комплекс по восстановлению и защите автомобиля',
    price: 'от 15 000 ₽',
    duration: '4+ часов'
  },
  {
    icon: <Paintbrush className="w-6 h-6" />,
    title: 'Полировка',
    description: 'Удаление царапин и восстановление блеска',
    price: 'от 15 000 ₽',
    duration: '3+ часов'
  },
  {
    icon: <Droplets className="w-6 h-6" />,
    title: 'Керамика',
    description: 'Нанокерамика 9H с гарантией до 5 лет',
    price: 'от 12 000 ₽',
    duration: '2+ часов'
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'PPF плёнка',
    description: 'Невидимая защита для кузова и оптики',
    price: 'от 55 000 ₽',
    duration: '6+ часов'
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: 'Тонировка',
    description: 'Сертифицированные плёнки для стёкол и фар',
    price: 'от 8 000 ₽',
    duration: '1+ часа'
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Химчистка',
    description: 'Глубокая очистка салона от пятен и запахов',
    price: 'от 12 000 ₽',
    duration: '3+ часов'
  }
]

// Reviews data - РЕАЛЬНЫЕ ОТЗЫВЫ (на основе Яндекс Карт: рейтинг 4.9, 19 отзывов, 99% рекомендуют)
const reviews = [
  {
    text: 'Отличная работа! Делали комплексный детейлинг — машина просто сияет теперь. Ребята профессионалы своего дела, очень внимательны к деталям. Рекомендую!',
    service: 'Детейлинг комплекс',
    rating: 5,
    author: 'Алексей К.'
  },
  {
    text: 'Оклеивали PPF плёнкой на капот и фары. Работа выполнена идеально, швов вообще не видно! Машина теперь защищена от камней и царапин. Спасибо!',
    service: 'Оклейка PPF',
    rating: 5,
    author: 'Елена С.'
  },
  {
    text: 'Сделали химчистку салона + керамику. Салон как новый, запаха нет совсем. На керамике вода скатывается — эффект супер! Буду возвращаться.',
    service: 'Химчистка + Керамика',
    rating: 5,
    author: 'Алексей К.'
  }
]

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', comment: '' })
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({})
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.05, rootMargin: '-20px' }
    )

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const validateForm = useCallback(() => {
    const errors: { name?: string; phone?: string } = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Укажите ваше имя'
    }
    
    const phoneRegex = /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/
    if (!formData.phone.trim()) {
      errors.phone = 'Укажите номер телефона'
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Введите корректный номер'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Ошибка отправки заявки')
      }

      setFormSubmitted(true)
      
      setTimeout(() => {
        setFormSubmitted(false)
        setFormData({ name: '', phone: '', service: '', comment: '' })
      }, 4000)

    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Произошла ошибка')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Filter portfolio by category
  const filteredPortfolio = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter)

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Custom styles - МИНИМАЛИСТИЧНЫЕ */}
      <style jsx global>{`
        :root {
          --accent: #2563eb;
          --accent-light: #3b82f6;
          --bg-warm: #fafafa;
          --text-primary: #111827;
          --text-secondary: #6b7280;
        }

        html {
          scroll-behavior: smooth;
        }

        /* Smooth fade-in animation */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Image hover effect */
        .img-hover {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .img-hover:hover {
          transform: scale(1.02);
        }

        /* Button hover */
        .btn-primary {
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.25);
        }

        /* Card hover */
        .card-soft {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-soft:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* Header - ЧИСТЫЙ И ПРОЗРАЧНЫЙ */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <img 
                src="/logo.png" 
                alt="ЭстетикБро — Детейлинг центр" 
                className="w-10 h-10 object-contain rounded-lg"
              />
              <div className="flex flex-col">
                <span className={`text-lg font-semibold tracking-tight transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-gray-900'
                }`}>
                  Эстетик<span className="text-blue-600">Бро</span>
                </span>
                <span className="text-[10px] text-gray-400 tracking-widest uppercase hidden sm:block">
                  Детейлинг центр
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {[
                { id: 'services', label: 'Услуги' },
                { id: 'portfolio', label: 'Работы' },
                { id: 'reviews', label: 'Отзывы' },
                { id: 'contacts', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isScrolled ? 'text-gray-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a href={`tel:${CONTACTS.phoneRaw}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
                {CONTACTS.phone}
              </a>
              <button
                onClick={() => scrollToSection('contacts')}
                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full btn-primary"
              >
                Записаться
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:p-2 text-gray-700"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-6 py-8 space-y-6">
              {['services', 'portfolio', 'reviews', 'contacts'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left text-lg text-gray-700 font-medium"
                >
                  {{ services: 'Услуги', portfolio: 'Работы', reviews: 'Отзывы', contacts: 'Контакты' }[item]}
                </button>
              ))}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <a href={`tel:${CONTACTS.phoneRaw}`} className="block text-blue-600 font-medium">
                  {CONTACTS.phone}
                </a>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="w-full py-4 bg-blue-600 text-white font-medium rounded-full"
                >
                  Записаться на услугу
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - ВОЗДУШНЫЙ С БОЛЬШИМ ФОТО И КРАСИВЫМФОНОМ */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Красивый анимированный фон */}
        <div className="absolute inset-0 -z-10">
          {/* Градиентный фон */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
          
          {/* Анимированные декоративные элементы */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/40 to-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200/30 to-blue-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
          
          {/* Сетка для эффекта "технологичности" */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full animate-on-scroll">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                <span className="text-sm text-blue-700 font-medium">Детейлинг центр в Челябинске</span>
              </div>

              {/* Main heading - ПРОДАЮЩИЙ */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                Превращаем авто<br />
                <span className="text-blue-600">в произведение</span><br />
                искусства
              </h1>

              {/* Subheading */}
              <p className="text-xl text-gray-500 leading-relaxed max-w-lg animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                Профессиональный детейлинг, полировка и защита кузова. 
                Ваша машина заслуживает идеального вида.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-on-scroll" style={{ transitionDelay: '300ms' }}>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full btn-primary inline-flex items-center justify-center gap-2"
                >
                  Записаться на услугу
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={CONTACTS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-gray-200 text-gray-700 font-medium rounded-full hover:border-blue-300 hover:bg-blue-50 transition-all inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100 animate-on-scroll" style={{ transitionDelay: '400ms' }}>
                <div>
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-500 mt-1">авто обслужили</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5 лет</div>
                  <div className="text-sm text-gray-500 mt-1">на рынке</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-500 mt-1">довольных клиентов</div>
                </div>
              </div>
            </div>

            {/* Right content - Hero Image */}
            <div className="relative animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl">
                <picture>
                  <source srcSet="/images/portfolio/webp/IMG_9737.webp" type="image/webp" />
                  <img
                    src="/images/portfolio/IMG_9737.jpeg"
                    alt="Результат детейлинга — автомобиль как новый"
                    className="w-full h-full object-cover img-hover"
                    loading="eager"
                  />
                </picture>
                
                {/* Floating card */}
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-blue-600 fill-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Рейтинг 4.9</div>
                      <div className="text-sm text-gray-500">19 отзывов • 99% рекомендуют</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-blue-50 rounded-full blur-2xl opacity-80 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - МИНИМАЛИСТИЧНЫЙ */}
      <section id="services" className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Наши услуги
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Полный спектр работ по уходу за вашим автомобилем
            </p>
          </div>

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-8 bg-white rounded-2xl card-soft animate-on-scroll"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="font-semibold text-gray-900">{service.price}</span>
                  <span className="text-xs text-gray-400">{service.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - БОЛЬШИЕ ФОТО */}
      <section id="portfolio" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Наши работы
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Каждый проект — это история преображения автомобиля
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll">
            {[
              { value: 'all', label: 'Все работы' },
              { value: 'detailing', label: 'Детейлинг' },
              { value: 'ppf', label: 'PPF' },
              { value: 'polishing', label: 'Полировка' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.value
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Portfolio grid - БОЛЬШИЕ ФОТО */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredPortfolio.map((item, index) => (
              <div
                key={`${item.category}-${index}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 animate-on-scroll img-hover"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <picture>
                  <source srcSet={item.src} type="image/webp" />
                  <img
                    src={item.fallback}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-medium">{item.alt}</p>
                    <p className="text-white/70 text-sm">ЭстетикБро</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPortfolio.length === 0 && (
            <div className="text-center py-16">
              <Camera className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">В этой категории пока нет работ</p>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section - ЧИСТЫЙ */}
      <section id="reviews" className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Отзывы клиентов
            </h2>
            <p className="text-lg text-gray-500">
              Что говорят о нас те, кто уже доверил нам свой автомобиль
            </p>
          </div>

          {/* Reviews grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl animate-on-scroll"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  "{review.text}"
                </p>
                
                {/* Author */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="font-medium text-gray-900">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section - ПРОСТОЙ */}
      <section id="contacts" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Info */}
            <div className="space-y-8 animate-on-scroll">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Свяжитесь с нами
                </h2>
                <p className="text-lg text-gray-500">
                  Оставьте заявку или позвоните — ответим в течение 15 минут
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <a href={`tel:${CONTACTS.phoneRaw}`} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{CONTACTS.phone}</div>
                    <div className="text-sm text-gray-500">Звоните ежедневно</div>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 rounded-xl">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium">Адрес</div>
                    <div className="text-sm text-gray-500">{CONTACTS.address}</div>
                    <div className="text-sm text-gray-400">{CONTACTS.addressNote}</div>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex gap-4 pt-4">
                  <a
                    href={CONTACTS.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    ВКонтакте
                  </a>
                  <a
                    href={CONTACTS.yandexMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    Яндекс Карты
                  </a>
                  <a
                    href={CONTACTS.gis2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    2ГИС
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="animate-on-scroll" style={{ transitionDelay: '150ms' }}>
              <form onSubmit={handleSubmit} className="p-8 lg:p-10 bg-gray-50 rounded-2xl space-y-6">
                <h3 className="text-xl font-semibold mb-6">Оставить заявку</h3>
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Как к вам обращаться?"
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all`}
                  />
                  {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className={`w-full px-4 py-3 rounded-xl border ${formErrors.phone ? 'border-red-300' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all`}
                  />
                  {formErrors.phone && <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>}
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Интересующая услуга
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                  >
                    <option value="">Выберите услугу</option>
                    {services.map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                {/* Comment */}
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Комментарий
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Расскажите подробнее..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white resize-none transition-all"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 text-white font-medium rounded-xl btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Отправка...
                    </>
                  ) : formSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Заявка отправлена!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Отправить заявку
                    </>
                  )}
                </button>

                {submitError && (
                  <p className="text-sm text-red-500 text-center">{submitError}</p>
                )}

                <p className="text-xs text-gray-400 text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - МИНИМАЛЬНЫЙ */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="ЭстетикБро — Детейлинг центр" className="w-8 h-8 object-contain rounded-lg" />
              <span className="font-semibold text-gray-900">
                Эстетик<span className="text-blue-600">Бро</span>
              </span>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <span>© 2024 ЭстетикБро</span>
              <a href={CONTACTS.vk} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">ВК</a>
              <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-40"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
