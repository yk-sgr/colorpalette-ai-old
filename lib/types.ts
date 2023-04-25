export type Palette = {
  light: Color[],
  dark: Color[],
}

export type Color = {
  name: string;
  foreground: string;
  background: string;
  description: string;
  usage: string[];
}
