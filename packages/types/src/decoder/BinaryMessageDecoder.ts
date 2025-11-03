/**
 * Protocol Buffers 바이너리 메시지 디코더
 * 서버에서 전송하는 바이너리 WebSocket 메시지를 디코딩합니다.
 *
 * 메시지 구조:
 * [타입코드(1byte)][Protocol Buffers 데이터(N bytes)]
 */

import {
  MarketQuoteList,
  MarketOrderBook,
  OrderBookCancel,
  OrderReceived,
  OrderRejected,
  OrderExecuted,
  BalanceUpdated,
  DepositUpdated,
  type IMarketQuoteList,
  type IMarketOrderBook,
  type IOrderBookCancel,
  type IOrderReceived,
  type IOrderRejected,
  type IOrderExecuted,
  type IBalanceUpdated,
  type IDepositUpdated,
} from '../proto/realtime_message.js';

/**
 * Protocol Buffers 메시지 타입 코드
 * 서버의 ProtoMessageType enum과 일치해야 함
 */
export enum ProtoMessageType {
  MARKET_QUOTE_LIST = 1,
  MARKET_ORDER_BOOK = 2,
  MARKET_ORDER_BOOK_CANCEL = 3,
  ORDER_ACCEPTED = 4,
  ORDER_REJECTED = 5,
  ORDER_EXECUTED = 6,
  ACCOUNT_BALANCE_UPDATE = 7,
  DEPOSIT_UPDATED = 8,
}

/**
 * 디코딩된 메시지 인터페이스
 */
export interface DecodedMessage<T = any> {
  messageType: string;
  typeCode: number;
  data: T;
}

/**
 * Protocol Buffers 바이너리 메시지 디코더 클래스
 */
