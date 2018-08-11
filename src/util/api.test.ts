import { Product } from '../core/models/product';
import { toCamelCase } from '../util/case';
import {
  fetchUserByName,
  fetchExtensionManifest,
  fetchUserInfo,
  fetchProducts,
  fetchNewRelease
} from './api';
import {
  mockFetchError,
  mockFetchForExtensionManifest,
  mockFetchForUserByName,
  mockFetchForUserInfo,
  mockFetchProducts,
  mockFetchNewRelease
} from '../tests/mocks';

let globalAny = global as any;

describe('api', () => {
  describe('fetchUserByName', () => {
    it('should return data', async function () {
      globalAny.fetch = jest.fn().mockImplementation(mockFetchForUserByName);
      try {
        const data = await fetchUserByName('127.0.0.1:8080', 'clientId', 'username');
        expect(data).toBeDefined();
      } catch (e) {}
    });

    it('on error should be fired ', async function () {
      expect.assertions(1);
      globalAny.fetch = jest.fn().mockImplementation(mockFetchError);
      fetchUserByName('127.0.0.1:8080', 'clientId', '').catch((error) => {
        expect(error).toEqual('Fake error');
      });
    });
  })

  describe('fetchExtensionManifest', () => {
    beforeEach(function() {
      globalAny.fetch = jest.fn().mockImplementation(mockFetchForExtensionManifest);
    });

    it('should return data', async function () {
      const data = await fetchExtensionManifest('127.0.0.1:8080', 'clientId', 'version', 'jwt');
      expect(data).toBeDefined();
    });
  });

  describe('fetchUserInfo', () => {
    beforeEach(() => {
      globalAny.fetch = jest.fn().mockImplementation(mockFetchForUserInfo);
    });

    it('should return data', async function () {
      const data = await fetchUserInfo('token');
      expect(data).toBeDefined();
    });

    it('on error should fire', async function () {
      expect.assertions(1);

      globalAny.fetch = jest.fn().mockImplementation(mockFetchError);
      fetchUserInfo('token').catch((error) => {
      expect(error).toEqual('Fake error');
    });
    });
  });

  describe('toCamelCase', () => {
    const data: any = {
      config: {
        viewerUrl: 'test',
      },
      live_config: {
        viewerUrl: 'test',
      },
      video_overlay: {
        viewerUrl: 'test',
      },
      panel: {
        viewerUrl: 'test',
        height: 300,
      },
    };

    it('should convert camel case correctly', () => {
      const results = toCamelCase(data);
      expect(results.config.viewerUrl).toBe('test');
      expect(results.liveConfig.viewerUrl).toBe('test');
      expect(results.videoOverlay.viewerUrl).toBe('test');
      expect(results.panel.viewerUrl).toBe('test');
    });
  });

  describe('fetchProducts', () => {
    beforeEach(function() {
      globalAny.fetch = jest.fn().mockImplementation(mockFetchProducts);
    });

    it('should return products', async function () {
      const products = await fetchProducts('127.0.0.1:8080', 'clientId', '');
      expect(products).toBeDefined();
    });

    it('should serialize products correctly', async function () {
      const products = await fetchProducts('127.0.0.1:8080', 'clientId', '')
      expect(products).toHaveLength(2);
      products.forEach((product: Product) => {
        expect(product).toMatchObject({
          sku: expect.any(String),
          displayName: expect.any(String),
          amount: expect.stringMatching(/[1-9]\d*/),
          inDevelopment: expect.stringMatching(/true|false/),
          broadcast: expect.stringMatching(/true|false/)
        });
      });
    });
  });

  describe('fetchNewRelease', () => {
    beforeEach(function() {
      globalAny.fetch = jest.fn().mockImplementation(mockFetchNewRelease);
    });


    it('should return data', async function () {
      const data = await fetchNewRelease();
      expect(data).toBeDefined();
    });

    it('on error should fire', async function () {
      expect.assertions(1);

      globalAny.fetch = jest.fn().mockImplementation(mockFetchError);
      fetchNewRelease().catch((error) => {
        expect(error).toEqual('Fake error');
      });
    });
  });
});
