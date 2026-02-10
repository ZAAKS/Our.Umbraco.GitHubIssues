import { UmbElementMixin as lt } from "@umbraco-cms/backoffice/element-api";
import { UMB_AUTH_CONTEXT as ht } from "@umbraco-cms/backoffice/auth";
const H = globalThis, j = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, L = /* @__PURE__ */ Symbol(), F = /* @__PURE__ */ new WeakMap();
let it = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== L) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (j && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = F.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && F.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ct = (i) => new it(typeof i == "string" ? i : i + "", void 0, L), ut = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((s, r, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + i[o + 1], i[0]);
  return new it(e, i, L);
}, dt = (i, t) => {
  if (j) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), r = H.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = e.cssText, i.appendChild(s);
  }
}, G = j ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return ct(e);
})(i) : i;
const { is: pt, defineProperty: $t, getOwnPropertyDescriptor: ft, getOwnPropertyNames: _t, getOwnPropertySymbols: mt, getPrototypeOf: gt } = Object, N = globalThis, Z = N.trustedTypes, vt = Z ? Z.emptyScript : "", bt = N.reactiveElementPolyfillSupport, w = (i, t) => i, T = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? vt : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, B = (i, t) => !pt(i, t), J = { attribute: !0, type: String, converter: T, reflect: !1, useDefault: !1, hasChanged: B };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), N.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = J) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), r = this.getPropertyDescriptor(t, s, e);
      r !== void 0 && $t(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: r, set: o } = ft(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: r, set(n) {
      const l = r?.call(this);
      o?.call(this, n), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? J;
  }
  static _$Ei() {
    if (this.hasOwnProperty(w("elementProperties"))) return;
    const t = gt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(w("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(w("properties"))) {
      const e = this.properties, s = [..._t(e), ...mt(e)];
      for (const r of s) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, r] of e) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const r = this._$Eu(e, s);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const r of s) e.unshift(G(r));
    } else t !== void 0 && e.push(G(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return dt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, s);
    if (r !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : T).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, r = s._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const o = s.getPropertyOptions(r), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : T;
      this._$Em = r;
      const l = n.fromAttribute(e, o.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, r = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (r === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? B)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: r, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), r === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, o] of this._$Ep) this[r] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, o] of s) {
        const { wrapped: n } = o, l = this[r];
        n !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, o, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[w("elementProperties")] = /* @__PURE__ */ new Map(), y[w("finalized")] = /* @__PURE__ */ new Map(), bt?.({ ReactiveElement: y }), (N.reactiveElementVersions ??= []).push("2.1.2");
const V = globalThis, K = (i) => i, k = V.trustedTypes, X = k ? k.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, rt = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, ot = "?" + _, yt = `<${ot}>`, b = document, C = () => b.createComment(""), P = (i) => i === null || typeof i != "object" && typeof i != "function", q = Array.isArray, At = (i) => q(i) || typeof i?.[Symbol.iterator] == "function", I = `[ 	
\f\r]`, S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Q = /-->/g, Y = />/g, g = RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), tt = /'/g, et = /"/g, nt = /^(?:script|style|textarea|title)$/i, Et = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), p = Et(1), A = /* @__PURE__ */ Symbol.for("lit-noChange"), c = /* @__PURE__ */ Symbol.for("lit-nothing"), st = /* @__PURE__ */ new WeakMap(), v = b.createTreeWalker(b, 129);
function at(i, t) {
  if (!q(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return X !== void 0 ? X.createHTML(t) : t;
}
const St = (i, t) => {
  const e = i.length - 1, s = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = S;
  for (let l = 0; l < e; l++) {
    const a = i[l];
    let u, d, h = -1, $ = 0;
    for (; $ < a.length && (n.lastIndex = $, d = n.exec(a), d !== null); ) $ = n.lastIndex, n === S ? d[1] === "!--" ? n = Q : d[1] !== void 0 ? n = Y : d[2] !== void 0 ? (nt.test(d[2]) && (r = RegExp("</" + d[2], "g")), n = g) : d[3] !== void 0 && (n = g) : n === g ? d[0] === ">" ? (n = r ?? S, h = -1) : d[1] === void 0 ? h = -2 : (h = n.lastIndex - d[2].length, u = d[1], n = d[3] === void 0 ? g : d[3] === '"' ? et : tt) : n === et || n === tt ? n = g : n === Q || n === Y ? n = S : (n = g, r = void 0);
    const f = n === g && i[l + 1].startsWith("/>") ? " " : "";
    o += n === S ? a + yt : h >= 0 ? (s.push(u), a.slice(0, h) + rt + a.slice(h) + _ + f) : a + _ + (h === -2 ? l : f);
  }
  return [at(i, o + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let r;
    this.parts = [];
    let o = 0, n = 0;
    const l = t.length - 1, a = this.parts, [u, d] = St(t, e);
    if (this.el = U.createElement(u, s), v.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (r = v.nextNode()) !== null && a.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const h of r.getAttributeNames()) if (h.endsWith(rt)) {
          const $ = d[n++], f = r.getAttribute(h).split(_), M = /([.?@])?(.*)/.exec($);
          a.push({ type: 1, index: o, name: M[2], strings: f, ctor: M[1] === "." ? xt : M[1] === "?" ? Ct : M[1] === "@" ? Pt : R }), r.removeAttribute(h);
        } else h.startsWith(_) && (a.push({ type: 6, index: o }), r.removeAttribute(h));
        if (nt.test(r.tagName)) {
          const h = r.textContent.split(_), $ = h.length - 1;
          if ($ > 0) {
            r.textContent = k ? k.emptyScript : "";
            for (let f = 0; f < $; f++) r.append(h[f], C()), v.nextNode(), a.push({ type: 2, index: ++o });
            r.append(h[$], C());
          }
        }
      } else if (r.nodeType === 8) if (r.data === ot) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = r.data.indexOf(_, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += _.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement("template");
    return s.innerHTML = t, s;
  }
}
function E(i, t, e = i, s) {
  if (t === A) return t;
  let r = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = P(t) ? void 0 : t._$litDirective$;
  return r?.constructor !== o && (r?._$AO?.(!1), o === void 0 ? r = void 0 : (r = new o(i), r._$AT(i, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = r : e._$Cl = r), r !== void 0 && (t = E(i, r._$AS(i, t.values), r, s)), t;
}
class wt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, r = (t?.creationScope ?? b).importNode(e, !0);
    v.currentNode = r;
    let o = v.nextNode(), n = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let u;
        a.type === 2 ? u = new z(o, o.nextSibling, this, t) : a.type === 1 ? u = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (u = new Ut(o, this, t)), this._$AV.push(u), a = s[++l];
      }
      n !== a?.index && (o = v.nextNode(), n++);
    }
    return v.currentNode = b, r;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class z {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, r) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), P(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== A && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : At(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== c && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(b.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(at(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(e);
    else {
      const o = new wt(r, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = st.get(t.strings);
    return e === void 0 && st.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    q(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, r = 0;
    for (const o of t) r === e.length ? e.push(s = new z(this.O(C()), this.O(C()), this, this.options)) : s = e[r], s._$AI(o), r++;
    r < e.length && (this._$AR(s && s._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = K(t).nextSibling;
      K(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, r, o) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(t, e = this, s, r) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = E(this, t, e, 0), n = !P(t) || t !== this._$AH && t !== A, n && (this._$AH = t);
    else {
      const l = t;
      let a, u;
      for (t = o[0], a = 0; a < o.length - 1; a++) u = E(this, l[s + a], e, a), u === A && (u = this._$AH[a]), n ||= !P(u) || u !== this._$AH[a], u === c ? t = c : t !== c && (t += (u ?? "") + o[a + 1]), this._$AH[a] = u;
    }
    n && !r && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class xt extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class Ct extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class Pt extends R {
  constructor(t, e, s, r, o) {
    super(t, e, s, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = E(this, t, e, 0) ?? c) === A) return;
    const s = this._$AH, r = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== c && (s === c || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ut {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const zt = V.litHtmlPolyfillSupport;
zt?.(U, z), (V.litHtmlVersions ??= []).push("3.3.2");
const Ot = (i, t, e) => {
  const s = e?.renderBefore ?? t;
  let r = s._$litPart$;
  if (r === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = r = new z(t.insertBefore(C(), o), o, void 0, e ?? {});
  }
  return r._$AI(i), r;
};
const W = globalThis;
class x extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ot(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return A;
  }
}
x._$litElement$ = !0, x.finalized = !0, W.litElementHydrateSupport?.({ LitElement: x });
const Mt = W.litElementPolyfillSupport;
Mt?.({ LitElement: x });
(W.litElementVersions ??= []).push("4.2.2");
const Ht = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
const Tt = { attribute: !0, type: String, converter: T, reflect: !1, hasChanged: B }, kt = (i = Tt, t, e) => {
  const { kind: s, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), s === "setter" && ((i = Object.create(i)).wrapped = !0), o.set(e.name, i), s === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, a, i, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, i, l), l;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(l) {
      const a = this[n];
      t.call(this, l), this.requestUpdate(n, a, i, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Nt(i) {
  return (t, e) => typeof e == "object" ? kt(i, t, e) : ((s, r, o) => {
    const n = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(i, t, e);
}
function D(i) {
  return Nt({ ...i, state: !0, attribute: !1 });
}
var Rt = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, O = (i, t, e, s) => {
  for (var r = s > 1 ? void 0 : s ? Dt(t, e) : t, o = i.length - 1, n; o >= 0; o--)
    (n = i[o]) && (r = (s ? n(t, e, r) : n(r)) || r);
  return s && r && Rt(t, e, r), r;
};
let m = class extends lt(x) {
  constructor() {
    super(...arguments), this._issues = [], this._loading = !0, this._error = "", this._filter = "all";
  }
  connectedCallback() {
    super.connectedCallback(), this._loadIssues();
  }
  async _loadIssues() {
    this._loading = !0, this._error = "";
    const t = await (await this.getContext(ht))?.getLatestToken();
    try {
      const e = this._filter === "up-for-grabs" ? "/umbraco/backoffice/api/github/issues/up-for-grabs" : "/umbraco/backoffice/api/github/issues", s = await fetch(e, {
        headers: {
          Authorization: `Bearer ${t}`
        }
      });
      if (!s.ok)
        throw new Error(`Failed to fetch issues: ${s.statusText}`);
      this._issues = await s.json();
    } catch (e) {
      this._error = e instanceof Error ? e.message : "An error occurred", console.error("Error loading issues:", e);
    } finally {
      this._loading = !1;
    }
  }
  _handleFilterChange(i) {
    this._filter = i, this._loadIssues();
  }
  _formatDate(i) {
    return new Date(i).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }
  render() {
    return p`
            <div class="prs-dashboard">
                <div class="header">
                    <h1>
                        <umb-icon name="icon-lab"></umb-icon>
                        Umbraco CMS GitHub Issues
                    </h1>
                    <p>Browse open issues from the Umbraco CMS repository</p>
                </div>

                <div class="filters">
                    <uui-button
                        look="${this._filter === "all" ? "primary" : "default"}"
                        label="All Issues"
                        @click=${() => this._handleFilterChange("all")}
                    ></uui-button>
                    <uui-button
                        look="${this._filter === "up-for-grabs" ? "primary" : "default"}"
                        label="Up for Grabs"
                        @click=${() => this._handleFilterChange("up-for-grabs")}
                    ></uui-button>
                    <uui-button
                        look="outline"
                        label="Refresh"
                        @click=${() => this._loadIssues()}
                    >
                        <umb-icon name="icon-refresh"></umb-icon>
                    </uui-button>
                </div>

                ${this._renderContent()}
            </div>
        `;
  }
  _renderContent() {
    return this._loading ? p`
                <div class="loading">
                    <uui-loader></uui-loader>
                    <p>Loading issues...</p>
                </div>
            ` : this._error ? p`
                <uui-box>
                    <div class="error">
                        <umb-icon name="icon-alert"></umb-icon>
                        <p>${this._error}</p>
                    </div>
                </uui-box>
            ` : this._issues.length === 0 ? p`
                <uui-box>
                    <div class="no-issues">
                        <umb-icon name="icon-check"></umb-icon>
                        <p>No issues found</p>
                    </div>
                </uui-box>
            ` : p`
            <div class="issues-list">
                ${this._issues.map((i) => this._renderIssue(i))}
            </div>
        `;
  }
  _renderIssue(i) {
    return p`
            <uui-box class="issue-card">
                <div class="issue-header">
                    <div class="issue-title">
                        <a href="${i.htmlUrl}" target="_blank" rel="noopener noreferrer">
                            #${i.number} - ${i.title}
                        </a>
                        ${i.isUpForGrabs ? p`
                            <span class="badge up-for-grabs">Up for Grabs</span>
                        ` : c}
                    </div>
                    <div class="issue-meta">
                        ${i.user ? p`
                            <img src="${i.user.avatarUrl}" alt="${i.user.login}" class="avatar" />
                            <span>${i.user.login}</span>
                        ` : c}
                        <span>•</span>
                        <span>Opened ${this._formatDate(i.createdAt)}</span>
                        <span>•</span>
                        <span>${i.comments} comments</span>
                    </div>
                </div>

                ${i.labels.length > 0 ? p`
                    <div class="labels">
                        ${i.labels.map((t) => p`
                            <span class="label" style="background-color: #${t.color}">
                                ${t.name}
                            </span>
                        `)}
                    </div>
                ` : c}

                ${i.body ? p`
                    <div class="issue-body">
                        ${i.body.substring(0, 200)}${i.body.length > 200 ? "..." : ""}
                    </div>
                ` : c}

                <div class="issue-actions">
                    <uui-button
                        look="outline"
                        label="View on GitHub"
                        href="${i.htmlUrl}"
                        target="_blank"
                    >
                        <umb-icon name="icon-out"></umb-icon>
                        View on GitHub
                    </uui-button>
                </div>
            </uui-box>
        `;
  }
};
m.styles = ut`
        :host {
            display: block;
            padding: var(--uui-size-space-5);
        }

        .prs-dashboard {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            margin-bottom: var(--uui-size-space-6);
        }

        .header h1 {
            display: flex;
            align-items: center;
            gap: var(--uui-size-space-3);
            margin: 0 0 var(--uui-size-space-2) 0;
            font-size: var(--uui-type-h3-size);
        }

        .header p {
            margin: 0;
            color: var(--uui-color-text-alt);
        }

        .filters {
            display: flex;
            gap: var(--uui-size-space-3);
            margin-bottom: var(--uui-size-space-5);
        }

        .loading,
        .error,
        .no-issues {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: var(--uui-size-space-6);
            text-align: center;
        }

        .loading umb-icon,
        .error umb-icon,
        .no-issues umb-icon {
            font-size: 3rem;
            margin-bottom: var(--uui-size-space-4);
        }

        .error {
            color: var(--uui-color-danger);
        }

        .issues-list {
            display: flex;
            flex-direction: column;
            gap: var(--uui-size-space-4);
        }

        .issue-card {
            padding: var(--uui-size-space-5);
        }

        .issue-header {
            margin-bottom: var(--uui-size-space-3);
        }

        .issue-title {
            display: flex;
            align-items: center;
            gap: var(--uui-size-space-3);
            margin-bottom: var(--uui-size-space-2);
        }

        .issue-title a {
            font-size: var(--uui-type-h5-size);
            font-weight: 600;
            color: var(--uui-color-interactive);
            text-decoration: none;
        }

        .issue-title a:hover {
            text-decoration: underline;
        }

        .badge {
            padding: var(--uui-size-space-1) var(--uui-size-space-3);
            border-radius: var(--uui-border-radius);
            font-size: var(--uui-type-small-size);
            font-weight: 600;
        }

        .badge.up-for-grabs {
            background-color: var(--uui-color-positive);
            color: var(--uui-color-positive-contrast);
        }

        .issue-meta {
            display: flex;
            align-items: center;
            gap: var(--uui-size-space-2);
            font-size: var(--uui-type-small-size);
            color: var(--uui-color-text-alt);
        }

        .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }

        .labels {
            display: flex;
            flex-wrap: wrap;
            gap: var(--uui-size-space-2);
            margin-bottom: var(--uui-size-space-3);
        }

        .label {
            padding: var(--uui-size-space-1) var(--uui-size-space-2);
            border-radius: var(--uui-border-radius);
            font-size: var(--uui-type-small-size);
            color: #fff;
        }

        .issue-body {
            margin-bottom: var(--uui-size-space-3);
            line-height: 1.6;
            color: var(--uui-color-text);
        }

        .issue-actions {
            display: flex;
            gap: var(--uui-size-space-3);
        }
    `;
O([
  D()
], m.prototype, "_issues", 2);
O([
  D()
], m.prototype, "_loading", 2);
O([
  D()
], m.prototype, "_error", 2);
O([
  D()
], m.prototype, "_filter", 2);
m = O([
  Ht("githubissues-dashboard")
], m);
const Vt = m;
export {
  m as PRsDashboardElement,
  Vt as default
};
//# sourceMappingURL=dashboard.js.map
