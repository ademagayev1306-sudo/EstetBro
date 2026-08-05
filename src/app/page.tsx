'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Shield, Sparkles, Gem, Phone, MapPin, Star, ChevronUp, Menu, X, Check, ArrowRight,
  MessageCircle, Send, Monitor, Wrench, ShieldCheck, Volume2, PaintBucket, Paintbrush, Wind,
  Clock, Camera, Award, ThumbsUp, Car, HelpCircle, Calendar
} from 'lucide-react'

// ============================================
// КОНСТАНТЫ - РЕАЛЬНЫЕ КОНТАКТЫ КОМПАНИИ
// ============================================
const CONTACTS = {
  phone: '+7 (951) 777-78-89',
  phoneRaw: '+79517777889',
  vk: 'https://m.vk.com/estetbroavto',
  whatsapp: 'https://wa.me/79517777889?text=Здравствуйте!%20Хочу%20записаться%20на%20услугу',
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

// Services data - БОЛЬ → РЕШЕНИЕ
const services = [
  {
    icon: <Monitor className="w-6 h-6" />,
    pain: 'Проблемы с электроникой?',
    solution: 'Компьютерная диагностика',
    description: 'Полная диагностика всех систем автомобиля. Выявляем скрытые проблемы до того, как они станут дорогим ремонтом.',
    price: '1 500 ₽',
    duration: '30 мин',
    popular: false
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    pain: 'Салон потерял свежесть?',
    solution: 'Детейлинг салона и кузова',
    description: 'Комплексное преображение: химчистка, полировка, защита. Машина как новая — внутри и снаружи.',
    price: '12 000 ₽',
    duration: '4+ часов',
    popular: true
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    pain: 'Вмятины без покраски?',
    solution: 'Выпрямление вмятин',
    description: 'Убираем вмятины, сохраняя заводское ЛКП. Никакого шпаклевания и перекраса.',
    price: '5 000 ₽',
    duration: 'от 2 часов',
    popular: false
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    pain: 'Боитесь коррозии?',
    solution: 'Антикоррозийная обработка',
    description: 'Надёжная защита кузова и днища от ржавчины. Сохраняем машину на годы.',
    price: '18 000 ₽',
    duration: '5+ часов',
    popular: true
  },
  {
    icon: <Paintbrush className="w-6 h-6" />,
    pain: 'Царапины и потускневший лак?',
    solution: 'Полировка',
    description: 'Возвращаем глубину цвета и зеркальный блеск. Удаляем царапины и голограммы.',
    price: '16 000 ₽',
    duration: '3+ часов',
    popular: false
  },
  {
    icon: <Wind className="w-6 h-6" />,
    pain: 'Яркое солнце мешает?',
    solution: 'Тонирование',
    description: 'Сертифицированные плёнки по ГОСТ. Комфорт и стиль для ваших стёкол.',
    price: '3 000 ₽',
    duration: '1+ часа',
    popular: false
  },
  {
    // ХИТ ПРОДАЖ!
    icon: <PaintBucket className="w-6 h-6" />,
    pain: 'Хотите изменить облик авто?',
    solution: 'Виниловые плёнки',
    description: 'Любой цвет! Матовый, глянцевый, хром. Полный ребрендинг за один день.',
    price: '48 000 ₽',
    duration: 'от 8 часов',
    popular: true,
    featured: true
  },
  {
    // ХИТ ПРОДАЖ!
    icon: <Shield className="w-6 h-6" />,
    pain: 'Боитесь сколов на трассе?',
    solution: 'Защитные плёнки PPF',
    description: 'Невидимая броня для кузова. Защита от камней, песка, веток.',
    price: '48 000 ₽',
    duration: '6+ часов',
    popular: true,
    featured: true
  },
  {
    icon: <Gem className="w-6 h-6" />,
    pain: 'Хром потускнел?',
    solution: 'Антихром',
    description: 'Чёрный глянец или карбон вместо старого хрома. Современный стиль.',
    price: '1 500 ₽',
    duration: '2+ часа',
    popular: false
  },
  {
    icon: <Volume2 className="w-6 h-6" />,
    pain: 'Шум в салоне утомляет?',
    solution: 'Шумоизоляция',
    description: 'Тишина и комфорт. Музыка заиграет по-новому, разговоры станут спокойными.',
    price: '3 000 ₽',
    duration: '4+ часов',
    popular: false
  }
]

// Почему выбирают нас - USP
const whyUs = [
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Сертифицированные материалы',
    description: 'Работаем только с проверенными брендами. Гарантия качества на все материалы.'
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: 'Фотоотчёт каждого этапа',
    description: 'Фотографируем процесс от начала до конца. Вы видите всю работу.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Гарантия на все работы',
    description: 'Даём официальную гарантию. Если что-то не так — исправим бесплатно.'
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: 'Закрытый бокс для авто',
    description: 'Машина под надёжной охраной. Никаких случайных повреждений.'
  },
  {
    icon: <ThumbsUp className="w-6 h-6" />,
    title: 'Рейтинг 4.9 на Яндекс Картах',
    description: 'Более 19 отзывов и 99% довольных клиентов. Проверьте сами!'
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Бесплатная консультация',
    description: 'Ответим на все вопросы. Расскажем что нужно именно вашей машине.'
  }
]

