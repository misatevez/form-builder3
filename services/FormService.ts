import { v4 as uuidv4 } from 'uuid';
import { FormTemplate, FormComponent, FormData, FormSection } from '../types/form';

export class FormService {
  private template: FormTemplate;
  private data: FormData;

  constructor() {
    this.template = {
      id: uuidv4(),
      name: 'New Form',
      components: [],
      sections: [], // Added sections array
      theme: {}
    };
    this.data = {};
  }

  getTemplate(): FormTemplate {
    return this.template;
  }

  getData(): FormData {
    return this.data;
  }

  updateTemplate(updates: Partial<FormTemplate>): void {
    this.template = { ...this.template, ...updates };
  }

  updateData(updates: Partial<FormData>): void {
    this.data = { ...this.data, ...updates };
  }

  addComponent(component: FormComponent): void {
    this.template.components.push(component);
  }

  removeComponent(componentId: string): void {
    this.template.components = this.template.components.filter(c => c.id !== componentId);
  }

  updateComponent(componentId: string, updates: Partial<FormComponent>): void {
    this.template.components = this.template.components.map(c =>
      c.id === componentId ? { ...c, ...updates } : c
    );
  }

  moveComponent(fromIndex: number, toIndex: number): void {
    const [movedComponent] = this.template.components.splice(fromIndex, 1);
    this.template.components.splice(toIndex, 0, movedComponent);
  }

  async loadForm(): Promise<FormTemplate> {
    // Implement actual loading logic here
    return this.template;
  }

  async saveForm(template: FormTemplate, data: FormData): Promise<void> {
    // Implement actual saving logic here
    console.log('Saving form:', template, data);
  }

  exportToPDF(template: FormTemplate, data: FormData): void {
    console.log('Exporting to PDF:', template, data);
  }

  exportToExcel(template: FormTemplate, data: FormData): void {
    console.log('Exporting to Excel:', template, data);
  }

  createNewVersion(template: FormTemplate): FormTemplate {
    return {
      ...template,
      id: uuidv4(),
      name: `${template.name} (New Version)`,
    };
  }

  cloneForm(template: FormTemplate): FormTemplate {
    return {
      ...template,
      id: uuidv4(),
      name: `${template.name} (Clone)`,
    };
  }

  addSection(section: FormSection): void {
    this.template.sections.push(section);
  }

  removeSection(sectionId: string): void {
    this.template.sections = this.template.sections.filter(s => s.id !== sectionId);
  }

  updateSection(sectionId: string, updates: Partial<FormSection>): void {
    this.template.sections = this.template.sections.map(s =>
      s.id === sectionId ? { ...s, ...updates } : s
    );
  }

  moveSection(fromIndex: number, toIndex: number): void {
    const [movedSection] = this.template.sections.splice(fromIndex, 1);
    this.template.sections.splice(toIndex, 0, movedSection);
  }

  moveComponentBetweenSections(fromSectionId: string, toSectionId: string, fromIndex: number, toIndex: number): void {
    const fromSectionIndex = this.template.sections.findIndex(s => s.id === fromSectionId);
    const toSectionIndex = this.template.sections.findIndex(s => s.id === toSectionId);

    if (fromSectionIndex !== -1 && toSectionIndex !== -1) {
      const [movedComponent] = this.template.sections[fromSectionIndex].components.splice(fromIndex, 1);
      this.template.sections[toSectionIndex].components.splice(toIndex, 0, movedComponent);
    }
  }
}

export const formService = new FormService();
