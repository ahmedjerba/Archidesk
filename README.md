# Archidesk

Archidesk is a desktop application built using [Neutralinojs](https://neutralino.js.org/) that provides a minimal and lightweight environment for quick desktop app development. This project serves as a starting point for building fast, cross-platform desktop apps with your favorite front-end frameworks or pure JavaScript, HTML, and CSS.

## Features

- 🌐 Cross-platform support (Windows, Linux, macOS)
- 🚀 Lightweight and fast startup
- 🔌 Easily extensible—use any front-end framework (React, Vue, Svelte, etc.) or vanilla JS
- 🔒 Simple and secure architecture
- 🛠️ Minimal dependencies

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for installing Neutralinojs tools)
- [Neutralinojs CLI](https://neutralino.js.org/docs/getting-started/installation/) (install with `npm install -g @neutralinojs/neu`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmedjerba/Archidesk.git
   cd Archidesk
   ```

2. **Install Neutralinojs dependencies:**
   ```bash
   neu update
   ```

3. **Run the application:**
   ```bash
   neu run
   ```

## Project Structure

```
.
├── app/               # Front-end source files (HTML, JS, CSS)
├── resources/         # App icons, tray icons, images
├── .neutralino.config.json   # Neutralinojs configuration
├── package.json       # NPM dependencies (if any)
└── README.md
```

## Customization

You can use your favorite UI framework:
- See [Neutralinojs docs: Using Frontend Libraries](https://neutralino.js.org/docs/getting-started/using-frontend-libraries/)

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/my-feature`)
6. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

- Tray icon made by [Freepik](https://www.freepik.com) from [Flaticon](https://www.flaticon.com)
