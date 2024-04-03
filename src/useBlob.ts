import * as React from "react"
import { type Blob, blob } from "."

interface UseBlob {
  path: string
  seedValue: number
}

export const useBlob = (
  options: Blob = {}
): { path: string; seedValue: number } => {
  const [values, setValues] = React.useState<UseBlob>({
    path: "",
    seedValue: options.seed,
  })

  React.useEffect(() => {
    const { path, seedValue } = blob(options)
    setValues({ path, seedValue })
  }, [])

  return values
}