// Reviews data
const reviews = [
  {
    text: 'Сделала шумоизоляцию в детейлинге - и будто машину поменяла! Раньше на трассе орала с пассажирами, а теперь разговариваем шёпотом. Музыка заиграла совершенно по-новому: появились басы и детали, которых раньше не было. Машина перестала звучать как "жестяная банка" - глухие хлопки дверей, приятный мотор. Пропала усталость после часа за рулём. Ребята сделали аккуратно, ничего не отвалилось и не скрипит. Лучший апгрейд за свои деньги!',
    service: 'Шумоизоляция + Детейлинг',
    rating: 5,
    author: 'Арина Потапенко',
    date: '20 мая'
  },
  {
    text: 'Это лучшее место в Челябинске, мой автомобиль после химчистки и полировки выглядит как новый, реально перехотел продавать, езжу второй месяц и не нарадуюсь (мне посоветовали как правильно мыть авто чтоб долго сохранял блеск и нанесенная керамика сохранилась)',
    service: 'Химчистка + Полировка + Керамика',
    rating: 5,
    author: 'Илья Ахлюстин',
    date: '1 июня'
  },
  {
    text: 'Очень хороший центр. Делал антикоррозийную обработку днища автомобиля. Позвонил, договорились о встрече. Приехал, все рассказали, показали на другой машине, что и как делают. Была озвучена цена, которая так и осталась после работы, держат слово! Качеством работы остался доволен.',
    service: 'Антикоррозийная обработка',
    rating: 5,
    author: 'Андрей Рублёв',
    date: '1 августа'
  }
]

