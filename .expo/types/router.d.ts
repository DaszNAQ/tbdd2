/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/Account` | `/(tabs)/cartscreen` | `/Account` | `/MainNavigator` | `/ProductDetail` | `/_sitemap` | `/cartscreen` | `/login` | `/navigationTypes`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
