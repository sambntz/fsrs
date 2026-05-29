import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DecksPage() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted-foreground">Mazos</p>
        <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">
          Tus mazos
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante venenatis dapibus posuere velit aliquet.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
            <CardDescription>Estado general de tus mazos.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              mattis consectetur purus sit amet fermentum.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>Espacio preparado para sesiones FSRS.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
              ligula porta felis euismod semper.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas</CardTitle>
            <CardDescription>Placeholder de actividad futura.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              Maecenas faucibus mollis interdum. Etiam porta sem malesuada
              magna mollis euismod.
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
