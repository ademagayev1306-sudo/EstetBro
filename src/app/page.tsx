'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Shield, Sparkles, Gem, Phone, MapPin, Star, ChevronUp, Menu, X, Check, ArrowRight,
  MessageCircle, Send, Monitor, Wrench, ShieldCheck, Volume2, PaintBucket, Paintbrush, Wind,
  Camera, Award, ThumbsUp, Car, HelpCircle, Calendar, Users, TrendingUp, Zap,
  Play, Quote, CheckCircle2, BadgePercent, ArrowDown, Timer
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

// Почему выбираем нас - USP
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

// Процесс работы - ЭМОЦИИ
const processSteps = [
  {
    step: '01',
    title: 'Бесплатная диагностика',
    description: 'Оцениваем состояние автомобиля, подбираем оптимальное решение под ваш бюджет',
    icon: <Search className="w-8 h-8" />
  },
  {
    step: '02',
    title: 'Согласование стоимости',
    description: 'Называем точную цену без скрытых платежей. Она не изменится после работ',
    icon: <BadgePercent className="w-8 h-8" />
  },
  {
    step: '03',
    title: 'Выполнение работ',
    description: 'Работаем аккуратно, фотографируем каждый этап. Можно оставить машину у нас',
    icon: <Zap className="w-8 h-8" />
  },
  {
    step: '04',
    title: 'Передача и гарантия',
    description: 'Показываем результат, выдаём гарантию. Вы довольны — мы счастливы!',
    icon: <CheckCircle2 className="w-8 h-8" />
  }
]

// Гарантии - ДОВЕРИЕ
const guarantees = [
  { text: 'Фиксированная цена — не изменится после начала работ', icon: <BadgePercent /> },
  { text: 'Официальная гарантия до 5 лет на все виды работ', icon: <ShieldCheck /> },
  { text: 'Возврат денег если результат не устроит', icon: <ThumbsUp /> },
  { text: 'Используем только сертифицированные материалы', icon: <Award /> },
  { text: 'Фотоотчёт каждого этапа работ', icon: <Camera /> },
  { text: 'Автомобиль в закрытом боксе под охраной', icon: <Car /> }
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
    answer: 'Да! Присылайте фото автомобиля или приезжайте на бесплатную диагностику — рассчитаем точную стоимость без скрытых платежей. Цена, которую назвали — останется такой же.'
  },
  {
    question: 'Работаете ли вы с юридическими лицами?',
    answer: 'Да, работаем с компаниями и автопарками. Оплата по безналичному расчёту с НДС. Возможны индивидуальные условия для постоянных клиентов.'
  }
]

