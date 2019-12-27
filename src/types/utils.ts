export interface ILineSegment {
  start: IPoint;
  end: IPoint;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface DrawOptions {
  fillColor?: string;
  edgingWidth?: number;
  edgingColor?: string;
}

export type DrawOptionsExtended = DrawOptions & {
  startAngle?: number;
  endAngle?: number;
}
