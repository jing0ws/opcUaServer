const api = require('./api');

let isMirInMotion = false;

async function startMonitor(monitoredItem, subscription) {
  subscription.on('error', (err) => {
    console.log(err);
  });

  monitoredItem.item1.on('changed', async (val) => {
    if (!val && !isMirInMotion) {
      try {
        await api.put('/registers/7', { id: 7, value: 1, label: 'req_peca_1' });
        startMir();
      } catch (error) {
        console.log('Erro na rotina peça  ===>', error);
      }
    }
  });

  monitoredItem.item2.on('changed', async (val) => {
    if (!val && !isMirInMotion) {
      try {
        await api.put('/registers/8', { id: 8, value: 1, label: 'req_peca_2' });
        startMir();
      } catch (error) {
        console.log('Erro na rotina peça 2 ===>', error);
      }
    }
  });
}

async function startMir() {
  try {
    isMirInMotion = true;

    await api.put('/status', { state_id: 3 });

    await api.post('/mission_queue', {
      mission_id: 'fdd52fc2-8949-11ea-819f-000129922e26',
      parameters: [],
    });

    await api.put('/registers/15', { id: 15, value: 0, label: 'terminou' });

    const finishLoop = setInterval(async () => {
      const finished = await api.get('/registers/15');
      if (finished.value) {
        clearInterval(finishLoop);
        isMirInMotion = false;
      }
    }, 2000);
  } catch (error) {
    console.log('Erro na função startMir ===>', error);
  }
}

exports.startMonitor = startMonitor;
// from opcua import Client
// import time
// import requests

// chama_missao = 0
// feito = 0

// url = "opc.tcp://Cel_Usinagem:4840"

// client = Client(url)

// is_connected = False

// while is_connected == False:
//     try:
//         client.connect()
//         is_connected = True
//         print('Client Connected')

//     except:
//         is_connected = False
//         print('Client not Connected - Olhar conexao com OPC - Verificar se Painel Usinagem esta ligado')
//         time.sleep(5)

// while True:

//     peca1 = client.get_node("ns=4;s=PLC1.Usinagem_Insumo_Peca1")
//     Status_peca_1 = peca1.get_value()
//     '''print('Peca_1 :',Status_peca_1)'''

//     peca2 = client.get_node("ns=4;s=PLC1.Usinagem_Insumo_Peca2")
//     Status_peca_2 = peca2.get_value()
//     '''print('Peca_2 :',Status_peca_2)'''

//     peca3 = client.get_node("ns=4;s=PLC1.Usinagem_Insumo_Peca3")
//     Status_peca_3 = peca3.get_value()
//     '''print('Peca_3 :',Status_peca_3)'''

//     peca4 = client.get_node("ns=4;s=PLC1.Usinagem_Insumo_Peca4")
//     Status_peca_4 = peca4.get_value()
//     '''print('Peca_4 :',Status_peca_4)'''

//     print(Status_peca_1,Status_peca_2,Status_peca_3,Status_peca_4)

//     if Status_peca_1 == 0 and feito==1 :

//         url = "http://mir.com/api/v2.0.0/registers/7"

//         payload = "{\r\n  \"id\": 7,\r\n  \"value\": 1,\r\n  \"label\": \"req_peca_1\"\r\n}"
//         headers = {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic RGlzdHJpYnV0b3I6NjJmMmYwZjFlZmYxMGQzMTUyYzk1ZjZmMDU5NjU3NmU0ODJiYjhlNDQ4MDY0MzNmNGNmOTI5NzkyODM0YjAxNA==',
//         }

//         response = requests.request("PUT", url=headers, data = payload)

//         chama_missao = 1

//         print('Setou registrador peca 1')

//     if Status_peca_2 == 0 and feito==1 :

//         url = "http://mir.com/api/v2.0.0/registers/8"

//         payload = "{\r\n  \"id\": 8,\r\n  \"value\": 1,\r\n  \"label\": \"req_peca_2\"\r\n}"
//         headers = {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic RGlzdHJpYnV0b3I6NjJmMmYwZjFlZmYxMGQzMTUyYzk1ZjZmMDU5NjU3NmU0ODJiYjhlNDQ4MDY0MzNmNGNmOTI5NzkyODM0YjAxNA==',
//         }

//         response = requests.request("PUT", url=headers, data = payload)

//         chama_missao = 1

//         print('Setou registrador peca 2')

//     if chama_missao == 1 and feito == 1:

//         '''Coloca em play'''

//         url = "http://mir.com/api/v2.0.0/status"

//         payload = "{\r\n\t\"state_id\": 3\r\n}"
//         headers = {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic RGlzdHJpYnV0b3I6NjJmMmYwZjFlZmYxMGQzMTUyYzk1ZjZmMDU5NjU3NmU0ODJiYjhlNDQ4MDY0MzNmNGNmOTI5NzkyODM0YjAxNA==',
//         }

//         response = requests.request("PUT", url=headers, data = payload)

//         print('Pedido para colocar MIR em modo PLAY realizado')

//         url = "http://mir.com/api/v2.0.0/mission_queue"

//         payload = "{\r\n  \"mission_id\": \"fdd52fc2-8949-11ea-819f-000129922e26\",\r\n  \"parameters\": [\r\n  ]\r\n}\r\n"
//         headers = {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic RGlzdHJpYnV0b3I6NjJmMmYwZjFlZmYxMGQzMTUyYzk1ZjZmMDU5NjU3NmU0ODJiYjhlNDQ4MDY0MzNmNGNmOTI5NzkyODM0YjAxNA==',
//         }

//         response = requests.request("POST", url=headers, data = payload)

//         chama_missao = 0

//         feito = 0

//         print('Pedido para Missao realizado')

//         '''Seta registrador 15 em zero para indicar que robo esta trabalhando'''

//         url = "http://mir.com/api/v2.0.0/registers/15"

//         payload = "{\r\n  \"id\": 15,\r\n  \"value\": 0,\r\n  \"label\": \"terminou\"\r\n}"
//         headers = {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic RGlzdHJpYnV0b3I6NjJmMmYwZjFlZmYxMGQzMTUyYzk1ZjZmMDU5NjU3NmU0ODJiYjhlNDQ4MDY0MzNmNGNmOTI5NzkyODM0YjAxNA==',
//         }

//         response = requests.request("PUT", url=headers, data = payload)

//     if feito == 0:

//         '''Verifica se terminou missao'''

//         url = "http://mir.com/api/v2.0.0/registers/15"

//         payload = "{}"
//         headers = {
//             'Content-Type': 'application/json',
//             'Authorization': 'Basic RGlzdHJpYnV0b3I6NjJmMmYwZjFlZmYxMGQzMTUyYzk1ZjZmMDU5NjU3NmU0ODJiYjhlNDQ4MDY0MzNmNGNmOTI5NzkyODM0YjAxNA==',
//             }

//         response = requests.request("GET", url=headers, data = payload)

//         terminou = response.json()['value']

//         if terminou == 1:

//             feito = 1
//             print('Pedido realizado com sucesso')

//     time.sleep(5)
