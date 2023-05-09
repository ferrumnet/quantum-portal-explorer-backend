import { ObjectId } from 'mongoose';
import { INetwork } from '../interfaces';
import { QuantumPortalNetworkModel } from '../models';

const getNetworkById = async (id: ObjectId) => {
  return QuantumPortalNetworkModel.findById(id);
};

export const createNetwork = async (network: any): Promise<any> => {
  try {
    const setNetwork = await QuantumPortalNetworkModel.insertMany(network);
    return setNetwork;
  } catch (error) {
    console.error(error);
  }
};

export const getNetwork = async (id: ObjectId): Promise<INetwork> => {
  try {
    const getNetwork = await QuantumPortalNetworkModel.findById(id);
    return getNetwork;
  } catch (error) {
    console.error(error);
  }
};

export const deleteNetwork = async (networkId: ObjectId): Promise<INetwork> => {
  try {
    const network = await getNetworkById(networkId);
    await (network as any).deleteOne();
    return network;
  } catch (error) {
    console.error(error);
  }
};

export const updateNetwork = async (
  networkId: ObjectId,
  updateBody: any,
): Promise<INetwork> => {
  try {
    const network = await getNetworkById(networkId);
    Object.assign(network, updateBody);
    await network.save();
    return network;
  } catch (err) {
    console.error(err);
  }
};
