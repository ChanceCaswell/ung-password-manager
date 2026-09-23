import type { Metadata } from "next"

import { VaultWorkspace } from "@/components/vault/vault-workspace"

export const metadata: Metadata = {
  title: "Vault · UNG Password Manager",
}

export default function VaultPage() {
  return <VaultWorkspace />
}