// Анимированный счётчик
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 2000
          const increment = target / (duration / 16)
          
          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black text-gray-900">
      {prefix}{count}{suffix}
    </div>
  )
}

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
  const [showStickyForm, setShowStickyForm] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowScrollTop(window.scrollY > 500)
      setShowStickyForm(window.scrollY > 800)
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
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* Custom styles */}
      <style jsx global>{`
        :root {
          --accent: #2563eb;
          --accent-light: #3b82f6;
          --accent-dark: #1d4ed8;
        }

        html {
          scroll-behavior: smooth;
        }

        /* Animations */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Stagger children */
        .stagger-children > * {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .stagger-children.animate-in > *:nth-child(1) { transition-delay: 0ms; opacity: 1; transform: translateY(0); }
        .stagger-children.animate-in > *:nth-child(2) { transition-delay: 100ms; opacity: 1; transform: translateY(0); }
        .stagger-children.animate-in > *:nth-child(3) { transition-delay: 200ms; opacity: 1; transform: translateY(0); }
        .stagger-children.animate-in > *:nth-child(4) { transition-delay: 300ms; opacity: 1; transform: translateY(0); }

        /* Card hover */
        .card-soft {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-soft:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
        }

        /* Featured card */
        .card-featured {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border: 2px solid #2563eb;
          position: relative;
          overflow: hidden;
        }

        .card-featured::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
          animation: rotate 10s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Button primary */
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
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.35);
        }

        /* Hero parallax */
        .hero-bg {
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
        }

        /* Float animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        /* Glow pulse */
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
          50% { box-shadow: 0 0 40px rgba(37, 99, 235, 0.5), 0 0 60px rgba(37, 99, 235, 0.2); }
        }

        .glow-animation {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        /* Pulse ring */
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.5); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(37, 99, 235, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }

        .pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }

        /* Image hover zoom */
        .img-hover-zoom {
          overflow: hidden;
        }

        .img-hover-zoom img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .img-hover-zoom:hover img {
          transform: scale(1.08);
        }

        /* FAQ accordion */
        .faq-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .faq-content.open {
          max-height: 500px;
        }

        /* Sticky form slide */
        .sticky-form {
          transform: translateX(120%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sticky-form.visible {
          transform: translateX(0);
        }

        /* Gradient text animation */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .gradient-text-animated {
          background-size: 200% auto;
          animation: gradient-shift 3s ease infinite;
        }

        /* Process line connector */
        .process-line {
          position: relative;
        }

        .process-line::after {
          content: '';
          position: absolute;
          left: 24px;
          top: 60px;
          bottom: -20px;
          width: 2px;
          background: linear-gradient(to bottom, #2563eb, #dbeafe);
        }

        .process-line:last-child::after {
          display: none;
        }

        /* Trust badge shine */
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .trust-badge::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>

      {/* Progress bar on scroll */}
      <div className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 z-[60] transition-all duration-150 ${isScrolled ? 'w-full' : 'w-0'}`} style={{ width: isScrolled ? `${Math.min((typeof window !== 'undefined' ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100 : 0), 100)}%` : '0%' }} />

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/98 backdrop-blur-lg shadow-xl shadow-gray-900/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <img 
                src="/logo.png" 
                alt="ЭстетикБро — Детейлинг центр" 
                className="w-11 h-11 object-contain rounded-xl shadow-sm hover:scale-105 transition-transform"
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
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { id: 'services', label: 'Услуги' },
                { id: 'process', label: 'Процесс' },
                { id: 'why-us', label: 'Преимущества' },
                { id: 'portfolio', label: 'Работы' },
                { id: 'reviews', label: 'Отзывы' },
                { id: 'faq', label: 'FAQ' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all hover:text-blue-600 relative group ${
                    isScrolled ? 'text-gray-600' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-5">
              <a href={`tel:${CONTACTS.phoneRaw}`} className="text-sm text-gray-500 hover:text-blue-600 transition-colors font-medium flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {CONTACTS.phone}
              </a>
              <button
                onClick={() => scrollToSection('contacts')}
                className="px-7 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-full btn-primary shadow-lg shadow-blue-600/25 pulse-ring"
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
          <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 shadow-xl animate-in">
            <div className="px-6 py-8 space-y-6">
              {['services', 'process', 'why-us', 'portfolio', 'reviews', 'faq', 'contacts'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left text-lg text-gray-700 font-medium hover:text-blue-600 transition-colors"
                >
                  {({ services: 'Услуги', process: 'Процесс', whyus: 'Преимущества', portfolio: 'Работы', reviews: 'Отзывы', faq: 'FAQ', contacts: 'Контакты' } as Record<string, string>)[item] || item}
                </button>
              ))}
              <div className="pt-6 border-t border-gray-100 space-y-4">
                <a href={`tel:${CONTACTS.phoneRaw}`} className="block text-blue-600 font-bold text-lg">
                  {CONTACTS.phone}
                </a>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full btn-primary"
                >
                  Записаться на услугу
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - ЭМОЦИОНАЛЬНЫЙ */}
      <section id="hero" className="relative py-6 lg:py-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 hero-bg">
          <img 
            src="/images/hero-bg-2.png" 
            alt="Детейлинг автомобилей" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/96 to-white/85"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/90"></div>
        </div>

        {/* Animated decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-items-center">
            {/* Left content */}
            <div className="space-y-5 lg:space-y-8">
              {/* Badge with animation */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200/50 animate-on-scroll">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm text-blue-700 font-semibold">Детейлинг, защитные плёнки и полировка в Челябинске</span>
              </div>

              {/* Main heading - emotional */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight animate-on-scroll" style={{ transitionDelay: '100ms' }}>
                Профессиональный детейлинг<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 gradient-text-animated">с гарантией результата</span>
              </h1>

              {/* Subheading with trust signals */}
              <div className="space-y-4 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Виниловые и защитные плёнки, полировка, детейлинг.
                </p>
                
                {/* Inline trust badges */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-gray-700 font-semibold">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    Рейтинг 4.9
                  </span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="text-gray-600 font-medium">500+ автомобилей</span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="text-gray-600 font-medium">5 лет опыта</span>
                </div>
              </div>

              {/* CTA Buttons with emotion */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-on-scroll" style={{ transitionDelay: '300ms' }}>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="px-8 py-4.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl btn-primary inline-flex items-center justify-center gap-2 text-lg shadow-xl shadow-blue-600/30 glow-animation"
                >
                  Записаться на услугу
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href={CONTACTS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4.5 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:border-green-400 hover:bg-green-50 transition-all inline-flex items-center justify-center gap-2 text-lg group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:text-green-600 transition-colors" />
                  WhatsApp
                </a>
              </div>

              {/* Stats with animated counters */}
              <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-4 lg:pt-8 border-t border-gray-200/80 animate-on-scroll" style={{ transitionDelay: '400ms' }}>
                <div className="text-center">
                  <AnimatedCounter target={500} suffix="+" />
                  <div className="text-sm text-gray-500 mt-1 font-medium">авто обслужили</div>
                </div>
                <div className="text-center">
                  <AnimatedCounter target={5} suffix=" лет" />
                  <div className="text-sm text-gray-500 mt-1 font-medium">на рынке</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-gray-900">4.9</div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">рейтинг</div>
                </div>
              </div>
            </div>

            {/* Right content - Interactive card */}
            <div className="relative animate-on-scroll float-animation lg:block hidden" style={{ transitionDelay: '250ms' }}>
              <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-3xl p-8 shadow-2xl shadow-blue-900/10 border border-blue-200/50 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/30 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">Популярные услуги</h3>
                      <p className="text-blue-700 font-semibold text-sm">Выбирают чаще всего</p>
                    </div>
                  </div>

                  {/* Film services highlight */}
                  <div className="space-y-4 mb-6">
                    <div className="group flex items-start gap-4 p-4 bg-white/80 rounded-xl hover:bg-white transition-all cursor-pointer hover:shadow-md">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                        <PaintBucket className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Виниловые плёнки</div>
                        <div className="text-blue-700 font-semibold text-lg">48 000 ₽</div>
                        <div className="text-sm text-gray-600">Измени облик машины!</div>
                      </div>
                    </div>

                    <div className="group flex items-start gap-4 p-4 bg-white/80 rounded-xl hover:bg-white transition-all cursor-pointer hover:shadow-md">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shrink-0 shadow-md">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Защитные PPF</div>
                        <div className="text-blue-700 font-semibold text-lg">48 000 ₽</div>
                        <div className="text-sm text-gray-600">Невидимая броня!</div>
                      </div>
                    </div>
                  </div>

                  {/* СРОЧНОСТЬ + эмоция */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl relative overflow-hidden trust-badge">
                    <div className="flex items-center gap-2 text-amber-800 font-semibold mb-1">
                      <Calendar className="w-5 h-5" />
                      На этой неделе осталось 4 свободных окна
                    </div>
                    <div className="text-sm text-amber-700">Запишитесь сейчас, чтобы не ждать</div>
                  </div>

                  <button
                    onClick={() => scrollToSection('services')}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl btn-primary glow-animation flex items-center justify-center gap-2"
                  >
                    Смотреть все услуги
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - only on desktop */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden lg:flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs font-medium">Листайте вниз</span>
          <ChevronUp className="w-5 h-5 rotate-180" />
        </div>
      </section>

      {/* ПРОЦЕСС РАБОТЫ - ЭМОЦИИ */}
      <section id="process" className="py-6 lg:py-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.03),transparent)]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section header */}
          <div className="text-center mb-6 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold mb-2">
              <Timer className="w-4 h-4" />
              Как мы работаем
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-2">
              4 простых шага <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">к новой машине</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Прозрачный процесс от первой встречи до счастливого владельца обновлённого авто
            </p>
          </div>

          {/* Process steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children animate-on-scroll">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step number badge */}
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-600/30 z-10">
                  {step.step}
                </div>
                
                <div className="pt-8 pl-8 pr-4 pb-6 bg-white rounded-2xl border border-gray-100 card-soft h-full process-line">
                  <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-4 transition-colors text-blue-600 group-hover:text-white">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОЧЕМУ МЫ - USP */}
      <section id="why-us" className="py-6 lg:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-5 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              Почему выбирают нас
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              6 причин доверить авто <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">нам</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Мы не просто делаем детейлинг — создаём долгосрочные отношения
            </p>
          </div>

          {/* USP Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children animate-on-scroll">
            {whyUs.map((item, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl card-soft border border-gray-100 hover:border-blue-200"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 group-hover:from-blue-600 group-hover:to-indigo-600 rounded-2xl flex items-center justify-center mb-6 transition-all text-blue-600 group-hover:text-white shadow-sm group-hover:shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ГАРАНТИИ - ДОВЕРИЕ */}
      <section className="py-10 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-4 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Наши гарантии
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Мы уверены в качестве — поэтому даём реальные гарантии
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children animate-on-scroll">
            {guarantees.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0 text-white">
                  {item.icon}
                </div>
                <span className="text-white font-medium leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - БОЛЬ → РЕШЕНИЕ */}
      <section id="services" className="py-6 lg:py-10 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-5 animate-on-scroll">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 stagger-children animate-on-scroll">
            {services.map((service, index) => (
              <div
                key={service.solution}
                className={`group p-6 bg-white rounded-2xl card-soft border ${
                  service.featured 
                    ? 'card-featured border-blue-300 glow-animation' 
                    : 'border-gray-100 hover:border-blue-200'
                }`}
              >
                {/* БОЛЬ */}
                <div className="text-xs text-blue-600 font-semibold mb-2 uppercase tracking-wide italic">
                  {service.pain}
                </div>
                
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                  service.featured 
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg' 
                    : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md'
                }`}>
                  {service.icon}
                </div>
                
                {service.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full mb-2">
                    <Zap className="w-3 h-3" />
                    ХИТ ПРОДАЖ
                  </span>
                )}
                
                {/* РЕШЕНИЕ */}
                <h3 className="text-base font-bold mb-2">{service.solution}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                
                <div className="pt-4 border-t border-gray-100">
                  <span className={`text-xl font-black ${service.featured ? 'text-blue-600' : 'text-blue-600'}`}>
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Наши Работы */}
      <section id="portfolio" className="py-6 lg:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-4 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
              Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">работы</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Каждый проект — это история преображения автомобиля
            </p>
          </div>

          {/* Portfolio grid with zoom effect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 stagger-children animate-on-scroll">
            {portfolioItems.map((item, index) => (
              <div
                key={`${item.category}-${index}`}
                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 card-soft shadow-lg img-hover-zoom"
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
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-bold text-lg mb-1">{item.alt}</p>
                    <p className="text-white/80 text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      ЭстетикБро • Челябинск
                    </p>
                  </div>
                </div>
                {/* View more button */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
                  <Camera className="w-5 h-5 text-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-6 lg:py-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-5 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full text-yellow-700 text-sm font-semibold mb-1">
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
          <div className="grid md:grid-cols-3 gap-8 stagger-children animate-on-scroll">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-lg shadow-gray-200/50 card-soft border border-gray-100 relative"
              >
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6" />
                
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
                
                {/* Author & Date */}
                <div className="pt-6 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                      {review.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{review.author}</div>
                    <div className="text-sm text-blue-600 font-medium">{review.service}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{review.date}</div>
                  </div>
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-blue-600 hover:border-blue-400 hover:bg-blue-50 font-semibold rounded-full transition-all"
            >
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              Читать все отзывы на Яндекс Картах
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-6 lg:py-10 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-5 animate-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-semibold mb-1">
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
                className="bg-gray-50 rounded-2xl overflow-hidden animate-on-scroll card-soft border border-gray-100"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronUp className={`w-5 h-5 text-blue-600 transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('contacts')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl btn-primary inline-flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Задать вопрос
              </button>
              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-green-300 text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all inline-flex items-center gap-2"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-6 lg:py-10 bg-gradient-to-b from-gray-50 to-white">
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
                  Ответим в течение <strong className="text-gray-700">15 минут</strong>. Рассчитаем стоимость!
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone */}
                <a href={`tel:${CONTACTS.phoneRaw}`} className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group shadow-sm">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{CONTACTS.phone}</div>
                    <div className="text-sm text-gray-500">Звоните ежедневно с 9:00 до 21:00</div>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Адрес</div>
                    <div className="text-gray-600 mt-1">{CONTACTS.address}</div>
                    <div className="text-sm text-gray-400 mt-1">{CONTACTS.addressNote}</div>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex flex-wrap gap-3 pt-2">
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
                    className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-green-400 hover:bg-green-50 transition-all inline-flex items-center gap-2"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={CONTACTS.yandexMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-red-400 hover:bg-red-50 transition-all inline-flex items-center gap-2"
                  >
                    Яндекс Карты
                  </a>
                  <a
                    href={CONTACTS.gis2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-semibold hover:border-orange-400 hover:bg-orange-50 transition-all inline-flex items-center gap-2"
                  >
                    2ГИС
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Form / Thank You */}
            <div className="animate-on-scroll" style={{ transitionDelay: '150ms' }}>
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="p-8 lg:p-10 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 space-y-6 relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
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
                        className={`w-full px-5 py-4 rounded-xl border-2 ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-base`}
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
                        className={`w-full px-5 py-4 rounded-xl border-2 ${formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-base`}
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
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all text-base cursor-pointer"
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
                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white resize-none transition-all text-base"
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
                    </p>
                  </div>
                </form>
              ) : (
                /* СТРАНИЦА СПАСИБО */
                <div className="p-8 lg:p-10 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl shadow-xl border border-green-200 text-center space-y-6 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-green-200/30 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-200/30 rounded-full blur-2xl"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-black text-gray-900 mt-6">Спасибо!</h3>
                    
                    <div className="space-y-3 text-gray-600 mt-4">
                      <p className="text-lg">Мы уже получили вашу заявку.</p>
                      <p className="flex items-center justify-center gap-2">
                        Обычно связываемся в течение 
                        <span className="text-green-600 font-bold text-xl">10–15 минут</span>
                      </p>
                    </div>

                    <div className="pt-8 space-y-4">
                      <a
                        href={CONTACTS.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl btn-primary flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
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
                Профессиональный детейлинг центр в Челябинске. Полный спектр услуг.
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
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Юридическая информация</p>
                <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Политика конфиденциальности</a>
                <a href="#" className="block text-sm text-gray-400 hover:text-white transition-colors">Согласие на обработку данных</a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky CTA form - ИНТЕРАКТИВНОСТЬ */}
      {showStickyForm && !formSubmitted && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
          <div className="sticky-form visible bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 w-72">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-1 glow-animation">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <p className="font-bold text-gray-900">Запишитесь сейчас!</p>
              <p className="text-xs text-gray-500">Осталось 4 свободных окна</p>
            </div>
            
            <button
              onClick={() => scrollToSection('contacts')}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl btn-primary text-sm"
            >
              Оставить заявку
            </button>
            
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 mt-2 border-2 border-green-300 text-green-700 font-bold rounded-xl text-sm hover:bg-green-50 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl shadow-blue-600/30 flex items-center justify-center hover:scale-110 transition-all z-40"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

// Search icon for process steps
function Search(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  )
}
