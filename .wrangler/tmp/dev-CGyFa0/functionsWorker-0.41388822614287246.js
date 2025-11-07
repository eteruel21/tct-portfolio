var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/pages-hVe73h/functionsWorker-0.41388822614287246.mjs
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __esm = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
}, "__init"), "__esm");
var __commonJS = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, "__require"), "__commonJS");
var __copyProps = /* @__PURE__ */ __name((to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp2(to, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
}, "__copyProps");
var __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
)), "__toESM");
async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { nombre, email, telefono, mensaje } = data;
    if (!nombre || !email || !mensaje)
      return new Response(JSON.stringify({ error: "Campos obligatorios faltantes" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    const dominio = "https://tctservices-pty.com";
    const ADMIN_EMAIL = "contacto@tctservices-pty.com";
    const correoAdmin = `
      <div style="font-family:Arial,sans-serif;color:#0D3B66;max-width:600px;margin:auto;">
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Tel\xE9fono:</strong> ${telefono || "No especificado"}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="background:#f9f9f9;padding:12px;border-radius:8px;">${mensaje}</div>
      </div>
    `;
    const correoCliente = `
      <div style="font-family:Arial,sans-serif;color:#0D3B66;max-width:600px;margin:auto;">
        <div style="background-color:#0D3B66;color:white;text-align:center;padding:20px;">
          <img src="${dominio}/images/logo_tct.png" alt="TCT Services" style="max-width:120px;margin-bottom:10px;" />
          <h2 style="margin:0;">Mensaje recibido</h2>
        </div>
        <div style="padding:20px;background:#f9f9f9;">
          <p>Hola <strong>${nombre}</strong>,</p>
          <p>Tu mensaje fue recibido correctamente. Nuestro equipo te responder\xE1 lo antes posible.</p>
          <p><strong>Resumen:</strong></p>
          <div style="background:white;border:1px solid #ddd;padding:10px;border-radius:8px;">
            ${mensaje}
          </div>
          <p style="margin-top:15px;">Gracias por contactarnos.<br/>Atentamente,<br/><strong>TCT Services</strong></p>
        </div>
        <div style="background-color:#FFD700;color:#0D3B66;text-align:center;padding:10px;font-size:12px;">
          \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} TCT Services \u2014 Sistemas que Protegen y Automatizan
        </div>
      </div>
    `;
    const headersResend = {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    };
    const sendAdmin = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: headersResend,
      body: JSON.stringify({
        from: "TCT Services <no-reply@tctservices-pty.com>",
        to: ADMIN_EMAIL,
        subject: "Nuevo mensaje desde contacto - TCT Services",
        html: correoAdmin
      })
    });
    const sendCliente = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: headersResend,
      body: JSON.stringify({
        from: "TCT Services <no-reply@tctservices-pty.com>",
        to: email,
        subject: "Confirmaci\xF3n de contacto - TCT Services",
        html: correoCliente
      })
    });
    await Promise.allSettled([sendAdmin, sendCliente]);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error en /api/contacto:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost, "onRequestPost");
