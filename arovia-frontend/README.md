# Arovia Frontend - AI Health Desk Agent

A modern React + TypeScript frontend for Arovia, an AI-powered health triage assistant designed for India's healthcare system.

## 🚀 Features

- **React 18 + TypeScript** - Modern web development stack
- **Material-UI (MUI v5+)** - Beautiful, responsive UI components
- **Zustand** - Lightweight state management
- **react-i18next** - Multilingual support (6 Indian languages)
- **React Router v6** - Client-side routing
- **React Query (TanStack)** - Server state management
- **React Hook Form** - Form handling with validation
- **Vite PWA Plugin** - Progressive Web App capabilities
- **Web Speech API** - Text-to-speech functionality
- **Responsive Design** - Mobile-first approach

## 🌐 Supported Languages

- English (en)
- Hindi (hi) - हिंदी
- Telugu (te) - తెలుగు
- Tamil (ta) - தமிழ்
- Kannada (kn) - ಕನ್ನಡ
- Malayalam (ml) - മലയാളം

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser with JavaScript enabled
- Backend API server running (see backend repository)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd arovia-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_ENABLE_VOICE_INPUT=true
   VITE_ENABLE_GEOLOCATION=true
   VITE_ENABLE_TTS=true
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview

# Type check
npm run type-check
```

## 📱 Progressive Web App (PWA)

The application is configured as a PWA with:
- Offline support
- Installable on mobile devices
- Service worker for caching
- Responsive design

To install on mobile:
1. Open the app in a mobile browser
2. Look for "Add to Home Screen" option
3. Follow browser prompts

## 🔊 Text-to-Speech Features

The app includes TTS capabilities:
- Read aloud button on text content
- Language-aware speech synthesis
- Play/pause/stop controls
- Supports all 6 languages with proper regional accents

## 🎤 Voice Input

Voice recording features:
- Real-time audio recording
- Configurable duration (5-30 seconds)
- Automatic transcription via backend
- Language detection
- Error handling for unsupported browsers

## 📍 Location Services

Geolocation integration:
- Browser-based location detection
- Manual location entry fallback
- Nearby facility recommendations
- OpenStreetMap integration

## 🏥 Medical Triage Features

### Symptom Analysis
- Text-based symptom input
- AI-powered medical reasoning
- Urgency scoring (1-10)
- Red flag detection
- Specialty recommendations

### Emergency Detection
Automatic detection of emergency keywords:
- Cardiac symptoms
- Neurological symptoms  
- Respiratory distress
- Trauma indicators
- Mental health crises

### Facility Matching
- Real-time facility search
- Distance-based sorting
- Service filtering
- Map integration
- Contact information

### Referral Notes
- Medical-grade documentation
- Structured format for healthcare providers
- Download/print capabilities
- Timestamp and metadata

## 🔧 API Integration

The frontend communicates with the backend via REST API:

### Endpoints
- `POST /api/triage/analyze` - Text-based symptom analysis
- `POST /api/voice/process` - Voice input processing
- `POST /api/triage/voice-to-triage` - Complete voice pipeline
- `POST /api/facilities/find` - Facility search
- `POST /api/referral/generate` - Generate referral note
- `GET /api/voice/languages` - Get supported languages
- `GET /api/health` - Health check

### Request/Response Format
All API responses follow this structure:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## 🎨 Theme and Styling

### Material-UI Theme
- Light/Dark mode support
- Custom color palette
- Responsive breakpoints
- Custom component styling

### Colors
- Primary: Blue (#1976d2)
- Secondary: Pink (#dc004e)
- Success: Green
- Warning: Orange
- Error: Red

### Typography
- Font: Inter, Roboto, system fonts
- 6 heading levels (h1-h6)
- Responsive font sizes
- Proper contrast ratios

## 🧭 Navigation Structure

```
/ (Home)
├── /triage (Symptom Analysis)
├── /voice (Voice Input)
├── /results (Assessment Results)
├── /facilities (Find Facilities)
└── /settings (App Settings)
```

## 📦 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ThemeProvider.tsx
│   ├── Navigation.tsx
│   ├── LanguageSelector.tsx
│   ├── LocationPicker.tsx
│   ├── VoiceRecorder.tsx
│   ├── TriageResult.tsx
│   ├── FacilityCard.tsx
│   ├── ReferralNote.tsx
│   └── ErrorBoundary.tsx
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── TriagePage.tsx
│   ├── VoicePage.tsx
│   ├── ResultsPage.tsx
│   ├── FacilitiesPage.tsx
│   └── SettingsPage.tsx
├── services/            # API and external services
│   └── api.ts
├── store/              # State management
│   └── index.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── i18n/               # Internationalization
│   ├── index.ts
│   └── locales/
│       ├── en.json
│       ├── hi.json
│       ├── te.json
│       ├── ta.json
│       ├── kn.json
│       └── ml.json
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── App.tsx             # Main app component
└── main.tsx           # Application entry point
```

## 🧪 Development

### Code Style
- TypeScript strict mode
- ESLint for code linting
- Prettier for code formatting (recommended)
- Conventional component patterns

### State Management
- Zustand for global state
- React Query for server state
- Local state with useState/useReducer
- Persistent state with localStorage

### Error Handling
- React Error Boundaries
- API error interceptors
- User-friendly error messages
- Logging and monitoring ready

## 🚀 Deployment

### Build
```bash
npm run build
```

### Static Hosting (Netlify, Vercel, etc.)
1. Build the application
2. Upload `dist` folder contents
3. Configure redirects for SPA routing

### Docker
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔒 Security Considerations

- Input sanitization
- API rate limiting (backend)
- HTTPS in production
- Content Security Policy
- No sensitive data in localStorage
- Secure communication with backend

## 🌐 Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

### Required Features
- ES2020 support
- WebRTC (for voice input)
- Geolocation API
- Speech Synthesis API
- Service Workers

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add appropriate tests
- Update documentation
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Medical Guidelines**: Based on established triage protocols
- **Language Support**: Community translations
- **Icons**: Material Design Icons
- **Maps**: OpenStreetMap contributors
- **AI Models**: Groq, OpenAI Whisper, Meta Llama

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation

---

**Arovia** - Revolutionizing healthcare access in India through intelligent AI triage. 🏥🇮🇳
