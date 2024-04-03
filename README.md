# React Blob Shape

## Description

Create SVG blob shapes using React.

## Installation

```bash
npm install react-blob-shape
```

## Usage

```jsx
import { useBlob } from 'react-blob-shape';

function App() {
	const { path } = useBlob({ size: 560 })

	return (
		<svg width="560" height="560" viewBox="0 0 560 560">
			<path d={path} />
		</svg>
	)
}
```

## License

MIT
