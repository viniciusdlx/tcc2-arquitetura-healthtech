import { execSync } from 'child_process';

// Função para verificar se o nome da migração foi passado como argumento
const getMigrationName = (): string => {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Por favor, forneça um nome para a migração.');
    process.exit(1);
  }
  return args[0];
};

const main = () => {
  const migrationName = getMigrationName();

  // Comando para gerar a migração
  const generateCommand = `npx typeorm migration:generate ./src/migrations/${migrationName} -d ./dist/src/config/database/datasource.js`;

  try {
    console.log(`Gerando migração: ${migrationName}...`);
    execSync(generateCommand, { stdio: 'inherit' });

    // Comando para rodar a migração
    const runCommand = `npx typeorm migration:run -d ./dist/src/config/database/datasource.js`;
    console.log(`Executando migrações...`);
    execSync(runCommand, { stdio: 'inherit' });

    console.log('Migração gerada e executada com sucesso!');
  } catch (error) {
    console.error(
      'Ocorreu um erro ao gerar ou executar a migração:',
      error.message,
    );
  }
};

main();
