import { onRequestPost as __api_contacto_js_onRequestPost } from "C:\\Users\\Eliel Teruel\\tct-portfolio\\functions\\api\\contacto.js"
import { onRequestGet as __api_cotizaciones_js_onRequestGet } from "C:\\Users\\Eliel Teruel\\tct-portfolio\\functions\\api\\cotizaciones.js"
import { onRequestOptions as __api_cotizaciones_js_onRequestOptions } from "C:\\Users\\Eliel Teruel\\tct-portfolio\\functions\\api\\cotizaciones.js"
import { onRequestPost as __api_cotizaciones_js_onRequestPost } from "C:\\Users\\Eliel Teruel\\tct-portfolio\\functions\\api\\cotizaciones.js"
import { onRequestGet as __api_disponibilidad_js_onRequestGet } from "C:\\Users\\Eliel Teruel\\tct-portfolio\\functions\\api\\disponibilidad.js"
import { onRequestPost as __api_resend_email_js_onRequestPost } from "C:\\Users\\Eliel Teruel\\tct-portfolio\\functions\\api\\resend-email.js"
import { onRequestDelete as __api_reservas_js_onRequestDelete } from "C:\\Users\\Eliel Teruel\\tct-portfolio\\functions\\api\\reservas.js"
import { onRequestGet as __api_reservas_js_onRequestGet } from "C:\\Users\\Eliel Teruel\\tct-portfolio\\functions\\api\\reservas.js"
import { onRequestPost as __api_reservas_js_onRequestPost } from "C:\\Users\\Eliel Teruel\\tct-portfolio\\functions\\api\\reservas.js"
import { onRequestPut as __api_reservas_js_onRequestPut } from "C:\\Users\\Eliel Teruel\\tct-portfolio\\functions\\api\\reservas.js"

export const routes = [
    {
      routePath: "/api/contacto",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_contacto_js_onRequestPost],
    },
  {
      routePath: "/api/cotizaciones",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_cotizaciones_js_onRequestGet],
    },
  {
      routePath: "/api/cotizaciones",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_cotizaciones_js_onRequestOptions],
    },
  {
      routePath: "/api/cotizaciones",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_cotizaciones_js_onRequestPost],
    },
  {
      routePath: "/api/disponibilidad",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_disponibilidad_js_onRequestGet],
    },
  {
      routePath: "/api/resend-email",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_resend_email_js_onRequestPost],
    },
  {
      routePath: "/api/reservas",
      mountPath: "/api",
      method: "DELETE",
      middlewares: [],
      modules: [__api_reservas_js_onRequestDelete],
    },
  {
      routePath: "/api/reservas",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_reservas_js_onRequestGet],
    },
  {
      routePath: "/api/reservas",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_reservas_js_onRequestPost],
    },
  {
      routePath: "/api/reservas",
      mountPath: "/api",
      method: "PUT",
      middlewares: [],
      modules: [__api_reservas_js_onRequestPut],
    },
  ]