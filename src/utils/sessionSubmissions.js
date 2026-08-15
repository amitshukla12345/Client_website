export const SESSION_SUBMISSIONS_KEY = 'katha_demo_submissions'

const canUseSessionStorage = () => typeof window !== 'undefined' && Boolean(window.sessionStorage)

export const getSessionSubmissions = () => {
  if (!canUseSessionStorage()) return []

  try {
    const saved = window.sessionStorage.getItem(SESSION_SUBMISSIONS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.warn('Unable to read demo submissions from session storage.', error)
    return []
  }
}

export const saveSessionSubmission = (formType, data) => {
  const submission = {
    id: `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    formType,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    ...data
  }

  if (!canUseSessionStorage()) return submission

  try {
    const submissions = getSessionSubmissions()
    window.sessionStorage.setItem(SESSION_SUBMISSIONS_KEY, JSON.stringify([submission, ...submissions]))
  } catch (error) {
    console.warn('Unable to save demo submission to session storage.', error)
  }

  return submission
}

export const updateSessionSubmission = (id, changes) => {
  const submissions = getSessionSubmissions()
  const updated = submissions.map(item => item.id === id ? { ...item, ...changes } : item)

  if (canUseSessionStorage()) {
    window.sessionStorage.setItem(SESSION_SUBMISSIONS_KEY, JSON.stringify(updated))
  }

  return updated
}

export const removeSessionSubmission = (id) => {
  const updated = getSessionSubmissions().filter(item => item.id !== id)

  if (canUseSessionStorage()) {
    window.sessionStorage.setItem(SESSION_SUBMISSIONS_KEY, JSON.stringify(updated))
  }

  return updated
}
