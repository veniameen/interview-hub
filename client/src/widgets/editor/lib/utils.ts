import { editor, IRange } from 'monaco-editor'
import { CursorDetails } from '../model'

export const getCursorPositionOptions = (cursor: CursorDetails): editor.IModelDecorationOptions => {
  return {
    className: `border-l-${cursor.color}`,
    after: {
      content: 'asd',
    },
    afterContentClassName: 'cursor-selection-after',
  }
}

export const getCursorSelectionOptions = (cursor: CursorDetails): editor.IModelDecorationOptions => {
  return {
    className: `bg-${cursor.color}`,
  }
}

export const getRange = (
  startLineNumber: number,
  startColumn: number,
  endLineNumber: number,
  endColumn: number,
): IRange => {
  return {
    startLineNumber,
    startColumn,
    endLineNumber,
    endColumn,
  }
}
