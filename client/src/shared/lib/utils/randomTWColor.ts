interface Options {
  range?: [number, number]
}

const random = (min: number = 1, max: number = 9) => {
  return Math.floor(Math.random() * max) + min
}

export const randomTWColor = (options?: Options): string => {
  const TWColors = ['gray', 'red', 'yellow', 'green', 'blue', 'indigo', 'purple', 'pink']
  const TWRange = options?.range ?? [1, 9]

  const randomColor = TWColors[random(0, TWColors.length - 1)]
  const randomNumber = random(...TWRange) * 100

  return `${randomColor}-${randomNumber}`
}
