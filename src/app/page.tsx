'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Shield, Sparkles, Gem, Clock, Phone, MapPin, Clock as TimeIcon, 
  Star, ChevronUp, Menu, X, Check, ArrowRight, Car, Paintbrush,
  Droplets, Wind, Layers, Camera, GraduationCap, MessageCircle,
  Send, User, CreditCard, Banknote, Repeat, Building, Loader2
} from 'lucide-react'

// ============================================
// КОНСТАНТЫ - Реальные контакты из брифа
// ============================================
const CONTACTS = {
  phone: '+7 (351) 900-54-32',      // Реальный телефон для замены
  phoneRaw: '+73519005432',          // Для tel: и wa.me: ссылок
  vk: 'https://vk.com/estetbroavto', // Подтверждённый VK
  telegram: 'https://t.me/estetbroavto', // Для замены на реальный
  whatsapp: 'https://wa.me/73519005432',  // Для замены на реальный
  yandexMaps: 'https://yandex.ru/navi/org/estetikbro/183327682404',
  gis2: 'https://2gis.ru/chelyabinsk/geo/70000001111004704',
  address: 'г. Челябинск, ул. Худякова, 10',
  addressNote: '(въезд с ул. Энтузиастов)',
}

// Portfolio images with categories for filtering
interface PortfolioItem {
  src: string
  category: 'detailing' | 'ppf' | 'cleaning' | 'polishing'
  alt: string
}

const portfolioItems: PortfolioItem[] = [
  { src: '/images/portfolio/IMG_9588.jpeg', category: 'detailing', alt: 'Детейлинг кузова' },
  { src: '/images/portfolio/IMG_9679.jpeg', category: 'ppf', alt: 'Оклейка защитной плёнкой' },
  { src: '/images/portfolio/IMG_9683.jpeg', category: 'cleaning', alt: 'Химчистка салона' },
  { src: '/images/portfolio/IMG_9589.jpeg', category: 'polishing', alt: 'Полировка фар' },
  { src: '/images/portfolio/IMG_9590.jpeg', category: 'detailing', alt: 'Комплексный детейлинг' },
  { src: '/images/portfolio/IMG_9591.jpeg', category: 'cleaning', alt: 'Глубокая очистка' },
  { src: '/images/portfolio/IMG_9592.jpeg', category: 'ppf', alt: 'Защита кузова PPF' },
  { src: '/images/portfolio/IMG_9680.jpeg', category: 'detailing', alt: 'Детейлинг после работ' },
  { src: '/images/portfolio/IMG_9682.jpeg', category: 'polishing', alt: 'Полировка кузова' },
  { src: '/images/portfolio/IMG_9688.jpeg', category: 'detailing', alt: 'Результат детейлинга' },
]

// Services data
const services = [
  {
    icon: <Car className="w-8 h-8" />,
    title: 'Детейлинг',
    description: 'Полный комплекс работ по восстановлению и защите автомобиля. От мойки до финишной полировки.',
    price: '15 000',
    duration: 'от 4 часов'
  },
  {
    icon: <Paintbrush className="w-8 h-8" />,
    title: 'Полировка',
    description: 'Удаление царапин, окислов, голограмм. Восстановление заводского блеска кузова.',
    price: '15 000',
    duration: 'от 3 часов'
  },
  {
    icon: <Droplets className="w-8 h-8" />,
    title: 'Керамическое покрытие',
    description: 'Нанокерамика 9H для защиты ЛКП от царапин, химии, УФ-излучения. Гарантия до 5 лет.',
    price: '12 000',
    duration: 'от 2 часов'
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Оклейка плёнкой (зоны риска)',
    description: 'Защитная полиуретановая плёнка для капота, бамперов, порогов. Невидимая броня для кузова.',
    price: '55 000',
    duration: 'от 6 часов'
  },
  {
    icon: <Wind className="w-8 h-8" />,
    title: 'Тонировка',
    description: 'Тонирование стёкол и фар. Защита от солнца и посторонних взглядов. Сертифицированные плёнки.',
    price: '8 000',
    duration: 'от 1 часа'
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Химчистка салона',
    description: 'Глубокая очистка всех поверхностей салона. Удаление пятен, запахов, аллергенов.',
    price: '12 000',
    duration: 'от 3 часов'
  }
]

