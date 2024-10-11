import { editor } from 'monaco-editor'

export const defaultLanguage = 'javascript'

export const initialCode = `const a = '1';\n
console.log(a);`

export const defaultEditorOptions: editor.IStandaloneEditorConstructionOptions = { minimap: { enabled: false } }
