import { describe, it, expect, beforeEach } from 'vitest';
import { SHA256 } from '.';
import { HashAlgorithm } from '../HashAlgorithm';

describe('SHA256', () => {
  let sha256: HashAlgorithm;

  beforeEach(() => {
    sha256 = new SHA256();
  });

  it('ハッシュアルゴリズムの名前を取得', () => {
    expect(sha256.algorithmName).toBe('sha256');
  });

  it('チェックサムを取得', () => {
    expect(sha256.checkSum).toBe('fe4e545983');
  });

  it('ハッシュ値の計算', () => {
    const data = 'APOSTILLE';
    const expectedHash = 'd79bf856c6add6bd1ef4915438fb211a6fe998ddfc6418b2bef1016b56576302';
    expect(sha256.calcHash(data)).toBe(expectedHash);
  });
});