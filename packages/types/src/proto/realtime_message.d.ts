import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a MarketQuote. */
export interface IMarketQuote {

    /** MarketQuote stockCd */
    stockCd?: (string|null);

    /** MarketQuote bid */
    bid?: (number|null);

    /** MarketQuote ask */
    ask?: (number|null);

    /** MarketQuote bidSize */
    bidSize?: (number|null);

    /** MarketQuote askSize */
    askSize?: (number|null);

    /** MarketQuote timestamp */
    timestamp?: (number|Long|null);
}

/** Represents a MarketQuote. */
export class MarketQuote implements IMarketQuote {

    /**
     * Constructs a new MarketQuote.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMarketQuote);

    /** MarketQuote stockCd. */
    public stockCd: string;

    /** MarketQuote bid. */
    public bid: number;

    /** MarketQuote ask. */
    public ask: number;

    /** MarketQuote bidSize. */
    public bidSize: number;

    /** MarketQuote askSize. */
    public askSize: number;

    /** MarketQuote timestamp. */
    public timestamp: (number|Long);

    /**
     * Creates a new MarketQuote instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MarketQuote instance
     */
    public static create(properties?: IMarketQuote): MarketQuote;

    /**
     * Encodes the specified MarketQuote message. Does not implicitly {@link MarketQuote.verify|verify} messages.
     * @param message MarketQuote message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMarketQuote, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MarketQuote message, length delimited. Does not implicitly {@link MarketQuote.verify|verify} messages.
     * @param message MarketQuote message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMarketQuote, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MarketQuote message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MarketQuote
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MarketQuote;

    /**
     * Decodes a MarketQuote message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MarketQuote
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MarketQuote;

    /**
     * Verifies a MarketQuote message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MarketQuote message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MarketQuote
     */
    public static fromObject(object: { [k: string]: any }): MarketQuote;

    /**
     * Creates a plain object from a MarketQuote message. Also converts values to other types if specified.
     * @param message MarketQuote
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MarketQuote, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MarketQuote to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for MarketQuote
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a MarketQuoteList. */
export interface IMarketQuoteList {

    /** MarketQuoteList quotes */
    quotes?: (IMarketQuote[]|null);
}

/** Represents a MarketQuoteList. */
export class MarketQuoteList implements IMarketQuoteList {

    /**
     * Constructs a new MarketQuoteList.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMarketQuoteList);

    /** MarketQuoteList quotes. */
    public quotes: IMarketQuote[];

    /**
     * Creates a new MarketQuoteList instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MarketQuoteList instance
     */
    public static create(properties?: IMarketQuoteList): MarketQuoteList;

    /**
     * Encodes the specified MarketQuoteList message. Does not implicitly {@link MarketQuoteList.verify|verify} messages.
     * @param message MarketQuoteList message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMarketQuoteList, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MarketQuoteList message, length delimited. Does not implicitly {@link MarketQuoteList.verify|verify} messages.
     * @param message MarketQuoteList message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMarketQuoteList, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MarketQuoteList message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MarketQuoteList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MarketQuoteList;

    /**
     * Decodes a MarketQuoteList message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MarketQuoteList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MarketQuoteList;

    /**
     * Verifies a MarketQuoteList message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MarketQuoteList message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MarketQuoteList
     */
    public static fromObject(object: { [k: string]: any }): MarketQuoteList;

    /**
     * Creates a plain object from a MarketQuoteList message. Also converts values to other types if specified.
     * @param message MarketQuoteList
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MarketQuoteList, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MarketQuoteList to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for MarketQuoteList
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a Quote. */
export interface IQuote {

    /** Quote bid */
    bid?: (number|null);

    /** Quote ask */
    ask?: (number|null);

    /** Quote bidSize */
    bidSize?: (number|null);

    /** Quote askSize */
    askSize?: (number|null);
}

/** Represents a Quote. */
export class Quote implements IQuote {

    /**
     * Constructs a new Quote.
     * @param [properties] Properties to set
     */
    constructor(properties?: IQuote);

