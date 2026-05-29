import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SettingsPage() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">
          Configuración
        </p>
        <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">
          Preferencias
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante venenatis dapibus posuere velit aliquet.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cuenta</CardTitle>
            <CardDescription>Preferencias basicas del usuario.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Donec id elit non mi porta gravida at eget metus. Aenean lacinia
              bibendum nulla sed consectetur.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estudio</CardTitle>
            <CardDescription>Base para configuracion de sesiones.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Nullam quis risus eget urna mollis ornare vel eu leo. Curabitur
              blandit tempus porttitor.
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
