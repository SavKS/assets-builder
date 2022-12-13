export default (formName: string, defaults?: Record<string, any>) => window.__preload.formData?.[ formName ] ?? defaults;
