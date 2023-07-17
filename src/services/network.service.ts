import { ObjectId } from 'mongoose';
import { INetwork } from '../interfaces';
import { QuantumPortalNetworkModel } from '../models';

const getNetworkById = async (id: ObjectId) => {
  return QuantumPortalNetworkModel.findById(id);
};

export const createNetwork = async (network: any): Promise<any> => {
  const setNetwork = await QuantumPortalNetworkModel.insertMany(network);
  return setNetwork;
};

export const getAllNetworks = async (id: ObjectId): Promise<INetwork[]> => {
  const networks = await QuantumPortalNetworkModel.find();
  return networks;
};

export const getNetworkByQuery = async (query: Object): Promise<INetwork> => {
  const network = await QuantumPortalNetworkModel.findOne(query);
  return network;
};

export const getNetwork = async (id: ObjectId): Promise<INetwork> => {
  const network = await QuantumPortalNetworkModel.findById(id);
  return network;
};

export const deleteNetwork = async (networkId: ObjectId): Promise<INetwork> => {
  const network = await getNetworkById(networkId);
  await (network as any).deleteOne();
  return network;
};

export const updateNetwork = async (
  networkId: ObjectId,
  updateBody: any,
): Promise<INetwork> => {
  const network = await getNetworkById(networkId);
  Object.assign(network, updateBody);
  await network.save();
  return network;
};
