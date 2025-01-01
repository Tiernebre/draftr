module.exports = {
  connection:
    "postgres://postgres:password@database:5432/draftr?sslmode=disable",
  outputPath: "./types/db",
  preDeleteOutputFolder: true,
  importsExtension: ".ts",
};
