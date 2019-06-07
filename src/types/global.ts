export interface IGlobals {
  pageInstance: any;
  eventListeners: { [key: string]: EventListener };
}

export interface IDifficulty {
  id: number;
  title: string;
  correction: number;
  icon: string;
}
