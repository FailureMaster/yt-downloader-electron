# YouTube Downloader

A simple desktop application built with Electron for downloading YouTube videos. Features a clean, modern interface and supports multiple quality options.

<img width="767" height="580" alt="image" src="https://github.com/user-attachments/assets/fe7f1da1-aabf-4cf7-86c0-94e3995437d4" />


## Features

- 🎥 Download YouTube videos in multiple qualities (High, Medium, Low)
- 💻 Clean, modern desktop interface
- 📁 Choose download location for each video
- 🚀 Fast and reliable downloads
- 🔒 No data collection - runs entirely locally

## Download (Pre-built)

**Don't want to build from source?** Download the latest release:

1. Go to [Releases](../../releases)
2. Download `YouTube-Downloader-v1.0.zip`
3. Extract the ZIP file
4. Run `YouTube Downloader.exe`

**Note:** Windows may show a security warning since the app isn't code-signed. Click "More info" → "Run anyway" to proceed safely.

## Build from Source

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/youtube-downloader.git
   cd youtube-downloader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run in development mode**
   ```bash
   npm start
   ```

### Building the Application

**For Windows:**
```bash
npm run build-win
```

**For macOS:**
```bash
npm run build-mac
```

**For Linux:**
```bash
npm run build-linux
```

The built application will be in the `dist/` folder.

### Using the Built App

After building, you'll find your app in:
- **Windows**: `dist/win-unpacked/YouTube Downloader.exe`
- **macOS**: `dist/mac/YouTube Downloader.app`
- **Linux**: `dist/linux-unpacked/youtube-downloader`

**To distribute:** Zip the entire unpacked folder (not just the .exe file) as it contains all necessary dependencies.

## Project Structure

```
youtube-downloader/
├── main.js              # Electron main process
├── preload.js          # Preload script for security
├── app.html            # Main application interface
├── package.json        # Project configuration
└── dist/               # Built applications (after build)
    └── win-unpacked/   # Windows build output
```

## How It Works

1. **Frontend**: Clean HTML/CSS/JavaScript interface for user interaction
2. **Backend**: Electron main process handles video downloading using ytdl-core
3. **Security**: Context isolation enabled with preload scripts
4. **Downloads**: Uses `@distube/ytdl-core` library for YouTube video processing

## Scripts

- `npm start` - Run the app in development mode
- `npm run build-win` - Build for Windows
- `npm run build-mac` - Build for macOS  
- `npm run build-linux` - Build for Linux

## Dependencies

### Main Dependencies
- `@distube/ytdl-core` - YouTube video downloading
- `express` - Local server functionality

### Dev Dependencies
- `electron` - Desktop app framework
- `electron-builder` - Application packaging

## Known Issues

- **Windows Security Warning**: Since the app isn't code-signed, Windows Defender may show a warning. This is normal for unsigned applications.
- **Build Errors**: Code signing errors during build can be ignored - they don't affect functionality.

## Troubleshooting

### "Module not found" errors
If you encounter missing module errors when running the built app, the build configuration automatically includes all required dependencies. Try rebuilding:

```bash
rm -rf dist
npm run build-win
```

### Windows won't run the app
1. Right-click the .exe file
2. Select "Properties"
3. Check "Unblock" if the option exists
4. Click "OK" and try again

### YouTube videos won't download
YouTube frequently changes their systems. If downloads fail:
1. Update the dependencies: `npm update`
2. Rebuild the application
3. Try different video URLs to test

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Legal Notice

This tool is for educational purposes only. Please respect YouTube's Terms of Service and only download content you have permission to download. The developers are not responsible for any misuse of this software.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues:
1. Check the [Issues](../../issues) page
2. Create a new issue with:
   - Your operating system
   - Node.js version
   - Error messages (if any)
   - Steps to reproduce the problem

---

**Made with ❤️ using Electron and Node.js**
