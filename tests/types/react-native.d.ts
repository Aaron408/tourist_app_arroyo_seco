declare module "react-native" {
  export type PlatformOS = "ios" | "android" | "web" | "macos" | "windows";

  export const Platform: {
    OS: PlatformOS;
    select<T>(spec: Partial<Record<PlatformOS | "default", T>>): T extends undefined ? never : T;
  };

  export const StyleSheet: {
    create<T extends Record<string, unknown>>(styles: T): T;
  };

  const ReactNative: {
    Platform: typeof Platform;
    StyleSheet: typeof StyleSheet;
  };

  export default ReactNative;
}
