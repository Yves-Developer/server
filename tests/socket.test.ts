import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { io as Client } from 'socket.io-client';
import  httpServer  from '../server';

const PORT = 400;
const URL = `http://localhost:${PORT}`;
let clientSocket: ReturnType<typeof Client>;

beforeAll((done: any) => {
  httpServer.listen(PORT, () => {
    clientSocket = Client(URL);
    clientSocket.on('connect', done);
  });
});

afterAll((done:any) => {
 clientSocket?.close();
  httpServer.close(done);
});

describe('Socket.IO Server', () => {
  it('should broadcast a message to other clients', (done:any) => {
    const secondSocket = Client(URL);

    secondSocket.on('connect', () => {
      secondSocket.on('message', (data: string) => {
        expect(data).toBe('Hello test');
        secondSocket.close();
        done();
      });

      clientSocket.emit('message', 'Hello test');
    });
    
  });
  it('should broadcast a message2 to other clients', (done:any) => {
    const secondSocket = Client(URL);

    secondSocket.on('connect', () => {
      secondSocket.on('message', (data: string) => {
        expect(data).toBe('Hello test2');
        secondSocket.close();
        done();
      });

      clientSocket.emit('message', 'Hello test2');
    });
    
  });
});
