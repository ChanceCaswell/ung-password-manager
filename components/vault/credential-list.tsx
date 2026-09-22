import { Globe2, KeyRound, ShieldCheck, UserRound } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Credential } from "@/lib/vault/types"

export function CredentialList({
  credentials,
}: {
  credentials: Credential[]
}) {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle className="text-lg">Saved credentials</CardTitle>
        <CardDescription className="text-sm">
          {credentials.length === 0
            ? "Your vault is empty."
            : `${credentials.length} saved ${credentials.length === 1 ? "credential" : "credentials"}.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {credentials.length === 0 ? (
          <div className="grid min-h-64 place-items-center rounded-lg border border-dashed bg-muted/20 p-8 text-center">
            <div>
              <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <KeyRound className="size-5" aria-hidden="true" />
              </div>
              <p className="mt-4 font-medium">No credentials yet</p>
              <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                Add your first credential using the form.
              </p>
            </div>
          </div>
        ) : (
          <ul className="space-y-3" aria-label="Saved credentials">
            {credentials.map((credential) => (
              <li key={credential.id}>
                <article
                  className="rounded-lg border bg-muted/20 p-4"
                  data-credential-id={credential.id}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold">
                        {credential.accountName}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {credential.siteOrApp}
                      </p>
                    </div>
                    <div
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border"
                      title="Encrypted in the saved vault"
                    >
                      <ShieldCheck className="size-4" aria-hidden="true" />
                    </div>
                  </div>

                  <dl className="mt-4 grid gap-3">
                    <div className="grid min-w-0 grid-cols-[1.25rem_1fr] items-center gap-2">
                      <UserRound
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <dt className="sr-only">Username</dt>
                        <dd className="truncate text-sm">{credential.username}</dd>
                      </div>
                    </div>
                    <div className="grid min-w-0 grid-cols-[1.25rem_1fr] items-center gap-2">
                      <KeyRound
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <dt className="sr-only">Password</dt>
                        <dd
                          className="truncate font-mono text-sm tracking-wider"
                          aria-label="Password hidden"
                        >
                          ••••••••••••
                        </dd>
                      </div>
                    </div>
                    <div className="grid min-w-0 grid-cols-[1.25rem_1fr] items-center gap-2">
                      <Globe2
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <dt className="sr-only">Website or app</dt>
                        <dd className="truncate text-xs text-muted-foreground">
                          {credential.siteOrApp}
                        </dd>
                      </div>
                    </div>
                  </dl>
                </article>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
