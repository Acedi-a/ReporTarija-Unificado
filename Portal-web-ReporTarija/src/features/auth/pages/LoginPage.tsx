import { LoginForm } from '../components/LoginForm'
import { useLoginForm } from '../hooks/useLoginForm'
import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { Panel } from '../../../shared/components/ui/Panel'
import { Logo } from '../../../shared/components/ui/Logo'

export function LoginPage() {
  const loginForm = useLoginForm()

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md flex flex-col items-center">
        <Logo className="h-44 w-auto mb-6" />
        <Panel className="w-full p-6 shadow-sm">
          <div className="mb-6">
            <PageHeader eyebrow="Panel ReportaTarija" title="Inicio de sesión" description="Acceso para funcionarios municipales." />
          </div>
          <LoginForm
            values={loginForm.values}
            error={loginForm.error}
            isSubmitting={loginForm.isSubmitting}
            onFieldChange={loginForm.updateField}
            onSubmit={loginForm.submit}
          />
        </Panel>
      </div>
    </main>
  )
}
