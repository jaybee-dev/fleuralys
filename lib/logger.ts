/**
 * Système de logging sécurisé
 * Évite l'exposition d'informations sensibles dans les logs
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  context?: Record<string, unknown>
  error?: {
    name: string
    message: string
    stack?: string
  }
}

/**
 * Nettoie les données sensibles avant de les logger
 */
function sanitizeData(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) {
    return data
  }

  const sensitiveFields = [
    'password',
    'token',
    'secret',
    'api_key',
    'apikey',
    'authorization',
    'cookie',
    'session',
    'email', // Optionnel selon les besoins
    'telephone', // Optionnel selon les besoins
  ]

  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item))
  }

  const sanitized: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase()
    if (sensitiveFields.some(field => lowerKey.includes(field))) {
      sanitized[key] = '[REDACTED]'
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeData(value)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized
}

/**
 * Crée une entrée de log formatée
 */
function createLogEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
  error?: Error
): LogEntry {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
  }

  if (context) {
    entry.context = sanitizeData(context) as Record<string, unknown>
  }

  if (error) {
    entry.error = {
      name: error.name,
      message: error.message,
      // Inclure la stack trace uniquement en développement
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  }

  return entry
}

/**
 * Logger pour environnement de développement
 */
function devLog(entry: LogEntry) {
  const colors = {
    info: '\x1b[36m',    // Cyan
    warn: '\x1b[33m',    // Yellow
    error: '\x1b[31m',   // Red
    debug: '\x1b[35m',   // Magenta
  }
  const reset = '\x1b[0m'
  const color = colors[entry.level]

  console.log(`${color}[${entry.level.toUpperCase()}]${reset} ${entry.timestamp}`)
  console.log(`${color}Message:${reset} ${entry.message}`)

  if (entry.context) {
    console.log(`${color}Context:${reset}`, entry.context)
  }

  if (entry.error) {
    console.log(`${color}Error:${reset}`, entry.error)
  }

  console.log('') // Ligne vide pour la lisibilité
}

/**
 * Logger pour environnement de production
 * En production, on pourrait l'envoyer à un service comme Sentry, LogRocket, etc.
 */
function prodLog(entry: LogEntry) {
  // En production, on log uniquement en JSON
  console.log(JSON.stringify(entry))

  // TODO: Envoyer à un service de monitoring
  // if (entry.level === 'error') {
  //   sendToSentry(entry)
  // }
}

/**
 * Fonction principale de logging
 */
function log(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
  error?: Error
) {
  const entry = createLogEntry(level, message, context, error)

  if (process.env.NODE_ENV === 'production') {
    prodLog(entry)
  } else {
    devLog(entry)
  }
}

/**
 * API publique du logger
 */
export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    log('info', message, context)
  },

  warn: (message: string, context?: Record<string, unknown>) => {
    log('warn', message, context)
  },

  error: (message: string, error?: Error, context?: Record<string, unknown>) => {
    log('error', message, context, error)
  },

  debug: (message: string, context?: Record<string, unknown>) => {
    // Debug logs uniquement en développement
    if (process.env.NODE_ENV === 'development') {
      log('debug', message, context)
    }
  },
}

/**
 * Wrapper pour les erreurs API
 */
export function logApiError(
  endpoint: string,
  error: unknown,
  context?: Record<string, unknown>
) {
  const errorObj = error instanceof Error ? error : new Error(String(error))

  logger.error(
    `API Error: ${endpoint}`,
    errorObj,
    {
      endpoint,
      ...context
    }
  )
}

/**
 * Wrapper pour les erreurs de base de données
 */
export function logDatabaseError(
  operation: string,
  error: unknown,
  context?: Record<string, unknown>
) {
  const errorObj = error instanceof Error ? error : new Error(String(error))

  logger.error(
    `Database Error: ${operation}`,
    errorObj,
    {
      operation,
      ...context
    }
  )
}
