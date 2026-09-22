import { describe, expect, it } from "bun:test"

import {
  PASSWORD_CHARACTER_SETS,
  generatePassword,
  type PasswordOptions,
} from "../../lib/password-generator"

function deterministicRandomIndex() {
  let value = 0
  return (upperExclusive: number) => value++ % upperExclusive
}

const allCharacterTypes: PasswordOptions = {
  length: 32,
  lowercase: true,
  uppercase: true,
  digits: true,
  symbols: true,
}

describe("generatePassword", () => {
  it("returns the requested length and includes every selected character type", () => {
    const password = generatePassword(
      allCharacterTypes,
      deterministicRandomIndex()
    )

    expect(password).toHaveLength(32)
    expect(password).toMatch(/[a-z]/)
    expect(password).toMatch(/[A-Z]/)
    expect(password).toMatch(/[0-9]/)
    expect(password).toMatch(/[!@#$%^&*()\-_=+\[\]{};:,.?]/)
  })

  it("uses only the selected character sets", () => {
    const password = generatePassword(
      {
        ...allCharacterTypes,
        length: 24,
        lowercase: false,
        uppercase: false,
        symbols: false,
      },
      deterministicRandomIndex()
    )

    expect(password).toMatch(/^\d{24}$/)
  })

  it("rejects a request with no character types", () => {
    expect(() =>
      generatePassword({
        ...allCharacterTypes,
        lowercase: false,
        uppercase: false,
        digits: false,
        symbols: false,
      })
    ).toThrow("Select at least one character type")
  })

  it("rejects lengths outside the supported range", () => {
    expect(() =>
      generatePassword({ ...allCharacterTypes, length: 11 })
    ).toThrow("between 12 and 128")

    expect(() =>
      generatePassword({ ...allCharacterTypes, length: 129 })
    ).toThrow("between 12 and 128")
  })

  it("does not silently add characters from an unselected set", () => {
    const password = generatePassword(
      {
        ...allCharacterTypes,
        length: 18,
        uppercase: false,
        digits: false,
        symbols: false,
      },
      deterministicRandomIndex()
    )

    expect(
      [...password].every((character) =>
        PASSWORD_CHARACTER_SETS.lowercase.includes(character)
      )
    ).toBe(true)
  })
})
