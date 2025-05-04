// Helper to map decade label to start and end year
export const mapDecadesToRanges = (label) => {
  switch (label) {
    case 'Classic Pre-1970s':
      return { start: 1900, end: 1969 }
    case 'Retro 70s and 80s':
      return { start: 1970, end: 1989 }
    case 'Throwback 90s and 2000s':
      return { start: 1990, end: 2009 }
    case 'Modern 2010s':
      return { start: 2010, end: 2019 }
    case 'Fresh Hits 2020s':
      return { start: 2020, end: 2025 }
    default:
      return null // Handle unknown labels
  }
}
