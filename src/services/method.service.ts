import Web3 from 'web3';
import { AbiItem } from '../interfaces';

export const callMethod = async (
  network: string,
  contractAddress: string,
  abi: AbiItem,
  method: string,
  args: string[],
): Promise<any> => {
  const data = (global as any).network;
  console.log({ data });
  let rpcUrl = '';
  data.map((item: any) => {
    if (network === item.name) {
      rpcUrl = item.rpcUrl.toString();
      console.log(rpcUrl);
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
): Promise<any> => {
  const data = (global as any).network;
  console.log({ data });
  let rpcUrl = '';
  data.map((item: any) => {
    if (network === item.name) {
      rpcUrl = item.rpcUrl.toString();
      console.log(rpcUrl);
    }
  });
  const web3 = new Web3(rpcUrl);
  const contract = new web3.eth.Contract(abi, contractAddress);
  const p = contract.methods[method](...args);
  // const nonce = await web3(rpcUrl).getTransactionCount(from, 'pending');
  // return callRequest(
  //   contractAddress,
  //   "",
  //   from,
  //   p.encodeABI(),
  //   undefined,
  //   nonce,
  //   `Custom Transaction`
  // );
};
