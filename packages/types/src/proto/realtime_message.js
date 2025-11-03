/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const MarketQuote = $root.MarketQuote = (() => {

    /**
     * Properties of a MarketQuote.
     * @exports IMarketQuote
     * @interface IMarketQuote
     * @property {string|null} [stockCd] MarketQuote stockCd
     * @property {number|null} [bid] MarketQuote bid
     * @property {number|null} [ask] MarketQuote ask
     * @property {number|null} [bidSize] MarketQuote bidSize
     * @property {number|null} [askSize] MarketQuote askSize
     * @property {number|Long|null} [timestamp] MarketQuote timestamp
     */

    /**
     * Constructs a new MarketQuote.
     * @exports MarketQuote
     * @classdesc Represents a MarketQuote.
     * @implements IMarketQuote
     * @constructor
     * @param {IMarketQuote=} [properties] Properties to set
     */
    function MarketQuote(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MarketQuote stockCd.
     * @member {string} stockCd
     * @memberof MarketQuote
     * @instance
     */
    MarketQuote.prototype.stockCd = "";

    /**
     * MarketQuote bid.
     * @member {number} bid
     * @memberof MarketQuote
     * @instance
     */
    MarketQuote.prototype.bid = 0;

    /**
     * MarketQuote ask.
     * @member {number} ask
     * @memberof MarketQuote
     * @instance
     */
    MarketQuote.prototype.ask = 0;

    /**
     * MarketQuote bidSize.
     * @member {number} bidSize
     * @memberof MarketQuote
     * @instance
     */
    MarketQuote.prototype.bidSize = 0;

    /**
     * MarketQuote askSize.
     * @member {number} askSize
     * @memberof MarketQuote
     * @instance
     */
    MarketQuote.prototype.askSize = 0;

    /**
     * MarketQuote timestamp.
     * @member {number|Long} timestamp
     * @memberof MarketQuote
     * @instance
     */
    MarketQuote.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new MarketQuote instance using the specified properties.
     * @function create
     * @memberof MarketQuote
     * @static
     * @param {IMarketQuote=} [properties] Properties to set
     * @returns {MarketQuote} MarketQuote instance
     */
    MarketQuote.create = function create(properties) {
        return new MarketQuote(properties);
    };

    /**
     * Encodes the specified MarketQuote message. Does not implicitly {@link MarketQuote.verify|verify} messages.
     * @function encode
     * @memberof MarketQuote
     * @static
     * @param {IMarketQuote} message MarketQuote message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MarketQuote.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.stockCd != null && Object.hasOwnProperty.call(message, "stockCd"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.stockCd);
        if (message.bid != null && Object.hasOwnProperty.call(message, "bid"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.bid);
        if (message.ask != null && Object.hasOwnProperty.call(message, "ask"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.ask);
        if (message.bidSize != null && Object.hasOwnProperty.call(message, "bidSize"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.bidSize);
        if (message.askSize != null && Object.hasOwnProperty.call(message, "askSize"))
            writer.uint32(/* id 5, wireType 1 =*/41).double(message.askSize);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.timestamp);
        return writer;
    };

    /**
     * Encodes the specified MarketQuote message, length delimited. Does not implicitly {@link MarketQuote.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MarketQuote
     * @static
     * @param {IMarketQuote} message MarketQuote message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MarketQuote.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MarketQuote message from the specified reader or buffer.
     * @function decode
     * @memberof MarketQuote
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MarketQuote} MarketQuote
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MarketQuote.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MarketQuote();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.stockCd = reader.string();
                    break;
                }
            case 2: {
                    message.bid = reader.double();
                    break;
                }
            case 3: {
                    message.ask = reader.double();
                    break;
                }
            case 4: {
                    message.bidSize = reader.double();
                    break;
                }
            case 5: {
                    message.askSize = reader.double();
                    break;
                }
            case 6: {
                    message.timestamp = reader.uint64();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MarketQuote message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MarketQuote
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MarketQuote} MarketQuote
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MarketQuote.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MarketQuote message.
     * @function verify
     * @memberof MarketQuote
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MarketQuote.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            if (!$util.isString(message.stockCd))
                return "stockCd: string expected";
        if (message.bid != null && message.hasOwnProperty("bid"))
            if (typeof message.bid !== "number")
                return "bid: number expected";
        if (message.ask != null && message.hasOwnProperty("ask"))
            if (typeof message.ask !== "number")
                return "ask: number expected";
        if (message.bidSize != null && message.hasOwnProperty("bidSize"))
            if (typeof message.bidSize !== "number")
                return "bidSize: number expected";
        if (message.askSize != null && message.hasOwnProperty("askSize"))
            if (typeof message.askSize !== "number")
                return "askSize: number expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        return null;
    };

    /**
     * Creates a MarketQuote message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MarketQuote
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MarketQuote} MarketQuote
     */
    MarketQuote.fromObject = function fromObject(object) {
        if (object instanceof $root.MarketQuote)
            return object;
        let message = new $root.MarketQuote();
        if (object.stockCd != null)
            message.stockCd = String(object.stockCd);
        if (object.bid != null)
            message.bid = Number(object.bid);
        if (object.ask != null)
            message.ask = Number(object.ask);
        if (object.bidSize != null)
            message.bidSize = Number(object.bidSize);
        if (object.askSize != null)
            message.askSize = Number(object.askSize);
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a MarketQuote message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MarketQuote
     * @static
     * @param {MarketQuote} message MarketQuote
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MarketQuote.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.stockCd = "";
            object.bid = 0;
            object.ask = 0;
            object.bidSize = 0;
            object.askSize = 0;
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
        }
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            object.stockCd = message.stockCd;
        if (message.bid != null && message.hasOwnProperty("bid"))
            object.bid = options.json && !isFinite(message.bid) ? String(message.bid) : message.bid;
        if (message.ask != null && message.hasOwnProperty("ask"))
            object.ask = options.json && !isFinite(message.ask) ? String(message.ask) : message.ask;
        if (message.bidSize != null && message.hasOwnProperty("bidSize"))
            object.bidSize = options.json && !isFinite(message.bidSize) ? String(message.bidSize) : message.bidSize;
        if (message.askSize != null && message.hasOwnProperty("askSize"))
            object.askSize = options.json && !isFinite(message.askSize) ? String(message.askSize) : message.askSize;
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
        return object;
    };

    /**
     * Converts this MarketQuote to JSON.
     * @function toJSON
     * @memberof MarketQuote
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MarketQuote.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for MarketQuote
     * @function getTypeUrl
     * @memberof MarketQuote
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    MarketQuote.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/MarketQuote";
    };

    return MarketQuote;
})();

export const MarketQuoteList = $root.MarketQuoteList = (() => {

    /**
     * Properties of a MarketQuoteList.
     * @exports IMarketQuoteList
     * @interface IMarketQuoteList
     * @property {Array.<IMarketQuote>|null} [quotes] MarketQuoteList quotes
     */

    /**
     * Constructs a new MarketQuoteList.
     * @exports MarketQuoteList
     * @classdesc Represents a MarketQuoteList.
     * @implements IMarketQuoteList
     * @constructor
     * @param {IMarketQuoteList=} [properties] Properties to set
     */
    function MarketQuoteList(properties) {
        this.quotes = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MarketQuoteList quotes.
     * @member {Array.<IMarketQuote>} quotes
     * @memberof MarketQuoteList
     * @instance
     */
    MarketQuoteList.prototype.quotes = $util.emptyArray;

    /**
     * Creates a new MarketQuoteList instance using the specified properties.
     * @function create
     * @memberof MarketQuoteList
     * @static
     * @param {IMarketQuoteList=} [properties] Properties to set
     * @returns {MarketQuoteList} MarketQuoteList instance
     */
    MarketQuoteList.create = function create(properties) {
        return new MarketQuoteList(properties);
    };

    /**
     * Encodes the specified MarketQuoteList message. Does not implicitly {@link MarketQuoteList.verify|verify} messages.
     * @function encode
     * @memberof MarketQuoteList
     * @static
     * @param {IMarketQuoteList} message MarketQuoteList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MarketQuoteList.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.quotes != null && message.quotes.length)
            for (let i = 0; i < message.quotes.length; ++i)
                $root.MarketQuote.encode(message.quotes[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MarketQuoteList message, length delimited. Does not implicitly {@link MarketQuoteList.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MarketQuoteList
     * @static
     * @param {IMarketQuoteList} message MarketQuoteList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MarketQuoteList.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MarketQuoteList message from the specified reader or buffer.
     * @function decode
     * @memberof MarketQuoteList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MarketQuoteList} MarketQuoteList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MarketQuoteList.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MarketQuoteList();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    if (!(message.quotes && message.quotes.length))
                        message.quotes = [];
                    message.quotes.push($root.MarketQuote.decode(reader, reader.uint32()));
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MarketQuoteList message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MarketQuoteList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MarketQuoteList} MarketQuoteList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MarketQuoteList.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MarketQuoteList message.
     * @function verify
     * @memberof MarketQuoteList
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MarketQuoteList.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.quotes != null && message.hasOwnProperty("quotes")) {
            if (!Array.isArray(message.quotes))
                return "quotes: array expected";
            for (let i = 0; i < message.quotes.length; ++i) {
                let error = $root.MarketQuote.verify(message.quotes[i]);
                if (error)
                    return "quotes." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MarketQuoteList message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MarketQuoteList
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MarketQuoteList} MarketQuoteList
     */
    MarketQuoteList.fromObject = function fromObject(object) {
        if (object instanceof $root.MarketQuoteList)
            return object;
        let message = new $root.MarketQuoteList();
        if (object.quotes) {
            if (!Array.isArray(object.quotes))
                throw TypeError(".MarketQuoteList.quotes: array expected");
            message.quotes = [];
            for (let i = 0; i < object.quotes.length; ++i) {
                if (typeof object.quotes[i] !== "object")
                    throw TypeError(".MarketQuoteList.quotes: object expected");
                message.quotes[i] = $root.MarketQuote.fromObject(object.quotes[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MarketQuoteList message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MarketQuoteList
     * @static
     * @param {MarketQuoteList} message MarketQuoteList
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MarketQuoteList.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.quotes = [];
        if (message.quotes && message.quotes.length) {
            object.quotes = [];
            for (let j = 0; j < message.quotes.length; ++j)
                object.quotes[j] = $root.MarketQuote.toObject(message.quotes[j], options);
        }
        return object;
    };

    /**
     * Converts this MarketQuoteList to JSON.
     * @function toJSON
     * @memberof MarketQuoteList
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MarketQuoteList.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for MarketQuoteList
     * @function getTypeUrl
     * @memberof MarketQuoteList
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    MarketQuoteList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/MarketQuoteList";
    };

    return MarketQuoteList;
})();

export const Quote = $root.Quote = (() => {

    /**
     * Properties of a Quote.
     * @exports IQuote
     * @interface IQuote
     * @property {number|null} [bid] Quote bid
     * @property {number|null} [ask] Quote ask
     * @property {number|null} [bidSize] Quote bidSize
     * @property {number|null} [askSize] Quote askSize
     */

    /**
     * Constructs a new Quote.
     * @exports Quote
     * @classdesc Represents a Quote.
     * @implements IQuote
     * @constructor
     * @param {IQuote=} [properties] Properties to set
     */
    function Quote(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Quote bid.
     * @member {number} bid
     * @memberof Quote
     * @instance
     */
    Quote.prototype.bid = 0;

    /**
     * Quote ask.
     * @member {number} ask
     * @memberof Quote
     * @instance
     */
    Quote.prototype.ask = 0;

    /**
     * Quote bidSize.
     * @member {number} bidSize
     * @memberof Quote
     * @instance
     */
    Quote.prototype.bidSize = 0;

    /**
     * Quote askSize.
     * @member {number} askSize
     * @memberof Quote
     * @instance
     */
    Quote.prototype.askSize = 0;

    /**
     * Creates a new Quote instance using the specified properties.
     * @function create
     * @memberof Quote
     * @static
     * @param {IQuote=} [properties] Properties to set
     * @returns {Quote} Quote instance
     */
    Quote.create = function create(properties) {
        return new Quote(properties);
    };

    /**
     * Encodes the specified Quote message. Does not implicitly {@link Quote.verify|verify} messages.
     * @function encode
     * @memberof Quote
     * @static
     * @param {IQuote} message Quote message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Quote.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.bid != null && Object.hasOwnProperty.call(message, "bid"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.bid);
        if (message.ask != null && Object.hasOwnProperty.call(message, "ask"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.ask);
        if (message.bidSize != null && Object.hasOwnProperty.call(message, "bidSize"))
            writer.uint32(/* id 3, wireType 1 =*/25).double(message.bidSize);
        if (message.askSize != null && Object.hasOwnProperty.call(message, "askSize"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.askSize);
        return writer;
    };

    /**
     * Encodes the specified Quote message, length delimited. Does not implicitly {@link Quote.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Quote
     * @static
     * @param {IQuote} message Quote message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Quote.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Quote message from the specified reader or buffer.
     * @function decode
     * @memberof Quote
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Quote} Quote
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Quote.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Quote();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.bid = reader.double();
                    break;
                }
            case 2: {
                    message.ask = reader.double();
                    break;
                }
            case 3: {
                    message.bidSize = reader.double();
                    break;
                }
            case 4: {
                    message.askSize = reader.double();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Quote message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Quote
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Quote} Quote
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Quote.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Quote message.
     * @function verify
     * @memberof Quote
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Quote.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.bid != null && message.hasOwnProperty("bid"))
            if (typeof message.bid !== "number")
                return "bid: number expected";
        if (message.ask != null && message.hasOwnProperty("ask"))
            if (typeof message.ask !== "number")
                return "ask: number expected";
        if (message.bidSize != null && message.hasOwnProperty("bidSize"))
            if (typeof message.bidSize !== "number")
                return "bidSize: number expected";
        if (message.askSize != null && message.hasOwnProperty("askSize"))
            if (typeof message.askSize !== "number")
                return "askSize: number expected";
        return null;
    };

    /**
     * Creates a Quote message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Quote
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Quote} Quote
     */
    Quote.fromObject = function fromObject(object) {
        if (object instanceof $root.Quote)
            return object;
        let message = new $root.Quote();
        if (object.bid != null)
            message.bid = Number(object.bid);
        if (object.ask != null)
            message.ask = Number(object.ask);
        if (object.bidSize != null)
            message.bidSize = Number(object.bidSize);
        if (object.askSize != null)
            message.askSize = Number(object.askSize);
        return message;
    };

    /**
     * Creates a plain object from a Quote message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Quote
     * @static
     * @param {Quote} message Quote
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Quote.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.bid = 0;
            object.ask = 0;
            object.bidSize = 0;
            object.askSize = 0;
        }
        if (message.bid != null && message.hasOwnProperty("bid"))
            object.bid = options.json && !isFinite(message.bid) ? String(message.bid) : message.bid;
        if (message.ask != null && message.hasOwnProperty("ask"))
            object.ask = options.json && !isFinite(message.ask) ? String(message.ask) : message.ask;
        if (message.bidSize != null && message.hasOwnProperty("bidSize"))
            object.bidSize = options.json && !isFinite(message.bidSize) ? String(message.bidSize) : message.bidSize;
        if (message.askSize != null && message.hasOwnProperty("askSize"))
            object.askSize = options.json && !isFinite(message.askSize) ? String(message.askSize) : message.askSize;
        return object;
    };

    /**
     * Converts this Quote to JSON.
     * @function toJSON
     * @memberof Quote
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Quote.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for Quote
     * @function getTypeUrl
     * @memberof Quote
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    Quote.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/Quote";
    };

    return Quote;
})();

export const MarketOrderBook = $root.MarketOrderBook = (() => {

    /**
     * Properties of a MarketOrderBook.
     * @exports IMarketOrderBook
     * @interface IMarketOrderBook
     * @property {string|null} [stockCd] MarketOrderBook stockCd
     * @property {Array.<IQuote>|null} [quotes] MarketOrderBook quotes
     * @property {number|Long|null} [timestamp] MarketOrderBook timestamp
     */

    /**
     * Constructs a new MarketOrderBook.
     * @exports MarketOrderBook
     * @classdesc Represents a MarketOrderBook.
     * @implements IMarketOrderBook
     * @constructor
     * @param {IMarketOrderBook=} [properties] Properties to set
     */
    function MarketOrderBook(properties) {
        this.quotes = [];
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MarketOrderBook stockCd.
     * @member {string} stockCd
     * @memberof MarketOrderBook
     * @instance
     */
    MarketOrderBook.prototype.stockCd = "";

    /**
     * MarketOrderBook quotes.
     * @member {Array.<IQuote>} quotes
     * @memberof MarketOrderBook
     * @instance
     */
    MarketOrderBook.prototype.quotes = $util.emptyArray;

    /**
     * MarketOrderBook timestamp.
     * @member {number|Long} timestamp
     * @memberof MarketOrderBook
     * @instance
     */
    MarketOrderBook.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new MarketOrderBook instance using the specified properties.
     * @function create
     * @memberof MarketOrderBook
     * @static
     * @param {IMarketOrderBook=} [properties] Properties to set
     * @returns {MarketOrderBook} MarketOrderBook instance
     */
    MarketOrderBook.create = function create(properties) {
        return new MarketOrderBook(properties);
    };

    /**
     * Encodes the specified MarketOrderBook message. Does not implicitly {@link MarketOrderBook.verify|verify} messages.
     * @function encode
     * @memberof MarketOrderBook
     * @static
     * @param {IMarketOrderBook} message MarketOrderBook message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MarketOrderBook.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.stockCd != null && Object.hasOwnProperty.call(message, "stockCd"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.stockCd);
        if (message.quotes != null && message.quotes.length)
            for (let i = 0; i < message.quotes.length; ++i)
                $root.Quote.encode(message.quotes[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.timestamp);
        return writer;
    };

    /**
     * Encodes the specified MarketOrderBook message, length delimited. Does not implicitly {@link MarketOrderBook.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MarketOrderBook
     * @static
     * @param {IMarketOrderBook} message MarketOrderBook message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MarketOrderBook.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MarketOrderBook message from the specified reader or buffer.
     * @function decode
     * @memberof MarketOrderBook
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MarketOrderBook} MarketOrderBook
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MarketOrderBook.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.MarketOrderBook();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.stockCd = reader.string();
                    break;
                }
            case 2: {
                    if (!(message.quotes && message.quotes.length))
                        message.quotes = [];
                    message.quotes.push($root.Quote.decode(reader, reader.uint32()));
                    break;
                }
            case 3: {
                    message.timestamp = reader.uint64();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MarketOrderBook message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MarketOrderBook
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MarketOrderBook} MarketOrderBook
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MarketOrderBook.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MarketOrderBook message.
     * @function verify
     * @memberof MarketOrderBook
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MarketOrderBook.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            if (!$util.isString(message.stockCd))
                return "stockCd: string expected";
        if (message.quotes != null && message.hasOwnProperty("quotes")) {
            if (!Array.isArray(message.quotes))
                return "quotes: array expected";
            for (let i = 0; i < message.quotes.length; ++i) {
                let error = $root.Quote.verify(message.quotes[i]);
                if (error)
                    return "quotes." + error;
            }
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        return null;
    };

    /**
     * Creates a MarketOrderBook message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MarketOrderBook
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MarketOrderBook} MarketOrderBook
     */
    MarketOrderBook.fromObject = function fromObject(object) {
        if (object instanceof $root.MarketOrderBook)
            return object;
        let message = new $root.MarketOrderBook();
        if (object.stockCd != null)
            message.stockCd = String(object.stockCd);
        if (object.quotes) {
            if (!Array.isArray(object.quotes))
                throw TypeError(".MarketOrderBook.quotes: array expected");
            message.quotes = [];
            for (let i = 0; i < object.quotes.length; ++i) {
                if (typeof object.quotes[i] !== "object")
                    throw TypeError(".MarketOrderBook.quotes: object expected");
                message.quotes[i] = $root.Quote.fromObject(object.quotes[i]);
            }
        }
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a MarketOrderBook message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MarketOrderBook
     * @static
     * @param {MarketOrderBook} message MarketOrderBook
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MarketOrderBook.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.arrays || options.defaults)
            object.quotes = [];
        if (options.defaults) {
            object.stockCd = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
        }
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            object.stockCd = message.stockCd;
        if (message.quotes && message.quotes.length) {
            object.quotes = [];
            for (let j = 0; j < message.quotes.length; ++j)
                object.quotes[j] = $root.Quote.toObject(message.quotes[j], options);
        }
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
        return object;
    };

    /**
     * Converts this MarketOrderBook to JSON.
     * @function toJSON
     * @memberof MarketOrderBook
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MarketOrderBook.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for MarketOrderBook
     * @function getTypeUrl
     * @memberof MarketOrderBook
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    MarketOrderBook.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/MarketOrderBook";
    };

    return MarketOrderBook;
})();

export const OrderBookCancel = $root.OrderBookCancel = (() => {

    /**
     * Properties of an OrderBookCancel.
     * @exports IOrderBookCancel
     * @interface IOrderBookCancel
     * @property {string|null} [cancelType] OrderBookCancel cancelType
     * @property {string|null} [stockCd] OrderBookCancel stockCd
     * @property {number|Long|null} [timestamp] OrderBookCancel timestamp
     */

    /**
     * Constructs a new OrderBookCancel.
     * @exports OrderBookCancel
     * @classdesc Represents an OrderBookCancel.
     * @implements IOrderBookCancel
     * @constructor
     * @param {IOrderBookCancel=} [properties] Properties to set
     */
    function OrderBookCancel(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * OrderBookCancel cancelType.
     * @member {string} cancelType
     * @memberof OrderBookCancel
     * @instance
     */
    OrderBookCancel.prototype.cancelType = "";

    /**
     * OrderBookCancel stockCd.
     * @member {string} stockCd
     * @memberof OrderBookCancel
     * @instance
     */
    OrderBookCancel.prototype.stockCd = "";

    /**
     * OrderBookCancel timestamp.
     * @member {number|Long} timestamp
     * @memberof OrderBookCancel
     * @instance
     */
    OrderBookCancel.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new OrderBookCancel instance using the specified properties.
     * @function create
     * @memberof OrderBookCancel
     * @static
     * @param {IOrderBookCancel=} [properties] Properties to set
     * @returns {OrderBookCancel} OrderBookCancel instance
     */
    OrderBookCancel.create = function create(properties) {
        return new OrderBookCancel(properties);
    };

    /**
     * Encodes the specified OrderBookCancel message. Does not implicitly {@link OrderBookCancel.verify|verify} messages.
     * @function encode
     * @memberof OrderBookCancel
     * @static
     * @param {IOrderBookCancel} message OrderBookCancel message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderBookCancel.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.cancelType != null && Object.hasOwnProperty.call(message, "cancelType"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.cancelType);
        if (message.stockCd != null && Object.hasOwnProperty.call(message, "stockCd"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.stockCd);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.timestamp);
        return writer;
    };

    /**
     * Encodes the specified OrderBookCancel message, length delimited. Does not implicitly {@link OrderBookCancel.verify|verify} messages.
     * @function encodeDelimited
     * @memberof OrderBookCancel
     * @static
     * @param {IOrderBookCancel} message OrderBookCancel message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderBookCancel.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an OrderBookCancel message from the specified reader or buffer.
     * @function decode
     * @memberof OrderBookCancel
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {OrderBookCancel} OrderBookCancel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderBookCancel.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.OrderBookCancel();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.cancelType = reader.string();
                    break;
                }
            case 2: {
                    message.stockCd = reader.string();
                    break;
                }
            case 3: {
                    message.timestamp = reader.uint64();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an OrderBookCancel message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof OrderBookCancel
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {OrderBookCancel} OrderBookCancel
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderBookCancel.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an OrderBookCancel message.
     * @function verify
     * @memberof OrderBookCancel
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OrderBookCancel.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.cancelType != null && message.hasOwnProperty("cancelType"))
            if (!$util.isString(message.cancelType))
                return "cancelType: string expected";
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            if (!$util.isString(message.stockCd))
                return "stockCd: string expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        return null;
    };

    /**
     * Creates an OrderBookCancel message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof OrderBookCancel
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {OrderBookCancel} OrderBookCancel
     */
    OrderBookCancel.fromObject = function fromObject(object) {
        if (object instanceof $root.OrderBookCancel)
            return object;
        let message = new $root.OrderBookCancel();
        if (object.cancelType != null)
            message.cancelType = String(object.cancelType);
        if (object.stockCd != null)
            message.stockCd = String(object.stockCd);
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from an OrderBookCancel message. Also converts values to other types if specified.
     * @function toObject
     * @memberof OrderBookCancel
     * @static
     * @param {OrderBookCancel} message OrderBookCancel
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OrderBookCancel.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.cancelType = "";
            object.stockCd = "";
            if ($util.Long) {
                let long = new $util.Long(0, 0, true);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
        }
        if (message.cancelType != null && message.hasOwnProperty("cancelType"))
            object.cancelType = message.cancelType;
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            object.stockCd = message.stockCd;
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
        return object;
    };

    /**
     * Converts this OrderBookCancel to JSON.
     * @function toJSON
     * @memberof OrderBookCancel
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OrderBookCancel.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for OrderBookCancel
     * @function getTypeUrl
     * @memberof OrderBookCancel
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    OrderBookCancel.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/OrderBookCancel";
    };

    return OrderBookCancel;
})();

export const OrderReceived = $root.OrderReceived = (() => {

    /**
     * Properties of an OrderReceived.
     * @exports IOrderReceived
     * @interface IOrderReceived
     * @property {string|null} [accountNo] OrderReceived accountNo
     * @property {string|null} [orderDate] OrderReceived orderDate
     * @property {string|null} [orderNo] OrderReceived orderNo
     * @property {string|null} [stockCd] OrderReceived stockCd
     * @property {string|null} [orderVersionCd] OrderReceived orderVersionCd
     * @property {string|null} [positionCd] OrderReceived positionCd
     * @property {string|null} [orderTypeCd] OrderReceived orderTypeCd
     * @property {string|null} [sideCd] OrderReceived sideCd
     * @property {number|null} [orderQuantity] OrderReceived orderQuantity
     * @property {number|null} [barrierPrice] OrderReceived barrierPrice
     * @property {number|null} [orderPrice] OrderReceived orderPrice
     * @property {number|null} [profitRealizationBarrierPrice] OrderReceived profitRealizationBarrierPrice
     * @property {number|null} [lossCutBarrierPrice] OrderReceived lossCutBarrierPrice
     * @property {number|null} [orderBalance] OrderReceived orderBalance
     * @property {string|null} [orderStatusCd] OrderReceived orderStatusCd
     * @property {string|null} [receptionDate] OrderReceived receptionDate
     * @property {string|null} [isProfitExecution] OrderReceived isProfitExecution
     * @property {string|null} [isLossLimits] OrderReceived isLossLimits
     * @property {string|null} [isLossTracing] OrderReceived isLossTracing
     * @property {string|null} [purchaseDate] OrderReceived purchaseDate
     * @property {string|null} [balanceNo] OrderReceived balanceNo
     * @property {number|null} [totalMargin] OrderReceived totalMargin
     */

    /**
     * Constructs a new OrderReceived.
     * @exports OrderReceived
     * @classdesc Represents an OrderReceived.
     * @implements IOrderReceived
     * @constructor
     * @param {IOrderReceived=} [properties] Properties to set
     */
    function OrderReceived(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * OrderReceived accountNo.
     * @member {string} accountNo
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.accountNo = "";

    /**
     * OrderReceived orderDate.
     * @member {string} orderDate
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.orderDate = "";

    /**
     * OrderReceived orderNo.
     * @member {string} orderNo
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.orderNo = "";

    /**
     * OrderReceived stockCd.
     * @member {string} stockCd
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.stockCd = "";

    /**
     * OrderReceived orderVersionCd.
     * @member {string} orderVersionCd
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.orderVersionCd = "";

    /**
     * OrderReceived positionCd.
     * @member {string} positionCd
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.positionCd = "";

    /**
     * OrderReceived orderTypeCd.
     * @member {string} orderTypeCd
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.orderTypeCd = "";

    /**
     * OrderReceived sideCd.
     * @member {string} sideCd
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.sideCd = "";

    /**
     * OrderReceived orderQuantity.
     * @member {number} orderQuantity
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.orderQuantity = 0;

    /**
     * OrderReceived barrierPrice.
     * @member {number} barrierPrice
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.barrierPrice = 0;

    /**
     * OrderReceived orderPrice.
     * @member {number} orderPrice
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.orderPrice = 0;

    /**
     * OrderReceived profitRealizationBarrierPrice.
     * @member {number} profitRealizationBarrierPrice
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.profitRealizationBarrierPrice = 0;

    /**
     * OrderReceived lossCutBarrierPrice.
     * @member {number} lossCutBarrierPrice
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.lossCutBarrierPrice = 0;

    /**
     * OrderReceived orderBalance.
     * @member {number} orderBalance
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.orderBalance = 0;

    /**
     * OrderReceived orderStatusCd.
     * @member {string} orderStatusCd
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.orderStatusCd = "";

    /**
     * OrderReceived receptionDate.
     * @member {string} receptionDate
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.receptionDate = "";

    /**
     * OrderReceived isProfitExecution.
     * @member {string} isProfitExecution
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.isProfitExecution = "";

    /**
     * OrderReceived isLossLimits.
     * @member {string} isLossLimits
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.isLossLimits = "";

    /**
     * OrderReceived isLossTracing.
     * @member {string} isLossTracing
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.isLossTracing = "";

    /**
     * OrderReceived purchaseDate.
     * @member {string} purchaseDate
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.purchaseDate = "";

    /**
     * OrderReceived balanceNo.
     * @member {string} balanceNo
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.balanceNo = "";

    /**
     * OrderReceived totalMargin.
     * @member {number} totalMargin
     * @memberof OrderReceived
     * @instance
     */
    OrderReceived.prototype.totalMargin = 0;

    /**
     * Creates a new OrderReceived instance using the specified properties.
     * @function create
     * @memberof OrderReceived
     * @static
     * @param {IOrderReceived=} [properties] Properties to set
     * @returns {OrderReceived} OrderReceived instance
     */
    OrderReceived.create = function create(properties) {
        return new OrderReceived(properties);
    };

    /**
     * Encodes the specified OrderReceived message. Does not implicitly {@link OrderReceived.verify|verify} messages.
     * @function encode
     * @memberof OrderReceived
     * @static
     * @param {IOrderReceived} message OrderReceived message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderReceived.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.accountNo != null && Object.hasOwnProperty.call(message, "accountNo"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountNo);
        if (message.orderDate != null && Object.hasOwnProperty.call(message, "orderDate"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.orderDate);
        if (message.orderNo != null && Object.hasOwnProperty.call(message, "orderNo"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.orderNo);
        if (message.stockCd != null && Object.hasOwnProperty.call(message, "stockCd"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.stockCd);
        if (message.orderVersionCd != null && Object.hasOwnProperty.call(message, "orderVersionCd"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.orderVersionCd);
        if (message.positionCd != null && Object.hasOwnProperty.call(message, "positionCd"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.positionCd);
        if (message.orderTypeCd != null && Object.hasOwnProperty.call(message, "orderTypeCd"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.orderTypeCd);
        if (message.sideCd != null && Object.hasOwnProperty.call(message, "sideCd"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.sideCd);
        if (message.orderQuantity != null && Object.hasOwnProperty.call(message, "orderQuantity"))
            writer.uint32(/* id 9, wireType 1 =*/73).double(message.orderQuantity);
        if (message.barrierPrice != null && Object.hasOwnProperty.call(message, "barrierPrice"))
            writer.uint32(/* id 10, wireType 1 =*/81).double(message.barrierPrice);
        if (message.orderPrice != null && Object.hasOwnProperty.call(message, "orderPrice"))
            writer.uint32(/* id 11, wireType 1 =*/89).double(message.orderPrice);
        if (message.profitRealizationBarrierPrice != null && Object.hasOwnProperty.call(message, "profitRealizationBarrierPrice"))
            writer.uint32(/* id 12, wireType 1 =*/97).double(message.profitRealizationBarrierPrice);
        if (message.lossCutBarrierPrice != null && Object.hasOwnProperty.call(message, "lossCutBarrierPrice"))
            writer.uint32(/* id 13, wireType 1 =*/105).double(message.lossCutBarrierPrice);
        if (message.orderBalance != null && Object.hasOwnProperty.call(message, "orderBalance"))
            writer.uint32(/* id 14, wireType 1 =*/113).double(message.orderBalance);
        if (message.orderStatusCd != null && Object.hasOwnProperty.call(message, "orderStatusCd"))
            writer.uint32(/* id 15, wireType 2 =*/122).string(message.orderStatusCd);
        if (message.receptionDate != null && Object.hasOwnProperty.call(message, "receptionDate"))
            writer.uint32(/* id 16, wireType 2 =*/130).string(message.receptionDate);
        if (message.isProfitExecution != null && Object.hasOwnProperty.call(message, "isProfitExecution"))
            writer.uint32(/* id 17, wireType 2 =*/138).string(message.isProfitExecution);
        if (message.isLossLimits != null && Object.hasOwnProperty.call(message, "isLossLimits"))
            writer.uint32(/* id 18, wireType 2 =*/146).string(message.isLossLimits);
        if (message.isLossTracing != null && Object.hasOwnProperty.call(message, "isLossTracing"))
            writer.uint32(/* id 19, wireType 2 =*/154).string(message.isLossTracing);
        if (message.purchaseDate != null && Object.hasOwnProperty.call(message, "purchaseDate"))
            writer.uint32(/* id 20, wireType 2 =*/162).string(message.purchaseDate);
        if (message.balanceNo != null && Object.hasOwnProperty.call(message, "balanceNo"))
            writer.uint32(/* id 21, wireType 2 =*/170).string(message.balanceNo);
        if (message.totalMargin != null && Object.hasOwnProperty.call(message, "totalMargin"))
            writer.uint32(/* id 22, wireType 1 =*/177).double(message.totalMargin);
        return writer;
    };

    /**
     * Encodes the specified OrderReceived message, length delimited. Does not implicitly {@link OrderReceived.verify|verify} messages.
     * @function encodeDelimited
     * @memberof OrderReceived
     * @static
     * @param {IOrderReceived} message OrderReceived message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderReceived.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an OrderReceived message from the specified reader or buffer.
     * @function decode
     * @memberof OrderReceived
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {OrderReceived} OrderReceived
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderReceived.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.OrderReceived();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.accountNo = reader.string();
                    break;
                }
            case 2: {
                    message.orderDate = reader.string();
                    break;
                }
            case 3: {
                    message.orderNo = reader.string();
                    break;
                }
            case 4: {
                    message.stockCd = reader.string();
                    break;
                }
            case 5: {
                    message.orderVersionCd = reader.string();
                    break;
                }
            case 6: {
                    message.positionCd = reader.string();
                    break;
                }
            case 7: {
                    message.orderTypeCd = reader.string();
                    break;
                }
            case 8: {
                    message.sideCd = reader.string();
                    break;
                }
            case 9: {
                    message.orderQuantity = reader.double();
                    break;
                }
            case 10: {
                    message.barrierPrice = reader.double();
                    break;
                }
            case 11: {
                    message.orderPrice = reader.double();
                    break;
                }
            case 12: {
                    message.profitRealizationBarrierPrice = reader.double();
                    break;
                }
            case 13: {
                    message.lossCutBarrierPrice = reader.double();
                    break;
                }
            case 14: {
                    message.orderBalance = reader.double();
                    break;
                }
            case 15: {
                    message.orderStatusCd = reader.string();
                    break;
                }
            case 16: {
                    message.receptionDate = reader.string();
                    break;
                }
            case 17: {
                    message.isProfitExecution = reader.string();
                    break;
                }
            case 18: {
                    message.isLossLimits = reader.string();
                    break;
                }
            case 19: {
                    message.isLossTracing = reader.string();
                    break;
                }
            case 20: {
                    message.purchaseDate = reader.string();
                    break;
                }
            case 21: {
                    message.balanceNo = reader.string();
                    break;
                }
            case 22: {
                    message.totalMargin = reader.double();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an OrderReceived message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof OrderReceived
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {OrderReceived} OrderReceived
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderReceived.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an OrderReceived message.
     * @function verify
     * @memberof OrderReceived
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OrderReceived.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.accountNo != null && message.hasOwnProperty("accountNo"))
            if (!$util.isString(message.accountNo))
                return "accountNo: string expected";
        if (message.orderDate != null && message.hasOwnProperty("orderDate"))
            if (!$util.isString(message.orderDate))
                return "orderDate: string expected";
        if (message.orderNo != null && message.hasOwnProperty("orderNo"))
            if (!$util.isString(message.orderNo))
                return "orderNo: string expected";
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            if (!$util.isString(message.stockCd))
                return "stockCd: string expected";
        if (message.orderVersionCd != null && message.hasOwnProperty("orderVersionCd"))
            if (!$util.isString(message.orderVersionCd))
                return "orderVersionCd: string expected";
        if (message.positionCd != null && message.hasOwnProperty("positionCd"))
            if (!$util.isString(message.positionCd))
                return "positionCd: string expected";
        if (message.orderTypeCd != null && message.hasOwnProperty("orderTypeCd"))
            if (!$util.isString(message.orderTypeCd))
                return "orderTypeCd: string expected";
        if (message.sideCd != null && message.hasOwnProperty("sideCd"))
            if (!$util.isString(message.sideCd))
                return "sideCd: string expected";
        if (message.orderQuantity != null && message.hasOwnProperty("orderQuantity"))
            if (typeof message.orderQuantity !== "number")
                return "orderQuantity: number expected";
        if (message.barrierPrice != null && message.hasOwnProperty("barrierPrice"))
            if (typeof message.barrierPrice !== "number")
                return "barrierPrice: number expected";
        if (message.orderPrice != null && message.hasOwnProperty("orderPrice"))
            if (typeof message.orderPrice !== "number")
                return "orderPrice: number expected";
        if (message.profitRealizationBarrierPrice != null && message.hasOwnProperty("profitRealizationBarrierPrice"))
            if (typeof message.profitRealizationBarrierPrice !== "number")
                return "profitRealizationBarrierPrice: number expected";
        if (message.lossCutBarrierPrice != null && message.hasOwnProperty("lossCutBarrierPrice"))
            if (typeof message.lossCutBarrierPrice !== "number")
                return "lossCutBarrierPrice: number expected";
        if (message.orderBalance != null && message.hasOwnProperty("orderBalance"))
            if (typeof message.orderBalance !== "number")
                return "orderBalance: number expected";
        if (message.orderStatusCd != null && message.hasOwnProperty("orderStatusCd"))
            if (!$util.isString(message.orderStatusCd))
                return "orderStatusCd: string expected";
        if (message.receptionDate != null && message.hasOwnProperty("receptionDate"))
            if (!$util.isString(message.receptionDate))
                return "receptionDate: string expected";
        if (message.isProfitExecution != null && message.hasOwnProperty("isProfitExecution"))
            if (!$util.isString(message.isProfitExecution))
                return "isProfitExecution: string expected";
        if (message.isLossLimits != null && message.hasOwnProperty("isLossLimits"))
            if (!$util.isString(message.isLossLimits))
                return "isLossLimits: string expected";
        if (message.isLossTracing != null && message.hasOwnProperty("isLossTracing"))
            if (!$util.isString(message.isLossTracing))
                return "isLossTracing: string expected";
        if (message.purchaseDate != null && message.hasOwnProperty("purchaseDate"))
            if (!$util.isString(message.purchaseDate))
                return "purchaseDate: string expected";
        if (message.balanceNo != null && message.hasOwnProperty("balanceNo"))
            if (!$util.isString(message.balanceNo))
                return "balanceNo: string expected";
        if (message.totalMargin != null && message.hasOwnProperty("totalMargin"))
            if (typeof message.totalMargin !== "number")
                return "totalMargin: number expected";
        return null;
    };

    /**
     * Creates an OrderReceived message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof OrderReceived
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {OrderReceived} OrderReceived
     */
    OrderReceived.fromObject = function fromObject(object) {
        if (object instanceof $root.OrderReceived)
            return object;
        let message = new $root.OrderReceived();
        if (object.accountNo != null)
            message.accountNo = String(object.accountNo);
        if (object.orderDate != null)
            message.orderDate = String(object.orderDate);
        if (object.orderNo != null)
            message.orderNo = String(object.orderNo);
        if (object.stockCd != null)
            message.stockCd = String(object.stockCd);
        if (object.orderVersionCd != null)
            message.orderVersionCd = String(object.orderVersionCd);
        if (object.positionCd != null)
            message.positionCd = String(object.positionCd);
        if (object.orderTypeCd != null)
            message.orderTypeCd = String(object.orderTypeCd);
        if (object.sideCd != null)
            message.sideCd = String(object.sideCd);
        if (object.orderQuantity != null)
            message.orderQuantity = Number(object.orderQuantity);
        if (object.barrierPrice != null)
            message.barrierPrice = Number(object.barrierPrice);
        if (object.orderPrice != null)
            message.orderPrice = Number(object.orderPrice);
        if (object.profitRealizationBarrierPrice != null)
            message.profitRealizationBarrierPrice = Number(object.profitRealizationBarrierPrice);
        if (object.lossCutBarrierPrice != null)
            message.lossCutBarrierPrice = Number(object.lossCutBarrierPrice);
        if (object.orderBalance != null)
            message.orderBalance = Number(object.orderBalance);
        if (object.orderStatusCd != null)
            message.orderStatusCd = String(object.orderStatusCd);
        if (object.receptionDate != null)
            message.receptionDate = String(object.receptionDate);
        if (object.isProfitExecution != null)
            message.isProfitExecution = String(object.isProfitExecution);
        if (object.isLossLimits != null)
            message.isLossLimits = String(object.isLossLimits);
        if (object.isLossTracing != null)
            message.isLossTracing = String(object.isLossTracing);
        if (object.purchaseDate != null)
            message.purchaseDate = String(object.purchaseDate);
        if (object.balanceNo != null)
            message.balanceNo = String(object.balanceNo);
        if (object.totalMargin != null)
            message.totalMargin = Number(object.totalMargin);
        return message;
    };

    /**
     * Creates a plain object from an OrderReceived message. Also converts values to other types if specified.
     * @function toObject
     * @memberof OrderReceived
     * @static
     * @param {OrderReceived} message OrderReceived
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OrderReceived.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.accountNo = "";
            object.orderDate = "";
            object.orderNo = "";
            object.stockCd = "";
            object.orderVersionCd = "";
            object.positionCd = "";
            object.orderTypeCd = "";
            object.sideCd = "";
            object.orderQuantity = 0;
            object.barrierPrice = 0;
            object.orderPrice = 0;
            object.profitRealizationBarrierPrice = 0;
            object.lossCutBarrierPrice = 0;
            object.orderBalance = 0;
            object.orderStatusCd = "";
            object.receptionDate = "";
            object.isProfitExecution = "";
            object.isLossLimits = "";
            object.isLossTracing = "";
            object.purchaseDate = "";
            object.balanceNo = "";
            object.totalMargin = 0;
        }
        if (message.accountNo != null && message.hasOwnProperty("accountNo"))
            object.accountNo = message.accountNo;
        if (message.orderDate != null && message.hasOwnProperty("orderDate"))
            object.orderDate = message.orderDate;
        if (message.orderNo != null && message.hasOwnProperty("orderNo"))
            object.orderNo = message.orderNo;
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            object.stockCd = message.stockCd;
        if (message.orderVersionCd != null && message.hasOwnProperty("orderVersionCd"))
            object.orderVersionCd = message.orderVersionCd;
        if (message.positionCd != null && message.hasOwnProperty("positionCd"))
            object.positionCd = message.positionCd;
        if (message.orderTypeCd != null && message.hasOwnProperty("orderTypeCd"))
            object.orderTypeCd = message.orderTypeCd;
        if (message.sideCd != null && message.hasOwnProperty("sideCd"))
            object.sideCd = message.sideCd;
        if (message.orderQuantity != null && message.hasOwnProperty("orderQuantity"))
            object.orderQuantity = options.json && !isFinite(message.orderQuantity) ? String(message.orderQuantity) : message.orderQuantity;
        if (message.barrierPrice != null && message.hasOwnProperty("barrierPrice"))
            object.barrierPrice = options.json && !isFinite(message.barrierPrice) ? String(message.barrierPrice) : message.barrierPrice;
        if (message.orderPrice != null && message.hasOwnProperty("orderPrice"))
            object.orderPrice = options.json && !isFinite(message.orderPrice) ? String(message.orderPrice) : message.orderPrice;
        if (message.profitRealizationBarrierPrice != null && message.hasOwnProperty("profitRealizationBarrierPrice"))
            object.profitRealizationBarrierPrice = options.json && !isFinite(message.profitRealizationBarrierPrice) ? String(message.profitRealizationBarrierPrice) : message.profitRealizationBarrierPrice;
        if (message.lossCutBarrierPrice != null && message.hasOwnProperty("lossCutBarrierPrice"))
            object.lossCutBarrierPrice = options.json && !isFinite(message.lossCutBarrierPrice) ? String(message.lossCutBarrierPrice) : message.lossCutBarrierPrice;
        if (message.orderBalance != null && message.hasOwnProperty("orderBalance"))
            object.orderBalance = options.json && !isFinite(message.orderBalance) ? String(message.orderBalance) : message.orderBalance;
        if (message.orderStatusCd != null && message.hasOwnProperty("orderStatusCd"))
            object.orderStatusCd = message.orderStatusCd;
        if (message.receptionDate != null && message.hasOwnProperty("receptionDate"))
            object.receptionDate = message.receptionDate;
        if (message.isProfitExecution != null && message.hasOwnProperty("isProfitExecution"))
            object.isProfitExecution = message.isProfitExecution;
        if (message.isLossLimits != null && message.hasOwnProperty("isLossLimits"))
            object.isLossLimits = message.isLossLimits;
        if (message.isLossTracing != null && message.hasOwnProperty("isLossTracing"))
            object.isLossTracing = message.isLossTracing;
        if (message.purchaseDate != null && message.hasOwnProperty("purchaseDate"))
            object.purchaseDate = message.purchaseDate;
        if (message.balanceNo != null && message.hasOwnProperty("balanceNo"))
            object.balanceNo = message.balanceNo;
        if (message.totalMargin != null && message.hasOwnProperty("totalMargin"))
            object.totalMargin = options.json && !isFinite(message.totalMargin) ? String(message.totalMargin) : message.totalMargin;
        return object;
    };

    /**
     * Converts this OrderReceived to JSON.
     * @function toJSON
     * @memberof OrderReceived
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OrderReceived.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for OrderReceived
     * @function getTypeUrl
     * @memberof OrderReceived
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    OrderReceived.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/OrderReceived";
    };

    return OrderReceived;
})();

export const OrderRejected = $root.OrderRejected = (() => {

    /**
     * Properties of an OrderRejected.
     * @exports IOrderRejected
     * @interface IOrderRejected
     * @property {string|null} [accountNo] OrderRejected accountNo
     * @property {string|null} [orderDate] OrderRejected orderDate
     * @property {string|null} [orderNo] OrderRejected orderNo
     * @property {string|null} [stockCd] OrderRejected stockCd
     * @property {string|null} [positionCd] OrderRejected positionCd
     * @property {string|null} [sideCd] OrderRejected sideCd
     * @property {number|null} [rejectQuantity] OrderRejected rejectQuantity
     * @property {string|null} [purchaseDate] OrderRejected purchaseDate
     * @property {string|null} [balanceNo] OrderRejected balanceNo
     * @property {number|null} [totalMargin] OrderRejected totalMargin
     */

    /**
     * Constructs a new OrderRejected.
     * @exports OrderRejected
     * @classdesc Represents an OrderRejected.
     * @implements IOrderRejected
     * @constructor
     * @param {IOrderRejected=} [properties] Properties to set
     */
    function OrderRejected(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * OrderRejected accountNo.
     * @member {string} accountNo
     * @memberof OrderRejected
     * @instance
     */
    OrderRejected.prototype.accountNo = "";

    /**
     * OrderRejected orderDate.
     * @member {string} orderDate
     * @memberof OrderRejected
     * @instance
     */
    OrderRejected.prototype.orderDate = "";

    /**
     * OrderRejected orderNo.
     * @member {string} orderNo
     * @memberof OrderRejected
     * @instance
     */
    OrderRejected.prototype.orderNo = "";

    /**
     * OrderRejected stockCd.
     * @member {string} stockCd
     * @memberof OrderRejected
     * @instance
     */
    OrderRejected.prototype.stockCd = "";

    /**
     * OrderRejected positionCd.
     * @member {string} positionCd
     * @memberof OrderRejected
     * @instance
     */
    OrderRejected.prototype.positionCd = "";

    /**
     * OrderRejected sideCd.
     * @member {string} sideCd
     * @memberof OrderRejected
     * @instance
     */
    OrderRejected.prototype.sideCd = "";

    /**
     * OrderRejected rejectQuantity.
     * @member {number} rejectQuantity
     * @memberof OrderRejected
     * @instance
     */
    OrderRejected.prototype.rejectQuantity = 0;

    /**
     * OrderRejected purchaseDate.
     * @member {string} purchaseDate
     * @memberof OrderRejected
     * @instance
     */
    OrderRejected.prototype.purchaseDate = "";

    /**
     * OrderRejected balanceNo.
     * @member {string} balanceNo
     * @memberof OrderRejected
     * @instance
     */
    OrderRejected.prototype.balanceNo = "";

    /**
     * OrderRejected totalMargin.
     * @member {number} totalMargin
     * @memberof OrderRejected
     * @instance
     */
    OrderRejected.prototype.totalMargin = 0;

    /**
     * Creates a new OrderRejected instance using the specified properties.
     * @function create
     * @memberof OrderRejected
     * @static
     * @param {IOrderRejected=} [properties] Properties to set
     * @returns {OrderRejected} OrderRejected instance
     */
    OrderRejected.create = function create(properties) {
        return new OrderRejected(properties);
    };

    /**
     * Encodes the specified OrderRejected message. Does not implicitly {@link OrderRejected.verify|verify} messages.
     * @function encode
     * @memberof OrderRejected
     * @static
     * @param {IOrderRejected} message OrderRejected message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderRejected.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.accountNo != null && Object.hasOwnProperty.call(message, "accountNo"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountNo);
        if (message.orderDate != null && Object.hasOwnProperty.call(message, "orderDate"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.orderDate);
        if (message.orderNo != null && Object.hasOwnProperty.call(message, "orderNo"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.orderNo);
        if (message.stockCd != null && Object.hasOwnProperty.call(message, "stockCd"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.stockCd);
        if (message.positionCd != null && Object.hasOwnProperty.call(message, "positionCd"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.positionCd);
        if (message.sideCd != null && Object.hasOwnProperty.call(message, "sideCd"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.sideCd);
        if (message.rejectQuantity != null && Object.hasOwnProperty.call(message, "rejectQuantity"))
            writer.uint32(/* id 7, wireType 1 =*/57).double(message.rejectQuantity);
        if (message.purchaseDate != null && Object.hasOwnProperty.call(message, "purchaseDate"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.purchaseDate);
        if (message.balanceNo != null && Object.hasOwnProperty.call(message, "balanceNo"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.balanceNo);
        if (message.totalMargin != null && Object.hasOwnProperty.call(message, "totalMargin"))
            writer.uint32(/* id 10, wireType 1 =*/81).double(message.totalMargin);
        return writer;
    };

    /**
     * Encodes the specified OrderRejected message, length delimited. Does not implicitly {@link OrderRejected.verify|verify} messages.
     * @function encodeDelimited
     * @memberof OrderRejected
     * @static
     * @param {IOrderRejected} message OrderRejected message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderRejected.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an OrderRejected message from the specified reader or buffer.
     * @function decode
     * @memberof OrderRejected
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {OrderRejected} OrderRejected
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderRejected.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.OrderRejected();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.accountNo = reader.string();
                    break;
                }
            case 2: {
                    message.orderDate = reader.string();
                    break;
                }
            case 3: {
                    message.orderNo = reader.string();
                    break;
                }
            case 4: {
                    message.stockCd = reader.string();
                    break;
                }
            case 5: {
                    message.positionCd = reader.string();
                    break;
                }
            case 6: {
                    message.sideCd = reader.string();
                    break;
                }
            case 7: {
                    message.rejectQuantity = reader.double();
                    break;
                }
            case 8: {
                    message.purchaseDate = reader.string();
                    break;
                }
            case 9: {
                    message.balanceNo = reader.string();
                    break;
                }
            case 10: {
                    message.totalMargin = reader.double();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an OrderRejected message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof OrderRejected
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {OrderRejected} OrderRejected
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderRejected.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an OrderRejected message.
     * @function verify
     * @memberof OrderRejected
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OrderRejected.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.accountNo != null && message.hasOwnProperty("accountNo"))
            if (!$util.isString(message.accountNo))
                return "accountNo: string expected";
        if (message.orderDate != null && message.hasOwnProperty("orderDate"))
            if (!$util.isString(message.orderDate))
                return "orderDate: string expected";
        if (message.orderNo != null && message.hasOwnProperty("orderNo"))
            if (!$util.isString(message.orderNo))
                return "orderNo: string expected";
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            if (!$util.isString(message.stockCd))
                return "stockCd: string expected";
        if (message.positionCd != null && message.hasOwnProperty("positionCd"))
            if (!$util.isString(message.positionCd))
                return "positionCd: string expected";
        if (message.sideCd != null && message.hasOwnProperty("sideCd"))
            if (!$util.isString(message.sideCd))
                return "sideCd: string expected";
        if (message.rejectQuantity != null && message.hasOwnProperty("rejectQuantity"))
            if (typeof message.rejectQuantity !== "number")
                return "rejectQuantity: number expected";
        if (message.purchaseDate != null && message.hasOwnProperty("purchaseDate"))
            if (!$util.isString(message.purchaseDate))
                return "purchaseDate: string expected";
        if (message.balanceNo != null && message.hasOwnProperty("balanceNo"))
            if (!$util.isString(message.balanceNo))
                return "balanceNo: string expected";
        if (message.totalMargin != null && message.hasOwnProperty("totalMargin"))
            if (typeof message.totalMargin !== "number")
                return "totalMargin: number expected";
        return null;
    };

    /**
     * Creates an OrderRejected message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof OrderRejected
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {OrderRejected} OrderRejected
     */
    OrderRejected.fromObject = function fromObject(object) {
        if (object instanceof $root.OrderRejected)
            return object;
        let message = new $root.OrderRejected();
        if (object.accountNo != null)
            message.accountNo = String(object.accountNo);
        if (object.orderDate != null)
            message.orderDate = String(object.orderDate);
        if (object.orderNo != null)
            message.orderNo = String(object.orderNo);
        if (object.stockCd != null)
            message.stockCd = String(object.stockCd);
        if (object.positionCd != null)
            message.positionCd = String(object.positionCd);
        if (object.sideCd != null)
            message.sideCd = String(object.sideCd);
        if (object.rejectQuantity != null)
            message.rejectQuantity = Number(object.rejectQuantity);
        if (object.purchaseDate != null)
            message.purchaseDate = String(object.purchaseDate);
        if (object.balanceNo != null)
            message.balanceNo = String(object.balanceNo);
        if (object.totalMargin != null)
            message.totalMargin = Number(object.totalMargin);
        return message;
    };

    /**
     * Creates a plain object from an OrderRejected message. Also converts values to other types if specified.
     * @function toObject
     * @memberof OrderRejected
     * @static
     * @param {OrderRejected} message OrderRejected
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OrderRejected.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.accountNo = "";
            object.orderDate = "";
            object.orderNo = "";
            object.stockCd = "";
            object.positionCd = "";
            object.sideCd = "";
            object.rejectQuantity = 0;
            object.purchaseDate = "";
            object.balanceNo = "";
            object.totalMargin = 0;
        }
        if (message.accountNo != null && message.hasOwnProperty("accountNo"))
            object.accountNo = message.accountNo;
        if (message.orderDate != null && message.hasOwnProperty("orderDate"))
            object.orderDate = message.orderDate;
        if (message.orderNo != null && message.hasOwnProperty("orderNo"))
            object.orderNo = message.orderNo;
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            object.stockCd = message.stockCd;
        if (message.positionCd != null && message.hasOwnProperty("positionCd"))
            object.positionCd = message.positionCd;
        if (message.sideCd != null && message.hasOwnProperty("sideCd"))
            object.sideCd = message.sideCd;
        if (message.rejectQuantity != null && message.hasOwnProperty("rejectQuantity"))
            object.rejectQuantity = options.json && !isFinite(message.rejectQuantity) ? String(message.rejectQuantity) : message.rejectQuantity;
        if (message.purchaseDate != null && message.hasOwnProperty("purchaseDate"))
            object.purchaseDate = message.purchaseDate;
        if (message.balanceNo != null && message.hasOwnProperty("balanceNo"))
            object.balanceNo = message.balanceNo;
        if (message.totalMargin != null && message.hasOwnProperty("totalMargin"))
            object.totalMargin = options.json && !isFinite(message.totalMargin) ? String(message.totalMargin) : message.totalMargin;
        return object;
    };

    /**
     * Converts this OrderRejected to JSON.
     * @function toJSON
     * @memberof OrderRejected
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OrderRejected.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for OrderRejected
     * @function getTypeUrl
     * @memberof OrderRejected
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    OrderRejected.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/OrderRejected";
    };

    return OrderRejected;
})();

export const OrderExecuted = $root.OrderExecuted = (() => {

    /**
     * Properties of an OrderExecuted.
     * @exports IOrderExecuted
     * @interface IOrderExecuted
     * @property {string|null} [accountNo] OrderExecuted accountNo
     * @property {string|null} [orderDate] OrderExecuted orderDate
     * @property {string|null} [orderNo] OrderExecuted orderNo
     * @property {number|null} [executionQuantity] OrderExecuted executionQuantity
     * @property {number|null} [executionPrice] OrderExecuted executionPrice
     * @property {number|null} [deposit] OrderExecuted deposit
     * @property {number|null} [totalMargin] OrderExecuted totalMargin
     */

    /**
     * Constructs a new OrderExecuted.
     * @exports OrderExecuted
     * @classdesc Represents an OrderExecuted.
     * @implements IOrderExecuted
     * @constructor
     * @param {IOrderExecuted=} [properties] Properties to set
     */
    function OrderExecuted(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * OrderExecuted accountNo.
     * @member {string} accountNo
     * @memberof OrderExecuted
     * @instance
     */
    OrderExecuted.prototype.accountNo = "";

    /**
     * OrderExecuted orderDate.
     * @member {string} orderDate
     * @memberof OrderExecuted
     * @instance
     */
    OrderExecuted.prototype.orderDate = "";

    /**
     * OrderExecuted orderNo.
     * @member {string} orderNo
     * @memberof OrderExecuted
     * @instance
     */
    OrderExecuted.prototype.orderNo = "";

    /**
     * OrderExecuted executionQuantity.
     * @member {number} executionQuantity
     * @memberof OrderExecuted
     * @instance
     */
    OrderExecuted.prototype.executionQuantity = 0;

    /**
     * OrderExecuted executionPrice.
     * @member {number} executionPrice
     * @memberof OrderExecuted
     * @instance
     */
    OrderExecuted.prototype.executionPrice = 0;

    /**
     * OrderExecuted deposit.
     * @member {number} deposit
     * @memberof OrderExecuted
     * @instance
     */
    OrderExecuted.prototype.deposit = 0;

    /**
     * OrderExecuted totalMargin.
     * @member {number} totalMargin
     * @memberof OrderExecuted
     * @instance
     */
    OrderExecuted.prototype.totalMargin = 0;

    /**
     * Creates a new OrderExecuted instance using the specified properties.
     * @function create
     * @memberof OrderExecuted
     * @static
     * @param {IOrderExecuted=} [properties] Properties to set
     * @returns {OrderExecuted} OrderExecuted instance
     */
    OrderExecuted.create = function create(properties) {
        return new OrderExecuted(properties);
    };

    /**
     * Encodes the specified OrderExecuted message. Does not implicitly {@link OrderExecuted.verify|verify} messages.
     * @function encode
     * @memberof OrderExecuted
     * @static
     * @param {IOrderExecuted} message OrderExecuted message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderExecuted.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.accountNo != null && Object.hasOwnProperty.call(message, "accountNo"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountNo);
        if (message.orderDate != null && Object.hasOwnProperty.call(message, "orderDate"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.orderDate);
        if (message.orderNo != null && Object.hasOwnProperty.call(message, "orderNo"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.orderNo);
        if (message.executionQuantity != null && Object.hasOwnProperty.call(message, "executionQuantity"))
            writer.uint32(/* id 4, wireType 1 =*/33).double(message.executionQuantity);
        if (message.executionPrice != null && Object.hasOwnProperty.call(message, "executionPrice"))
            writer.uint32(/* id 5, wireType 1 =*/41).double(message.executionPrice);
        if (message.deposit != null && Object.hasOwnProperty.call(message, "deposit"))
            writer.uint32(/* id 6, wireType 1 =*/49).double(message.deposit);
        if (message.totalMargin != null && Object.hasOwnProperty.call(message, "totalMargin"))
            writer.uint32(/* id 7, wireType 1 =*/57).double(message.totalMargin);
        return writer;
    };

    /**
     * Encodes the specified OrderExecuted message, length delimited. Does not implicitly {@link OrderExecuted.verify|verify} messages.
     * @function encodeDelimited
     * @memberof OrderExecuted
     * @static
     * @param {IOrderExecuted} message OrderExecuted message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    OrderExecuted.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an OrderExecuted message from the specified reader or buffer.
     * @function decode
     * @memberof OrderExecuted
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {OrderExecuted} OrderExecuted
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderExecuted.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.OrderExecuted();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.accountNo = reader.string();
                    break;
                }
            case 2: {
                    message.orderDate = reader.string();
                    break;
                }
            case 3: {
                    message.orderNo = reader.string();
                    break;
                }
            case 4: {
                    message.executionQuantity = reader.double();
                    break;
                }
            case 5: {
                    message.executionPrice = reader.double();
                    break;
                }
            case 6: {
                    message.deposit = reader.double();
                    break;
                }
            case 7: {
                    message.totalMargin = reader.double();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an OrderExecuted message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof OrderExecuted
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {OrderExecuted} OrderExecuted
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    OrderExecuted.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an OrderExecuted message.
     * @function verify
     * @memberof OrderExecuted
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    OrderExecuted.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.accountNo != null && message.hasOwnProperty("accountNo"))
            if (!$util.isString(message.accountNo))
                return "accountNo: string expected";
        if (message.orderDate != null && message.hasOwnProperty("orderDate"))
            if (!$util.isString(message.orderDate))
                return "orderDate: string expected";
        if (message.orderNo != null && message.hasOwnProperty("orderNo"))
            if (!$util.isString(message.orderNo))
                return "orderNo: string expected";
        if (message.executionQuantity != null && message.hasOwnProperty("executionQuantity"))
            if (typeof message.executionQuantity !== "number")
                return "executionQuantity: number expected";
        if (message.executionPrice != null && message.hasOwnProperty("executionPrice"))
            if (typeof message.executionPrice !== "number")
                return "executionPrice: number expected";
        if (message.deposit != null && message.hasOwnProperty("deposit"))
            if (typeof message.deposit !== "number")
                return "deposit: number expected";
        if (message.totalMargin != null && message.hasOwnProperty("totalMargin"))
            if (typeof message.totalMargin !== "number")
                return "totalMargin: number expected";
        return null;
    };

    /**
     * Creates an OrderExecuted message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof OrderExecuted
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {OrderExecuted} OrderExecuted
     */
    OrderExecuted.fromObject = function fromObject(object) {
        if (object instanceof $root.OrderExecuted)
            return object;
        let message = new $root.OrderExecuted();
        if (object.accountNo != null)
            message.accountNo = String(object.accountNo);
        if (object.orderDate != null)
            message.orderDate = String(object.orderDate);
        if (object.orderNo != null)
            message.orderNo = String(object.orderNo);
        if (object.executionQuantity != null)
            message.executionQuantity = Number(object.executionQuantity);
        if (object.executionPrice != null)
            message.executionPrice = Number(object.executionPrice);
        if (object.deposit != null)
            message.deposit = Number(object.deposit);
        if (object.totalMargin != null)
            message.totalMargin = Number(object.totalMargin);
        return message;
    };

    /**
     * Creates a plain object from an OrderExecuted message. Also converts values to other types if specified.
     * @function toObject
     * @memberof OrderExecuted
     * @static
     * @param {OrderExecuted} message OrderExecuted
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    OrderExecuted.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.accountNo = "";
            object.orderDate = "";
            object.orderNo = "";
            object.executionQuantity = 0;
            object.executionPrice = 0;
            object.deposit = 0;
            object.totalMargin = 0;
        }
        if (message.accountNo != null && message.hasOwnProperty("accountNo"))
            object.accountNo = message.accountNo;
        if (message.orderDate != null && message.hasOwnProperty("orderDate"))
            object.orderDate = message.orderDate;
        if (message.orderNo != null && message.hasOwnProperty("orderNo"))
            object.orderNo = message.orderNo;
        if (message.executionQuantity != null && message.hasOwnProperty("executionQuantity"))
            object.executionQuantity = options.json && !isFinite(message.executionQuantity) ? String(message.executionQuantity) : message.executionQuantity;
        if (message.executionPrice != null && message.hasOwnProperty("executionPrice"))
            object.executionPrice = options.json && !isFinite(message.executionPrice) ? String(message.executionPrice) : message.executionPrice;
        if (message.deposit != null && message.hasOwnProperty("deposit"))
            object.deposit = options.json && !isFinite(message.deposit) ? String(message.deposit) : message.deposit;
        if (message.totalMargin != null && message.hasOwnProperty("totalMargin"))
            object.totalMargin = options.json && !isFinite(message.totalMargin) ? String(message.totalMargin) : message.totalMargin;
        return object;
    };

    /**
     * Converts this OrderExecuted to JSON.
     * @function toJSON
     * @memberof OrderExecuted
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    OrderExecuted.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for OrderExecuted
     * @function getTypeUrl
     * @memberof OrderExecuted
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    OrderExecuted.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/OrderExecuted";
    };

    return OrderExecuted;
})();

export const BalanceUpdated = $root.BalanceUpdated = (() => {

    /**
     * Properties of a BalanceUpdated.
     * @exports IBalanceUpdated
     * @interface IBalanceUpdated
     * @property {string|null} [accountNo] BalanceUpdated accountNo
     * @property {string|null} [orderDate] BalanceUpdated orderDate
     * @property {string|null} [orderNo] BalanceUpdated orderNo
     * @property {string|null} [stockCd] BalanceUpdated stockCd
     * @property {string|null} [tradeCurrencyCd] BalanceUpdated tradeCurrencyCd
     * @property {string|null} [positionCd] BalanceUpdated positionCd
     * @property {string|null} [purchaseDate] BalanceUpdated purchaseDate
     * @property {number|null} [bookQuantity] BalanceUpdated bookQuantity
     * @property {number|null} [liquidationPossibleQuantity] BalanceUpdated liquidationPossibleQuantity
     * @property {number|null} [bookPrice] BalanceUpdated bookPrice
     * @property {number|null} [currentPrice] BalanceUpdated currentPrice
     * @property {number|null} [evaluationProfitLoss] BalanceUpdated evaluationProfitLoss
     * @property {string|null} [stockGroupCd] BalanceUpdated stockGroupCd
     * @property {string|null} [balanceNo] BalanceUpdated balanceNo
     */

    /**
     * Constructs a new BalanceUpdated.
     * @exports BalanceUpdated
     * @classdesc Represents a BalanceUpdated.
     * @implements IBalanceUpdated
     * @constructor
     * @param {IBalanceUpdated=} [properties] Properties to set
     */
    function BalanceUpdated(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * BalanceUpdated accountNo.
     * @member {string} accountNo
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.accountNo = "";

    /**
     * BalanceUpdated orderDate.
     * @member {string} orderDate
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.orderDate = "";

    /**
     * BalanceUpdated orderNo.
     * @member {string} orderNo
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.orderNo = "";

    /**
     * BalanceUpdated stockCd.
     * @member {string} stockCd
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.stockCd = "";

    /**
     * BalanceUpdated tradeCurrencyCd.
     * @member {string} tradeCurrencyCd
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.tradeCurrencyCd = "";

    /**
     * BalanceUpdated positionCd.
     * @member {string} positionCd
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.positionCd = "";

    /**
     * BalanceUpdated purchaseDate.
     * @member {string} purchaseDate
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.purchaseDate = "";

    /**
     * BalanceUpdated bookQuantity.
     * @member {number} bookQuantity
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.bookQuantity = 0;

    /**
     * BalanceUpdated liquidationPossibleQuantity.
     * @member {number} liquidationPossibleQuantity
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.liquidationPossibleQuantity = 0;

    /**
     * BalanceUpdated bookPrice.
     * @member {number} bookPrice
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.bookPrice = 0;

    /**
     * BalanceUpdated currentPrice.
     * @member {number} currentPrice
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.currentPrice = 0;

    /**
     * BalanceUpdated evaluationProfitLoss.
     * @member {number} evaluationProfitLoss
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.evaluationProfitLoss = 0;

    /**
     * BalanceUpdated stockGroupCd.
     * @member {string} stockGroupCd
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.stockGroupCd = "";

    /**
     * BalanceUpdated balanceNo.
     * @member {string} balanceNo
     * @memberof BalanceUpdated
     * @instance
     */
    BalanceUpdated.prototype.balanceNo = "";

    /**
     * Creates a new BalanceUpdated instance using the specified properties.
     * @function create
     * @memberof BalanceUpdated
     * @static
     * @param {IBalanceUpdated=} [properties] Properties to set
     * @returns {BalanceUpdated} BalanceUpdated instance
     */
    BalanceUpdated.create = function create(properties) {
        return new BalanceUpdated(properties);
    };

    /**
     * Encodes the specified BalanceUpdated message. Does not implicitly {@link BalanceUpdated.verify|verify} messages.
     * @function encode
     * @memberof BalanceUpdated
     * @static
     * @param {IBalanceUpdated} message BalanceUpdated message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BalanceUpdated.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.accountNo != null && Object.hasOwnProperty.call(message, "accountNo"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountNo);
        if (message.orderDate != null && Object.hasOwnProperty.call(message, "orderDate"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.orderDate);
        if (message.orderNo != null && Object.hasOwnProperty.call(message, "orderNo"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.orderNo);
        if (message.stockCd != null && Object.hasOwnProperty.call(message, "stockCd"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.stockCd);
        if (message.tradeCurrencyCd != null && Object.hasOwnProperty.call(message, "tradeCurrencyCd"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.tradeCurrencyCd);
        if (message.positionCd != null && Object.hasOwnProperty.call(message, "positionCd"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.positionCd);
        if (message.purchaseDate != null && Object.hasOwnProperty.call(message, "purchaseDate"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.purchaseDate);
        if (message.bookQuantity != null && Object.hasOwnProperty.call(message, "bookQuantity"))
            writer.uint32(/* id 8, wireType 1 =*/65).double(message.bookQuantity);
        if (message.liquidationPossibleQuantity != null && Object.hasOwnProperty.call(message, "liquidationPossibleQuantity"))
            writer.uint32(/* id 9, wireType 1 =*/73).double(message.liquidationPossibleQuantity);
        if (message.bookPrice != null && Object.hasOwnProperty.call(message, "bookPrice"))
            writer.uint32(/* id 10, wireType 1 =*/81).double(message.bookPrice);
        if (message.currentPrice != null && Object.hasOwnProperty.call(message, "currentPrice"))
            writer.uint32(/* id 11, wireType 1 =*/89).double(message.currentPrice);
        if (message.evaluationProfitLoss != null && Object.hasOwnProperty.call(message, "evaluationProfitLoss"))
            writer.uint32(/* id 12, wireType 1 =*/97).double(message.evaluationProfitLoss);
        if (message.stockGroupCd != null && Object.hasOwnProperty.call(message, "stockGroupCd"))
            writer.uint32(/* id 13, wireType 2 =*/106).string(message.stockGroupCd);
        if (message.balanceNo != null && Object.hasOwnProperty.call(message, "balanceNo"))
            writer.uint32(/* id 14, wireType 2 =*/114).string(message.balanceNo);
        return writer;
    };

    /**
     * Encodes the specified BalanceUpdated message, length delimited. Does not implicitly {@link BalanceUpdated.verify|verify} messages.
     * @function encodeDelimited
     * @memberof BalanceUpdated
     * @static
     * @param {IBalanceUpdated} message BalanceUpdated message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    BalanceUpdated.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a BalanceUpdated message from the specified reader or buffer.
     * @function decode
     * @memberof BalanceUpdated
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {BalanceUpdated} BalanceUpdated
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BalanceUpdated.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BalanceUpdated();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.accountNo = reader.string();
                    break;
                }
            case 2: {
                    message.orderDate = reader.string();
                    break;
                }
            case 3: {
                    message.orderNo = reader.string();
                    break;
                }
            case 4: {
                    message.stockCd = reader.string();
                    break;
                }
            case 5: {
                    message.tradeCurrencyCd = reader.string();
                    break;
                }
            case 6: {
                    message.positionCd = reader.string();
                    break;
                }
            case 7: {
                    message.purchaseDate = reader.string();
                    break;
                }
            case 8: {
                    message.bookQuantity = reader.double();
                    break;
                }
            case 9: {
                    message.liquidationPossibleQuantity = reader.double();
                    break;
                }
            case 10: {
                    message.bookPrice = reader.double();
                    break;
                }
            case 11: {
                    message.currentPrice = reader.double();
                    break;
                }
            case 12: {
                    message.evaluationProfitLoss = reader.double();
                    break;
                }
            case 13: {
                    message.stockGroupCd = reader.string();
                    break;
                }
            case 14: {
                    message.balanceNo = reader.string();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a BalanceUpdated message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof BalanceUpdated
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {BalanceUpdated} BalanceUpdated
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    BalanceUpdated.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a BalanceUpdated message.
     * @function verify
     * @memberof BalanceUpdated
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    BalanceUpdated.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.accountNo != null && message.hasOwnProperty("accountNo"))
            if (!$util.isString(message.accountNo))
                return "accountNo: string expected";
        if (message.orderDate != null && message.hasOwnProperty("orderDate"))
            if (!$util.isString(message.orderDate))
                return "orderDate: string expected";
        if (message.orderNo != null && message.hasOwnProperty("orderNo"))
            if (!$util.isString(message.orderNo))
                return "orderNo: string expected";
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            if (!$util.isString(message.stockCd))
                return "stockCd: string expected";
        if (message.tradeCurrencyCd != null && message.hasOwnProperty("tradeCurrencyCd"))
            if (!$util.isString(message.tradeCurrencyCd))
                return "tradeCurrencyCd: string expected";
        if (message.positionCd != null && message.hasOwnProperty("positionCd"))
            if (!$util.isString(message.positionCd))
                return "positionCd: string expected";
        if (message.purchaseDate != null && message.hasOwnProperty("purchaseDate"))
            if (!$util.isString(message.purchaseDate))
                return "purchaseDate: string expected";
        if (message.bookQuantity != null && message.hasOwnProperty("bookQuantity"))
            if (typeof message.bookQuantity !== "number")
                return "bookQuantity: number expected";
        if (message.liquidationPossibleQuantity != null && message.hasOwnProperty("liquidationPossibleQuantity"))
            if (typeof message.liquidationPossibleQuantity !== "number")
                return "liquidationPossibleQuantity: number expected";
        if (message.bookPrice != null && message.hasOwnProperty("bookPrice"))
            if (typeof message.bookPrice !== "number")
                return "bookPrice: number expected";
        if (message.currentPrice != null && message.hasOwnProperty("currentPrice"))
            if (typeof message.currentPrice !== "number")
                return "currentPrice: number expected";
        if (message.evaluationProfitLoss != null && message.hasOwnProperty("evaluationProfitLoss"))
            if (typeof message.evaluationProfitLoss !== "number")
                return "evaluationProfitLoss: number expected";
        if (message.stockGroupCd != null && message.hasOwnProperty("stockGroupCd"))
            if (!$util.isString(message.stockGroupCd))
                return "stockGroupCd: string expected";
        if (message.balanceNo != null && message.hasOwnProperty("balanceNo"))
            if (!$util.isString(message.balanceNo))
                return "balanceNo: string expected";
        return null;
    };

    /**
     * Creates a BalanceUpdated message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof BalanceUpdated
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {BalanceUpdated} BalanceUpdated
     */
    BalanceUpdated.fromObject = function fromObject(object) {
        if (object instanceof $root.BalanceUpdated)
            return object;
        let message = new $root.BalanceUpdated();
        if (object.accountNo != null)
            message.accountNo = String(object.accountNo);
        if (object.orderDate != null)
            message.orderDate = String(object.orderDate);
        if (object.orderNo != null)
            message.orderNo = String(object.orderNo);
        if (object.stockCd != null)
            message.stockCd = String(object.stockCd);
        if (object.tradeCurrencyCd != null)
            message.tradeCurrencyCd = String(object.tradeCurrencyCd);
        if (object.positionCd != null)
            message.positionCd = String(object.positionCd);
        if (object.purchaseDate != null)
            message.purchaseDate = String(object.purchaseDate);
        if (object.bookQuantity != null)
            message.bookQuantity = Number(object.bookQuantity);
        if (object.liquidationPossibleQuantity != null)
            message.liquidationPossibleQuantity = Number(object.liquidationPossibleQuantity);
        if (object.bookPrice != null)
            message.bookPrice = Number(object.bookPrice);
        if (object.currentPrice != null)
            message.currentPrice = Number(object.currentPrice);
        if (object.evaluationProfitLoss != null)
            message.evaluationProfitLoss = Number(object.evaluationProfitLoss);
        if (object.stockGroupCd != null)
            message.stockGroupCd = String(object.stockGroupCd);
        if (object.balanceNo != null)
            message.balanceNo = String(object.balanceNo);
        return message;
    };

    /**
     * Creates a plain object from a BalanceUpdated message. Also converts values to other types if specified.
     * @function toObject
     * @memberof BalanceUpdated
     * @static
     * @param {BalanceUpdated} message BalanceUpdated
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    BalanceUpdated.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.accountNo = "";
            object.orderDate = "";
            object.orderNo = "";
            object.stockCd = "";
            object.tradeCurrencyCd = "";
            object.positionCd = "";
            object.purchaseDate = "";
            object.bookQuantity = 0;
            object.liquidationPossibleQuantity = 0;
            object.bookPrice = 0;
            object.currentPrice = 0;
            object.evaluationProfitLoss = 0;
            object.stockGroupCd = "";
            object.balanceNo = "";
        }
        if (message.accountNo != null && message.hasOwnProperty("accountNo"))
            object.accountNo = message.accountNo;
        if (message.orderDate != null && message.hasOwnProperty("orderDate"))
            object.orderDate = message.orderDate;
        if (message.orderNo != null && message.hasOwnProperty("orderNo"))
            object.orderNo = message.orderNo;
        if (message.stockCd != null && message.hasOwnProperty("stockCd"))
            object.stockCd = message.stockCd;
        if (message.tradeCurrencyCd != null && message.hasOwnProperty("tradeCurrencyCd"))
            object.tradeCurrencyCd = message.tradeCurrencyCd;
        if (message.positionCd != null && message.hasOwnProperty("positionCd"))
            object.positionCd = message.positionCd;
        if (message.purchaseDate != null && message.hasOwnProperty("purchaseDate"))
            object.purchaseDate = message.purchaseDate;
        if (message.bookQuantity != null && message.hasOwnProperty("bookQuantity"))
            object.bookQuantity = options.json && !isFinite(message.bookQuantity) ? String(message.bookQuantity) : message.bookQuantity;
        if (message.liquidationPossibleQuantity != null && message.hasOwnProperty("liquidationPossibleQuantity"))
            object.liquidationPossibleQuantity = options.json && !isFinite(message.liquidationPossibleQuantity) ? String(message.liquidationPossibleQuantity) : message.liquidationPossibleQuantity;
        if (message.bookPrice != null && message.hasOwnProperty("bookPrice"))
            object.bookPrice = options.json && !isFinite(message.bookPrice) ? String(message.bookPrice) : message.bookPrice;
        if (message.currentPrice != null && message.hasOwnProperty("currentPrice"))
            object.currentPrice = options.json && !isFinite(message.currentPrice) ? String(message.currentPrice) : message.currentPrice;
        if (message.evaluationProfitLoss != null && message.hasOwnProperty("evaluationProfitLoss"))
            object.evaluationProfitLoss = options.json && !isFinite(message.evaluationProfitLoss) ? String(message.evaluationProfitLoss) : message.evaluationProfitLoss;
        if (message.stockGroupCd != null && message.hasOwnProperty("stockGroupCd"))
            object.stockGroupCd = message.stockGroupCd;
        if (message.balanceNo != null && message.hasOwnProperty("balanceNo"))
            object.balanceNo = message.balanceNo;
        return object;
    };

    /**
     * Converts this BalanceUpdated to JSON.
     * @function toJSON
     * @memberof BalanceUpdated
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    BalanceUpdated.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for BalanceUpdated
     * @function getTypeUrl
     * @memberof BalanceUpdated
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    BalanceUpdated.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/BalanceUpdated";
    };

    return BalanceUpdated;
})();

export const DepositUpdated = $root.DepositUpdated = (() => {

    /**
     * Properties of a DepositUpdated.
     * @exports IDepositUpdated
     * @interface IDepositUpdated
     * @property {string|null} [accountNo] DepositUpdated accountNo
     * @property {number|null} [depositAmount] DepositUpdated depositAmount
     */

    /**
     * Constructs a new DepositUpdated.
     * @exports DepositUpdated
     * @classdesc Represents a DepositUpdated.
     * @implements IDepositUpdated
     * @constructor
     * @param {IDepositUpdated=} [properties] Properties to set
     */
    function DepositUpdated(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DepositUpdated accountNo.
     * @member {string} accountNo
     * @memberof DepositUpdated
     * @instance
     */
    DepositUpdated.prototype.accountNo = "";

    /**
     * DepositUpdated depositAmount.
     * @member {number} depositAmount
     * @memberof DepositUpdated
     * @instance
     */
    DepositUpdated.prototype.depositAmount = 0;

    /**
     * Creates a new DepositUpdated instance using the specified properties.
     * @function create
     * @memberof DepositUpdated
     * @static
     * @param {IDepositUpdated=} [properties] Properties to set
     * @returns {DepositUpdated} DepositUpdated instance
     */
    DepositUpdated.create = function create(properties) {
        return new DepositUpdated(properties);
    };

    /**
     * Encodes the specified DepositUpdated message. Does not implicitly {@link DepositUpdated.verify|verify} messages.
     * @function encode
     * @memberof DepositUpdated
     * @static
     * @param {IDepositUpdated} message DepositUpdated message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DepositUpdated.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.accountNo != null && Object.hasOwnProperty.call(message, "accountNo"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountNo);
        if (message.depositAmount != null && Object.hasOwnProperty.call(message, "depositAmount"))
            writer.uint32(/* id 2, wireType 1 =*/17).double(message.depositAmount);
        return writer;
    };

    /**
     * Encodes the specified DepositUpdated message, length delimited. Does not implicitly {@link DepositUpdated.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DepositUpdated
     * @static
     * @param {IDepositUpdated} message DepositUpdated message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DepositUpdated.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DepositUpdated message from the specified reader or buffer.
     * @function decode
     * @memberof DepositUpdated
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DepositUpdated} DepositUpdated
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DepositUpdated.decode = function decode(reader, length, error) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.DepositUpdated();
        while (reader.pos < end) {
            let tag = reader.uint32();
            if (tag === error)
                break;
            switch (tag >>> 3) {
            case 1: {
                    message.accountNo = reader.string();
                    break;
                }
            case 2: {
                    message.depositAmount = reader.double();
                    break;
                }
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DepositUpdated message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DepositUpdated
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DepositUpdated} DepositUpdated
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DepositUpdated.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DepositUpdated message.
     * @function verify
     * @memberof DepositUpdated
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DepositUpdated.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.accountNo != null && message.hasOwnProperty("accountNo"))
            if (!$util.isString(message.accountNo))
                return "accountNo: string expected";
        if (message.depositAmount != null && message.hasOwnProperty("depositAmount"))
            if (typeof message.depositAmount !== "number")
                return "depositAmount: number expected";
        return null;
    };

    /**
     * Creates a DepositUpdated message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DepositUpdated
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DepositUpdated} DepositUpdated
     */
    DepositUpdated.fromObject = function fromObject(object) {
        if (object instanceof $root.DepositUpdated)
            return object;
        let message = new $root.DepositUpdated();
        if (object.accountNo != null)
            message.accountNo = String(object.accountNo);
        if (object.depositAmount != null)
            message.depositAmount = Number(object.depositAmount);
        return message;
    };

    /**
     * Creates a plain object from a DepositUpdated message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DepositUpdated
     * @static
     * @param {DepositUpdated} message DepositUpdated
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DepositUpdated.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.accountNo = "";
            object.depositAmount = 0;
        }
        if (message.accountNo != null && message.hasOwnProperty("accountNo"))
            object.accountNo = message.accountNo;
        if (message.depositAmount != null && message.hasOwnProperty("depositAmount"))
            object.depositAmount = options.json && !isFinite(message.depositAmount) ? String(message.depositAmount) : message.depositAmount;
        return object;
    };

    /**
     * Converts this DepositUpdated to JSON.
     * @function toJSON
     * @memberof DepositUpdated
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DepositUpdated.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the default type url for DepositUpdated
     * @function getTypeUrl
     * @memberof DepositUpdated
     * @static
     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns {string} The default type url
     */
    DepositUpdated.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
            typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/DepositUpdated";
    };

    return DepositUpdated;
})();

export { $root as default };