    /** Quote bid. */
    public bid: number;

    /** Quote ask. */
    public ask: number;

    /** Quote bidSize. */
    public bidSize: number;

    /** Quote askSize. */
    public askSize: number;

    /**
     * Creates a new Quote instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Quote instance
     */
    public static create(properties?: IQuote): Quote;

    /**
     * Encodes the specified Quote message. Does not implicitly {@link Quote.verify|verify} messages.
     * @param message Quote message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IQuote, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Quote message, length delimited. Does not implicitly {@link Quote.verify|verify} messages.
     * @param message Quote message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IQuote, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Quote message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Quote
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Quote;

    /**
     * Decodes a Quote message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Quote
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Quote;

    /**
     * Verifies a Quote message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Quote message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Quote
     */
    public static fromObject(object: { [k: string]: any }): Quote;

    /**
     * Creates a plain object from a Quote message. Also converts values to other types if specified.
     * @param message Quote
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Quote, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Quote to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Quote
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a MarketOrderBook. */
export interface IMarketOrderBook {

    /** MarketOrderBook stockCd */
    stockCd?: (string|null);

    /** MarketOrderBook quotes */
    quotes?: (IQuote[]|null);

    /** MarketOrderBook timestamp */
    timestamp?: (number|Long|null);
}

/** Represents a MarketOrderBook. */
export class MarketOrderBook implements IMarketOrderBook {

    /**
     * Constructs a new MarketOrderBook.
     * @param [properties] Properties to set
     */
    constructor(properties?: IMarketOrderBook);

    /** MarketOrderBook stockCd. */
    public stockCd: string;

    /** MarketOrderBook quotes. */
    public quotes: IQuote[];

    /** MarketOrderBook timestamp. */
    public timestamp: (number|Long);

    /**
     * Creates a new MarketOrderBook instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MarketOrderBook instance
     */
    public static create(properties?: IMarketOrderBook): MarketOrderBook;

    /**
     * Encodes the specified MarketOrderBook message. Does not implicitly {@link MarketOrderBook.verify|verify} messages.
     * @param message MarketOrderBook message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IMarketOrderBook, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified MarketOrderBook message, length delimited. Does not implicitly {@link MarketOrderBook.verify|verify} messages.
     * @param message MarketOrderBook message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IMarketOrderBook, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MarketOrderBook message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MarketOrderBook
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): MarketOrderBook;

    /**
     * Decodes a MarketOrderBook message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MarketOrderBook
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): MarketOrderBook;

    /**
     * Verifies a MarketOrderBook message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a MarketOrderBook message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MarketOrderBook
     */
    public static fromObject(object: { [k: string]: any }): MarketOrderBook;

    /**
     * Creates a plain object from a MarketOrderBook message. Also converts values to other types if specified.
     * @param message MarketOrderBook
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: MarketOrderBook, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this MarketOrderBook to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for MarketOrderBook
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an OrderBookCancel. */
export interface IOrderBookCancel {

    /** OrderBookCancel cancelType */
    cancelType?: (string|null);

    /** OrderBookCancel stockCd */
    stockCd?: (string|null);

    /** OrderBookCancel timestamp */
    timestamp?: (number|Long|null);
}

/** Represents an OrderBookCancel. */
export class OrderBookCancel implements IOrderBookCancel {

    /**
     * Constructs a new OrderBookCancel.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOrderBookCancel);

    /** OrderBookCancel cancelType. */
    public cancelType: string;

    /** OrderBookCancel stockCd. */
    public stockCd: string;

    /** OrderBookCancel timestamp. */
    public timestamp: (number|Long);

    /**
     * Creates a new OrderBookCancel instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OrderBookCancel instance
     */
    public static create(properties?: IOrderBookCancel): OrderBookCancel;

