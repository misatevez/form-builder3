import { FormComponent } from '../types/form';

export function performCalculations(components: FormComponent[], data: { [key: string]: any }) {
  const updatedData = { ...data };

  components.forEach((component) => {
    if (component.type === 'number' && component.calculation) {
      const result = evaluateExpression(component.calculation, updatedData);
      updatedData[component.id] = result;
    }
  });

  return updatedData;
}

function evaluateExpression(expression: string, data: { [key: string]: any }): number {
  // Replace field references with their values
  const evaluatedExpression = expression.replace(/\{([^}]+)\}/g, (match, field) => {
    return data[field] || 0;
  });

  // Use a safe evaluation method (you might want to use a proper expression parser library for production)
  return Function(`'use strict'; return (${evaluatedExpression})`)();
}
