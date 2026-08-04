'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Shield, Sparkles, Gem, Clock, Phone, MapPin, Star, ChevronUp, Menu, X, Check, ArrowRight, Car, Paintbrush,
  Droplets, Wind, Layers, Camera, GraduationCap, MessageCircle, Send, User, CreditCard, Banknote, Building,
  Monitor, Wrench, ShieldCheck, Volume2, PaintBucket
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

// Portfolio images
interface PortfolioItem {
  src: string
  fallback: string
  category: 'detailing' | 'ppf' | 'cleaning' | 'polishing' | 'films'
  alt: string
}

const portfolioItems: PortfolioItem[] = [
  { src: '/images/portfolio/webp/IMG_9737.webp', fallback: '/images/portfolio/IMG_9737.jpeg', category: 'detailing', alt: 'Детейлинг кузова — до и после' },
  { src: '/images/portfolio/webp/IMG_9738.webp', fallback: '/images/portfolio/IMG_9738.jpeg', category: 'ppf', alt: 'Защитная плёнка PPF — невидимая защита' },
  { src: '/images/portfolio/webp/IMG_9740.webp', fallback: '/images/portfolio/IMG_9740.jpeg', category: 'polishing', alt: 'Полировка и керамическое покрытие' },
  { src: '/images/portfolio/webp/IMG_9741.webp', fallback: '/images/portfolio/IMG_9741.jpeg', category: 'films', alt: 'Виниловая плёнка — полный ребрендинг авто' },
]

// Services data - НОВЫЕ УСЛУГИ С ЦЕНАМИ (АКЦЕНТ НА ПЛЁНКИ!)
const services = [
  {
    icon: <Monitor className="w-6 h-6" />,
    title: 'Компьютерная диагностика',
    description: 'Полная диагностика всех систем автомобиля современным оборудованием',
    price: '1 500 ₽',
    duration: '30 мин',
    popular: false
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Детейлинг салона и кузова',
    description: 'Комплексный детейлинг: химчистка, полировка, защита всех поверхностей',
    price: '12 000 ₽',
    duration: '4+ часов',
    popular: true
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: 'Выпрямление вмятин',
    description: 'Ремонт вмятин без покраски — сохраняем заводское ЛКП',
    price: '5 000 ₽',
    duration: 'от 2 часов',
    popular: false
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Антикоррозийная обработка',
    description: 'Надежная защита от ржавчины для кузова и днища автомобиля',
    price: '18 000 ₽',
    duration: '5+ часов',
    popular: true
  },
  {
    icon: <Paintbrush className="w-6 h-6" />,
    title: 'Полировка',
    description: 'Удаление царапин, голограмм, восстановление заводского блеска',
    price: '16 000 ₽',
    duration: '3+ часов',
    popular: false
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: 'Тонирование',
    description: 'Сертифицированные плёнки для стёкол и фар. Светопропускание по ГОСТ',
    price: '3 000 ₽',
    duration: '1+ часа',
    popular: false
  },
  {
    // ⭐ АКЦЕНТ НА ПЛЁНКИ!
    icon: <PaintBucket className="w-6 h-6" />,
    title: 'Виниловые плёнки',
    description: '🔥 Полный ребрендинг авто! Любой цвет, текстура, матовый/глянцевый. Измени облик машины!',
    price: '48 000 ₽',
    duration: 'от 8 часов',
    popular: true,
    featured: true
  },
  {
    // ⭐ АКЦЕНТ НА ПЛЁНКИ!
    icon: <Shield className="w-6 h-6" />,
    title: 'Защитные плёнки PPF',
    description: '🛡️ Невидимая броня для куза! Защита от камней, царапин, сколов. Гарантия качества!',
    price: '48 000 ₽',
    duration: '6+ часов',
    popular: true,
    featured: true
  },
  {
    icon: <Gem className="w-6 h-6" />,
    title: 'Антихром',
    description: 'Хромирование элементов. Даем гарантию на покрытие до 3 лет',
    price: '1 500 ₽',
    duration: '2+ часа',
    popular: false
  },
  {
    icon: <Volume2 className="w-6 h-6" />,
    title: 'Шумоизоляция',
    description: 'Профессиональная шумоизоляция салона и багажника. Тишина в машине!',
    price: '3 000 ₽',
    duration: '4+ часов',
    popular: false
  }
]