    /**
     * Encodes the specified OrderBookCancel message. Does not implicitly {@link OrderBookCancel.verify|verify} messages.
     * @param message OrderBookCancel message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOrderBookCancel, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OrderBookCancel message, length delimited. Does not implicitly {@link OrderBookCancel.verify|verify} messages.
     * @param message OrderBookCancel message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOrderBookCancel, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OrderBookCancel message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OrderBookCancel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OrderBookCancel;

    /**
     * Decodes an OrderBookCancel message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OrderBookCancel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OrderBookCancel;

    /**
     * Verifies an OrderBookCancel message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OrderBookCancel message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OrderBookCancel
     */
    public static fromObject(object: { [k: string]: any }): OrderBookCancel;

    /**
     * Creates a plain object from an OrderBookCancel message. Also converts values to other types if specified.
     * @param message OrderBookCancel
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OrderBookCancel, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OrderBookCancel to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for OrderBookCancel
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an OrderReceived. */
export interface IOrderReceived {

    /** OrderReceived accountNo */
    accountNo?: (string|null);

    /** OrderReceived orderDate */
    orderDate?: (string|null);

    /** OrderReceived orderNo */
    orderNo?: (string|null);

    /** OrderReceived stockCd */
    stockCd?: (string|null);

    /** OrderReceived orderVersionCd */
    orderVersionCd?: (string|null);

    /** OrderReceived positionCd */
    positionCd?: (string|null);

    /** OrderReceived orderTypeCd */
    orderTypeCd?: (string|null);

    /** OrderReceived sideCd */
    sideCd?: (string|null);

    /** OrderReceived orderQuantity */
    orderQuantity?: (number|null);

    /** OrderReceived barrierPrice */
    barrierPrice?: (number|null);

    /** OrderReceived orderPrice */
    orderPrice?: (number|null);

    /** OrderReceived profitRealizationBarrierPrice */
    profitRealizationBarrierPrice?: (number|null);

    /** OrderReceived lossCutBarrierPrice */
    lossCutBarrierPrice?: (number|null);

    /** OrderReceived orderBalance */
    orderBalance?: (number|null);

    /** OrderReceived orderStatusCd */
    orderStatusCd?: (string|null);

    /** OrderReceived receptionDate */
    receptionDate?: (string|null);

    /** OrderReceived isProfitExecution */
    isProfitExecution?: (string|null);

    /** OrderReceived isLossLimits */
    isLossLimits?: (string|null);

    /** OrderReceived isLossTracing */
    isLossTracing?: (string|null);

    /** OrderReceived purchaseDate */
    purchaseDate?: (string|null);

    /** OrderReceived balanceNo */
    balanceNo?: (string|null);

    /** OrderReceived totalMargin */
    totalMargin?: (number|null);
}

/** Represents an OrderReceived. */
export class OrderReceived implements IOrderReceived {

    /**
     * Constructs a new OrderReceived.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOrderReceived);

    /** OrderReceived accountNo. */
    public accountNo: string;

    /** OrderReceived orderDate. */
    public orderDate: string;

    /** OrderReceived orderNo. */
    public orderNo: string;

    /** OrderReceived stockCd. */
    public stockCd: string;

    /** OrderReceived orderVersionCd. */
    public orderVersionCd: string;

    /** OrderReceived positionCd. */
    public positionCd: string;

    /** OrderReceived orderTypeCd. */
    public orderTypeCd: string;

    /** OrderReceived sideCd. */
    public sideCd: string;

    /** OrderReceived orderQuantity. */
    public orderQuantity: number;

    /** OrderReceived barrierPrice. */
    public barrierPrice: number;

    /** OrderReceived orderPrice. */
    public orderPrice: number;

    /** OrderReceived profitRealizationBarrierPrice. */
    public profitRealizationBarrierPrice: number;

    /** OrderReceived lossCutBarrierPrice. */
    public lossCutBarrierPrice: number;

    /** OrderReceived orderBalance. */
    public orderBalance: number;

    /** OrderReceived orderStatusCd. */
    public orderStatusCd: string;

    /** OrderReceived receptionDate. */
    public receptionDate: string;

