import { QuantumPortalTransactionModel } from '../models';
import PocContractABI from '../utils/abi/poc.json';
import MGRContractABI from '../utils/abi/ledgerMgr.json';
import { ethers } from 'ethers';
import { COINGECKO_API, ContractAddresses } from '../utils/constants';
import axios from 'axios';

export const saveTransaction = async (tx: any) => {
  const existedTx = await QuantumPortalTransactionModel.findOne({
    hash: tx.hash,
  });
  if (existedTx) {
    console.log('Transaction already exists');
    return;
  }
  const transaction = new QuantumPortalTransactionModel(tx);
  console.log('Saving transaction', transaction);
  return await transaction.save();
};

export const getTxs = async (
  page: number,
  limit: number,
  address?: string,
): Promise<any> => {
  const query: any = {
    method: 'finalize',
  };
  if (address) {
    query.$or = [{ from: address }, { to: address }];
  }
  const docsPromise = QuantumPortalTransactionModel.find(query)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise =
    QuantumPortalTransactionModel.countDocuments(query).exec();

  const [totalResults, results] = await Promise.all([
    countPromise,
    docsPromise,
  ]);
  const matchingRecords = [];
  if (results.length > 0) {
    // Prepare an array to hold all matching mineRemoteBlock transactions

    // Step 2: Loop through each finalize transaction and find matching mineRemoteBlock transactions
    for (const finalizeTx of results) {
      const blockNonce = finalizeTx.decodedInput.parameters.find(
        (param: any) => param.name === 'blockNonce',
      ).value;
      const remoteChainId = finalizeTx.decodedInput.parameters.find(
        (param: any) => param.name === 'remoteChainId',
      ).value;

      // Log 'to' contract address for finalize transaction
      const finalizeContractAddress = finalizeTx.to;

      // Find matching mineRemoteBlock transactions using find instead of findOne
      const matchingMineRemoteBlockTx =
        await QuantumPortalTransactionModel.findOne({
          method: 'mineRemoteBlock',
          $and: [
            { to: finalizeContractAddress },
            {
              'decodedInput.parameters': {
                $elemMatch: {
                  name: 'blockNonce',
                  value: blockNonce,
                },
              },
            },
            {
              'decodedInput.parameters': {
                $elemMatch: {
                  name: 'remoteChainId',
                  value: remoteChainId,
                },
              },
            },
          ],
        });

      if (matchingMineRemoteBlockTx) {
        const transactions =
          matchingMineRemoteBlockTx.decodedInput.parameters.find(
            (param: any) => param.name === 'transactions',
          ).value;
        matchingRecords.push({
          ...finalizeTx.toObject(),
          remoteContract: transactions[0][1],
          sourceMsgSender: transactions[0][2],
          sourceBeneficiary: transactions[0][3],
        });
      }
    }
  }

  const totalPages = Math.ceil(totalResults / limit);
  const result = {
    results: matchingRecords.length ? matchingRecords : results,
    page,
    limit,
    totalPages,
    totalResults: matchingRecords.length
      ? matchingRecords.length
      : results.length,
  };

  return result;
};

