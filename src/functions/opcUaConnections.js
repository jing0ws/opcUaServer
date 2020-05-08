const OPCUA = require('./opcUaFunctionst.js');
const vars = require('../global/opcVars');

exports.createConnections = async function createConnections() {
  try {
    return {
      usinagem: await OPCUA.OpcUaServer(vars.usinagem.endpoint),
      gravacao: await OPCUA.OpcUaServer(vars.gravacao.endpoint),
      embalagem: await OPCUA.OpcUaServer(vars.embalagem.endpoint),
      entrega: await OPCUA.OpcUaServer(vars.entrega.endpoint),
    };
  } catch (error) {
    console.log(error);
  }
};
