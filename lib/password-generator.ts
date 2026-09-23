export const PASSWORD_LENGTH_MIN = 12
export const PASSWORD_LENGTH_MAX = 128

export const PASSWORD_CHARACTER_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?",
} as const

export interface PasswordOptions {
  length: number
  lowercase: boolean
  uppercase: boolean
  digits: boolean
  symbols: boolean
}

export const DEFAULT_PASSWORD_OPTIONS: PasswordOptions = {
  length: 20,
  lowercase: true,
  uppercase: true,
  digits: true,
  symbols: true,
}

export type RandomIndex = (upperExclusive: number) => number

function secureRandomIndex(upperExclusive: number): number {
  if (!Number.isSafeInteger(upperExclusive) || upperExclusive <= 0) {
    throw new Error("Random range must be a positive integer.")
  }

  const maximum = 2 ** 32
  const unbiasedLimit = maximum - (maximum % upperExclusive)
  const value = new Uint32Array(1)

  do {
    crypto.getRandomValues(value)
  } while (value[0] >= unbiasedLimit)

  return value[0] % upperExclusive
}

export function generatePassword(
  options: PasswordOptions,
  randomIndex: RandomIndex = secureRandomIndex
): string {
  if (
    !Number.isSafeInteger(options.length) ||
    options.length < PASSWORD_LENGTH_MIN ||
    options.length > PASSWORD_LENGTH_MAX
  ) {
    throw new Error(
      `Password length must be between ${PASSWORD_LENGTH_MIN} and ${PASSWORD_LENGTH_MAX}.`
    )
  }

  const selectedSets = (
    Object.keys(PASSWORD_CHARACTER_SETS) as Array<
      keyof typeof PASSWORD_CHARACTER_SETS
    >
  )
    .filter((name) => options[name])
    .map((name) => PASSWORD_CHARACTER_SETS[name])

  if (selectedSets.length === 0) {
    throw new Error("Select at least one character type.")
  }

  if (options.length < selectedSets.length) {
    throw new Error(
      "Password length is too short for the selected character types."
    )
  }

  const characters = selectedSets.map((set) => set[randomIndex(set.length)])
  const combinedSet = selectedSets.join("")

  while (characters.length < options.length) {
    characters.push(combinedSet[randomIndex(combinedSet.length)])
  }

  for (let index = characters.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1)
    ;[characters[index], characters[swapIndex]] = [
      characters[swapIndex],
      characters[index],
    ]
  }

  return characters.join("")
}
