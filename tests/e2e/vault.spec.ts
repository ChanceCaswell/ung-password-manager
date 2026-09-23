import { expect, test } from "@playwright/test"

const vaultPassword = "correct horse battery staple"
const credentialPassword = "DemoOnly!123456"

const credentialNotes = "Recovery codes are in the shared drive."

test("creates, validates, saves, encrypts, reloads, and unlocks a vault", async ({
  page,
  isMobile,
}) => {
  await page.goto("/")
  await expect(
    page.getByRole("heading", { name: "Create your vault" })
  ).toBeVisible()

  await page.getByLabel("Vault password", { exact: true }).fill(vaultPassword)
  await page.getByLabel("Confirm vault password").fill(vaultPassword)
  await page.getByRole("button", { name: "Create encrypted vault" }).click()

  await expect(page).toHaveURL(/\/vault$/)
  await expect(
    page.getByRole("dialog", { name: "Add a credential" })
  ).toBeVisible()

  await page.getByRole("button", { name: "Save credential" }).click()
  await expect(page.getByText("Enter an account label.")).toBeVisible()
  await expect(page.getByText("Enter a website or app.")).toBeVisible()
  await expect(page.getByText("Enter a username.")).toBeVisible()
  await expect(page.getByText("Enter a password.")).toBeVisible()

  await page.getByLabel("Account label").fill("University email")
  await page.getByLabel("Website or app").fill("mail.example.edu")
  await page.getByLabel("Username").fill("student@example.edu")
  await page.getByLabel("Password", { exact: true }).fill(credentialPassword)
  await page.getByLabel("Notes (optional)").fill(credentialNotes)
  await page.getByRole("button", { name: "Save credential" }).click()

  await expect(
    page.getByRole("dialog", { name: "Add a credential" })
  ).toBeHidden()
  await expect(
    page.getByRole("link", { name: "Vault", exact: true })
  ).toHaveAttribute("aria-current", "page")
  await expect(
    page.getByText("University email", { exact: true })
  ).toBeVisible()
  await expect(page.getByText("student@example.edu")).toBeVisible()
  await expect(page.getByText(credentialNotes)).toBeVisible({
    visible: !isMobile,
  })

  const persistedVault = await page.evaluate(() =>
    localStorage.getItem("ung-password-manager:vault:v1")
  )
  expect(persistedVault).toBeTruthy()
  for (const plaintext of [
    "University email",
    "mail.example.edu",
    "student@example.edu",
    credentialPassword,
    credentialNotes,
  ]) {
    expect(persistedVault).not.toContain(plaintext)
  }

  await page.reload()
  await expect(
    page.getByRole("heading", { name: "Unlock your vault" })
  ).toBeVisible()
  await page.getByLabel("Vault password").fill(vaultPassword)
  await page.getByRole("button", { name: "Unlock vault" }).click()
  await expect(
    page.getByText("University email", { exact: true })
  ).toBeVisible()
})
