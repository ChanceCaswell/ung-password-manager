"use client"

import { useState, type FormEvent } from "react"
import { Eye, EyeOff, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useVault } from "@/components/vault/vault-provider"
import type { CredentialDraft } from "@/lib/vault/types"
import {
  CredentialValidationError,
  type CredentialField,
} from "@/lib/vault/validation"

const EMPTY_DRAFT: CredentialDraft = {
  accountName: "",
  siteOrApp: "",
  username: "",
  password: "",
  notes: "",
}

export interface CredentialFormProps {
  onSaved?(): void
}

export function CredentialForm({ onSaved }: CredentialFormProps) {
  const { addCredential, busy } = useVault()
  const [draft, setDraft] = useState<CredentialDraft>(EMPTY_DRAFT)
  const [errors, setErrors] = useState<
    Partial<Record<CredentialField, string>>
  >({})
  const [message, setMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  function updateDraft<Key extends keyof CredentialDraft>(
    key: Key,
    value: CredentialDraft[Key]
  ) {
    setDraft((current) => ({ ...current, [key]: value }))
    if (key in errors) {
      setErrors((current) => ({ ...current, [key]: undefined }))
    }
    setMessage(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    setMessage(null)

    try {
      await addCredential(draft)
      setDraft(EMPTY_DRAFT)
      setShowPassword(false)
      onSaved?.()
    } catch (caught) {
      if (caught instanceof CredentialValidationError) {
        setErrors(caught.fields)
        return
      }
      setMessage(
        caught instanceof Error
          ? caught.message
          : "The credential could not be saved."
      )
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <Field
        id="account-name"
        label="Account label"
        value={draft.accountName}
        placeholder="University email"
        error={errors.accountName}
        onChange={(value) => updateDraft("accountName", value)}
      />
      <Field
        id="site-or-app"
        label="Website or app"
        value={draft.siteOrApp}
        placeholder="mail.example.edu"
        error={errors.siteOrApp}
        onChange={(value) => updateDraft("siteOrApp", value)}
      />
      <Field
        id="credential-username"
        label="Username"
        value={draft.username}
        placeholder="student@example.edu"
        error={errors.username}
        autoComplete="username"
        onChange={(value) => updateDraft("username", value)}
      />

      <div className="space-y-2">
        <Label htmlFor="credential-password">Password</Label>
        <div className="flex gap-2">
          <Input
            id="credential-password"
            className="h-10 px-3 font-mono text-sm"
            type={showPassword ? "text" : "password"}
            value={draft.password}
            onChange={(event) => updateDraft("password", event.target.value)}
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "credential-password-error" : undefined
            }
          />
          <Button
            className="size-10 shrink-0"
            type="button"
            size="icon"
            variant="outline"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>
        {errors.password ? (
          <p
            id="credential-password-error"
            className="text-xs text-destructive"
          >
            {errors.password}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="credential-notes">Notes (optional)</Label>
        <textarea
          id="credential-notes"
          className="min-h-20 w-full resize-y rounded-md border border-input bg-input/20 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 dark:bg-input/30"
          value={draft.notes}
          onChange={(event) => updateDraft("notes", event.target.value)}
          placeholder="Recovery details or context"
        />
      </div>

      <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
        {message}
      </p>

      <Button
        className="h-11 w-full px-4 text-sm"
        type="submit"
        disabled={busy}
      >
        <Plus className="size-4" aria-hidden="true" />
        {busy ? "Encrypting and saving…" : "Save credential"}
      </Button>
    </form>
  )
}

interface FieldProps {
  id: string
  label: string
  value: string
  placeholder: string
  error?: string
  autoComplete?: string
  onChange(value: string): void
}

function Field({
  id,
  label,
  value,
  placeholder,
  error,
  autoComplete,
  onChange,
}: FieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        className="h-10 px-3 text-sm"
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
