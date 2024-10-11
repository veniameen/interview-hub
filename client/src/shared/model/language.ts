export type Language = Record<
  string,
  {
    fileExtension: string
    command?: string
    isExecutable: boolean
  }
>
