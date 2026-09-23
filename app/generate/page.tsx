import type { Metadata } from "next"

import { GeneratorWorkspace } from "@/components/vault/generator-workspace"

export const metadata: Metadata = {
  title: "Generator · UNG Password Manager",
}

export default function GeneratePage() {
  return <GeneratorWorkspace />
}
