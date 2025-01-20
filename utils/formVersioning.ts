import { FormTemplate } from '../types/form';

export interface VersionedFormTemplate extends FormTemplate {
  version: number;
}

export function createNewVersion(template: FormTemplate): VersionedFormTemplate {
  const versionedTemplates: VersionedFormTemplate[] = JSON.parse(localStorage.getItem(`form_${template.id}_versions`) || '[]');
  
  const newVersion: VersionedFormTemplate = {
    ...template,
    version: versionedTemplates.length + 1,
  };
  
  versionedTemplates.push(newVersion);
  localStorage.setItem(`form_${template.id}_versions`, JSON.stringify(versionedTemplates));
  
  return newVersion;
}

export function getFormVersions(templateId: string): VersionedFormTemplate[] {
  return JSON.parse(localStorage.getItem(`form_${templateId}_versions`) || '[]');
}

export function getFormVersion(templateId: string, version: number): VersionedFormTemplate | null {
  const versions = getFormVersions(templateId);
  return versions.find(v => v.version === version) || null;
}
