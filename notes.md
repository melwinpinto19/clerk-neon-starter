## Prisma Setup :

- Install Prisma CLI

```bash
npm install prisma --save-dev
```

- init prisma

```bash
npx prisma init --datasource-provider <db_type>
```

- add db credentials

```env
DATABASE_URL=<db_url>
```

- define models in the schema.prisma file

```prisma
model User{
//  keys
}
```

- migrate your models

```bash
npx prisma migrate dev --name init
```
