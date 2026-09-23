"use client"

import { CredentialForm } from "@/components/vault/credential-form"
import { CredentialList } from "@/components/vault/credential-list"
import { useVault } from "@/components/vault/vault-provider"

export function VaultWorkspace() {
  const { credentials } = useVault()

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <CredentialForm />
      <CredentialList credentials={credentials} />
    </div>
  )
}
