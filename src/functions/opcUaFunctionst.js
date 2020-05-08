const {
  OPCUAClient,
  MessageSecurityMode,
  SecurityPolicy,
  ClientSubscription,
  ClientMonitoredItem,
  TimestampsToReturn,
  AttributeIds,
} = require('node-opcua');

const connectionStrategy = {
  initialDelay: 2000,
  maxRetry: 2,
};

const options = {
  connectionStrategy: connectionStrategy,
  securityMode: MessageSecurityMode.None,
  securityPolicy: SecurityPolicy.None,
  endpoint_must_exist: false,
  keepSessionAlive: true,
};

async function OpcUaServer(endpoint) {
  const client = await OPCUAClient.create(options);
  await client.connect(endpoint);

  const session = await client.createSession();
  console.log('conectado ao', endpoint);

  return session;
}

async function readOpc(session, node) {
  try {
    const dataValue = await session.readVariableValue(node);
    const response =
      dataValue.statusCode.name === 'BadNodeIdUnknown'
        ? 'indisponivel'
        : dataValue.value.value;

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function createMonitoredItem(session) {
  const subscription = ClientSubscription.create(session, {
    requestedPublishingInterval: 1000,
    requestedLifetimeCount: 100,
    requestedMaxKeepAliveCount: 10,
    maxNotificationsPerPublish: 100,
    publishingEnabled: true,
    priority: 10,
  });

  const itemToMonitor1 = {
    nodeId: 'ns=4;s=PLC1.Usinagem_Insumo_Peca1',
    attributeId: AttributeIds.Value,
  };

  const itemToMonitor2 = {
    nodeId: 'ns=4;s=PLC1.Usinagem_Insumo_Peca2',
    attributeId: AttributeIds.Value,
  };

  const itemToMonitor3 = {
    nodeId: 'ns=4;s=PLC1.Usinagem_Insumo_Peca3',
    attributeId: AttributeIds.Value,
  };

  const itemToMonitor4 = {
    nodeId: 'ns=4;s=PLC1.Usinagem_Insumo_Peca4',
    attributeId: AttributeIds.Value,
  };

  const parameters = {
    samplingInterval: 100,
    discardOldest: true,
    queueSize: 10,
  };

  const item1 = ClientMonitoredItem.create(
    subscription,
    itemToMonitor1,
    parameters,
    TimestampsToReturn.Both
  );

  const item2 = ClientMonitoredItem.create(
    subscription,
    itemToMonitor1,
    parameters,
    TimestampsToReturn.Both
  );

  const item3 = ClientMonitoredItem.create(
    subscription,
    itemToMonitor1,
    parameters,
    TimestampsToReturn.Both
  );

  const item4 = ClientMonitoredItem.create(
    subscription,
    itemToMonitor1,
    parameters,
    TimestampsToReturn.Both
  );

  return {
    monitoredItem: { item1: item1, item2: item2, item3: item3, item4: item4 },
    subscription: subscription,
  };
}

exports.OpcUaServer = OpcUaServer;

exports.readOpc = readOpc;

exports.createMonitoredItem = createMonitoredItem;
