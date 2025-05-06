export const generateCommands = (databaseId: string, config: any, engine: string) => {
  if (!databaseId || Object.keys(config).length === 0) return { curl: '', doctl: '' };
  
  const jsonBody = JSON.stringify({ config }, null, 2);
  const configJsonBody = JSON.stringify(config);

  return {
    curl: `curl -X PATCH \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $DIGITALOCEAN_TOKEN" \\
  -d '${jsonBody}' \\
  "https://api.digitalocean.com/v2/databases/${databaseId}/config"`,
    
    doctl: `doctl databases configuration update ${databaseId} --engine ${engine} --config-json '${configJsonBody}'`
  };
}; 