// Reviews data - РЕАЛЬНЫЕ ОТЗЫВЫ
const reviews = [
  {
    text: 'Оклеивали винилом весь кузов — результат превзошёл ожидания! Цвет насыщенный, плёнка без пузырей. Машина выглядит как новая, только лучше!',
    service: 'Виниловая плёнка',
    rating: 5,
    author: 'Дмитрий М.'
  },
  {
    text: 'PPF плёнку поставили на капот, фары и зеркала. Ездил летом на трассе — ни одной сколины от камней! Деньги потрачены не зря.',
    service: 'Защитная плёнка PPF',
    rating: 5,
    author: 'Сергей В.'
  },
  {
    text: 'Делал антикоррозийную обработку + детейлинг. Ребята знают своё дело — всё подробно рассказали, показали процесс. Рекомендую!',
    service: 'Антикоррозия + Детейлинг',
    rating: 5,
    author: 'Ирина К.'
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

      console.log('✅ Lead submitted:', result)
      setFormSubmitted(true)
      
      setTimeout(() => {
        setFormSubmitted(false)
        setFormData({ name: '', phone: '', service: '', comment: '' })
      }, 4000)

    } catch (error) {
      console.error('❌ Submit error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Произошла ошибка. Попробуйте позвонить нам.')
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
      {/* Custom styles */}
      <style jsx global>{`
        :root {
          --accent: #2563eb;
          --accent-light: #3b82f6;
          --accent-dark: #1d4ed8;
          --gold: #f59e0b;
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
          transform: scale(1.03);
        }

        /* Button hover */
        .btn-primary {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(37, 99, 235, 0.3);
        }

        /* Card hover */
        .card-soft {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-soft:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        }

        /* Featured card (for films) */
        .card-featured {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #f59e0b;
        }

        .card-featured:hover {
          box-shadow: 0 25px 50px rgba(245, 158, 11, 0.25);
        }

        /* Hero parallax */
        .hero-bg {
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
        }

        /* Floating animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        /* Glow effect for featured items */
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.3); }
          50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.5); }
        }

        .glow-animation {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-blue-900/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <img 
                src="/logo.png" 
                alt="ЭстетикБро — Детейлинг центр" 
                className="w-11 h-11 object-contain rounded-xl shadow-sm"
              />
              <div className="flex flex-col">
                <span className={`text-lg font-bold tracking-tight transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-gray-900'
                }`}>
                  Эстетик<span className="text-blue-600">Бро</span>
                </span>
                <span className="text-[10px] text-gray-400 tracking-widest uppercase hidden sm:block font-medium">
                  Детейлинг центр
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-9">
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
            <div className="hidden md:flex items-center gap-5">
              <a href={`tel:${CONTACTS.phoneRaw}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium">
                {CONTACTS.phone}
              </a>
              <button
                onClick={() => scrollToSection('contacts')}
                className="px-7 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-full btn-primary shadow-lg shadow-blue-600/25"
              >
                Записаться на услугу
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-xl">
            <div className="px-6 py-8 space-y-6">
              {['services', 'portfolio', 'reviews', 'contacts'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left text-lg text-gray-700 font-medium hover:text-blue-600 transition-colors"
                >
                  {{ services: 'Услуги', portfolio: 'Работы', reviews: 'Отзывы', contacts: 'Контакты' }[item]}
                </button>
              ))}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <a href={`tel:${CONTACTS.phoneRaw}`} className="block text-blue-600 font-bold text-lg">
                  {CONTACTS.phone}
                </a>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full"
                >
                  Записаться на услугу
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - С КРАСИВЫМ ФОНОМ ИЗОБРАЖЕНИЕМ */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 hero-bg">
          <img 
            src="/IMG_9743.png" 
            alt="Детейлинг автомобилей" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200/50 animate-on-scroll">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-blue-700 font-semibold">№1 детейлинг в Челябинске</span>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                Превращаем авто<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600">в произведение</span><br />
                искусства ✨
              </h1>

              {/* Subheading */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                Профессиональный детейлинг, <strong className="text-gray-800">виниловые и защитные плёнки</strong>, полировка. Ваша машина заслуживает идеального вида!
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 animate-on-scroll" style={{ transitionDelay: '300ms' }}>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="px-8 py-4.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl btn-primary inline-flex items-center justify-center gap-2 text-lg shadow-xl shadow-blue-600/30"
                >
                  Записаться на услугу
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href={CONTACTS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4.5 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all inline-flex items-center justify-center gap-2 text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200/80 animate-on-scroll" style={{ transitionDelay: '400ms' }}>
                <div>
                  <div className="text-3xl font-black text-gray-900">500+</div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">авто обслужили</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900">5 лет</div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">на рынке</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900">4.9⭐</div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">рейтинг</div>
                </div>
              </div>
            </div>

            {/* Right content - Featured Service Card */}
            <div className="relative animate-on-scroll float-animation" style={{ transitionDelay: '250ms' }}>
              <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-8 shadow-2xl shadow-amber-900/10 border border-amber-200/50">
                {/* Fire emoji header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">🔥</span>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">ХИТ СЕЗОНА!</h3>
                    <p className="text-amber-700 font-semibold">Плёнки для вашего авто</p>
                  </div>
                </div>

                {/* Film services highlight */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-4 p-4 bg-white/70 rounded-xl">
                    <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center shrink-0">
                      <PaintBucket className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Виниловые плёнки</div>
                      <div className="text-amber-700 font-semibold text-lg">48 000 ₽</div>
                      <div className="text-sm text-gray-600">Любой цвет! Полный ребрендинг!</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/70 rounded-xl">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Защитные PPF</div>
                      <div className="text-blue-700 font-semibold text-lg">48 000 ₽</div>
                      <div className="text-sm text-gray-600">Невидимая броня для кузова!</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => scrollToSection('services')}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl btn-primary glow-animation"
                >
                  Смотреть все услуги →
                </button>
              </div>

              {/* Decorative glow */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-amber-300/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-300/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - С НОВЫМИ УСЛУГАМИ */}
      <section id="services" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Полный спектр услуг
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">услуги</span> и цены
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Профессиональный уход за вашим автомобилем. <strong className="text-amber-600">Особый акцент на плёночные работы!</strong>
            </p>
          </div>

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`group p-6 bg-white rounded-2xl card-soft animate-on-scroll border ${
                  service.featured 
                    ? 'card-featured border-amber-300 glow-animation' 
                    : 'border-gray-100 hover:border-blue-200'
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  service.featured 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                }`}>
                  {service.icon}
                </div>
                
                {service.featured && (
                  <span className="inline-block px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-2">
                    🔥 ХИТ
                  </span>
                )}
                
                <h3 className="text-base font-bold mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                
                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className={`text-xl font-black ${service.featured ? 'text-amber-600' : 'text-blue-600'}`}>
                      {service.price}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{service.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA for films */}
          <div className="mt-12 text-center animate-on-scroll">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
              <span className="text-2xl">🎬</span>
              <div className="text-left">
                <div className="font-bold text-gray-900">Хотите изменить облик авто?</div>
                <div className="text-sm text-gray-600">Виниловые и защитные плёнки — наша специализация!</div>
              </div>
              <button
                onClick={() => scrollToSection('contacts')}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full btn-primary whitespace-nowrap"
              >
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">работы</span>
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
              { value: 'films', label: 'Плёнки 🔥' },
              { value: 'polishing', label: 'Полировка' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === filter.value
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } ${filter.value === 'films' ? 'ring-2 ring-amber-400 ring-offset-2' : ''}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Portfolio grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filteredPortfolio.map((item, index) => (
              <div
                key={`${item.category}-${index}`}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 animate-on-scroll img-hover shadow-lg"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-bold text-lg">{item.alt}</p>
                    <p className="text-white/80 text-sm">ЭстетикБро • Челябинск</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPortfolio.length === 0 && (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">В этой категории пока нет работ</p>
              <p className="text-gray-300 text-sm mt-2">Но мы уже работаем над этим! 🔥</p>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full text-yellow-700 text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              Рейтинг 4.9 на Яндекс Картах
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Отзывы клиентов
            </h2>
            <p className="text-lg text-gray-500">
              Больше <strong className="text-gray-700">19 отзывов</strong> и <strong className="text-gray-700">99% рекомендуют</strong> нас!
            </p>
          </div>

          {/* Reviews grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-lg shadow-gray-200/50 animate-on-scroll card-soft border border-gray-100"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">
                  "{review.text}"
                </p>
                
                {/* Author */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="font-bold text-gray-900">{review.author}</div>
                  <div className="text-sm text-blue-600 font-medium">{review.service}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Link to Yandex */}
          <div className="mt-12 text-center animate-on-scroll">
            <a
              href={CONTACTS.yandexMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Читать все отзывы на Яндекс Картах →
            </a>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Info */}
            <div className="space-y-8 animate-on-scroll">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold mb-4">
                  <Phone className="w-4 h-4" />
                  Свяжитесь с нами
                </div>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
                  Оставьте заявку
                </h2>
                <p className="text-lg text-gray-500">
                  Ответим в течение <strong className="text-gray-700">15 минут</strong>. Рассчитаем стоимость и подберём удобное время!
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone */}
                <a href={`tel:${CONTACTS.phoneRaw}`} className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors group">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{CONTACTS.phone}</div>
                    <div className="text-sm text-gray-500">Звоните ежедневно с 9:00 до 21:00</div>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50">
                  <div className="w-14 h-14 bg-gray-200 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Адрес</div>
                    <div className="text-gray-600 mt-1">{CONTACTS.address}</div>
                    <div className="text-sm text-gray-400 mt-1">{CONTACTS.addressNote}</div>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <a
                    href={CONTACTS.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all inline-flex items-center gap-2"
                  >
                    📱 ВКонтакте
                  </a>
                  <a
                    href={CONTACTS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-green-400 hover:bg-green-50 transition-all inline-flex items-center gap-2"
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    href={CONTACTS.yandexMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-red-400 hover:bg-red-50 transition-all inline-flex items-center gap-2"
                  >
                    📍 Яндекс Карты
                  </a>
                  <a
                    href={CONTACTS.gis2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-orange-400 hover:bg-orange-50 transition-all inline-flex items-center gap-2"
                  >
                    🗺️ 2ГИС
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="animate-on-scroll" style={{ transitionDelay: '150ms' }}>
              <form onSubmit={handleSubmit} className="p-8 lg:p-10 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-black">Быстрая заявка</h3>
                </div>
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Как к вам обращаться?"
                    className={`w-full px-5 py-4 rounded-xl border-2 ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base`}
                  />
                  {formErrors.name && <p className="mt-2 text-sm text-red-500 font-medium">{formErrors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className={`w-full px-5 py-4 rounded-xl border-2 ${formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base`}
                  />
                  {formErrors.phone && <p className="mt-2 text-sm text-red-500 font-medium">{formErrors.phone}</p>}
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                    Интересующая услуга
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base cursor-pointer"
                  >
                    <option value="">Выберите услугу...</option>
                    <option value="🔥 Виниловые плёнки (ХИТ!)">🔥 Виниловые плёнки (ХИТ!)</option>
                    <option value="🛡️ Защитные плёнки PPF (ХИТ!)">🛡️ Защитные плёнки PPF (ХИТ!)</option>
                    {services.filter(s => !s.featured).map((s) => (
                      <option key={s.title} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>

                {/* Comment */}
                <div>
                  <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
                    Комментарий
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    placeholder="Марка авто, желаемое время, вопросы..."
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all text-base"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-xl btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Отправка...
                    </>
                  ) : formSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Заявка отправлена! ✓
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Отправить заявку
                    </>
                  )}
                </button>

                {submitError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-600 font-medium text-center">{submitError}</p>
                  </div>
                )}

                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <a href="#" className="underline hover:text-gray-600">политикой конфиденциальности</a>
                  {' '}и обработкой персональных данных
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - С ЮРИДИЧЕСКИМИ ССЫЛКАМИ И CREDITS */}
      <footer className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Company info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="ЭстетикБро" className="w-10 h-10 object-contain rounded-lg bg-white p-1" />
                <span className="font-bold text-lg">
                  Эстетик<span className="text-blue-400">Бро</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Профессиональный детейлинг центр в Челябинске. Полный спектр услуг по уходу за автомобилем.
              </p>
              <p className="text-gray-500 text-sm">
                {CONTACTS.address}<br/>
                <span className="text-gray-400">{CONTACTS.addressNote}</span>
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-bold mb-6 text-lg">Навигация</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors">Услуги и цены</button></li>
                <li><button onClick={() => scrollToSection('portfolio')} className="text-gray-400 hover:text-white transition-colors">Портфолио</button></li>
                <li><button onClick={() => scrollToSection('reviews')} className="text-gray-400 hover:text-white transition-colors">Отзывы</button></li>
                <li><button onClick={() => scrollToSection('contacts')} className="text-gray-400 hover:text-white transition-colors">Контакты</button></li>
              </ul>
            </div>

            {/* Contacts & Legal */}
            <div>
              <h4 className="font-bold mb-6 text-lg">Контакты</h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <a href={`tel:${CONTACTS.phoneRaw}`} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {CONTACTS.phone}
                  </a>
                </li>
                <li>
                  <a href={CONTACTS.vk} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    💬 ВКонтакте
                  </a>
                </li>
                <li>
                  <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    📱 WhatsApp
                  </a>
                </li>
              </ul>

              {/* Legal links */}
              <div className="pt-6 border-t border-gray-800 space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Юридическая информация</p>
                <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Политика конфиденциальности</a>
                <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Согласие на обработку данных</a>
                <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Публичная оферта</a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <div className="text-gray-500 text-sm">
                © 2019–2026 ЭстетикБро. Все права защищены.
              </div>

              {/* Agency credits */}
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">Сайт разработан:</span>
                <a
                  href="https://t.me/buildgrowthofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors group"
                >
                  <img 
                    src="/growth-logo.jpeg" 
                    alt="Growth" 
                    className="w-6 h-6 object-contain rounded"
                  />
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                    Growth
                  </span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-400">@buildgrowthofficial</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-600/30 flex items-center justify-center hover:bg-blue-700 transition-all z-40 hover:scale-110"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