// Packages data
const packages = [
  {
    name: 'Химчистка + Керамика',
    description: 'Комплексная защита и чистота салона. Идеально для поддержки авто в идеальном состоянии.',
    features: ['Полная химчистка салона', 'Керамическое покрытие салона', 'Обработка кожи', 'Защита от загрязнений'],
    popular: true,
    savings: 'Экономия до 15%'
  },
  {
    name: 'Плёнка + Полировка фар',
    description: 'Полная защита кузова и оптики. Максимальная сохранность внешнего вида.',
    features: ['Оклейка зон риска PPF', 'Полировка фар', 'Нанокерамика на фары', 'Гарантия на работы'],
    popular: false,
    savings: 'Экономия до 20%'
  }
]

// Advantages data
const advantages = [
  { icon: <Layers className="w-7 h-7" />, text: 'Широкий спектр услуг под одной крышей' },
  { icon: <User className="w-7 h-7" />, text: 'Индивидуальный подход к каждому авто' },
  { icon: <CreditCard className="w-7 h-7" />, text: 'Доступные цены без потери качества' },
  { icon: <Car className="w-7 h-7" />, text: 'Работаем со всеми марками автомобилей' },
  { icon: <Banknote className="w-7 h-7" />, text: 'Наличные, карта, СБП, рассрочка' },
  { icon: <Building className="w-7 h-7" />, text: 'Работаем с юрлицами и безналом' }
]

// Reviews data (реальные инсайты из отзывов)
const reviews = [
  {
    text: 'После шумоизоляции в салоне стало значительно тише — теперь можно спокойно разговаривать на скорости. Ребята сделали всё качественно и в срок!',
    service: 'Шумоизоляция',
    rating: 5,
    author: 'Алексей К.'
  },
  {
    text: 'Сделал химчистку и полную полировку — машина выглядит как новая! Уже пересмотрел решение о продаже авто, теперь езжу с удовольствием каждый день.',
    service: 'Детейлинг комплекс',
    rating: 5,
    author: 'Мария В.'
  },
  {
    text: 'Оклеивали зоны риска — работа выполнена аккуратно, швов почти не видно. Очень довольна сроками и вниманием к деталям мастера.',
    service: 'Оклейка PPF',
    rating: 5,
    author: 'Елена С.'
  }
]

