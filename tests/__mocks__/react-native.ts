export const Platform = {
  OS: "web" as const,
  select<T>(spec: { default: T } & Partial<Record<string, T>>) {
    return spec.web ?? spec[Platform.OS] ?? spec.default;
  }
};

export const StyleSheet = {
  create<T extends Record<string, unknown>>(styles: T): T {
    return styles;
  }
};

export default {
  Platform,
  StyleSheet
};
