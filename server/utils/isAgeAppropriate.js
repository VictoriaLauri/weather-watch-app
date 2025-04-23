import { certificationAges } from './certificationAges.js'

//returns true if the user is old enough for the certification
//returns false if the user is too young for the certification
export function isAgeAppropriate(certification, userAge) {
  // Look up the minimum age for this certification.
  // If it’s not in our map, we’ll assume it’s safe.
  const minAge = certificationAges[certification]
  if (minAge == null) return true
  // If the user is under the minimum age, return false.
  return userAge >= minAge
}