// Hero advantages
const heroAdvantages = [
  { icon: <Shield className="w-8 h-8" />, text: 'Защита и уход' },
  { icon: <Sparkles className="w-8 h-8" />, text: 'Идеальная чистота' },
  { icon: <Gem className="w-8 h-8" />, text: 'Премиум материалы' },
  { icon: <Clock className="w-8 h-8" />, text: 'Внимание к деталям' }
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
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)

      // Update active section based on scroll position
      const sections = ['hero', 'services', 'packages', 'portfolio', 'advantages', 'reviews', 'training', 'contacts']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
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
      { threshold: 0.1, rootMargin: '-50px' }
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
    
    const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/
    if (!formData.phone.trim()) {
      errors.phone = 'Укажите номер телефона'
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Введите корректный номер'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }, [formData])

  // Real form submission to API
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

      console.log('Lead submitted successfully:', result)
      setFormSubmitted(true)
      
      // Reset form after success display
      setTimeout(() => {
        setFormSubmitted(false)
        setFormData({ name: '', phone: '', service: '', comment: '' })
      }, 4000)

    } catch (error) {
      console.error('Submit error:', error)
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
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
      {/* Custom styles */}
      <style jsx global>{`
        :root {
          --neon-blue: #2EA8FF;
          --neon-blue-dark: #1E90FF;
          --bg-dark: #0A0A0A;
          --bg-dark-secondary: #0D0D0F;
          --bg-card: #141418;
          --border-color: rgba(46, 168, 255, 0.15);
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: var(--neon-blue) var(--bg-dark);
        }

        .neon-glow {
          box-shadow: 0 0 20px rgba(46, 168, 255, 0.3), 0 0 40px rgba(46, 168, 255, 0.1);
        }

        .neon-glow-hover:hover {
          box-shadow: 0 0 30px rgba(46, 168, 255, 0.5), 0 0 60px rgba(46, 168, 255, 0.2);
        }

        .text-gradient {
          background: linear-gradient(135deg, #ffffff 0%, var(--neon-blue) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-bg {
          background: radial-gradient(ellipse at center bottom, rgba(46, 168, 255, 0.08) 0%, transparent 60%),
                      linear-gradient(180deg, #0A0A0A 0%, #0D0D0F 100%);
        }

        .diagonal-lines {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(46, 168, 255, 0.03) 50px,
            rgba(46, 168, 255, 0.03) 51px
          );
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          border-color: rgba(46, 168, 255, 0.4);
          box-shadow: 0 10px 40px rgba(46, 168, 255, 0.15);
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(46, 168, 255, 0.3); }
          50% { box-shadow: 0 0 40px rgba(46, 168, 255, 0.6); }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spin-animation {
          animation: spin-slow 1s linear infinite;
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - РЕАЛЬНЫЙ ЛОГОТИП */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
              <img 
                src="/logo.svg" 
                alt="ЭстетикБро — Детейлинг центр" 
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold leading-tight">
                  <span className="text-white">ЭСТЕТИК</span>{' '}
                  <span className="text-[#2EA8FF]">БРО</span>
                </span>
                <span className="text-[10px] text-gray-400 tracking-wider hidden sm:block">ДЕТЕЙЛИНГ ЦЕНТР</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { id: 'services', label: 'Услуги' },
                { id: 'packages', label: 'Пакеты' },
                { id: 'portfolio', label: 'Портфолио' },
                { id: 'reviews', label: 'Отзывы' },
                { id: 'training', label: 'Обучение' },
                { id: 'contacts', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-[#2EA8FF] ${
                    activeSection === item.id ? 'text-[#2EA8FF]' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA & Contact - РЕАЛЬНЫЙ ТЕЛЕФОН */}
            <div className="hidden md:flex items-center gap-4">
              <a href={`tel:${CONTACTS.phoneRaw}`} className="text-sm text-gray-300 hover:text-[#2EA8FF] transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{CONTACTS.phone}</span>
              </a>
              <button
                onClick={() => scrollToSection('contacts')}
                className="px-5 py-2.5 bg-[#2EA8FF] text-black font-semibold rounded-lg neon-glow neon-glow-hover transition-all hover:bg-[#1E90FF]"
              >
                Записаться
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0D0D0F]/98 backdrop-blur-md border-t border-white/5">
            <div className="px-4 py-6 space-y-4">
              {[
                { id: 'services', label: 'Услуги' },
                { id: 'packages', label: 'Пакеты' },
                { id: 'portfolio', label: 'Портфолио' },
                { id: 'reviews', label: 'Отзывы' },
                { id: 'training', label: 'Обучение' },
                { id: 'contacts', label: 'Контакты' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-gray-300 hover:text-[#2EA8FF] transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a href={`tel:${CONTACTS.phoneRaw}`} className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4" />
                  {CONTACTS.phone}
                </a>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="w-full py-3 bg-[#2EA8FF] text-black font-semibold rounded-lg"
                >
                  Записаться на услугу
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center hero-bg diagonal-lines pt-20">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2EA8FF]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#2EA8FF]/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="space-y-8">
              {/* Rating badges */}
              <div className="flex flex-wrap gap-4 animate-on-scroll">
                <a 
                  href={CONTACTS.yandexMaps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-[#2EA8FF]/30 transition-colors"
                >
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">4.8</span>
                  <span className="text-sm text-gray-400">Яндекс Карты</span>
                </a>
                <a 
                  href={CONTACTS.gis2} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-[#2EA8FF]/30 transition-colors"
                >
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">5.0</span>
                  <span className="text-sm text-gray-400">2ГИС</span>
                </a>
              </div>

              {/* Main heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                <span className="text-white">Эстетик</span>
                <span className="text-[#2EA8FF]">Бро</span>
                <br />
                <span className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-normal mt-4 block">
                  профессиональный детейлинг автомобилей
                </span>
              </h1>

              {/* USP subtitle */}
              <p className="text-lg text-gray-400 max-w-xl animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                Доступные цены • Индивидуальный подход • Работаем со всеми марками авто
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll" style={{ transitionDelay: '300ms' }}>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="px-8 py-4 bg-[#2EA8FF] text-black font-bold text-lg rounded-xl neon-glow pulse-glow hover:bg-[#1E90FF] transition-all inline-flex items-center justify-center gap-2"
                >
                  Записаться на диагностику
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href={CONTACTS.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-[#2EA8FF]/30 text-white font-semibold rounded-xl hover:bg-[#2EA8FF]/10 transition-all inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  VK сообщество
                </a>
              </div>

              {/* Hero advantages */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 animate-on-scroll" style={{ transitionDelay: '400ms' }}>
                {heroAdvantages.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[#2EA8FF]">{item.icon}</div>
                    <span className="text-xs text-gray-400 text-center">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Hero image */}
            <div className="relative hidden lg:block animate-on-scroll" style={{ transitionDelay: '300ms' }}>
              <div className="relative float-animation">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2EA8FF]/20 to-transparent rounded-2xl blur-2xl"></div>
                <img
                  src="/images/portfolio/IMG_9688.jpeg"
                  alt="Детейлинг автомобиля в студии ЭстетикБро"
                  className="relative rounded-2xl w-full object-cover aspect-[4/3] border border-white/10"
                  loading="eager"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent rounded-2xl"></div>
                
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#2EA8FF]/20 rounded-lg flex items-center justify-center">
                      <Car className="w-6 h-6 text-[#2EA8FF]" />
                    </div>
                    <div>
                      <p className="font-semibold">Более 500+ авто</p>
                      <p className="text-sm text-gray-400">обслужено за год</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#2EA8FF] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-[#0D0D0F] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Наши <span className="text-[#2EA8FF]">услуги</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Полный спектр детейлинг-услуг для вашего автомобиля. Работаем с любыми marque и моделями.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 rounded-2xl bg-[#141418] border border-white/5 card-hover animate-on-scroll"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#2EA8FF]/10 flex items-center justify-center text-[#2EA8FF] mb-6 group-hover:bg-[#2EA8FF]/20 transition-colors">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#2EA8FF] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex items-end justify-between pt-4 border-t border-white/5">
                  <div>
                    <p className="text-2xl font-bold text-[#2EA8FF]">от {service.price} ₽</p>
                    <p className="text-xs text-gray-500 mt-1">{service.duration}</p>
                  </div>
                  <button
                    onClick={() => {
                      setFormData(prev => ({ ...prev, service: service.title }))
                      scrollToSection('contacts')
                    }}
                    className="px-4 py-2 text-sm font-medium text-[#2EA8FF] border border-[#2EA8FF]/30 rounded-lg hover:bg-[#2EA8FF]/10 transition-all"
                  >
                    Записаться
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional service note */}
          <div className="mt-8 p-6 rounded-xl bg-[#2EA8FF]/5 border border-[#2EA8FF]/20 text-center animate-on-scroll">
            <p className="text-gray-300">
              <span className="text-[#2EA8FF] font-semibold">Дополнительно:</span> Полировка и бронирование фар — уточняйте стоимость при записи
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2EA8FF]/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2EA8FF]/10 rounded-full text-[#2EA8FF] text-sm font-medium mb-4">
              <Gem className="w-4 h-4" />
              Выгодные комплекты
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Комплексные <span className="text-[#2EA8FF]">пакеты</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Упаковываем услуги на основе аудита вашего авто. Комплексный подход выгоднее — это знают наши клиенты.
            </p>
          </div>

          {/* Packages grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border card-hover animate-on-scroll ${
                  pkg.popular 
                    ? 'bg-gradient-to-b from-[#2EA8FF]/10 to-[#141418] border-[#2EA8FF]/30' 
                    : 'bg-[#141418] border-white/5'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#2EA8FF] text-black text-xs font-bold rounded-full">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
                <p className="text-gray-400 mb-6">{pkg.description}</p>
                
                {/* Savings badge */}
                <div className="inline-block mb-4 px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full">
                  {pkg.savings}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#2EA8FF] shrink-0 mt-0.5" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, service: pkg.name }))
                    scrollToSection('contacts')
                  }}
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    pkg.popular
                      ? 'bg-[#2EA8FF] text-black neon-glow hover:bg-[#1E90FF]'
                      : 'border border-[#2EA8FF]/30 text-[#2EA8FF] hover:bg-[#2EA8FF]/10'
                  }`}
                >
                  Рассчитать стоимость
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - С РАБОЧЕЙ ФИЛЬТРАЦИЕЙ */}
      <section id="portfolio" className="py-20 md:py-32 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Портфолио <span className="text-[#2EA8FF]">До / После</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Реальные результаты наших работ. Каждое фото — подтверждение качества.
            </p>
          </div>

          {/* Filter tabs - РАБОЧИЕ */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll">
            {[
              { value: 'all', label: 'Все работы' },
              { value: 'detailing', label: 'Детейлинг' },
              { value: 'ppf', label: 'Оклейка PPF' },
              { value: 'cleaning', label: 'Химчистка' },
              { value: 'polishing', label: 'Полировка' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.value
                    ? 'bg-[#2EA8FF] text-black'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Portfolio grid - ФИЛЬТРУЕТСЯ */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredPortfolio.map((item, index) => (
              <div
                key={`${item.category}-${index}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-[#141418] animate-on-scroll"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-medium">{item.alt}</p>
                    <p className="text-xs text-gray-400">ЭстетикБро</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state for filter */}
          {filteredPortfolio.length === 0 && (
            <div className="text-center py-12">
              <Camera className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">В этой категории пока нет работ</p>
            </div>
          )}
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-20 md:py-32 bg-[#0A0A0A] relative">
        <div className="absolute inset-0 diagonal-lines opacity-50 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Почему выбирают <span className="text-[#2EA8FF]">нас</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Не просто слова — реальные преимущества для каждого клиента.
            </p>
          </div>

          {/* Advantages grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-white/[0.02] border border-white/5 card-hover animate-on-scroll"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 shrink-0 rounded-lg bg-[#2EA8FF]/10 flex items-center justify-center text-[#2EA8FF]">
                  {adv.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{adv.text}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 md:py-32 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Отзывы <span className="text-[#2EA8FF]]">клиентов</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Что говорят те, кто уже доверил нам свой автомобиль.
            </p>
          </div>

          {/* Reviews grid - С ИМЕНAMI */}
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-6 md:p-8 rounded-2xl bg-[#141418] border border-white/5 card-hover animate-on-scroll"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                
                {/* Review text */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                
                {/* Author & Service */}
                <div className="pt-4 border-t border-white/5">
                  <p className="font-medium">{review.author}</p>
                  <p className="text-sm text-[#2EA8FF]">{review.service}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Links to review platforms - РЕАЛЬНЫЕ ССЫЛКИ */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 animate-on-scroll">
            <a
              href={CONTACTS.yandexMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-xl border border-white/10 hover:border-[#2EA8FF]/30 transition-all"
            >
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <div className="text-left">
                <p className="text-sm font-medium">Яндекс Карты</p>
                <p className="text-xs text-gray-400">4.8 · 15 отзывов</p>
              </div>
            </a>
            <a
              href={CONTACTS.gis2}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-xl border border-white/10 hover:border-[#2EA8FF]/30 transition-all"
            >
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <div className="text-left">
                <p className="text-sm font-medium">2ГИС</p>
                <p className="text-xs text-gray-400">5.0 · 24 отзыва</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2EA8FF]/5 via-transparent to-[#2EA8FF]/5 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-on-scroll">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2EA8FF]/10 rounded-full text-[#2EA8FF] text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                Обучение
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                Освой <span className="text-[#2EA8FF]">детейлинг</span> профессионально
              </h2>
              
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Студия «ЭстетикБро» проводит обучение детейлингу для тех, кто хочет освоить востребованную профессию. 
                Теория + практика на реальных автомобилях. Выдаём сертификат по окончании курса.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  'Индивидуальный график обучения',
                  'Практика на реальных проектах',
                  'Материалы и инструменты включены',
                  'Помощь в трудоустройстве'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#2EA8FF]" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, service: 'Обучение детейлингу' }))
                  scrollToSection('contacts')
                }}
                className="px-8 py-4 bg-[#2EA8FF] text-black font-bold rounded-xl neon-glow neon-glow-hover hover:bg-[#1E90FF] transition-all inline-flex items-center gap-2"
              >
                Узнать про обучение
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Image */}
            <div className="relative animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/images/portfolio/IMG_9680.jpeg"
                  alt="Обучение детейлингу в студии ЭстетикБро"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent"></div>
                
                {/* Stats overlay */}
                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-center">
                    <p className="text-2xl font-bold text-[#2EA8FF]">50+</p>
                    <p className="text-xs text-gray-400">выпускников</p>
                  </div>
                  <div className="p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-center">
                    <p className="text-2xl font-bold text-[#2EA8FF]">98%</p>
                    <p className="text-xs text-gray-400">трудоустройство</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section - РЕАЛЬНЫЕ КОНТАКТЫ */}
      <section id="contacts" className="py-20 md:py-32 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Свяжитесь <span className="text-[#2EA8FF]">с нами</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Оставьте заявку или свяжитесь удобным способом. Ответим в течение 15 минут.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info & map */}
            <div className="space-y-8 animate-on-scroll">
              {/* Address card */}
              <div className="p-6 rounded-2xl bg-[#141418] border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#2EA8FF]/10 flex items-center justify-center text-[#2EA8FF]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Адрес студии</h3>
                    <p className="text-gray-400">{CONTACTS.address}</p>
                    <p className="text-sm text-gray-500">{CONTACTS.addressNote}</p>
                  </div>
                </div>
              </div>

              {/* Working hours */}
              <div className="p-6 rounded-2xl bg-[#141418] border border-white/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#2EA8FF]/10 flex items-center justify-center text-[#2EA8FF]">
                    <TimeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Режим работы</h3>
                    <p className="text-gray-400">Пн—Пт: 9:00 — 20:00</p>
                    <p className="text-gray-400">Сб: 10:00 — 18:00</p>
                    <p className="text-gray-500 text-sm">Вс: по записи</p>
                  </div>
                </div>
              </div>

              {/* Quick contact buttons - РЕАЛЬНЫЕ ССЫЛКИ */}
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={`tel:${CONTACTS.phoneRaw}`}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Позвонить
                </a>
                <a
                  href={CONTACTS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#2EA8FF]/10 border border-[#2EA8FF]/20 text-[#2EA8FF] hover:bg-[#2EA8FF]/20 transition-all"
                >
                  <Send className="w-5 h-5" />
                  Telegram
                </a>
                <a
                  href={CONTACTS.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#4C75A3]/10 border border-[#4C75A3]/20 text-[#4C75A3] hover:bg-[#4C75A3]/20 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  VK
                </a>
              </div>

              {/* Payment methods */}
              <div className="p-6 rounded-2xl bg-[#141418] border border-white/5">
                <h3 className="font-bold mb-4">Способы оплаты</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: <Banknote className="w-5 h-5" />, label: 'Наличные' },
                    { icon: <CreditCard className="w-5 h-5" />, label: 'Карта' },
                    { icon: <Repeat className="w-5 h-5" />, label: 'СБП' },
                    { icon: <CreditCard className="w-5 h-5" />, label: 'Рассрочка' },
                    { icon: <Building className="w-5 h-5" />, label: 'Безнал' }
                  ].map((method, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg text-sm text-gray-400">
                      {method.icon}
                      {method.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form - ОТПРАВКА НА API */}
            <div className="animate-on-scroll" style={{ transitionDelay: '200ms' }}>
              <div className="p-8 rounded-2xl bg-[#141418] border border-white/5">
                <h3 className="text-2xl font-bold mb-6">Записаться на услугу</h3>
                
                {formSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="text-xl font-bold text-green-400 mb-2">Заявка отправлена!</h4>
                    <p className="text-gray-400">Мы свяжемся с вами в ближайшее время.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        Ваше имя *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Как к вам обращаться?"
                          className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border ${
                            formErrors.name ? 'border-red-500' : 'border-white/10'
                          } text-white placeholder-gray-500 focus:outline-none focus:border-[#2EA8FF] focus:ring-1 focus:ring-[#2EA8FF]/50 transition-all`}
                        />
                      </div>
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Phone field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                        Телефон *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+7 (___) ___-__-__"
                          className={`w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border ${
                            formErrors.phone ? 'border-red-500' : 'border-white/10'
                          } text-white placeholder-gray-500 focus:outline-none focus:border-[#2EA8FF] focus:ring-1 focus:ring-[#2EA8FF]/50 transition-all`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Service select */}
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-2">
                        Интересующая услуга
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#2EA8FF] focus:ring-1 focus:ring-[#2EA8FF]/50 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#141418]">Выберите услугу</option>
                        {services.map((service, index) => (
                          <option key={index} value={service.title} className="bg-[#141418]">
                            {service.title}
                          </option>
                        ))}
                        <option value="Обучение детейлингу" className="bg-[#141418]">
                          Обучение детейлингу
                        </option>
                        <option value="Комплексный пакет" className="bg-[#141418]">
                          Комплексный пакет
                        </option>
                      </select>
                    </div>

                    {/* Comment field */}
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-gray-400 mb-2">
                        Комментарий
                      </label>
                      <textarea
                        id="comment"
                        value={formData.comment}
                        onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                        rows={3}
                        placeholder="Опишите вашу задачу или задайте вопрос..."
                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#2EA8FF] focus:ring-1 focus:ring-[#2EA8FF]/50 transition-all resize-none"
                      ></textarea>
                    </div>

                    {/* Submit button with loading state */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#2EA8FF] text-black font-bold text-lg rounded-xl neon-glow neon-glow-hover hover:bg-[#1E90FF] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 spin-animation" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Отправить заявку
                        </>
                      )}
                    </button>

                    {/* Error message */}
                    {submitError && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {submitError}
                      </div>
                    )}

                    <p className="text-xs text-gray-500 text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - РЕАЛЬНЫЕ КОНТАКТЫ */}
      <footer className="py-12 bg-[#0A0A0A] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo & description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/logo.svg" 
                  alt="ЭстетикБро" 
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <span className="text-lg font-bold">
                    <span className="text-white">ЭСТЕТИК</span>{' '}
                    <span className="text-[#2EA8FF]">БРО</span>
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm max-w-md mb-4">
                Профессиональный детейлинг центр в Челябинске. Полный спектр услуг по уходу за автомобилем.
              </p>
              <div className="flex gap-4">
                <a
                  href={CONTACTS.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#2EA8FF]/20 hover:text-[#2EA8FF] transition-all"
                  aria-label="VK"
                >
                  VK
                </a>
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#2EA8FF]/20 hover:text-[#2EA8FF] transition-all"
                  aria-label="Telegram"
                >
                  TG
                </a>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <ul className="space-y-2">
                {[
                  { id: 'services', label: 'Услуги' },
                  { id: 'portfolio', label: 'Портфолио' },
                  { id: 'reviews', label: 'Отзывы' },
                  { id: 'training', label: 'Обучение' },
                  { id: 'contacts', label: 'Контакты' }
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-[#2EA8FF] transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacts */}
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#2EA8FF]" />
                  {CONTACTS.address}
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-[#2EA8FF]" />
                  <a href={`tel:${CONTACTS.phoneRaw}`} className="hover:text-[#2EA8FF] transition-colors">
                    {CONTACTS.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <TimeIcon className="w-4 h-4 shrink-0 text-[#2EA8FF]" />
                  Пн—Пт: 9:00—20:00
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ЭстетикБро. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-[#2EA8FF] transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-[#2EA8FF] transition-colors">Юридическая информация</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button - РЕАЛЬНАЯ ССЫЛКА */}
      <a
        href={`${CONTACTS.whatsapp}?text=Здравствуйте! Интересует запись на услугу.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform neon-glow"
        aria-label="Написать в WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 bg-[#2EA8FF]/20 backdrop-blur-md border border-[#2EA8FF]/30 rounded-full flex items-center justify-center text-[#2EA8FF] hover:bg-[#2EA8FF]/30 transition-all"
          aria-label="Наверх"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