    /** OrderReceived isProfitExecution. */
    public isProfitExecution: string;

    /** OrderReceived isLossLimits. */
    public isLossLimits: string;

    /** OrderReceived isLossTracing. */
    public isLossTracing: string;

    /** OrderReceived purchaseDate. */
    public purchaseDate: string;

    /** OrderReceived balanceNo. */
    public balanceNo: string;

    /** OrderReceived totalMargin. */
    public totalMargin: number;

    /**
     * Creates a new OrderReceived instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OrderReceived instance
     */
    public static create(properties?: IOrderReceived): OrderReceived;

    /**
     * Encodes the specified OrderReceived message. Does not implicitly {@link OrderReceived.verify|verify} messages.
     * @param message OrderReceived message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOrderReceived, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OrderReceived message, length delimited. Does not implicitly {@link OrderReceived.verify|verify} messages.
     * @param message OrderReceived message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOrderReceived, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OrderReceived message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OrderReceived
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OrderReceived;

    /**
     * Decodes an OrderReceived message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OrderReceived
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OrderReceived;

    /**
     * Verifies an OrderReceived message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OrderReceived message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OrderReceived
     */
    public static fromObject(object: { [k: string]: any }): OrderReceived;

    /**
     * Creates a plain object from an OrderReceived message. Also converts values to other types if specified.
     * @param message OrderReceived
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OrderReceived, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OrderReceived to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for OrderReceived
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an OrderRejected. */
export interface IOrderRejected {

    /** OrderRejected accountNo */
    accountNo?: (string|null);

    /** OrderRejected orderDate */
    orderDate?: (string|null);

    /** OrderRejected orderNo */
    orderNo?: (string|null);

    /** OrderRejected stockCd */
    stockCd?: (string|null);

    /** OrderRejected positionCd */
    positionCd?: (string|null);

    /** OrderRejected sideCd */
    sideCd?: (string|null);

    /** OrderRejected rejectQuantity */
    rejectQuantity?: (number|null);

    /** OrderRejected purchaseDate */
    purchaseDate?: (string|null);

    /** OrderRejected balanceNo */
    balanceNo?: (string|null);

    /** OrderRejected totalMargin */
    totalMargin?: (number|null);
}

/** Represents an OrderRejected. */
export class OrderRejected implements IOrderRejected {

    /**
     * Constructs a new OrderRejected.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOrderRejected);

    /** OrderRejected accountNo. */
    public accountNo: string;

    /** OrderRejected orderDate. */
    public orderDate: string;

    /** OrderRejected orderNo. */
    public orderNo: string;

    /** OrderRejected stockCd. */
    public stockCd: string;

    /** OrderRejected positionCd. */
    public positionCd: string;

    /** OrderRejected sideCd. */
    public sideCd: string;

    /** OrderRejected rejectQuantity. */
    public rejectQuantity: number;

    /** OrderRejected purchaseDate. */
    public purchaseDate: string;

    /** OrderRejected balanceNo. */
    public balanceNo: string;

    /** OrderRejected totalMargin. */
    public totalMargin: number;

    /**
     * Creates a new OrderRejected instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OrderRejected instance
     */
    public static create(properties?: IOrderRejected): OrderRejected;

    /**
     * Encodes the specified OrderRejected message. Does not implicitly {@link OrderRejected.verify|verify} messages.
     * @param message OrderRejected message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOrderRejected, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OrderRejected message, length delimited. Does not implicitly {@link OrderRejected.verify|verify} messages.
     * @param message OrderRejected message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOrderRejected, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OrderRejected message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OrderRejected
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OrderRejected;

    /**
     * Decodes an OrderRejected message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OrderRejected
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OrderRejected;

    /**
     * Verifies an OrderRejected message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OrderRejected message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OrderRejected
     */
    public static fromObject(object: { [k: string]: any }): OrderRejected;

    /**
     * Creates a plain object from an OrderRejected message. Also converts values to other types if specified.
     * @param message OrderRejected
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OrderRejected, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OrderRejected to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for OrderRejected
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of an OrderExecuted. */
export interface IOrderExecuted {