export const getInternalTxs = async (
  address: string,
  page: number,
  limit: number,
): Promise<any> => {
  const query: any = {
    method: 'finalize',
  };
  if (address) {
    query.to = address;
  }
  const docsPromise = QuantumPortalTransactionModel.find(query)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise =
    QuantumPortalTransactionModel.countDocuments(query).exec();
  const [totalResults, results] = await Promise.all([
    countPromise,
    docsPromise,
  ]);
  const totalPages = Math.ceil(totalResults / limit);
  const result = {
    results,
    page,
    limit,
    totalPages,
    totalResults,
  };
  return result;
};
export const getTransferTokensTxs = async (
  type: string,
  address: string,
  page: number,
  limit: number,
): Promise<any> => {
  const query: any = {
    method: 'finalize',
  };
  if (type) {
    query.txType = type;
  }
  if (address) {
    query.$or = [{ from: address }, { to: address }];
  }
  const docsPromise = QuantumPortalTransactionModel.find(query)
    .sort({ dateTimestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  const countPromise =
    QuantumPortalTransactionModel.countDocuments(query).exec();
  const [totalResults, results] = await Promise.all([
    countPromise,
    docsPromise,
  ]);
  const totalPages = Math.ceil(totalResults / limit);
  const result = {
    results,
    page,
    limit,
    totalPages,
    totalResults,
  };
  return result;
};

export const getTransaction = async (txId: string): Promise<any> => {
  let remoteContract: any = '';
  let sourceMsgSender: any = '';
  let sourceBeneficiary: any = '';

  const tx: any = await QuantumPortalTransactionModel.findOne({
    hash: txId,
    method: 'finalize',
  });
  if (tx) {
    const blockNonce = tx.decodedInput.parameters.find(
      (param: any) => param.name === 'blockNonce',
    ).value;
    const remoteChainId = tx.decodedInput.parameters.find(
      (param: any) => param.name === 'remoteChainId',
    ).value;
    const matchingMineRemoteBlockTx =
      await QuantumPortalTransactionModel.findOne({
        method: 'mineRemoteBlock',
        $and: [
          {
            'decodedInput.parameters': {
              $elemMatch: {
                name: 'blockNonce',
                value: blockNonce,
              },
            },
          },
          {
            'decodedInput.parameters': {
              $elemMatch: {
                name: 'remoteChainId',
                value: remoteChainId,
              },
            },
          },
        ],
      });

    if (matchingMineRemoteBlockTx) {
      const transactions =
        matchingMineRemoteBlockTx.decodedInput.parameters.find(
          (param: any) => param.name === 'transactions',
        ).value;
      remoteContract = transactions[0][1];
      sourceMsgSender = transactions[0][2];
      sourceBeneficiary = transactions[0][3];
      // console.log(tx);
    }
  }
  if (!tx) {
    return null;
  }
  return {
    ...tx.toObject(),
    remoteContract,
    sourceMsgSender,
    sourceBeneficiary,
  };
};

export const getAllTransactions = async (
  page: number,
  limit: number,
  queryData: any,
): Promise<any> => {
  const docsPromise = QuantumPortalTransactionModel.find(queryData)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  const countPromise = await QuantumPortalTransactionModel.countDocuments(
    queryData,
  ).exec();

  const [totalResults, results] = await Promise.all([
    countPromise,
    docsPromise,
  ]);

  const totalPages = Math.ceil(totalResults / limit);
  const result = {
    results,
    page,
    limit,
    totalPages,
    totalResults,
  };
  return result;
};

export const saveTransactions = async (txs: any[]) => {
  // console.log({ txs });
  return await QuantumPortalTransactionModel.insertMany(txs);
};

export const getDataForChart = async (): Promise<any> => {
  try {
    const newArray = [];
    const horlyStartDate = new Date();

    for (let i = 0; i < 24; i++) {
      // Create a new date for the current hour
      const currentDate = new Date(
        horlyStartDate.getTime() - 40 * 60 * 60 * 1000,
      );
      currentDate.setHours(horlyStartDate.getHours() + i);

      // Create a new date for the end of the hour
      const endDate = new Date(currentDate);
      endDate.setHours(currentDate.getHours() + 1);

      // Query for records within the current hour
      const hoursResult = await QuantumPortalTransactionModel.find({
        timestamp: {
          $gte: currentDate.toISOString(),
          $lte: endDate.toISOString(),
        },
      });

      // Push the date and count to the array
      newArray.push({
        date: currentDate.toISOString(),
        volume: hoursResult.length,
      });
    }
    return newArray;
  } catch (error) {
    console.error('Error fetching data for chart:', error);
    throw error;
  }
};

export const getTransactionByQuery = async (query: Object): Promise<any> => {
  const tx = await QuantumPortalTransactionModel.findOne(query);
  return tx;
};

export const totalTransactions = async (): Promise<Number> => {
  const countPromise = await QuantumPortalTransactionModel.countDocuments(
    {},
  ).exec();

  const totalResults = await Promise.resolve(countPromise);
  return totalResults;
};

export const fetchRemoteTransactionWithMinedAndFinalizedTx = async (
  txHash: string,
) => {
  const responseObj: any = {
    sourceBlock: {},
    registeredTxReceipt: {},
    minedTxReceipt: {},
    finalizedTxReceipt: {},
    remoteTransactionRegistered: {},
    targetBlock: {},
    finalizedTxLog: {},
    finalizedTransaction: {},
  };
  const contractAbi: any[] = [...PocContractABI.abi, ...MGRContractABI.abi];
  contractAbi.push({
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'msg',
        type: 'string',
      },
    ],
    name: 'Log',
    type: 'event',
  });
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  // console.log('Fetching provider ', provider);
  let tx = await provider.getTransaction(txHash);
  if (tx === null) {
    console.log('Found transaction,', tx, tx === null);
    return new Error('Transaction not found');
  }
  const block = await provider.getBlock(tx?.blockNumber);
  console.log('Found block,', block);
  responseObj.sourceBlock = {
    targetChainId: tx.chainId,
    nonce: tx.nonce,
    timeStamp: block.timestamp,
  };

  // first decode the original call
  const iface = new ethers.utils.Interface([
    'function multiTransfer(address[] memory froms, uint[] memory inputs, address[] memory tos, uint[] memory values, uint blocknumber, bytes32 txid, uint timestamp, bytes memory remoteCall)',
  ]);
  let inputs = iface.decodeFunctionData('multiTransfer', tx.data);

  // console.log(inputs);
  // console.log(inputs.remoteCall);

  // now decode the remote call
  const remoteCall = ethers.utils.defaultAbiCoder.decode(
    ['uint64', 'address', 'address', 'bytes', 'uint'],
    ethers.utils.hexDataSlice(inputs.remoteCall, 0),
  );

  const receipt = await provider.getTransactionReceipt(txHash);
  responseObj.registeredTxReceipt = receipt;
  const infer = new ethers.utils.Interface(contractAbi);
  console.log(receipt);

  for (const log of receipt.logs) {
    try {
      let parsed = infer.parseLog(log);
      if (parsed.name === 'RemoteTransactionRegistered') {
        const eventArgs = parsed?.args;

        // Print attribute names and their values
        parsed?.eventFragment?.inputs.forEach((input: any, index: any) => {
          if (input.type === 'tuple') {
            responseObj.remoteTransactionRegistered[input.name] = {};
            input.components.forEach((component: any, subIndex: any) => {
              responseObj.remoteTransactionRegistered[input.name][
                component.name
              ] = eventArgs[index][subIndex];
            });
          } else {
            if (typeof eventArgs[index] == 'object') {
              responseObj.remoteTransactionRegistered[input.name] =
                ethers.utils.formatEther(eventArgs[index]);
            } else
              responseObj.remoteTransactionRegistered[input.name] =
                eventArgs[index];
          }
        });
      }
    } catch (err) {
      console.log('no receipt found for', txHash);
      continue;
    }
  }
  console.log('remote transaction', responseObj.remoteTransactionRegistered);

  // let orgCallChainId = remoteCall[0];
  let orgCallBeneficiary = remoteCall[1];
  let orgCallTargetContract = remoteCall[2];
  let orgCallMethodCall = remoteCall[3];

  // now fetch the transactions from the miner
  // TODO : This is a hack and it only works because we know the address of the miner/finalizer
  // in reality we would not know this, we should instead store all txs to the ledger manager in a DB
  let miner_address = ContractAddresses.Miner;
  const url = `${process.env.EXPLORER_URL}/api?module=account&action=txlist&address=${miner_address}`;

  const response = await fetch(url);
  const data = await response.json();

  //console.log("received transaction list ", data);

  const targetContracts = [
    ContractAddresses.QuantumPortalLedgerMgr, // ledger manager
  ];

  // we only care about mine/finalise transactions
  const filteredTransactions = data.result.filter((tx: any) =>
    targetContracts.includes(tx.to),
  );
  // Sort transactions by block number, oldest block comes first, this allows us to find mine tx first
  // before finalize
  filteredTransactions.sort((a: any, b: any) => a.blockNumber - b.blockNumber);
  //console.log(filteredTransactions);

  // const ledgerabi = debugabis;
  const inf = new ethers.utils.Interface(contractAbi);

  let remoteBlockNonce;

  // lets try to find the original transaction in the filtered list
  for (const element of filteredTransactions) {
    console.log('total transactions ', filteredTransactions.length);
    console.log('searching ', element.hash);

    try {
      let tx = await provider.getTransaction(element.hash);
      //console.log("Found transaction,", tx);

      // first decode the original call
      let inputs = inf.parseTransaction(tx);

      //console.log({inputs});
      // console.log(inputs.args);
      // console.log(inputs.args.transactions);

      if (inputs.args.transactions != undefined) {
        for (let transaction of inputs.args.transactions) {
          if (
            transaction[1] == orgCallTargetContract &&
            transaction[3] == orgCallBeneficiary &&
            transaction[6][0] == orgCallMethodCall
          ) {
            console.log('Found the mine transaction!!', transaction);
            const receipt = await provider.getTransactionReceipt(element.hash);
            responseObj.minedTxReceipt = receipt;
            console.log(receipt);
            for (const log of receipt.logs) {
              try {
                let parsed = inf.parseLog(log);
                // Search for the target address in the parsed log
                // if (JSON.stringify(parsed).includes(remoteCall[2])) {
                //     console.log(`Found target address in transaction: ${element.hash}`);
                //     console.log(parsed);
                // }
                console.log({ parsed });
                let blockNonce = parsed.args[4].nonce;
                console.log('Block nonce from mined tx is ', blockNonce);
                remoteBlockNonce = blockNonce;
                if (parsed.name === 'MinedBlockCreated') {
                  // remoteTransactionRegistered.eventName = parsed?.name;
                  // remoteTransactionRegistered.eventSignature = parsed?.signature;
                  const eventArgs = parsed?.args;

                  // Print attribute names and their values
                  parsed?.eventFragment?.inputs.forEach(
                    (input: any, index: any) => {
                      if (input.type === 'tuple') {
                        // console.log(`${input.name}:`);

                        input.components.forEach(
                          (component: any, subIndex: any) => {
                            if (typeof eventArgs[index][subIndex] == 'object') {
                              ethers.utils.formatEther(
                                (responseObj.targetBlock[input.name][
                                  component.name
                                ] = eventArgs[index][subIndex]),
                              );
                            } else
                              responseObj.targetBlock[input.name][
                                component.name
                              ] = eventArgs[index][subIndex];
                          },
                        );
                      } else {
                        if (typeof eventArgs[index] == 'object') {
                          responseObj.targetBlock[input.name] =
                            ethers.utils.formatEther(eventArgs[index]);
                        } else
                          responseObj.targetBlock[input.name] =
                            eventArgs[index];
                      }
                    },
                  );
                  console.log({ targetBlock: responseObj.targetBlock });
                }
              } catch (err) {
                console.log('no receipt found for', element.hash);
                continue;
              }
            }
          }
        }
      } else {
        // console.log(inputs.args);
        // console.log(typeof(remoteBlockNonce) );
        // console.log(remoteBlockNonce.toString());
        // console.log(inputs.args.blockNonce.integerValue() );
        if (
          remoteBlockNonce != undefined &&
          remoteBlockNonce.toString() == inputs.args.blockNonce.toString()
        ) {
          console.log('Found the finalize transaction!!', tx);
          responseObj.finalizedTx = tx;
          let inputs = inf.parseTransaction(tx);
          console.log(inputs);

          responseObj.finalizedTxLog.eventName = inputs?.name;
          responseObj.finalizedTxLog.eventSignature = inputs?.signature;
          const eventArgs = inputs?.args;

          // Print attribute names and their values
          inputs?.functionFragment?.inputs.forEach((input: any, index: any) => {
            if (input.type === 'tuple') {
              console.log(`${input.name}:`);
              responseObj.finalizedTxLog[input.name] = {};
              input.components.forEach((component: any, subIndex: any) => {
                // console.log(component.name, ":", eventArgs[index][subIndex]);
                responseObj.finalizedTxLog[input.name][component.name] =
                  eventArgs[index][subIndex];
              });
            } else {
              // console.log(`${input.name}: ${eventArgs[index]}`);
              responseObj.finalizedTxLog[input.name] = eventArgs[index];
            }
          });
          console.log({
            finalizedTxLog: responseObj.finalizedTxLog,
          });
        }
      }
    } catch {
      continue;
    }
  }
  return responseObj;
};
export const fetchStateDataFromCoinGekoAPI = async () => {
  try {
    const { data } = await axios.get(COINGECKO_API);
    return {
      price: data?.market_data.current_price.usd,
      priceChangePercentage: data?.market_data.price_change_percentage_24h,
      marketCap: data?.market_data.market_cap.usd,
      marketCapChangePercentage:
        data?.market_data.market_cap_change_percentage_24h,
      volume24h: data?.market_data.total_volume.usd,
    };
  } catch (error) {
    console.error('Error fetching CoinGecko data:', error);
    throw new Error('Failed to fetch CoinGecko data');
  }
};