// FAQ данные
const faqs = [
  {
    question: 'Сколько длится оклейка виниловой плёнкой?',
    answer: 'Полная оклейка кузова занимает 1-2 рабочих дня. Частичная оклейка (капот, крыша) — несколько часов. Точные сроки зависят от сложности работы.'
  },
  {
    question: 'Можно ли оставить машину на время работ?',
    answer: 'Да, конечно! Ваш автомобиль будет находиться в закрытом тёплом боксе под охраной. Также можем организовать временную замену автомобиля при необходимости.'
  },
  {
    question: 'Какая гарантия на работы?',
    answer: 'Даём письменную гарантию на все виды работ: на плёнки — до 2 лет, на полировку и керамику — до 1 года, на антикоррозию — до 5 лет. При возникновении проблем исправим бесплатно.'
  },
  {
    question: 'Что если плёнка отклеится или повредится?',
    answer: 'При использовании качественных материалов и правильной установке такое случается крайне редко. Но если это произошло — просто привезите машину, мы заменим плёнку бесплатно в рамках гарантии.'
  },
  {
    question: 'Нужно ли записываться заранее?',
    answer: 'Рекомендуем записываться за 2-3 дня, чтобы гарантировать удобное время. Однако при наличии свободных окон принимаем и без записи. Звоните — уточним!'
  },
  {
    question: 'Можно ли получить точную стоимость заранее?',
    answer: 'Да! Прислайте фото автомобиля или приезжите на бесплатную диагностику — рассчитаем точную стоимость без скрытых платежей. Цена, которую назвали — останется такой же.'
  },
  {
    question: 'Работаете ли вы с юридическими лицами?',
    answer: 'Да, работаем с компаниями и автопарками. Оплата по безналичному расчёту с НДС. Возможны индивидуальные условия для постоянных клиентов.'
  }
]

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', comment: '' })
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({})
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Update year on January 1
  useEffect(() => {
    const updateYear = () => setCurrentYear(new Date().getFullYear())
    const now = new Date()
    const nextYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0)
    const timeout = nextYear.getTime() - now.getTime()
    
    const timer = setTimeout(updateYear, timeout)
    return () => clearTimeout(timer)
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

      console.log('Lead submitted:', result)
      setFormSubmitted(true)
      
      setTimeout(() => {
        setFormSubmitted(false)
        setFormData({ name: '', phone: '', service: '', comment: '' })
      }, 10000)

    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Произошла ошибка. Попробуйте позвонить нам.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Custom styles */}
      <style jsx global>{`
        :root {
          --accent: #2563eb;
          --accent-light: #3b82f6;
          --accent-dark: #1d4ed8;
          --bg-warm: #fafafa;
          --text-primary: #111827;
          --text-secondary: #6b7280;
        }

        html {
          scroll-behavior: smooth;
        }

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

        .img-hover {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .img-hover:hover {
          transform: scale(1.03);
        }

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

        .card-soft {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-soft:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        }

        .card-featured {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border: 2px solid #2563eb;
        }

        .card-featured:hover {
          box-shadow: 0 25px 50px rgba(37, 99, 235, 0.25);
        }

        .hero-bg {
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
          50% { box-shadow: 0 0 40px rgba(37, 99, 235, 0.5); }
        }

        .glow-animation {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes pulse-border {
          0%, 100% { border-color: rgba(37, 99, 235, 0.5); }
          50% { border-color: rgba(37, 99, 235, 1); }
        }

        .pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }

        /* FAQ accordion */
        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .faq-content.open {
          max-height: 500px;
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
                { id: 'why-us', label: 'Преимущества' },
                { id: 'portfolio', label: 'Работы' },
                { id: 'reviews', label: 'Отзывы' },
                { id: 'faq', label: 'FAQ' },
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
                Записаться
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
              {['services', 'why-us', 'portfolio', 'reviews', 'faq', 'contacts'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left text-lg text-gray-700 font-medium hover:text-blue-600 transition-colors"
                >
                  {{ services: 'Услуги', 'why-us': 'Преимущества', portfolio: 'Работы', reviews: 'Отзывы', faq: 'FAQ', contacts: 'Контакты' }[item]}
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

      {/* Hero Section - УСИЛЕННЫЙ */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 hero-bg">
          <img 
            src="/images/hero-bg-2.png" 
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
                <span className="text-sm text-blue-700 font-semibold">Детейлинг, защитные плёнки и полировка в Челябинске</span>
              </div>

              {/* Main heading - КОНКРЕТНЫЙ */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                Профессиональный детейлинг<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600">с гарантией результата</span>
              </h1>

              {/* Subheading - СТАТИСТИКА ДОВЕРИЯ */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                Виниловые и защитные плёнки, полировка, детейлинг. 
                <strong className="text-gray-800"> Более 500 автомобилей • рейтинг 4.9 • опыт 5 лет</strong>
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
                  <div className="text-3xl font-black text-gray-900">4.9</div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">рейтинг</div>
                </div>
              </div>
            </div>

            {/* Right content - Featured Service Card + СРОЧНОСТЬ */}
            <div className="relative animate-on-scroll float-animation" style={{ transitionDelay: '250ms' }}>
              <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-3xl p-8 shadow-2xl shadow-blue-900/10 border border-blue-200/50">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">Популярные услуги</h3>
                    <p className="text-blue-700 font-semibold">Выбирают чаще всего</p>
                  </div>
                </div>

                {/* Film services highlight */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-4 p-4 bg-white/70 rounded-xl">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      <PaintBucket className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Виниловые плёнки</div>
                      <div className="text-blue-700 font-semibold text-lg">48 000 ₽</div>
                      <div className="text-sm text-gray-600">Измени облик машины!</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-white/70 rounded-xl">
                    <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Защитные PPF</div>
                      <div className="text-blue-700 font-semibold text-lg">48 000 ₽</div>
                      <div className="text-sm text-gray-600">Невидимая броня!</div>
                    </div>
                  </div>
                </div>

                {/* СРОЧНОСТЬ */}
                <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-800 font-semibold mb-1">
                    <Calendar className="w-5 h-5" />
                    На этой неделе осталось 4 свободных окна
                  </div>
                  <div className="text-sm text-amber-700">Запишитесь сейчас, чтобы не ждать</div>
                </div>

                <button
                  onClick={() => scrollToSection('services')}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl btn-primary glow-animation"
                >
                  Смотреть все услуги
                </button>
              </div>

              {/* Decorative glow */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-300/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-indigo-300/30 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ МЫ - USP */}
      <section id="why-us" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              Почему выбирают нас
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              6 причин доверить авто <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">нам</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Мы не просто делаем детейлинг — мы создаём долгосрочные отношения с каждым клиентом
            </p>
          </div>

          {/* USP Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl card-soft animate-on-scroll border border-gray-100 hover:border-blue-200"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-14 h-14 bg-blue-50 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-colors text-blue-600 group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - БОЛЬ → РЕШЕНИЕ */}
      <section id="services" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" />
              Решаем ваши проблемы
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">услуги</span> и цены
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Каждая услуга решает конкретную проблему вашего автомобиля
            </p>
          </div>

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <div
                key={service.solution}
                className={`group p-6 bg-white rounded-2xl card-soft animate-on-scroll border ${
                  service.featured 
                    ? 'card-featured border-blue-300 glow-animation' 
                    : 'border-gray-100 hover:border-blue-200'
                }`}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {/* БОЛЬ */}
                <div className="text-sm text-blue-600 font-medium mb-2 italic">
                  {service.pain}
                </div>
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  service.featured 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                }`}>
                  {service.icon}
                </div>
                
                {service.featured && (
                  <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2">
                    ХИТ
                  </span>
                )}
                
                {/* РЕШЕНИЕ */}
                <h3 className="text-base font-bold mb-2">{service.solution}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                
                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className={`text-xl font-black ${service.featured ? 'text-blue-600' : 'text-blue-600'}`}>
                      {service.price}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{service.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA - Бесплатная консультация */}
          <div className="mt-12 text-center animate-on-scroll">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900">Не уверены что нужно?</div>
                <div className="text-sm text-gray-600">Получите бесплатную консультацию — подберём решение под ваш бюджет</div>
              </div>
              <button
                onClick={() => scrollToSection('contacts')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-full btn-primary whitespace-nowrap"
              >
                Узнать стоимость за 2 минуты
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Наши Работы */}
      <section id="portfolio" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
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

          {/* Portfolio grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
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
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold mb-4">
              <Star className="w-4 h-4 fill-blue-500 text-blue-500" />
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
                    <Star key={i} className="w-5 h-5 text-blue-400 fill-blue-400" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">
                  "{review.text}"
                </p>
                
                {/* Author & Date */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="font-bold text-gray-900">{review.author}</div>
                  <div className="text-sm text-blue-600 font-medium">{review.service}</div>
                  <div className="text-xs text-gray-400 mt-1">{review.date}</div>
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
              Читать все отзывы на Яндекс Картах
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold mb-4">
              <HelpCircle className="w-4 h-4" />
              Частые вопросы
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Ответы на <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">вопросы</span>
            </h2>
            <p className="text-lg text-gray-500">
              Всё что вы хотели узнать перед записью
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-on-scroll card-soft"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronUp className={`w-5 h-5 text-blue-600 transition-transform shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`faq-content ${openFaq === index ? 'open' : ''}`}>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after FAQ */}
          <div className="mt-12 text-center animate-on-scroll">
            <p className="text-gray-600 mb-4">Не нашли ответ на свой вопрос?</p>
            <button
              onClick={() => scrollToSection('contacts')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl btn-primary inline-flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Спросить напрямую
            </button>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-24 lg:py-32 bg-white">
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
                    ВКонтакте
                  </a>
                  <a
                    href={CONTACTS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all inline-flex items-center gap-2"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={CONTACTS.yandexMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all inline-flex items-center gap-2"
                  >
                    Яндекс Карты
                  </a>
                  <a
                    href={CONTACTS.gis2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-blue-400 hover:bg-blue-50 transition-all inline-flex items-center gap-2"
                  >
                    2ГИС
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="animate-on-scroll" style={{ transitionDelay: '150ms' }}>
              {!formSubmitted ? (
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
                      <option value="Виниловые плёнки (ХИТ!)">Виниловые плёнки (ХИТ!)</option>
                      <option value="Защитные плёнки PPF (ХИТ!)">Защитные плёнки PPF (ХИТ!)</option>
                      {services.filter(s => !s.featured).map((s) => (
                        <option key={s.solution} value={s.solution}>{s.solution}</option>
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
              ) : (
                /* СТРАНИЦА СПАСИБО */
                <div className="p-8 lg:p-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl border border-green-200 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-black text-gray-900">Спасибо!</h3>
                  
                  <div className="space-y-3 text-gray-600">
                    <p className="text-lg">Мы уже получили вашу заявку.</p>
                    <p>Обычно связываемся в течение <strong className="text-green-600">10–15 минут</strong>.</p>
                  </div>

                  <div className="pt-6 space-y-4">
                    <a
                      href={CONTACTS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl btn-primary flex items-center justify-center gap-2 shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Написать в WhatsApp
                    </a>
                    
                    <a
                      href={`tel:${CONTACTS.phoneRaw}`}
                      className="w-full py-4 border-2 border-green-300 text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Позвонить прямо сейчас
                    </a>
                  </div>

                  <p className="text-sm text-gray-400 pt-4">
                    Или просто ожидайте нашего звонка
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                    ВКонтакте
                  </a>
                </li>
                <li>
                  <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    WhatsApp
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
                © {currentYear} ЭстетикБро. Все права защищены.
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