    /** OrderExecuted accountNo */
    accountNo?: (string|null);

    /** OrderExecuted orderDate */
    orderDate?: (string|null);

    /** OrderExecuted orderNo */
    orderNo?: (string|null);

    /** OrderExecuted executionQuantity */
    executionQuantity?: (number|null);

    /** OrderExecuted executionPrice */
    executionPrice?: (number|null);

    /** OrderExecuted deposit */
    deposit?: (number|null);

    /** OrderExecuted totalMargin */
    totalMargin?: (number|null);
}

/** Represents an OrderExecuted. */
export class OrderExecuted implements IOrderExecuted {

    /**
     * Constructs a new OrderExecuted.
     * @param [properties] Properties to set
     */
    constructor(properties?: IOrderExecuted);

    /** OrderExecuted accountNo. */
    public accountNo: string;

    /** OrderExecuted orderDate. */
    public orderDate: string;

    /** OrderExecuted orderNo. */
    public orderNo: string;

    /** OrderExecuted executionQuantity. */
    public executionQuantity: number;

    /** OrderExecuted executionPrice. */
    public executionPrice: number;

    /** OrderExecuted deposit. */
    public deposit: number;

    /** OrderExecuted totalMargin. */
    public totalMargin: number;

    /**
     * Creates a new OrderExecuted instance using the specified properties.
     * @param [properties] Properties to set
     * @returns OrderExecuted instance
     */
    public static create(properties?: IOrderExecuted): OrderExecuted;

    /**
     * Encodes the specified OrderExecuted message. Does not implicitly {@link OrderExecuted.verify|verify} messages.
     * @param message OrderExecuted message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IOrderExecuted, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified OrderExecuted message, length delimited. Does not implicitly {@link OrderExecuted.verify|verify} messages.
     * @param message OrderExecuted message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IOrderExecuted, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an OrderExecuted message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns OrderExecuted
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): OrderExecuted;

    /**
     * Decodes an OrderExecuted message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns OrderExecuted
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): OrderExecuted;

    /**
     * Verifies an OrderExecuted message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates an OrderExecuted message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns OrderExecuted
     */
    public static fromObject(object: { [k: string]: any }): OrderExecuted;

    /**
     * Creates a plain object from an OrderExecuted message. Also converts values to other types if specified.
     * @param message OrderExecuted
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: OrderExecuted, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this OrderExecuted to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for OrderExecuted
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a BalanceUpdated. */
export interface IBalanceUpdated {

    /** BalanceUpdated accountNo */
    accountNo?: (string|null);

    /** BalanceUpdated orderDate */
    orderDate?: (string|null);

    /** BalanceUpdated orderNo */
    orderNo?: (string|null);

    /** BalanceUpdated stockCd */
    stockCd?: (string|null);

    /** BalanceUpdated tradeCurrencyCd */
    tradeCurrencyCd?: (string|null);

    /** BalanceUpdated positionCd */
    positionCd?: (string|null);

    /** BalanceUpdated purchaseDate */
    purchaseDate?: (string|null);

    /** BalanceUpdated bookQuantity */
    bookQuantity?: (number|null);

    /** BalanceUpdated liquidationPossibleQuantity */
    liquidationPossibleQuantity?: (number|null);

    /** BalanceUpdated bookPrice */
    bookPrice?: (number|null);

    /** BalanceUpdated currentPrice */
    currentPrice?: (number|null);

    /** BalanceUpdated evaluationProfitLoss */
    evaluationProfitLoss?: (number|null);

    /** BalanceUpdated stockGroupCd */
    stockGroupCd?: (string|null);

    /** BalanceUpdated balanceNo */
    balanceNo?: (string|null);
}

/** Represents a BalanceUpdated. */
export class BalanceUpdated implements IBalanceUpdated {

    /**
     * Constructs a new BalanceUpdated.
     * @param [properties] Properties to set
     */
    constructor(properties?: IBalanceUpdated);

