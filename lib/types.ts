export type GeneratePalette = {
  colors: GenerateColor[];
}

export type GenerateColor = {
  name: string;
  hex: string;
  description: string;
  usages: ColorUsage[];
}

export type Palette = {
  id: string,
  input: string,
  description: string;
  name: string;
  colors: Color[],
}

export type Color = {
  id: string;
  name: string;
  hex: string;
  description: string;
  usages: ColorUsage[];
}

export type ColorUsage = {
  usage: string;
}
