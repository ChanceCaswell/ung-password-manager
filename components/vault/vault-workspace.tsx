"use client"

import { useState } from "react"

import { AddCredentialDialog } from "@/components/vault/add-credential-dialog"
import { CredentialList } from "@/components/vault/credential-list"
import { useVault } from "@/components/vault/vault-provider"

export function VaultWorkspace() {
  const { credentials } = useVault()
  const [addOpen, setAddOpen] = useState(() => credentials.length === 0)

  return (
    <>
      <CredentialList
        credentials={credentials}
        onAddCredential={() => setAddOpen(true)}
      />
      <AddCredentialDialog open={addOpen} onOpenChange={setAddOpen} />
    </>
  )
}
