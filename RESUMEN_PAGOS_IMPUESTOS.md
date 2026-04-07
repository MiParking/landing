# Resumen pagos, comisiones e implementación (MiParking con Kushki)

> Nota: este resumen es operativo y no reemplaza asesoría contable/tributaria.

---

## 1) Regla comercial definida

- Comisión MiParking: **15% IVA incluido**
- Mensaje simple:
  - "MiParking retiene 15% y el anfitrión recibe 85%"

---

## 2) Ejemplo de reparto

Reserva de **$10.000**:

- Cliente paga: **$10.000**
- Comisión MiParking: **$1.500**
- Anfitrión recibe: **$8.500**

Desglose interno de la comisión:

- Base neta: **$1.260,50**
- IVA: **$239,50**

---

## 3) Modelo elegido: Intermediación (escenario B con Kushki)

- MiParking actúa como **intermediario**
- El anfitrión es quien presta el servicio
- MiParking:
  - cobra al cliente
  - retiene comisión
  - transfiere el resto

👉 Importante:
- **No todo lo que recibes es ingreso tuyo**
- La parte del anfitrión es un **pasivo (dinero por pagar)**

---

## 4) Cómo funciona con :contentReference[oaicite:0]{index=0}

Kushki NO hace split automático.

Flujo real:

1. Cliente paga → recibes 100%
2. Calculas:
   - comisión
   - monto anfitrión
3. Ejecutas payout (transferencia bancaria)
4. Actualizas estado

👉 Es un modelo de **split manual automatizado**

---

## 5) Registro contable simplificado

### Al recibir el pago ($10.000)

- Banco: +$10.000  
- Pasivo por pagar a anfitrión: +$8.500  
- Ingreso por comisión: +$1.260,50  
- IVA débito: +$239,50  

👉 Clave: solo tu comisión es ingreso

---

### Al pagar al anfitrión ($8.500)

- Pasivo: -$8.500  
- Banco: -$8.500  

---

## 6) Pagos a anfitriones (estrategia recomendada)

### Frecuencia: **pagos semanales**

Regla sugerida:

- Periodo: lunes a domingo  
- Pago: lunes siguiente  

### Ventana de seguridad

- No pagar inmediatamente
- Esperar al siguiente ciclo semanal

👉 Esto protege de:
- cancelaciones  
- reclamos  
- errores  

---

## 7) Flujo operativo

1. Usuario paga
2. Guardas:
   - total
   - comisión
   - IVA
   - monto anfitrión
3. Estado: `pending_payout`
4. Proceso semanal:
   - agrupar por anfitrión
   - ejecutar payout
5. Estado: `paid_out`

---

## 8) Modelo de datos recomendado

```ts
Payment {
  id
  totalAmount
  commissionAmount
  ivaAmount
  hostAmount
  status // paid, pending_payout, paid_out
}

Payout {
  id
  hostId
  totalAmount
  status
  createdAt
}

PayoutItem {
  payoutId
  paymentId
  amount
}