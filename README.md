La diferencia clave entre las dos versiones está en cómo manejan el objeto `params`, ya que Next.js ahora trata `params` como una promesa en ciertos casos.


En Next.js 13+ (usando rutas en el directorio app), params puede ser una promesa en lugar de un objeto disponible inmediatamente. Esto significa que acceder a params sin esperar a que esté disponible puede causar errores de sincronización, como intentos de acceder a propiedades antes de que params esté listo.


### 1. **Problema Original: Acceso sincrónico a `params`**

En la versión inicial, params.id se utilizaba directamente, lo cual era problemático si params aún no estaba listo. En la nueva versión, se desenrolla params usando await en un useEffect, asegurando que solo se acceda a params cuando está completamente disponible.

En la versión inicial, `params` se utilizaba de forma sincrónica, pero en Next.js 13+ (especialmente en rutas App), `params` puede ser una promesa que necesita ser "desenrollada" antes de acceder a sus propiedades. Esto significa que, en lugar de acceder directamente a `params.id`, necesitamos esperar a que `params` esté disponible para evitar errores de sincronización.

### 2. **Uso de `useState` para almacenar `params`**

Definimos params en el estado inicial de React con useState, permitiendo manejarlo una vez esté disponible. Así, evitamos accesos prematuros.

En la nueva versión, se introduce un `useState` con `params` como `null` inicialmente:

```typescript
const [params, setParams] = useState<{ id: string } | null>(null);
```

Esto permite almacenar el valor de `params` de manera segura una vez que esté disponible, evitando el uso de `params` antes de tiempo.

### 3. **Carga de `params` con `useEffect`**

Para asegurar que `params` se desenrolla correctamente (es decir, se espera hasta que esté disponible), el nuevo código utiliza un `useEffect` para llamar a una función asíncrona `loadParams`:

```typescript
useEffect(() => {
  async function loadParams() {
    const resolvedParams = await initialParams;
    setParams(resolvedParams);
  }

  loadParams();
}, [initialParams]);
```

Este efecto se ejecuta solo una vez (o cuando `initialParams` cambia), obteniendo el valor de `params` y actualizando el estado con `setParams`.

### 4. **Evitar Accesos No Sincrónicos a `params`**

En la versión inicial, `params.id` se accedía directamente, lo que daba error si `params` aún no estaba disponible. En el nuevo código, al acceder a `params` después de la carga inicial, hacemos una verificación:

```typescript
if (params?.id) {
  // Acciones con params.id
}
```

Usando `params?.id` (que verifica la disponibilidad de `params`), evitamos errores que podrían ocurrir si `params` aún no está asignado.

### 5. **Mejoras en el manejo de la API**

El cambio a `fetchData` como una función asíncrona en el segundo `useEffect` asegura que los datos de la API solo se carguen si `params` está disponible. Esto mejora la estabilidad al evitar intentos de llamada a la API con un `params` indefinido.

### Beneficios de estos cambios

1. **Control de sincronización**: Los cambios eliminan cualquier acceso a `params` antes de que esté listo, evitando errores de sincronización.
2. **Mejora en la lectura del código**: Usar `useState` y funciones separadas (`loadParams` y `fetchData`) hace que el código sea más estructurado y fácil de seguir.
3. **Evita advertencias y errores**: Al manejar `params` como una promesa, Next.js puede funcionar sin problemas sin lanzar advertencias de sincronización o fallos en el acceso.

Estos cambios reflejan buenas prácticas en Next.js y React, especialmente cuando estás trabajando con datos asincrónicos y valores dependientes de promesas como `params`. ¡Así que genial que lo hayas aplicado!