import { LoginForm } from '@/components/admin/login-form';

export default function AdminLoginPage() {
  return (
    <div className="bg-neutral-0 border-border/60 mx-auto mt-10 max-w-sm rounded-2xl border p-8">
      <h1 className="text-xl font-semibold text-neutral-900">Entrar al panel</h1>
      <p className="text-muted-foreground mt-1 text-sm">Acceso solo para administradores.</p>
      <LoginForm className="mt-6" />
    </div>
  );
}
