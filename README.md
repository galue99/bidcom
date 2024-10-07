# Link Tracker - NestJS Challenge

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![NPM License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![NPM Downloads](https://img.shields.io/npm/dm/@nestjs/common.svg)](https://www.npmjs.com/~nestjscore)
[![CircleCI](https://img.shields.io/circleci/build/github/nestjs/nest/master)](https://circleci.com/gh/nestjs/nest)
[![Coverage](https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9)](https://coveralls.io/github/nestjs/nest?branch=master)
[![Discord](https://img.shields.io/badge/discord-online-brightgreen.svg)](https://discord.gg/G7Qnnhy)

## Descripción

Este proyecto es una aplicación de seguimiento y enmascaramiento de URLs, que permite:

- Crear enlaces enmascarados a partir de una URL válida.
- Redirigir a la URL original desde el enlace enmascarado.
- Obtener estadísticas sobre cuántas veces se redirigió a un enlace.
- Invalidar un enlace.
- Definir contraseñas y fechas de expiración para enlaces enmascarados.

Este proyecto está desarrollado con [NestJS](https://nestjs.com/), un framework progresivo de Node.js.

## Casos de uso

### A) Funcionalidades principales

1. **Crear un enlace**:
    - `POST /create`: Crea un link a partir de una URL válida y devuelve un JSON con la URL enmascarada.

2. **Redirección**:
    - `GET /l/:id`: Redirige a la URL original siempre y cuando el link sea válido. En caso contrario, devuelve un error 404.

3. **Estadísticas por link**:
    - `GET /l/:id/stats`: Devuelve la estadística de cuántas veces se ha redirigido desde ese enlace.

4. **Invalidar link**:
    - `PUT /l/:id/invalidate`: Invalida un link específico.

### B) Funcionalidades adicionales

1. **Contraseña opcional**: Al crear los enlaces, se puede agregar una contraseña que será un parámetro de la query en la redirección. Ejemplo:
    - `http://localhost:8080/l/aBsJu?password=123`

2. **Fecha de expiración**: Los enlaces también pueden tener una fecha de expiración, luego de la cual serán considerados inválidos y devolverán un error 404.

## Instalación

Clona el repositorio y luego instala las dependencias:

```bash
$ npm install
```

## Ejecutar la aplicación

```bash
# Modo desarrollo
$ npm run start

# Modo observación
$ npm run start:dev

# Modo producción
$ npm run start:prod
```

## Pruebas

```bash
# Pruebas unitarias
$ npm run test

# Pruebas E2E
$ npm run test:e2e

# Cobertura de pruebas
$ npm run test:cov
```

## Endpoints de la aplicación

### Crear un enlace enmascarado
- **GET** `/health`
    - Respuesta: 'Success'.

### Crear un enlace enmascarado
- **POST** `/create`
    - Parámetros (body): `target` (URL original), `password` (opcional), `expirationDate` (opcional).
    - Respuesta: URL enmascarada.

### Redirigir a la URL original
- **GET** `/l/:id`
    - Parámetros (query): `password` (opcional).
    - Respuesta: Redirige a la URL original si es válida.

### Obtener estadísticas de un enlace
- **GET** `/l/:id/stats`
    - Respuesta: Número de redirecciones realizadas.

### Invalidar un enlace
- **PUT** `/l/:id/invalidate`
    - Respuesta: Mensaje confirmando la invalidación del enlace.

## Soporte

Nest es un proyecto de código abierto licenciado bajo MIT. Si deseas apoyar su crecimiento, [lee más aquí](https://docs.nestjs.com/support).

## Licencia

Nest está licenciado bajo [MIT](LICENSE).
