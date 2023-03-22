import { SUPPORTED_NETWORKS } from '.././utils/constants';

export const getSupportedNetworks = async (): Promise<any> => {
  const networks = SUPPORTED_NETWORKS;
  return networks;
};
