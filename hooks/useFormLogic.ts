import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormTemplate, FormData, FormComponent, FormSection } from '../types/form';
import { formService } from '../services/FormService';

const INITIAL_TEMPLATE: FormTemplate = {
  id: '',
  name: 'New Form',
  sections: []
};

export function useFormLogic(initialTemplate: FormTemplate) {
  const [template, setTemplate] = useState<FormTemplate>(() => {
    console.log('useFormLogic - Initializing template', initialTemplate);
    if (!initialTemplate || !initialTemplate.sections) {
      console.error('useFormLogic - Invalid initial template, using default');
      return {
        ...INITIAL_TEMPLATE,
        sections: INITIAL_TEMPLATE.sections || []
      };
    }
    return {
      ...initialTemplate,
      sections: initialTemplate.sections || []
    };
  });
  const [data, setData] = useState<FormData>({});

  useEffect(() => {
    console.log('useFormLogic - Template updated', template);
  }, [template]);

  const updateTemplate = useCallback((updates: Partial<FormTemplate>) => {
    console.log('updateTemplate called', updates);
    setTemplate(prevTemplate => {
      const newTemplate = { ...prevTemplate, ...updates };
      console.log('New template state', newTemplate);
      return newTemplate;
    });
    formService.updateTemplate(updates);
  }, []);

  const updateData = useCallback((updates: Partial<FormData>) => {
    console.log('updateData called', updates);
    setData(prevData => {
      const newData = { ...prevData, ...updates };
      console.log('New form data', newData);
      return newData;
    });
    formService.updateData(updates);
  }, []);

  const addComponent = useCallback((component: FormComponent, sectionId: string) => {
    console.log('useFormLogic - addComponent called', { component, sectionId });
    
    setTemplate(prevTemplate => {
      const updatedSections = prevTemplate.sections.map(section => {
        if (section.id === sectionId) {
          console.log('Adding component to section', { sectionId, componentId: component.id });
          return { 
            ...section, 
            components: [...(section.components || []), { ...component, id: uuidv4() }] 
          };
        }
        return section;
      });

      const newTemplate = { ...prevTemplate, sections: updatedSections };
      console.log('useFormLogic - New template state after adding component', newTemplate);
      return newTemplate;
    });
  }, []);

  const removeComponent = useCallback((sectionId: string, componentId: string) => {
    setTemplate(prevTemplate => {
      const updatedSections = prevTemplate.sections.map(section =>
        section.id === sectionId
          ? { ...section, components: (section.components || []).filter(c => c.id !== componentId) }
          : section
      );
      return { ...prevTemplate, sections: updatedSections };
    });
  }, []);

  const updateComponent = useCallback((sectionId: string, componentId: string, updates: Partial<FormComponent>) => {
    setTemplate(prevTemplate => {
      const updatedSections = prevTemplate.sections.map(section =>
        section.id === sectionId
          ? {
            ...section,
            components: section.components.map(c =>
              c.id === componentId
                ? {
                    ...c,
                    ...updates,
                    validation: {
                      ...c.validation,
                      ...(updates.validation || {}),
                    },
                  }
                : c
            ),
          }
        : section
      );
      return { ...prevTemplate, sections: updatedSections };
    });
  }, []);

  const addSection = useCallback((section: FormSection) => {
    console.log('addSection called', section);
    setTemplate(prevTemplate => {
      const newTemplate = {
        ...prevTemplate,
        sections: [...(prevTemplate.sections || []), { ...section, id: uuidv4(), components: [] }],
      };
      console.log('New template after adding section', newTemplate);
      return newTemplate;
    });
  }, []);

  const removeSection = useCallback((sectionId: string) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      sections: (prevTemplate.sections || []).filter(s => s.id !== sectionId),
    }));
  }, []);

  const updateSection = useCallback((sectionId: string, updates: Partial<FormSection>) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      sections: (prevTemplate.sections || []).map(s =>
        s.id === sectionId ? { ...s, ...updates } : s
      ),
    }));
  }, []);

  const moveComponentBetweenSections = useCallback((sourceSectionId: string, destinationSectionId: string, sourceIndex: number, destinationIndex: number) => {
    console.log('useFormLogic - moveComponentBetweenSections called', {
      sourceSectionId,
      destinationSectionId,
      sourceIndex,
      destinationIndex
    });

    setTemplate(prevTemplate => {
      const updatedSections = [...prevTemplate.sections];
      const sourceSection = updatedSections.find(s => s.id === sourceSectionId);
      const destinationSection = updatedSections.find(s => s.id === destinationSectionId);

      if (sourceSection && destinationSection) {
        const [movedComponent] = sourceSection.components.splice(sourceIndex, 1);
        destinationSection.components.splice(destinationIndex, 0, movedComponent);
        
        console.log('useFormLogic - Component moved', { 
          movedComponent,
          newSourceLength: sourceSection.components.length,
          newDestLength: destinationSection.components.length
        });
      } else {
        console.error('useFormLogic - Source or destination section not found', { sourceSectionId, destinationSectionId });
      }

      return { ...prevTemplate, sections: updatedSections };
    });
  }, []);

  return {
    template,
    data,
    updateTemplate,
    updateData,
    addComponent,
    removeComponent,
    updateComponent,
    addSection,
    removeSection,
    updateSection,
    moveComponentBetweenSections,
  };
}
