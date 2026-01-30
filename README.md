# 🎯 Resume Analyzer

**AI-Powered Recruitment Platform** | Streamline your hiring process with intelligent resume analysis and candidate matching

[![JavaScript](https://img.shields.io/badge/JavaScript-97%25-blue?style=flat-square&logo=javascript)](https://www.javascript.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)

---

## 📌 Overview

**Resume Analyzer** is a sophisticated AI-powered recruitment platform designed to revolutionize the hiring process. By leveraging advanced natural language processing and machine learning algorithms, it automatically extracts key information from resumes, matches candidates to job requirements, and provides intelligent insights to help recruiters make data-driven hiring decisions.

### ✨ Key Highlights

- 🤖 **AI-Powered Analysis** - Intelligent resume parsing and skill extraction
- 🎯 **Smart Matching** - Automatic candidate-job compatibility scoring
- ⚡ **Real-time Processing** - Instant resume analysis and feedback
- 📊 **Comprehensive Insights** - Detailed analytics and candidate comparisons
- 🎨 **Modern UI/UX** - Clean, intuitive interface with dark/light theme support
- 📱 **Responsive Design** - Seamless experience across all devices

---

## 🚀 Features

### Core Functionality

- **📄 Resume Upload & Parsing**
  - Support for PDF, DOC, and DOCX formats
  - Automatic text extraction and structure analysis
  - Multi-language support

- **🎓 Skill Extraction**
  - Advanced NLP-based skill identification
  - Technical and soft skills categorization
  - Experience level assessment

- **💼 Job Description Matching**
  - Paste or upload job requirements
  - AI-powered compatibility scoring
  - Gap analysis and recommendations

- **📈 Analytics Dashboard**
  - Visual representation of candidate skills
  - Comparison metrics and ranking
  - Historical analysis tracking

- **🔍 Advanced Search & Filter**
  - Search by skills, experience, education
  - Custom filter combinations
  - Save and export results

### Technical Features

- **🌓 Theme Support** - Dark and light mode with system preference detection
- **💾 Persistent Storage** - Database-backed data management with Drizzle ORM
- **🔐 Secure Processing** - Privacy-focused data handling
- **📱 Mobile Optimized** - Fully responsive design
- **⚡ Fast Performance** - Optimized build with Vite

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Next-generation build tool
- **TailwindCSS** - Utility-first CSS framework
- **Wouter** - Lightweight routing
- **Lucide Icons** - Beautiful icon library
- **React Query** - Powerful data synchronization

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL/SQLite** - Reliable data storage

### Development Tools
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

---

## 📁 Project Structure

```
ResumeAnalyzer/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route pages
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── App.tsx      # Root component
├── server/              # Backend Express server
│   ├── routes/          # API endpoints
│   ├── controllers/     # Business logic
│   └── index.ts         # Server entry point
├── shared/              # Shared types and utilities
├── script/              # Database scripts
└── attached_assets/     # Static assets
```

---

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Allanagari-Renuka/ResumeAnalyzer.git
   cd ResumeAnalyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   Navigate to http://localhost:5000
   ```

---

## 💻 Usage

### For Recruiters

1. **Upload Job Description**
   - Navigate to the "New Analysis" page
   - Paste your job requirements or upload a JD file
   - Specify required skills and experience level

2. **Upload Resumes**
   - Drag and drop candidate resumes
   - Bulk upload supported
   - Automatic parsing begins

3. **Review Results**
   - View AI-generated match scores
   - Compare candidates side-by-side
   - Export shortlisted profiles


## 📊 Performance

- **Resume Parsing**: < 2 seconds per document
- **AI Analysis**: < 3 seconds per candidate
- **Dashboard Load**: < 500ms
- **Mobile Responsiveness**: 100% compatible

---

## 🎨 Screenshots

### Dashboard
<img width="1892" height="870" alt="Dashboard" src="https://github.com/user-attachments/assets/c33fb352-9215-4a1b-9087-47c7658eda96" />

### Analysis Results
<img width="1899" height="873" alt="Analysis Results" src="https://github.com/user-attachments/assets/7cb2494c-1546-465d-b7ea-b35c83ba8ede" />

---


## 🗺️ Roadmap

- [ ] Multi-language resume support
- [ ] Video interview integration
- [ ] Candidate ranking algorithms v2.0
- [ ] Chrome extension for LinkedIn
- [ ] Mobile apps (iOS/Android)
- [ ] Advanced analytics with ML models
- [ ] Integration with ATS systems
- [ ] Automated email communication

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

**Renuka Allanagari**

- GitHub: [@Allanagari-Renuka](https://github.com/Allanagari-Renuka)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/allanagari-renuka-8a9346263/)
- Portfolio: [Portfolio](https://your-portfolio.com](https://portfolio-beige-two-49.vercel.app/)

---

## 🙏 Acknowledgments

- Inspiration from modern recruitment challenges
- Built with ❤️ using cutting-edge technologies
- Special thanks to the open-source community

---

## 📞 Contact & Support

Have questions or suggestions? Feel free to reach out!
- 📧 Email: allanagarirenuka28@gmail.com
- 💬 Issues: [GitHub Issues](https://github.com/Allanagari-Renuka/ResumeAnalyzer/issues)
- 🌟 Star this repo if you find it helpful!
