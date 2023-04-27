export type Palette = {
  id?: string,
  input?: string,
  name?: string;
  light: Color[],
  dark: Color[],
}

export type ColorType = "LIGHT" | "DARK";

export type Color = {
  name: string;
  foreground: string;
  background: string;
  description: string;
  usage: string[];
  type?: ColorType;
}
