export const generatePassword = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('')
}

export const generateStudentId = (classCode, index) => {
  const year = new Date().getFullYear().toString().slice(-2)
  return `STU${year}${classCode}${String(index).padStart(3, '0')}`
}

export const generateTeacherId = (index) => {
  const year = new Date().getFullYear().toString().slice(-2)
  return `TCH${year}${String(index).padStart(3, '0')}`
}

export const paginate = (page = 1, limit = 10) => {
  const p = Math.max(1, parseInt(page))
  const l = Math.min(100, Math.max(1, parseInt(limit)))
  return { skip: (p - 1) * l, take: l, page: p, limit: l }
}
