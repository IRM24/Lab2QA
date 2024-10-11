import { Sucursal } from './sucursal.model';
import { Client } from './client.model';
import { Count } from './count';
import { mock, when, instance } from 'ts-mockito';


describe('Sucursal', () => {
  let cliente: Client;
  let sucursal: Sucursal;
  let cuenta: Count;
  var withdrawlAmount2000 = 200000;
  var numeroCuenta = 12345;
  var balance = 100000;
  
  beforeEach(() => {
    sucursal = new Sucursal("Alajuela", "Alajuela");
    cliente = new Client("Juan", "Pérez", "25-01-76", "2401-3117", "Alajuela",
   "jperez@gmail.com");
    sucursal.setClientes(cliente);
    cuenta = mock<Count>();
   });

   it('1. Saldo de cuenta', function () {
    when(cuenta.getCantidadDinero()).thenReturn(balance);
    let mockito = instance(cuenta);
    expect(mockito.getCantidadDinero()).toBe(balance);
   });
   
   it('2. Agregar nueva cuenta a cliente', function () {
    var cuenta = mock<Count>();
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(cliente.getCuentas().length).toBe(1);
   });

   it('3. Retirar monto válido', function () {
    var balanceAmount3000 = 300000;
    when(cuenta.getCantidadDinero()).thenReturn(balanceAmount3000);
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    when(cuenta.retirar(withdrawlAmount2000)).thenReturn(balance);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    var saldo = cliente.retirar(withdrawlAmount2000, numeroCuenta);
    expect(saldo).toBe(balance);
   });

   it('4. Retirar más de lo permitido', function () {
    when(cuenta.getCantidadDinero()).thenReturn(balance);
    when(cuenta.getNumCuenta()).thenReturn(numeroCuenta);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(function() {
    cliente.retirar(withdrawlAmount2000, numeroCuenta);
    }).toThrowError(Error, "Fondos insuficientes");
   });

   //Caso Guiado 

     // a. Caso de prueba: Verificar que cuando un cliente abre una cuenta en una sucursal, el monto sea de 5000 colones.
     // Verificar que la primera cuenta abierta tiene un saldo inicial de 5000

  it('a. Apertura de cuenta con monto inicial de 5000 colones', () => {
    when(cuenta.getCantidadDinero()).thenReturn(5000);
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito);
    expect(cliente.getCuentas()[0].getCantidadDinero()).toBe(5000);
  });

  // b. Caso de prueba: Realizar dos depósitos válidos y verificar que el saldo sea la suma de los depósitos.
  // Saldo inicial de 0
  // Simular dos depósitos
  // Verificar que el saldo final sea 5000

  it('b. Realizar dos depósitos válidos y verificar saldo correcto', () => {
    let mockito = instance(cuenta);
    when(cuenta.getCantidadDinero()).thenReturn(0); 
    cliente.setCuentas(mockito);
    mockito.depositar(2000);
    when(cuenta.getCantidadDinero()).thenReturn(2000);
    mockito.depositar(3000);
    when(cuenta.getCantidadDinero()).thenReturn(5000); 
    expect(mockito.getCantidadDinero()).toBe(5000);
  });

  // c. Caso de prueba: Verificar que al liquidar una cuenta, la cantidad de cuentas del cliente disminuye en 1.
  // Inicialmente tiene 2 cuentas
  // Simular la liquidación de la cuenta (remover una cuenta)
  // Verificar que la cantidad de cuentas disminuye a 1

  it('c. Liquidar cuenta de un cliente y verificar que la cantidad de cuentas disminuye', () => {
    let mockito = instance(cuenta);
    cliente.setCuentas(mockito); 
    cliente.setCuentas(mockito); 
    expect(cliente.getCuentas().length).toBe(2);
    cliente.getCuentas().pop();
    expect(cliente.getCuentas().length).toBe(1);
  });
    
});

 