export interface IGlobals {
  pageInstance: any;
  eventListeners: { [key: string]: EventListener };
  storagePrefix: string;
}

export interface IDifficulty {
  id: number;
  title: string;
  correction: number;
  icon: string;
}
