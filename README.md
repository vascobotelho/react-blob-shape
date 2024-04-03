# React Blob Shape

[![npm version](https://img.shields.io/npm/v/react-blob-shape.svg)](https://www.npmjs.com/package/react-blob-shape)
[![GitHub license](https://img.shields.io/github/license/vascobotelho/react-blob-shape.svg)](https://github.com/vascobotelho/react-blob-shape/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/vascobotelho/react-blob-shape.svg?style=social&label=Star)](https://github.com/vascobotelho/react-blob-shape)

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