var init_contacto = __esm({
  "api/contacto.js"() {
    init_functionsRoutes_0_8534298748811979();
    __name2(onRequestPost, "onRequestPost");
  }
});
function publicoSinPrecios() {
  return CATALOGO.map(({ id, categoria, nombre, unidad }) => ({ id, categoria, nombre, unidad }));
}
__name(publicoSinPrecios, "publicoSinPrecios");
function calcular(items) {
  const index = new Map(CATALOGO.map((i) => [i.id, i]));
  const detalle = [];
  let subtotal = 0;
  for (const it of items) {
    const ref = index.get(it.id);
    if (!ref) continue;
    const cantidad = Number(it.cantidad) || 0;
    if (cantidad <= 0) continue;
    const precio_unit = ref.precio;
    const linea = precio_unit * cantidad;
    subtotal += linea;
    detalle.push({
      item_id: ref.id,
      nombre: ref.nombre,
      unidad: ref.unidad,
      cantidad,
      precio_unit,
      subtotal: Number(linea.toFixed(2)),
      categoria: ref.categoria
    });
  }
  const itbms = Number((subtotal * ITBMS).toFixed(2));
  const total = Number((subtotal + itbms).toFixed(2));
  return {
    detalle,
    subtotal: Number(subtotal.toFixed(2)),
    itbms,
    total
  };
}
__name(calcular, "calcular");
var ITBMS;
var init_catalogo = __esm({
  "lib/catalogo.js"() {
    init_functionsRoutes_0_8534298748811979();
    ITBMS = 0.07;
    __name2(publicoSinPrecios, "publicoSinPrecios");
    __name2(calcular, "calcular");
  }
});
var require_applicationIn = __commonJS({
  "../node_modules/svix/dist/models/applicationIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApplicationInSerializer = void 0;
    exports.ApplicationInSerializer = {
      _fromJsonObject(object) {
        return {
          metadata: object["metadata"],
          name: object["name"],
          rateLimit: object["rateLimit"],
          uid: object["uid"]
        };
      },
      _toJsonObject(self) {
        return {
          metadata: self.metadata,
          name: self.name,
          rateLimit: self.rateLimit,
          uid: self.uid
        };
      }
    };
  }
});
var require_applicationOut = __commonJS({
  "../node_modules/svix/dist/models/applicationOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApplicationOutSerializer = void 0;
    exports.ApplicationOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          id: object["id"],
          metadata: object["metadata"],
          name: object["name"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"])
        };
      },
      _toJsonObject(self) {
        return {
          createdAt: self.createdAt,
          id: self.id,
          metadata: self.metadata,
          name: self.name,
          rateLimit: self.rateLimit,
          uid: self.uid,
          updatedAt: self.updatedAt
        };
      }
    };
  }
});
var require_applicationPatch = __commonJS({
  "../node_modules/svix/dist/models/applicationPatch.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApplicationPatchSerializer = void 0;
    exports.ApplicationPatchSerializer = {
      _fromJsonObject(object) {
        return {
          metadata: object["metadata"],
          name: object["name"],
          rateLimit: object["rateLimit"],
          uid: object["uid"]
        };
      },
      _toJsonObject(self) {
        return {
          metadata: self.metadata,
          name: self.name,
          rateLimit: self.rateLimit,
          uid: self.uid
        };
      }
    };
  }
});
var require_listResponseApplicationOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseApplicationOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseApplicationOutSerializer = void 0;
    var applicationOut_1 = require_applicationOut();
    exports.ListResponseApplicationOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => applicationOut_1.ApplicationOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => applicationOut_1.ApplicationOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_util = __commonJS({
  "../node_modules/svix/dist/util.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApiException = void 0;
    var ApiException = class extends Error {
      static {
        __name(this, "ApiException");
      }
      static {
        __name2(this, "ApiException");
      }
      constructor(code, body, headers) {
        super(`HTTP-Code: ${code}
Headers: ${JSON.stringify(headers)}`);
        this.code = code;
        this.body = body;
        this.headers = {};
        headers.forEach((value, name) => {
          this.headers[name] = value;
        });
      }
    };
    exports.ApiException = ApiException;
  }
});
var require_max = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/max.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = exports.default = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  }
});
var require_nil = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/nil.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = exports.default = "00000000-0000-0000-0000-000000000000";
  }
});
var require_regex = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/regex.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
  }
});
var require_validate = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/validate.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    function validate(uuid) {
      return typeof uuid === "string" && _regex.default.test(uuid);
    }
    __name(validate, "validate");
    __name2(validate, "validate");
    var _default = exports.default = validate;
  }
});
var require_parse = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/parse.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    function parse2(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      var v;
      var arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    __name(parse2, "parse2");
    __name2(parse2, "parse");
    var _default = exports.default = parse2;
  }
});
var require_stringify = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/stringify.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    exports.unsafeStringify = unsafeStringify;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    var byteToHex = [];
    for (i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).slice(1));
    }
    var i;
    function unsafeStringify(arr, offset = 0) {
      return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    }
    __name(unsafeStringify, "unsafeStringify");
    __name2(unsafeStringify, "unsafeStringify");
    function stringify(arr, offset = 0) {
      var uuid = unsafeStringify(arr, offset);
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid;
    }
    __name(stringify, "stringify");
    __name2(stringify, "stringify");
    var _default = exports.default = stringify;
  }
});
var require_rng = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/rng.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var getRandomValues;
    var rnds8 = new Uint8Array(16);
    function rng() {
      if (!getRandomValues) {
        getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
        if (!getRandomValues) {
          throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        }
      }
      return getRandomValues(rnds8);
    }
    __name(rng, "rng");
    __name2(rng, "rng");
  }
});
var require_v1 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/v1.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v1(options, buf, offset) {
      var i = buf && offset || 0;
      var b = buf || new Array(16);
      options = options || {};
      var node = options.node;
      var clockseq = options.clockseq;
      if (!options._v6) {
        if (!node) {
          node = _nodeId;
        }
        if (clockseq == null) {
          clockseq = _clockseq;
        }
      }
      if (node == null || clockseq == null) {
        var seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = [seedBytes[0], seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
          if (!_nodeId && !options._v6) {
            node[0] |= 1;
            _nodeId = node;
          }
        }
        if (clockseq == null) {
          clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
          if (_clockseq === void 0 && !options._v6) {
            _clockseq = clockseq;
          }
        }
      }
      var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      var tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (var n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.unsafeStringify)(b);
    }
    __name(v1, "v1");
    __name2(v1, "v1");
    var _default = exports.default = v1;
  }
});
var require_v1ToV6 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/v1ToV6.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = v1ToV6;
    var _parse = _interopRequireDefault(require_parse());
    var _stringify = require_stringify();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    function v1ToV6(uuid) {
      var v1Bytes = typeof uuid === "string" ? (0, _parse.default)(uuid) : uuid;
      var v6Bytes = _v1ToV6(v1Bytes);
      return typeof uuid === "string" ? (0, _stringify.unsafeStringify)(v6Bytes) : v6Bytes;
    }
    __name(v1ToV6, "v1ToV6");
    __name2(v1ToV6, "v1ToV6");
    function _v1ToV6(v1Bytes, randomize = false) {
      return Uint8Array.of((v1Bytes[6] & 15) << 4 | v1Bytes[7] >> 4 & 15, (v1Bytes[7] & 15) << 4 | (v1Bytes[4] & 240) >> 4, (v1Bytes[4] & 15) << 4 | (v1Bytes[5] & 240) >> 4, (v1Bytes[5] & 15) << 4 | (v1Bytes[0] & 240) >> 4, (v1Bytes[0] & 15) << 4 | (v1Bytes[1] & 240) >> 4, (v1Bytes[1] & 15) << 4 | (v1Bytes[2] & 240) >> 4, 96 | v1Bytes[2] & 15, v1Bytes[3], v1Bytes[8], v1Bytes[9], v1Bytes[10], v1Bytes[11], v1Bytes[12], v1Bytes[13], v1Bytes[14], v1Bytes[15]);
    }
    __name(_v1ToV6, "_v1ToV6");
    __name2(_v1ToV6, "_v1ToV6");
  }
});
var require_v35 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/v35.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.URL = exports.DNS = void 0;
    exports.default = v35;
    var _stringify = require_stringify();
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      var bytes = [];
      for (var i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    __name(stringToBytes, "stringToBytes");
    __name2(stringToBytes, "stringToBytes");
    var DNS = exports.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    var URL2 = exports.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    function v35(name, version2, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        var _namespace;
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        var bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version2;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (var i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.unsafeStringify)(bytes);
      }
      __name(generateUUID, "generateUUID");
      __name2(generateUUID, "generateUUID");
      try {
        generateUUID.name = name;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL2;
      return generateUUID;
    }
    __name(v35, "v35");
    __name2(v35, "v35");
  }
});
var require_md5 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/md5.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function md5(bytes) {
      if (typeof bytes === "string") {
        var msg = unescape(encodeURIComponent(bytes));
        bytes = new Uint8Array(msg.length);
        for (var i = 0; i < msg.length; ++i) {
          bytes[i] = msg.charCodeAt(i);
        }
      }
      return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
    }
    __name(md5, "md5");
    __name2(md5, "md5");
    function md5ToHexEncodedArray(input) {
      var output = [];
      var length32 = input.length * 32;
      var hexTab = "0123456789abcdef";
      for (var i = 0; i < length32; i += 8) {
        var x = input[i >> 5] >>> i % 32 & 255;
        var hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
        output.push(hex);
      }
      return output;
    }
    __name(md5ToHexEncodedArray, "md5ToHexEncodedArray");
    __name2(md5ToHexEncodedArray, "md5ToHexEncodedArray");
    function getOutputLength(inputLength8) {
      return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
    }
    __name(getOutputLength, "getOutputLength");
    __name2(getOutputLength, "getOutputLength");
    function wordsToMd5(x, len) {
      x[len >> 5] |= 128 << len % 32;
      x[getOutputLength(len) - 1] = len;
      var a = 1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d = 271733878;
      for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
      }
      return [a, b, c, d];
    }
    __name(wordsToMd5, "wordsToMd5");
    __name2(wordsToMd5, "wordsToMd5");
    function bytesToWords(input) {
      if (input.length === 0) {
        return [];
      }
      var length8 = input.length * 8;
      var output = new Uint32Array(getOutputLength(length8));
      for (var i = 0; i < length8; i += 8) {
        output[i >> 5] |= (input[i / 8] & 255) << i % 32;
      }
      return output;
    }
    __name(bytesToWords, "bytesToWords");
    __name2(bytesToWords, "bytesToWords");
    function safeAdd(x, y) {
      var lsw = (x & 65535) + (y & 65535);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 65535;
    }
    __name(safeAdd, "safeAdd");
    __name2(safeAdd, "safeAdd");
    function bitRotateLeft(num, cnt) {
      return num << cnt | num >>> 32 - cnt;
    }
    __name(bitRotateLeft, "bitRotateLeft");
    __name2(bitRotateLeft, "bitRotateLeft");
    function md5cmn(q, a, b, x, s, t) {
      return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    }
    __name(md5cmn, "md5cmn");
    __name2(md5cmn, "md5cmn");
    function md5ff(a, b, c, d, x, s, t) {
      return md5cmn(b & c | ~b & d, a, b, x, s, t);
    }
    __name(md5ff, "md5ff");
    __name2(md5ff, "md5ff");
    function md5gg(a, b, c, d, x, s, t) {
      return md5cmn(b & d | c & ~d, a, b, x, s, t);
    }
    __name(md5gg, "md5gg");
    __name2(md5gg, "md5gg");
    function md5hh(a, b, c, d, x, s, t) {
      return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    __name(md5hh, "md5hh");
    __name2(md5hh, "md5hh");
    function md5ii(a, b, c, d, x, s, t) {
      return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    __name(md5ii, "md5ii");
    __name2(md5ii, "md5ii");
    var _default = exports.default = md5;
  }
});
var require_v3 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/v3.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    var v3 = (0, _v.default)("v3", 48, _md.default);
    var _default = exports.default = v3;
  }
});
var require_native = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/native.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
    var _default = exports.default = {
      randomUUID
    };
  }
});
var require_v4 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/v4.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _native = _interopRequireDefault(require_native());
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    function v4(options, buf, offset) {
      if (_native.default.randomUUID && !buf && !options) {
        return _native.default.randomUUID();
      }
      options = options || {};
      var rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (var i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.unsafeStringify)(rnds);
    }
    __name(v4, "v4");
    __name2(v4, "v4");
    var _default = exports.default = v4;
  }
});
var require_sha1 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/sha1.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    function f(s, x, y, z) {
      switch (s) {
        case 0:
          return x & y ^ ~x & z;
        case 1:
          return x ^ y ^ z;
        case 2:
          return x & y ^ x & z ^ y & z;
        case 3:
          return x ^ y ^ z;
      }
    }
    __name(f, "f");
    __name2(f, "f");
    function ROTL(x, n) {
      return x << n | x >>> 32 - n;
    }
    __name(ROTL, "ROTL");
    __name2(ROTL, "ROTL");
    function sha1(bytes) {
      var K = [1518500249, 1859775393, 2400959708, 3395469782];
      var H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
      if (typeof bytes === "string") {
        var msg = unescape(encodeURIComponent(bytes));
        bytes = [];
        for (var i = 0; i < msg.length; ++i) {
          bytes.push(msg.charCodeAt(i));
        }
      } else if (!Array.isArray(bytes)) {
        bytes = Array.prototype.slice.call(bytes);
      }
      bytes.push(128);
      var l = bytes.length / 4 + 2;
      var N = Math.ceil(l / 16);
      var M = new Array(N);
      for (var _i = 0; _i < N; ++_i) {
        var arr = new Uint32Array(16);
        for (var j = 0; j < 16; ++j) {
          arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
        }
        M[_i] = arr;
      }
      M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
      M[N - 1][14] = Math.floor(M[N - 1][14]);
      M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
      for (var _i2 = 0; _i2 < N; ++_i2) {
        var W = new Uint32Array(80);
        for (var t = 0; t < 16; ++t) {
          W[t] = M[_i2][t];
        }
        for (var _t = 16; _t < 80; ++_t) {
          W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
        }
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        for (var _t2 = 0; _t2 < 80; ++_t2) {
          var s = Math.floor(_t2 / 20);
          var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
          e = d;
          d = c;
          c = ROTL(b, 30) >>> 0;
          b = a;
          a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
      }
      return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
    }
    __name(sha1, "sha1");
    __name2(sha1, "sha1");
    var _default = exports.default = sha1;
  }
});
var require_v5 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/v5.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    var v5 = (0, _v.default)("v5", 80, _sha.default);
    var _default = exports.default = v5;
  }
});
var require_v6 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/v6.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = v6;
    var _stringify = require_stringify();
    var _v = _interopRequireDefault(require_v1());
    var _v1ToV = _interopRequireDefault(require_v1ToV6());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    __name(ownKeys, "ownKeys");
    __name2(ownKeys, "ownKeys");
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    __name(_objectSpread, "_objectSpread");
    __name2(_objectSpread, "_objectSpread");
    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
    }
    __name(_defineProperty, "_defineProperty");
    __name2(_defineProperty, "_defineProperty");
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == typeof i ? i : i + "";
    }
    __name(_toPropertyKey, "_toPropertyKey");
    __name2(_toPropertyKey, "_toPropertyKey");
    function _toPrimitive(t, r) {
      if ("object" != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    __name(_toPrimitive, "_toPrimitive");
    __name2(_toPrimitive, "_toPrimitive");
    function v6(options = {}, buf, offset = 0) {
      var bytes = (0, _v.default)(_objectSpread(_objectSpread({}, options), {}, {
        _v6: true
      }), new Uint8Array(16));
      bytes = (0, _v1ToV.default)(bytes);
      if (buf) {
        for (var i = 0; i < 16; i++) {
          buf[offset + i] = bytes[i];
        }
        return buf;
      }
      return (0, _stringify.unsafeStringify)(bytes);
    }
    __name(v6, "v6");
    __name2(v6, "v6");
  }
});
var require_v6ToV1 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/v6ToV1.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = v6ToV1;
    var _parse = _interopRequireDefault(require_parse());
    var _stringify = require_stringify();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    function v6ToV1(uuid) {
      var v6Bytes = typeof uuid === "string" ? (0, _parse.default)(uuid) : uuid;
      var v1Bytes = _v6ToV1(v6Bytes);
      return typeof uuid === "string" ? (0, _stringify.unsafeStringify)(v1Bytes) : v1Bytes;
    }
    __name(v6ToV1, "v6ToV1");
    __name2(v6ToV1, "v6ToV1");
    function _v6ToV1(v6Bytes) {
      return Uint8Array.of((v6Bytes[3] & 15) << 4 | v6Bytes[4] >> 4 & 15, (v6Bytes[4] & 15) << 4 | (v6Bytes[5] & 240) >> 4, (v6Bytes[5] & 15) << 4 | v6Bytes[6] & 15, v6Bytes[7], (v6Bytes[1] & 15) << 4 | (v6Bytes[2] & 240) >> 4, (v6Bytes[2] & 15) << 4 | (v6Bytes[3] & 240) >> 4, 16 | (v6Bytes[0] & 240) >> 4, (v6Bytes[0] & 15) << 4 | (v6Bytes[1] & 240) >> 4, v6Bytes[8], v6Bytes[9], v6Bytes[10], v6Bytes[11], v6Bytes[12], v6Bytes[13], v6Bytes[14], v6Bytes[15]);
    }
    __name(_v6ToV1, "_v6ToV1");
    __name2(_v6ToV1, "_v6ToV1");
  }
});
var require_v7 = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/v7.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = require_stringify();
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    var _seqLow = null;
    var _seqHigh = null;
    var _msecs = 0;
    function v7(options, buf, offset) {
      options = options || {};
      var i = buf && offset || 0;
      var b = buf || new Uint8Array(16);
      var rnds = options.random || (options.rng || _rng.default)();
      var msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      var seq = options.seq !== void 0 ? options.seq : null;
      var seqHigh = _seqHigh;
      var seqLow = _seqLow;
      if (msecs > _msecs && options.msecs === void 0) {
        _msecs = msecs;
        if (seq !== null) {
          seqHigh = null;
          seqLow = null;
        }
      }
      if (seq !== null) {
        if (seq > 2147483647) {
          seq = 2147483647;
        }
        seqHigh = seq >>> 19 & 4095;
        seqLow = seq & 524287;
      }
      if (seqHigh === null || seqLow === null) {
        seqHigh = rnds[6] & 127;
        seqHigh = seqHigh << 8 | rnds[7];
        seqLow = rnds[8] & 63;
        seqLow = seqLow << 8 | rnds[9];
        seqLow = seqLow << 5 | rnds[10] >>> 3;
      }
      if (msecs + 1e4 > _msecs && seq === null) {
        if (++seqLow > 524287) {
          seqLow = 0;
          if (++seqHigh > 4095) {
            seqHigh = 0;
            _msecs++;
          }
        }
      } else {
        _msecs = msecs;
      }
      _seqHigh = seqHigh;
      _seqLow = seqLow;
      b[i++] = _msecs / 1099511627776 & 255;
      b[i++] = _msecs / 4294967296 & 255;
      b[i++] = _msecs / 16777216 & 255;
      b[i++] = _msecs / 65536 & 255;
      b[i++] = _msecs / 256 & 255;
      b[i++] = _msecs & 255;
      b[i++] = seqHigh >>> 4 & 15 | 112;
      b[i++] = seqHigh & 255;
      b[i++] = seqLow >>> 13 & 63 | 128;
      b[i++] = seqLow >>> 5 & 255;
      b[i++] = seqLow << 3 & 255 | rnds[10] & 7;
      b[i++] = rnds[11];
      b[i++] = rnds[12];
      b[i++] = rnds[13];
      b[i++] = rnds[14];
      b[i++] = rnds[15];
      return buf || (0, _stringify.unsafeStringify)(b);
    }
    __name(v7, "v7");
    __name2(v7, "v7");
    var _default = exports.default = v7;
  }
});
var require_version = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/version.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
    function version2(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid.slice(14, 15), 16);
    }
    __name(version2, "version2");
    __name2(version2, "version");
    var _default = exports.default = version2;
  }
});
var require_commonjs_browser = __commonJS({
  "../node_modules/uuid/dist/commonjs-browser/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "MAX", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _max.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _nil.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _parse.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _stringify.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _v.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "v1ToV6", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _v1ToV.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _v2.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _v3.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _v4.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "v6", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _v5.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "v6ToV1", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _v6ToV.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "v7", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _v6.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _validate.default;
      }, "get"), "get")
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function get() {
        return _version.default;
      }, "get"), "get")
    });
    var _max = _interopRequireDefault(require_max());
    var _nil = _interopRequireDefault(require_nil());
    var _parse = _interopRequireDefault(require_parse());
    var _stringify = _interopRequireDefault(require_stringify());
    var _v = _interopRequireDefault(require_v1());
    var _v1ToV = _interopRequireDefault(require_v1ToV6());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _v5 = _interopRequireDefault(require_v6());
    var _v6ToV = _interopRequireDefault(require_v6ToV1());
    var _v6 = _interopRequireDefault(require_v7());
    var _validate = _interopRequireDefault(require_validate());
    var _version = _interopRequireDefault(require_version());
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : { default: e };
    }
    __name(_interopRequireDefault, "_interopRequireDefault");
    __name2(_interopRequireDefault, "_interopRequireDefault");
  }
});
var require_request = __commonJS({
  "../node_modules/svix/dist/request.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      __name(adopt, "adopt");
      __name2(adopt, "adopt");
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        __name(fulfilled, "fulfilled");
        __name2(fulfilled, "fulfilled");
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        __name(rejected, "rejected");
        __name2(rejected, "rejected");
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        __name(step, "step");
        __name2(step, "step");
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SvixRequest = exports.HttpMethod = exports.LIB_VERSION = void 0;
    var util_1 = require_util();
    var uuid_1 = require_commonjs_browser();
    exports.LIB_VERSION = "1.76.1";
    var USER_AGENT = `svix-libs/${exports.LIB_VERSION}/javascript`;
    var HttpMethod;
    (function(HttpMethod2) {
      HttpMethod2["GET"] = "GET";
      HttpMethod2["HEAD"] = "HEAD";
      HttpMethod2["POST"] = "POST";
      HttpMethod2["PUT"] = "PUT";
      HttpMethod2["DELETE"] = "DELETE";
      HttpMethod2["CONNECT"] = "CONNECT";
      HttpMethod2["OPTIONS"] = "OPTIONS";
      HttpMethod2["TRACE"] = "TRACE";
      HttpMethod2["PATCH"] = "PATCH";
    })(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
    var SvixRequest = class {
      static {
        __name(this, "SvixRequest");
      }
      static {
        __name2(this, "SvixRequest");
      }
      constructor(method, path) {
        this.method = method;
        this.path = path;
        this.queryParams = {};
        this.headerParams = {};
      }
      setPathParam(name, value) {
        const newPath = this.path.replace(`{${name}}`, encodeURIComponent(value));
        if (this.path === newPath) {
          throw new Error(`path parameter ${name} not found`);
        }
        this.path = newPath;
      }
      setQueryParam(name, value) {
        if (value === void 0 || value === null) {
          return;
        }
        if (typeof value === "string") {
          this.queryParams[name] = value;
        } else if (typeof value === "boolean" || typeof value === "number") {
          this.queryParams[name] = value.toString();
        } else if (value instanceof Date) {
          this.queryParams[name] = value.toISOString();
        } else if (value instanceof Array) {
          if (value.length > 0) {
            this.queryParams[name] = value.join(",");
          }
        } else {
          const _assert_unreachable = value;
          throw new Error(`query parameter ${name} has unsupported type`);
        }
      }
      setHeaderParam(name, value) {
        if (value === void 0) {
          return;
        }
        this.headerParams[name] = value;
      }
      setBody(value) {
        this.body = JSON.stringify(value);
      }
      send(ctx, parseResponseBody) {
        return __awaiter(this, void 0, void 0, function* () {
          const response = yield this.sendInner(ctx);
          if (response.status == 204) {
            return null;
          }
          const responseBody = yield response.text();
          return parseResponseBody(JSON.parse(responseBody));
        });
      }
      sendNoResponseBody(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
          yield this.sendInner(ctx);
        });
      }
      sendInner(ctx) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
          const url = new URL(ctx.baseUrl + this.path);
          for (const [name, value] of Object.entries(this.queryParams)) {
            url.searchParams.set(name, value);
          }
          if (this.headerParams["idempotency-key"] === void 0 && this.method.toUpperCase() === "POST") {
            this.headerParams["idempotency-key"] = "auto_" + (0, uuid_1.v4)();
          }
          const randomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
          if (this.body != null) {
            this.headerParams["content-type"] = "application/json";
          }
          const isCredentialsSupported = "credentials" in Request.prototype;
          const response = yield sendWithRetry(url, {
            method: this.method.toString(),
            body: this.body,
            headers: Object.assign({ accept: "application/json, */*;q=0.8", authorization: `Bearer ${ctx.token}`, "user-agent": USER_AGENT, "svix-req-id": randomId.toString() }, this.headerParams),
            credentials: isCredentialsSupported ? "same-origin" : void 0,
            signal: ctx.timeout !== void 0 ? AbortSignal.timeout(ctx.timeout) : void 0
          }, ctx.retryScheduleInMs, (_a = ctx.retryScheduleInMs) === null || _a === void 0 ? void 0 : _a[0], ((_b = ctx.retryScheduleInMs) === null || _b === void 0 ? void 0 : _b.length) || ctx.numRetries);
          return filterResponseForErrors(response);
        });
      }
    };
    exports.SvixRequest = SvixRequest;
    function filterResponseForErrors(response) {
      return __awaiter(this, void 0, void 0, function* () {
        if (response.status < 300) {
          return response;
        }
        const responseBody = yield response.text();
        if (response.status === 422) {
          throw new util_1.ApiException(response.status, JSON.parse(responseBody), response.headers);
        }
        if (response.status >= 400 && response.status <= 499) {
          throw new util_1.ApiException(response.status, JSON.parse(responseBody), response.headers);
        }
        throw new util_1.ApiException(response.status, responseBody, response.headers);
      });
    }
    __name(filterResponseForErrors, "filterResponseForErrors");
    __name2(filterResponseForErrors, "filterResponseForErrors");
    function sendWithRetry(url, init, retryScheduleInMs, nextInterval = 50, triesLeft = 2, retryCount = 1) {
      return __awaiter(this, void 0, void 0, function* () {
        const sleep = /* @__PURE__ */ __name2((interval) => new Promise((resolve) => setTimeout(resolve, interval)), "sleep");
        try {
          const response = yield fetch(url, init);
          if (triesLeft <= 0 || response.status < 500) {
            return response;
          }
        } catch (e) {
          if (triesLeft <= 0) {
            throw e;
          }
        }
        yield sleep(nextInterval);
        init.headers["svix-retry-count"] = retryCount.toString();
        nextInterval = (retryScheduleInMs === null || retryScheduleInMs === void 0 ? void 0 : retryScheduleInMs[retryCount]) || nextInterval * 2;
        return yield sendWithRetry(url, init, retryScheduleInMs, nextInterval, --triesLeft, ++retryCount);
      });
    }
    __name(sendWithRetry, "sendWithRetry");
    __name2(sendWithRetry, "sendWithRetry");
  }
});
var require_application = __commonJS({
  "../node_modules/svix/dist/api/application.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Application = void 0;
    var applicationIn_1 = require_applicationIn();
    var applicationOut_1 = require_applicationOut();
    var applicationPatch_1 = require_applicationPatch();
    var listResponseApplicationOut_1 = require_listResponseApplicationOut();
    var request_1 = require_request();
    var Application = class {
      static {
        __name(this, "Application");
      }
      static {
        __name2(this, "Application");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app");
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseApplicationOut_1.ListResponseApplicationOutSerializer._fromJsonObject);
      }
      create(applicationIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
      }
      getOrCreate(applicationIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app");
        request.setQueryParam("get_if_exists", true);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
      }
      get(appId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}");
        request.setPathParam("app_id", appId);
        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
      }
      update(appId, applicationIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}");
        request.setPathParam("app_id", appId);
        request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
      }
      delete(appId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}");
        request.setPathParam("app_id", appId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      patch(appId, applicationPatch) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}");
        request.setPathParam("app_id", appId);
        request.setBody(applicationPatch_1.ApplicationPatchSerializer._toJsonObject(applicationPatch));
        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
      }
    };
    exports.Application = Application;
  }
});
var require_appPortalCapability = __commonJS({
  "../node_modules/svix/dist/models/appPortalCapability.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppPortalCapabilitySerializer = exports.AppPortalCapability = void 0;
    var AppPortalCapability;
    (function(AppPortalCapability2) {
      AppPortalCapability2["ViewBase"] = "ViewBase";
      AppPortalCapability2["ViewEndpointSecret"] = "ViewEndpointSecret";
      AppPortalCapability2["ManageEndpointSecret"] = "ManageEndpointSecret";
      AppPortalCapability2["ManageTransformations"] = "ManageTransformations";
      AppPortalCapability2["CreateAttempts"] = "CreateAttempts";
      AppPortalCapability2["ManageEndpoint"] = "ManageEndpoint";
    })(AppPortalCapability = exports.AppPortalCapability || (exports.AppPortalCapability = {}));
    exports.AppPortalCapabilitySerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self) {
        return self;
      }
    };
  }
});
var require_appPortalAccessIn = __commonJS({
  "../node_modules/svix/dist/models/appPortalAccessIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppPortalAccessInSerializer = void 0;
    var appPortalCapability_1 = require_appPortalCapability();
    var applicationIn_1 = require_applicationIn();
    exports.AppPortalAccessInSerializer = {
      _fromJsonObject(object) {
        var _a;
        return {
          application: object["application"] ? applicationIn_1.ApplicationInSerializer._fromJsonObject(object["application"]) : void 0,
          capabilities: (_a = object["capabilities"]) === null || _a === void 0 ? void 0 : _a.map((item) => appPortalCapability_1.AppPortalCapabilitySerializer._fromJsonObject(item)),
          expiry: object["expiry"],
          featureFlags: object["featureFlags"],
          readOnly: object["readOnly"],
          sessionId: object["sessionId"]
        };
      },
      _toJsonObject(self) {
        var _a;
        return {
          application: self.application ? applicationIn_1.ApplicationInSerializer._toJsonObject(self.application) : void 0,
          capabilities: (_a = self.capabilities) === null || _a === void 0 ? void 0 : _a.map((item) => appPortalCapability_1.AppPortalCapabilitySerializer._toJsonObject(item)),
          expiry: self.expiry,
          featureFlags: self.featureFlags,
          readOnly: self.readOnly,
          sessionId: self.sessionId
        };
      }
    };
  }
});
var require_appPortalAccessOut = __commonJS({
  "../node_modules/svix/dist/models/appPortalAccessOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppPortalAccessOutSerializer = void 0;
    exports.AppPortalAccessOutSerializer = {
      _fromJsonObject(object) {
        return {
          token: object["token"],
          url: object["url"]
        };
      },
      _toJsonObject(self) {
        return {
          token: self.token,
          url: self.url
        };
      }
    };
  }
});
var require_applicationTokenExpireIn = __commonJS({
  "../node_modules/svix/dist/models/applicationTokenExpireIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApplicationTokenExpireInSerializer = void 0;
    exports.ApplicationTokenExpireInSerializer = {
      _fromJsonObject(object) {
        return {
          expiry: object["expiry"],
          sessionIds: object["sessionIds"]
        };
      },
      _toJsonObject(self) {
        return {
          expiry: self.expiry,
          sessionIds: self.sessionIds
        };
      }
    };
  }
});
var require_dashboardAccessOut = __commonJS({
  "../node_modules/svix/dist/models/dashboardAccessOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DashboardAccessOutSerializer = void 0;
    exports.DashboardAccessOutSerializer = {
      _fromJsonObject(object) {
        return {
          token: object["token"],
          url: object["url"]
        };
      },
      _toJsonObject(self) {
        return {
          token: self.token,
          url: self.url
        };
      }
    };
  }
});
var require_authentication = __commonJS({
  "../node_modules/svix/dist/api/authentication.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Authentication = void 0;
    var appPortalAccessIn_1 = require_appPortalAccessIn();
    var appPortalAccessOut_1 = require_appPortalAccessOut();
    var applicationTokenExpireIn_1 = require_applicationTokenExpireIn();
    var dashboardAccessOut_1 = require_dashboardAccessOut();
    var request_1 = require_request();
    var Authentication = class {
      static {
        __name(this, "Authentication");
      }
      static {
        __name2(this, "Authentication");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      appPortalAccess(appId, appPortalAccessIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/app-portal-access/{app_id}");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(appPortalAccessIn_1.AppPortalAccessInSerializer._toJsonObject(appPortalAccessIn));
        return request.send(this.requestCtx, appPortalAccessOut_1.AppPortalAccessOutSerializer._fromJsonObject);
      }
      expireAll(appId, applicationTokenExpireIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/app/{app_id}/expire-all");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(applicationTokenExpireIn_1.ApplicationTokenExpireInSerializer._toJsonObject(applicationTokenExpireIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      dashboardAccess(appId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/dashboard-access/{app_id}");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.send(this.requestCtx, dashboardAccessOut_1.DashboardAccessOutSerializer._fromJsonObject);
      }
      logout(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/logout");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    exports.Authentication = Authentication;
  }
});
var require_backgroundTaskStatus = __commonJS({
  "../node_modules/svix/dist/models/backgroundTaskStatus.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundTaskStatusSerializer = exports.BackgroundTaskStatus = void 0;
    var BackgroundTaskStatus;
    (function(BackgroundTaskStatus2) {
      BackgroundTaskStatus2["Running"] = "running";
      BackgroundTaskStatus2["Finished"] = "finished";
      BackgroundTaskStatus2["Failed"] = "failed";
    })(BackgroundTaskStatus = exports.BackgroundTaskStatus || (exports.BackgroundTaskStatus = {}));
    exports.BackgroundTaskStatusSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self) {
        return self;
      }
    };
  }
});
var require_backgroundTaskType = __commonJS({
  "../node_modules/svix/dist/models/backgroundTaskType.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundTaskTypeSerializer = exports.BackgroundTaskType = void 0;
    var BackgroundTaskType;
    (function(BackgroundTaskType2) {
      BackgroundTaskType2["EndpointReplay"] = "endpoint.replay";
      BackgroundTaskType2["EndpointRecover"] = "endpoint.recover";
      BackgroundTaskType2["ApplicationStats"] = "application.stats";
      BackgroundTaskType2["MessageBroadcast"] = "message.broadcast";
      BackgroundTaskType2["SdkGenerate"] = "sdk.generate";
      BackgroundTaskType2["EventTypeAggregate"] = "event-type.aggregate";
      BackgroundTaskType2["ApplicationPurgeContent"] = "application.purge_content";
    })(BackgroundTaskType = exports.BackgroundTaskType || (exports.BackgroundTaskType = {}));
    exports.BackgroundTaskTypeSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self) {
        return self;
      }
    };
  }
});
var require_backgroundTaskOut = __commonJS({
  "../node_modules/svix/dist/models/backgroundTaskOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundTaskOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.BackgroundTaskOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"],
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"])
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data,
          id: self.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task)
        };
      }
    };
  }
});
var require_listResponseBackgroundTaskOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseBackgroundTaskOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseBackgroundTaskOutSerializer = void 0;
    var backgroundTaskOut_1 = require_backgroundTaskOut();
    exports.ListResponseBackgroundTaskOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => backgroundTaskOut_1.BackgroundTaskOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => backgroundTaskOut_1.BackgroundTaskOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_backgroundTask = __commonJS({
  "../node_modules/svix/dist/api/backgroundTask.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundTask = void 0;
    var backgroundTaskOut_1 = require_backgroundTaskOut();
    var listResponseBackgroundTaskOut_1 = require_listResponseBackgroundTaskOut();
    var request_1 = require_request();
    var BackgroundTask = class {
      static {
        __name(this, "BackgroundTask");
      }
      static {
        __name2(this, "BackgroundTask");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/background-task");
        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
        request.setQueryParam("task", options === null || options === void 0 ? void 0 : options.task);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseBackgroundTaskOut_1.ListResponseBackgroundTaskOutSerializer._fromJsonObject);
      }
      listByEndpoint(options) {
        return this.list(options);
      }
      get(taskId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/background-task/{task_id}");
        request.setPathParam("task_id", taskId);
        return request.send(this.requestCtx, backgroundTaskOut_1.BackgroundTaskOutSerializer._fromJsonObject);
      }
    };
    exports.BackgroundTask = BackgroundTask;
  }
});
var require_endpointHeadersIn = __commonJS({
  "../node_modules/svix/dist/models/endpointHeadersIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointHeadersInSerializer = void 0;
    exports.EndpointHeadersInSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"]
        };
      },
      _toJsonObject(self) {
        return {
          headers: self.headers
        };
      }
    };
  }
});
var require_endpointHeadersOut = __commonJS({
  "../node_modules/svix/dist/models/endpointHeadersOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointHeadersOutSerializer = void 0;
    exports.EndpointHeadersOutSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"],
          sensitive: object["sensitive"]
        };
      },
      _toJsonObject(self) {
        return {
          headers: self.headers,
          sensitive: self.sensitive
        };
      }
    };
  }
});
var require_endpointHeadersPatchIn = __commonJS({
  "../node_modules/svix/dist/models/endpointHeadersPatchIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointHeadersPatchInSerializer = void 0;
    exports.EndpointHeadersPatchInSerializer = {
      _fromJsonObject(object) {
        return {
          deleteHeaders: object["deleteHeaders"],
          headers: object["headers"]
        };
      },
      _toJsonObject(self) {
        return {
          deleteHeaders: self.deleteHeaders,
          headers: self.headers
        };
      }
    };
  }
});
var require_endpointIn = __commonJS({
  "../node_modules/svix/dist/models/endpointIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointInSerializer = void 0;
    exports.EndpointInSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          headers: object["headers"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          secret: object["secret"],
          uid: object["uid"],
          url: object["url"],
          version: object["version"]
        };
      },
      _toJsonObject(self) {
        return {
          channels: self.channels,
          description: self.description,
          disabled: self.disabled,
          filterTypes: self.filterTypes,
          headers: self.headers,
          metadata: self.metadata,
          rateLimit: self.rateLimit,
          secret: self.secret,
          uid: self.uid,
          url: self.url,
          version: self.version
        };
      }
    };
  }
});
var require_endpointOut = __commonJS({
  "../node_modules/svix/dist/models/endpointOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointOutSerializer = void 0;
    exports.EndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          createdAt: new Date(object["createdAt"]),
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          id: object["id"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"]),
          url: object["url"],
          version: object["version"]
        };
      },
      _toJsonObject(self) {
        return {
          channels: self.channels,
          createdAt: self.createdAt,
          description: self.description,
          disabled: self.disabled,
          filterTypes: self.filterTypes,
          id: self.id,
          metadata: self.metadata,
          rateLimit: self.rateLimit,
          uid: self.uid,
          updatedAt: self.updatedAt,
          url: self.url,
          version: self.version
        };
      }
    };
  }
});
var require_endpointPatch = __commonJS({
  "../node_modules/svix/dist/models/endpointPatch.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointPatchSerializer = void 0;
    exports.EndpointPatchSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          secret: object["secret"],
          uid: object["uid"],
          url: object["url"],
          version: object["version"]
        };
      },
      _toJsonObject(self) {
        return {
          channels: self.channels,
          description: self.description,
          disabled: self.disabled,
          filterTypes: self.filterTypes,
          metadata: self.metadata,
          rateLimit: self.rateLimit,
          secret: self.secret,
          uid: self.uid,
          url: self.url,
          version: self.version
        };
      }
    };
  }
});
var require_endpointSecretOut = __commonJS({
  "../node_modules/svix/dist/models/endpointSecretOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointSecretOutSerializer = void 0;
    exports.EndpointSecretOutSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self) {
        return {
          key: self.key
        };
      }
    };
  }
});
var require_endpointSecretRotateIn = __commonJS({
  "../node_modules/svix/dist/models/endpointSecretRotateIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointSecretRotateInSerializer = void 0;
    exports.EndpointSecretRotateInSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self) {
        return {
          key: self.key
        };
      }
    };
  }
});
var require_endpointStats = __commonJS({
  "../node_modules/svix/dist/models/endpointStats.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointStatsSerializer = void 0;
    exports.EndpointStatsSerializer = {
      _fromJsonObject(object) {
        return {
          fail: object["fail"],
          pending: object["pending"],
          sending: object["sending"],
          success: object["success"]
        };
      },
      _toJsonObject(self) {
        return {
          fail: self.fail,
          pending: self.pending,
          sending: self.sending,
          success: self.success
        };
      }
    };
  }
});
var require_endpointTransformationIn = __commonJS({
  "../node_modules/svix/dist/models/endpointTransformationIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointTransformationInSerializer = void 0;
    exports.EndpointTransformationInSerializer = {
      _fromJsonObject(object) {
        return {
          code: object["code"],
          enabled: object["enabled"]
        };
      },
      _toJsonObject(self) {
        return {
          code: self.code,
          enabled: self.enabled
        };
      }
    };
  }
});
var require_endpointTransformationOut = __commonJS({
  "../node_modules/svix/dist/models/endpointTransformationOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointTransformationOutSerializer = void 0;
    exports.EndpointTransformationOutSerializer = {
      _fromJsonObject(object) {
        return {
          code: object["code"],
          enabled: object["enabled"]
        };
      },
      _toJsonObject(self) {
        return {
          code: self.code,
          enabled: self.enabled
        };
      }
    };
  }
});
var require_endpointTransformationPatch = __commonJS({
  "../node_modules/svix/dist/models/endpointTransformationPatch.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointTransformationPatchSerializer = void 0;
    exports.EndpointTransformationPatchSerializer = {
      _fromJsonObject(object) {
        return {
          code: object["code"],
          enabled: object["enabled"]
        };
      },
      _toJsonObject(self) {
        return {
          code: self.code,
          enabled: self.enabled
        };
      }
    };
  }
});
var require_endpointUpdate = __commonJS({
  "../node_modules/svix/dist/models/endpointUpdate.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointUpdateSerializer = void 0;
    exports.EndpointUpdateSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          url: object["url"],
          version: object["version"]
        };
      },
      _toJsonObject(self) {
        return {
          channels: self.channels,
          description: self.description,
          disabled: self.disabled,
          filterTypes: self.filterTypes,
          metadata: self.metadata,
          rateLimit: self.rateLimit,
          uid: self.uid,
          url: self.url,
          version: self.version
        };
      }
    };
  }
});
var require_eventExampleIn = __commonJS({
  "../node_modules/svix/dist/models/eventExampleIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventExampleInSerializer = void 0;
    exports.EventExampleInSerializer = {
      _fromJsonObject(object) {
        return {
          eventType: object["eventType"],
          exampleIndex: object["exampleIndex"]
        };
      },
      _toJsonObject(self) {
        return {
          eventType: self.eventType,
          exampleIndex: self.exampleIndex
        };
      }
    };
  }
});
var require_listResponseEndpointOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseEndpointOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseEndpointOutSerializer = void 0;
    var endpointOut_1 = require_endpointOut();
    exports.ListResponseEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => endpointOut_1.EndpointOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => endpointOut_1.EndpointOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_messageOut = __commonJS({
  "../node_modules/svix/dist/models/messageOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageOutSerializer = void 0;
    exports.MessageOutSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          eventId: object["eventId"],
          eventType: object["eventType"],
          id: object["id"],
          payload: object["payload"],
          tags: object["tags"],
          timestamp: new Date(object["timestamp"])
        };
      },
      _toJsonObject(self) {
        return {
          channels: self.channels,
          eventId: self.eventId,
          eventType: self.eventType,
          id: self.id,
          payload: self.payload,
          tags: self.tags,
          timestamp: self.timestamp
        };
      }
    };
  }
});
var require_recoverIn = __commonJS({
  "../node_modules/svix/dist/models/recoverIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RecoverInSerializer = void 0;
    exports.RecoverInSerializer = {
      _fromJsonObject(object) {
        return {
          since: new Date(object["since"]),
          until: object["until"] ? new Date(object["until"]) : null
        };
      },
      _toJsonObject(self) {
        return {
          since: self.since,
          until: self.until
        };
      }
    };
  }
});
var require_recoverOut = __commonJS({
  "../node_modules/svix/dist/models/recoverOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RecoverOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.RecoverOutSerializer = {
      _fromJsonObject(object) {
        return {
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"])
        };
      },
      _toJsonObject(self) {
        return {
          id: self.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task)
        };
      }
    };
  }
});
var require_replayIn = __commonJS({
  "../node_modules/svix/dist/models/replayIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReplayInSerializer = void 0;
    exports.ReplayInSerializer = {
      _fromJsonObject(object) {
        return {
          since: new Date(object["since"]),
          until: object["until"] ? new Date(object["until"]) : null
        };
      },
      _toJsonObject(self) {
        return {
          since: self.since,
          until: self.until
        };
      }
    };
  }
});
var require_replayOut = __commonJS({
  "../node_modules/svix/dist/models/replayOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReplayOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.ReplayOutSerializer = {
      _fromJsonObject(object) {
        return {
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"])
        };
      },
      _toJsonObject(self) {
        return {
          id: self.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task)
        };
      }
    };
  }
});
var require_endpoint = __commonJS({
  "../node_modules/svix/dist/api/endpoint.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Endpoint = void 0;
    var endpointHeadersIn_1 = require_endpointHeadersIn();
    var endpointHeadersOut_1 = require_endpointHeadersOut();
    var endpointHeadersPatchIn_1 = require_endpointHeadersPatchIn();
    var endpointIn_1 = require_endpointIn();
    var endpointOut_1 = require_endpointOut();
    var endpointPatch_1 = require_endpointPatch();
    var endpointSecretOut_1 = require_endpointSecretOut();
    var endpointSecretRotateIn_1 = require_endpointSecretRotateIn();
    var endpointStats_1 = require_endpointStats();
    var endpointTransformationIn_1 = require_endpointTransformationIn();
    var endpointTransformationOut_1 = require_endpointTransformationOut();
    var endpointTransformationPatch_1 = require_endpointTransformationPatch();
    var endpointUpdate_1 = require_endpointUpdate();
    var eventExampleIn_1 = require_eventExampleIn();
    var listResponseEndpointOut_1 = require_listResponseEndpointOut();
    var messageOut_1 = require_messageOut();
    var recoverIn_1 = require_recoverIn();
    var recoverOut_1 = require_recoverOut();
    var replayIn_1 = require_replayIn();
    var replayOut_1 = require_replayOut();
    var request_1 = require_request();
    var Endpoint = class {
      static {
        __name(this, "Endpoint");
      }
      static {
        __name2(this, "Endpoint");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(appId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint");
        request.setPathParam("app_id", appId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseEndpointOut_1.ListResponseEndpointOutSerializer._fromJsonObject);
      }
      create(appId, endpointIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(endpointIn_1.EndpointInSerializer._toJsonObject(endpointIn));
        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
      }
      get(appId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
      }
      update(appId, endpointId, endpointUpdate) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointUpdate_1.EndpointUpdateSerializer._toJsonObject(endpointUpdate));
        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
      }
      delete(appId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      patch(appId, endpointId, endpointPatch) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointPatch_1.EndpointPatchSerializer._toJsonObject(endpointPatch));
        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
      }
      getHeaders(appId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, endpointHeadersOut_1.EndpointHeadersOutSerializer._fromJsonObject);
      }
      updateHeaders(appId, endpointId, endpointHeadersIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointHeadersIn_1.EndpointHeadersInSerializer._toJsonObject(endpointHeadersIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      headersUpdate(appId, endpointId, endpointHeadersIn) {
        return this.updateHeaders(appId, endpointId, endpointHeadersIn);
      }
      patchHeaders(appId, endpointId, endpointHeadersPatchIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointHeadersPatchIn_1.EndpointHeadersPatchInSerializer._toJsonObject(endpointHeadersPatchIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      headersPatch(appId, endpointId, endpointHeadersPatchIn) {
        return this.patchHeaders(appId, endpointId, endpointHeadersPatchIn);
      }
      recover(appId, endpointId, recoverIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/recover");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(recoverIn_1.RecoverInSerializer._toJsonObject(recoverIn));
        return request.send(this.requestCtx, recoverOut_1.RecoverOutSerializer._fromJsonObject);
      }
      replayMissing(appId, endpointId, replayIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/replay-missing");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(replayIn_1.ReplayInSerializer._toJsonObject(replayIn));
        return request.send(this.requestCtx, replayOut_1.ReplayOutSerializer._fromJsonObject);
      }
      getSecret(appId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, endpointSecretOut_1.EndpointSecretOutSerializer._fromJsonObject);
      }
      rotateSecret(appId, endpointId, endpointSecretRotateIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret/rotate");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(endpointSecretRotateIn_1.EndpointSecretRotateInSerializer._toJsonObject(endpointSecretRotateIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      sendExample(appId, endpointId, eventExampleIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/send-example");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(eventExampleIn_1.EventExampleInSerializer._toJsonObject(eventExampleIn));
        return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
      }
      getStats(appId, endpointId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/stats");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setQueryParam("since", options === null || options === void 0 ? void 0 : options.since);
        request.setQueryParam("until", options === null || options === void 0 ? void 0 : options.until);
        return request.send(this.requestCtx, endpointStats_1.EndpointStatsSerializer._fromJsonObject);
      }
      transformationGet(appId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, endpointTransformationOut_1.EndpointTransformationOutSerializer._fromJsonObject);
      }
      patchTransformation(appId, endpointId, endpointTransformationPatch) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointTransformationPatch_1.EndpointTransformationPatchSerializer._toJsonObject(endpointTransformationPatch));
        return request.sendNoResponseBody(this.requestCtx);
      }
      transformationPartialUpdate(appId, endpointId, endpointTransformationIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointTransformationIn_1.EndpointTransformationInSerializer._toJsonObject(endpointTransformationIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    exports.Endpoint = Endpoint;
  }
});
var require_connectorKind = __commonJS({
  "../node_modules/svix/dist/models/connectorKind.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConnectorKindSerializer = exports.ConnectorKind = void 0;
    var ConnectorKind;
    (function(ConnectorKind2) {
      ConnectorKind2["Custom"] = "Custom";
      ConnectorKind2["CloseCrm"] = "CloseCRM";
      ConnectorKind2["CustomerIo"] = "CustomerIO";
      ConnectorKind2["Discord"] = "Discord";
      ConnectorKind2["Hubspot"] = "Hubspot";
      ConnectorKind2["Inngest"] = "Inngest";
      ConnectorKind2["Loops"] = "Loops";
      ConnectorKind2["Resend"] = "Resend";
      ConnectorKind2["Salesforce"] = "Salesforce";
      ConnectorKind2["Segment"] = "Segment";
      ConnectorKind2["Sendgrid"] = "Sendgrid";
      ConnectorKind2["Slack"] = "Slack";
      ConnectorKind2["Teams"] = "Teams";
      ConnectorKind2["TriggerDev"] = "TriggerDev";
      ConnectorKind2["Windmill"] = "Windmill";
      ConnectorKind2["Zapier"] = "Zapier";
    })(ConnectorKind = exports.ConnectorKind || (exports.ConnectorKind = {}));
    exports.ConnectorKindSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self) {
        return self;
      }
    };
  }
});
var require_connectorIn = __commonJS({
  "../node_modules/svix/dist/models/connectorIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConnectorInSerializer = void 0;
    var connectorKind_1 = require_connectorKind();
    exports.ConnectorInSerializer = {
      _fromJsonObject(object) {
        return {
          description: object["description"],
          featureFlag: object["featureFlag"],
          featureFlags: object["featureFlags"],
          filterTypes: object["filterTypes"],
          instructions: object["instructions"],
          instructionsLink: object["instructionsLink"],
          kind: object["kind"] ? connectorKind_1.ConnectorKindSerializer._fromJsonObject(object["kind"]) : void 0,
          logo: object["logo"],
          name: object["name"],
          transformation: object["transformation"]
        };
      },
      _toJsonObject(self) {
        return {
          description: self.description,
          featureFlag: self.featureFlag,
          featureFlags: self.featureFlags,
          filterTypes: self.filterTypes,
          instructions: self.instructions,
          instructionsLink: self.instructionsLink,
          kind: self.kind ? connectorKind_1.ConnectorKindSerializer._toJsonObject(self.kind) : void 0,
          logo: self.logo,
          name: self.name,
          transformation: self.transformation
        };
      }
    };
  }
});
var require_eventTypeIn = __commonJS({
  "../node_modules/svix/dist/models/eventTypeIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeInSerializer = void 0;
    exports.EventTypeInSerializer = {
      _fromJsonObject(object) {
        return {
          archived: object["archived"],
          deprecated: object["deprecated"],
          description: object["description"],
          featureFlag: object["featureFlag"],
          featureFlags: object["featureFlags"],
          groupName: object["groupName"],
          name: object["name"],
          schemas: object["schemas"]
        };
      },
      _toJsonObject(self) {
        return {
          archived: self.archived,
          deprecated: self.deprecated,
          description: self.description,
          featureFlag: self.featureFlag,
          featureFlags: self.featureFlags,
          groupName: self.groupName,
          name: self.name,
          schemas: self.schemas
        };
      }
    };
  }
});
var require_environmentIn = __commonJS({
  "../node_modules/svix/dist/models/environmentIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnvironmentInSerializer = void 0;
    var connectorIn_1 = require_connectorIn();
    var eventTypeIn_1 = require_eventTypeIn();
    exports.EnvironmentInSerializer = {
      _fromJsonObject(object) {
        var _a, _b;
        return {
          connectors: (_a = object["connectors"]) === null || _a === void 0 ? void 0 : _a.map((item) => connectorIn_1.ConnectorInSerializer._fromJsonObject(item)),
          eventTypes: (_b = object["eventTypes"]) === null || _b === void 0 ? void 0 : _b.map((item) => eventTypeIn_1.EventTypeInSerializer._fromJsonObject(item)),
          settings: object["settings"]
        };
      },
      _toJsonObject(self) {
        var _a, _b;
        return {
          connectors: (_a = self.connectors) === null || _a === void 0 ? void 0 : _a.map((item) => connectorIn_1.ConnectorInSerializer._toJsonObject(item)),
          eventTypes: (_b = self.eventTypes) === null || _b === void 0 ? void 0 : _b.map((item) => eventTypeIn_1.EventTypeInSerializer._toJsonObject(item)),
          settings: self.settings
        };
      }
    };
  }
});
var require_connectorOut = __commonJS({
  "../node_modules/svix/dist/models/connectorOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConnectorOutSerializer = void 0;
    var connectorKind_1 = require_connectorKind();
    exports.ConnectorOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          description: object["description"],
          featureFlag: object["featureFlag"],
          featureFlags: object["featureFlags"],
          filterTypes: object["filterTypes"],
          id: object["id"],
          instructions: object["instructions"],
          instructionsLink: object["instructionsLink"],
          kind: connectorKind_1.ConnectorKindSerializer._fromJsonObject(object["kind"]),
          logo: object["logo"],
          name: object["name"],
          orgId: object["orgId"],
          transformation: object["transformation"],
          updatedAt: new Date(object["updatedAt"])
        };
      },
      _toJsonObject(self) {
        return {
          createdAt: self.createdAt,
          description: self.description,
          featureFlag: self.featureFlag,
          featureFlags: self.featureFlags,
          filterTypes: self.filterTypes,
          id: self.id,
          instructions: self.instructions,
          instructionsLink: self.instructionsLink,
          kind: connectorKind_1.ConnectorKindSerializer._toJsonObject(self.kind),
          logo: self.logo,
          name: self.name,
          orgId: self.orgId,
          transformation: self.transformation,
          updatedAt: self.updatedAt
        };
      }
    };
  }
});
var require_eventTypeOut = __commonJS({
  "../node_modules/svix/dist/models/eventTypeOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeOutSerializer = void 0;
    exports.EventTypeOutSerializer = {
      _fromJsonObject(object) {
        return {
          archived: object["archived"],
          createdAt: new Date(object["createdAt"]),
          deprecated: object["deprecated"],
          description: object["description"],
          featureFlag: object["featureFlag"],
          featureFlags: object["featureFlags"],
          groupName: object["groupName"],
          name: object["name"],
          schemas: object["schemas"],
          updatedAt: new Date(object["updatedAt"])
        };
      },
      _toJsonObject(self) {
        return {
          archived: self.archived,
          createdAt: self.createdAt,
          deprecated: self.deprecated,
          description: self.description,
          featureFlag: self.featureFlag,
          featureFlags: self.featureFlags,
          groupName: self.groupName,
          name: self.name,
          schemas: self.schemas,
          updatedAt: self.updatedAt
        };
      }
    };
  }
});
var require_environmentOut = __commonJS({
  "../node_modules/svix/dist/models/environmentOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnvironmentOutSerializer = void 0;
    var connectorOut_1 = require_connectorOut();
    var eventTypeOut_1 = require_eventTypeOut();
    exports.EnvironmentOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          eventTypes: object["eventTypes"].map((item) => eventTypeOut_1.EventTypeOutSerializer._fromJsonObject(item)),
          settings: object["settings"],
          transformationTemplates: object["transformationTemplates"].map((item) => connectorOut_1.ConnectorOutSerializer._fromJsonObject(item)),
          version: object["version"]
        };
      },
      _toJsonObject(self) {
        return {
          createdAt: self.createdAt,
          eventTypes: self.eventTypes.map((item) => eventTypeOut_1.EventTypeOutSerializer._toJsonObject(item)),
          settings: self.settings,
          transformationTemplates: self.transformationTemplates.map((item) => connectorOut_1.ConnectorOutSerializer._toJsonObject(item)),
          version: self.version
        };
      }
    };
  }
});
var require_environment = __commonJS({
  "../node_modules/svix/dist/api/environment.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Environment = void 0;
    var environmentIn_1 = require_environmentIn();
    var environmentOut_1 = require_environmentOut();
    var request_1 = require_request();
    var Environment = class {
      static {
        __name(this, "Environment");
      }
      static {
        __name2(this, "Environment");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      export(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/environment/export");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.send(this.requestCtx, environmentOut_1.EnvironmentOutSerializer._fromJsonObject);
      }
      import(environmentIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/environment/import");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(environmentIn_1.EnvironmentInSerializer._toJsonObject(environmentIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    exports.Environment = Environment;
  }
});
var require_eventTypeImportOpenApiIn = __commonJS({
  "../node_modules/svix/dist/models/eventTypeImportOpenApiIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeImportOpenApiInSerializer = void 0;
    exports.EventTypeImportOpenApiInSerializer = {
      _fromJsonObject(object) {
        return {
          dryRun: object["dryRun"],
          replaceAll: object["replaceAll"],
          spec: object["spec"],
          specRaw: object["specRaw"]
        };
      },
      _toJsonObject(self) {
        return {
          dryRun: self.dryRun,
          replaceAll: self.replaceAll,
          spec: self.spec,
          specRaw: self.specRaw
        };
      }
    };
  }
});
var require_eventTypeFromOpenApi = __commonJS({
  "../node_modules/svix/dist/models/eventTypeFromOpenApi.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeFromOpenApiSerializer = void 0;
    exports.EventTypeFromOpenApiSerializer = {
      _fromJsonObject(object) {
        return {
          deprecated: object["deprecated"],
          description: object["description"],
          featureFlag: object["featureFlag"],
          featureFlags: object["featureFlags"],
          groupName: object["groupName"],
          name: object["name"],
          schemas: object["schemas"]
        };
      },
      _toJsonObject(self) {
        return {
          deprecated: self.deprecated,
          description: self.description,
          featureFlag: self.featureFlag,
          featureFlags: self.featureFlags,
          groupName: self.groupName,
          name: self.name,
          schemas: self.schemas
        };
      }
    };
  }
});
var require_eventTypeImportOpenApiOutData = __commonJS({
  "../node_modules/svix/dist/models/eventTypeImportOpenApiOutData.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeImportOpenApiOutDataSerializer = void 0;
    var eventTypeFromOpenApi_1 = require_eventTypeFromOpenApi();
    exports.EventTypeImportOpenApiOutDataSerializer = {
      _fromJsonObject(object) {
        var _a;
        return {
          modified: object["modified"],
          toModify: (_a = object["to_modify"]) === null || _a === void 0 ? void 0 : _a.map((item) => eventTypeFromOpenApi_1.EventTypeFromOpenApiSerializer._fromJsonObject(item))
        };
      },
      _toJsonObject(self) {
        var _a;
        return {
          modified: self.modified,
          to_modify: (_a = self.toModify) === null || _a === void 0 ? void 0 : _a.map((item) => eventTypeFromOpenApi_1.EventTypeFromOpenApiSerializer._toJsonObject(item))
        };
      }
    };
  }
});
var require_eventTypeImportOpenApiOut = __commonJS({
  "../node_modules/svix/dist/models/eventTypeImportOpenApiOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeImportOpenApiOutSerializer = void 0;
    var eventTypeImportOpenApiOutData_1 = require_eventTypeImportOpenApiOutData();
    exports.EventTypeImportOpenApiOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: eventTypeImportOpenApiOutData_1.EventTypeImportOpenApiOutDataSerializer._fromJsonObject(object["data"])
        };
      },
      _toJsonObject(self) {
        return {
          data: eventTypeImportOpenApiOutData_1.EventTypeImportOpenApiOutDataSerializer._toJsonObject(self.data)
        };
      }
    };
  }
});
var require_eventTypePatch = __commonJS({
  "../node_modules/svix/dist/models/eventTypePatch.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypePatchSerializer = void 0;
    exports.EventTypePatchSerializer = {
      _fromJsonObject(object) {
        return {
          archived: object["archived"],
          deprecated: object["deprecated"],
          description: object["description"],
          featureFlag: object["featureFlag"],
          featureFlags: object["featureFlags"],
          groupName: object["groupName"],
          schemas: object["schemas"]
        };
      },
      _toJsonObject(self) {
        return {
          archived: self.archived,
          deprecated: self.deprecated,
          description: self.description,
          featureFlag: self.featureFlag,
          featureFlags: self.featureFlags,
          groupName: self.groupName,
          schemas: self.schemas
        };
      }
    };
  }
});
var require_eventTypeUpdate = __commonJS({
  "../node_modules/svix/dist/models/eventTypeUpdate.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeUpdateSerializer = void 0;
    exports.EventTypeUpdateSerializer = {
      _fromJsonObject(object) {
        return {
          archived: object["archived"],
          deprecated: object["deprecated"],
          description: object["description"],
          featureFlag: object["featureFlag"],
          featureFlags: object["featureFlags"],
          groupName: object["groupName"],
          schemas: object["schemas"]
        };
      },
      _toJsonObject(self) {
        return {
          archived: self.archived,
          deprecated: self.deprecated,
          description: self.description,
          featureFlag: self.featureFlag,
          featureFlags: self.featureFlags,
          groupName: self.groupName,
          schemas: self.schemas
        };
      }
    };
  }
});
var require_listResponseEventTypeOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseEventTypeOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseEventTypeOutSerializer = void 0;
    var eventTypeOut_1 = require_eventTypeOut();
    exports.ListResponseEventTypeOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => eventTypeOut_1.EventTypeOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => eventTypeOut_1.EventTypeOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_eventType = __commonJS({
  "../node_modules/svix/dist/api/eventType.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventType = void 0;
    var eventTypeImportOpenApiIn_1 = require_eventTypeImportOpenApiIn();
    var eventTypeImportOpenApiOut_1 = require_eventTypeImportOpenApiOut();
    var eventTypeIn_1 = require_eventTypeIn();
    var eventTypeOut_1 = require_eventTypeOut();
    var eventTypePatch_1 = require_eventTypePatch();
    var eventTypeUpdate_1 = require_eventTypeUpdate();
    var listResponseEventTypeOut_1 = require_listResponseEventTypeOut();
    var request_1 = require_request();
    var EventType = class {
      static {
        __name(this, "EventType");
      }
      static {
        __name2(this, "EventType");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/event-type");
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        request.setQueryParam("include_archived", options === null || options === void 0 ? void 0 : options.includeArchived);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        return request.send(this.requestCtx, listResponseEventTypeOut_1.ListResponseEventTypeOutSerializer._fromJsonObject);
      }
      create(eventTypeIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/event-type");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(eventTypeIn_1.EventTypeInSerializer._toJsonObject(eventTypeIn));
        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
      }
      importOpenapi(eventTypeImportOpenApiIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/event-type/import/openapi");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(eventTypeImportOpenApiIn_1.EventTypeImportOpenApiInSerializer._toJsonObject(eventTypeImportOpenApiIn));
        return request.send(this.requestCtx, eventTypeImportOpenApiOut_1.EventTypeImportOpenApiOutSerializer._fromJsonObject);
      }
      get(eventTypeName) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/event-type/{event_type_name}");
        request.setPathParam("event_type_name", eventTypeName);
        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
      }
      update(eventTypeName, eventTypeUpdate) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/event-type/{event_type_name}");
        request.setPathParam("event_type_name", eventTypeName);
        request.setBody(eventTypeUpdate_1.EventTypeUpdateSerializer._toJsonObject(eventTypeUpdate));
        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
      }
      delete(eventTypeName, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/event-type/{event_type_name}");
        request.setPathParam("event_type_name", eventTypeName);
        request.setQueryParam("expunge", options === null || options === void 0 ? void 0 : options.expunge);
        return request.sendNoResponseBody(this.requestCtx);
      }
      patch(eventTypeName, eventTypePatch) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/event-type/{event_type_name}");
        request.setPathParam("event_type_name", eventTypeName);
        request.setBody(eventTypePatch_1.EventTypePatchSerializer._toJsonObject(eventTypePatch));
        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
      }
    };
    exports.EventType = EventType;
  }
});
var require_health = __commonJS({
  "../node_modules/svix/dist/api/health.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Health = void 0;
    var request_1 = require_request();
    var Health = class {
      static {
        __name(this, "Health");
      }
      static {
        __name2(this, "Health");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      get() {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/health");
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    exports.Health = Health;
  }
});
var require_ingestSourceConsumerPortalAccessIn = __commonJS({
  "../node_modules/svix/dist/models/ingestSourceConsumerPortalAccessIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestSourceConsumerPortalAccessInSerializer = void 0;
    exports.IngestSourceConsumerPortalAccessInSerializer = {
      _fromJsonObject(object) {
        return {
          expiry: object["expiry"],
          readOnly: object["readOnly"]
        };
      },
      _toJsonObject(self) {
        return {
          expiry: self.expiry,
          readOnly: self.readOnly
        };
      }
    };
  }
});
var require_ingestEndpointHeadersIn = __commonJS({
  "../node_modules/svix/dist/models/ingestEndpointHeadersIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointHeadersInSerializer = void 0;
    exports.IngestEndpointHeadersInSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"]
        };
      },
      _toJsonObject(self) {
        return {
          headers: self.headers
        };
      }
    };
  }
});
var require_ingestEndpointHeadersOut = __commonJS({
  "../node_modules/svix/dist/models/ingestEndpointHeadersOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointHeadersOutSerializer = void 0;
    exports.IngestEndpointHeadersOutSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"],
          sensitive: object["sensitive"]
        };
      },
      _toJsonObject(self) {
        return {
          headers: self.headers,
          sensitive: self.sensitive
        };
      }
    };
  }
});
var require_ingestEndpointIn = __commonJS({
  "../node_modules/svix/dist/models/ingestEndpointIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointInSerializer = void 0;
    exports.IngestEndpointInSerializer = {
      _fromJsonObject(object) {
        return {
          description: object["description"],
          disabled: object["disabled"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          secret: object["secret"],
          uid: object["uid"],
          url: object["url"]
        };
      },
      _toJsonObject(self) {
        return {
          description: self.description,
          disabled: self.disabled,
          metadata: self.metadata,
          rateLimit: self.rateLimit,
          secret: self.secret,
          uid: self.uid,
          url: self.url
        };
      }
    };
  }
});
var require_ingestEndpointOut = __commonJS({
  "../node_modules/svix/dist/models/ingestEndpointOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointOutSerializer = void 0;
    exports.IngestEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          description: object["description"],
          disabled: object["disabled"],
          id: object["id"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"]),
          url: object["url"]
        };
      },
      _toJsonObject(self) {
        return {
          createdAt: self.createdAt,
          description: self.description,
          disabled: self.disabled,
          id: self.id,
          metadata: self.metadata,
          rateLimit: self.rateLimit,
          uid: self.uid,
          updatedAt: self.updatedAt,
          url: self.url
        };
      }
    };
  }
});
var require_ingestEndpointSecretIn = __commonJS({
  "../node_modules/svix/dist/models/ingestEndpointSecretIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointSecretInSerializer = void 0;
    exports.IngestEndpointSecretInSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self) {
        return {
          key: self.key
        };
      }
    };
  }
});
var require_ingestEndpointSecretOut = __commonJS({
  "../node_modules/svix/dist/models/ingestEndpointSecretOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointSecretOutSerializer = void 0;
    exports.IngestEndpointSecretOutSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self) {
        return {
          key: self.key
        };
      }
    };
  }
});
var require_ingestEndpointTransformationOut = __commonJS({
  "../node_modules/svix/dist/models/ingestEndpointTransformationOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointTransformationOutSerializer = void 0;
    exports.IngestEndpointTransformationOutSerializer = {
      _fromJsonObject(object) {
        return {
          code: object["code"],
          enabled: object["enabled"]
        };
      },
      _toJsonObject(self) {
        return {
          code: self.code,
          enabled: self.enabled
        };
      }
    };
  }
});
var require_ingestEndpointTransformationPatch = __commonJS({
  "../node_modules/svix/dist/models/ingestEndpointTransformationPatch.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointTransformationPatchSerializer = void 0;
    exports.IngestEndpointTransformationPatchSerializer = {
      _fromJsonObject(object) {
        return {
          code: object["code"],
          enabled: object["enabled"]
        };
      },
      _toJsonObject(self) {
        return {
          code: self.code,
          enabled: self.enabled
        };
      }
    };
  }
});
var require_ingestEndpointUpdate = __commonJS({
  "../node_modules/svix/dist/models/ingestEndpointUpdate.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointUpdateSerializer = void 0;
    exports.IngestEndpointUpdateSerializer = {
      _fromJsonObject(object) {
        return {
          description: object["description"],
          disabled: object["disabled"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          url: object["url"]
        };
      },
      _toJsonObject(self) {
        return {
          description: self.description,
          disabled: self.disabled,
          metadata: self.metadata,
          rateLimit: self.rateLimit,
          uid: self.uid,
          url: self.url
        };
      }
    };
  }
});
var require_listResponseIngestEndpointOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseIngestEndpointOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseIngestEndpointOutSerializer = void 0;
    var ingestEndpointOut_1 = require_ingestEndpointOut();
    exports.ListResponseIngestEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => ingestEndpointOut_1.IngestEndpointOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_ingestEndpoint = __commonJS({
  "../node_modules/svix/dist/api/ingestEndpoint.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpoint = void 0;
    var ingestEndpointHeadersIn_1 = require_ingestEndpointHeadersIn();
    var ingestEndpointHeadersOut_1 = require_ingestEndpointHeadersOut();
    var ingestEndpointIn_1 = require_ingestEndpointIn();
    var ingestEndpointOut_1 = require_ingestEndpointOut();
    var ingestEndpointSecretIn_1 = require_ingestEndpointSecretIn();
    var ingestEndpointSecretOut_1 = require_ingestEndpointSecretOut();
    var ingestEndpointTransformationOut_1 = require_ingestEndpointTransformationOut();
    var ingestEndpointTransformationPatch_1 = require_ingestEndpointTransformationPatch();
    var ingestEndpointUpdate_1 = require_ingestEndpointUpdate();
    var listResponseIngestEndpointOut_1 = require_listResponseIngestEndpointOut();
    var request_1 = require_request();
    var IngestEndpoint = class {
      static {
        __name(this, "IngestEndpoint");
      }
      static {
        __name2(this, "IngestEndpoint");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(sourceId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint");
        request.setPathParam("source_id", sourceId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseIngestEndpointOut_1.ListResponseIngestEndpointOutSerializer._fromJsonObject);
      }
      create(sourceId, ingestEndpointIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/endpoint");
        request.setPathParam("source_id", sourceId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(ingestEndpointIn_1.IngestEndpointInSerializer._toJsonObject(ingestEndpointIn));
        return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
      }
      get(sourceId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
      }
      update(sourceId, endpointId, ingestEndpointUpdate) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(ingestEndpointUpdate_1.IngestEndpointUpdateSerializer._toJsonObject(ingestEndpointUpdate));
        return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
      }
      delete(sourceId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      getHeaders(sourceId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/headers");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, ingestEndpointHeadersOut_1.IngestEndpointHeadersOutSerializer._fromJsonObject);
      }
      updateHeaders(sourceId, endpointId, ingestEndpointHeadersIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/headers");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(ingestEndpointHeadersIn_1.IngestEndpointHeadersInSerializer._toJsonObject(ingestEndpointHeadersIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      getSecret(sourceId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/secret");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, ingestEndpointSecretOut_1.IngestEndpointSecretOutSerializer._fromJsonObject);
      }
      rotateSecret(sourceId, endpointId, ingestEndpointSecretIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/secret/rotate");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(ingestEndpointSecretIn_1.IngestEndpointSecretInSerializer._toJsonObject(ingestEndpointSecretIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      getTransformation(sourceId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/transformation");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, ingestEndpointTransformationOut_1.IngestEndpointTransformationOutSerializer._fromJsonObject);
      }
      setTransformation(sourceId, endpointId, ingestEndpointTransformationPatch) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/transformation");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(ingestEndpointTransformationPatch_1.IngestEndpointTransformationPatchSerializer._toJsonObject(ingestEndpointTransformationPatch));
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    exports.IngestEndpoint = IngestEndpoint;
  }
});
var require_adobeSignConfig = __commonJS({
  "../node_modules/svix/dist/models/adobeSignConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AdobeSignConfigSerializer = void 0;
    exports.AdobeSignConfigSerializer = {
      _fromJsonObject(object) {
        return {
          clientId: object["clientId"]
        };
      },
      _toJsonObject(self) {
        return {
          clientId: self.clientId
        };
      }
    };
  }
});
var require_airwallexConfig = __commonJS({
  "../node_modules/svix/dist/models/airwallexConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AirwallexConfigSerializer = void 0;
    exports.AirwallexConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_checkbookConfig = __commonJS({
  "../node_modules/svix/dist/models/checkbookConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CheckbookConfigSerializer = void 0;
    exports.CheckbookConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_cronConfig = __commonJS({
  "../node_modules/svix/dist/models/cronConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CronConfigSerializer = void 0;
    exports.CronConfigSerializer = {
      _fromJsonObject(object) {
        return {
          contentType: object["contentType"],
          payload: object["payload"],
          schedule: object["schedule"]
        };
      },
      _toJsonObject(self) {
        return {
          contentType: self.contentType,
          payload: self.payload,
          schedule: self.schedule
        };
      }
    };
  }
});
var require_docusignConfig = __commonJS({
  "../node_modules/svix/dist/models/docusignConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DocusignConfigSerializer = void 0;
    exports.DocusignConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_easypostConfig = __commonJS({
  "../node_modules/svix/dist/models/easypostConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EasypostConfigSerializer = void 0;
    exports.EasypostConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_githubConfig = __commonJS({
  "../node_modules/svix/dist/models/githubConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GithubConfigSerializer = void 0;
    exports.GithubConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_hubspotConfig = __commonJS({
  "../node_modules/svix/dist/models/hubspotConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HubspotConfigSerializer = void 0;
    exports.HubspotConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_orumIoConfig = __commonJS({
  "../node_modules/svix/dist/models/orumIoConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrumIoConfigSerializer = void 0;
    exports.OrumIoConfigSerializer = {
      _fromJsonObject(object) {
        return {
          publicKey: object["publicKey"]
        };
      },
      _toJsonObject(self) {
        return {
          publicKey: self.publicKey
        };
      }
    };
  }
});
var require_pandaDocConfig = __commonJS({
  "../node_modules/svix/dist/models/pandaDocConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PandaDocConfigSerializer = void 0;
    exports.PandaDocConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_portIoConfig = __commonJS({
  "../node_modules/svix/dist/models/portIoConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PortIoConfigSerializer = void 0;
    exports.PortIoConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_rutterConfig = __commonJS({
  "../node_modules/svix/dist/models/rutterConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RutterConfigSerializer = void 0;
    exports.RutterConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_segmentConfig = __commonJS({
  "../node_modules/svix/dist/models/segmentConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SegmentConfigSerializer = void 0;
    exports.SegmentConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_shopifyConfig = __commonJS({
  "../node_modules/svix/dist/models/shopifyConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShopifyConfigSerializer = void 0;
    exports.ShopifyConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_slackConfig = __commonJS({
  "../node_modules/svix/dist/models/slackConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SlackConfigSerializer = void 0;
    exports.SlackConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_stripeConfig = __commonJS({
  "../node_modules/svix/dist/models/stripeConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StripeConfigSerializer = void 0;
    exports.StripeConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_svixConfig = __commonJS({
  "../node_modules/svix/dist/models/svixConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SvixConfigSerializer = void 0;
    exports.SvixConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_telnyxConfig = __commonJS({
  "../node_modules/svix/dist/models/telnyxConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TelnyxConfigSerializer = void 0;
    exports.TelnyxConfigSerializer = {
      _fromJsonObject(object) {
        return {
          publicKey: object["publicKey"]
        };
      },
      _toJsonObject(self) {
        return {
          publicKey: self.publicKey
        };
      }
    };
  }
});
var require_vapiConfig = __commonJS({
  "../node_modules/svix/dist/models/vapiConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VapiConfigSerializer = void 0;
    exports.VapiConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_veriffConfig = __commonJS({
  "../node_modules/svix/dist/models/veriffConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VeriffConfigSerializer = void 0;
    exports.VeriffConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_zoomConfig = __commonJS({
  "../node_modules/svix/dist/models/zoomConfig.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZoomConfigSerializer = void 0;
    exports.ZoomConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self) {
        return {
          secret: self.secret
        };
      }
    };
  }
});
var require_ingestSourceIn = __commonJS({
  "../node_modules/svix/dist/models/ingestSourceIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestSourceInSerializer = void 0;
    var adobeSignConfig_1 = require_adobeSignConfig();
    var airwallexConfig_1 = require_airwallexConfig();
    var checkbookConfig_1 = require_checkbookConfig();
    var cronConfig_1 = require_cronConfig();
    var docusignConfig_1 = require_docusignConfig();
    var easypostConfig_1 = require_easypostConfig();
    var githubConfig_1 = require_githubConfig();
    var hubspotConfig_1 = require_hubspotConfig();
    var orumIoConfig_1 = require_orumIoConfig();
    var pandaDocConfig_1 = require_pandaDocConfig();
    var portIoConfig_1 = require_portIoConfig();
    var rutterConfig_1 = require_rutterConfig();
    var segmentConfig_1 = require_segmentConfig();
    var shopifyConfig_1 = require_shopifyConfig();
    var slackConfig_1 = require_slackConfig();
    var stripeConfig_1 = require_stripeConfig();
    var svixConfig_1 = require_svixConfig();
    var telnyxConfig_1 = require_telnyxConfig();
    var vapiConfig_1 = require_vapiConfig();
    var veriffConfig_1 = require_veriffConfig();
    var zoomConfig_1 = require_zoomConfig();
    exports.IngestSourceInSerializer = {
      _fromJsonObject(object) {
        const type = object["type"];
        function getConfig(type2) {
          switch (type2) {
            case "generic-webhook":
              return {};
            case "cron":
              return cronConfig_1.CronConfigSerializer._fromJsonObject(object["config"]);
            case "adobe-sign":
              return adobeSignConfig_1.AdobeSignConfigSerializer._fromJsonObject(object["config"]);
            case "beehiiv":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "brex":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "checkbook":
              return checkbookConfig_1.CheckbookConfigSerializer._fromJsonObject(object["config"]);
            case "clerk":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "docusign":
              return docusignConfig_1.DocusignConfigSerializer._fromJsonObject(object["config"]);
            case "easypost":
              return easypostConfig_1.EasypostConfigSerializer._fromJsonObject(object["config"]);
            case "github":
              return githubConfig_1.GithubConfigSerializer._fromJsonObject(object["config"]);
            case "guesty":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "hubspot":
              return hubspotConfig_1.HubspotConfigSerializer._fromJsonObject(object["config"]);
            case "incident-io":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "lithic":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "nash":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "orum-io":
              return orumIoConfig_1.OrumIoConfigSerializer._fromJsonObject(object["config"]);
            case "panda-doc":
              return pandaDocConfig_1.PandaDocConfigSerializer._fromJsonObject(object["config"]);
            case "port-io":
              return portIoConfig_1.PortIoConfigSerializer._fromJsonObject(object["config"]);
            case "pleo":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "replicate":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "resend":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "rutter":
              return rutterConfig_1.RutterConfigSerializer._fromJsonObject(object["config"]);
            case "safebase":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "sardine":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "segment":
              return segmentConfig_1.SegmentConfigSerializer._fromJsonObject(object["config"]);
            case "shopify":
              return shopifyConfig_1.ShopifyConfigSerializer._fromJsonObject(object["config"]);
            case "slack":
              return slackConfig_1.SlackConfigSerializer._fromJsonObject(object["config"]);
            case "stripe":
              return stripeConfig_1.StripeConfigSerializer._fromJsonObject(object["config"]);
            case "stych":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "svix":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "zoom":
              return zoomConfig_1.ZoomConfigSerializer._fromJsonObject(object["config"]);
            case "telnyx":
              return telnyxConfig_1.TelnyxConfigSerializer._fromJsonObject(object["config"]);
            case "vapi":
              return vapiConfig_1.VapiConfigSerializer._fromJsonObject(object["config"]);
            case "open-ai":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "render":
              return svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            case "veriff":
              return veriffConfig_1.VeriffConfigSerializer._fromJsonObject(object["config"]);
            case "airwallex":
              return airwallexConfig_1.AirwallexConfigSerializer._fromJsonObject(object["config"]);
            default:
              throw new Error(`Unexpected type: ${type2}`);
          }
        }
        __name(getConfig, "getConfig");
        __name2(getConfig, "getConfig");
        return {
          type,
          config: getConfig(type),
          metadata: object["metadata"],
          name: object["name"],
          uid: object["uid"]
        };
      },
      _toJsonObject(self) {
        let config;
        switch (self.type) {
          case "generic-webhook":
            config = {};
            break;
          case "cron":
            config = cronConfig_1.CronConfigSerializer._toJsonObject(self.config);
            break;
          case "adobe-sign":
            config = adobeSignConfig_1.AdobeSignConfigSerializer._toJsonObject(self.config);
            break;
          case "beehiiv":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "brex":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "checkbook":
            config = checkbookConfig_1.CheckbookConfigSerializer._toJsonObject(self.config);
            break;
          case "clerk":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "docusign":
            config = docusignConfig_1.DocusignConfigSerializer._toJsonObject(self.config);
            break;
          case "easypost":
            config = easypostConfig_1.EasypostConfigSerializer._toJsonObject(self.config);
            break;
          case "github":
            config = githubConfig_1.GithubConfigSerializer._toJsonObject(self.config);
            break;
          case "guesty":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "hubspot":
            config = hubspotConfig_1.HubspotConfigSerializer._toJsonObject(self.config);
            break;
          case "incident-io":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "lithic":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "nash":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "orum-io":
            config = orumIoConfig_1.OrumIoConfigSerializer._toJsonObject(self.config);
            break;
          case "panda-doc":
            config = pandaDocConfig_1.PandaDocConfigSerializer._toJsonObject(self.config);
            break;
          case "port-io":
            config = portIoConfig_1.PortIoConfigSerializer._toJsonObject(self.config);
            break;
          case "pleo":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "replicate":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "resend":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "rutter":
            config = rutterConfig_1.RutterConfigSerializer._toJsonObject(self.config);
            break;
          case "safebase":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "sardine":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "segment":
            config = segmentConfig_1.SegmentConfigSerializer._toJsonObject(self.config);
            break;
          case "shopify":
            config = shopifyConfig_1.ShopifyConfigSerializer._toJsonObject(self.config);
            break;
          case "slack":
            config = slackConfig_1.SlackConfigSerializer._toJsonObject(self.config);
            break;
          case "stripe":
            config = stripeConfig_1.StripeConfigSerializer._toJsonObject(self.config);
            break;
          case "stych":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "svix":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "zoom":
            config = zoomConfig_1.ZoomConfigSerializer._toJsonObject(self.config);
            break;
          case "telnyx":
            config = telnyxConfig_1.TelnyxConfigSerializer._toJsonObject(self.config);
            break;
          case "vapi":
            config = vapiConfig_1.VapiConfigSerializer._toJsonObject(self.config);
            break;
          case "open-ai":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "render":
            config = svixConfig_1.SvixConfigSerializer._toJsonObject(self.config);
            break;
          case "veriff":
            config = veriffConfig_1.VeriffConfigSerializer._toJsonObject(self.config);
            break;
          case "airwallex":
            config = airwallexConfig_1.AirwallexConfigSerializer._toJsonObject(self.config);
            break;
        }
        return {
          type: self.type,
          config,
          metadata: self.metadata,
          name: self.name,
          uid: self.uid
        };
      }
    };
  }
});
var require_adobeSignConfigOut = __commonJS({
  "../node_modules/svix/dist/models/adobeSignConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AdobeSignConfigOutSerializer = void 0;
    exports.AdobeSignConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_airwallexConfigOut = __commonJS({
  "../node_modules/svix/dist/models/airwallexConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AirwallexConfigOutSerializer = void 0;
    exports.AirwallexConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_checkbookConfigOut = __commonJS({
  "../node_modules/svix/dist/models/checkbookConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CheckbookConfigOutSerializer = void 0;
    exports.CheckbookConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_docusignConfigOut = __commonJS({
  "../node_modules/svix/dist/models/docusignConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DocusignConfigOutSerializer = void 0;
    exports.DocusignConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_easypostConfigOut = __commonJS({
  "../node_modules/svix/dist/models/easypostConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EasypostConfigOutSerializer = void 0;
    exports.EasypostConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_githubConfigOut = __commonJS({
  "../node_modules/svix/dist/models/githubConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GithubConfigOutSerializer = void 0;
    exports.GithubConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_hubspotConfigOut = __commonJS({
  "../node_modules/svix/dist/models/hubspotConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HubspotConfigOutSerializer = void 0;
    exports.HubspotConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_orumIoConfigOut = __commonJS({
  "../node_modules/svix/dist/models/orumIoConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrumIoConfigOutSerializer = void 0;
    exports.OrumIoConfigOutSerializer = {
      _fromJsonObject(object) {
        return {
          publicKey: object["publicKey"]
        };
      },
      _toJsonObject(self) {
        return {
          publicKey: self.publicKey
        };
      }
    };
  }
});
var require_pandaDocConfigOut = __commonJS({
  "../node_modules/svix/dist/models/pandaDocConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PandaDocConfigOutSerializer = void 0;
    exports.PandaDocConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_portIoConfigOut = __commonJS({
  "../node_modules/svix/dist/models/portIoConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PortIoConfigOutSerializer = void 0;
    exports.PortIoConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_rutterConfigOut = __commonJS({
  "../node_modules/svix/dist/models/rutterConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RutterConfigOutSerializer = void 0;
    exports.RutterConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_segmentConfigOut = __commonJS({
  "../node_modules/svix/dist/models/segmentConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SegmentConfigOutSerializer = void 0;
    exports.SegmentConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_shopifyConfigOut = __commonJS({
  "../node_modules/svix/dist/models/shopifyConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShopifyConfigOutSerializer = void 0;
    exports.ShopifyConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_slackConfigOut = __commonJS({
  "../node_modules/svix/dist/models/slackConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SlackConfigOutSerializer = void 0;
    exports.SlackConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_stripeConfigOut = __commonJS({
  "../node_modules/svix/dist/models/stripeConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StripeConfigOutSerializer = void 0;
    exports.StripeConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_svixConfigOut = __commonJS({
  "../node_modules/svix/dist/models/svixConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SvixConfigOutSerializer = void 0;
    exports.SvixConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_telnyxConfigOut = __commonJS({
  "../node_modules/svix/dist/models/telnyxConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TelnyxConfigOutSerializer = void 0;
    exports.TelnyxConfigOutSerializer = {
      _fromJsonObject(object) {
        return {
          publicKey: object["publicKey"]
        };
      },
      _toJsonObject(self) {
        return {
          publicKey: self.publicKey
        };
      }
    };
  }
});
var require_vapiConfigOut = __commonJS({
  "../node_modules/svix/dist/models/vapiConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VapiConfigOutSerializer = void 0;
    exports.VapiConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_veriffConfigOut = __commonJS({
  "../node_modules/svix/dist/models/veriffConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VeriffConfigOutSerializer = void 0;
    exports.VeriffConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_zoomConfigOut = __commonJS({
  "../node_modules/svix/dist/models/zoomConfigOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZoomConfigOutSerializer = void 0;
    exports.ZoomConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self) {
        return {};
      }
    };
  }
});
var require_ingestSourceOut = __commonJS({
  "../node_modules/svix/dist/models/ingestSourceOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestSourceOutSerializer = void 0;
    var adobeSignConfigOut_1 = require_adobeSignConfigOut();
    var airwallexConfigOut_1 = require_airwallexConfigOut();
    var checkbookConfigOut_1 = require_checkbookConfigOut();
    var cronConfig_1 = require_cronConfig();
    var docusignConfigOut_1 = require_docusignConfigOut();
    var easypostConfigOut_1 = require_easypostConfigOut();
    var githubConfigOut_1 = require_githubConfigOut();
    var hubspotConfigOut_1 = require_hubspotConfigOut();
    var orumIoConfigOut_1 = require_orumIoConfigOut();
    var pandaDocConfigOut_1 = require_pandaDocConfigOut();
    var portIoConfigOut_1 = require_portIoConfigOut();
    var rutterConfigOut_1 = require_rutterConfigOut();
    var segmentConfigOut_1 = require_segmentConfigOut();
    var shopifyConfigOut_1 = require_shopifyConfigOut();
    var slackConfigOut_1 = require_slackConfigOut();
    var stripeConfigOut_1 = require_stripeConfigOut();
    var svixConfigOut_1 = require_svixConfigOut();
    var telnyxConfigOut_1 = require_telnyxConfigOut();
    var vapiConfigOut_1 = require_vapiConfigOut();
    var veriffConfigOut_1 = require_veriffConfigOut();
    var zoomConfigOut_1 = require_zoomConfigOut();
    exports.IngestSourceOutSerializer = {
      _fromJsonObject(object) {
        const type = object["type"];
        function getConfig(type2) {
          switch (type2) {
            case "generic-webhook":
              return {};
            case "cron":
              return cronConfig_1.CronConfigSerializer._fromJsonObject(object["config"]);
            case "adobe-sign":
              return adobeSignConfigOut_1.AdobeSignConfigOutSerializer._fromJsonObject(object["config"]);
            case "beehiiv":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "brex":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "checkbook":
              return checkbookConfigOut_1.CheckbookConfigOutSerializer._fromJsonObject(object["config"]);
            case "clerk":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "docusign":
              return docusignConfigOut_1.DocusignConfigOutSerializer._fromJsonObject(object["config"]);
            case "easypost":
              return easypostConfigOut_1.EasypostConfigOutSerializer._fromJsonObject(object["config"]);
            case "github":
              return githubConfigOut_1.GithubConfigOutSerializer._fromJsonObject(object["config"]);
            case "guesty":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "hubspot":
              return hubspotConfigOut_1.HubspotConfigOutSerializer._fromJsonObject(object["config"]);
            case "incident-io":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "lithic":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "nash":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "orum-io":
              return orumIoConfigOut_1.OrumIoConfigOutSerializer._fromJsonObject(object["config"]);
            case "panda-doc":
              return pandaDocConfigOut_1.PandaDocConfigOutSerializer._fromJsonObject(object["config"]);
            case "port-io":
              return portIoConfigOut_1.PortIoConfigOutSerializer._fromJsonObject(object["config"]);
            case "pleo":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "replicate":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "resend":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "rutter":
              return rutterConfigOut_1.RutterConfigOutSerializer._fromJsonObject(object["config"]);
            case "safebase":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "sardine":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "segment":
              return segmentConfigOut_1.SegmentConfigOutSerializer._fromJsonObject(object["config"]);
            case "shopify":
              return shopifyConfigOut_1.ShopifyConfigOutSerializer._fromJsonObject(object["config"]);
            case "slack":
              return slackConfigOut_1.SlackConfigOutSerializer._fromJsonObject(object["config"]);
            case "stripe":
              return stripeConfigOut_1.StripeConfigOutSerializer._fromJsonObject(object["config"]);
            case "stych":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "svix":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "zoom":
              return zoomConfigOut_1.ZoomConfigOutSerializer._fromJsonObject(object["config"]);
            case "telnyx":
              return telnyxConfigOut_1.TelnyxConfigOutSerializer._fromJsonObject(object["config"]);
            case "vapi":
              return vapiConfigOut_1.VapiConfigOutSerializer._fromJsonObject(object["config"]);
            case "open-ai":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "render":
              return svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            case "veriff":
              return veriffConfigOut_1.VeriffConfigOutSerializer._fromJsonObject(object["config"]);
            case "airwallex":
              return airwallexConfigOut_1.AirwallexConfigOutSerializer._fromJsonObject(object["config"]);
            default:
              throw new Error(`Unexpected type: ${type2}`);
          }
        }
        __name(getConfig, "getConfig");
        __name2(getConfig, "getConfig");
        return {
          type,
          config: getConfig(type),
          createdAt: new Date(object["createdAt"]),
          id: object["id"],
          ingestUrl: object["ingestUrl"],
          metadata: object["metadata"],
          name: object["name"],
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"])
        };
      },
      _toJsonObject(self) {
        let config;
        switch (self.type) {
          case "generic-webhook":
            config = {};
            break;
          case "cron":
            config = cronConfig_1.CronConfigSerializer._toJsonObject(self.config);
            break;
          case "adobe-sign":
            config = adobeSignConfigOut_1.AdobeSignConfigOutSerializer._toJsonObject(self.config);
            break;
          case "beehiiv":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "brex":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "checkbook":
            config = checkbookConfigOut_1.CheckbookConfigOutSerializer._toJsonObject(self.config);
            break;
          case "clerk":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "docusign":
            config = docusignConfigOut_1.DocusignConfigOutSerializer._toJsonObject(self.config);
            break;
          case "easypost":
            config = easypostConfigOut_1.EasypostConfigOutSerializer._toJsonObject(self.config);
            break;
          case "github":
            config = githubConfigOut_1.GithubConfigOutSerializer._toJsonObject(self.config);
            break;
          case "guesty":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "hubspot":
            config = hubspotConfigOut_1.HubspotConfigOutSerializer._toJsonObject(self.config);
            break;
          case "incident-io":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "lithic":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "nash":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "orum-io":
            config = orumIoConfigOut_1.OrumIoConfigOutSerializer._toJsonObject(self.config);
            break;
          case "panda-doc":
            config = pandaDocConfigOut_1.PandaDocConfigOutSerializer._toJsonObject(self.config);
            break;
          case "port-io":
            config = portIoConfigOut_1.PortIoConfigOutSerializer._toJsonObject(self.config);
            break;
          case "pleo":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "replicate":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "resend":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "rutter":
            config = rutterConfigOut_1.RutterConfigOutSerializer._toJsonObject(self.config);
            break;
          case "safebase":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "sardine":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "segment":
            config = segmentConfigOut_1.SegmentConfigOutSerializer._toJsonObject(self.config);
            break;
          case "shopify":
            config = shopifyConfigOut_1.ShopifyConfigOutSerializer._toJsonObject(self.config);
            break;
          case "slack":
            config = slackConfigOut_1.SlackConfigOutSerializer._toJsonObject(self.config);
            break;
          case "stripe":
            config = stripeConfigOut_1.StripeConfigOutSerializer._toJsonObject(self.config);
            break;
          case "stych":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "svix":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "zoom":
            config = zoomConfigOut_1.ZoomConfigOutSerializer._toJsonObject(self.config);
            break;
          case "telnyx":
            config = telnyxConfigOut_1.TelnyxConfigOutSerializer._toJsonObject(self.config);
            break;
          case "vapi":
            config = vapiConfigOut_1.VapiConfigOutSerializer._toJsonObject(self.config);
            break;
          case "open-ai":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "render":
            config = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self.config);
            break;
          case "veriff":
            config = veriffConfigOut_1.VeriffConfigOutSerializer._toJsonObject(self.config);
            break;
          case "airwallex":
            config = airwallexConfigOut_1.AirwallexConfigOutSerializer._toJsonObject(self.config);
            break;
        }
        return {
          type: self.type,
          config,
          createdAt: self.createdAt,
          id: self.id,
          ingestUrl: self.ingestUrl,
          metadata: self.metadata,
          name: self.name,
          uid: self.uid,
          updatedAt: self.updatedAt
        };
      }
    };
  }
});
var require_listResponseIngestSourceOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseIngestSourceOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseIngestSourceOutSerializer = void 0;
    var ingestSourceOut_1 = require_ingestSourceOut();
    exports.ListResponseIngestSourceOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => ingestSourceOut_1.IngestSourceOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_rotateTokenOut = __commonJS({
  "../node_modules/svix/dist/models/rotateTokenOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RotateTokenOutSerializer = void 0;
    exports.RotateTokenOutSerializer = {
      _fromJsonObject(object) {
        return {
          ingestUrl: object["ingestUrl"]
        };
      },
      _toJsonObject(self) {
        return {
          ingestUrl: self.ingestUrl
        };
      }
    };
  }
});
var require_ingestSource = __commonJS({
  "../node_modules/svix/dist/api/ingestSource.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestSource = void 0;
    var ingestSourceIn_1 = require_ingestSourceIn();
    var ingestSourceOut_1 = require_ingestSourceOut();
    var listResponseIngestSourceOut_1 = require_listResponseIngestSourceOut();
    var rotateTokenOut_1 = require_rotateTokenOut();
    var request_1 = require_request();
    var IngestSource = class {
      static {
        __name(this, "IngestSource");
      }
      static {
        __name2(this, "IngestSource");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source");
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseIngestSourceOut_1.ListResponseIngestSourceOutSerializer._fromJsonObject);
      }
      create(ingestSourceIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(ingestSourceIn_1.IngestSourceInSerializer._toJsonObject(ingestSourceIn));
        return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
      }
      get(sourceId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}");
        request.setPathParam("source_id", sourceId);
        return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
      }
      update(sourceId, ingestSourceIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}");
        request.setPathParam("source_id", sourceId);
        request.setBody(ingestSourceIn_1.IngestSourceInSerializer._toJsonObject(ingestSourceIn));
        return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
      }
      delete(sourceId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/ingest/api/v1/source/{source_id}");
        request.setPathParam("source_id", sourceId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      rotateToken(sourceId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/token/rotate");
        request.setPathParam("source_id", sourceId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.send(this.requestCtx, rotateTokenOut_1.RotateTokenOutSerializer._fromJsonObject);
      }
    };
    exports.IngestSource = IngestSource;
  }
});
var require_ingest = __commonJS({
  "../node_modules/svix/dist/api/ingest.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ingest = void 0;
    var dashboardAccessOut_1 = require_dashboardAccessOut();
    var ingestSourceConsumerPortalAccessIn_1 = require_ingestSourceConsumerPortalAccessIn();
    var ingestEndpoint_1 = require_ingestEndpoint();
    var ingestSource_1 = require_ingestSource();
    var request_1 = require_request();
    var Ingest = class {
      static {
        __name(this, "Ingest");
      }
      static {
        __name2(this, "Ingest");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      get endpoint() {
        return new ingestEndpoint_1.IngestEndpoint(this.requestCtx);
      }
      get source() {
        return new ingestSource_1.IngestSource(this.requestCtx);
      }
      dashboard(sourceId, ingestSourceConsumerPortalAccessIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/dashboard");
        request.setPathParam("source_id", sourceId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(ingestSourceConsumerPortalAccessIn_1.IngestSourceConsumerPortalAccessInSerializer._toJsonObject(ingestSourceConsumerPortalAccessIn));
        return request.send(this.requestCtx, dashboardAccessOut_1.DashboardAccessOutSerializer._fromJsonObject);
      }
    };
    exports.Ingest = Ingest;
  }
});
var require_integrationIn = __commonJS({
  "../node_modules/svix/dist/models/integrationIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegrationInSerializer = void 0;
    exports.IntegrationInSerializer = {
      _fromJsonObject(object) {
        return {
          featureFlags: object["featureFlags"],
          name: object["name"]
        };
      },
      _toJsonObject(self) {
        return {
          featureFlags: self.featureFlags,
          name: self.name
        };
      }
    };
  }
});
var require_integrationKeyOut = __commonJS({
  "../node_modules/svix/dist/models/integrationKeyOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegrationKeyOutSerializer = void 0;
    exports.IntegrationKeyOutSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self) {
        return {
          key: self.key
        };
      }
    };
  }
});
var require_integrationOut = __commonJS({
  "../node_modules/svix/dist/models/integrationOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegrationOutSerializer = void 0;
    exports.IntegrationOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          featureFlags: object["featureFlags"],
          id: object["id"],
          name: object["name"],
          updatedAt: new Date(object["updatedAt"])
        };
      },
      _toJsonObject(self) {
        return {
          createdAt: self.createdAt,
          featureFlags: self.featureFlags,
          id: self.id,
          name: self.name,
          updatedAt: self.updatedAt
        };
      }
    };
  }
});
var require_integrationUpdate = __commonJS({
  "../node_modules/svix/dist/models/integrationUpdate.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegrationUpdateSerializer = void 0;
    exports.IntegrationUpdateSerializer = {
      _fromJsonObject(object) {
        return {
          featureFlags: object["featureFlags"],
          name: object["name"]
        };
      },
      _toJsonObject(self) {
        return {
          featureFlags: self.featureFlags,
          name: self.name
        };
      }
    };
  }
});
var require_listResponseIntegrationOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseIntegrationOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseIntegrationOutSerializer = void 0;
    var integrationOut_1 = require_integrationOut();
    exports.ListResponseIntegrationOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => integrationOut_1.IntegrationOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => integrationOut_1.IntegrationOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_integration = __commonJS({
  "../node_modules/svix/dist/api/integration.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Integration = void 0;
    var integrationIn_1 = require_integrationIn();
    var integrationKeyOut_1 = require_integrationKeyOut();
    var integrationOut_1 = require_integrationOut();
    var integrationUpdate_1 = require_integrationUpdate();
    var listResponseIntegrationOut_1 = require_listResponseIntegrationOut();
    var request_1 = require_request();
    var Integration = class {
      static {
        __name(this, "Integration");
      }
      static {
        __name2(this, "Integration");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(appId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration");
        request.setPathParam("app_id", appId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseIntegrationOut_1.ListResponseIntegrationOutSerializer._fromJsonObject);
      }
      create(appId, integrationIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/integration");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(integrationIn_1.IntegrationInSerializer._toJsonObject(integrationIn));
        return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
      }
      get(appId, integId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration/{integ_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("integ_id", integId);
        return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
      }
      update(appId, integId, integrationUpdate) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/integration/{integ_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("integ_id", integId);
        request.setBody(integrationUpdate_1.IntegrationUpdateSerializer._toJsonObject(integrationUpdate));
        return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
      }
      delete(appId, integId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/integration/{integ_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("integ_id", integId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      getKey(appId, integId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration/{integ_id}/key");
        request.setPathParam("app_id", appId);
        request.setPathParam("integ_id", integId);
        return request.send(this.requestCtx, integrationKeyOut_1.IntegrationKeyOutSerializer._fromJsonObject);
      }
      rotateKey(appId, integId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/integration/{integ_id}/key/rotate");
        request.setPathParam("app_id", appId);
        request.setPathParam("integ_id", integId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.send(this.requestCtx, integrationKeyOut_1.IntegrationKeyOutSerializer._fromJsonObject);
      }
    };
    exports.Integration = Integration;
  }
});
var require_expungeAllContentsOut = __commonJS({
  "../node_modules/svix/dist/models/expungeAllContentsOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExpungeAllContentsOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.ExpungeAllContentsOutSerializer = {
      _fromJsonObject(object) {
        return {
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"])
        };
      },
      _toJsonObject(self) {
        return {
          id: self.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task)
        };
      }
    };
  }
});
var require_listResponseMessageOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseMessageOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseMessageOutSerializer = void 0;
    var messageOut_1 = require_messageOut();
    exports.ListResponseMessageOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => messageOut_1.MessageOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => messageOut_1.MessageOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_pollingEndpointConsumerSeekIn = __commonJS({
  "../node_modules/svix/dist/models/pollingEndpointConsumerSeekIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollingEndpointConsumerSeekInSerializer = void 0;
    exports.PollingEndpointConsumerSeekInSerializer = {
      _fromJsonObject(object) {
        return {
          after: new Date(object["after"])
        };
      },
      _toJsonObject(self) {
        return {
          after: self.after
        };
      }
    };
  }
});
var require_pollingEndpointConsumerSeekOut = __commonJS({
  "../node_modules/svix/dist/models/pollingEndpointConsumerSeekOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollingEndpointConsumerSeekOutSerializer = void 0;
    exports.PollingEndpointConsumerSeekOutSerializer = {
      _fromJsonObject(object) {
        return {
          iterator: object["iterator"]
        };
      },
      _toJsonObject(self) {
        return {
          iterator: self.iterator
        };
      }
    };
  }
});
var require_pollingEndpointMessageOut = __commonJS({
  "../node_modules/svix/dist/models/pollingEndpointMessageOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollingEndpointMessageOutSerializer = void 0;
    exports.PollingEndpointMessageOutSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          eventId: object["eventId"],
          eventType: object["eventType"],
          headers: object["headers"],
          id: object["id"],
          payload: object["payload"],
          tags: object["tags"],
          timestamp: new Date(object["timestamp"])
        };
      },
      _toJsonObject(self) {
        return {
          channels: self.channels,
          eventId: self.eventId,
          eventType: self.eventType,
          headers: self.headers,
          id: self.id,
          payload: self.payload,
          tags: self.tags,
          timestamp: self.timestamp
        };
      }
    };
  }
});
var require_pollingEndpointOut = __commonJS({
  "../node_modules/svix/dist/models/pollingEndpointOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollingEndpointOutSerializer = void 0;
    var pollingEndpointMessageOut_1 = require_pollingEndpointMessageOut();
    exports.PollingEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => pollingEndpointMessageOut_1.PollingEndpointMessageOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => pollingEndpointMessageOut_1.PollingEndpointMessageOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator
        };
      }
    };
  }
});
var require_messagePoller = __commonJS({
  "../node_modules/svix/dist/api/messagePoller.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessagePoller = void 0;
    var pollingEndpointConsumerSeekIn_1 = require_pollingEndpointConsumerSeekIn();
    var pollingEndpointConsumerSeekOut_1 = require_pollingEndpointConsumerSeekOut();
    var pollingEndpointOut_1 = require_pollingEndpointOut();
    var request_1 = require_request();
    var MessagePoller = class {
      static {
        __name(this, "MessagePoller");
      }
      static {
        __name2(this, "MessagePoller");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      poll(appId, sinkId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/poller/{sink_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("sink_id", sinkId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("event_type", options === null || options === void 0 ? void 0 : options.eventType);
        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
        return request.send(this.requestCtx, pollingEndpointOut_1.PollingEndpointOutSerializer._fromJsonObject);
      }
      consumerPoll(appId, sinkId, consumerId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/poller/{sink_id}/consumer/{consumer_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("sink_id", sinkId);
        request.setPathParam("consumer_id", consumerId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        return request.send(this.requestCtx, pollingEndpointOut_1.PollingEndpointOutSerializer._fromJsonObject);
      }
      consumerSeek(appId, sinkId, consumerId, pollingEndpointConsumerSeekIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/poller/{sink_id}/consumer/{consumer_id}/seek");
        request.setPathParam("app_id", appId);
        request.setPathParam("sink_id", sinkId);
        request.setPathParam("consumer_id", consumerId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(pollingEndpointConsumerSeekIn_1.PollingEndpointConsumerSeekInSerializer._toJsonObject(pollingEndpointConsumerSeekIn));
        return request.send(this.requestCtx, pollingEndpointConsumerSeekOut_1.PollingEndpointConsumerSeekOutSerializer._fromJsonObject);
      }
    };
    exports.MessagePoller = MessagePoller;
  }
});
var require_messageIn = __commonJS({
  "../node_modules/svix/dist/models/messageIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageInSerializer = void 0;
    var applicationIn_1 = require_applicationIn();
    exports.MessageInSerializer = {
      _fromJsonObject(object) {
        return {
          application: object["application"] ? applicationIn_1.ApplicationInSerializer._fromJsonObject(object["application"]) : void 0,
          channels: object["channels"],
          eventId: object["eventId"],
          eventType: object["eventType"],
          payload: object["payload"],
          payloadRetentionHours: object["payloadRetentionHours"],
          payloadRetentionPeriod: object["payloadRetentionPeriod"],
          tags: object["tags"],
          transformationsParams: object["transformationsParams"]
        };
      },
      _toJsonObject(self) {
        return {
          application: self.application ? applicationIn_1.ApplicationInSerializer._toJsonObject(self.application) : void 0,
          channels: self.channels,
          eventId: self.eventId,
          eventType: self.eventType,
          payload: self.payload,
          payloadRetentionHours: self.payloadRetentionHours,
          payloadRetentionPeriod: self.payloadRetentionPeriod,
          tags: self.tags,
          transformationsParams: self.transformationsParams
        };
      }
    };
  }
});
var require_message = __commonJS({
  "../node_modules/svix/dist/api/message.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.messageInRaw = exports.Message = void 0;
    var expungeAllContentsOut_1 = require_expungeAllContentsOut();
    var listResponseMessageOut_1 = require_listResponseMessageOut();
    var messageOut_1 = require_messageOut();
    var messagePoller_1 = require_messagePoller();
    var request_1 = require_request();
    var messageIn_1 = require_messageIn();
    var Message = class {
      static {
        __name(this, "Message");
      }
      static {
        __name2(this, "Message");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      get poller() {
        return new messagePoller_1.MessagePoller(this.requestCtx);
      }
      list(appId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg");
        request.setPathParam("app_id", appId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
        return request.send(this.requestCtx, listResponseMessageOut_1.ListResponseMessageOutSerializer._fromJsonObject);
      }
      create(appId, messageIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg");
        request.setPathParam("app_id", appId);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(messageIn_1.MessageInSerializer._toJsonObject(messageIn));
        return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
      }
      expungeAllContents(appId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg/expunge-all-contents");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.send(this.requestCtx, expungeAllContentsOut_1.ExpungeAllContentsOutSerializer._fromJsonObject);
      }
      get(appId, msgId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
      }
      expungeContent(appId, msgId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/msg/{msg_id}/content");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    exports.Message = Message;
    function messageInRaw(eventType, payload, contentType) {
      const headers = contentType ? { "content-type": contentType } : void 0;
      return {
        eventType,
        payload: {},
        transformationsParams: {
          rawPayload: payload,
          headers
        }
      };
    }
    __name(messageInRaw, "messageInRaw");
    __name2(messageInRaw, "messageInRaw");
    exports.messageInRaw = messageInRaw;
  }
});
var require_messageStatus = __commonJS({
  "../node_modules/svix/dist/models/messageStatus.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageStatusSerializer = exports.MessageStatus = void 0;
    var MessageStatus;
    (function(MessageStatus2) {
      MessageStatus2[MessageStatus2["Success"] = 0] = "Success";
      MessageStatus2[MessageStatus2["Pending"] = 1] = "Pending";
      MessageStatus2[MessageStatus2["Fail"] = 2] = "Fail";
      MessageStatus2[MessageStatus2["Sending"] = 3] = "Sending";
    })(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
    exports.MessageStatusSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self) {
        return self;
      }
    };
  }
});
var require_messageStatusText = __commonJS({
  "../node_modules/svix/dist/models/messageStatusText.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageStatusTextSerializer = exports.MessageStatusText = void 0;
    var MessageStatusText;
    (function(MessageStatusText2) {
      MessageStatusText2["Success"] = "success";
      MessageStatusText2["Pending"] = "pending";
      MessageStatusText2["Fail"] = "fail";
      MessageStatusText2["Sending"] = "sending";
    })(MessageStatusText = exports.MessageStatusText || (exports.MessageStatusText = {}));
    exports.MessageStatusTextSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self) {
        return self;
      }
    };
  }
});
var require_endpointMessageOut = __commonJS({
  "../node_modules/svix/dist/models/endpointMessageOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointMessageOutSerializer = void 0;
    var messageStatus_1 = require_messageStatus();
    var messageStatusText_1 = require_messageStatusText();
    exports.EndpointMessageOutSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          eventId: object["eventId"],
          eventType: object["eventType"],
          id: object["id"],
          nextAttempt: object["nextAttempt"] ? new Date(object["nextAttempt"]) : null,
          payload: object["payload"],
          status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
          statusText: messageStatusText_1.MessageStatusTextSerializer._fromJsonObject(object["statusText"]),
          tags: object["tags"],
          timestamp: new Date(object["timestamp"])
        };
      },
      _toJsonObject(self) {
        return {
          channels: self.channels,
          eventId: self.eventId,
          eventType: self.eventType,
          id: self.id,
          nextAttempt: self.nextAttempt,
          payload: self.payload,
          status: messageStatus_1.MessageStatusSerializer._toJsonObject(self.status),
          statusText: messageStatusText_1.MessageStatusTextSerializer._toJsonObject(self.statusText),
          tags: self.tags,
          timestamp: self.timestamp
        };
      }
    };
  }
});
var require_listResponseEndpointMessageOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseEndpointMessageOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseEndpointMessageOutSerializer = void 0;
    var endpointMessageOut_1 = require_endpointMessageOut();
    exports.ListResponseEndpointMessageOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => endpointMessageOut_1.EndpointMessageOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => endpointMessageOut_1.EndpointMessageOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_messageAttemptTriggerType = __commonJS({
  "../node_modules/svix/dist/models/messageAttemptTriggerType.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageAttemptTriggerTypeSerializer = exports.MessageAttemptTriggerType = void 0;
    var MessageAttemptTriggerType;
    (function(MessageAttemptTriggerType2) {
      MessageAttemptTriggerType2[MessageAttemptTriggerType2["Scheduled"] = 0] = "Scheduled";
      MessageAttemptTriggerType2[MessageAttemptTriggerType2["Manual"] = 1] = "Manual";
    })(MessageAttemptTriggerType = exports.MessageAttemptTriggerType || (exports.MessageAttemptTriggerType = {}));
    exports.MessageAttemptTriggerTypeSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self) {
        return self;
      }
    };
  }
});
var require_messageAttemptOut = __commonJS({
  "../node_modules/svix/dist/models/messageAttemptOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageAttemptOutSerializer = void 0;
    var messageAttemptTriggerType_1 = require_messageAttemptTriggerType();
    var messageOut_1 = require_messageOut();
    var messageStatus_1 = require_messageStatus();
    var messageStatusText_1 = require_messageStatusText();
    exports.MessageAttemptOutSerializer = {
      _fromJsonObject(object) {
        return {
          endpointId: object["endpointId"],
          id: object["id"],
          msg: object["msg"] ? messageOut_1.MessageOutSerializer._fromJsonObject(object["msg"]) : void 0,
          msgId: object["msgId"],
          response: object["response"],
          responseDurationMs: object["responseDurationMs"],
          responseStatusCode: object["responseStatusCode"],
          status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
          statusText: messageStatusText_1.MessageStatusTextSerializer._fromJsonObject(object["statusText"]),
          timestamp: new Date(object["timestamp"]),
          triggerType: messageAttemptTriggerType_1.MessageAttemptTriggerTypeSerializer._fromJsonObject(object["triggerType"]),
          url: object["url"]
        };
      },
      _toJsonObject(self) {
        return {
          endpointId: self.endpointId,
          id: self.id,
          msg: self.msg ? messageOut_1.MessageOutSerializer._toJsonObject(self.msg) : void 0,
          msgId: self.msgId,
          response: self.response,
          responseDurationMs: self.responseDurationMs,
          responseStatusCode: self.responseStatusCode,
          status: messageStatus_1.MessageStatusSerializer._toJsonObject(self.status),
          statusText: messageStatusText_1.MessageStatusTextSerializer._toJsonObject(self.statusText),
          timestamp: self.timestamp,
          triggerType: messageAttemptTriggerType_1.MessageAttemptTriggerTypeSerializer._toJsonObject(self.triggerType),
          url: self.url
        };
      }
    };
  }
});
var require_listResponseMessageAttemptOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseMessageAttemptOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseMessageAttemptOutSerializer = void 0;
    var messageAttemptOut_1 = require_messageAttemptOut();
    exports.ListResponseMessageAttemptOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => messageAttemptOut_1.MessageAttemptOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => messageAttemptOut_1.MessageAttemptOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_messageEndpointOut = __commonJS({
  "../node_modules/svix/dist/models/messageEndpointOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageEndpointOutSerializer = void 0;
    var messageStatus_1 = require_messageStatus();
    var messageStatusText_1 = require_messageStatusText();
    exports.MessageEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          createdAt: new Date(object["createdAt"]),
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          id: object["id"],
          nextAttempt: object["nextAttempt"] ? new Date(object["nextAttempt"]) : null,
          rateLimit: object["rateLimit"],
          status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
          statusText: messageStatusText_1.MessageStatusTextSerializer._fromJsonObject(object["statusText"]),
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"]),
          url: object["url"],
          version: object["version"]
        };
      },
      _toJsonObject(self) {
        return {
          channels: self.channels,
          createdAt: self.createdAt,
          description: self.description,
          disabled: self.disabled,
          filterTypes: self.filterTypes,
          id: self.id,
          nextAttempt: self.nextAttempt,
          rateLimit: self.rateLimit,
          status: messageStatus_1.MessageStatusSerializer._toJsonObject(self.status),
          statusText: messageStatusText_1.MessageStatusTextSerializer._toJsonObject(self.statusText),
          uid: self.uid,
          updatedAt: self.updatedAt,
          url: self.url,
          version: self.version
        };
      }
    };
  }
});
var require_listResponseMessageEndpointOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseMessageEndpointOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseMessageEndpointOutSerializer = void 0;
    var messageEndpointOut_1 = require_messageEndpointOut();
    exports.ListResponseMessageEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => messageEndpointOut_1.MessageEndpointOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => messageEndpointOut_1.MessageEndpointOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_messageAttempt = __commonJS({
  "../node_modules/svix/dist/api/messageAttempt.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageAttempt = void 0;
    var listResponseEndpointMessageOut_1 = require_listResponseEndpointMessageOut();
    var listResponseMessageAttemptOut_1 = require_listResponseMessageAttemptOut();
    var listResponseMessageEndpointOut_1 = require_listResponseMessageEndpointOut();
    var messageAttemptOut_1 = require_messageAttemptOut();
    var request_1 = require_request();
    var MessageAttempt = class {
      static {
        __name(this, "MessageAttempt");
      }
      static {
        __name2(this, "MessageAttempt");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      listByEndpoint(appId, endpointId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/attempt/endpoint/{endpoint_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
        request.setQueryParam("status_code_class", options === null || options === void 0 ? void 0 : options.statusCodeClass);
        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        request.setQueryParam("with_msg", options === null || options === void 0 ? void 0 : options.withMsg);
        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
        return request.send(this.requestCtx, listResponseMessageAttemptOut_1.ListResponseMessageAttemptOutSerializer._fromJsonObject);
      }
      listByMsg(appId, msgId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/attempt/msg/{msg_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
        request.setQueryParam("status_code_class", options === null || options === void 0 ? void 0 : options.statusCodeClass);
        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
        request.setQueryParam("endpoint_id", options === null || options === void 0 ? void 0 : options.endpointId);
        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
        return request.send(this.requestCtx, listResponseMessageAttemptOut_1.ListResponseMessageAttemptOutSerializer._fromJsonObject);
      }
      listAttemptedMessages(appId, endpointId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/msg");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
        return request.send(this.requestCtx, listResponseEndpointMessageOut_1.ListResponseEndpointMessageOutSerializer._fromJsonObject);
      }
      get(appId, msgId, attemptId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}/attempt/{attempt_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setPathParam("attempt_id", attemptId);
        return request.send(this.requestCtx, messageAttemptOut_1.MessageAttemptOutSerializer._fromJsonObject);
      }
      expungeContent(appId, msgId, attemptId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/msg/{msg_id}/attempt/{attempt_id}/content");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setPathParam("attempt_id", attemptId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      listAttemptedDestinations(appId, msgId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}/endpoint");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        return request.send(this.requestCtx, listResponseMessageEndpointOut_1.ListResponseMessageEndpointOutSerializer._fromJsonObject);
      }
      resend(appId, msgId, endpointId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg/{msg_id}/endpoint/{endpoint_id}/resend");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    exports.MessageAttempt = MessageAttempt;
  }
});
var require_operationalWebhookEndpointOut = __commonJS({
  "../node_modules/svix/dist/models/operationalWebhookEndpointOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointOutSerializer = void 0;
    exports.OperationalWebhookEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          id: object["id"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"]),
          url: object["url"]
        };
      },
      _toJsonObject(self) {
        return {
          createdAt: self.createdAt,
          description: self.description,
          disabled: self.disabled,
          filterTypes: self.filterTypes,
          id: self.id,
          metadata: self.metadata,
          rateLimit: self.rateLimit,
          uid: self.uid,
          updatedAt: self.updatedAt,
          url: self.url
        };
      }
    };
  }
});
var require_listResponseOperationalWebhookEndpointOut = __commonJS({
  "../node_modules/svix/dist/models/listResponseOperationalWebhookEndpointOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseOperationalWebhookEndpointOutSerializer = void 0;
    var operationalWebhookEndpointOut_1 = require_operationalWebhookEndpointOut();
    exports.ListResponseOperationalWebhookEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"].map((item) => operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self) {
        return {
          data: self.data.map((item) => operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._toJsonObject(item)),
          done: self.done,
          iterator: self.iterator,
          prevIterator: self.prevIterator
        };
      }
    };
  }
});
var require_operationalWebhookEndpointHeadersIn = __commonJS({
  "../node_modules/svix/dist/models/operationalWebhookEndpointHeadersIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointHeadersInSerializer = void 0;
    exports.OperationalWebhookEndpointHeadersInSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"]
        };
      },
      _toJsonObject(self) {
        return {
          headers: self.headers
        };
      }
    };
  }
});
var require_operationalWebhookEndpointHeadersOut = __commonJS({
  "../node_modules/svix/dist/models/operationalWebhookEndpointHeadersOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointHeadersOutSerializer = void 0;
    exports.OperationalWebhookEndpointHeadersOutSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"],
          sensitive: object["sensitive"]
        };
      },
      _toJsonObject(self) {
        return {
          headers: self.headers,
          sensitive: self.sensitive
        };
      }
    };
  }
});
var require_operationalWebhookEndpointIn = __commonJS({
  "../node_modules/svix/dist/models/operationalWebhookEndpointIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointInSerializer = void 0;
    exports.OperationalWebhookEndpointInSerializer = {
      _fromJsonObject(object) {
        return {
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          secret: object["secret"],
          uid: object["uid"],
          url: object["url"]
        };
      },
      _toJsonObject(self) {
        return {
          description: self.description,
          disabled: self.disabled,
          filterTypes: self.filterTypes,
          metadata: self.metadata,
          rateLimit: self.rateLimit,
          secret: self.secret,
          uid: self.uid,
          url: self.url
        };
      }
    };
  }
});
var require_operationalWebhookEndpointSecretIn = __commonJS({
  "../node_modules/svix/dist/models/operationalWebhookEndpointSecretIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointSecretInSerializer = void 0;
    exports.OperationalWebhookEndpointSecretInSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self) {
        return {
          key: self.key
        };
      }
    };
  }
});
var require_operationalWebhookEndpointSecretOut = __commonJS({
  "../node_modules/svix/dist/models/operationalWebhookEndpointSecretOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointSecretOutSerializer = void 0;
    exports.OperationalWebhookEndpointSecretOutSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self) {
        return {
          key: self.key
        };
      }
    };
  }
});
var require_operationalWebhookEndpointUpdate = __commonJS({
  "../node_modules/svix/dist/models/operationalWebhookEndpointUpdate.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointUpdateSerializer = void 0;
    exports.OperationalWebhookEndpointUpdateSerializer = {
      _fromJsonObject(object) {
        return {
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          url: object["url"]
        };
      },
      _toJsonObject(self) {
        return {
          description: self.description,
          disabled: self.disabled,
          filterTypes: self.filterTypes,
          metadata: self.metadata,
          rateLimit: self.rateLimit,
          uid: self.uid,
          url: self.url
        };
      }
    };
  }
});
var require_operationalWebhookEndpoint = __commonJS({
  "../node_modules/svix/dist/api/operationalWebhookEndpoint.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpoint = void 0;
    var listResponseOperationalWebhookEndpointOut_1 = require_listResponseOperationalWebhookEndpointOut();
    var operationalWebhookEndpointHeadersIn_1 = require_operationalWebhookEndpointHeadersIn();
    var operationalWebhookEndpointHeadersOut_1 = require_operationalWebhookEndpointHeadersOut();
    var operationalWebhookEndpointIn_1 = require_operationalWebhookEndpointIn();
    var operationalWebhookEndpointOut_1 = require_operationalWebhookEndpointOut();
    var operationalWebhookEndpointSecretIn_1 = require_operationalWebhookEndpointSecretIn();
    var operationalWebhookEndpointSecretOut_1 = require_operationalWebhookEndpointSecretOut();
    var operationalWebhookEndpointUpdate_1 = require_operationalWebhookEndpointUpdate();
    var request_1 = require_request();
    var OperationalWebhookEndpoint = class {
      static {
        __name(this, "OperationalWebhookEndpoint");
      }
      static {
        __name2(this, "OperationalWebhookEndpoint");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint");
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseOperationalWebhookEndpointOut_1.ListResponseOperationalWebhookEndpointOutSerializer._fromJsonObject);
      }
      create(operationalWebhookEndpointIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/operational-webhook/endpoint");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(operationalWebhookEndpointIn_1.OperationalWebhookEndpointInSerializer._toJsonObject(operationalWebhookEndpointIn));
        return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
      }
      get(endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
      }
      update(endpointId, operationalWebhookEndpointUpdate) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(operationalWebhookEndpointUpdate_1.OperationalWebhookEndpointUpdateSerializer._toJsonObject(operationalWebhookEndpointUpdate));
        return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
      }
      delete(endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
        request.setPathParam("endpoint_id", endpointId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      getHeaders(endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}/headers");
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, operationalWebhookEndpointHeadersOut_1.OperationalWebhookEndpointHeadersOutSerializer._fromJsonObject);
      }
      updateHeaders(endpointId, operationalWebhookEndpointHeadersIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/operational-webhook/endpoint/{endpoint_id}/headers");
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(operationalWebhookEndpointHeadersIn_1.OperationalWebhookEndpointHeadersInSerializer._toJsonObject(operationalWebhookEndpointHeadersIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      getSecret(endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}/secret");
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, operationalWebhookEndpointSecretOut_1.OperationalWebhookEndpointSecretOutSerializer._fromJsonObject);
      }
      rotateSecret(endpointId, operationalWebhookEndpointSecretIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/operational-webhook/endpoint/{endpoint_id}/secret/rotate");
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(operationalWebhookEndpointSecretIn_1.OperationalWebhookEndpointSecretInSerializer._toJsonObject(operationalWebhookEndpointSecretIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    exports.OperationalWebhookEndpoint = OperationalWebhookEndpoint;
  }
});
var require_operationalWebhook = __commonJS({
  "../node_modules/svix/dist/api/operationalWebhook.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhook = void 0;
    var operationalWebhookEndpoint_1 = require_operationalWebhookEndpoint();
    var OperationalWebhook = class {
      static {
        __name(this, "OperationalWebhook");
      }
      static {
        __name2(this, "OperationalWebhook");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      get endpoint() {
        return new operationalWebhookEndpoint_1.OperationalWebhookEndpoint(this.requestCtx);
      }
    };
    exports.OperationalWebhook = OperationalWebhook;
  }
});
var require_aggregateEventTypesOut = __commonJS({
  "../node_modules/svix/dist/models/aggregateEventTypesOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AggregateEventTypesOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.AggregateEventTypesOutSerializer = {
      _fromJsonObject(object) {
        return {
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"])
        };
      },
      _toJsonObject(self) {
        return {
          id: self.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task)
        };
      }
    };
  }
});
var require_appUsageStatsIn = __commonJS({
  "../node_modules/svix/dist/models/appUsageStatsIn.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppUsageStatsInSerializer = void 0;
    exports.AppUsageStatsInSerializer = {
      _fromJsonObject(object) {
        return {
          appIds: object["appIds"],
          since: new Date(object["since"]),
          until: new Date(object["until"])
        };
      },
      _toJsonObject(self) {
        return {
          appIds: self.appIds,
          since: self.since,
          until: self.until
        };
      }
    };
  }
});
var require_appUsageStatsOut = __commonJS({
  "../node_modules/svix/dist/models/appUsageStatsOut.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppUsageStatsOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.AppUsageStatsOutSerializer = {
      _fromJsonObject(object) {
        return {
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
          unresolvedAppIds: object["unresolvedAppIds"]
        };
      },
      _toJsonObject(self) {
        return {
          id: self.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self.task),
          unresolvedAppIds: self.unresolvedAppIds
        };
      }
    };
  }
});
var require_statistics = __commonJS({
  "../node_modules/svix/dist/api/statistics.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Statistics = void 0;
    var aggregateEventTypesOut_1 = require_aggregateEventTypesOut();
    var appUsageStatsIn_1 = require_appUsageStatsIn();
    var appUsageStatsOut_1 = require_appUsageStatsOut();
    var request_1 = require_request();
    var Statistics = class {
      static {
        __name(this, "Statistics");
      }
      static {
        __name2(this, "Statistics");
      }
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      aggregateAppStats(appUsageStatsIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/stats/usage/app");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(appUsageStatsIn_1.AppUsageStatsInSerializer._toJsonObject(appUsageStatsIn));
        return request.send(this.requestCtx, appUsageStatsOut_1.AppUsageStatsOutSerializer._fromJsonObject);
      }
      aggregateEventTypes() {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/stats/usage/event-types");
        return request.send(this.requestCtx, aggregateEventTypesOut_1.AggregateEventTypesOutSerializer._fromJsonObject);
      }
    };
    exports.Statistics = Statistics;
  }
});
var require_HttpErrors = __commonJS({
  "../node_modules/svix/dist/HttpErrors.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HTTPValidationError = exports.ValidationError = exports.HttpErrorOut = void 0;
    var HttpErrorOut = class _HttpErrorOut {
      static {
        __name(this, "_HttpErrorOut");
      }
      static {
        __name2(this, "HttpErrorOut");
      }
      static getAttributeTypeMap() {
        return _HttpErrorOut.attributeTypeMap;
      }
    };
    exports.HttpErrorOut = HttpErrorOut;
    HttpErrorOut.discriminator = void 0;
    HttpErrorOut.mapping = void 0;
    HttpErrorOut.attributeTypeMap = [
      {
        name: "code",
        baseName: "code",
        type: "string",
        format: ""
      },
      {
        name: "detail",
        baseName: "detail",
        type: "string",
        format: ""
      }
    ];
    var ValidationError = class _ValidationError {
      static {
        __name(this, "_ValidationError");
      }
      static {
        __name2(this, "ValidationError");
      }
      static getAttributeTypeMap() {
        return _ValidationError.attributeTypeMap;
      }
    };
    exports.ValidationError = ValidationError;
    ValidationError.discriminator = void 0;
    ValidationError.mapping = void 0;
    ValidationError.attributeTypeMap = [
      {
        name: "loc",
        baseName: "loc",
        type: "Array<string>",
        format: ""
      },
      {
        name: "msg",
        baseName: "msg",
        type: "string",
        format: ""
      },
      {
        name: "type",
        baseName: "type",
        type: "string",
        format: ""
      }
    ];
    var HTTPValidationError = class _HTTPValidationError {
      static {
        __name(this, "_HTTPValidationError");
      }
      static {
        __name2(this, "HTTPValidationError");
      }
      static getAttributeTypeMap() {
        return _HTTPValidationError.attributeTypeMap;
      }
    };
    exports.HTTPValidationError = HTTPValidationError;
    HTTPValidationError.discriminator = void 0;
    HTTPValidationError.mapping = void 0;
    HTTPValidationError.attributeTypeMap = [
      {
        name: "detail",
        baseName: "detail",
        type: "Array<ValidationError>",
        format: ""
      }
    ];
  }
});
var require_timing_safe_equal = __commonJS({
  "../node_modules/svix/dist/timing_safe_equal.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timingSafeEqual = void 0;
    function assert(expr, msg = "") {
      if (!expr) {
        throw new Error(msg);
      }
    }
    __name(assert, "assert");
    __name2(assert, "assert");
    function timingSafeEqual(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      if (!(a instanceof DataView)) {
        a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
      }
      if (!(b instanceof DataView)) {
        b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
      }
      assert(a instanceof DataView);
      assert(b instanceof DataView);
      const length = a.byteLength;
      let out = 0;
      let i = -1;
      while (++i < length) {
        out |= a.getUint8(i) ^ b.getUint8(i);
      }
      return out === 0;
    }
    __name(timingSafeEqual, "timingSafeEqual");
    __name2(timingSafeEqual, "timingSafeEqual");
    exports.timingSafeEqual = timingSafeEqual;
  }
});
var require_base64 = __commonJS({
  "../node_modules/@stablelib/base64/lib/base64.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    var __extends = exports && exports.__extends || /* @__PURE__ */ function() {
      var extendStatics = /* @__PURE__ */ __name2(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (b2.hasOwnProperty(p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        __name2(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var INVALID_BYTE = 256;
    var Coder = (
      /** @class */
      function() {
        function Coder2(_paddingCharacter) {
          if (_paddingCharacter === void 0) {
            _paddingCharacter = "=";
          }
          this._paddingCharacter = _paddingCharacter;
        }
        __name(Coder2, "Coder2");
        __name2(Coder2, "Coder");
        Coder2.prototype.encodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 8 + 5) / 6 | 0;
          }
          return (length + 2) / 3 * 4 | 0;
        };
        Coder2.prototype.encode = function(data) {
          var out = "";
          var i = 0;
          for (; i < data.length - 2; i += 3) {
            var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            out += this._encodeByte(c >>> 1 * 6 & 63);
            out += this._encodeByte(c >>> 0 * 6 & 63);
          }
          var left = data.length - i;
          if (left > 0) {
            var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            if (left === 2) {
              out += this._encodeByte(c >>> 1 * 6 & 63);
            } else {
              out += this._paddingCharacter || "";
            }
            out += this._paddingCharacter || "";
          }
          return out;
        };
        Coder2.prototype.maxDecodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 6 + 7) / 8 | 0;
          }
          return length / 4 * 3 | 0;
        };
        Coder2.prototype.decodedLength = function(s) {
          return this.maxDecodedLength(s.length - this._getPaddingLength(s));
        };
        Coder2.prototype.decode = function(s) {
          if (s.length === 0) {
            return new Uint8Array(0);
          }
          var paddingLength = this._getPaddingLength(s);
          var length = s.length - paddingLength;
          var out = new Uint8Array(this.maxDecodedLength(length));
          var op = 0;
          var i = 0;
          var haveBad = 0;
          var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
          for (; i < length - 4; i += 4) {
            v0 = this._decodeChar(s.charCodeAt(i + 0));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v0 << 2 | v1 >>> 4;
            out[op++] = v1 << 4 | v2 >>> 2;
            out[op++] = v2 << 6 | v3;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
            haveBad |= v2 & INVALID_BYTE;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (i < length - 1) {
            v0 = this._decodeChar(s.charCodeAt(i));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            out[op++] = v0 << 2 | v1 >>> 4;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
          }
          if (i < length - 2) {
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            out[op++] = v1 << 4 | v2 >>> 2;
            haveBad |= v2 & INVALID_BYTE;
          }
          if (i < length - 3) {
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v2 << 6 | v3;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (haveBad !== 0) {
            throw new Error("Base64Coder: incorrect characters for decoding");
          }
          return out;
        };
        Coder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
          result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
          return String.fromCharCode(result);
        };
        Coder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
          result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        Coder2.prototype._getPaddingLength = function(s) {
          var paddingLength = 0;
          if (this._paddingCharacter) {
            for (var i = s.length - 1; i >= 0; i--) {
              if (s[i] !== this._paddingCharacter) {
                break;
              }
              paddingLength++;
            }
            if (s.length < 4 || paddingLength > 2) {
              throw new Error("Base64Coder: incorrect padding");
            }
          }
          return paddingLength;
        };
        return Coder2;
      }()
    );
    exports.Coder = Coder;
    var stdCoder = new Coder();
    function encode(data) {
      return stdCoder.encode(data);
    }
    __name(encode, "encode");
    __name2(encode, "encode");
    exports.encode = encode;
    function decode(s) {
      return stdCoder.decode(s);
    }
    __name(decode, "decode");
    __name2(decode, "decode");
    exports.decode = decode;
    var URLSafeCoder = (
      /** @class */
      function(_super) {
        __extends(URLSafeCoder2, _super);
        function URLSafeCoder2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        __name(URLSafeCoder2, "URLSafeCoder2");
        __name2(URLSafeCoder2, "URLSafeCoder");
        URLSafeCoder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
          result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
          return String.fromCharCode(result);
        };
        URLSafeCoder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
          result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        return URLSafeCoder2;
      }(Coder)
    );
    exports.URLSafeCoder = URLSafeCoder;
    var urlSafeCoder = new URLSafeCoder();
    function encodeURLSafe(data) {
      return urlSafeCoder.encode(data);
    }
    __name(encodeURLSafe, "encodeURLSafe");
    __name2(encodeURLSafe, "encodeURLSafe");
    exports.encodeURLSafe = encodeURLSafe;
    function decodeURLSafe(s) {
      return urlSafeCoder.decode(s);
    }
    __name(decodeURLSafe, "decodeURLSafe");
    __name2(decodeURLSafe, "decodeURLSafe");
    exports.decodeURLSafe = decodeURLSafe;
    exports.encodedLength = function(length) {
      return stdCoder.encodedLength(length);
    };
    exports.maxDecodedLength = function(length) {
      return stdCoder.maxDecodedLength(length);
    };
    exports.decodedLength = function(s) {
      return stdCoder.decodedLength(s);
    };
  }
});
var require_sha256 = __commonJS({
  "../node_modules/fast-sha256/sha256.js"(exports, module) {
    init_functionsRoutes_0_8534298748811979();
    (function(root, factory) {
      var exports2 = {};
      factory(exports2);
      var sha256 = exports2["default"];
      for (var k in exports2) {
        sha256[k] = exports2[k];
      }
      if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = sha256;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return sha256;
        });
      } else {
        root.sha256 = sha256;
      }
    })(exports, function(exports2) {
      "use strict";
      exports2.__esModule = true;
      exports2.digestLength = 32;
      exports2.blockSize = 64;
      var K = new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      function hashBlocks(w, v, p, pos, len) {
        var a, b, c, d, e, f, g, h, u, i, j, t1, t2;
        while (len >= 64) {
          a = v[0];
          b = v[1];
          c = v[2];
          d = v[3];
          e = v[4];
          f = v[5];
          g = v[6];
          h = v[7];
          for (i = 0; i < 16; i++) {
            j = pos + i * 4;
            w[i] = (p[j] & 255) << 24 | (p[j + 1] & 255) << 16 | (p[j + 2] & 255) << 8 | p[j + 3] & 255;
          }
          for (i = 16; i < 64; i++) {
            u = w[i - 2];
            t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
            u = w[i - 15];
            t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
          }
          for (i = 0; i < 64; i++) {
            t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
            t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
          }
          v[0] += a;
          v[1] += b;
          v[2] += c;
          v[3] += d;
          v[4] += e;
          v[5] += f;
          v[6] += g;
          v[7] += h;
          pos += 64;
          len -= 64;
        }
        return pos;
      }
      __name(hashBlocks, "hashBlocks");
      __name2(hashBlocks, "hashBlocks");
      var Hash = (
        /** @class */
        function() {
          function Hash2() {
            this.digestLength = exports2.digestLength;
            this.blockSize = exports2.blockSize;
            this.state = new Int32Array(8);
            this.temp = new Int32Array(64);
            this.buffer = new Uint8Array(128);
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            this.reset();
          }
          __name(Hash2, "Hash2");
          __name2(Hash2, "Hash");
          Hash2.prototype.reset = function() {
            this.state[0] = 1779033703;
            this.state[1] = 3144134277;
            this.state[2] = 1013904242;
            this.state[3] = 2773480762;
            this.state[4] = 1359893119;
            this.state[5] = 2600822924;
            this.state[6] = 528734635;
            this.state[7] = 1541459225;
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            return this;
          };
          Hash2.prototype.clean = function() {
            for (var i = 0; i < this.buffer.length; i++) {
              this.buffer[i] = 0;
            }
            for (var i = 0; i < this.temp.length; i++) {
              this.temp[i] = 0;
            }
            this.reset();
          };
          Hash2.prototype.update = function(data, dataLength) {
            if (dataLength === void 0) {
              dataLength = data.length;
            }
            if (this.finished) {
              throw new Error("SHA256: can't update because hash was finished.");
            }
            var dataPos = 0;
            this.bytesHashed += dataLength;
            if (this.bufferLength > 0) {
              while (this.bufferLength < 64 && dataLength > 0) {
                this.buffer[this.bufferLength++] = data[dataPos++];
                dataLength--;
              }
              if (this.bufferLength === 64) {
                hashBlocks(this.temp, this.state, this.buffer, 0, 64);
                this.bufferLength = 0;
              }
            }
            if (dataLength >= 64) {
              dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
              dataLength %= 64;
            }
            while (dataLength > 0) {
              this.buffer[this.bufferLength++] = data[dataPos++];
              dataLength--;
            }
            return this;
          };
          Hash2.prototype.finish = function(out) {
            if (!this.finished) {
              var bytesHashed = this.bytesHashed;
              var left = this.bufferLength;
              var bitLenHi = bytesHashed / 536870912 | 0;
              var bitLenLo = bytesHashed << 3;
              var padLength = bytesHashed % 64 < 56 ? 64 : 128;
              this.buffer[left] = 128;
              for (var i = left + 1; i < padLength - 8; i++) {
                this.buffer[i] = 0;
              }
              this.buffer[padLength - 8] = bitLenHi >>> 24 & 255;
              this.buffer[padLength - 7] = bitLenHi >>> 16 & 255;
              this.buffer[padLength - 6] = bitLenHi >>> 8 & 255;
              this.buffer[padLength - 5] = bitLenHi >>> 0 & 255;
              this.buffer[padLength - 4] = bitLenLo >>> 24 & 255;
              this.buffer[padLength - 3] = bitLenLo >>> 16 & 255;
              this.buffer[padLength - 2] = bitLenLo >>> 8 & 255;
              this.buffer[padLength - 1] = bitLenLo >>> 0 & 255;
              hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
              this.finished = true;
            }
            for (var i = 0; i < 8; i++) {
              out[i * 4 + 0] = this.state[i] >>> 24 & 255;
              out[i * 4 + 1] = this.state[i] >>> 16 & 255;
              out[i * 4 + 2] = this.state[i] >>> 8 & 255;
              out[i * 4 + 3] = this.state[i] >>> 0 & 255;
            }
            return this;
          };
          Hash2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          Hash2.prototype._saveState = function(out) {
            for (var i = 0; i < this.state.length; i++) {
              out[i] = this.state[i];
            }
          };
          Hash2.prototype._restoreState = function(from, bytesHashed) {
            for (var i = 0; i < this.state.length; i++) {
              this.state[i] = from[i];
            }
            this.bytesHashed = bytesHashed;
            this.finished = false;
            this.bufferLength = 0;
          };
          return Hash2;
        }()
      );
      exports2.Hash = Hash;
      var HMAC = (
        /** @class */
        function() {
          function HMAC2(key) {
            this.inner = new Hash();
            this.outer = new Hash();
            this.blockSize = this.inner.blockSize;
            this.digestLength = this.inner.digestLength;
            var pad = new Uint8Array(this.blockSize);
            if (key.length > this.blockSize) {
              new Hash().update(key).finish(pad).clean();
            } else {
              for (var i = 0; i < key.length; i++) {
                pad[i] = key[i];
              }
            }
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54;
            }
            this.inner.update(pad);
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54 ^ 92;
            }
            this.outer.update(pad);
            this.istate = new Uint32Array(8);
            this.ostate = new Uint32Array(8);
            this.inner._saveState(this.istate);
            this.outer._saveState(this.ostate);
            for (var i = 0; i < pad.length; i++) {
              pad[i] = 0;
            }
          }
          __name(HMAC2, "HMAC2");
          __name2(HMAC2, "HMAC");
          HMAC2.prototype.reset = function() {
            this.inner._restoreState(this.istate, this.inner.blockSize);
            this.outer._restoreState(this.ostate, this.outer.blockSize);
            return this;
          };
          HMAC2.prototype.clean = function() {
            for (var i = 0; i < this.istate.length; i++) {
              this.ostate[i] = this.istate[i] = 0;
            }
            this.inner.clean();
            this.outer.clean();
          };
          HMAC2.prototype.update = function(data) {
            this.inner.update(data);
            return this;
          };
          HMAC2.prototype.finish = function(out) {
            if (this.outer.finished) {
              this.outer.finish(out);
            } else {
              this.inner.finish(out);
              this.outer.update(out, this.digestLength).finish(out);
            }
            return this;
          };
          HMAC2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          return HMAC2;
        }()
      );
      exports2.HMAC = HMAC;
      function hash(data) {
        var h = new Hash().update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      __name(hash, "hash");
      __name2(hash, "hash");
      exports2.hash = hash;
      exports2["default"] = hash;
      function hmac(key, data) {
        var h = new HMAC(key).update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      __name(hmac, "hmac");
      __name2(hmac, "hmac");
      exports2.hmac = hmac;
      function fillBuffer(buffer, hmac2, info, counter) {
        var num = counter[0];
        if (num === 0) {
          throw new Error("hkdf: cannot expand more");
        }
        hmac2.reset();
        if (num > 1) {
          hmac2.update(buffer);
        }
        if (info) {
          hmac2.update(info);
        }
        hmac2.update(counter);
        hmac2.finish(buffer);
        counter[0]++;
      }
      __name(fillBuffer, "fillBuffer");
      __name2(fillBuffer, "fillBuffer");
      var hkdfSalt = new Uint8Array(exports2.digestLength);
      function hkdf(key, salt, info, length) {
        if (salt === void 0) {
          salt = hkdfSalt;
        }
        if (length === void 0) {
          length = 32;
        }
        var counter = new Uint8Array([1]);
        var okm = hmac(salt, key);
        var hmac_ = new HMAC(okm);
        var buffer = new Uint8Array(hmac_.digestLength);
        var bufpos = buffer.length;
        var out = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
          if (bufpos === buffer.length) {
            fillBuffer(buffer, hmac_, info, counter);
            bufpos = 0;
          }
          out[i] = buffer[bufpos++];
        }
        hmac_.clean();
        buffer.fill(0);
        counter.fill(0);
        return out;
      }
      __name(hkdf, "hkdf");
      __name2(hkdf, "hkdf");
      exports2.hkdf = hkdf;
      function pbkdf2(password, salt, iterations, dkLen) {
        var prf = new HMAC(password);
        var len = prf.digestLength;
        var ctr = new Uint8Array(4);
        var t = new Uint8Array(len);
        var u = new Uint8Array(len);
        var dk = new Uint8Array(dkLen);
        for (var i = 0; i * len < dkLen; i++) {
          var c = i + 1;
          ctr[0] = c >>> 24 & 255;
          ctr[1] = c >>> 16 & 255;
          ctr[2] = c >>> 8 & 255;
          ctr[3] = c >>> 0 & 255;
          prf.reset();
          prf.update(salt);
          prf.update(ctr);
          prf.finish(u);
          for (var j = 0; j < len; j++) {
            t[j] = u[j];
          }
          for (var j = 2; j <= iterations; j++) {
            prf.reset();
            prf.update(u).finish(u);
            for (var k = 0; k < len; k++) {
              t[k] ^= u[k];
            }
          }
          for (var j = 0; j < len && i * len + j < dkLen; j++) {
            dk[i * len + j] = t[j];
          }
        }
        for (var i = 0; i < len; i++) {
          t[i] = u[i] = 0;
        }
        for (var i = 0; i < 4; i++) {
          ctr[i] = 0;
        }
        prf.clean();
        return dk;
      }
      __name(pbkdf2, "pbkdf2");
      __name2(pbkdf2, "pbkdf2");
      exports2.pbkdf2 = pbkdf2;
    });
  }
});
var require_webhook = __commonJS({
  "../node_modules/svix/dist/webhook.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Webhook = exports.WebhookVerificationError = void 0;
    var timing_safe_equal_1 = require_timing_safe_equal();
    var base64 = require_base64();
    var sha256 = require_sha256();
    var WEBHOOK_TOLERANCE_IN_SECONDS = 5 * 60;
    var ExtendableError = class _ExtendableError extends Error {
      static {
        __name(this, "_ExtendableError");
      }
      static {
        __name2(this, "ExtendableError");
      }
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _ExtendableError.prototype);
        this.name = "ExtendableError";
        this.stack = new Error(message).stack;
      }
    };
    var WebhookVerificationError = class _WebhookVerificationError extends ExtendableError {
      static {
        __name(this, "_WebhookVerificationError");
      }
      static {
        __name2(this, "WebhookVerificationError");
      }
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, _WebhookVerificationError.prototype);
        this.name = "WebhookVerificationError";
      }
    };
    exports.WebhookVerificationError = WebhookVerificationError;
    var Webhook2 = class _Webhook {
      static {
        __name(this, "_Webhook");
      }
      static {
        __name2(this, "Webhook");
      }
      constructor(secret, options) {
        if (!secret) {
          throw new Error("Secret can't be empty.");
        }
        if ((options === null || options === void 0 ? void 0 : options.format) === "raw") {
          if (secret instanceof Uint8Array) {
            this.key = secret;
          } else {
            this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
          }
        } else {
          if (typeof secret !== "string") {
            throw new Error("Expected secret to be of type string");
          }
          if (secret.startsWith(_Webhook.prefix)) {
            secret = secret.substring(_Webhook.prefix.length);
          }
          this.key = base64.decode(secret);
        }
      }
      verify(payload, headers_) {
        const headers = {};
        for (const key of Object.keys(headers_)) {
          headers[key.toLowerCase()] = headers_[key];
        }
        let msgId = headers["svix-id"];
        let msgSignature = headers["svix-signature"];
        let msgTimestamp = headers["svix-timestamp"];
        if (!msgSignature || !msgId || !msgTimestamp) {
          msgId = headers["webhook-id"];
          msgSignature = headers["webhook-signature"];
          msgTimestamp = headers["webhook-timestamp"];
          if (!msgSignature || !msgId || !msgTimestamp) {
            throw new WebhookVerificationError("Missing required headers");
          }
        }
        const timestamp = this.verifyTimestamp(msgTimestamp);
        const computedSignature = this.sign(msgId, timestamp, payload);
        const expectedSignature = computedSignature.split(",")[1];
        const passedSignatures = msgSignature.split(" ");
        const encoder = new globalThis.TextEncoder();
        for (const versionedSignature of passedSignatures) {
          const [version2, signature] = versionedSignature.split(",");
          if (version2 !== "v1") {
            continue;
          }
          if ((0, timing_safe_equal_1.timingSafeEqual)(encoder.encode(signature), encoder.encode(expectedSignature))) {
            return JSON.parse(payload.toString());
          }
        }
        throw new WebhookVerificationError("No matching signature found");
      }
      sign(msgId, timestamp, payload) {
        if (typeof payload === "string") {
        } else if (payload.constructor.name === "Buffer") {
          payload = payload.toString();
        } else {
          throw new Error("Expected payload to be of type string or Buffer. Please refer to https://docs.svix.com/receiving/verifying-payloads/how for more information.");
        }
        const encoder = new TextEncoder();
        const timestampNumber = Math.floor(timestamp.getTime() / 1e3);
        const toSign = encoder.encode(`${msgId}.${timestampNumber}.${payload}`);
        const expectedSignature = base64.encode(sha256.hmac(this.key, toSign));
        return `v1,${expectedSignature}`;
      }
      verifyTimestamp(timestampHeader) {
        const now = Math.floor(Date.now() / 1e3);
        const timestamp = parseInt(timestampHeader, 10);
        if (isNaN(timestamp)) {
          throw new WebhookVerificationError("Invalid Signature Headers");
        }
        if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too old");
        }
        if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too new");
        }
        return new Date(timestamp * 1e3);
      }
    };
    exports.Webhook = Webhook2;
    Webhook2.prefix = "whsec_";
  }
});
var require_endpointDisabledTrigger = __commonJS({
  "../node_modules/svix/dist/models/endpointDisabledTrigger.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointDisabledTriggerSerializer = exports.EndpointDisabledTrigger = void 0;
    var EndpointDisabledTrigger;
    (function(EndpointDisabledTrigger2) {
      EndpointDisabledTrigger2["Manual"] = "manual";
      EndpointDisabledTrigger2["Automatic"] = "automatic";
    })(EndpointDisabledTrigger = exports.EndpointDisabledTrigger || (exports.EndpointDisabledTrigger = {}));
    exports.EndpointDisabledTriggerSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self) {
        return self;
      }
    };
  }
});
var require_ordering = __commonJS({
  "../node_modules/svix/dist/models/ordering.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrderingSerializer = exports.Ordering = void 0;
    var Ordering;
    (function(Ordering2) {
      Ordering2["Ascending"] = "ascending";
      Ordering2["Descending"] = "descending";
    })(Ordering = exports.Ordering || (exports.Ordering = {}));
    exports.OrderingSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self) {
        return self;
      }
    };
  }
});
var require_statusCodeClass = __commonJS({
  "../node_modules/svix/dist/models/statusCodeClass.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StatusCodeClassSerializer = exports.StatusCodeClass = void 0;
    var StatusCodeClass;
    (function(StatusCodeClass2) {
      StatusCodeClass2[StatusCodeClass2["CodeNone"] = 0] = "CodeNone";
      StatusCodeClass2[StatusCodeClass2["Code1xx"] = 100] = "Code1xx";
      StatusCodeClass2[StatusCodeClass2["Code2xx"] = 200] = "Code2xx";
      StatusCodeClass2[StatusCodeClass2["Code3xx"] = 300] = "Code3xx";
      StatusCodeClass2[StatusCodeClass2["Code4xx"] = 400] = "Code4xx";
      StatusCodeClass2[StatusCodeClass2["Code5xx"] = 500] = "Code5xx";
    })(StatusCodeClass = exports.StatusCodeClass || (exports.StatusCodeClass = {}));
    exports.StatusCodeClassSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self) {
        return self;
      }
    };
  }
});
var require_models = __commonJS({
  "../node_modules/svix/dist/models/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StatusCodeClass = exports.Ordering = exports.MessageStatusText = exports.MessageStatus = exports.MessageAttemptTriggerType = exports.EndpointDisabledTrigger = exports.ConnectorKind = exports.BackgroundTaskType = exports.BackgroundTaskStatus = exports.AppPortalCapability = void 0;
    var appPortalCapability_1 = require_appPortalCapability();
    Object.defineProperty(exports, "AppPortalCapability", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return appPortalCapability_1.AppPortalCapability;
    }, "get") });
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    Object.defineProperty(exports, "BackgroundTaskStatus", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return backgroundTaskStatus_1.BackgroundTaskStatus;
    }, "get") });
    var backgroundTaskType_1 = require_backgroundTaskType();
    Object.defineProperty(exports, "BackgroundTaskType", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return backgroundTaskType_1.BackgroundTaskType;
    }, "get") });
    var connectorKind_1 = require_connectorKind();
    Object.defineProperty(exports, "ConnectorKind", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return connectorKind_1.ConnectorKind;
    }, "get") });
    var endpointDisabledTrigger_1 = require_endpointDisabledTrigger();
    Object.defineProperty(exports, "EndpointDisabledTrigger", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return endpointDisabledTrigger_1.EndpointDisabledTrigger;
    }, "get") });
    var messageAttemptTriggerType_1 = require_messageAttemptTriggerType();
    Object.defineProperty(exports, "MessageAttemptTriggerType", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return messageAttemptTriggerType_1.MessageAttemptTriggerType;
    }, "get") });
    var messageStatus_1 = require_messageStatus();
    Object.defineProperty(exports, "MessageStatus", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return messageStatus_1.MessageStatus;
    }, "get") });
    var messageStatusText_1 = require_messageStatusText();
    Object.defineProperty(exports, "MessageStatusText", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return messageStatusText_1.MessageStatusText;
    }, "get") });
    var ordering_1 = require_ordering();
    Object.defineProperty(exports, "Ordering", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return ordering_1.Ordering;
    }, "get") });
    var statusCodeClass_1 = require_statusCodeClass();
    Object.defineProperty(exports, "StatusCodeClass", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return statusCodeClass_1.StatusCodeClass;
    }, "get") });
  }
});
var require_dist = __commonJS({
  "../node_modules/svix/dist/index.js"(exports) {
    "use strict";
    init_functionsRoutes_0_8534298748811979();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: /* @__PURE__ */ __name2(function() {
          return m[k];
        }, "get") };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Svix = exports.messageInRaw = exports.ValidationError = exports.HttpErrorOut = exports.HTTPValidationError = exports.ApiException = void 0;
    var application_1 = require_application();
    var authentication_1 = require_authentication();
    var backgroundTask_1 = require_backgroundTask();
    var endpoint_1 = require_endpoint();
    var environment_1 = require_environment();
    var eventType_1 = require_eventType();
    var health_1 = require_health();
    var ingest_1 = require_ingest();
    var integration_1 = require_integration();
    var message_1 = require_message();
    var messageAttempt_1 = require_messageAttempt();
    var operationalWebhook_1 = require_operationalWebhook();
    var statistics_1 = require_statistics();
    var operationalWebhookEndpoint_1 = require_operationalWebhookEndpoint();
    var util_1 = require_util();
    Object.defineProperty(exports, "ApiException", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return util_1.ApiException;
    }, "get") });
    var HttpErrors_1 = require_HttpErrors();
    Object.defineProperty(exports, "HTTPValidationError", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return HttpErrors_1.HTTPValidationError;
    }, "get") });
    Object.defineProperty(exports, "HttpErrorOut", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return HttpErrors_1.HttpErrorOut;
    }, "get") });
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return HttpErrors_1.ValidationError;
    }, "get") });
    __exportStar(require_webhook(), exports);
    __exportStar(require_models(), exports);
    var message_2 = require_message();
    Object.defineProperty(exports, "messageInRaw", { enumerable: true, get: /* @__PURE__ */ __name2(function() {
      return message_2.messageInRaw;
    }, "get") });
    var REGIONS = [
      { region: "us", url: "https://api.us.svix.com" },
      { region: "eu", url: "https://api.eu.svix.com" },
      { region: "in", url: "https://api.in.svix.com" },
      { region: "ca", url: "https://api.ca.svix.com" },
      { region: "au", url: "https://api.au.svix.com" }
    ];
    var Svix = class {
      static {
        __name(this, "Svix");
      }
      static {
        __name2(this, "Svix");
      }
      constructor(token, options = {}) {
        var _a, _b, _c;
        const regionalUrl = (_a = REGIONS.find((x) => x.region === token.split(".")[1])) === null || _a === void 0 ? void 0 : _a.url;
        const baseUrl2 = (_c = (_b = options.serverUrl) !== null && _b !== void 0 ? _b : regionalUrl) !== null && _c !== void 0 ? _c : "https://api.svix.com";
        if (options.retryScheduleInMs) {
          this.requestCtx = {
            baseUrl: baseUrl2,
            token,
            timeout: options.requestTimeout,
            retryScheduleInMs: options.retryScheduleInMs
          };
          return;
        }
        if (options.numRetries) {
          this.requestCtx = {
            baseUrl: baseUrl2,
            token,
            timeout: options.requestTimeout,
            numRetries: options.numRetries
          };
          return;
        }
        this.requestCtx = {
          baseUrl: baseUrl2,
          token,
          timeout: options.requestTimeout
        };
      }
      get application() {
        return new application_1.Application(this.requestCtx);
      }
      get authentication() {
        return new authentication_1.Authentication(this.requestCtx);
      }
      get backgroundTask() {
        return new backgroundTask_1.BackgroundTask(this.requestCtx);
      }
      get endpoint() {
        return new endpoint_1.Endpoint(this.requestCtx);
      }
      get environment() {
        return new environment_1.Environment(this.requestCtx);
      }
      get eventType() {
        return new eventType_1.EventType(this.requestCtx);
      }
      get health() {
        return new health_1.Health(this.requestCtx);
      }
      get ingest() {
        return new ingest_1.Ingest(this.requestCtx);
      }
      get integration() {
        return new integration_1.Integration(this.requestCtx);
      }
      get message() {
        return new message_1.Message(this.requestCtx);
      }
      get messageAttempt() {
        return new messageAttempt_1.MessageAttempt(this.requestCtx);
      }
      get operationalWebhook() {
        return new operationalWebhook_1.OperationalWebhook(this.requestCtx);
      }
      get statistics() {
        return new statistics_1.Statistics(this.requestCtx);
      }
      get operationalWebhookEndpoint() {
        return new operationalWebhookEndpoint_1.OperationalWebhookEndpoint(this.requestCtx);
      }
    };
    exports.Svix = Svix;
  }
});
function buildPaginationQuery(options) {
  const searchParams = new URLSearchParams();
  if (options.limit !== void 0) {
    searchParams.set("limit", options.limit.toString());
  }
  if ("after" in options && options.after !== void 0) {
    searchParams.set("after", options.after);
  }
  if ("before" in options && options.before !== void 0) {
    searchParams.set("before", options.before);
  }
  return searchParams.toString();
}
__name(buildPaginationQuery, "buildPaginationQuery");
function parseAttachments(attachments) {
  return attachments == null ? void 0 : attachments.map((attachment) => ({
    content: attachment.content,
    filename: attachment.filename,
    path: attachment.path,
    content_type: attachment.contentType,
    content_id: attachment.contentId
  }));
}
__name(parseAttachments, "parseAttachments");
function parseEmailToApiOptions(email) {
  return {
    attachments: parseAttachments(email.attachments),
    bcc: email.bcc,
    cc: email.cc,
    from: email.from,
    headers: email.headers,
    html: email.html,
    reply_to: email.replyTo,
    scheduled_at: email.scheduledAt,
    subject: email.subject,
    tags: email.tags,
    text: email.text,
    to: email.to,
    template: email.template ? {
      id: email.template.id,
      variables: email.template.variables
    } : void 0,
    topic_id: email.topicId
  };
}
__name(parseEmailToApiOptions, "parseEmailToApiOptions");
async function render(node) {
  let render2;
  try {
    ({ render: render2 } = await import("@react-email/render"));
  } catch (e) {
    throw new Error(
      "Failed to render React component. Make sure to install `@react-email/render` or `@react-email/components`."
    );
  }
  return render2(node);
}
__name(render, "render");
function parseContactPropertyFromApi(contactProperty) {
  return {
    id: contactProperty.id,
    key: contactProperty.key,
    createdAt: contactProperty.created_at,
    type: contactProperty.type,
    fallbackValue: contactProperty.fallback_value
  };
}
__name(parseContactPropertyFromApi, "parseContactPropertyFromApi");
function parseContactPropertyToApiOptions(contactProperty) {
  if ("key" in contactProperty) {
    return {
      key: contactProperty.key,
      type: contactProperty.type,
      fallback_value: contactProperty.fallbackValue
    };
  }
  return {
    fallback_value: contactProperty.fallbackValue
  };
}
__name(parseContactPropertyToApiOptions, "parseContactPropertyToApiOptions");
function parseDomainToApiOptions(domain) {
  return {
    name: domain.name,
    region: domain.region,
    custom_return_path: domain.customReturnPath
  };
}
__name(parseDomainToApiOptions, "parseDomainToApiOptions");
function getPaginationQueryProperties(options = {}) {
  const query = new URLSearchParams();
  if (options.before) query.set("before", options.before);
  if (options.after) query.set("after", options.after);
  if (options.limit) query.set("limit", options.limit.toString());
  return query.size > 0 ? `?${query.toString()}` : "";
}
__name(getPaginationQueryProperties, "getPaginationQueryProperties");
function parseVariables(variables) {
  return variables == null ? void 0 : variables.map((variable) => ({
    key: variable.key,
    type: variable.type,
    fallback_value: variable.fallbackValue
  }));
}
__name(parseVariables, "parseVariables");
function parseTemplateToApiOptions(template) {
  return {
    name: "name" in template ? template.name : void 0,
    subject: template.subject,
    html: template.html,
    text: template.text,
    alias: template.alias,
    from: template.from,
    reply_to: template.replyTo,
    variables: parseVariables(template.variables)
  };
}
__name(parseTemplateToApiOptions, "parseTemplateToApiOptions");
var import_svix;
var __defProp22;
var __defProps;
var __getOwnPropDescs;
var __getOwnPropSymbols;
var __hasOwnProp2;
var __propIsEnum;
var __defNormalProp;
var __spreadValues;
var __spreadProps;
var __objRest;
var version;
var ApiKeys;
var Batch;
var Broadcasts;
var ContactProperties;
var ContactSegments;
var ContactTopics;
var Contacts;
var Domains;
var Attachments;
var Attachments2;
var Receiving;
var Emails;
var Segments;
var ChainableTemplateResult;
var Templates;
var Topics;
var Webhooks;
var defaultBaseUrl;
var defaultUserAgent;
var baseUrl;
var userAgent;
var Resend;
var init_dist = __esm({
  "../node_modules/resend/dist/index.mjs"() {
    init_functionsRoutes_0_8534298748811979();
    import_svix = __toESM(require_dist(), 1);
    __defProp22 = Object.defineProperty;
    __defProps = Object.defineProperties;
    __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    __getOwnPropSymbols = Object.getOwnPropertySymbols;
    __hasOwnProp2 = Object.prototype.hasOwnProperty;
    __propIsEnum = Object.prototype.propertyIsEnumerable;
    __defNormalProp = /* @__PURE__ */ __name2((obj, key, value) => key in obj ? __defProp22(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
    __spreadValues = /* @__PURE__ */ __name2((a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp2.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
          if (__propIsEnum.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        }
      return a;
    }, "__spreadValues");
    __spreadProps = /* @__PURE__ */ __name2((a, b) => __defProps(a, __getOwnPropDescs(b)), "__spreadProps");
    __objRest = /* @__PURE__ */ __name2((source, exclude) => {
      var target = {};
      for (var prop in source)
        if (__hasOwnProp2.call(source, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source[prop];
      if (source != null && __getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(source)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
            target[prop] = source[prop];
        }
      return target;
    }, "__objRest");
    version = "6.4.1";
    __name2(buildPaginationQuery, "buildPaginationQuery");
    ApiKeys = class {
      static {
        __name(this, "ApiKeys");
      }
      static {
        __name2(this, "ApiKeys");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        const data = await this.resend.post(
          "/api-keys",
          payload,
          options
        );
        return data;
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/api-keys?${queryString}` : "/api-keys";
        const data = await this.resend.get(url);
        return data;
      }
      async remove(id) {
        const data = await this.resend.delete(
          `/api-keys/${id}`
        );
        return data;
      }
    };
    __name2(parseAttachments, "parseAttachments");
    __name2(parseEmailToApiOptions, "parseEmailToApiOptions");
    __name2(render, "render");
    Batch = class {
      static {
        __name(this, "Batch");
      }
      static {
        __name2(this, "Batch");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async send(payload, options) {
        return this.create(payload, options);
      }
      async create(payload, options) {
        var _a;
        const emails = [];
        for (const email of payload) {
          if (email.react) {
            email.html = await render(email.react);
            email.react = void 0;
          }
          emails.push(parseEmailToApiOptions(email));
        }
        const data = await this.resend.post(
          "/emails/batch",
          emails,
          __spreadProps(__spreadValues({}, options), {
            headers: __spreadValues({
              "x-batch-validation": (_a = options == null ? void 0 : options.batchValidation) != null ? _a : "strict"
            }, options == null ? void 0 : options.headers)
          })
        );
        return data;
      }
    };
    Broadcasts = class {
      static {
        __name(this, "Broadcasts");
      }
      static {
        __name2(this, "Broadcasts");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        if (payload.react) {
          payload.html = await render(payload.react);
        }
        const data = await this.resend.post(
          "/broadcasts",
          {
            name: payload.name,
            segment_id: payload.segmentId,
            audience_id: payload.audienceId,
            preview_text: payload.previewText,
            from: payload.from,
            html: payload.html,
            reply_to: payload.replyTo,
            subject: payload.subject,
            text: payload.text,
            topic_id: payload.topicId
          },
          options
        );
        return data;
      }
      async send(id, payload) {
        const data = await this.resend.post(
          `/broadcasts/${id}/send`,
          { scheduled_at: payload == null ? void 0 : payload.scheduledAt }
        );
        return data;
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/broadcasts?${queryString}` : "/broadcasts";
        const data = await this.resend.get(url);
        return data;
      }
      async get(id) {
        const data = await this.resend.get(
          `/broadcasts/${id}`
        );
        return data;
      }
      async remove(id) {
        const data = await this.resend.delete(
          `/broadcasts/${id}`
        );
        return data;
      }
      async update(id, payload) {
        if (payload.react) {
          payload.html = await render(payload.react);
        }
        const data = await this.resend.patch(
          `/broadcasts/${id}`,
          {
            name: payload.name,
            segment_id: payload.segmentId,
            audience_id: payload.audienceId,
            from: payload.from,
            html: payload.html,
            text: payload.text,
            subject: payload.subject,
            reply_to: payload.replyTo,
            preview_text: payload.previewText,
            topic_id: payload.topicId
          }
        );
        return data;
      }
    };
    __name2(parseContactPropertyFromApi, "parseContactPropertyFromApi");
    __name2(parseContactPropertyToApiOptions, "parseContactPropertyToApiOptions");
    ContactProperties = class {
      static {
        __name(this, "ContactProperties");
      }
      static {
        __name2(this, "ContactProperties");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async create(options) {
        const apiOptions = parseContactPropertyToApiOptions(options);
        const data = await this.resend.post(
          "/contact-properties",
          apiOptions
        );
        return data;
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/contact-properties?${queryString}` : "/contact-properties";
        const response = await this.resend.get(url);
        if (response.data) {
          return {
            data: __spreadProps(__spreadValues({}, response.data), {
              data: response.data.data.map(
                (apiContactProperty) => parseContactPropertyFromApi(apiContactProperty)
              )
            }),
            headers: response.headers,
            error: null
          };
        }
        return response;
      }
      async get(id) {
        if (!id) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const response = await this.resend.get(
          `/contact-properties/${id}`
        );
        if (response.data) {
          return {
            data: __spreadValues({
              object: "contact_property"
            }, parseContactPropertyFromApi(response.data)),
            headers: response.headers,
            error: null
          };
        }
        return response;
      }
      async update(payload) {
        if (!payload.id) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const apiOptions = parseContactPropertyToApiOptions(payload);
        const data = await this.resend.patch(
          `/contact-properties/${payload.id}`,
          apiOptions
        );
        return data;
      }
      async remove(id) {
        if (!id) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const data = await this.resend.delete(
          `/contact-properties/${id}`
        );
        return data;
      }
    };
    ContactSegments = class {
      static {
        __name(this, "ContactSegments");
      }
      static {
        __name2(this, "ContactSegments");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async list(options) {
        if (!options.contactId && !options.email) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` or `email` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const identifier = options.email ? options.email : options.contactId;
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/contacts/${identifier}/segments?${queryString}` : `/contacts/${identifier}/segments`;
        const data = await this.resend.get(url);
        return data;
      }
      async add(options) {
        if (!options.contactId && !options.email) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` or `email` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const identifier = options.email ? options.email : options.contactId;
        return this.resend.post(
          `/contacts/${identifier}/segments/${options.segmentId}`
        );
      }
      async remove(options) {
        if (!options.contactId && !options.email) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` or `email` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const identifier = options.email ? options.email : options.contactId;
        return this.resend.delete(
          `/contacts/${identifier}/segments/${options.segmentId}`
        );
      }
    };
    ContactTopics = class {
      static {
        __name(this, "ContactTopics");
      }
      static {
        __name2(this, "ContactTopics");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async update(payload) {
        if (!payload.id && !payload.email) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` or `email` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const identifier = payload.email ? payload.email : payload.id;
        return this.resend.patch(
          `/contacts/${identifier}/topics`,
          payload.topics
        );
      }
      async list(options) {
        if (!options.id && !options.email) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` or `email` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const identifier = options.email ? options.email : options.id;
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/contacts/${identifier}/topics?${queryString}` : `/contacts/${identifier}/topics`;
        return this.resend.get(url);
      }
    };
    Contacts = class {
      static {
        __name(this, "Contacts");
      }
      static {
        __name2(this, "Contacts");
      }
      constructor(resend) {
        this.resend = resend;
        this.topics = new ContactTopics(this.resend);
        this.segments = new ContactSegments(this.resend);
      }
      async create(payload, options = {}) {
        if (!payload.audienceId) {
          const data2 = await this.resend.post(
            "/contacts",
            {
              unsubscribed: payload.unsubscribed,
              email: payload.email,
              first_name: payload.firstName,
              last_name: payload.lastName,
              properties: payload.properties
            },
            options
          );
          return data2;
        }
        const data = await this.resend.post(
          `/audiences/${payload.audienceId}/contacts`,
          {
            unsubscribed: payload.unsubscribed,
            email: payload.email,
            first_name: payload.firstName,
            last_name: payload.lastName,
            properties: payload.properties
          },
          options
        );
        return data;
      }
      async list(options = {}) {
        if (!("audienceId" in options) || options.audienceId === void 0) {
          const queryString2 = buildPaginationQuery(options);
          const url2 = queryString2 ? `/contacts?${queryString2}` : "/contacts";
          const data2 = await this.resend.get(url2);
          return data2;
        }
        const _a = options, { audienceId } = _a, paginationOptions = __objRest(_a, ["audienceId"]);
        const queryString = buildPaginationQuery(paginationOptions);
        const url = queryString ? `/audiences/${audienceId}/contacts?${queryString}` : `/audiences/${audienceId}/contacts`;
        const data = await this.resend.get(url);
        return data;
      }
      async get(options) {
        if (typeof options === "string") {
          return this.resend.get(`/contacts/${options}`);
        }
        if (!options.id && !options.email) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` or `email` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        if (!options.audienceId) {
          return this.resend.get(
            `/contacts/${(options == null ? void 0 : options.email) ? options == null ? void 0 : options.email : options == null ? void 0 : options.id}`
          );
        }
        return this.resend.get(
          `/audiences/${options.audienceId}/contacts/${(options == null ? void 0 : options.email) ? options == null ? void 0 : options.email : options == null ? void 0 : options.id}`
        );
      }
      async update(options) {
        if (!options.id && !options.email) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` or `email` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        if (!options.audienceId) {
          const data2 = await this.resend.patch(
            `/contacts/${(options == null ? void 0 : options.email) ? options == null ? void 0 : options.email : options == null ? void 0 : options.id}`,
            {
              unsubscribed: options.unsubscribed,
              first_name: options.firstName,
              last_name: options.lastName,
              properties: options.properties
            }
          );
          return data2;
        }
        const data = await this.resend.patch(
          `/audiences/${options.audienceId}/contacts/${(options == null ? void 0 : options.email) ? options == null ? void 0 : options.email : options == null ? void 0 : options.id}`,
          {
            unsubscribed: options.unsubscribed,
            first_name: options.firstName,
            last_name: options.lastName,
            properties: options.properties
          }
        );
        return data;
      }
      async remove(payload) {
        if (typeof payload === "string") {
          return this.resend.delete(
            `/contacts/${payload}`
          );
        }
        if (!payload.id && !payload.email) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` or `email` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        if (!payload.audienceId) {
          return this.resend.delete(
            `/contacts/${(payload == null ? void 0 : payload.email) ? payload == null ? void 0 : payload.email : payload == null ? void 0 : payload.id}`
          );
        }
        return this.resend.delete(
          `/audiences/${payload.audienceId}/contacts/${(payload == null ? void 0 : payload.email) ? payload == null ? void 0 : payload.email : payload == null ? void 0 : payload.id}`
        );
      }
    };
    __name2(parseDomainToApiOptions, "parseDomainToApiOptions");
    Domains = class {
      static {
        __name(this, "Domains");
      }
      static {
        __name2(this, "Domains");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        const data = await this.resend.post(
          "/domains",
          parseDomainToApiOptions(payload),
          options
        );
        return data;
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/domains?${queryString}` : "/domains";
        const data = await this.resend.get(url);
        return data;
      }
      async get(id) {
        const data = await this.resend.get(
          `/domains/${id}`
        );
        return data;
      }
      async update(payload) {
        const data = await this.resend.patch(
          `/domains/${payload.id}`,
          {
            click_tracking: payload.clickTracking,
            open_tracking: payload.openTracking,
            tls: payload.tls
          }
        );
        return data;
      }
      async remove(id) {
        const data = await this.resend.delete(
          `/domains/${id}`
        );
        return data;
      }
      async verify(id) {
        const data = await this.resend.post(
          `/domains/${id}/verify`
        );
        return data;
      }
    };
    Attachments = class {
      static {
        __name(this, "Attachments");
      }
      static {
        __name2(this, "Attachments");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async get(options) {
        const { emailId, id } = options;
        const data = await this.resend.get(
          `/emails/${emailId}/attachments/${id}`
        );
        return data;
      }
      async list(options) {
        const { emailId } = options;
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/emails/${emailId}/attachments?${queryString}` : `/emails/${emailId}/attachments`;
        const data = await this.resend.get(url);
        return data;
      }
    };
    Attachments2 = class {
      static {
        __name(this, "Attachments2");
      }
      static {
        __name2(this, "Attachments2");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async get(options) {
        const { emailId, id } = options;
        const data = await this.resend.get(
          `/emails/receiving/${emailId}/attachments/${id}`
        );
        return data;
      }
      async list(options) {
        const { emailId } = options;
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/emails/receiving/${emailId}/attachments?${queryString}` : `/emails/receiving/${emailId}/attachments`;
        const data = await this.resend.get(url);
        return data;
      }
    };
    Receiving = class {
      static {
        __name(this, "Receiving");
      }
      static {
        __name2(this, "Receiving");
      }
      constructor(resend) {
        this.resend = resend;
        this.attachments = new Attachments2(resend);
      }
      async get(id) {
        const data = await this.resend.get(
          `/emails/receiving/${id}`
        );
        return data;
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/emails/receiving?${queryString}` : "/emails/receiving";
        const data = await this.resend.get(url);
        return data;
      }
    };
    Emails = class {
      static {
        __name(this, "Emails");
      }
      static {
        __name2(this, "Emails");
      }
      constructor(resend) {
        this.resend = resend;
        this.attachments = new Attachments(resend);
        this.receiving = new Receiving(resend);
      }
      async send(payload, options = {}) {
        return this.create(payload, options);
      }
      async create(payload, options = {}) {
        if (payload.react) {
          payload.html = await render(payload.react);
        }
        const data = await this.resend.post(
          "/emails",
          parseEmailToApiOptions(payload),
          options
        );
        return data;
      }
      async get(id) {
        const data = await this.resend.get(
          `/emails/${id}`
        );
        return data;
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/emails?${queryString}` : "/emails";
        const data = await this.resend.get(url);
        return data;
      }
      async update(payload) {
        const data = await this.resend.patch(
          `/emails/${payload.id}`,
          {
            scheduled_at: payload.scheduledAt
          }
        );
        return data;
      }
      async cancel(id) {
        const data = await this.resend.post(
          `/emails/${id}/cancel`
        );
        return data;
      }
    };
    Segments = class {
      static {
        __name(this, "Segments");
      }
      static {
        __name2(this, "Segments");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        const data = await this.resend.post(
          "/segments",
          payload,
          options
        );
        return data;
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/segments?${queryString}` : "/segments";
        const data = await this.resend.get(url);
        return data;
      }
      async get(id) {
        const data = await this.resend.get(
          `/segments/${id}`
        );
        return data;
      }
      async remove(id) {
        const data = await this.resend.delete(
          `/segments/${id}`
        );
        return data;
      }
    };
    __name2(getPaginationQueryProperties, "getPaginationQueryProperties");
    __name2(parseVariables, "parseVariables");
    __name2(parseTemplateToApiOptions, "parseTemplateToApiOptions");
    ChainableTemplateResult = class {
      static {
        __name(this, "ChainableTemplateResult");
      }
      static {
        __name2(this, "ChainableTemplateResult");
      }
      constructor(promise, publishFn) {
        this.promise = promise;
        this.publishFn = publishFn;
      }
      // If user calls `then` or only awaits for the result of create() or duplicate(), the behavior should be
      // exactly as if they called create() or duplicate() directly. This will act as a normal promise
      // biome-ignore lint/suspicious/noThenProperty: This class intentionally implements PromiseLike
      then(onfulfilled, onrejected) {
        return this.promise.then(onfulfilled, onrejected);
      }
      async publish() {
        const { data, error } = await this.promise;
        if (error) {
          return {
            data: null,
            headers: null,
            error
          };
        }
        return this.publishFn(data.id);
      }
    };
    Templates = class {
      static {
        __name(this, "Templates");
      }
      static {
        __name2(this, "Templates");
      }
      constructor(resend) {
        this.resend = resend;
      }
      create(payload) {
        const createPromise = this.performCreate(payload);
        return new ChainableTemplateResult(createPromise, this.publish.bind(this));
      }
      // This creation process is being done separately from the public create so that
      // the user can chain the publish operation after the create operation. Otherwise, due
      // to the async nature of the renderAsync, the return type would be
      // Promise<ChainableTemplateResult<CreateTemplateResponse>> which wouldn't be chainable.
      async performCreate(payload) {
        if (payload.react) {
          if (!this.renderAsync) {
            try {
              const { renderAsync } = await import("@react-email/render");
              this.renderAsync = renderAsync;
            } catch (e) {
              throw new Error(
                "Failed to render React component. Make sure to install `@react-email/render`"
              );
            }
          }
          payload.html = await this.renderAsync(
            payload.react
          );
        }
        return this.resend.post(
          "/templates",
          parseTemplateToApiOptions(payload)
        );
      }
      async remove(identifier) {
        const data = await this.resend.delete(
          `/templates/${identifier}`
        );
        return data;
      }
      async get(identifier) {
        const data = await this.resend.get(
          `/templates/${identifier}`
        );
        return data;
      }
      async list(options = {}) {
        return this.resend.get(
          `/templates${getPaginationQueryProperties(options)}`
        );
      }
      duplicate(identifier) {
        const promiseDuplicate = this.resend.post(
          `/templates/${identifier}/duplicate`
        );
        return new ChainableTemplateResult(
          promiseDuplicate,
          this.publish.bind(this)
        );
      }
      async publish(identifier) {
        const data = await this.resend.post(
          `/templates/${identifier}/publish`
        );
        return data;
      }
      async update(identifier, payload) {
        const data = await this.resend.patch(
          `/templates/${identifier}`,
          parseTemplateToApiOptions(payload)
        );
        return data;
      }
    };
    Topics = class {
      static {
        __name(this, "Topics");
      }
      static {
        __name2(this, "Topics");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload) {
        const _a = payload, { defaultSubscription } = _a, body = __objRest(_a, ["defaultSubscription"]);
        const data = await this.resend.post("/topics", __spreadProps(__spreadValues({}, body), {
          default_subscription: defaultSubscription
        }));
        return data;
      }
      async list() {
        const data = await this.resend.get("/topics");
        return data;
      }
      async get(id) {
        if (!id) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const data = await this.resend.get(
          `/topics/${id}`
        );
        return data;
      }
      async update(payload) {
        if (!payload.id) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const data = await this.resend.patch(
          `/topics/${payload.id}`,
          payload
        );
        return data;
      }
      async remove(id) {
        if (!id) {
          return {
            data: null,
            headers: null,
            error: {
              message: "Missing `id` field.",
              statusCode: null,
              name: "missing_required_field"
            }
          };
        }
        const data = await this.resend.delete(
          `/topics/${id}`
        );
        return data;
      }
    };
    Webhooks = class {
      static {
        __name(this, "Webhooks");
      }
      static {
        __name2(this, "Webhooks");
      }
      constructor(resend) {
        this.resend = resend;
      }
      async create(payload, options = {}) {
        const data = await this.resend.post(
          "/webhooks",
          payload,
          options
        );
        return data;
      }
      async get(id) {
        const data = await this.resend.get(
          `/webhooks/${id}`
        );
        return data;
      }
      async list(options = {}) {
        const queryString = buildPaginationQuery(options);
        const url = queryString ? `/webhooks?${queryString}` : "/webhooks";
        const data = await this.resend.get(url);
        return data;
      }
      async update(id, payload) {
        const data = await this.resend.patch(
          `/webhooks/${id}`,
          payload
        );
        return data;
      }
      async remove(id) {
        const data = await this.resend.delete(
          `/webhooks/${id}`
        );
        return data;
      }
      verify(payload) {
        const webhook = new import_svix.Webhook(payload.webhookSecret);
        return webhook.verify(payload.payload, {
          "svix-id": payload.headers.id,
          "svix-timestamp": payload.headers.timestamp,
          "svix-signature": payload.headers.signature
        });
      }
    };
    defaultBaseUrl = "https://api.resend.com";
    defaultUserAgent = `resend-node:${version}`;
    baseUrl = typeof process !== "undefined" && process.env ? process.env.RESEND_BASE_URL || defaultBaseUrl : defaultBaseUrl;
    userAgent = typeof process !== "undefined" && process.env ? process.env.RESEND_USER_AGENT || defaultUserAgent : defaultUserAgent;
    Resend = class {
      static {
        __name(this, "Resend");
      }
      static {
        __name2(this, "Resend");
      }
      constructor(key) {
        this.key = key;
        this.apiKeys = new ApiKeys(this);
        this.segments = new Segments(this);
        this.audiences = this.segments;
        this.batch = new Batch(this);
        this.broadcasts = new Broadcasts(this);
        this.contacts = new Contacts(this);
        this.contactProperties = new ContactProperties(this);
        this.domains = new Domains(this);
        this.emails = new Emails(this);
        this.webhooks = new Webhooks(this);
        this.templates = new Templates(this);
        this.topics = new Topics(this);
        if (!key) {
          if (typeof process !== "undefined" && process.env) {
            this.key = process.env.RESEND_API_KEY;
          }
          if (!this.key) {
            throw new Error(
              'Missing API key. Pass it to the constructor `new Resend("re_123")`'
            );
          }
        }
        this.headers = new Headers({
          Authorization: `Bearer ${this.key}`,
          "User-Agent": userAgent,
          "Content-Type": "application/json"
        });
      }
      async fetchRequest(path, options = {}) {
        try {
          const response = await fetch(`${baseUrl}${path}`, options);
          if (!response.ok) {
            try {
              const rawError = await response.text();
              return {
                data: null,
                error: JSON.parse(rawError),
                headers: Object.fromEntries(response.headers.entries())
              };
            } catch (err) {
              if (err instanceof SyntaxError) {
                return {
                  data: null,
                  error: {
                    name: "application_error",
                    statusCode: response.status,
                    message: "Internal server error. We are unable to process your request right now, please try again later."
                  },
                  headers: Object.fromEntries(response.headers.entries())
                };
              }
              const error = {
                message: response.statusText,
                statusCode: response.status,
                name: "application_error"
              };
              if (err instanceof Error) {
                return {
                  data: null,
                  error: __spreadProps(__spreadValues({}, error), { message: err.message }),
                  headers: Object.fromEntries(response.headers.entries())
                };
              }
              return {
                data: null,
                error,
                headers: Object.fromEntries(response.headers.entries())
              };
            }
          }
          const data = await response.json();
          return {
            data,
            error: null,
            headers: Object.fromEntries(response.headers.entries())
          };
        } catch (e) {
          return {
            data: null,
            error: {
              name: "application_error",
              statusCode: null,
              message: "Unable to fetch data. The request could not be resolved."
            },
            headers: null
          };
        }
      }
      async post(path, entity, options = {}) {
        const headers = new Headers(this.headers);
        if (options.headers) {
          for (const [key, value] of new Headers(options.headers).entries()) {
            headers.set(key, value);
          }
        }
        if (options.idempotencyKey) {
          headers.set("Idempotency-Key", options.idempotencyKey);
        }
        const requestOptions = __spreadProps(__spreadValues({
          method: "POST",
          body: JSON.stringify(entity)
        }, options), {
          headers
        });
        return this.fetchRequest(path, requestOptions);
      }
      async get(path, options = {}) {
        const headers = new Headers(this.headers);
        if (options.headers) {
          for (const [key, value] of new Headers(options.headers).entries()) {
            headers.set(key, value);
          }
        }
        const requestOptions = __spreadProps(__spreadValues({
          method: "GET"
        }, options), {
          headers
        });
        return this.fetchRequest(path, requestOptions);
      }
      async put(path, entity, options = {}) {
        const headers = new Headers(this.headers);
        if (options.headers) {
          for (const [key, value] of new Headers(options.headers).entries()) {
            headers.set(key, value);
          }
        }
        const requestOptions = __spreadProps(__spreadValues({
          method: "PUT",
          body: JSON.stringify(entity)
        }, options), {
          headers
        });
        return this.fetchRequest(path, requestOptions);
      }
      async patch(path, entity, options = {}) {
        const headers = new Headers(this.headers);
        if (options.headers) {
          for (const [key, value] of new Headers(options.headers).entries()) {
            headers.set(key, value);
          }
        }
        const requestOptions = __spreadProps(__spreadValues({
          method: "PATCH",
          body: JSON.stringify(entity)
        }, options), {
          headers
        });
        return this.fetchRequest(path, requestOptions);
      }
      async delete(path, query) {
        const requestOptions = {
          method: "DELETE",
          body: JSON.stringify(query),
          headers: this.headers
        };
        return this.fetchRequest(path, requestOptions);
      }
    };
  }
});
function ok(json) {
  return new Response(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
__name(ok, "ok");
function bad(status, msg) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
__name(bad, "bad");
function codigoCotizacion() {
  const u = crypto.randomUUID().slice(-6).toUpperCase();
  return `COT-${u}`;
}
__name(codigoCotizacion, "codigoCotizacion");
function emailHTML({ codigo, cliente, resumen, dominioBase }) {
  const logo = `${dominioBase}images/logo_tct.png`;
  const filas = resumen.detalle.map(
    (d) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee">${d.nombre} (${d.unidad})</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${d.cantidad}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">B/. ${d.precio_unit.toFixed(2)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">B/. ${d.subtotal.toFixed(2)}</td>
      </tr>`
  ).join("");
  const urlResumen = `${dominioBase}#/cotizador/resumen?codigo=${encodeURIComponent(codigo)}`;
  const correoEmpresa = "contacto@tctservices-pty.com";
  const numeroWhatsapp = "50761163672";
  const enlaceWhatsapp = `https://wa.me/${numeroWhatsapp}?text=Hola,%20he%20recibido%20mi%20cotizaci\xF3n%20(${codigo})%20y%20quisiera%20m\xE1s%20informaci\xF3n.`;
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <!-- Encabezado -->
    <div style="background:#0D3B66;padding:16px 20px;color:#fff;display:flex;align-items:center;gap:12px">
      <img src="${logo}" alt="TCT Services" height="36" style="display:block"/>
      <div style="font-weight:700;font-size:18px">Confirmaci\xF3n de cotizaci\xF3n \u2014 ${codigo}</div>
    </div>

    <!-- Cuerpo -->
    <div style="padding:20px;background:#fff">
      <p style="margin:0 0 8px 0"><b>Cliente:</b> ${cliente.nombre}</p>
      <p style="margin:0 0 8px 0"><b>Correo:</b> ${cliente.email} \xB7 ${cliente.telefono || "N/D"}</p>
      <p style="margin:0 0 16px 0"><b>Ubicaci\xF3n:</b> ${cliente.ubicacion || "N/D"} \xB7 <b>Tipo:</b> ${cliente.tipo || "N/D"}</p>

      <!-- Tabla -->
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px;border-bottom:2px solid #0D3B66">Servicio</th>
            <th style="text-align:right;padding:8px;border-bottom:2px solid #0D3B66">Cant.</th>
            <th style="text-align:right;padding:8px;border-bottom:2px solid #0D3B66">Precio</th>
            <th style="text-align:right;padding:8px;border-bottom:2px solid #0D3B66">Subtotal</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding:8px;text-align:right"><b>Subtotal</b></td>
            <td style="padding:8px;text-align:right"><b>B/. ${resumen.subtotal.toFixed(2)}</b></td>
          </tr>
          <tr>
            <td colspan="3" style="padding:8px;text-align:right">ITBMS 7%</td>
            <td style="padding:8px;text-align:right">B/. ${resumen.itbms.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3" style="padding:8px;text-align:right;font-size:16px"><b>Total</b></td>
            <td style="padding:8px;text-align:right;font-size:16px"><b>B/. ${resumen.total.toFixed(2)}</b></td>
          </tr>
        </tfoot>
      </table>

      <!-- Nota -->
      <p style="margin:16px 0 0 0;font-size:12px;color:#6b7280">
        Este monto representa un valor aproximado sujeto a revisi\xF3n t\xE9cnica. 
        Para una cotizaci\xF3n definitiva, agenda una visita o cont\xE1ctanos.
      </p>

      <!-- Botones -->
      <div style="margin-top:24px;display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
        <a href="${urlResumen}" 
           style="display:inline-block;background:#0D3B66;color:#fff;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:600">
          Ver resumen y agendar cita
        </a>
        <a href="mailto:${correoEmpresa}?subject=Cotizaci\xF3n%20${codigo}&body=Hola,%20he%20recibido%20mi%20cotizaci\xF3n%20y%20quisiera%20contactarles."
           style="display:inline-block;background:#C1121F;color:#fff;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:600">
          Contactar por correo
        </a>
        <a href="${enlaceWhatsapp}" 
           style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:10px 16px;border-radius:10px;font-weight:600">
          Contactar por WhatsApp
        </a>
      </div>

      <div style="margin-top:20px;text-align:center;font-size:12px;color:#6b7280">
        \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} TCT Services \u2014 Panam\xE1
      </div>
    </div>
  </div>
  `;
}
__name(emailHTML, "emailHTML");
async function onRequestOptions() {
  return ok({});
}
__name(onRequestOptions, "onRequestOptions");
async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const codigo = url.searchParams.get("codigo");
    const catalogoPublic = url.searchParams.get("catalogo") === "public";
    if (catalogoPublic) {
      return ok({ items: publicoSinPrecios() });
    }
    if (!codigo) return bad(400, "Falta par\xE1metro 'codigo'");
    const cab = await env.DB.prepare(
      "SELECT * FROM cotizaciones WHERE codigo = ?"
    ).bind(codigo).first();
    if (!cab) return bad(404, "No encontrada");
    const det = await env.DB.prepare(
      "SELECT item_id, nombre, unidad, cantidad, precio_unit, subtotal, categoria FROM cotizacion_items WHERE cotizacion_id = ? ORDER BY rowid ASC"
    ).bind(cab.id).all();
    return ok({
      codigo: cab.codigo,
      fecha: cab.created_at,
      cliente: {
        nombre: cab.cliente_nombre,
        email: cab.email,
        telefono: cab.telefono,
        ubicacion: cab.ubicacion,
        tipo: cab.tipo,
        mensaje: cab.mensaje
      },
      resumen: {
        subtotal: cab.subtotal,
        itbms: cab.itbms,
        total: cab.total,
        detalle: det.results || []
      }
    });
  } catch (e) {
    console.error(e);
    return bad(500, "Error al leer la cotizaci\xF3n");
  }
}
__name(onRequestGet, "onRequestGet");
async function onRequestPost2({ request, env }) {
  try {
    const body = await request.json();
    const { cliente, items } = body || {};
    if (!cliente?.nombre || !cliente?.email || !Array.isArray(items) || items.length === 0) {
      return bad(400, "Datos incompletos");
    }
    const resumen = calcular(items);
    if (resumen.detalle.length === 0) return bad(400, "No hay \xEDtems v\xE1lidos");
    const codigo = codigoCotizacion();
    const id = crypto.randomUUID();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await env.DB.prepare(
      `INSERT INTO cotizaciones
       (id, codigo, created_at, cliente_nombre, email, telefono, ubicacion, tipo, mensaje, subtotal, itbms, total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      codigo,
      now,
      cliente.nombre,
      cliente.email,
      cliente.telefono || "",
      cliente.ubicacion || "",
      cliente.tipo || "",
      cliente.mensaje || "",
      resumen.subtotal,
      resumen.itbms,
      resumen.total
    ).run();
    const stmt = await env.DB.prepare(
      `INSERT INTO cotizacion_items
       (cotizacion_id, item_id, nombre, unidad, cantidad, precio_unit, subtotal, categoria)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    for (const d of resumen.detalle) {
      await stmt.bind(id, d.item_id, d.nombre, d.unidad, d.cantidad, d.precio_unit, d.subtotal, d.categoria).run();
    }
    const resend = new Resend(env.RESEND_API_KEY);
    const dominioBase = env.PUBLIC_BASE_URL || "https://tctservices-pty.com/";
    const html = emailHTML({ codigo, cliente, resumen, dominioBase });
    const adminTo = env.COTIZACIONES_TO || "contacto@tctservices-pty.com";
    const from = env.RESEND_FROM || "TCT Services <no-reply@tctservices-pty.com>";
    await Promise.all([
      resend.emails.send({
        from,
        to: [cliente.email],
        subject: `Resumen de cotizaci\xF3n ${codigo}`,
        html
      }),
      resend.emails.send({
        from,
        to: [adminTo],
        subject: `Nueva cotizaci\xF3n ${codigo} \u2014 ${cliente.nombre}`,
        html
      })
    ]);
    return ok({ codigo });
  } catch (e) {
    console.error(e);
    return bad(500, "Error al crear la cotizaci\xF3n");
  }
}
__name(onRequestPost2, "onRequestPost2");
var init_cotizaciones = __esm({
  "api/cotizaciones.js"() {
    init_functionsRoutes_0_8534298748811979();
    init_catalogo();
    init_dist();
    __name2(ok, "ok");
    __name2(bad, "bad");
    __name2(codigoCotizacion, "codigoCotizacion");
    __name2(emailHTML, "emailHTML");
    __name2(onRequestOptions, "onRequestOptions");
    __name2(onRequestGet, "onRequestGet");
    __name2(onRequestPost2, "onRequestPost");
  }
});
async function onRequestGet2({ request, env }) {
  try {
    const url = new URL(request.url);
    const fecha = url.searchParams.get("fecha");
    if (!fecha) {
      return new Response(
        JSON.stringify({ error: "Falta par\xE1metro 'fecha'" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    const rows = await env.DB.prepare("SELECT hora FROM reservas WHERE fecha = ?").bind(fecha).all();
    const ocupadas = rows.results.map((r) => r.hora);
    return new Response(
      JSON.stringify({ ocupadas }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
__name(onRequestGet2, "onRequestGet2");
var init_disponibilidad = __esm({
  "api/disponibilidad.js"() {
    init_functionsRoutes_0_8534298748811979();
    __name2(onRequestGet2, "onRequestGet");
  }
});
async function onRequestPost3({ request, env }) {
  const resend = new Resend(env.RESEND_API_KEY);
  const data = await request.json();
  const fecha = (/* @__PURE__ */ new Date()).toLocaleString("es-PA", {
    dateStyle: "long",
    timeStyle: "short"
  });
  const numeroWhatsApp = "50761163672";
  const logoUrl = "https://tctservices-pty.com/images/logo_tct.png";
  const baseStyle = `
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f2f6fa;
    padding: 40px 0;
    color: #333;
  `;
  const cardStyle = `
    background: white;
    max-width: 650px;
    margin: auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  `;
  const headerStyle = `
    background: linear-gradient(135deg, #0D3B66, #144E88);
    text-align: center;
    padding: 24px 16px;
  `;
  const logoStyle = `
    width: 120px;
    height: auto;
    margin-bottom: 8px;
  `;
  const titleStyle = `
    color: white;
    font-size: 22px;
    margin: 6px 0 0;
  `;
  const bodyStyle = `
    padding: 24px;
    font-size: 15px;
    line-height: 1.6;
    color: #333;
  `;
  const boxStyle = `
    background: #f8fafc;
    padding: 14px 18px;
    border-radius: 10px;
    border: 1px solid #e5e9f0;
    margin: 12px 0;
  `;
  const footerStyle = `
    text-align: center;
    font-size: 13px;
    color: #777;
    padding: 20px 0 10px;
    background: #f2f6fa;
  `;
  const botonStyle = `
    display: inline-block;
    background: #0D3B66;
    color: white;
    padding: 10px 25px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    margin: 8px;
  `;
  const botonWhatsApp = `
    display: inline-block;
    background: #25D366;
    color: white;
    padding: 10px 25px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    margin: 8px;
  `;
  const htmlCliente = `
  <div style="${baseStyle}">
    <div style="${cardStyle}">
      <div style="${headerStyle}">
        <img src="${logoUrl}" alt="TCT Services" style="${logoStyle}" />
        <h2 style="${titleStyle}">Confirmaci\xF3n de tu solicitud</h2>
      </div>
      <div style="${bodyStyle}">
        <p>Hola <b>${data.nombre}</b>,</p>
        <p>Gracias por contactarnos. Hemos recibido tu solicitud de cotizaci\xF3n correctamente.</p>

        <div style="${boxStyle}">
          <p><b>Servicio:</b> ${data.servicio}</p>
          <p><b>Tipo de instalaci\xF3n:</b> ${data.tipo || "No especificado"}</p>
          <p><b>Ubicaci\xF3n:</b> ${data.ubicacion}</p>
          <p><b>Mensaje:</b> ${data.mensaje}</p>
        </div>

        <p>Un asesor de <b>TCT Services</b> se comunicar\xE1 contigo pronto para brindarte m\xE1s informaci\xF3n.</p>
        
        <div style="text-align:center;margin-top:20px;">
          <a href="https://tctservices-pty.com" style="${botonStyle}">
            \u{1F310} Visitar sitio web
          </a>
          <a href="https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    "Hola, deseo m\xE1s informaci\xF3n sobre mi cotizaci\xF3n en TCT Services."
  )}" style="${botonWhatsApp}">
            \u{1F4AC} Contactar por WhatsApp
          </a>
        </div>
      </div>
      <div style="${footerStyle}">
        <p>\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} TCT Services \u2014 Innovaci\xF3n en Sistemas Especiales</p>
      </div>
    </div>
  </div>`;
  const htmlAdmin = `
  <div style="${baseStyle}">
    <div style="${cardStyle}">
      <div style="${headerStyle}">
        <img src="${logoUrl}" alt="TCT Services" style="${logoStyle}" />
        <h2 style="${titleStyle}">Nueva solicitud de cotizaci\xF3n</h2>
      </div>
      <div style="${bodyStyle}">
        <p><b>Fecha:</b> ${fecha}</p>
        <div style="${boxStyle}">
          <p><b>Nombre:</b> ${data.nombre}</p>
          <p><b>Correo:</b> ${data.email}</p>
          <p><b>Tel\xE9fono:</b> ${data.telefono}</p>
          <p><b>Servicio:</b> ${data.servicio}</p>
          <p><b>Ubicaci\xF3n:</b> ${data.ubicacion}</p>
          <p><b>Tipo:</b> ${data.tipo || "No especificado"}</p>
        </div>
        <p><b>Mensaje del cliente:</b></p>
        <blockquote style="border-left:3px solid #0D3B66;padding-left:12px;color:#555;">
          ${data.mensaje}
        </blockquote>

        <div style="text-align:center;margin-top:20px;">
          <a href="https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
    `Hola, este es un seguimiento de la cotizaci\xF3n del cliente ${data.nombre} (${data.servicio}).`
  )}" style="${botonWhatsApp}">
            \u{1F4DE} Contactar cliente por WhatsApp
          </a>
        </div>
      </div>
      <div style="${footerStyle}">
        <p>Correo generado autom\xE1ticamente por el sistema web de TCT Services.</p>
      </div>
    </div>
  </div>`;
  try {
    await resend.emails.send({
      from: "TCT Services <notificaciones@tctservices-pty.com>",
      to: "contacto@tctservices-pty.com",
      subject: `Nueva cotizaci\xF3n \u2014 ${data.servicio || "Sin servicio"}`,
      html: htmlAdmin
    });
    await resend.emails.send({
      from: "TCT Services <notificaciones@tctservices-pty.com>",
      to: data.email,
      subject: "Confirmaci\xF3n de tu solicitud \u2014 TCT Services",
      html: htmlCliente
    });
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    return new Response(JSON.stringify({ error: "Fallo al enviar correo" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost3, "onRequestPost3");
var init_resend_email = __esm({
  "api/resend-email.js"() {
    init_functionsRoutes_0_8534298748811979();
    init_dist();
    __name2(onRequestPost3, "onRequestPost");
  }
});
async function onRequestGet3({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
  try {
    const url = new URL(request.url);
    const codigo = url.searchParams.get("codigo");
    if (codigo) {
      const { results: results2 } = await env.DB.prepare("SELECT * FROM reservas WHERE codigo = ?").bind(codigo).all();
      if (results2.length === 0) {
        return new Response(JSON.stringify({ error: "No encontrada" }), {
          status: 404,
          headers
        });
      }
      return new Response(JSON.stringify(results2[0]), { headers });
    }
    const { results } = await env.DB.prepare("SELECT * FROM reservas ORDER BY fecha DESC, hora ASC").all();
    return new Response(JSON.stringify(results), { headers });
  } catch (err) {
    console.error("Error leyendo reservas:", err);
    return new Response(
      JSON.stringify({ error: "Error al cargar las reservas" }),
      { status: 500, headers }
    );
  }
}
__name(onRequestGet3, "onRequestGet3");
async function onRequestPost4({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  let data;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inv\xE1lido" }), {
      status: 400,
      headers
    });
  }
  const nombre = (data.nombre || "").trim();
  const email = (data.email || "").trim();
  const telefono = (data.telefono || "").trim();
  const fecha = (data.fecha || "").trim();
  const hora = (data.hora || "").trim();
  const direccion = (data.direccion || "").trim();
  const motivo = (data.motivo || "").trim();
  const tecnico = (data.tecnico || "Equipo TCT Services").trim();
  const codigo = (data.codigo || Math.random().toString(36).substring(2, 8).toUpperCase()).trim();
  if (!nombre || !email || !fecha || !hora) {
    return new Response(
      JSON.stringify({ error: "Faltan campos obligatorios" }),
      { status: 400, headers }
    );
  }
  const duraciones = {
    "Instalaci\xF3n el\xE9ctrica": 120,
    "Mantenimiento": 90,
    "Inspecci\xF3n t\xE9cnica": 45,
    "Cotizaci\xF3n": 30,
    "Otro": 60
  };
  const duracion = duraciones[motivo] || 60;
  try {
    await env.DB.prepare(
      `INSERT INTO reservas 
       (codigo, nombre, email, telefono, fecha, hora, direccion, motivo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(codigo, nombre, email, telefono, fecha, hora, direccion, motivo).run();
  } catch (err) {
    console.error("DB error:", err);
    return new Response(
      JSON.stringify({ error: "Error al guardar la reserva" }),
      { status: 500, headers }
    );
  }
  const DOMAIN = env.DOMAIN || (request.url.includes("localhost") ? "http://127.0.0.1:8788" : "https://tctservices-pty.com");
  const enlaceCalendario = `${DOMAIN}/calendar-redirect.html?fecha=${encodeURIComponent(fecha)}&hora=${encodeURIComponent(hora)}&duracion=${duracion}&nombre=${encodeURIComponent(`${motivo || "Cita"} \u2013 ${nombre}`)}&detalle=${encodeURIComponent(`Motivo: ${motivo}\\nT\xE9cnico: ${tecnico}\\nOrganizador: contacto@tctservices-pty.com`)}&ubicacion=${encodeURIComponent(direccion || "TCT Services")}`;
  const correoCliente = `
    <div style="font-family: Arial; padding:0; margin:0;
      background:url('${DOMAIN}/images/fondo_inicio.jpg') center/cover;">
      <div style="background:#ffffffdd; border-radius:16px; max-width:600px; margin:auto;">
        <h2 style="background:#0D3B66; color:white; padding:20px; text-align:center;">
          Confirmaci\xF3n de Cita
        </h2>

        <div style="padding:20px;">
          <p>Hola <strong>${nombre}</strong>, tu cita fue registrada con \xE9xito.</p>
          <p><strong>Fecha:</strong> ${fecha}</p>
          <p><strong>Hora:</strong> ${hora}</p>
          <p><strong>Direcci\xF3n:</strong> ${direccion || "\u2014"}</p>
          <p><strong>Motivo:</strong> ${motivo || "\u2014"}</p>
          <p><strong>T\xE9cnico asignado:</strong> ${tecnico}</p>
          <p><strong>C\xF3digo:</strong> <b>${codigo}</b></p>

          <div style="text-align:center; margin:25px 0;">
            <a href="${DOMAIN}/#/reservar?codigo=${encodeURIComponent(codigo)}&modo=buscar"
              style="background:#C1121F;color:white;padding:12px 20px;border-radius:10px;text-decoration:none;">
              Gestionar mi cita
            </a>
          </div>

          <div style="text-align:center; margin:25px 0;">
            <a href="${enlaceCalendario}"
              style="background:#FFD700;color:#0D3B66;padding:12px 20px;border-radius:10px;text-decoration:none;">
              Agregar al calendario (iPhone / Android)
            </a>
          </div>
        </div>

        <footer style="background:#FFD700; color:#0D3B66; text-align:center; padding:10px;">
          \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} TCT Services
        </footer>
      </div>
    </div>
  `;
  const correoAdmin = `
  <div style="font-family:Arial, sans-serif; padding:0; margin:0; background:#f5f6f8;">
    <div style="background:#ffffff; border-radius:16px; max-width:620px; margin:auto; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.1);">
      <div style="background-color:#1E3A5F; text-align:center; padding:25px;">
        <img src="https://tctservices-pty.com/images/logo_tct.png" alt="TCT Services" style="height:65px; margin-bottom:10px;" />
        <h2 style="color:#D4AF37; font-size:22px; margin:0;">Nueva cita registrada \u2014 TCT Services</h2>
      </div>

      <div style="padding:25px; color:#333;">
        <p>Se ha registrado una nueva cita con los siguientes datos:</p>
        <table style="width:100%; border-collapse:collapse; margin:15px 0;">
          <tr><td><strong>Cliente:</strong></td><td>${nombre}</td></tr>
          <tr><td><strong>Correo:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Tel\xE9fono:</strong></td><td>${telefono || "\u2014"}</td></tr>
          <tr><td><strong>Direcci\xF3n:</strong></td><td>${direccion || "\u2014"}</td></tr>
          <tr><td><strong>Motivo:</strong></td><td>${motivo || "\u2014"}</td></tr>
          <tr><td><strong>T\xE9cnico:</strong></td><td>${tecnico}</td></tr>
          <tr><td><strong>Duraci\xF3n:</strong></td><td>${duracion} minutos</td></tr>
          <tr><td><strong>Fecha:</strong></td><td>${fecha}</td></tr>
          <tr><td><strong>Hora:</strong></td><td>${hora}</td></tr>
          <tr><td><strong>C\xF3digo:</strong></td><td><b>${codigo}</b></td></tr>
        </table>

        <div style="text-align:center; margin:25px 0;">
          <a href="${enlaceCalendario}"
            style="background-color:#D4AF37;color:#1E3A5F;padding:12px 25px;border-radius:10px;text-decoration:none;display:inline-block;font-weight:bold;">
            Agregar al calendario
          </a>
        </div>

        <p style="font-size:13px; color:#777; text-align:center;">
          Este correo se envi\xF3 autom\xE1ticamente desde el sistema de reservas.
        </p>
      </div>

      <footer style="background-color:#1E3A5F; color:#D4AF37; text-align:center; padding:12px; font-size:13px;">
        \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} TCT Services \xB7 Panam\xE1
      </footer>
    </div>
  </div>
  `;
  try {
    const headersEmail = {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    };
    const sendClient = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: headersEmail,
      body: JSON.stringify({
        from: "TCT Services <no-reply@tctservices-pty.com>",
        to: email,
        subject: "Confirmaci\xF3n de cita",
        html: correoCliente
      })
    });
    const sendAdmin = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: headersEmail,
      body: JSON.stringify({
        from: "TCT Services <no-reply@tctservices-pty.com>",
        to: env.ADMIN_EMAIL,
        subject: "Nueva cita registrada",
        html: correoAdmin
      })
    });
    await Promise.allSettled([sendClient, sendAdmin]);
  } catch (err) {
    console.error("Error enviando correo:", err);
  }
  return new Response(JSON.stringify({ ok: true, codigo }), {
    status: 201,
    headers
  });
}
__name(onRequestPost4, "onRequestPost4");
async function onRequestPut({ request, env }) {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const data = await request.json();
    if (!data.codigo)
      return new Response(JSON.stringify({ error: "Falta c\xF3digo" }), { status: 400, headers });
    await env.DB.prepare(
      `UPDATE reservas SET nombre=?, email=?, telefono=?, fecha=?, hora=?, direccion=?, motivo=? 
       WHERE codigo=?`
    ).bind(
      data.nombre,
      data.email,
      data.telefono,
      data.fecha,
      data.hora,
      data.direccion,
      data.motivo,
      data.codigo
    ).run();
    return new Response(JSON.stringify({ ok: true }), { headers });
  } catch (err) {
    console.error("Error actualizando reserva:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500, headers });
  }
}
__name(onRequestPut, "onRequestPut");
async function onRequestDelete({ request, env }) {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { codigo } = await request.json();
    if (!codigo)
      return new Response(JSON.stringify({ error: "Falta c\xF3digo" }), { status: 400, headers });
    await env.DB.prepare("DELETE FROM reservas WHERE codigo = ?").bind(codigo).run();
    return new Response(JSON.stringify({ ok: true }), { headers });
  } catch (err) {
    console.error("Error eliminando reserva:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500, headers });
  }
}
__name(onRequestDelete, "onRequestDelete");
var init_reservas = __esm({
  "api/reservas.js"() {
    init_functionsRoutes_0_8534298748811979();
    __name2(onRequestGet3, "onRequestGet");
    __name2(onRequestPost4, "onRequestPost");
    __name2(onRequestPut, "onRequestPut");
    __name2(onRequestDelete, "onRequestDelete");
  }
});
var routes;
var init_functionsRoutes_0_8534298748811979 = __esm({
  "../.wrangler/tmp/pages-hVe73h/functionsRoutes-0.8534298748811979.mjs"() {
    init_contacto();
    init_cotizaciones();
    init_cotizaciones();
    init_cotizaciones();
    init_disponibilidad();
    init_resend_email();
    init_reservas();
    init_reservas();
    init_reservas();
    init_reservas();
    routes = [
      {
        routePath: "/api/contacto",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost]
      },
      {
        routePath: "/api/cotizaciones",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet]
      },
      {
        routePath: "/api/cotizaciones",
        mountPath: "/api",
        method: "OPTIONS",
        middlewares: [],
        modules: [onRequestOptions]
      },
      {
        routePath: "/api/cotizaciones",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost2]
      },
      {
        routePath: "/api/disponibilidad",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet2]
      },
      {
        routePath: "/api/resend-email",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost3]
      },
      {
        routePath: "/api/reservas",
        mountPath: "/api",
        method: "DELETE",
        middlewares: [],
        modules: [onRequestDelete]
      },
      {
        routePath: "/api/reservas",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet3]
      },
      {
        routePath: "/api/reservas",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost4]
      },
      {
        routePath: "/api/reservas",
        mountPath: "/api",
        method: "PUT",
        middlewares: [],
        modules: [onRequestPut]
      }
    ];
  }
});
init_functionsRoutes_0_8534298748811979();
init_functionsRoutes_0_8534298748811979();
init_functionsRoutes_0_8534298748811979();
init_functionsRoutes_0_8534298748811979();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
init_functionsRoutes_0_8534298748811979();
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
init_functionsRoutes_0_8534298748811979();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
init_functionsRoutes_0_8534298748811979();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-o9M1DC/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-o9M1DC/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.41388822614287246.js.map
