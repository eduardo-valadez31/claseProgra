import { describe, it, expect, beforeAll } from 'vitest';
import { hashPassword, comparePassword } from '../../../src/utils/password.util.ts';

describe('Utilidad de Contraseñas (password.util.ts)', () => {
  const password1 = "ClaveUno123!";
  const password2 = "ClaveDos456!";
  
  let hash1: string;
  let hash2: string;

  beforeAll(async () => {
    hash1 = await hashPassword(password1);
    hash2 = await hashPassword(password2);
  });

  it('debe generar hashes que sean cadenas no vacías y diferentes de su contraseña original', () => {
    // Validaciones para hash1
    expect(typeof hash1).toBe('string');
    expect(hash1.length).toBeGreaterThan(0);
    expect(hash1).not.toBe(password1);

    expect(typeof hash2).toBe('string');
    expect(hash2.length).toBeGreaterThan(0);
    expect(hash2).not.toBe(password2);
  });

  it('debe devolver true al comparar las contraseñas correctas con sus respectivos hashes', async () => {
    const isValid1 = await comparePassword(password1, hash1);
    const isValid2 = await comparePassword(password2, hash2);

    expect(isValid1).toBe(true);
    expect(isValid2).toBe(true);
  });

  it('debe devolver false al cruzar las contraseñas (incorrectas) con los hashes', async () => {
    // Se evalúa password2 con hash1, y password1 con hash2
    const isInvalid1 = await comparePassword(password2, hash1);
    const isInvalid2 = await comparePassword(password1, hash2);

    expect(isInvalid1).toBe(false);
    expect(isInvalid2).toBe(false);
  });
});