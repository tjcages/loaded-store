import { random } from '../../../hooks/random'

export function cutout(shape: HTMLElement, max: number | undefined = 8) {
  const numPoints = random(5, max)
  let points = ''
  const ceil = Math.floor(numPoints / 2) // top half points
  const split = 100 / ceil // split the top half into equal parts
  for (let i = 0; i < numPoints; i++) {
    let x, y

    if (i === 0) {
      // top left point
      x = random(0, 10)
      y = random(0, 10)
    } else if (i === ceil - 1) {
      // top right point
      x = random(90, 100)
      y = random(0, 20)
    } else if (i === ceil) {
      // bottom right point
      x = random(80, 100)
      y = random(80, 100)
    } else if (i === numPoints - 1) {
      // bottom left point
      x = random(0, 10)
      y = random(80, 100)
    } else if (i < ceil) {
      // top half
      x = random(split * i, split * (i + 1))
      y = random(0, 10)
    } else {
      // bottom half
      x = random(100 - split * (i - ceil), 100 - split * (i + 1 - ceil))
      y = random(90, 100)
    }
    x = x < 0 ? 0 : x
    x = x > 100 ? 100 : x
    y = y < 0 ? 0 : y
    y = y > 100 ? 100 : y

    points += `${x}% ${y}%, `
  }
  points = points.slice(0, -2) // remove the last comma and space
  shape.style.clipPath = `polygon(${points})`
}

export function cutoutGrid(
  shape: HTMLElement,
  topLeft: boolean | undefined,
  topRight: boolean | undefined,
  bottomLeft: boolean | undefined,
  bottomRight: boolean | undefined
) {
  let minX = 0
  let minY = 0
  let maxX = 100
  let maxY = 100
  let overlap = 5
  let spread = 1

  if (topLeft) {
    maxX = maxX / 2 + overlap
    maxY = maxY / 2 + overlap
  } else if (topRight) {
    minX = maxX / 2 - overlap
    maxY = maxY / 2 + overlap
  } else if (bottomRight) {
    minX = maxX / 2 - overlap
    minY = maxY / 2 - overlap
  } else if (bottomLeft) {
    minY = maxY / 2 - overlap
    maxX = maxX / 2 + overlap
  }

  const numPoints = random(8, 12)
  let points = ''
  const ceil = Math.floor(numPoints / 2) // top half points
  const split = maxX / ceil // split the top half into equal parts
  for (let i = 0; i < numPoints; i++) {
    let x, y

    if (i === 0) {
      // top left point
      x = random(minX, spread)
      y = random(minY, spread)
    } else if (i === ceil - 1) {
      // top right point
      x = random(maxX - spread, maxX)
      y = random(minY, spread * 2)
    } else if (i === ceil) {
      // bottom right point
      x = random(maxX - spread * 2, maxX)
      y = random(maxY - spread * 2, maxY)
    } else if (i === numPoints - 1) {
      // bottom left point
      x = random(minX, spread)
      y = random(maxY - spread * 2, maxY)
    } else if (i < ceil) {
      // top half
      x = random(split * i, split * (i + 1))
      y = random(minY, spread)
    } else {
      // bottom half
      x = random(maxX - split * (i - ceil), maxX - split * (i + 1 - ceil))
      y = random(maxY - spread, maxY)
    }
    x = x < minX ? minX : x
    x = x > maxX ? maxX : x
    y = y < minY ? minY : y
    y = y > maxY ? maxY : y

    points += `${x}% ${y}%, `
  }
  points = points.slice(0, -2) // remove the last comma and space
  shape.style.clipPath = `polygon(${points})`
}