    /** BalanceUpdated accountNo. */
    public accountNo: string;

    /** BalanceUpdated orderDate. */
    public orderDate: string;

    /** BalanceUpdated orderNo. */
    public orderNo: string;

    /** BalanceUpdated stockCd. */
    public stockCd: string;

    /** BalanceUpdated tradeCurrencyCd. */
    public tradeCurrencyCd: string;

    /** BalanceUpdated positionCd. */
    public positionCd: string;

    /** BalanceUpdated purchaseDate. */
    public purchaseDate: string;

    /** BalanceUpdated bookQuantity. */
    public bookQuantity: number;

    /** BalanceUpdated liquidationPossibleQuantity. */
    public liquidationPossibleQuantity: number;

    /** BalanceUpdated bookPrice. */
    public bookPrice: number;

    /** BalanceUpdated currentPrice. */
    public currentPrice: number;

    /** BalanceUpdated evaluationProfitLoss. */
    public evaluationProfitLoss: number;

    /** BalanceUpdated stockGroupCd. */
    public stockGroupCd: string;

    /** BalanceUpdated balanceNo. */
    public balanceNo: string;

    /**
     * Creates a new BalanceUpdated instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BalanceUpdated instance
     */
    public static create(properties?: IBalanceUpdated): BalanceUpdated;

    /**
     * Encodes the specified BalanceUpdated message. Does not implicitly {@link BalanceUpdated.verify|verify} messages.
     * @param message BalanceUpdated message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IBalanceUpdated, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified BalanceUpdated message, length delimited. Does not implicitly {@link BalanceUpdated.verify|verify} messages.
     * @param message BalanceUpdated message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IBalanceUpdated, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a BalanceUpdated message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BalanceUpdated
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): BalanceUpdated;

    /**
     * Decodes a BalanceUpdated message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BalanceUpdated
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): BalanceUpdated;

    /**
     * Verifies a BalanceUpdated message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a BalanceUpdated message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BalanceUpdated
     */
    public static fromObject(object: { [k: string]: any }): BalanceUpdated;

    /**
     * Creates a plain object from a BalanceUpdated message. Also converts values to other types if specified.
     * @param message BalanceUpdated
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: BalanceUpdated, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this BalanceUpdated to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for BalanceUpdated
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}

/** Properties of a DepositUpdated. */
export interface IDepositUpdated {

    /** DepositUpdated accountNo */
    accountNo?: (string|null);

    /** DepositUpdated depositAmount */
    depositAmount?: (number|null);
}

/** Represents a DepositUpdated. */
export class DepositUpdated implements IDepositUpdated {

    /**
     * Constructs a new DepositUpdated.
     * @param [properties] Properties to set
     */
    constructor(properties?: IDepositUpdated);

    /** DepositUpdated accountNo. */
    public accountNo: string;

    /** DepositUpdated depositAmount. */
    public depositAmount: number;

    /**
     * Creates a new DepositUpdated instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DepositUpdated instance
     */
    public static create(properties?: IDepositUpdated): DepositUpdated;

    /**
     * Encodes the specified DepositUpdated message. Does not implicitly {@link DepositUpdated.verify|verify} messages.
     * @param message DepositUpdated message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IDepositUpdated, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified DepositUpdated message, length delimited. Does not implicitly {@link DepositUpdated.verify|verify} messages.
     * @param message DepositUpdated message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IDepositUpdated, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DepositUpdated message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DepositUpdated
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): DepositUpdated;

    /**
     * Decodes a DepositUpdated message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DepositUpdated
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): DepositUpdated;

    /**
     * Verifies a DepositUpdated message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a DepositUpdated message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DepositUpdated
     */
    public static fromObject(object: { [k: string]: any }): DepositUpdated;

    /**
     * Creates a plain object from a DepositUpdated message. Also converts values to other types if specified.
     * @param message DepositUpdated
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: DepositUpdated, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this DepositUpdated to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for DepositUpdated
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
}
