import { type Blob } from "."

const toRad = (deg: number) => deg * (Math.PI / 180)

const shuffle = (array: number[]) => array.sort(() => Math.random() - 0.5)

const divide = (count: number) => {
  const deg = 360 / count

  return Array(count)
    .fill("a")
    .map((_, i) => i * deg)
}

const randomDoubleGenerator = (s: number) => {
  const mask = 0xffffffff

  let m_w = (123456789 + s) & mask
  let m_z = (987654321 - s) & mask

  return () => {
    m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask
    m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask

    let result = ((m_z << 16) + (m_w & 65535)) >>> 0
    result /= 4294967296
    return result
  }
}

const magicPoint = (value: number, min: number, max: number) => {
  let radius = min + value * (max - min)

  if (radius > max) radius = radius - min
  else if (radius < min) radius = radius + min

  return radius
}

const point = (origin: number, radius: number, degree: number) => {
  const x = origin + radius * Math.cos(toRad(degree))
  const y = origin + radius * Math.sin(toRad(degree))

  return [Math.round(x), Math.round(y)]
}

const createPoints = (
  size: number,
  minGrowth: number,
  edgesCount: number,
  seed: number | null
) => {
  let outerRad = size / 2
  let innerRad = minGrowth * (outerRad / 10)
  let center = size / 2

  let slices = divide(edgesCount)
  let maxRandomValue = shuffle([99, 999, 9999, 99999, 999999])[0]
  let id = Math.floor(Math.random() * maxRandomValue)
  let seedValue = seed || id
  let randVal = randomDoubleGenerator(seedValue)
  let destPoints: number[][] = []

  slices.forEach((degree) => {
    let O = magicPoint(randVal(), innerRad, outerRad)
    let end = point(center, O, degree)
    destPoints.push(end)
  })

  return { destPoints, seedValue }
}

const createSvgPath = (points: number[][]) => {
  let svgPath = ""
  let mid = [
    (points[0][0] + points[1][0]) / 2,
    (points[0][1] + points[1][1]) / 2,
  ]

  svgPath += "M" + mid[0] + "," + mid[1]

  for (let i = 0; i < points.length; i++) {
    const p1 = points[(i + 1) % points.length]
    const p2 = points[(i + 2) % points.length]
    mid = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]
    svgPath += "Q" + p1[0] + "," + p1[1] + "," + mid[0] + "," + mid[1]
  }

  svgPath += "Z"
  return svgPath
}

export const blob = ({
  size = 400,
  growth = 6,
  edges = 6,
  seed = null,
}: Blob = {}) => {
  const { destPoints, seedValue } = createPoints(size, growth, edges, seed)
  const path = createSvgPath(destPoints)
  return { path, seedValue }
}
