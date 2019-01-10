/**
 * Function looks for all mandatory objects in level description object;
 * returns false if there's no one or more mandatory object
 */
function validateLevel(): boolean {
  const { map, goal } = this.level;

  if (!map || !goal) {
    alert('The level description is invalid: there is no "map" and/or "goal" found.');

    return false;
  }

  return true;
}

export { validateLevel };
