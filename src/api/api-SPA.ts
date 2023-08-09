import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'random-team-inc',
  credentials: {
    clientId: '1lezoiik8RbOGwLrH37uhk66',
    clientSecret: 'DdNojBX_9ZQmejORQiNl0dVT_fgJ78Pl',
  },
  scopes: [
    'manage_my_quote_requests:random-team-inc manage_my_quotes:random-team-inc create_anonymous_token:random-team-inc manage_my_profile:random-team-inc view_published_products:random-team-inc view_categories:random-team-inc manage_my_orders:random-team-inc manage_my_shopping_lists:random-team-inc manage_my_business_units:random-team-inc manage_my_payments:random-team-inc',
  ],
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
apiRoot.shoppingLists().get();
