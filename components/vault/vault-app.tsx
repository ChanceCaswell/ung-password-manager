"use client"

import { Lock, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CredentialForm } from "@/components/vault/credential-form"
import { CredentialList } from "@/components/vault/credential-list"
import { VaultGate } from "@/components/vault/vault-gate"
import {
  VaultProvider,
  useVault,
} from "@/components/vault/vault-provider"

export function VaultApp() {
  return (
    <VaultProvider>
      <VaultScreen />
    </VaultProvider>
  )
}

function VaultScreen() {
  const { status, credentials, lockVault } = useVault()

  if (status !== "unlocked") return <VaultGate />

  return (
    <main className="min-h-svh bg-background">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold">UNG Password Manager</p>
              <p className="text-xs text-muted-foreground">
                Secure credential storage
              </p>
            </div>
          </div>
          <Button
            className="h-10 px-3 text-sm"
            type="button"
            variant="outline"
            onClick={lockVault}
          >
            <Lock className="size-4" aria-hidden="true" />
            Lock vault
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <section className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Your credential vault
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Save and manage your account details in one place.
          </p>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <CredentialForm />
          <CredentialList credentials={credentials} />
        </div>
      </div>
    </main>
  )
}
