import { expect, test } from 'bun:test';
import { combineCspHeaders } from '../src/utils/cspHelpers';
import {
    normalizeHeaderValue,
    normalizeCspValue,
} from '../src/utils/headerNormalizers';

test('combineCspHeaders should return null for both null inputs', () => {
    expect(combineCspHeaders(null, null)).toBeNull();
});

test('combineCspHeaders should return newCsp when existingCsp is null', () => {
    const newCsp = "default-src 'self'";
    expect(combineCspHeaders(null, newCsp)).toBe(newCsp);
});

test('combineCspHeaders should return existingCsp when newCsp is null', () => {
    const existingCsp = "default-src 'self'";
    expect(combineCspHeaders(existingCsp, null)).toBe(existingCsp);
});

test('combineCspHeaders should combine two CSP headers', () => {
    const existingCsp = "default-src 'self'; script-src 'unsafe-inline'";
    const newCsp = "script-src 'self'; img-src 'none'";
    const expectedCsp =
        "default-src 'self'; script-src 'unsafe-inline' 'self'; img-src 'none'";
    expect(combineCspHeaders(existingCsp, newCsp)).toBe(expectedCsp);
});

test('combineCspHeaders should handle duplicate directives correctly', () => {
    const existingCsp = "default-src 'self'; script-src 'unsafe-inline'";
    const newCsp = "script-src 'unsafe-inline' 'self'";
    const expectedCsp = "default-src 'self'; script-src 'unsafe-inline' 'self'";
    expect(combineCspHeaders(existingCsp, newCsp)).toBe(expectedCsp);
});

test('normalizeHeaderValue should return null for null input', () => {
    expect(normalizeHeaderValue(null)).toBeNull();
});

test('normalizeHeaderValue should trim whitespace from string input', () => {
    expect(normalizeHeaderValue('  test  ')).toBe('test');
});

test('normalizeHeaderValue should join array of strings with a comma and space', () => {
    expect(normalizeHeaderValue(['value1', 'value2'])).toBe('value1, value2');
});

test('normalizeHeaderValue should convert number to string', () => {
    expect(normalizeHeaderValue(123)).toBe('123');
});

test('normalizeCspValue should trim whitespace from string input', () => {
    expect(normalizeCspValue('  directive  ')).toBe('directive');
});

test('normalizeCspValue should join array of strings with a space', () => {
    expect(normalizeCspValue(['directive1', 'directive2'])).toBe(
        'directive1 directive2',
    );
});
