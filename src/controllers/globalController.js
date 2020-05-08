const OPCUA = require('../functions/opcUaFunctionst.js');
const vars = require('../global/opcVars');
const con = require('../functions/opcUaConnections');
const mir = require('../services/mirService');

let sessions = {};
init();

async function init() {
  sessions = await con.createConnections();

  const { monitoredItem, subscription } = await OPCUA.createMonitoredItem(
    sessions.usinagem
  );

  mir.startMonitor(monitoredItem, subscription);
}

module.exports = {
  async getInfos(req, res) {
    const celula = req.params.celula;
    let session = '';
    let nodes = {};

    switch (celula) {
      case 'usinagem':
        session = sessions.usinagem;
        nodes = { ...vars.usinagem };
        break;

      case 'gravacao':
        session = sessions.gravacao;
        nodes = { ...vars.gravacao };
        break;

      case 'embalagem':
        session = sessions.embalagem;
        nodes = { ...vars.usinagem };
        break;
      case 'entrega':
        session = sessions.entrega;
        nodes = { ...vars.entrega };
        break;

      default:
        break;
    }
    try {
      let response = {
        ordem: await OPCUA.lerOpc(session, nodes.ordem),
        nome: await OPCUA.lerOpc(session, nodes.nome),
        texto: await OPCUA.lerOpc(session, nodes.texto),
        pressao: await OPCUA.lerOpc(session, nodes.pressao),
        vazao: await OPCUA.lerOpc(session, nodes.vazao),
        energia: await OPCUA.lerOpc(session, nodes.energia),
      };

      res.send({ ...response });
    } catch (error) {
      console.log('erro getRegisterInfo ===>', error);

      return res.sendStatus(400);
    }
  },
};
