## Manual Finance-Ai

Seja bem vindo ao meu projeto de "FINANCE-AI"

### CONFIGURAÇÕES
#### Criação do projeto
npx create-next-app@14.2.16 [nome_do_projeto]

#### Rodar o projeto em desenvolvimento
npm run dev

#### Instalação do ORM Prisma
npm install prisma@5.21.1

npx prisma init

#### Formatar o codígo do prisma
npx prisma format

#### Migrates
npx prisma migrate dev --name [nome_da_migrate]

#### Tailwind
Para que as classes de estilização do tailwindcss fique padronizadas, iremos utilizar um plugins. Segue abaixo:

{
    "plugins": ["prettier-plugin-tailwindcss"]
}

Este código tem que ser colocado dentro de um arquivo com o seguinte nome ".prettierrc.json", que deve de ser criado na pasta raiz do projeto. Além disso precisa ter a extensão do prettier instalada no seu vscode.
Nas configurações do vscode pesquise por "Default Formatter" e selecione o prettier, ainda nas configurações pesquise por "Format on Save".
Isso serve para que quando salvar um arquivo do projeto ele selecione o tipo de formatação prettier

#### Shadcn
### Instalação
npx shadcn@2.1.3 init

### Qual tipo de estilo
Selecione a opção default

### Qual a coloração
Selecione a opção Neutral

### CSS Variables
Sim

### Instalando componentes
npx shadcn@2.1.3 add [nome_do_componente]

#### Clerk
Serve para realizar login na sua aplicação

### Instalação
npm install @clerk/nextjs@5.7.5

#### Clerk Themes
Clerk Themes

### Instalação
npm install @clerk/themes@2.1.37

