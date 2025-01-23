# Form Builder App

    Este proyecto es una aplicación de creación de formularios dinámica construida con Next.js, React y TypeScript. Utiliza Tailwind CSS para el estilo y Radix UI para componentes accesibles.

    ## Características Principales

    *   **Constructor de Formularios Dinámico:** Permite a los usuarios crear formularios personalizados con una interfaz de arrastrar y soltar.
    *   **Componentes Reutilizables:** Incluye una biblioteca completa de componentes de interfaz de usuario construidos con Radix UI y estilizados con Tailwind CSS.
    *   **Integración con Supabase:** Utiliza Supabase para el backend, incluyendo almacenamiento de datos y autenticación.
    *   **Gestión de Estado:** Implementa React Context para gestionar el estado del formulario y otros datos de la aplicación.
    *   **Hooks Personalizados:** Utiliza hooks personalizados para encapsular la lógica de los formularios, como el autoguardado, la validación y el historial de cambios.
    *   **Funciones de Utilidad:** Proporciona funciones de utilidad para tareas como llamadas a la API, cálculos, lógica condicional y exportación de datos.
    *   **Plantillas de Formularios:** Incluye plantillas de formularios preconstruidas para varios casos de uso.
    *   **Funcionalidad de Arrastrar y Soltar:** Utiliza `react-beautiful-dnd` para la funcionalidad de arrastrar y soltar en el constructor de formularios.
    *   **Editor de Texto Enriquecido:** Utiliza `react-quill` para un componente de editor de texto enriquecido.
    *   **Exportación a PDF y Excel:** Permite exportar formularios a PDF utilizando `jspdf` y `html2pdf.js`, y datos de formularios a Excel utilizando `xlsx`.
    *   **Autenticación:** Utiliza Supabase para la autenticación de usuarios.
    *   **Soporte Móvil:** Incluye un hook `useIsMobile` para manejar diseños específicos para dispositivos móviles.
    *   **Notificaciones Toast:** Implementa un sistema de notificaciones toast personalizado.

    ## Estructura del Proyecto

    *   **`components/`:** Contiene todos los componentes de la interfaz de usuario, incluyendo:
        *   `form-builder/`: Componentes relacionados con el constructor de formularios.
        *   `form-elements/`: Componentes de elementos de formulario (inputs, selects, etc.).
        *   `layout/`: Componentes de diseño de la aplicación (header, footer, etc.).
        *   `ui/`: Componentes de interfaz de usuario reutilizables (botones, tarjetas, etc.).
        *   `utils/`: Componentes de utilidad.
    *   **`context/`:** Contiene el contexto de React para la gestión del estado de la aplicación.
    *   **`hooks/`:** Contiene hooks personalizados para la lógica de la aplicación.
    *   **`lib/`:** Contiene la configuración de Supabase y funciones de utilidad.
    *   **`services/`:** Contiene servicios para la lógica de formularios y llamadas a la API.
    *   **`styles/`:** Contiene estilos globales de la aplicación.
    *   **`types/`:** Contiene definiciones de tipos para la aplicación.
    *   **`utils/`:** Contiene funciones de utilidad para diversas tareas.
    *   **`app/`:** Contiene la estructura de la aplicación Next.js, incluyendo páginas y rutas de API.
    *   **`public/`:** Contiene archivos estáticos como imágenes y logos.

    ## Componentes Clave

    *   **Constructor de Formularios:**
        *   `FormBuilder.tsx`: Componente principal del constructor de formularios.
        *   `FormBuilderContent.tsx`: Renderiza las secciones y componentes del formulario.
        *   `FormBuilderHeader.tsx`: Contiene el encabezado con opciones de guardado y configuración.
        *   `ComponentPalette.tsx`: Muestra los componentes de formulario disponibles para arrastrar y soltar.
        *   `PropertiesPanel.tsx`: Muestra las propiedades de los componentes seleccionados o del formulario.
        *   `RenderComponent.tsx`: Renderiza componentes de formulario individuales según su tipo.
        *   `Section.tsx`: Renderiza una sección del formulario, incluyendo sus componentes.
    *   **Elementos de Formulario:**
        *   Implementa una variedad de elementos de formulario, incluyendo `TextInput`, `Select`, `Checkbox`, `DatePicker`, `TimePicker`, `Slider`, `Rating`, `ColorPicker`, `RichTextEditor`, `Autocomplete`, `Signature`, `PhotoUpload` y `DynamicTable`.
    *   **Componentes de Diseño:**
        *   `Header.tsx`, `Footer.tsx`, `FormBuilderLayout.tsx`, `Container.tsx`, `Grid.tsx`, `Accordion.tsx`, `Separator.tsx`, `Tabs.tsx`
    *   **Componentes de Interfaz de Usuario:**
        *   Un conjunto completo de componentes de interfaz de usuario se encuentra en el directorio `components/ui`, incluyendo botones, tarjetas, diálogos, menús desplegables, entradas, etiquetas y más.
    *   **Contextos:**
        *   `FormContext.tsx`: Proporciona el estado del formulario y funciones relacionadas a la aplicación.
    *   **Hooks:**
        *   `useFormLogic.ts`: Gestiona la plantilla y los datos del formulario.
        *   `useAutoSave.ts`: Implementa la funcionalidad de autoguardado.
        *   `useFormActions.ts`: Proporciona acciones para agregar, eliminar y actualizar componentes.
        *   `useFormValidation.ts`: Maneja la lógica de validación del formulario.
        *   `useToast.ts`: Gestiona las notificaciones toast.
        *   `useIsMobile.tsx`: Detecta si el usuario está en un dispositivo móvil.
    *   **Servicios:**
        *   `FormService.ts`: Proporciona métodos para manipular plantillas y datos de formularios.
        *   `api.ts`: Maneja las llamadas a la API de Supabase.
    *   **Plantillas:**
        *   Las plantillas de formularios preconstruidas se encuentran en el directorio `components/templates`.

    ## Próximos Pasos

    *   **Validación de Formularios:** Implementar reglas de validación específicas para diferentes tipos de componentes.
    *   **Lógica Condicional:** Explorar escenarios de lógica condicional más complejos.
    *   **Acciones Personalizadas:** Implementar y utilizar acciones personalizadas en los formularios.
    *   **Optimización del Rendimiento:** Analizar el rendimiento del constructor de formularios e identificar áreas para optimización.
    *   **Pruebas:** Implementar pruebas unitarias y de integración para el proyecto.
    *   **Estilo de Código:** Revisar el estilo del código y asegurar la consistencia.
