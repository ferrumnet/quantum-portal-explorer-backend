import {
  QuantumPortalContractObjectModel,
  QuantumPortalAccountModel,
} from '../models';
import {
  QuantumPortalContractObject,
  QuantumPortalAccount,
  QuantumPortalContractAccount,
} from '../interfaces';
import { accountService } from '../services';
import CryptoJS from 'crypto-js';
import encHex from 'crypto-js/enc-hex';
import SHA256 from 'crypto-js/sha256';
import axios from 'axios';
import config from '../config/config';

type WordArray = CryptoJS.lib.WordArray;

export const registerContract = async (
  networks: [string],
  contractAddress: string,
  contract: QuantumPortalContractObject,
): Promise<QuantumPortalContractObject | QuantumPortalAccount> => {
  contractAddress = contractAddress.toLowerCase();
  const contractId = sha256sync(
    contract.deployedBytecode.toLowerCase().replace('0x', ''),
  );
  contract.contractId = contractId;
  const existing = await QuantumPortalContractObjectModel.findOne({
    contractId,
  });
  if (!existing) {
    await new QuantumPortalContractObjectModel(contract).save();
  }
  let accountObj = await QuantumPortalAccountModel.findOne({
    address: contractAddress,
  });
  const address = await axios.get(
    `${config.explorerUrl}/api/v2/addresses/${contractAddress}`,
  );
  console.log('address', address.data);
  const account: QuantumPortalAccount = !!accountObj
    ? (accountObj.toJSON() as any)
    : ({
        name: address?.data?.name,
        address: contractAddress,
        creator: address?.data?.creator_address_hash,
        hash: address?.data?.creation_tx_hash,
        token: address?.data?.token,
        isContract: address?.data?.is_contract,
        isVerified: address?.data?.is_verified,
        implementationName: address?.data?.implementation_name,
        implementationAddress: address?.data?.implementation_address,
        implementations: address?.data?.implementations,
        contract: {},
      } as QuantumPortalAccount);
  for (const net of networks) {
    account.contract[net] = {
      address: contractAddress,
      network: net,
      contractId,
    } as QuantumPortalContractAccount;
  }
  if (!accountObj) {
    await new QuantumPortalAccountModel(account).save();
  } else {
    await QuantumPortalAccountModel.findOneAndUpdate(
      { address: contractAddress },
      account,
    ).exec();
  }

  const newAccount = await accountService.getAccount(contractAddress);
  return newAccount;
};

export function sha256sync(hexData: string): string {
  const dataWa = encHex.parse(hexData);
  const hash: WordArray = SHA256(dataWa);
  return hash.toString(encHex);
}
