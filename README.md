# 🐟 Ysyry - Pescados Frescos de Misiones

Una aplicación web moderna para la venta de pescados y mariscos frescos de productores locales de Misiones, Argentina.

## 📋 Descripción

Ysyry es una plataforma e-commerce desarrollada con Next.js que conecta a consumidores con productores locales de pescados frescos en la provincia de Misiones. La aplicación ofrece una experiencia de compra intuitiva con información detallada sobre productos, productores y precios transparentes.

## 🚀 Características

### ✨ Funcionalidades Principales
- **Catálogo de productos** con imágenes de alta calidad
- **Búsqueda en tiempo real** por nombre de producto
- **Filtrado por categorías** (Pescado Fresco, Mariscos, etc.)
- **Modal de producto detallado** con información completa
- **Información de productores** locales con datos de contacto
- **Cálculo de precios transparente** (precio por kg vs precio por caja)
- **Indicadores de frescura** y fechas de vencimiento
- **Gestión de stock** en tiempo real
- **Diseño responsive** para todos los dispositivos

### 🎨 Tecnologías Utilizadas
- **Next.js 15.5.4** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utilitarios
- **shadcn/ui** - Componentes UI modernos
- **Radix UI** - Primitivos de UI accesibles
- **Lucide React** - Iconografía
- **React Hook Form** - Manejo de formularios
- **Turbopack** - Bundler ultrarrápido

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Pasos de instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/MendezCamila/ysyry.git
cd ysyry
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Ejecuta el servidor de desarrollo**
```bash
npm run dev
```

4. **Abre tu navegador**
```
http://localhost:3000
```

### Scripts disponibles

```bash
# Desarrollo con Turbopack
npm run dev

# Construcción para producción
npm run build

# Servidor de producción
npm run start

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
ysyry/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── header.tsx        # Cabecera con búsqueda
│   ├── product-card.tsx  # Tarjeta de producto
│   ├── product-grid.tsx  # Grilla de productos
│   └── product-modal.tsx # Modal de producto detallado
├── public/               # Archivos estáticos
│   ├── Ysyry logo.png   # Logo de la marca
│   └── *.jpg            # Imágenes de productos
├── lib/                 # Utilidades
│   └── utils.ts         # Funciones helper
└── README.md           # Este archivo
```

## 🎯 Uso de la Aplicación

### Para Usuarios
1. **Explora el catálogo** de pescados frescos
2. **Busca productos** usando la barra de búsqueda
3. **Filtra por categorías** según tu preferencia
4. **Haz clic en un producto** para ver detalles completos
5. **Revisa la información del productor** antes de comprar
6. **Verifica precios** tanto por caja como por kilogramo

### Tipos de Productos
- **Pescado por Caja**: Productos frescos vendidos por peso total de la caja
- **Pescado Procesado**: Productos con empaque especial y mayor duración

## 🏪 Productores Asociados

La plataforma trabaja con cooperativas y productores locales de toda la provincia:

- **Cooperativa Pesquera Iguazú** - Puerto Iguazú
- **Pescados del Paraná** - Posadas  
- **Procesadora Oberá S.A.** - Oberá
- **Pesca Eldorado** - Eldorado
- **Mariscos San Vicente** - San Vicente
- **Frigorífico Montecarlo** - Montecarlo

## 🔧 Configuración Avanzada

### Variables de Entorno
Crea un archivo `.env.local` para configuraciones específicas:
```env
# Ejemplo de variables que podrías necesitar
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Personalización de Colores
Los colores se pueden modificar en `app/globals.css`:
```css
:root {
  --primary: oklch(0.55 0.15 200);
  --background: oklch(1 0 0);
  /* ... más variables de color */
}
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno si las necesitas
3. Deploy automático en cada push

### Otras opciones
- Netlify
- Railway  
- Docker

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Sistema de carrito de compras
- [ ] Integración con pasarelas de pago
- [ ] Panel de administración para productores
- [ ] Sistema de notificaciones
- [ ] App móvil con React Native
- [ ] Geolocalización de productores
- [ ] Sistema de reviews y calificaciones

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**Ysyry** - Pescados Frescos de Misiones

- Website: [ysyry.vercel.app](https://ysyry.vercel.app) (cuando esté deployado)
- GitHub: [@MendezCamila](https://github.com/MendezCamila)

---

### 🌟 ¿Te gusta el proyecto?

Si este proyecto te resulta útil, ¡dale una ⭐ en GitHub!

**Hecho con ❤️ en Misiones, Argentina** 🇦🇷
