const { SecretManagerServiceClient } = require('@google-cloud/secret-manager').v1;
const secretmanagerClient = new SecretManagerServiceClient();

//GOOGLE SECRET MANAGER
async function getSecret(name) {
    let [secret] = await secretmanagerClient.accessSecretVersion({
        name: `projects/${process.env.PROJECT_ID}/secrets/${name}/versions/latest`,
    });
    return secret.payload?.data?.toString('utf8');
}

module.exports = { getSecret };