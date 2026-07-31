import { NextRequest, NextResponse } from 'next/server'

// Telegram Bot API endpoint
const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`

// Chat ID where notifications will be sent
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || ''

interface LeadData {
  name: string
  phone: string
  service?: string
  comment?: string
}

function formatTelegramMessage(data: LeadData): string {
  const timestamp = new Date().toLocaleString('ru-RU', { 
    timeZone: 'Asia/Yekaterinburg' 
  })
  
  let message = `🚘 *НОВАЯ ЗАЯВКА С САЙТА*\n\n`
  message += `👤 *Имя:* ${data.name}\n`
  message += `📱 *Телефон:* \`${data.phone}\`\n`
  
  if (data.service) {
    message += `🔧 *Услуга:* ${data.service}\n`
  }
  
  if (data.comment) {
    message += `💬 *Комментарий:* ${data.comment}\n`
  }
  
  message += `\n🕐 *Дата:* ${timestamp}`
  
  return message
}

export async function POST(request: NextRequest) {
  try {
    // Check if Telegram credentials are configured
    if (!process.env.TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured')
      return NextResponse.json(
        { error: 'Сервис временно недоступен. Попробуйте позже.' },
        { status: 503 }
      )
    }

    // Parse request body
    let body: LeadData
    try {
      body = await request.json()
    } catch (e) {
      return NextResponse.json(
        { error: 'Некорректный формат данных' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Заполните обязательные поля: имя и телефон' },
        { status: 400 }
      )
    }

    // Sanitize input (basic XSS prevention)
    const sanitizedData: LeadData = {
      name: body.name.trim().slice(0, 100),
      phone: body.phone.trim().slice(0, 20),
      service: body.service?.trim().slice(0, 200),
      comment: body.comment?.trim().slice(0, 1000)
    }

    // Format message for Telegram
    const message = formatTelegramMessage(sanitizedData)

    // Send to Telegram
    const telegramResponse = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    })

    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text()
      console.error('Telegram API error:', errorText)
      return NextResponse.json(
        { error: 'Ошибка отправки сообщения. Попробуйте позвонить.' },
        { status: 500 }
      )
    }

    // Log the lead for analytics/CRM integration
    console.log('Lead captured:', {
      name: sanitizedData.name,
      phone: sanitizedData.phone,
      service: sanitizedData.service,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Заявка успешно отправлена!' 
    })

  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера. Пожалуйста, позвоните нам.' },
      { status: 500 }
    )
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}
