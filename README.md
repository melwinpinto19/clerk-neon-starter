# **My Learning Project**

A modern full-stack web application using **Prisma**, **NeonDB**, **Clerk**, and **ShadCN**.

## **🚀 Tech Stack**

- **Database:** [NeonDB](https://neon.tech/) (PostgreSQL)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [Clerk](https://clerk.com/)
- **UI Components:** [ShadCN](https://ui.shadcn.com/)
- **Frontend:** Next.js 

## **📦 Setup & Installation**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/your-project.git
cd your-project
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### 3️⃣ Environment Variables

```env
# Add your environment variables here
DATABASE_URL="postgresql://your_neondb_url"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"

```



### 4️⃣ Prisma setup 

```env
npm install prisma --save-dev

npx prisma init --datasource-provider postgres

npx prisma migrate dev --name init
```

###  5️⃣ Run the App

```sh
npm run dev
```
