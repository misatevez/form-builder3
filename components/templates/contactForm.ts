import { FormTemplate } from '../../types/form';

export const contactForm: FormTemplate = {
  id: 'contact-form',
  name: 'Formulario de Contacto',
  sections: [
    {
      id: 'contact-info',
      title: 'Información de Contacto',
      components: [
        { id: 'name', type: 'text', label: 'Nombre Completo' },
        { id: 'email', type: 'email', label: 'Correo Electrónico' },
        { id: 'phone', type: 'text', label: 'Teléfono' },
        { id: 'message', type: 'textarea', label: 'Mensaje' },
      ],
    },
  ],
};
