function drawDot(dotX: number, dotY: number, fillStyle: string, strokeStyle: string) {
  const ctx: CanvasRenderingContext2D = this.staticCanvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(
    dotX + this.cellSize / 2,
    dotY + this.cellSize / 2,
    this.cellSize / 5,
    0,
    Math.PI * 2,
    false,
  );

  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
}

function drawLineToAngle(ctx: CanvasRenderingContext2D, x1: number, y1: number, length: number, angle: number) {
  const a = angle * Math.PI / 180;

  const x2 = x1 + length * Math.cos(a);
  const y2 = y1 + length * Math.sin(a);

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}

function tryWandMove(bounce?: boolean) {
  const { position, angle } = this.wand;

  if ((angle >= 355 && angle <= 359) || (angle >= 0 && angle <= 5)) { // East
    if (this.map[position[0] + 1][position[1] + 1 + 2] !== 0) {
      this.wand.position[1] += 2;
      this.wand.angle += angle >= 355 && angle <= 359 ? -180 : 180;

      if (bounce) {
        this.wand.direction *= -1;
      }
    }
  } else if (angle >= 85 && angle <= 95) { // South
    if (this.map[position[0] + 1 + 2][position[1] + 1] !== 0) {
      this.wand.position[0] += 2;
      this.wand.angle += 180;

      if (bounce) {
        this.wand.direction *= -1;
      }
    }
  } else if (angle >= 175 && angle <= 185) { // West
    if (this.map[position[0] + 1][position[1] + 1 - 2] !== 0) {
      this.wand.position[1] -= 2;
      this.wand.angle -= angle >= 175 && angle < 180 ? 180 : -180;

      if (bounce) {
        this.wand.direction *= -1;
      }
    }
  } else if (angle >= 265 && angle <= 275) { // North
    if (this.map[position[0] + 1 - 2][position[1] + 1] !== 0) {
      this.wand.position[0] -= 2;
      this.wand.angle -= 180;

      if (bounce) {
        this.wand.direction *= -1;
      }
    }
  }
}

export { drawDot, drawLineToAngle, tryWandMove };
