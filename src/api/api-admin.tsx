import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import {
  BaseAddress,
  CustomerDraft,
  CustomerUpdateAction,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'random-team-inc',
  credentials: {
    clientId: 'ltAQ1Km4zlNoUD7nCkco3WBh',
    clientSecret: '3900ITWks9zD4xGN0qyiRQV5hfOHu2Ak',
  },
  scopes: ['manage_project:random-team-inc'],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'random-team-inc' });

export async function createCustomer(array: CustomerDraft) {
  const result = await apiRoot
    .customers()
    .post({
      body: array,
    })
    .execute();
  return result;
}

export async function getCustomer(id: string) {
  const result = await apiRoot.customers().withId({ ID: id }).get().execute();
  return result;
}

export async function setDefaultAdress(id: string, actions: CustomerUpdateAction[]) {
  const result = apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version: 1,
        actions: actions,
      },
    })
    .execute();
  console.log(result);
}
