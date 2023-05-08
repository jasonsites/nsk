
declare module 'app-container' {
  class AppContainer {
    constructor(options?: unknown);

    glob(pattern: string, options?: unknown): void

    load(components: string[] | unknown): Promise<any>;
  }

  export = AppContainer;
}
