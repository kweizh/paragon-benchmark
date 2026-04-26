import { paragon } from '@useparagon/connect';

export async function disconnectSlack() {
  return await paragon.uninstallIntegration('slack');
}
