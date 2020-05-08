// var modbus = require('modbus-stream');

// modbus.tcp.connect(
//   502,
//   '10.1.1.40',
//   { debug: 'automaton-2454' },
//   (err, connection) => {
//     if (err) {
//       console.log('erro===>>', err);
//     }
//     connection.readCoils(
//       { address: 3000, quantity: 8, extra: { unitId: 151 } },
//       (err, res) => {
//         if (err) console.log('eroo1=====>>>>>>');
//         console.log('resposta1==>', res.response); // response
//       }
//     );
//     connection.readDiscreteInputs(
//       { address: 3000, quantity: 8, extra: { unitId: 151 } },
//       (err, res) => {
//         if (err) console.log('eroo2=====>>>>>>');
//         console.log('resposta2==>', res.response); // response
//       }
//     );
//     connection.readHoldingRegisters(
//       { address: 3000, quantity: 8, extra: { unitId: 151 } },
//       (err, res) => {
//         if (err) console.log('eroo3=====>>>>>>');
//         console.log('resposta3==>', res.response); // response
//       }
//     );
//     connection.readInputRegisters(
//       { address: 3000, quantity: 8, extra: { unitId: 151 } },
//       (err, res) => {
//         if (err) console.log('eroo4=====>>>>>>');
//         console.log('resposta4==>', res.response); // response
//       }
//     );

//   }
// );

const modbus = require('jsmodbus');
const net = require('net');
const socket = new net.Socket();
const options = {
  port: 502,
  host: '10.1.1.4',
};
const client = new modbus.client.TCP(socket);
// const client2 = new modbus.client.TCP(socket, 151);
const id = 30;
socket.on('connect', function () {
  client
    .readHoldingRegisters(id, 10)
    .then(function (resp) {
      console.log(resp.response.body);
      socket.end();
    })
    .catch(function () {
      console.error(
        require('util').inspect(arguments, {
          depth: null,
        })
      );
      socket.end();
    });
  client
    .readCoils(id, 10)
    .then(function (resp) {
      console.log(resp.response.body);
      socket.end();
    })
    .catch(function () {
      console.error(
        require('util').inspect(arguments, {
          depth: null,
        })
      );
      socket.end();
    });
  // client2
  //   .readHoldingRegisters(id, 2 )
  //   .then(function (resp) {
  //     console.log(resp.response.body);
  //     socket.end();
  //   })
  //   .catch(function () {
  //     console.error(
  //       require('util').inspect(arguments, {
  //         depth: null,
  //       })
  //     );
  //     socket.end();
  //   });
});

socket.on('error', console.error);
socket.connect(options);
