/**
 * Feature flags del sitio.
 *
 * `onePage`: cuando está activo, el sitio solo muestra la página de presentación
 * del proyecto en `/`. El resto de rutas (servicios, blog, contacto, legales...)
 * siguen existiendo en el código, pero el middleware redirige cualquier acceso a `/`.
 * Pon `onePage: false` para desbloquear la web completa.
 */
export const features = {
  onePage: true,
} as const;
