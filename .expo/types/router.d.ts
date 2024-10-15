/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/cart` | `/(tabs)/detail` | `/(tabs)/fav` | `/(tabs)/items/productItem` | `/(tabs)/login` | `/(tabs)/navigationTypes` | `/(tabs)/register` | `/MainNavigator` | `/_sitemap` | `/cart` | `/detail` | `/fav` | `/items/productItem` | `/login` | `/navigationTypes` | `/register`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