export class BinaryMessageDecoder {
  /**
   * Long 타입을 number로 변환
   */
  private static convertLongToNumber(value: any): number {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string') {
      return parseInt(value, 10);
    }
    if (value && typeof value === 'object' && 'toNumber' in value) {
      return value.toNumber();
    }
    if (value && typeof value === 'object' && 'low' in value && 'high' in value) {
      // LongBits 객체
      return value.low;
    }
    return Number(value);
  }

  /**
   * 메시지 타입 코드로 메시지 타입명 반환
   */
  private static getMessageTypeName(typeCode: number): string {
    const typeMap: Record<number, string> = {
      [ProtoMessageType.MARKET_QUOTE_LIST]: 'MARKET_QUOTE_LIST',
      [ProtoMessageType.MARKET_ORDER_BOOK]: 'MARKET_ORDER_BOOK',
      [ProtoMessageType.MARKET_ORDER_BOOK_CANCEL]: 'MARKET_ORDER_BOOK_CANCEL',
      [ProtoMessageType.ORDER_ACCEPTED]: 'ORDER_ACCEPTED',
      [ProtoMessageType.ORDER_REJECTED]: 'ORDER_REJECTED',
      [ProtoMessageType.ORDER_EXECUTED]: 'ORDER_EXECUTED',
      [ProtoMessageType.ACCOUNT_BALANCE_UPDATE]: 'ACCOUNT_BALANCE_UPDATE',
      [ProtoMessageType.DEPOSIT_UPDATED]: 'DEPOSIT_UPDATED',
    };

    return typeMap[typeCode] || 'UNKNOWN';
  }

  /**
   * MarketQuoteList 디코딩
   */
  static decodeMarketQuoteList(protoData: Uint8Array): IMarketQuoteList {
    try {
      const decoded = MarketQuoteList.decode(protoData);
      const plain = MarketQuoteList.toObject(decoded, {
        longs: Number,
        defaults: true,
      });

      // Long 타입 변환
      if (plain.quotes) {
        plain.quotes = plain.quotes.map((quote: any) => ({
          ...quote,
          timestamp: this.convertLongToNumber(quote.timestamp),
        }));
      }

      return plain;
    } catch (error) {
      console.error('[BinaryMessageDecoder] MarketQuoteList 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * MarketOrderBook 디코딩
   */
  static decodeMarketOrderBook(protoData: Uint8Array): IMarketOrderBook {
    try {
      const decoded = MarketOrderBook.decode(protoData);
      const plain = MarketOrderBook.toObject(decoded, {
        longs: Number,
        defaults: true,
      });

      // Long 타입 변환
      plain.timestamp = this.convertLongToNumber(plain.timestamp);

      return plain;
    } catch (error) {
      console.error('[BinaryMessageDecoder] MarketOrderBook 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * OrderBookCancel 디코딩
   */
  static decodeOrderBookCancel(protoData: Uint8Array): IOrderBookCancel {
    try {
      const decoded = OrderBookCancel.decode(protoData);
      const plain = OrderBookCancel.toObject(decoded, {
        longs: Number,
        defaults: true,
      });

      // Long 타입 변환
      plain.timestamp = this.convertLongToNumber(plain.timestamp);

      return plain;
    } catch (error) {
      console.error('[BinaryMessageDecoder] OrderBookCancel 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * OrderReceived (주문 접수) 디코딩
   */
  static decodeOrderReceived(protoData: Uint8Array): IOrderReceived {
    try {
      const decoded = OrderReceived.decode(protoData);
      const plain = OrderReceived.toObject(decoded, {
        longs: Number,
        defaults: true,
      });

      return plain;
    } catch (error) {
      console.error('[BinaryMessageDecoder] OrderReceived 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * OrderRejected (주문 거부) 디코딩
   */
  static decodeOrderRejected(protoData: Uint8Array): IOrderRejected {
    try {
      const decoded = OrderRejected.decode(protoData);
      const plain = OrderRejected.toObject(decoded, {
        longs: Number,
        defaults: true,
      });

      return plain;
    } catch (error) {
      console.error('[BinaryMessageDecoder] OrderRejected 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * OrderExecuted (주문 체결) 디코딩
   */
  static decodeOrderExecuted(protoData: Uint8Array): IOrderExecuted {
    try {
      const decoded = OrderExecuted.decode(protoData);
      const plain = OrderExecuted.toObject(decoded, {
        longs: Number,
        defaults: true,
      });

      return plain;
    } catch (error) {
      console.error('[BinaryMessageDecoder] OrderExecuted 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * BalanceUpdated (잔고 수정) 디코딩
   */
  static decodeBalanceUpdated(protoData: Uint8Array): IBalanceUpdated {
    try {
      const decoded = BalanceUpdated.decode(protoData);
      const plain = BalanceUpdated.toObject(decoded, {
        longs: Number,
        defaults: true,
      });

      return plain;
    } catch (error) {
      console.error('[BinaryMessageDecoder] BalanceUpdated 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * DepositUpdated (예수금 수정) 디코딩
   */
  static decodeDepositUpdated(protoData: Uint8Array): IDepositUpdated {
    try {
      const decoded = DepositUpdated.decode(protoData);
      const plain = DepositUpdated.toObject(decoded, {
        longs: Number,
        defaults: true,
      });

      return plain;
    } catch (error) {
      console.error('[BinaryMessageDecoder] DepositUpdated 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * 통합 디코딩 함수
   * @param data - ArrayBuffer 또는 Uint8Array
   * @returns 디코딩된 메시지 객체
   */
  static decode(data: ArrayBuffer | Uint8Array): DecodedMessage {
    // ArrayBuffer를 Uint8Array로 변환
    const uint8Array = data instanceof ArrayBuffer ? new Uint8Array(data) : data;

    // 메시지가 너무 짧으면 오류
    if (uint8Array.length < 2) {
      throw new Error(`메시지가 너무 짧습니다: ${uint8Array.length} bytes`);
    }

    // 첫 번째 바이트 = 메시지 타입 코드
    const typeCode = uint8Array[0];

    // 나머지 바이트 = 실제 Protocol Buffers 데이터
    const protoData = uint8Array.slice(1);

    // 메시지 타입명
    const messageType = this.getMessageTypeName(typeCode);

    // 타입 코드에 따라 적절한 메시지로 디코딩
    switch (typeCode) {
      case ProtoMessageType.MARKET_QUOTE_LIST:
        return {
          messageType,
          typeCode,
          data: this.decodeMarketQuoteList(protoData),
        };

      case ProtoMessageType.MARKET_ORDER_BOOK:
        return {
          messageType,
          typeCode,
          data: this.decodeMarketOrderBook(protoData),
        };

      case ProtoMessageType.MARKET_ORDER_BOOK_CANCEL:
        return {
          messageType,
          typeCode,
          data: this.decodeOrderBookCancel(protoData),
        };

      case ProtoMessageType.ORDER_ACCEPTED:
        return {
          messageType,
          typeCode,
          data: this.decodeOrderReceived(protoData),
        };

      case ProtoMessageType.ORDER_REJECTED:
        return {
          messageType,
          typeCode,
          data: this.decodeOrderRejected(protoData),
        };

      case ProtoMessageType.ORDER_EXECUTED:
        return {
          messageType,
          typeCode,
          data: this.decodeOrderExecuted(protoData),
        };

      case ProtoMessageType.ACCOUNT_BALANCE_UPDATE:
        return {
          messageType,
          typeCode,
          data: this.decodeBalanceUpdated(protoData),
        };

      case ProtoMessageType.DEPOSIT_UPDATED:
        return {
          messageType,
          typeCode,
          data: this.decodeDepositUpdated(protoData),
        };

      default:
        throw new Error(`알 수 없는 메시지 타입 코드: ${typeCode}`);
    }
  }

  /**
   * Blob 데이터 디코딩 (비동기)
   */
  static async decodeBlob(blob: Blob): Promise<DecodedMessage> {
    const arrayBuffer = await blob.arrayBuffer();
    return this.decode(arrayBuffer);
  }
}
