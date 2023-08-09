import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './api-admin';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'random-team-inc' });
