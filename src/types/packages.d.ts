
declare module 'app-container' {
  class AppContainer {
    constructor(options?: unknown);

    glob(pattern: string, options?: unknown): void

    load(componenets: string[] | unknown): Promise;
  }

  export = AppContainer;
}
