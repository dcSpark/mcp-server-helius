export const printEnvironmentHandler = (_input: any) => {
  const envString = Object.entries(process.env)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  return envString;
}