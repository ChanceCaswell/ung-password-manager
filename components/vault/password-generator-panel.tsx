"use client"

import { useCallback, useState } from "react"
import { RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  DEFAULT_PASSWORD_OPTIONS,
  PASSWORD_LENGTH_MIN,
  generatePassword,
  type PasswordOptions,
} from "@/lib/password-generator"
import { cn } from "@/lib/utils"

const PASSWORD_LENGTH_SLIDER_MAX = 64

const OPTION_LABELS: Array<{
  key: keyof Pick<
    PasswordOptions,
    "lowercase" | "uppercase" | "digits" | "symbols"
  >
  label: string
}> = [
  { key: "lowercase", label: "Lowercase" },
  { key: "uppercase", label: "Uppercase" },
  { key: "digits", label: "Numbers" },
  { key: "symbols", label: "Symbols" },
]

export interface PasswordGeneratorPanelProps {
  renderActions?(password: string): React.ReactNode
  className?: string
}

interface GeneratedPreview {
  password: string
  error: string | null
}

function previewFor(options: PasswordOptions): GeneratedPreview {
  try {
    return { password: generatePassword(options), error: null }
  } catch (caught) {
    return {
      password: "",
      error:
        caught instanceof Error
          ? caught.message
          : "Password generation failed.",
    }
  }
}

export function PasswordGeneratorPanel({
  renderActions,
  className,
}: PasswordGeneratorPanelProps) {
  const [options, setOptions] = useState<PasswordOptions>(
    DEFAULT_PASSWORD_OPTIONS
  )
  const [preview, setPreview] = useState<GeneratedPreview>(() =>
    previewFor(DEFAULT_PASSWORD_OPTIONS)
  )

  const regenerate = useCallback(() => {
    setPreview(previewFor(options))
  }, [options])

  const updateOption = useCallback(
    <Key extends keyof PasswordOptions>(
      key: Key,
      value: PasswordOptions[Key]
    ) => {
      const next = { ...options, [key]: value }
      setOptions(next)
      setPreview(previewFor(next))
    },
    [options]
  )

  const { password, error } = preview

  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-lg border bg-muted/30 p-3">
        <div className="flex items-start gap-2">
          <output
            htmlFor="password-length"
            className="min-h-10 flex-1 rounded-md bg-background px-3 py-2 font-mono text-sm break-all ring-1 ring-border"
            aria-label="Generated password preview"
            aria-live="polite"
          >
            {password || "—"}
          </output>
          <Button
            className="size-10 shrink-0"
            type="button"
            size="icon"
            variant="outline"
            onClick={regenerate}
            aria-label="Regenerate password"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="password-length">Length</Label>
          <span className="rounded bg-muted px-2 py-1 font-mono text-xs ring-1 ring-border">
            {options.length}
          </span>
        </div>
        <input
          id="password-length"
          className="w-full accent-foreground"
          type="range"
          min={PASSWORD_LENGTH_MIN}
          max={PASSWORD_LENGTH_SLIDER_MAX}
          step={1}
          value={options.length}
          onChange={(event) =>
            updateOption("length", Number(event.target.value))
          }
        />
        <div className="flex justify-between text-[0.6875rem] text-muted-foreground">
          <span>{PASSWORD_LENGTH_MIN}</span>
          <span>{PASSWORD_LENGTH_SLIDER_MAX}</span>
        </div>
      </div>

      <fieldset className="grid grid-cols-2 gap-3">
        <legend className="sr-only">Character types</legend>
        {OPTION_LABELS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-2">
            <Checkbox
              id={`password-option-${key}`}
              checked={options[key]}
              onCheckedChange={(checked) => updateOption(key, checked === true)}
            />
            <Label htmlFor={`password-option-${key}`}>{label}</Label>
          </div>
        ))}
      </fieldset>

      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}

      {renderActions ? renderActions(password) : null}
    </div>
  )
}
