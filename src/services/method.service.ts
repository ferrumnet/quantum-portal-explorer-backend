import Web3 from 'web3';
import { AbiItem } from '../interfaces';
import { CustomTransactionCallRequest } from '../interfaces/web3.interface';

export const callMethod = async (
  network: string,
  contractAddress: string,
  abi: AbiItem,
  method: string,
  args: string[],
): Promise<any> => {
  const data = (global as any).network;
  let rpcUrl = '';
  data.map((item: any) => {
    if (network === item.name) {
      rpcUrl = item.rpcUrl.toString();
    }
  });
  const web3 = new Web3(rpcUrl);
  const contract = new web3.eth.Contract(abi, contractAddress);
  const res = await contract.methods[method](...args).call();
  if (!Array.isArray(res)) {
    return res.toString();
  }
  const rv = { result: [], obj: {} } as any;
  abi.outputs.forEach((out, i) => {
    rv.result.push(res[i].toString());
    rv.obj[out.name] = res[i].toString();
  });
  return rv;
};

export const methodGetTransaction = async (
  network: string,
  contractAddress: string,
  abi: AbiItem,
  method: string,
  args: string[],
  from: string,
): Promise<CustomTransactionCallRequest> => {
  const data = (global as any).network;
  let rpcUrl = '';
  data.map((item: any) => {
    if (network === item.name) {
      rpcUrl = item.rpcUrl.toString();
    }
  });
  const web3 = new Web3(rpcUrl);
  const contract = new web3.eth.Contract(abi, contractAddress);
  const p = contract.methods[method](...args);
  const nonce = await web3.eth.getTransactionCount(from, 'pending');

  return {
    currency: '',
    from,
    amount: '0',
    contract: contractAddress,
    data: p.encodeABI(),
    gas: { gasPrice: '0', gasLimit: undefined },
    nonce,
    description: `Custom Transaction`,
  };
};
