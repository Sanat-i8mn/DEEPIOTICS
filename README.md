# Deepiotics - AI Development Services Website

A modern, production-ready website for Deepiotics, an AI development company specializing in Custom Generative AI solutions, process automation, and AI Agents. Built with React, TypeScript, Vite, and Supabase.

## 🌟 Features

### Core Functionality
- **Multi-page Website**: Home, About, Services, Portfolio, Careers, and Contact pages
- **Interactive Chatbot Widget**: AI-powered customer support with Supabase integration
- **Admin Dashboard**: Manage job postings and review applications
- **Career Portal**: Job listings with application submission
- **Contact Forms**: Multiple contact forms with email notifications
- **Case Studies**: Portfolio showcase with success metrics
- **Newsletter Subscription**: Email list management

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Video Background**: Hero section with dynamic video background
- **Animations**: Smooth transitions and micro-interactions
- **Form Validation**: Client-side validation for all forms
- **Database Integration**: Supabase for data persistence
- **Edge Functions**: Serverless API endpoints for backend logic
- **Row Level Security**: Secure data access with RLS policies

## 📁 Project Structure

```
deepiotics-website/
├── public/                          # Static assets
│   ├── Deepiotics Logo.png         # Company logo
│   ├── image.png                   # Hero images
│   └── image copy.png              # Additional images
│
├── src/                            # Source code
│   ├── components/                 # React components
│   │   ├── Header.tsx             # Navigation header
│   │   ├── Hero.tsx               # Hero section with video background
│   │   ├── Services.tsx           # Services overview section
│   │   ├── AIAgentCapabilities.tsx # AI capabilities showcase
│   │   ├── About.tsx              # About section
│   │   ├── CaseStudies.tsx        # Portfolio/case studies
│   │   ├── Contact.tsx            # Contact form section
│   │   ├── Footer.tsx             # Footer with links
│   │   ├── ChatbotWidget.tsx      # AI chatbot widget
│   │   ├── AboutPage.tsx          # Full About page
│   │   ├── ServicesPage.tsx       # Full Services page
│   │   ├── PortfolioPage.tsx      # Full Portfolio page
│   │   ├── ContactPage.tsx        # Full Contact page
│   │   ├── Careers.tsx            # Job listings page
│   │   ├── ServiceModal.tsx       # Service details modal
│   │   ├── AdminLogin.tsx         # Admin authentication
│   │   ├── AdminDashboard.tsx     # Contact submissions dashboard
│   │   └── AdminCareer.tsx        # Job management dashboard
│   │
│   ├── App.tsx                    # Main app component with routing
│   ├── main.tsx                   # Application entry point
│   ├── index.css                  # Global styles
│   └── vite-env.d.ts              # TypeScript definitions
│
├── supabase/                       # Supabase configuration
│   ├── migrations/                 # Database migrations
│   │   ├── 20251111073728_create_chatbot_users_table.sql
│   │   ├── 20251111094348_create_jobs_and_applications_tables.sql
│   │   ├── 20251111112348_update_contact_submissions_table.sql
│   │   └── 20251111113345_fix_contact_submissions_constraints.sql
│   │
│   └── functions/                  # Edge Functions (serverless API)
│       ├── admin-login/           # Admin authentication
│       ├── admin-verify/          # Session verification
│       ├── chatbot-submit/        # Chatbot data collection
│       ├── contact-form/          # Contact form handler
│       ├── job-applications/      # Job application submission
│       ├── jobs-manage/           # Job CRUD operations
│       └── newsletter-subscribe/  # Newsletter subscription
│
├── .env                           # Environment variables
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── README.md                      # This file
```

## 🗄️ Database Schema

### Tables

#### `chatbot_users`
- Stores chatbot interaction data
- Fields: id, customer_name, customer_id, user_message, timestamp
- RLS: Enabled with authenticated user access

#### `jobs`
- Job postings management
- Fields: id, title, department, location, type, description, requirements, benefits, created_at
- RLS: Public read, authenticated write

#### `job_applications`
- Job application submissions
- Fields: id, job_id, name, email, phone, resume_url, cover_letter, created_at
- RLS: Enabled with public insert

#### `contact_submissions`
- Contact form submissions
- Fields: id, name, email, phone, company, message, created_at
- RLS: Public insert, authenticated read

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd deepiotics-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_URL=your_supabase_url

# Google Sheets Integration (optional)
VITE_GOOGLE_SHEETS_URL=your_google_sheets_api_url

# Company Contact Information
VITE_COMPANY_EMAIL=your_company_email
VITE_COMPANY_PHONE=your_phone_number
VITE_COMPANY_ADDRESS=your_address

# Admin Credentials (Server-side only)
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
SESSION_SECRET=your_secure_random_secret_32_chars_min

# Email Configuration (Server-side only)
SMTP_EMAIL=your_smtp_email
SMTP_PASSWORD=your_smtp_password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

4. **Set up Supabase**
```bash
# Apply database migrations (automatically handled via Supabase dashboard)
# Deploy edge functions using Supabase CLI or dashboard
```

5. **Run the development server**
```bash
npm run dev
```

6. **Build for production**
```bash
npm run build
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Supabase** - Database and authentication
- **Supabase Edge Functions** - Serverless API endpoints
- **PostgreSQL** - Database

### Deployment
- **Vite Build** - Optimized production bundle
- **Supabase Hosting** - Database and edge functions hosting

## 📄 Pages & Routes

- `/` - Home page (Hero, Services, About, Case Studies, Contact)
- `/about` - About page with company details
- `/services` - Services page with detailed offerings
- `/portfolio` - Portfolio/case studies page
- `/careers` - Career opportunities and job listings
- `/contact` - Contact page with form
- `/admin` - Admin login
- `/admin/dashboard` - Contact submissions dashboard
- `/admin/career` - Job postings management

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Admin authentication with session management
- Environment variables for sensitive data
- CORS headers configured for edge functions
- Input validation on all forms

## 📊 Key Features Breakdown

### Chatbot Widget
- Collects user information (name, ID, message)
- Stores data in Supabase
- Can be extended with AI responses

### Admin Dashboard
- View contact form submissions
- Manage job postings (create, edit, delete)
- Review job applications
- Protected with authentication

### Career Portal
- Display active job listings
- Job application form with file upload
- Application tracking

### Contact Forms
- Multiple contact forms across the site
- Email notifications via SMTP
- Data stored in Supabase

## 🌐 API Endpoints (Edge Functions)

- `POST /admin-login` - Admin authentication
- `GET /admin-verify` - Verify admin session
- `POST /chatbot-submit` - Submit chatbot data
- `POST /contact-form` - Submit contact form
- `POST /job-applications` - Submit job application
- `GET/POST/PUT/DELETE /jobs-manage` - Job CRUD operations
- `POST /newsletter-subscribe` - Newsletter subscription

## 📝 Environment Variables

All environment variables are prefixed with `VITE_` for frontend access. Server-side variables (SMTP, Admin credentials) are not accessible from the browser.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📧 Support

For support, email ai-experts@deepiotics.com or visit our contact page.

## 📜 License

This project is proprietary and confidential.

---

**Built with ❤️ by Deepiotics Team**
