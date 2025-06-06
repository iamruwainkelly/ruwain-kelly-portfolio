# RUWΔIN KΞLLY — Portfolio Website

A production-grade, full-featured personal portfolio site that blends modern design with real engineering showcases — built with Vue 3, Tailwind CSS, and live backend integration. This is not a static portfolio — it demonstrates live Terraform API communication, AWS cost estimation tools, and secure authentication, all packed into a sleek, animated interface.

---

## Live Preview

**Deployed at:** [https://iamruwainkelly.vercel.app](https://iamruwainkelly.vercel.app)  
**GitHub:** [iamruwainkelly](https://github.com/iamruwainkelly)

---

## Key Highlights

- **Live Terraform Integration:** Visual frontend tied to a secure Node.js backend running real Terraform plans (or mocked for demo)
- **AWS Cost Intelligence Tool:** Estimate AWS cloud costs with responsive UI and sliders
- **AWS Serverless Dashboard:** Live AWS integration with Lambda, API Gateway, DynamoDB monitoring (demo mode available)
- **Project Detail Pages:** Real projects with architecture, stack, features, and interactive charts
- **Fully Responsive:** Optimised for mobile, tablet, and large screens
- **Dark UI:** Modern gradient themes and glassmorphism effects

---

## 🛠️ Tech Stack

| Frontend     | Build Tools     | UI Frameworks   | Integrations       |
|--------------|-----------------|------------------|---------------------|
| Vue 3        | Vite            | Tailwind CSS     | Chart.js, Terraform |
| Vue Router   | ES6 Modules     | Glassmorphism    | REST API, JWT       |

---

## 📁 Project Structure

```bash
.
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── router/
│   └── utils/
├── public/
├── vite.config.js
├── tailwind.config.js
└── index.html


📦 Setup

# Clone the repo
git clone https://github.com/iamruwainkelly/ruwain-kelly-portfolio.git

# Install dependencies
npm install

# Start dev server
npm run dev


## Routes & Pages

| Route                     | Description                                    |
|---------------------------|------------------------------------------------|
| `/`                       | Homepage with animated intro                  |
| `/projects`               | Interactive project showcase                  |
| `/terraform-demo`         | Live backend integration demo                 |
| `/aws-calculator`         | Serverless cost estimation dashboard          |
| `/aws-serverless`         | Live AWS monitoring dashboard (demo/live mode)|
| `/projects/:id`           | Project details with architecture, features   |

## AWS Integration Features

### **AWS Serverless Dashboard** (`/aws-serverless`)
- **Demo Mode**: Realistic mock AWS data (works out-of-the-box)
- **Live Mode**: Real AWS integration with your infrastructure
- **Services**: Lambda, API Gateway, DynamoDB, CloudWatch, Cost Explorer
- **Setup**: See [AWS_INTEGRATION_SETUP.md](./AWS_INTEGRATION_SETUP.md) for configuration


Author

RUWΔIN KΞLLY
Senior SCM & ERP Engineer | AI Backend Architect | Digital Transformation
📫 admin@ruwainkelly.com
🔗 LinkedIn: www.linkedin.com/in/mr-r



















