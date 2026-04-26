(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@useparagon/connect/dist/src/index.js
  var require_src = __commonJS({
    "node_modules/@useparagon/connect/dist/src/index.js"(exports, module) {
      (() => {
        var t = { 773: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.InstallFlow = e2.ExternalFilePicker = e2.PARAGON_OVERFLOW_EMPTY_VALUE = void 0;
          const i2 = n2(655), r = i2.__importDefault(n2(6245)), o = n2(3931), s = n2(4059), a = n2(745), l = n2(7343), c = n2(7050);
          Object.defineProperty(e2, "ExternalFilePicker", { enumerable: true, get: function() {
            return c.ExternalFilePicker;
          } });
          const d = n2(2643), u = n2(4429), h = n2(9636), p = i2.__importDefault(n2(9892)), f = n2(3821), g = n2(2460), v = n2(3158), y = n2(4846), E = n2(5349), I = n2(572), S = n2(8321), w = n2(3035), m = "paragon-connect-frame", _ = `${m}-container`, C = "paragon-connect-user-state";
          e2.PARAGON_OVERFLOW_EMPTY_VALUE = "PARAGON_OVERFLOW_EMPTY_VALUE";
          class O extends p.default {
            constructor(t3) {
              let n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              if (super(), this.sdkVersion = "2.3.1", this.rootLoaded = false, this.isHeadless = false, this.rootElementCreated = false, this.modalState = { integration: null, onClose: this.onClose.bind(this), overlayStyle: { overflow: "auto" }, onOpen: this.onOpen.bind(this), apiInstallationOptions: { isApiInstallation: false, showPortalAfterInstall: false } }, this.userState = { authenticated: false }, this.loadedConfigs = {}, this.loadedIntegrations = {}, this.endUserIntegrationConfig = {}, this.metadata = {}, this.cachedApiResponse = new w.CacheThrottle({ ttl: 5e3 }), this.keyToRequestPromiseMap = {}, this.originalBodyOverflow = e2.PARAGON_OVERFLOW_EMPTY_VALUE, this.dynamicFieldMappingLoaders = {}, this.globalDropdownOptions = {}, this.globalMapObjectFields = {}, this.integrationSpecificDropdownOptions = {}, this.integrationSpecificMapObjectFields = {}, this.customDropdownOptionsLoaders = {}, "undefined" == typeof window) return void console.warn("connect sdk can only be used on browser");
              const i3 = (0, v.getAssetUrl)({ CDN_PUBLIC_URL: "https://cdn.useparagon.com", DASHBOARD_PUBLIC_URL: "https://dashboard.useparagon.com", NODE_ENV: "production", PLATFORM_ENV: "production", VERSION: "latest" });
              if (this.environments = { CDN_PUBLIC_URL: i3, CONNECT_PUBLIC_URL: "https://connect.useparagon.com", DASHBOARD_PUBLIC_URL: "https://dashboard.useparagon.com", HERMES_PUBLIC_URL: "https://hermes.useparagon.com", NODE_ENV: "production", PASSPORT_PRODUCTION_URL: "https://passport.useparagon.com", PASSPORT_PUBLIC_URL: "https://passport.useparagon.com", PLATFORM_ENV: "production", VERSION: "latest", WORKER_PROXY_PUBLIC_URL: "https://proxy.useparagon.com", ZEUS_PUBLIC_URL: "https://zeus.useparagon.com" }, this.userState = { authenticated: false }, "string" == typeof t3 ? this.configureGlobal({ host: t3 }) : this.environments = { ...this.environments, ...t3 }, !this.environments.CONNECT_PUBLIC_URL) throw new Error("Paragon SDK error! No `CONNECT_PUBLIC_URL` configured.");
              if (!this.environments.DASHBOARD_PUBLIC_URL) throw new Error("Paragon SDK error! No `DASHBOARD_PUBLIC_URL` configured.");
              if (!this.environments.PASSPORT_PUBLIC_URL) throw new Error("Paragon SDK error! No `PASSPORT_PUBLIC_URL` configured.");
              if (!this.environments.WORKER_PROXY_PUBLIC_URL) throw new Error("Paragon SDK error! No `WORKER_PROXY_PUBLIC_URL` configured.");
              if (!this.environments.ZEUS_PUBLIC_URL) throw new Error("Paragon SDK error! No `ZEUS_PUBLIC_URL` configured.");
              n3.skipBootstrapWithLastKnownState || this.loadState(), window.addEventListener("message", this.eventMessageHandler.bind(this)), window.document.readyState === f.DocumentLoadingState.LOADING ? window.document.addEventListener("DOMContentLoaded", (() => {
                this.createReactRoot();
              })) : this.createReactRoot(), this.installFlow = new A(this);
            }
            setHeadless(t3) {
              this.isHeadless = t3;
            }
            getAssetUrl(t3) {
              return `${this.environments.DASHBOARD_PUBLIC_URL}/images/${t3}.png`;
            }
            getVersion() {
              return this.sdkVersion;
            }
            async eventMessageHandler(t3) {
              switch (t3.data.type) {
                case "oauth_success_callback":
                  await this._oauthCallback(t3.data.credential);
                  break;
                case "oauth_error_callback":
                  await this._oauthErrorCallback(t3.data.error, t3);
                  break;
                default:
                  await this.functionInvocationHandler(t3);
              }
            }
            async functionInvocationHandler(t3) {
              if ("SDK_FUNCTION_INVOCATION" !== t3.data.messageType) return;
              const { type: e3, id: n3, parameters: i3 } = t3.data;
              let r2;
              try {
                r2 = { messageType: "SDK_FUNCTION_RESPONSE", id: n3, type: e3, result: await this[e3](...i3) };
              } catch (t4) {
                r2 = { messageType: "SDK_FUNCTION_ERROR", error: true, message: t4.message, id: n3 };
              }
              t3.source.postMessage(r2, this.environments.CONNECT_PUBLIC_URL);
            }
            createReactRoot() {
              var t3;
              if (this.rootElementCreated) return;
              this.rootElementCreated = true, this.root = document.createElement("iframe"), this.root.onload = () => {
                this.rootLoaded = true, this.render();
              };
              const e3 = !!document.querySelector(`#${_}`);
              this.root.id = m, this.root.src = `${this.environments.CONNECT_PUBLIC_URL}/ui${this.projectId ? `?projectId=${this.projectId}` : ""}`, this.root.style.position = e3 ? "absolute" : "fixed", this.root.style.top = "0", this.root.style.left = "0", this.root.style.width = e3 ? "100%" : "100vw", this.root.style.height = e3 ? "100%" : "100vh", this.root.style.zIndex = "2147483647", this.root.style.display = "none", null === (t3 = document.querySelector(`#${_}`) || document.body) || void 0 === t3 || t3.appendChild(this.root);
            }
            validateAction(t3) {
              var e3;
              if (!this.loadedIntegrations[t3] && !(0, l.isCustomIntegrationTypeName)(t3)) throw new Error(`"${t3}" is not a valid integration type. The integrations you have configured for this Paragon project are:

${Object.keys(this.loadedConfigs).map(((t4) => `- "${t4}"`)).join("\n")}
`);
              if (!this.loadedConfigs[t3] || !this.userState.integrations[t3]) throw new Error(`integration "${t3}" has not been set up in your Paragon project yet.

${Object.keys(this.loadedConfigs).map(((t4) => `- "${t4}"`)).join("\n")}`);
              if (!(null === (e3 = this.loadedIntegrations[t3]) || void 0 === e3 ? void 0 : e3.isActive)) throw new Error(`integration "${t3}" is not active in your Paragon project yet.`);
            }
            validateExternalIdOptions(t3, e3) {
              let { externalId: n3, selectedCredentialId: i3 } = e3;
              var r2, o2;
              if (void 0 === n3) return;
              const s2 = (0, v.sanitizeExternalConfigId)(n3);
              if ("" === s2) throw new Error("`externalId` must not be an empty or whitespace-only string.");
              if (i3) throw new Error("`externalId` cannot be used together with `selectedCredentialId`. `externalId` labels a new credential at install time; `selectedCredentialId` (UUID, externalId, or `ext:<value>`) targets an existing credential for re-authentication.");
              if (null === (o2 = null === (r2 = this.userState.integrations[t3]) || void 0 === r2 ? void 0 : r2.allCredentials) || void 0 === o2 ? void 0 : o2.find(((t4) => t4.externalId === s2))) throw new Error(`A credential with externalId "${s2}" already exists for integration "${t3}". Use \`selectedCredentialId: "ext:${s2}"\` to re-authenticate it.`);
            }
            isAlreadyInstalled(t3, e3, n3) {
              var i3, r2;
              if (n3) {
                const t4 = this.getCredentialAndConfig({ selectedCredentialId: n3 });
                return (null === (i3 = null == t4 ? void 0 : t4.selectedCredential) || void 0 === i3 ? void 0 : i3.status) === s.CredentialStatus.VALID;
              }
              return Boolean(null === (r2 = e3.integrations[t3]) || void 0 === r2 ? void 0 : r2.enabled);
            }
            hasCredential(t3, e3, n3) {
              var i3, r2;
              if (!n3) return Boolean(null === (i3 = e3.integrations[t3]) || void 0 === i3 ? void 0 : i3.credentialId);
              try {
                const t4 = this.getCredentialAndConfig({ selectedCredentialId: n3 });
                return Boolean(null === (r2 = null == t4 ? void 0 : t4.selectedCredential) || void 0 === r2 ? void 0 : r2.id);
              } catch (t4) {
                return console.error(t4), false;
              }
            }
            async bootstrapSDKState(t3) {
              this.projectId && this.userState.authenticated && await this.updateLocalState(t3);
            }
            setModalState(t3) {
              this.modalState = { config: void 0, ...this.modalState, ...t3 }, this.render();
            }
            loadState() {
              if ("undefined" != typeof window) try {
                const t3 = window.localStorage.getItem(C) ? JSON.parse(window.localStorage.getItem(C)) : {};
                if (t3.projectId && (this.projectId = t3.projectId), t3.userState) {
                  const { userState: e3 } = t3;
                  if (!("authenticated" in e3 && e3.authenticated && "token" in e3)) throw new Error("Malformatted or unauthenticated user was persisted into localStorage. Refusing to load.");
                  t3.environments && Object.keys(t3.environments).length > 0 && (this.environments = { ...this.environments, ...t3.environments }), this.updateAuthenticatedUser(e3), this.bootstrapSDKState().catch((() => {
                    this.clearState();
                  }));
                }
              } catch {
                this.clearState();
              }
            }
            getIntegrationId(t3) {
              const e3 = this.loadedIntegrations[t3];
              if (!e3) throw new Error(`Integration "${t3}" not found`);
              return e3.id;
            }
            saveState() {
              "undefined" != typeof window && this.userState.authenticated && window.localStorage.setItem(C, JSON.stringify({ projectId: this.projectId, userState: this.userState, environments: this.environments }));
            }
            clearState() {
              "undefined" != typeof window && window.localStorage.removeItem(C);
            }
            render() {
              if (!this.isHeadless && this.root && this.rootLoaded) {
                const { onClose: t3, onOpen: e3, ...n3 } = this.modalState, i3 = { messageType: "UI_UPDATE", nextContext: { user: this.userState, projectId: this.projectId, environments: this.environments, project: this.project, endUserIntegrationConfig: this.modalState.integration ? this.endUserIntegrationConfig[(0, l.getIntegrationTypeName)(this.modalState.integration) || ""] : void 0 }, nextModalState: n3 };
                if (!this.root.contentWindow) throw new Error("Browser not supported");
                this.root.contentWindow.postMessage(i3, this.environments.CONNECT_PUBLIC_URL);
              }
            }
            updateContainerStyle(t3) {
              let { isModalShown: e3 } = t3;
              this.root && (this.root.style.display = e3 ? "block" : "none");
            }
            async authenticate(t3, e3, n3) {
              var i3;
              if (!t3 || !e3) throw new Error("projectId or token not specified to paragon.authenticate()");
              let o2 = {};
              try {
                o2 = (0, r.default)(e3);
              } catch (t4) {
                throw new Error("A well-formed JWT was not provided to paragon.authenticate()");
              }
              this.projectId = t3, this.userState = { authenticated: true, token: e3, userId: o2.sub || o2.id, integrations: {}, meta: null !== (i3 = null == n3 ? void 0 : n3.metadata) && void 0 !== i3 ? i3 : {}, resources: [] };
              try {
                if (Date.now() >= 1e3 * (o2.exp || 0)) throw new Error("JWT token provided has expired.");
                await this.bootstrapSDKState(null == n3 ? void 0 : n3.metadata);
              } catch (t4) {
                throw console.warn("paragon.authenticate() could not login user", t4), this.logout(), new Error(`Failed to authenticate user with Paragon: ${t4.message}`);
              }
              this.render();
            }
            getUser() {
              return (0, h.cloneDeep)(Object.fromEntries(Object.entries(this.userState).filter(((t3) => {
                let [e3] = t3;
                return "token" !== e3;
              }))));
            }
            updateAuthenticatedUser(t3) {
              this.userState.authenticated ? this.userState = { ...this.userState, ...t3 } : t3.authenticated && (this.userState = t3), this.render();
            }
            logout() {
              this.userState = { authenticated: false }, this.clearState(), this.render();
            }
            removeOptionDuplicates() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
              if (!t3) return;
              const e3 = /* @__PURE__ */ new Set(), n3 = [];
              for (const i3 of t3) e3.has(i3.value) ? console.warn(`Duplicated key: "${i3.value}", Ignored: "${i3.label}"`) : (n3.push(i3), e3.add(i3.value));
              return n3;
            }
            startOAuthFlow(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              var i3, r2, o2;
              const s2 = this.getIntegrationByName(t3), l2 = (0, d.findSelectedAccountType)(null === (i3 = null == s2 ? void 0 : s2.sdkIntegrationConfig) || void 0 === i3 ? void 0 : i3.accountTypes, this.getAccountName(e3.accountType), this.getSelectedMultipleAccountTypes(e3.accountType)), c2 = { context: { user: this.userState, projectId: this.projectId, environments: this.environments, endUserIntegrationConfig: null !== (r2 = e3.userProvidedIntegrationConfig) && void 0 !== r2 ? r2 : this.endUserIntegrationConfig[t3] }, integration: s2, endUserSuppliedValues: e3.endUserSuppliedValues }, h2 = Boolean(s2.needPreOauthInputs && l2 && !(null === (o2 = l2.endUserSuppliedValues) || void 0 === o2 ? void 0 : o2.length) && l2.scheme === a.AuthenticationScheme.OAUTH);
              if (this.isHeadless || h2 || !s2.needPreOauthInputs) {
                c2.authParams = null == l2 ? void 0 : l2.oauthParameters, c2.installOptions = e3;
                const i4 = Math.random().toString(36).substring(2, 15), r3 = (0, u.startOAuthFlow)(c2, i4);
                if (!r3) throw new g.OAuthBlockedError();
                const o3 = () => {
                  clearInterval(v2);
                }, s3 = Date.now(), a2 = new AbortController(), d2 = 500;
                let h3 = false;
                const p2 = { abortSignal: a2.signal, onSuccess: (t4) => {
                  var e4;
                  h3 || (h3 = true, o3(), null === (e4 = n3.onSuccess) || void 0 === e4 || e4.call(n3, t4));
                }, onError: (t4) => {
                  var e4;
                  h3 || (h3 = true, o3(), a2.abort(), null === (e4 = n3.onError) || void 0 === e4 || e4.call(n3, t4));
                } }, f2 = setInterval((() => {
                  try {
                    !this.isHeadless && r3.opener || (clearInterval(f2), this.pollForCredential(t3, i4, p2));
                  } catch (e4) {
                    clearInterval(f2), this.pollForCredential(t3, i4, p2);
                  }
                }), d2), v2 = setInterval((() => {
                  try {
                    if (!h3 && n3.oauthTimeout && Date.now() - s3 > n3.oauthTimeout) return r3.close(), void p2.onError(new g.OAuthTimeoutError());
                  } catch (t4) {
                    p2.onError(t4);
                  }
                }), d2);
              }
            }
            getIntegrationByName(t3) {
              const e3 = Object.values(this.loadedIntegrations).find(((e4) => (0, l.getIntegrationTypeName)(e4) === t3));
              if (!e3) throw new Error(`Integration "${t3}" not found.`);
              return e3;
            }
            getSelectedMultipleAccountTypes(t3) {
              if (Array.isArray(t3)) return t3;
            }
            getAccountName(t3) {
              return "string" == typeof t3 ? t3.trim() : "";
            }
            setDynamicFieldMappingLoaders(t3, e3) {
              var n3, i3;
              if (this.dynamicFieldMappingLoaders[t3] = {}, e3) {
                for (const [r2, o2] of Object.entries(e3)) if ("object" == typeof o2 && "objectTypes" in o2 && "integrationFields" in o2 && "applicationFields" in o2) {
                  const s2 = o2;
                  this.dynamicFieldMappingLoaders[t3][r2] = { objectTypes: null === (n3 = s2.objectTypes) || void 0 === n3 ? void 0 : n3.get, integrationFields: null === (i3 = s2.integrationFields) || void 0 === i3 ? void 0 : i3.get }, s2.applicationFields && (e3[r2] = { ...s2.applicationFields, useBYOFieldMappingOption: true });
                }
              }
            }
            async connect(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              const { mapObjectFields: n3, overrideRedirectUrl: i3, isApiInstallation: r2 = false, showPortalAfterInstall: o2, bypassPostOAuthPrompt: a2, allowMultipleCredentials: l2, selectedCredentialId: c2, selectedConfigurationId: u2, accountType: h2, externalId: p2, ...v2 } = e3;
              return this.integrationToBeEnabled = t3, new Promise(((y2, E2) => {
                var I2, w2;
                if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
                const m2 = this.getIntegrationByName(t3), _2 = this.getSelectedMultipleAccountTypes(h2);
                this.subscribeToIntegration(t3, { ...v2, onInstall: (e4, n4) => {
                  var i4;
                  const r3 = n4.integrations[t3];
                  e4.credentialId = null == r3 ? void 0 : r3.credentialId, e4.credential = null == r3 ? void 0 : r3.allCredentials.find(((t4) => t4.id === r3.credentialId)), y2(e4), (null == v2 ? void 0 : v2.onInstall) ? v2.onInstall(e4, n4) : null === (i4 = null == v2 ? void 0 : v2.onSuccess) || void 0 === i4 || i4.call(v2, e4, n4);
                }, onError: (t4) => {
                  var e4;
                  E2(t4), null === (e4 = null == v2 ? void 0 : v2.onError) || void 0 === e4 || e4.call(v2, t4);
                } });
                try {
                  if (n3 && !this.project.accessibleFeatures.includes(f.ConnectAddOn.DynamicFieldMapper)) throw new Error("Dynamic Field Mapping is available on our Enterprise plan. Contact sales@useparagon.com to learn more or upgrade.");
                  if (this.validateExternalIdOptions(t3, { externalId: p2, selectedCredentialId: c2 }), this.validateAction(t3), i3 && !(0, S.isValidUrl)(i3)) throw new Error(`${i3} is not valid url.`);
                  this.setDynamicFieldMappingLoaders(t3, n3), this.endUserIntegrationConfig[t3] = { mapObjectFields: n3, overrideRedirectUrl: i3 ? (0, S.sanitizeUrl)(i3) : void 0 };
                  const g2 = this.getAccountName(h2), v3 = Array.isArray(h2) ? h2.filter(((t4) => {
                    var e4, n4;
                    return !(null === (n4 = null === (e4 = null == m2 ? void 0 : m2.sdkIntegrationConfig) || void 0 === e4 ? void 0 : e4.accountTypes) || void 0 === n4 ? void 0 : n4.some(((e5) => e5.id === t4)));
                  })) : [], C2 = (0, d.findSelectedAccountType)(null === (I2 = null == m2 ? void 0 : m2.sdkIntegrationConfig) || void 0 === I2 ? void 0 : I2.accountTypes, g2, _2), O2 = { isApiInstallation: r2, showPortalAfterInstall: o2, bypassPostOAuthPrompt: a2, allowMultipleCredentials: l2, selectedCredentialId: c2, selectedConfigurationId: u2, accountType: h2, externalId: p2 };
                  if (this.setCredentialConfigForUserState(t3, c2, u2), e3.isApiInstallation && (null === (w2 = this.userState.integrations[t3]) || void 0 === w2 ? void 0 : w2.credentialStatus) !== s.CredentialStatus.PENDING) {
                    const n4 = this.isHeadless ? { onSuccess: (t4) => {
                      y2({ integrationId: t4.integrationId, integrationType: t4.integrationType, credentialId: t4.credentialId });
                    }, onError: (t4) => {
                      E2(t4);
                    }, oauthTimeout: e3.oauthTimeout } : void 0;
                    this.startOAuthFlow(t3, O2, n4);
                  }
                  (h2 && !C2 && "string" == typeof h2 || v3.length) && console.warn(`Account type "${v3.length ? v3 : h2}" is not valid for integration "${null == m2 ? void 0 : m2.type}"`);
                  const A2 = JSON.parse(JSON.stringify(this.loadedConfigs[t3]));
                  if (e3.dropdowns) {
                    const n4 = e3.dropdowns, i4 = [], r3 = /* @__PURE__ */ new Set();
                    for (const t4 in n4) {
                      const e4 = n4[t4];
                      "loadOptions" in e4 && (this.customDropdownOptionsLoaders[t4] = e4.loadOptions, i4.push(t4), e4.refreshOnOpen && r3.add(t4));
                    }
                    if (A2.sharedMeta && Array.isArray(A2.sharedMeta.inputs)) for (const t4 of A2.sharedMeta.inputs) {
                      if (i4.includes(t4.key)) {
                        t4.customDropdownOptions = [], t4.refreshOnOpen = r3.has(t4.key);
                        continue;
                      }
                      const e4 = this.removeOptionDuplicates(n4[t4.key]);
                      e4 && t4.customDropdownOptions && (t4.customDropdownOptions = e4);
                    }
                    if (A2.workflowMeta) for (const t4 in A2.workflowMeta) {
                      const e4 = A2.workflowMeta[t4];
                      for (const t5 of e4.inputs) {
                        if (i4.includes(t5.key)) {
                          t5.customDropdownOptions = [], t5.refreshOnOpen = r3.has(t5.key);
                          continue;
                        }
                        const e5 = this.removeOptionDuplicates(n4[t5.key]);
                        e5 && t5.customDropdownOptions && (t5.customDropdownOptions = e5);
                      }
                    }
                    this.loadedConfigs[t3] = A2;
                  }
                  this.setModalState({ integration: m2, config: this.loadedConfigs[t3], apiInstallationOptions: { ...O2, selectedMultipleAccountTypes: _2, selectedAccountConfig: C2 }, selectedCredentialId: c2, connectionError: void 0, shouldShowPortalAfterInstall: false });
                } catch (e4) {
                  this.emitError(e4, t3);
                }
              }));
            }
            setCredentialConfigForUserState(t3, e3, n3) {
              var i3, r2, o2;
              if (!this.userState.authenticated || !(null === (i3 = this.userState.integrations[t3]) || void 0 === i3 ? void 0 : i3.allCredentials.length)) return;
              const a2 = this.userState.integrations[t3], l2 = null !== (r2 = null == a2 ? void 0 : a2.credentialId) && void 0 !== r2 ? r2 : null == a2 ? void 0 : a2.allCredentials[0].id, c2 = this.getCredentialAndConfig(e3 || n3 ? { selectedCredentialId: e3, selectedConfigurationId: n3 } : { selectedCredentialId: l2 }, a2);
              if (!(null === (o2 = null == a2 ? void 0 : a2.allCredentials) || void 0 === o2 ? void 0 : o2.some(((t4) => {
                let { id: e4 } = t4;
                return e4 === (null == c2 ? void 0 : c2.selectedCredential.id);
              }))) || !c2) throw new Error(`Credential with ID "${e3}" is not a valid ${t3} account.`);
              const { selectedConfig: d2, selectedCredential: u2 } = c2, h2 = { ...a2, allConfigurations: (null == a2 ? void 0 : a2.allConfigurations) || [], allCredentials: (null == a2 ? void 0 : a2.allCredentials) || [], enabled: u2.status === s.CredentialStatus.VALID, credentialId: u2.id, credentialStatus: u2.status, providerData: u2.providerData, providerId: u2.providerId, configMeta: null == d2 ? void 0 : d2.configMeta, credentialConfigId: null == d2 ? void 0 : d2.id, externalId: null == d2 ? void 0 : d2.externalId, sharedSettings: null == d2 ? void 0 : d2.sharedSettings, workflowSettings: null == d2 ? void 0 : d2.workflowSettings, configuredWorkflows: null == d2 ? void 0 : d2.workflowSettings };
              this.userState.integrations = { ...this.userState.integrations, [t3]: h2 };
            }
            getCredentialAndConfig(t3, e3, n3) {
              var i3;
              const { selectedCredentialId: r2, selectedConfigurationId: o2 } = t3;
              let s2 = null == r2 ? void 0 : r2.trim();
              const a2 = null == o2 ? void 0 : o2.trim(), l2 = !!s2 && (s2.startsWith("ext:") || !(0, I.isUUID)(s2));
              if (!this.userState.authenticated || !s2 && !a2) return;
              let c2, d2;
              const u2 = null !== (i3 = null == e3 ? void 0 : e3.allCredentials) && void 0 !== i3 ? i3 : Object.values(this.userState.integrations).flatMap(((t4) => (null == t4 ? void 0 : t4.allCredentials) || [])), h2 = u2.flatMap(((t4) => {
                let { configurations: e4 } = t4;
                return e4;
              }));
              if (l2) {
                const t4 = (0, v.sanitizeExternalConfigId)(s2), e4 = u2.find(((e5) => e5.externalId === t4));
                if (!e4) throw new Error(`Credential with externalId "${t4}" not found.`);
                s2 = e4.id;
              }
              if (a2) {
                const t4 = a2.startsWith("ext:") || !(0, I.isUUID)(a2), e4 = (0, v.sanitizeExternalConfigId)(a2), i4 = (n4) => (t4 ? n4.externalId === e4 : n4.id === e4) && (!s2 || n4.connectCredentialId === s2);
                if (null == n3 ? void 0 : n3.throwIfMultipleConfigsFound) {
                  const t5 = h2.filter(i4);
                  if (t5.length > 1) throw new Error(`Multiple credential configurations found for provided id: ${a2}.`);
                  d2 = t5[0];
                } else d2 = h2.find(i4);
                if (!d2) throw new Error(`Credential configuration not found for provided id: ${a2}.`);
              }
              if (c2 = u2.find(((t4) => {
                let { id: e4 } = t4;
                return e4 === ((null == d2 ? void 0 : d2.connectCredentialId) || s2);
              })), d2 = null != d2 ? d2 : null == c2 ? void 0 : c2.configurations.find(((t4) => {
                let { isDefault: e4 } = t4;
                return e4;
              })), !c2) throw new Error("Unable to find credential for provided options.");
              if (!d2) throw new Error(`Credential configuration not found for credential: ${c2.id}.`);
              if (d2 && d2.connectCredentialId !== (null == c2 ? void 0 : c2.id)) throw new Error('Provided "selectedCredentialId" does not belongs to provided "selectedConfigurationId".');
              return { selectedCredential: c2, selectedConfig: d2 };
            }
            _getIntegration(t3) {
              return Object.values(this.loadedIntegrations).find(((e3) => e3.id === t3));
            }
            getIntegrationBySlug(t3) {
              const e3 = this.loadedIntegrations[t3];
              if (!e3) throw new g.IntegrationNotFoundError(t3);
              return e3;
            }
            async _oauthCallback(t3, e3, n3) {
              var i3, r2, o2;
              const { integrationId: a2, payload: c2 } = t3, d2 = this._getIntegration(a2);
              if (!d2) return;
              const u2 = (0, y.hash)(JSON.stringify({ oauthResponse: t3, credentialId: e3 }));
              if (await this.cachedApiResponse.get(u2)) return;
              await this.cachedApiResponse.set(u2, true);
              const h2 = (0, l.getIntegrationTypeName)(d2), p2 = null !== (i3 = null == n3 ? void 0 : n3.installOptions) && void 0 !== i3 ? i3 : (null === (r2 = this.modalState.apiInstallationOptions) || void 0 === r2 ? void 0 : r2.isApiInstallation) ? this.modalState.apiInstallationOptions : {};
              try {
                const t4 = e3 ? `/sdk/credentials/${e3}/complete-setup` : "/sdk/credentials", n4 = await this.sendConnectRequest(t4, { method: "POST", body: JSON.stringify({ integrationId: d2.id, config: {}, payload: c2, installOptions: p2 }) });
                if (!n4) throw new Error("Unable to save oauth credentials");
                return this.updateCredentialData(n4, d2), n4.status === s.CredentialStatus.VALID && this.triggerSDKEvent({ type: f.SDK_EVENT.ON_INTEGRATION_INSTALL, integrationId: d2.id, integrationType: h2 }), this.setModalState({ ...this.modalState, ...(null === (o2 = this.modalState.apiInstallationOptions) || void 0 === o2 ? void 0 : o2.showPortalAfterInstall) ? { shouldShowPortalAfterInstall: true } : {}, connectionError: void 0 }), { integrationId: d2.id, integrationType: h2, credentialId: n4.id, credential: n4 };
              } catch (t4) {
                if (this.isHeadless) throw t4;
                this.setModalState({ ...this.modalState, connectionError: t4 }), this.emitError(t4, h2), await this._oauthErrorCallback(t4.message);
              }
            }
            async _oauthErrorCallback(t3, e3) {
              var n3;
              const i3 = t3;
              let r2;
              r2 = this.integrationToBeEnabled ? this.loadedIntegrations[this.integrationToBeEnabled].id : null === (n3 = null == e3 ? void 0 : e3.data) || void 0 === n3 ? void 0 : n3.integrationId, e3 && (this.emitError(e3.data.errorResponse, (0, l.getIntegrationTypeName)(this._getIntegration(r2))), this.setModalState({ ...this.modalState, connectionError: e3.data })), console.error("Failed to connect account to Paragon over OAuth", i3);
            }
            async _loadCustomDropdownOptions(t3, e3, n3) {
              return (0, h.cloneDeep)(this.customDropdownOptionsLoaders[t3](e3, n3));
            }
            setDataSources(t3) {
              this.globalDropdownOptions = {}, this.globalMapObjectFields = {}, this.integrationSpecificDropdownOptions = {}, this.integrationSpecificMapObjectFields = {};
              const e3 = Object.keys(this.customDropdownOptionsLoaders);
              for (const t4 of e3) delete this.customDropdownOptionsLoaders[t4];
              if (this.processDropdownSources(t3.dropdowns, this.globalDropdownOptions), this.processMapObjectFieldSources(t3.mapObjectFields), t3.integrationSpecificSources) for (const [e4, n3] of Object.entries(t3.integrationSpecificSources)) n3 && "object" == typeof n3 ? (this.integrationSpecificDropdownOptions[e4] = {}, this.processDropdownSources(n3.dropdowns, this.integrationSpecificDropdownOptions[e4]), this.processMapObjectFieldSources(n3.mapObjectFields, e4)) : console.error(`Could not load data source for integration "${e4}" because a valid source object was not provided`);
            }
            processDropdownSources(t3, e3) {
              if (t3) for (const [n3, i3] of Object.entries(t3)) Array.isArray(i3) ? e3[n3] = i3 : i3 && "object" == typeof i3 && "loadOptions" in i3 ? this.customDropdownOptionsLoaders[n3] = i3.loadOptions : console.error(`Could not load data source "${n3}" because a valid source object was not provided`);
            }
            processMapObjectFieldSources(t3, e3) {
              var n3, i3, r2, o2, s2;
              if (!t3) return;
              const a2 = e3 ? null !== (n3 = (s2 = this.integrationSpecificMapObjectFields)[e3]) && void 0 !== n3 ? n3 : s2[e3] = {} : null !== (i3 = this.globalMapObjectFields) && void 0 !== i3 ? i3 : this.globalMapObjectFields = {};
              for (const [n4, i4] of Object.entries(t3)) if (i4 && "object" == typeof i4) {
                if (a2[n4] = i4, "objectTypes" in i4 && "integrationFields" in i4 && "applicationFields" in i4) {
                  const t4 = i4, s3 = null != e3 ? e3 : "__global__";
                  this.dynamicFieldMappingLoaders[s3] || (this.dynamicFieldMappingLoaders[s3] = {}), this.dynamicFieldMappingLoaders[s3][n4] = { objectTypes: null === (r2 = t4.objectTypes) || void 0 === r2 ? void 0 : r2.get, integrationFields: null === (o2 = t4.integrationFields) || void 0 === o2 ? void 0 : o2.get }, t4.applicationFields && (a2[n4] = { ...t4.applicationFields, useBYOFieldMappingOption: true });
                }
              } else console.error(`Could not load data source "${n4}" because a valid source object was not provided`);
            }
            resolveCustomDropdownSource(t3, e3) {
              var n3;
              if (!t3) return null;
              const i3 = null === (n3 = this.integrationSpecificDropdownOptions[e3]) || void 0 === n3 ? void 0 : n3[t3];
              if (i3) return i3;
              const r2 = this.globalDropdownOptions[t3];
              return r2 || null;
            }
            resolveMapObjectFieldSource(t3, e3) {
              var n3, i3;
              if (!t3) return null;
              const r2 = null === (n3 = this.integrationSpecificMapObjectFields[e3]) || void 0 === n3 ? void 0 : n3[t3];
              if (r2 && !this.isDynamicFieldMappingConfig(r2)) return r2;
              const o2 = null === (i3 = this.globalMapObjectFields) || void 0 === i3 ? void 0 : i3[t3];
              return o2 && !this.isDynamicFieldMappingConfig(o2) ? o2 : null;
            }
            isDynamicFieldMappingConfig(t3) {
              return "object" == typeof t3 && !Array.isArray(t3) && "objectTypes" in t3 && "integrationFields" in t3;
            }
            hasCustomDropdownLoader(t3) {
              return !!t3 && !!this.customDropdownOptionsLoaders[t3];
            }
            async sendConnectRequest(t3, e3) {
              let n3 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
              var i3;
              if (!this.userState.authenticated || !this.projectId) throw new Error("Connect SDK attempted to make an API request, but no user was authenticated.\nCall paragon.authenticate(<projectId>, <user token>) before using the SDK.");
              const r2 = `${null !== (i3 = null == e3 ? void 0 : e3.baseURLOverride) && void 0 !== i3 ? i3 : this.environments.ZEUS_PUBLIC_URL}${n3 ? `/projects/${this.projectId}` : ""}${t3}`, o2 = (0, y.hash)(JSON.stringify({ url: r2, payload: { ...e3 } })), s2 = await this.cachedApiResponse.get(o2, true);
              if ((null == e3 ? void 0 : e3.cacheResult) && s2) return s2;
              const a2 = Boolean(!e3 || "GET" === e3.method || e3.cacheResult);
              if (a2 && "object" == typeof this.keyToRequestPromiseMap[o2]) return this.keyToRequestPromiseMap[o2];
              const l2 = this.userState.token, c2 = this.modalState.integration && this.integrationToBeEnabled ? this.userState.integrations[this.integrationToBeEnabled] : void 0, d2 = new Promise(((t4, n4) => {
                (async () => {
                  try {
                    const n5 = await this.sendRequest(r2, { ...e3, headers: { Accept: "application/json", "Content-Type": "application/json", [f.SDK_VERSION_HEADER]: this.sdkVersion, ...!(null == e3 ? void 0 : e3.skipDefaultCredentialIdHeader) && (null == c2 ? void 0 : c2.credentialId) ? { [f.SELECTED_CREDENTIAL_ID_HEADER]: null == c2 ? void 0 : c2.credentialId } : {}, ...null == e3 ? void 0 : e3.headers, Authorization: `Bearer ${l2}` } }, a2 ? o2 : void 0);
                    t4(n5);
                  } catch (t5) {
                    n4(t5);
                  }
                })();
              }));
              return a2 && (this.keyToRequestPromiseMap[o2] = d2), d2;
            }
            async sendRequest(t3, e3, n3) {
              var i3;
              let r2, s2, a2;
              try {
                r2 = await fetch(t3, e3);
              } catch (t4) {
                a2 = t4;
              }
              const l2 = t3.includes("proxy");
              if (r2 && !r2.ok || a2) {
                const t4 = r2 ? await (0, S.getErrorMessage)(r2, true) : null == a2 ? void 0 : a2.message, e4 = "string" == typeof t4 ? t4 : null == t4 ? void 0 : t4.message, s3 = (0, S.errorMessageParser)(e4), c2 = "object" == typeof t4 && t4.response.code === o.INSUFFICIENT_PERMISSION, d2 = "object" == typeof t4 && [o.BYO_CREDENTIAL_VERIFICATION_ERROR, o.BYO_USER_PROFILE_ERROR_CODE].includes(t4.response.code), u2 = 401 === (null == r2 ? void 0 : r2.status) || 403 === (null == r2 ? void 0 : r2.status), h2 = !s3 && !c2 && !d2 && u2;
                if (h2 && !l2) this.logout();
                else if (h2 && l2) {
                  const t5 = await this.fetchUserData();
                  this.updateAuthenticatedUser({ integrations: t5.integrations, meta: t5.meta, resources: t5.resources });
                }
                if (n3 && (await this.cachedApiResponse.del(n3), delete this.keyToRequestPromiseMap[n3]), "string" != typeof t4 && l2) throw null === (i3 = t4.response) || void 0 === i3 || delete i3.headers, new S.ProxyRequestError(t4.message, t4.response);
                throw new Error("string" == typeof t4 ? e4 : JSON.stringify(t4.response));
              }
              if (l2) return n3 && delete this.keyToRequestPromiseMap[n3], r2;
              try {
                s2 = await (null == r2 ? void 0 : r2.json());
              } catch {
                s2 = void 0;
              }
              return n3 && (await this.cachedApiResponse.set(n3, s2), delete this.keyToRequestPromiseMap[n3]), s2;
            }
            async request(t3, e3, n3) {
              var i3, r2;
              const o2 = `/sdk/proxy/${t3}`, s2 = e3.startsWith("/") ? e3 : `/${e3}`, a2 = n3.selectedCredentialId, l2 = await this.sendConnectRequest(`${o2}${s2}`, { method: n3.method, body: "object" == typeof n3.body ? JSON.stringify(n3.body) : n3.body, headers: { "Content-Type": f.INFER_CONTENT_TYPE_FROM_CONNECT_OPTIONS, ...a2 ? { [f.SELECTED_CREDENTIAL_ID_HEADER]: a2 } : {}, ...n3.headers }, baseURLOverride: this.environments.WORKER_PROXY_PUBLIC_URL, skipDefaultCredentialIdHeader: true });
              let c2 = l2;
              if (l2 instanceof Response) {
                const t4 = await l2.text();
                if (!t4) return;
                if ((null !== (r2 = null === (i3 = l2.headers) || void 0 === i3 ? void 0 : i3.get("content-type")) && void 0 !== r2 ? r2 : "").includes("application/json")) try {
                  c2 = JSON.parse(t4);
                } catch {
                  c2 = t4;
                }
                else c2 = t4;
              }
              return c2 && "object" == typeof c2 && "output" in c2 ? c2.output : c2;
            }
            async event(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              const { selectedConfigurationId: i3, selectedCredentialId: r2 } = n3;
              if (i3 && !r2) throw new Error("Configuration ID cannot be used without a corresponding Credential ID. Please provide both if using Configuration ID.");
              await this.sendConnectRequest(`/v2/projects/${this.projectId}/sdk/events/trigger`, { method: "POST", headers: { ...r2 ? { [f.SELECTED_CREDENTIAL_ID_HEADER]: r2 } : {}, ...i3 ? { [f.SELECTED_CREDENTIAL_CONFIG_ID_HEADER]: i3 } : {} }, body: JSON.stringify({ name: t3, payload: e3 }), skipDefaultCredentialIdHeader: true, baseURLOverride: this.environments.HERMES_PUBLIC_URL }, false);
            }
            onClose() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              const { integration: n3, apiInstallationOptions: i3 } = this.modalState;
              n3 && (this.triggerSDKEvent({ type: f.SDK_EVENT.ON_PORTAL_CLOSE, integrationId: n3.id, integrationType: (0, l.getIntegrationTypeName)(n3) }), this.originalBodyOverflow !== e2.PARAGON_OVERFLOW_EMPTY_VALUE && (window.document.body.style.overflow = this.originalBodyOverflow, this.originalBodyOverflow = e2.PARAGON_OVERFLOW_EMPTY_VALUE), !t3 && (null == i3 ? void 0 : i3.isApiInstallation) || (this.setModalState({ integration: null }), this.integrationToBeEnabled = void 0));
            }
            onOpen() {
              const { integration: t3 } = this.modalState;
              if (t3 && (this.triggerSDKEvent({ type: f.SDK_EVENT.ON_PORTAL_OPEN, integrationId: t3.id, integrationType: (0, l.getIntegrationTypeName)(t3) }), this.root && this.originalBodyOverflow === e2.PARAGON_OVERFLOW_EMPTY_VALUE)) {
                const t4 = this.root.getBoundingClientRect();
                window.innerHeight <= t4.height && window.innerWidth <= t4.width && (this.originalBodyOverflow = window.document.body.style.overflow, window.document.body.style.overflow = "hidden");
              }
            }
            triggerSDKEvent(t3) {
              this.triggerEvent(t3, this.userState);
            }
            getIntegrationMetadata(t3) {
              const e3 = (t4) => {
                return { ...t4, icon: (e4 = t4.icon, e4.includes(".svg") ? (null === (n3 = e4.split(".svg")) || void 0 === n3 ? void 0 : n3[0]) + ".svg" : e4) };
                var e4, n3;
              };
              if (t3) {
                const n3 = this.metadata[t3];
                if (!n3) throw new Error(`${t3} is not a valid integration name`);
                return e3(n3);
              }
              return (0, h.cloneDeep)(Object.values(this.metadata).map(e3));
            }
            closePortal() {
              this.onClose(true);
            }
            workflow(t3) {
              let { selectedCredentialId: e3, selectedConfigurationId: n3, body: i3 = {}, query: r2 = {}, headers: o2 = {} } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              var s2;
              if (!t3) throw new Error("workflowId is required.");
              const a2 = new URLSearchParams(r2).toString(), { integrationState: l2 } = this.getIntegrationForWorkflow(t3);
              let c2;
              if ((e3 || n3) && (c2 = this.getCredentialAndConfig({ selectedCredentialId: e3, selectedConfigurationId: n3 }, l2, { throwIfMultipleConfigsFound: true }), !c2 || !(null === (s2 = c2.selectedConfig.workflowSettings[t3]) || void 0 === s2 ? void 0 : s2.enabled))) throw new Error(`Workflow ${t3} is not enabled for this user.`);
              return this.sendConnectRequest(`/sdk/triggers/${t3}?${a2}`, { method: "POST", body: JSON.stringify(i3), headers: { ...c2 ? { [f.SELECTED_CREDENTIAL_ID_HEADER]: c2.selectedCredential.id, [f.SELECTED_CREDENTIAL_CONFIG_ID_HEADER]: c2.selectedConfig.id } : {}, ...o2 }, skipDefaultCredentialIdHeader: true, baseURLOverride: this.environments.HERMES_PUBLIC_URL }, true);
            }
            installIntegration(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
              this.closePortal();
              const n3 = { showPortalAfterInstall: false, bypassPostOAuthPrompt: false, allowMultipleCredentials: false, ...e3, isApiInstallation: true };
              if (n3.bypassPostOAuthPrompt && n3.showPortalAfterInstall) throw new Error("Could not use both `bypassPostOAuthPrompt` and `showPortalAfterInstall` as true at the same time.");
              if (this.validateExternalIdOptions(t3, { externalId: e3.externalId, selectedCredentialId: e3.selectedCredentialId }), this.ensureHeadlessIsSupported(), this.validateAction(t3), !n3.allowMultipleCredentials && this.isAlreadyInstalled(t3, this.userState)) throw new Error(`Integration "${t3}" is already installed.`);
              if (e3.showPortalAfterInstall) {
                const e4 = Object.values(this.loadedIntegrations).find(((e5) => (0, l.getIntegrationTypeName)(e5) === t3));
                this.setModalState({ integration: e4, config: this.loadedConfigs[t3], apiInstallationOptions: n3, shouldShowPortalAfterInstall: false });
              } else this.setModalState({ integration: null });
              return this.connect(t3, n3);
            }
            ensureHeadlessIsSupported() {
              if (!this.project.accessibleFeatures.includes(f.ConnectAddOn.HeadlessConnectPortal)) throw new Error("Headless Connect Portal is available on our Pro plan and above. Contact sales@useparagon.com to learn more or upgrade.");
            }
            async uninstallIntegration(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              var n3;
              const i3 = null == e3 ? void 0 : e3.selectedCredentialId;
              if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
              if (this.ensureHeadlessIsSupported(), this.validateAction(t3), !this.hasCredential(t3, this.userState, e3.selectedCredentialId)) throw new g.IntegrationNotInstalledError(t3);
              const r2 = this.loadedIntegrations[t3].id, o2 = this.userState.integrations[t3], s2 = i3 ? null === (n3 = this.getCredentialAndConfig({ selectedCredentialId: i3 }, o2)) || void 0 === n3 ? void 0 : n3.selectedCredential.id : void 0, a2 = null != s2 ? s2 : null == o2 ? void 0 : o2.credentialId;
              if (!a2 || !o2) throw new Error("No credential found for uninstall");
              await this.sendConnectRequest(`/sdk/integrations/${r2}`, { method: "DELETE", headers: { ...a2 ? { [f.SELECTED_CREDENTIAL_ID_HEADER]: a2 } : {} } }), this.updateAuthenticatedUser({ integrations: { ...this.userState.integrations, [t3]: (0, d.getActionStateForCredentialDelete)(a2, o2) } }), i3 === this.modalState.selectedCredentialId && this.setModalState({ integration: null, selectedCredentialId: void 0 }), this.saveState(), this.triggerSDKEvent({ type: f.SDK_EVENT.ON_INTEGRATION_UNINSTALL, integrationId: r2, integrationType: t3 });
            }
            async disableWorkflow(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              var n3;
              const { selectedCredentialId: i3, selectedConfigurationId: r2 } = e3, { integration: o2, integrationState: s2 } = this.getIntegrationForWorkflow(t3), a2 = this.getCredentialAndConfig(i3 || r2 ? { selectedCredentialId: i3, selectedConfigurationId: r2 } : { selectedCredentialId: s2.credentialId }, s2);
              if (!a2 || !(null === (n3 = a2.selectedConfig.workflowSettings[t3]) || void 0 === n3 ? void 0 : n3.enabled)) throw new Error(`Workflow ${t3} cannot be disabled for this user.`);
              const { selectedConfig: l2, selectedCredential: c2 } = a2;
              await this.sendConnectRequest(`/sdk/workflows/${t3}`, { method: "DELETE", headers: { [f.SELECTED_CREDENTIAL_ID_HEADER]: c2.id, [f.SELECTED_CREDENTIAL_CONFIG_ID_HEADER]: l2.id } });
              const d2 = { ...l2, workflowSettings: { ...l2.workflowSettings, [t3]: { settings: {}, ...l2.workflowSettings[t3], enabled: false } } }, u2 = { ...c2, configurations: c2.configurations.filter(((t4) => t4.id !== l2.id)).concat(d2) };
              this.updateCredentialData(u2, o2);
            }
            async enableWorkflow(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              var n3;
              const { selectedCredentialId: i3, selectedConfigurationId: r2 } = e3, { integration: o2, integrationState: a2 } = this.getIntegrationForWorkflow(t3), l2 = this.getCredentialAndConfig(i3 || r2 ? { selectedCredentialId: i3, selectedConfigurationId: r2 } : { selectedCredentialId: a2.credentialId }, a2);
              if (!l2 || (null == l2 ? void 0 : l2.selectedCredential.status) !== s.CredentialStatus.VALID) throw new Error("Valid credential not found for provided options.");
              const { selectedConfig: c2, selectedCredential: d2 } = l2;
              if (null === (n3 = c2.workflowSettings[t3]) || void 0 === n3 ? void 0 : n3.enabled) throw new Error(`Workflow ${t3} is already enabled for this user.`);
              await this.sendConnectRequest(`/sdk/workflows/${t3}`, { method: "POST", headers: { [f.SELECTED_CREDENTIAL_ID_HEADER]: d2.id, [f.SELECTED_CREDENTIAL_CONFIG_ID_HEADER]: c2.id } });
              const u2 = { ...c2, workflowSettings: { ...c2.workflowSettings, [t3]: { settings: {}, ...c2.workflowSettings[t3], enabled: true } } }, h2 = { ...d2, configurations: d2.configurations.filter(((t4) => t4.id !== c2.id)).concat(u2) };
              this.updateCredentialData(h2, o2);
            }
            async getIntegrationAccount(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              var n3;
              this.validateAction(t3);
              const i3 = null === (n3 = this.userState.integrations[t3]) || void 0 === n3 ? void 0 : n3.allCredentials;
              if (!(null == i3 ? void 0 : i3.length)) throw new Error("Connect credential not found");
              const r2 = await this.sendConnectRequest(`/sdk/credentials?integration=${t3}&includeAccountAuth=${e3.includeAccountAuth}`, { method: "GET", headers: e3.selectedCredentialId ? { [f.SELECTED_CREDENTIAL_ID_HEADER]: e3.selectedCredentialId } : {} });
              if (!r2) throw new Error("Integration not connected");
              return r2;
            }
            getIntegrationForWorkflow(t3) {
              if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
              const e3 = Object.values(this.loadedIntegrations).find(((e4) => {
                const n4 = e4.configs[0].values;
                return t3 in (n4.workflowMeta || {});
              }));
              if (!e3) throw new Error("Workflow not found in the configured integrations in your Paragon project.");
              const n3 = (0, l.getIntegrationTypeName)(e3) ? this.userState.integrations[(0, l.getIntegrationTypeName)(e3)] : void 0;
              if (!n3 || !n3.allCredentials.some(((t4) => {
                let { status: e4 } = t4;
                return e4 === s.CredentialStatus.VALID;
              }))) throw new Error(`Integration "${(0, l.getIntegrationTypeName)(e3)}" not enabled for workflow."`);
              return { integration: e3, integrationState: n3 };
            }
            async updateLocalState(t3) {
              var e3, n3;
              const [i3, r2] = await Promise.all([this.fetchUserData(), this.fetchIntegrations()]);
              this.project = i3.project;
              let o2 = { ...i3.integrations };
              if (this.modalState.integration && this.integrationToBeEnabled) {
                const t4 = this.userState.integrations[this.integrationToBeEnabled], i4 = null == t4 ? void 0 : t4.credentialConfigId, r3 = null == t4 ? void 0 : t4.credentialId;
                let s3;
                if (i4) s3 = null === (e3 = o2[this.integrationToBeEnabled]) || void 0 === e3 ? void 0 : e3.allConfigurations.find(((t5) => {
                  let { id: e4 } = t5;
                  return e4 === i4;
                }));
                else if (r3) {
                  const t5 = null === (n3 = o2[this.integrationToBeEnabled]) || void 0 === n3 ? void 0 : n3.allCredentials.find(((t6) => {
                    let { id: e4 } = t6;
                    return e4 === r3;
                  }));
                  s3 = t5 ? t5.configurations.find(((t6) => t6.isDefault)) : void 0;
                }
                s3 && (o2 = { ...o2, [this.integrationToBeEnabled]: { enabled: false, allConfigurations: [], allCredentials: [], ...o2[this.integrationToBeEnabled], credentialId: s3.connectCredentialId, credentialConfigId: s3.id, workflowSettings: s3.workflowSettings, configuredWorkflows: s3.workflowSettings, sharedSettings: s3.sharedSettings, configMeta: s3.configMeta } });
              }
              this.updateAuthenticatedUser({ integrations: o2, meta: i3.meta, resources: i3.resources }), this.updateIntegrations(r2), this.saveState();
              const s2 = { ...i3.meta, ...t3 };
              null != t3 && Object.keys(t3).length > 0 && !(0, I.areObjectsEqual)(s2, i3.meta) && (await this.patchUserMetadata(t3), this.updateAuthenticatedUser({ meta: s2 }));
            }
            async patchUserMetadata(t3) {
              await this.sendConnectRequest("/sdk/me", { method: "PATCH", body: JSON.stringify({ meta: t3 }) });
            }
            async fetchUserData() {
              const t3 = await this.sendConnectRequest("/sdk/me", {});
              if (!t3) throw new Error("Unable to get user Data");
              return { ...t3, integrations: Object.fromEntries(Object.entries(t3.integrations).map(((t4) => {
                let [e3, n3] = t4;
                const i3 = n3.allCredentials.flatMap(((t5) => {
                  let { configurations: e4 } = t5;
                  return e4;
                }));
                return [e3, { ...n3, allConfigurations: i3 }];
              }))) };
            }
            async fetchIntegrations() {
              const t3 = await this.sendConnectRequest("/sdk/integrations");
              if (!t3) throw new Error("Unable to fetch integrations");
              return t3;
            }
            getIntegrationIcon(t3) {
              if (!t3.customIntegration) {
                const e3 = f.overrideActionAlias[t3.type] || t3.type;
                return `${this.environments.CDN_PUBLIC_URL}/integrations/${e3}.svg`;
              }
              return t3.customIntegration.icon ? t3.customIntegration.icon : `${this.environments.CDN_PUBLIC_URL}/images/icons/byo-placeholder.svg`;
            }
            updateIntegrations(t3) {
              t3.forEach(((t4) => {
                var e3;
                if (t4.configs.length) try {
                  const n3 = (0, l.getIntegrationTypeName)(t4);
                  this.loadedConfigs[n3] = t4.configs[0].values, this.loadedIntegrations[n3] = { ...t4, type: t4.type.startsWith("custom.") ? o.ACTION_CUSTOM : t4.type }, Boolean(t4.isActive) && (this.metadata[n3] = { type: n3, name: t4.name, brandColor: t4.brandColor, icon: this.getIntegrationIcon(t4) }), (null === (e3 = this.modalState.integration) || void 0 === e3 ? void 0 : e3.id) === t4.id && this.setModalState({ integration: { ...t4, type: t4.type.startsWith("custom.") ? o.ACTION_CUSTOM : t4.type } });
                } catch (t5) {
                  console.warn(t5);
                }
              }));
            }
            async setUserMetadata(t3) {
              return await this.patchUserMetadata(t3), await this.updateLocalState(), this.render(), this.userState;
            }
            configureGlobal(t3, e3) {
              var n3, i3, r2, o2, s2, a2, l2, c2;
              if (!t3 || !t3.host) throw new Error("host not specified");
              const d2 = t3.host.indexOf("http") > -1 ? new URL(t3.host).hostname : t3.host;
              this.environments.CONNECT_PUBLIC_URL = null !== (n3 = null == e3 ? void 0 : e3.CONNECT_PUBLIC_URL) && void 0 !== n3 ? n3 : (0, S.getServiceUrl)("connect", d2), this.environments.DASHBOARD_PUBLIC_URL = null !== (i3 = null == e3 ? void 0 : e3.DASHBOARD_PUBLIC_URL) && void 0 !== i3 ? i3 : (0, S.getServiceUrl)("dashboard", d2), this.environments.HERMES_PUBLIC_URL = null !== (r2 = null == e3 ? void 0 : e3.HERMES_PUBLIC_URL) && void 0 !== r2 ? r2 : (0, S.getServiceUrl)("hermes", d2), this.environments.PASSPORT_PRODUCTION_URL = null !== (o2 = null == e3 ? void 0 : e3.PASSPORT_PRODUCTION_URL) && void 0 !== o2 ? o2 : (0, S.getServiceUrl)("passport", d2), this.environments.PASSPORT_PUBLIC_URL = null !== (s2 = null == e3 ? void 0 : e3.PASSPORT_PUBLIC_URL) && void 0 !== s2 ? s2 : (0, S.getServiceUrl)("passport", d2), this.environments.ZEUS_PUBLIC_URL = null !== (a2 = null == e3 ? void 0 : e3.ZEUS_PUBLIC_URL) && void 0 !== a2 ? a2 : (0, S.getServiceUrl)("zeus", d2), this.environments.CDN_PUBLIC_URL = null !== (l2 = null == e3 ? void 0 : e3.CDN_PUBLIC_URL) && void 0 !== l2 ? l2 : (0, S.getServiceUrl)("dashboard", d2), this.environments.WORKER_PROXY_PUBLIC_URL = null !== (c2 = null == e3 ? void 0 : e3.WORKER_PROXY_PUBLIC_URL) && void 0 !== c2 ? c2 : (0, S.getServiceUrl)("worker-proxy", d2), this.userState.authenticated = false, this.root ? this.root.src = `${this.environments.CONNECT_PUBLIC_URL}/ui${this.projectId ? `?projectId=${this.projectId}` : ""}` : console.error("Root element not defined");
            }
            async completeInstall(t3, e3) {
              var n3;
              if (!this.userState.authenticated) throw new Error("Authentication is required");
              if (!e3 || !e3.authorizationCode) throw new Error("authorizationCode is required");
              if (e3.redirectUrl && !(0, S.isValidUrl)(e3.redirectUrl)) throw new Error(`${e3.redirectUrl} is not valid url`);
              this.validateAction(t3);
              const i3 = Object.values(this.loadedIntegrations).find(((e4) => (0, l.getIntegrationTypeName)(e4) === t3)), r2 = null === (n3 = e3.showPortalAfterInstall) || void 0 === n3 || n3, o2 = await this.sendConnectRequest("/sdk/credentials", { method: "POST", body: JSON.stringify({ code: e3.authorizationCode, integrationId: i3.id, redirectUrl: e3.redirectUrl ? (0, S.sanitizeUrl)(e3.redirectUrl) : void 0, integrationOptions: e3.integrationOptions || {} }) });
              if (!o2) throw new Error("Unable to create credential");
              this.updateCredentialData(o2, i3), r2 && this.setModalState({ integration: i3, config: this.loadedConfigs[t3], apiInstallationOptions: {} });
            }
            updateCredentialData(t3, e3) {
              var n3;
              const i3 = this.userState, r2 = (0, l.getIntegrationTypeName)(e3), o2 = i3.integrations[r2], a2 = o2.allCredentials.findIndex(((e4) => {
                let { id: n4 } = e4;
                return n4 === t3.id;
              }));
              a2 > -1 ? o2.allCredentials[a2] = t3 : o2.allCredentials.push(t3);
              const c2 = Object.values(null !== (n3 = o2.allConfigurations) && void 0 !== n3 ? n3 : []).filter(((e4) => {
                let { connectCredentialId: n4 } = e4;
                return n4 !== t3.id;
              })).concat(t3.configurations);
              if (!(-1 === a2 || t3.id === o2.credentialId || !(!o2.credentialConfigId || !t3.configurations.some(((t4) => t4.id === o2.credentialConfigId))))) return this.updateAuthenticatedUser({ integrations: { ...i3.integrations, [r2]: { ...o2, allConfigurations: c2 } } }), void this.saveState();
              const d2 = o2.credentialConfigId ? t3.configurations.find(((t4) => o2.credentialConfigId === t4.id)) : t3.configurations[0];
              this.updateAuthenticatedUser({ integrations: { ...i3.integrations, [r2]: { ...o2, allConfigurations: c2, credentialStatus: t3.status, enabled: t3.status === s.CredentialStatus.VALID, credentialId: t3.id, providerId: t3.providerId, providerData: t3.providerData, configMeta: null == d2 ? void 0 : d2.configMeta, credentialConfigId: null == d2 ? void 0 : d2.id, externalId: null == d2 ? void 0 : d2.externalId, sharedSettings: null == d2 ? void 0 : d2.sharedSettings, workflowSettings: null == d2 ? void 0 : d2.workflowSettings, configuredWorkflows: null == d2 ? void 0 : d2.workflowSettings } } }), this.saveState();
            }
            async connectAction(t3, e3) {
              var n3;
              if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
              const i3 = null === (n3 = this.userState.resources.find(((e4) => t3 === e4.slug))) || void 0 === n3 ? void 0 : n3.id;
              if (!i3) throw new Error(`No resource found with name "${t3}".`);
              if (!e3 || "object" != typeof e3) throw new Error("payload must be of type object.");
              const r2 = await this.sendConnectRequest(`/sdk/resources/${i3}/connect`, { method: "POST", body: JSON.stringify(e3) });
              if (!r2) throw new Error(`Unable to connect to "${t3}".`);
              return r2;
            }
            async createConfiguration(t3) {
              let { credentialId: e3, externalId: n3 } = t3;
              var i3, r2;
              if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
              if (!e3) throw new Error('Required options not provided: "credentialId"');
              if (void 0 !== n3 && "" === (0, v.sanitizeExternalConfigId)(n3)) throw new Error("`externalId` must not be an empty or whitespace-only string.");
              const o2 = this.getCredentialAndConfig({ selectedCredentialId: e3 });
              if (!o2 || (null == o2 ? void 0 : o2.selectedCredential.status) !== s.CredentialStatus.VALID) throw new Error("Valid credential not found for provided options.");
              const a2 = await this.sendConnectRequest(`/sdk/credentials/${e3}/configurations`, { method: "POST", body: JSON.stringify(n3 ? { externalId: n3 } : {}) });
              if (!a2) throw new Error("Unable to create a configuration for credential.");
              const l2 = Object.keys(this.userState.integrations).find(((t4) => {
                var e4;
                return null === (e4 = this.userState.integrations[t4]) || void 0 === e4 ? void 0 : e4.allCredentials.find(((t5) => {
                  let { id: e5 } = t5;
                  return e5 === a2.id;
                }));
              }));
              if (l2) {
                const t4 = null === (i3 = this.userState.integrations[l2]) || void 0 === i3 ? void 0 : i3.allConfigurations.filter(((t5) => {
                  let { connectCredentialId: e5 } = t5;
                  return e5 !== a2.id;
                })).concat(a2.configurations), e4 = null === (r2 = this.userState.integrations[l2]) || void 0 === r2 ? void 0 : r2.allCredentials.map(((t5) => t5.id === a2.id ? a2 : t5)), n4 = { ...this.userState.integrations, [l2]: { enabled: false, ...this.userState.integrations[l2], allConfigurations: t4 || [], allCredentials: e4 || [] } };
                this.updateAuthenticatedUser({ integrations: n4 });
              }
              return [...a2.configurations].sort(((t4, e4) => new Date(e4.dateCreated).getTime() - new Date(t4.dateCreated).getTime()))[0];
            }
            async destroyConfiguration(t3) {
              let { id: e3, credentialId: n3 } = t3;
              var i3, r2, o2, s2;
              if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
              if (!(null == e3 ? void 0 : e3.trim()) || !(null == n3 ? void 0 : n3.trim())) throw new Error("One or more required options not provided.");
              const a2 = this.getCredentialAndConfig({ selectedConfigurationId: e3, selectedCredentialId: n3 });
              if (!a2) throw new Error(`Unable to find credential for configuration: ${e3}.`);
              if (a2.selectedConfig.isDefault) throw new Error("Cannot delete default configuration.");
              await this.sendConnectRequest(`/sdk/credentials/${a2.selectedCredential.id}/configurations`, { method: "DELETE", headers: { [f.SELECTED_CREDENTIAL_ID_HEADER]: null == a2 ? void 0 : a2.selectedCredential.id, [f.SELECTED_CREDENTIAL_CONFIG_ID_HEADER]: null == a2 ? void 0 : a2.selectedConfig.id } });
              const l2 = Object.keys(this.userState.integrations).find(((t4) => {
                var e4;
                return null === (e4 = this.userState.integrations[t4]) || void 0 === e4 ? void 0 : e4.allCredentials.find(((t5) => {
                  let { id: e5 } = t5;
                  return e5 === a2.selectedCredential.id;
                }));
              }));
              if (l2) {
                const { selectedConfig: t4, selectedCredential: e4 } = a2, n4 = null === (i3 = this.userState.integrations[l2]) || void 0 === i3 ? void 0 : i3.allConfigurations.filter(((e5) => {
                  let { id: n5 } = e5;
                  return n5 !== t4.id;
                })), c2 = null === (r2 = this.userState.integrations[l2]) || void 0 === r2 ? void 0 : r2.allCredentials.map(((n5) => n5.id !== e4.id ? n5 : { ...n5, configurations: n5.configurations.filter(((e5) => {
                  let { id: n6 } = e5;
                  return n6 !== t4.id;
                })) })), d2 = { ...this.userState.integrations, [l2]: { enabled: false, ...this.userState.integrations[l2], allConfigurations: n4 || [], allCredentials: c2 || [] } };
                this.updateAuthenticatedUser({ integrations: d2 }), (null === (o2 = this.userState.integrations[l2]) || void 0 === o2 ? void 0 : o2.credentialId) === e4.id && (null === (s2 = this.userState.integrations[l2]) || void 0 === s2 ? void 0 : s2.credentialConfigId) === t4.id && this.closePortal();
              }
            }
            async updateConfiguration(t3) {
              let { id: e3, credentialId: n3, meta: i3 = {} } = t3;
              var r2, o2;
              if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
              if (!(null == e3 ? void 0 : e3.trim()) || !(null == n3 ? void 0 : n3.trim())) throw new Error("One or more required options not provided.");
              const s2 = this.getCredentialAndConfig({ selectedConfigurationId: e3, selectedCredentialId: n3 });
              if (!(null == s2 ? void 0 : s2.selectedConfig)) throw new Error(`Cannot find credential configuration with given id: "${e3}"`);
              const a2 = await this.sendConnectRequest(`/sdk/credentials/${s2.selectedConfig.connectCredentialId}/configurations`, { method: "PATCH", body: JSON.stringify({ meta: i3 }), headers: { [f.SELECTED_CREDENTIAL_ID_HEADER]: s2.selectedCredential.id, [f.SELECTED_CREDENTIAL_CONFIG_ID_HEADER]: s2.selectedConfig.id } });
              if (!a2) throw new Error("Unable to update configuration.");
              const l2 = Object.keys(this.userState.integrations).find(((t4) => {
                var e4;
                return null === (e4 = this.userState.integrations[t4]) || void 0 === e4 ? void 0 : e4.allCredentials.find(((t5) => {
                  let { id: e5 } = t5;
                  return e5 === a2.id;
                }));
              }));
              if (l2) {
                const t4 = null === (r2 = this.userState.integrations[l2]) || void 0 === r2 ? void 0 : r2.allConfigurations.filter(((t5) => {
                  let { connectCredentialId: e5 } = t5;
                  return e5 !== a2.id;
                })).concat(a2.configurations), e4 = null === (o2 = this.userState.integrations[l2]) || void 0 === o2 ? void 0 : o2.allCredentials.map(((t5) => t5.id === a2.id ? a2 : t5)), n4 = { ...this.userState.integrations, [l2]: { enabled: false, ...this.userState.integrations[l2], allConfigurations: t4 || [], allCredentials: e4 || [] } };
                this.updateAuthenticatedUser({ integrations: n4 });
              }
              const c2 = a2.configurations.find(((t4) => {
                let { id: e4 } = t4;
                return e4 === s2.selectedConfig.id;
              }));
              return c2;
            }
            async pollForCredential(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              var i3, r2, o2;
              const a2 = Date.now(), l2 = async () => {
                try {
                  return await this.sendConnectRequest(`/sdk/actions/session-id/${e3}`, { method: "GET" });
                } catch (t4) {
                  return console.error("error", t4), null;
                }
              };
              try {
                const e4 = await (0, I.tryUntil)(l2, ((t4, e5) => {
                  var i4;
                  return !(null === (i4 = n3.abortSignal) || void 0 === i4 ? void 0 : i4.aborted) && !(Date.now() - a2 >= u.MAX_POLL_DURATION || (null == t4 ? void 0 : t4.connectCredentialId));
                }), 1e3);
                if (!e4 || !e4.connectCredentialId) return;
                const c2 = null === (i3 = this.userState.integrations[t3]) || void 0 === i3 ? void 0 : i3.allCredentials.find(((t4) => t4.id === e4.connectCredentialId)), d2 = this.getIntegrationByName(t3);
                if (c2 && c2.status === s.CredentialStatus.VALID) return this.triggerSDKEvent({ type: f.SDK_EVENT.ON_INTEGRATION_INSTALL, integrationId: d2.id, integrationType: t3 }), void (null === (r2 = n3.onSuccess) || void 0 === r2 || r2.call(n3, { integrationId: d2.id, integrationType: t3, credentialId: e4.connectCredentialId, credential: c2 }));
                const h2 = await this.sendConnectRequest(`/sdk/credentials/${e4.connectCredentialId}`, { method: "GET" });
                if (!h2) return;
                this.updateCredentialData(h2, this.loadedIntegrations[t3]), h2.status === s.CredentialStatus.VALID && this.triggerSDKEvent({ type: f.SDK_EVENT.ON_INTEGRATION_INSTALL, integrationId: d2.id, integrationType: t3 }), null === (o2 = n3.onSuccess) || void 0 === o2 || o2.call(n3, { integrationId: d2.id, integrationType: t3, credentialId: e4.connectCredentialId, credential: h2 });
              } catch (t4) {
                n3.onError && n3.onError(t4);
              } finally {
                await this.sendConnectRequest(`/sdk/actions/session-id/${e3}`, { method: "DELETE" });
              }
            }
            async getCustomWebhookUserManualUrl(t3, e3) {
              var n3;
              const i3 = this.userState;
              if (!i3.authenticated) throw new g.UserNotAuthenticatedError();
              const { workflow: r2, type: o2 } = Object.values(this.loadedIntegrations).reduce(((e4, n4) => {
                if (e4.workflow) return e4;
                const i4 = n4.workflows.find(((e5) => e5.id === t3));
                return i4 ? { workflow: i4, type: n4.type } : e4;
              }), { workflow: void 0, type: void 0 });
              if (!r2) throw new Error(`Unable to get workflow for "${t3}".`);
              if (!o2) throw new Error(`Unable to get integration type for "${t3}".`);
              let s2 = r2.integrationId, a2 = null != e3 ? e3 : null === (n3 = i3.integrations[o2]) || void 0 === n3 ? void 0 : n3.credentialId;
              if (r2.resourceId) {
                const t4 = i3.resources.find(((t5) => t5.id === r2.resourceId));
                s2 = null == t4 ? void 0 : t4.integrationId, a2 = null == t4 ? void 0 : t4.credentialId;
              }
              if (!s2) throw new Error(`Unable to find integrationId for "${t3}".`);
              if (!a2) throw new Error(`Unable to find credentialId for "${t3}".`);
              return `${this.environments.HERMES_PUBLIC_URL}/triggers/connect/${this.projectId}/${s2}/custom-triggers/${r2.customWebhookTriggerId}?id=${a2}`;
            }
            getIntegrationConfig(t3) {
              var e3, n3;
              if (!t3) throw new Error("Integration is required.");
              const i3 = this.loadedIntegrations[t3], r2 = (0, h.cloneDeep)(i3.configs[0].values), o2 = [], s2 = [], a2 = new Map(i3.workflows.map(((t4) => [t4.id, t4]))), l2 = null !== (e3 = i3.noPermissionWorkflows) && void 0 !== e3 ? e3 : [];
              return Object.values(r2.workflowMeta || {}).map(((t4) => {
                var e4;
                if (!a2.has(t4.id) && !l2.includes(t4.id)) return;
                const n4 = null === (e4 = a2.get(t4.id)) || void 0 === e4 ? void 0 : e4.description;
                t4.hidden || t4.permissions && l2.includes(t4.id) ? o2.push({ ...t4, description: n4 }) : s2.push({ ...t4, description: n4 });
              })), { shortDescription: r2.description, longDescription: r2.overview, availableUserSettings: null === (n3 = r2.sharedMeta) || void 0 === n3 ? void 0 : n3.inputs, availableWorkflows: s2, hiddenWorkflows: o2 };
            }
            getCredentialPair(t3, e3) {
              const n3 = this.userState;
              if (!n3.authenticated) throw new g.UserNotAuthenticatedError();
              const i3 = n3.integrations[t3];
              if (!i3) throw new g.IntegrationNotFoundError(t3);
              const r2 = (null == e3 ? void 0 : e3.selectedCredentialId) || i3.credentialId;
              if (!r2) throw new Error("Credential not found");
              const o2 = i3.allCredentials.find(((t4) => t4.id === r2));
              if (!o2) throw new Error("Credential not found");
              if (o2.status !== s.CredentialStatus.VALID) throw new Error("Valid credential not found for provided options.");
              const a2 = o2.configurations.find(((t4) => (null == e3 ? void 0 : e3.selectedConfigurationId) ? t4.id === e3.selectedConfigurationId : t4.isDefault));
              if (!a2) throw new Error("Configuration not found");
              return { selectedCredential: o2, selectedConfiguration: a2 };
            }
            async updateConfig(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
              this.validateAction(t3);
              const { selectedConfiguration: i3, selectedCredential: r2 } = this.getCredentialPair(t3, n3), o2 = this.userState.token, s2 = await this.sendConnectRequest(`/sdk/credentials/${r2.id}`, { method: "PATCH", headers: { Authorization: `Bearer ${o2}`, [f.SELECTED_CREDENTIAL_ID_HEADER]: r2.id, [f.SELECTED_CREDENTIAL_CONFIG_ID_HEADER]: i3.id }, body: JSON.stringify({ config: e3 }) });
              if (!s2) throw new Error(`Failed to update settings for ${t3}.`);
              const a2 = this.loadedIntegrations[t3];
              return this.updateCredentialData(s2, a2), s2;
            }
            async updateIntegrationUserSettings(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
              const { selectedConfiguration: i3 } = this.getCredentialPair(t3, n3), r2 = i3.sharedSettings, o2 = await this.updateConfig(t3, { sharedSettings: { ...r2, ...e3 } }, n3);
              return { userState: this.userState, errors: "errors" in o2 ? o2.errors : [] };
            }
            async updateWorkflowUserSettings(t3, e3, n3) {
              let i3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
              if (!this.userState.authenticated) throw new g.UserNotAuthenticatedError();
              const { selectedConfiguration: r2 } = this.getCredentialPair(t3, i3), o2 = (0, h.cloneDeep)(r2.workflowSettings), s2 = null == o2 ? void 0 : o2[e3];
              if (!s2) throw new Error(`Workflow with ID "${e3}" was not found in the current configuration.`);
              for (const t4 in n3) s2.settings[t4] = n3[t4];
              const a2 = await this.updateConfig(t3, { workflowSettings: o2 }, i3);
              return { userState: this.userState, errors: "errors" in a2 ? a2.errors : [] };
            }
            async updateWorkflowState(t3, e3) {
              const n3 = [];
              for (const [i3, r2] of Object.entries(t3)) try {
                r2 ? await this.enableWorkflow(i3, e3) : await this.disableWorkflow(i3, e3);
              } catch (t4) {
                n3.push({ workflowId: i3, message: t4.message });
              }
              return { user: this.getUser(), errors: n3 };
            }
            async getFieldOptions(t3) {
              let { integration: e3, action: n3, source: i3, search: r2, cursor: o2, parameters: s2 = [], selectedCredentialId: a2 } = t3;
              var l2;
              this.validateAction(e3);
              const c2 = null != n3 ? n3 : null == i3 ? void 0 : i3.cacheKey;
              if (!c2) throw new Error('Either "action" or a "source" with a cacheKey must be provided.');
              if (this.hasCustomDropdownLoader(c2)) {
                const t4 = await this._loadCustomDropdownOptions(c2, "string" == typeof o2 ? o2 : void 0, r2);
                return { data: t4.options, nestedData: [], nextPageCursor: t4.nextPageCursor };
              }
              if (i3 && "dynamicFieldMappingKey" in i3) {
                const { dynamicFieldMappingKey: t4, dynamicFieldMappingType: n4 } = i3, a3 = null === (l2 = s2.find(((t5) => "value" in t5.source && t5.source.value))) || void 0 === l2 ? void 0 : l2.source, c3 = null == a3 ? void 0 : a3.value, d3 = await this._fetchBYOFieldMappingOptions(e3, n4, t4, { objectType: c3, cursor: "string" == typeof o2 ? o2 : void 0, search: r2 });
                return { data: d3.options, nestedData: [], nextPageCursor: d3.nextPageCursor };
              }
              const d2 = await this.sendConnectRequest("/sdk/actions", { method: "POST", body: JSON.stringify({ action: e3, sourceKey: c2, parameters: s2, paginationParameters: { pageCursor: null != o2 ? o2 : 0, search: r2 } }), headers: { ...a2 ? { [f.SELECTED_CREDENTIAL_ID_HEADER]: a2 } : {} } });
              let u2 = [], h2 = [];
              const p2 = d2.output.records || d2.output;
              return p2[0] && "id" in p2[0] ? h2 = p2 : u2 = p2, { data: u2, nestedData: h2, nextPageCursor: d2.output.nextPageCursor || null };
            }
            async getDataSourceOptions(t3, e3) {
              var n3;
              const i3 = this.getIntegrationByName(t3);
              return (0, h.cloneDeep)(null === (n3 = i3.sdkIntegrationConfig) || void 0 === n3 ? void 0 : n3.dataSources[e3]);
            }
            getSourcesForInput(t3, e3) {
              var n3, i3;
              if (e3.type === f.SidebarInputType.CustomDropdown) {
                const { customDropdownOptions: n4, title: i4, key: r3 } = e3, o3 = this.resolveCustomDropdownSource(r3, t3);
                return o3 ? { kind: "single", source: { type: f.DataSourceType.STATIC_ENUM, title: null != i4 ? i4 : "", id: null != r3 ? r3 : "", values: o3 } } : this.hasCustomDropdownLoader(r3) ? { kind: "single", source: { type: f.DataSourceType.DYNAMIC, title: null != i4 ? i4 : "", cacheKey: null != r3 ? r3 : "", refreshDependencies: [], mapRefreshToValues: (t4) => t4, getRefreshActionParameters: () => ({}) } } : (null == n4 ? void 0 : n4.length) ? { kind: "single", source: { type: f.DataSourceType.STATIC_ENUM, title: null != i4 ? i4 : "", id: null != r3 ? r3 : "", values: n4 } } : (r3 && console.error(`No dynamic fields were provided for dropdown key "${r3}" for the input "${i4}"`), null);
              }
              if (!("sourceType" in e3) || !e3.sourceType) return null;
              let r2;
              try {
                r2 = this.getIntegrationByName(t3);
              } catch {
                return null;
              }
              const o2 = null === (n3 = r2.sdkIntegrationConfig) || void 0 === n3 ? void 0 : n3.dataSources[e3.sourceType];
              if (!o2) return null;
              if (o2.type === f.DataSourceType.DYNAMIC) return { kind: "single", source: o2 };
              if (o2.type === f.DataSourceType.FIELD_MAPPER) {
                const { recordSource: n4, fieldSource: r3, dependentInputSource: s2, dependentFieldInputSource: a2 } = o2, l2 = e3, c2 = this.resolveMapObjectFieldSource(l2.dynamicObjectName, t3);
                l2.dynamicObjectName && !c2 && console.error(`No dynamic fields were provided by Object Name key "${l2.dynamicObjectName}" for the input "${null !== (i3 = e3.title) && void 0 !== i3 ? i3 : "Field Mapping"}"`);
                const d2 = c2 && !Array.isArray(c2) && c2.useBYOFieldMappingOption, u2 = l2.dynamicObjectName;
                return { kind: "fieldMapper", recordSource: d2 && u2 ? { ...n4, dynamicFieldMappingKey: u2, dynamicFieldMappingType: f.DynamicFieldMappingLoaderType.OBJECT_TYPES } : n4, fieldSource: d2 && u2 ? { ...r3, dynamicFieldMappingKey: u2, dynamicFieldMappingType: f.DynamicFieldMappingLoaderType.INTEGRATION_FIELDS } : r3, ...!d2 && s2 && { dependentInputSource: s2 }, ...!d2 && a2 && { dependentFieldInputSource: a2 }, ...c2 && { mapObjectFieldOptions: c2 } };
              }
              if (o2.type === f.DataSourceType.COMBO_INPUT) {
                const { mainInputSource: t4, dependentInputSource: e4 } = o2;
                return { kind: "combo", mainInputSource: t4, dependentInputSource: e4 };
              }
              if (o2.type === f.DataSourceType.DYNAMIC_COMBO_INPUT) {
                const { mainInputSource: t4, dependentInputSource: e4, variableInputSource: n4 } = o2;
                return { kind: "defaultFieldValue", mainInputSource: t4, dependentInputSource: e4, ...n4 && { variableInputSource: n4 } };
              }
              return null;
            }
            getAccountTypeOptions(t3) {
              var e3, n3, i3;
              const r2 = this.getIntegrationBySlug(t3);
              return null !== (i3 = (0, h.cloneDeep)(null !== (n3 = null === (e3 = r2.sdkIntegrationConfig) || void 0 === e3 ? void 0 : e3.accountTypes) && void 0 !== n3 ? n3 : [])) && void 0 !== i3 ? i3 : [];
            }
            getPreOptions(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "default";
              var n3, i3, r2, o2;
              const s2 = (0, h.cloneDeep)(this.getIntegrationBySlug(t3));
              if (s2.customIntegration) return s2.authenticationType === a.AuthenticationScheme.OAUTH_CLIENT_CREDENTIAL ? (0, h.cloneDeep)(b) : null !== (n3 = s2.customIntegration.inputFields) && void 0 !== n3 ? n3 : [];
              const l2 = this.getAccountTypeOptions(t3);
              if (null == l2 ? void 0 : l2.length) {
                const t4 = null == l2 ? void 0 : l2.find(((t5) => t5.id === e3));
                if (null === (i3 = null == t4 ? void 0 : t4.endUserSuppliedValues) || void 0 === i3 ? void 0 : i3.length) return (0, h.cloneDeep)(t4.endUserSuppliedValues);
              }
              return (null === (o2 = null === (r2 = s2.sdkIntegrationConfig) || void 0 === r2 ? void 0 : r2.authConfigInputs) || void 0 === o2 ? void 0 : o2.length) ? s2.sdkIntegrationConfig.authConfigInputs : [];
            }
            getPostOptions(t3) {
              var e3, n3;
              const i3 = this.getIntegrationBySlug(t3);
              return null !== (n3 = (0, h.cloneDeep)(null === (e3 = i3.sdkIntegrationConfig) || void 0 === e3 ? void 0 : e3.postOauthInputs)) && void 0 !== n3 ? n3 : [];
            }
            async _fetchBYOFieldMappingOptions(t3, e3, n3, i3) {
              var r2, o2, s2;
              const a2 = null !== (o2 = null === (r2 = this.dynamicFieldMappingLoaders[t3]) || void 0 === r2 ? void 0 : r2[n3]) && void 0 !== o2 ? o2 : null === (s2 = this.dynamicFieldMappingLoaders.__global__) || void 0 === s2 ? void 0 : s2[n3];
              if (!a2) throw new Error(`No dynamic field mapping loader found for key: ${n3}`);
              if (e3 === f.DynamicFieldMappingLoaderType.OBJECT_TYPES) return await a2.objectTypes(null == i3 ? void 0 : i3.cursor, null == i3 ? void 0 : i3.search);
              if (e3 === f.DynamicFieldMappingLoaderType.INTEGRATION_FIELDS) {
                if (!(null == i3 ? void 0 : i3.objectType)) throw new Error("objectType is required for integrationFields");
                return await a2.integrationFields({ objectType: i3.objectType }, i3.cursor, i3.search);
              }
              throw new Error(`Invalid type: ${e3}. Must be 'objectTypes' or 'integrationFields'`);
            }
          }
          e2.default = O;
          class A {
            constructor(t3) {
              this.paragon = t3, this.startOptions = null, this.integrationName = null, this.accountTypeValue = null, this.preOptionsValue = null, this.postOptionsValue = null, this.credentialId = null, this.hasFinishedInstruction = false;
            }
            start(t3) {
              let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              this.asyncStart(t3, e3).catch(((t4) => {
                this.handleError(t4);
              }));
            }
            async cancel() {
              this.startOptions = null, this.accountTypeValue = null, this.preOptionsValue = null, this.postOptionsValue = null, this.hasFinishedInstruction = false;
              try {
                if (this.credentialId && this.integrationName && await this.paragon.uninstallIntegration(this.integrationName, { selectedCredentialId: this.credentialId }), !this.credentialId && !this.integrationName) {
                  const t3 = new g.NoActiveInstallFlowError();
                  console.warn(t3.message);
                }
              } catch (t3) {
                console.error("Error cancelling the current install flow", { credentialId: this.credentialId, integration: this.integrationName }, t3);
              } finally {
                this.integrationName = null, this.credentialId = null;
              }
            }
            getInstallOptions() {
              var t3, e3, n3, i3, r2, o2, s2, a2;
              return { allowMultipleCredentials: null !== (e3 = null === (t3 = this.startOptions) || void 0 === t3 ? void 0 : t3.allowMultipleCredentials) && void 0 !== e3 && e3, overrideRedirectUrl: null !== (i3 = null === (n3 = this.startOptions) || void 0 === n3 ? void 0 : n3.overrideRedirectUrl) && void 0 !== i3 ? i3 : void 0, selectedCredentialId: null !== (o2 = null === (r2 = this.startOptions) || void 0 === r2 ? void 0 : r2.selectedCredentialId) && void 0 !== o2 ? o2 : void 0, externalId: null !== (a2 = null === (s2 = this.startOptions) || void 0 === s2 ? void 0 : s2.externalId) && void 0 !== a2 ? a2 : void 0 };
            }
            async asyncStart(t3, e3) {
              if (this.startOptions = e3, this.integrationName = t3, this.accountTypeValue = null, this.preOptionsValue = null, this.postOptionsValue = null, this.credentialId = null, !this.paragon.isHeadless) throw new g.HeadlessModeNotEnabledError();
              const n3 = this.next();
              if ("oauth" === n3.stage) return this.handleNext(n3), this.handleOAuth();
              this.handleNext(n3);
            }
            handleError(t3, e3) {
              var n3, i3;
              const r2 = (0, g.getConnectSDKError)(t3);
              null === (i3 = null === (n3 = this.startOptions) || void 0 === n3 ? void 0 : n3.onError) || void 0 === i3 || i3.call(n3, r2, null != e3 ? e3 : null);
            }
            handleNext(t3) {
              var e3, n3;
              null === (n3 = null === (e3 = this.startOptions) || void 0 === e3 ? void 0 : e3.onNext) || void 0 === n3 || n3.call(e3, t3);
            }
            handleComplete(t3) {
              var e3, n3;
              null === (n3 = null === (e3 = this.startOptions) || void 0 === e3 ? void 0 : e3.onComplete) || void 0 === n3 || n3.call(e3, t3);
            }
            getScheme() {
              var t3, e3;
              if (null === this.integrationName) return null;
              if (!this.accountTypeValue) return null !== (t3 = this.paragon.getIntegrationBySlug(this.integrationName).authenticationType) && void 0 !== t3 ? t3 : null;
              const n3 = this.getSelectedAccountTypeOption();
              return null !== (e3 = null == n3 ? void 0 : n3.scheme) && void 0 !== e3 ? e3 : null;
            }
            getIntegrationName() {
              if (!this.integrationName) throw new g.NoActiveInstallFlowError();
              return this.integrationName;
            }
            getSelectedAccountTypeOption() {
              var t3;
              return null === (t3 = this.paragon.getAccountTypeOptions(this.getIntegrationName())) || void 0 === t3 ? void 0 : t3.find(((t4) => t4.id === this.accountTypeValue));
            }
            requiresAccountType() {
              const t3 = this.paragon.getAccountTypeOptions(this.getIntegrationName());
              return !(!t3 || 0 === t3.length) && !this.accountTypeValue;
            }
            getIntegrationInstructionMetadata() {
              var t3, e3;
              if (null === this.integrationName) return null;
              if (!this.accountTypeValue || "user-configured-oauth" === this.accountTypeValue) return null;
              const n3 = this.paragon.getIntegrationBySlug(this.integrationName);
              if ("salesforce" !== n3.type) return null;
              let i3 = null === (e3 = null === (t3 = n3.sdkIntegrationConfig) || void 0 === t3 ? void 0 : t3.authSchemeOptions) || void 0 === e3 ? void 0 : e3.packageInstallUrl;
              if (!i3) return null;
              const r2 = "login.salesforce.com/packaging/installPackage.apexp", o2 = "https://" + r2, s2 = "appexchange.salesforce.com/appxListingDetail", a2 = "https://" + s2, l2 = i3.startsWith(o2) || i3.startsWith(r2), c2 = i3.startsWith(a2) || i3.startsWith(s2);
              if (!l2 && !c2) return null;
              "sandbox" !== this.accountTypeValue || c2 || (i3 = i3.replace("login.salesforce.com", "test.salesforce.com"));
              const d2 = this.getSalesforceInstructionMetadata(this.accountTypeValue, c2, i3);
              if (!d2) return null;
              return { ...d2, packageInstallUrl: i3 };
            }
            getSalesforceInstructionMetadata(t3, e3, n3) {
              const i3 = "sandbox" === t3, r2 = e3 ? "Install App" : "Install Package", o2 = e3 ? "You'll need an admin to add this app from AppExchange to your Salesforce org to continue authorizing your account." : "You'll need an admin to install a package to your Salesforce org to continue authorizing your account.", s2 = e3 ? `From AppExchange, click ${i3 ? "Try It" : "Get It Now"} and follow the prompts to add the app to your ${i3 ? "Sandbox" : "Production"} environment.` : 'In the install prompt, choose "Install for All Users" if Salesforce users in your org other than your admin will also connect their accounts to this integration.', a2 = e3 ? i3 ? "salesforce-install-app-sandbox" : "salesforce-install-app-default" : "salesforce-install-package", l2 = e3 ? "Go to AppExchange" : "Install";
              return { content: (0, E.dedent)(`
      ## ${r2}

      ${o2}

      ![Install Image](${this.paragon.getAssetUrl(a2)} "Install Image")

      ${s2}
    `), ctas: [{ type: "link", label: l2, href: n3 }, { type: "copyButton", label: "Copy link", copyText: n3 }], finish: { type: "finishButton", label: "I've installed the package", onClick: () => {
                this.setHasFinishedInstruction();
              } } };
            }
            requiresInstruction() {
              if (this.hasFinishedInstruction) return [false, null];
              const t3 = this.getIntegrationInstructionMetadata();
              return null === t3 ? [false, null] : [true, t3];
            }
            requiresPreOptions() {
              var t3;
              const e3 = this.paragon.getPreOptions(this.getIntegrationName(), null !== (t3 = this.accountTypeValue) && void 0 !== t3 ? t3 : void 0);
              return !(!e3 || 0 === e3.length) && !this.preOptionsValue;
            }
            requiresPostOptions() {
              var t3, e3;
              if (null !== (e3 = null === (t3 = this.getSelectedAccountTypeOption()) || void 0 === t3 ? void 0 : t3.skipPostOAuthInputs) && void 0 !== e3 && e3) return false;
              const n3 = this.paragon.getPostOptions(this.getIntegrationName());
              return !(!n3 || 0 === n3.length) && !this.postOptionsValue;
            }
            requiresOAuth() {
              return this.getScheme() === a.AuthenticationScheme.OAUTH && !this.credentialId;
            }
            async handleOAuth() {
              let { accountType: t3, endUserSuppliedValues: e3 } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              const n3 = null != t3 ? t3 : this.accountTypeValue, i3 = this.getInstallOptions();
              try {
                const t4 = await new Promise(((t5, r3) => {
                  var o2;
                  this.paragon.startOAuthFlow(this.getIntegrationName(), { accountType: null != n3 ? n3 : void 0, endUserSuppliedValues: e3, allowMultipleCredentials: i3.allowMultipleCredentials, selectedCredentialId: i3.selectedCredentialId, externalId: i3.externalId, userProvidedIntegrationConfig: { overrideRedirectUrl: i3.overrideRedirectUrl ? (0, S.sanitizeUrl)(i3.overrideRedirectUrl) : void 0 } }, { onSuccess: (e4) => t5(e4), onError: (t6) => r3(t6), oauthTimeout: null === (o2 = this.startOptions) || void 0 === o2 ? void 0 : o2.oauthTimeout });
                }));
                if (!t4 || !t4.credentialId) throw new Error("Could not find a credential ID");
                this.credentialId = t4.credentialId;
                const r2 = this.next();
                "done" === r2.stage ? this.handleComplete(t4) : this.handleNext(r2);
              } catch (t4) {
                this.handleError(t4, { stage: "oauth" });
              }
            }
            async setAccountType(t3) {
              try {
                this.accountTypeValue = t3;
                const e3 = this.next();
                if ("oauth" === e3.stage) return this.handleNext(e3), void await this.handleOAuth();
                this.handleNext(e3);
              } catch (t4) {
                this.handleError(t4, { stage: "accountType" });
              }
            }
            async setPreOptions(t3) {
              var e3, n3;
              try {
                if (!t3) throw new Error("Pre options are not set");
                this.preOptionsValue = t3;
                const i3 = this.next();
                if ("oauth" === i3.stage) return this.handleNext(i3), void await this.handleOAuth({ endUserSuppliedValues: { ...t3 } });
                const r2 = "done" === i3.stage, o2 = null !== (n3 = null === (e3 = this.getSelectedAccountTypeOption()) || void 0 === e3 ? void 0 : e3.skipPostOAuthInputs) && void 0 !== n3 && n3, s2 = await this.paragon._oauthCallback({ payload: { ...t3, skipPostOAuthInputs: o2 }, integrationId: this.paragon.getIntegrationId(this.getIntegrationName()) }, void 0, { installOptions: this.getInstallOptions() });
                if (!r2) return void this.handleNext(i3);
                if (!s2) return void console.warn("Could not find a credential ID");
                this.handleComplete(s2);
              } catch (t4) {
                this.handleError(t4, { stage: "preOptions" });
              }
            }
            async setPostOptions(t3) {
              var e3, n3;
              try {
                if (!t3) throw new Error("Post options are not set");
                if (!this.credentialId) throw new Error("Credential ID is not set");
                this.postOptionsValue = t3;
                const i3 = null !== (n3 = null === (e3 = this.getSelectedAccountTypeOption()) || void 0 === e3 ? void 0 : e3.skipPostOAuthInputs) && void 0 !== n3 && n3, r2 = await this.paragon._oauthCallback({ payload: { ...t3, skipPostOAuthInputs: i3 }, integrationId: this.paragon.getIntegrationId(this.getIntegrationName()) }, this.credentialId, { installOptions: this.getInstallOptions() }), o2 = this.next();
                if (!("done" === o2.stage)) return void this.handleNext(o2);
                if (!r2) return void console.warn("Could not find a credential ID");
                this.handleComplete(r2);
              } catch (t4) {
                this.handleError(t4, { stage: "postOptions" });
              }
            }
            async setHasFinishedInstruction() {
              try {
                this.hasFinishedInstruction = true;
                const t3 = this.next();
                if ("oauth" === t3.stage) return this.handleNext(t3), void await this.handleOAuth();
                this.handleNext(t3);
              } catch (t3) {
                this.handleError(t3, { stage: "instruction" });
              }
            }
            getAccountTypeValue() {
              return this.accountTypeValue;
            }
            getPreOptionsValue() {
              return this.preOptionsValue;
            }
            getPostOptionsValue() {
              return this.postOptionsValue;
            }
            next() {
              var t3;
              const e3 = this.getIntegrationName();
              if (this.requiresAccountType()) return { stage: "accountType", options: this.paragon.getAccountTypeOptions(e3), done: false };
              const [n3, i3] = this.requiresInstruction();
              return n3 ? { stage: "instruction", content: i3.content, ctas: i3.ctas, finish: i3.finish, packageInstallUrl: i3.packageInstallUrl, done: false } : this.requiresPreOptions() ? { stage: "preOptions", options: this.paragon.getPreOptions(e3, null !== (t3 = this.accountTypeValue) && void 0 !== t3 ? t3 : void 0), done: false } : this.requiresOAuth() ? { stage: "oauth", done: false } : this.requiresPostOptions() ? { stage: "postOptions", options: this.paragon.getPostOptions(e3), done: false } : { stage: "done", done: true };
            }
          }
          e2.InstallFlow = A;
          const b = [{ id: "clientId", title: "Client ID", type: f.SidebarInputType.ValueText, required: true }, { id: "clientSecret", title: "Client Secret", type: f.SidebarInputType.Password, required: true }];
        }, 9892: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true });
          const i2 = n2(3821);
          e2.default = class {
            constructor() {
              this.eventListenersMap = {}, this.integrationStateCallbacks = {};
            }
            subscribe(t3, e3) {
              var n3;
              if (this.assertEventType(t3), "function" != typeof e3) throw new Error(`no listener is provided for ${t3}`);
              return this.eventListenersMap = { ...this.eventListenersMap, [t3]: [...null !== (n3 = this.eventListenersMap[t3]) && void 0 !== n3 ? n3 : [], e3] }, () => this.unsubscribe(t3, e3);
            }
            subscribeToIntegration(t3, e3) {
              this.integrationStateCallbacks[t3] = { ...e3 };
            }
            unsubscribe(t3, e3) {
              var n3, i3;
              if (this.assertEventType(t3), "function" != typeof e3) throw new Error("listener is required for unsubscription");
              const r = (null !== (n3 = this.eventListenersMap[t3]) && void 0 !== n3 ? n3 : []).length;
              return this.eventListenersMap = { ...this.eventListenersMap, [t3]: (null !== (i3 = this.eventListenersMap[t3]) && void 0 !== i3 ? i3 : []).filter(((t4) => t4 !== e3)) }, r > this.eventListenersMap[t3].length;
            }
            assertEventType(t3) {
              if (!Object.values(i2.SDK_EVENT).includes(t3)) throw new Error(`${t3} is not valid paragon event`);
            }
            emitSafe(t3) {
              for (var e3 = arguments.length, n3 = new Array(e3 > 1 ? e3 - 1 : 0), i3 = 1; i3 < e3; i3++) n3[i3 - 1] = arguments[i3];
              var r;
              (null !== (r = this.eventListenersMap[t3]) && void 0 !== r ? r : []).forEach(((t4) => {
                try {
                  t4(...n3);
                } catch (t5) {
                  console.error(t5);
                }
              }));
            }
            emitError(t3, e3) {
              this.invokeCallbackSafe(e3, "onError", t3);
            }
            invokeCallbackSafe(t3, e3) {
              var n3, i3, r;
              try {
                for (var o = arguments.length, s = new Array(o > 2 ? o - 2 : 0), a = 2; a < o; a++) s[a - 2] = arguments[a];
                null === (i3 = null === (n3 = this.integrationStateCallbacks[t3]) || void 0 === n3 ? void 0 : n3[e3]) || void 0 === i3 || i3.call(n3, ...s);
              } catch (t4) {
                console.error(t4);
              } finally {
                null === (r = this.integrationStateCallbacks[t3]) || void 0 === r || delete r[e3];
              }
            }
            triggerEvent(t3, e3) {
              let { type: n3, integrationId: r, integrationType: o, workflowId: s, workflowStateChange: a } = t3;
              if (r && o) switch (n3) {
                case i2.SDK_EVENT.ON_INTEGRATION_INSTALL: {
                  const t4 = [{ integrationId: r, integrationType: o }, e3];
                  this.invokeCallbackSafe(o, "onInstall", ...t4), this.emitSafe(i2.SDK_EVENT.ON_INTEGRATION_INSTALL, ...t4);
                  break;
                }
                case i2.SDK_EVENT.ON_INTEGRATION_UNINSTALL: {
                  const t4 = [{ integrationId: r, integrationType: o }, e3];
                  this.invokeCallbackSafe(o, "onUninstall", ...t4), this.emitSafe(i2.SDK_EVENT.ON_INTEGRATION_UNINSTALL, ...t4);
                  break;
                }
                case i2.SDK_EVENT.ON_PORTAL_OPEN: {
                  const t4 = [{ integrationId: r, integrationType: o }, e3];
                  this.invokeCallbackSafe(o, "onOpen", ...t4), this.emitSafe(i2.SDK_EVENT.ON_PORTAL_OPEN, ...t4);
                  break;
                }
                case i2.SDK_EVENT.ON_PORTAL_CLOSE: {
                  const t4 = [{ integrationId: r, integrationType: o }, e3];
                  this.invokeCallbackSafe(o, "onClose", ...t4), this.emitSafe(i2.SDK_EVENT.ON_PORTAL_CLOSE, ...t4);
                  break;
                }
                case i2.SDK_EVENT.ON_WORKFLOW_CHANGE: {
                  const t4 = [{ integrationId: r, workflowId: s, workflowStateChange: a || {} }, e3];
                  this.invokeCallbackSafe(o, "onWorkflowChange", ...t4), this.emitSafe(i2.SDK_EVENT.ON_WORKFLOW_CHANGE, ...t4);
                  break;
                }
                default:
                  throw new Error(`${n3} is not valid event.`);
              }
            }
          };
        }, 3931: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.PERSONA_META_HEADER = e2.BYO_USER_PROFILE_ERROR_CODE = e2.BYO_CREDENTIAL_VERIFICATION_ERROR = e2.INSUFFICIENT_PERMISSION = e2.ACTION_CUSTOM = void 0, e2.ACTION_CUSTOM = "custom", e2.INSUFFICIENT_PERMISSION = "7210", e2.BYO_CREDENTIAL_VERIFICATION_ERROR = "7003", e2.BYO_USER_PROFILE_ERROR_CODE = "0704", e2.PERSONA_META_HEADER = "X-Paragon-User-Metadata";
        }, 4059: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.CredentialStatus = void 0, (function(t3) {
            t3.PENDING = "PENDING", t3.INVALID = "INVALID", t3.VALID = "VALID";
          })(e2.CredentialStatus || (e2.CredentialStatus = {}));
        }, 745: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.AuthenticationScheme = void 0, (function(t3) {
            t3.BASIC = "basic", t3.OAUTH = "oauth", t3.OAUTH_CLIENT_CREDENTIAL = "oauth_client_credential", t3.SERVICE_ACCOUNT = "service_account", t3.OAUTH_APP = "oauth_app", t3.IMPERSONATED_APP = "impersonated_app";
          })(e2.AuthenticationScheme || (e2.AuthenticationScheme = {}));
        }, 1663: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.generateSlugForIntegration = void 0, e2.generateSlugForIntegration = function(t3) {
            if (!t3.name) return;
            return `custom.${t3.name ? t3.name.replace(/[\W_]+/g, "").trim().toLowerCase() : void 0}`;
          };
        }, 7343: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.isCustomIntegrationTypeName = e2.getIntegrationTypeName = void 0;
          const i2 = n2(3931), r = n2(1663);
          e2.getIntegrationTypeName = function(t3) {
            var e3;
            if (t3.type === i2.ACTION_CUSTOM) {
              if (t3.customIntegration) return null !== (e3 = t3.customIntegration.slug) && void 0 !== e3 ? e3 : (0, r.generateSlugForIntegration)(t3.customIntegration);
              throw new Error(`Custom integration details are missing from this integration: ${t3.id}`);
            }
            return t3.type;
          }, e2.isCustomIntegrationTypeName = function(t3) {
            return t3.startsWith("custom.");
          };
        }, 9845: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.MicrosoftPicker = void 0;
          const i2 = n2(3821), r = n2(7473);
          class o extends r.BaseFilePicker {
            constructor(t3, e3) {
              super(t3, e3), this.options = t3, this.connectSDKInstance = e3, this.accessToken = "", this.baseUrl = "";
            }
            getInstance() {
              return null;
            }
            open() {
              var t3, e3;
              return this.dependencyStatus === i2.FilePickerStatus.LOADED && (null === (e3 = (t3 = this.options).onOpen) || void 0 === e3 || e3.call(t3), this.launchPicker(this.getPickerOptions()), true);
            }
            async initPicker(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "https://alcdn.msauth.net/browser/2.19.0/js/msal-browser.min.js";
              var r2;
              this.dependencyStatus = i2.FilePickerStatus.LOADING;
              const { selectedCredentialId: o2, ...s } = t3 || {};
              this.initOptions = s;
              const a = await this.connectSDKInstance.getIntegrationAccount(e3, { includeAccountAuth: true, selectedCredentialId: o2 });
              return this.accessToken = a.accountAuth[(null === (r2 = i2.AUTH_TOKEN_ALLOWED_INTEGRATIONS[e3]) || void 0 === r2 ? void 0 : r2.accessTokenPath) || ""], this.baseUrl = this.getUrl(a, e3), this.initialiseDependencyPromise(), this.injectScript(n3), this.dependenciesPromise;
            }
            onScriptLoaded() {
              this.dependencyStatus = i2.FilePickerStatus.LOADED, this.dependenciesPromise.resolve(true);
            }
            onScriptError() {
              this.dependencyStatus = i2.FilePickerStatus.FAILED, this.dependenciesPromise.reject(new Error("Failed to load dependencies"));
            }
            combinePaths() {
              for (var t3 = arguments.length, e3 = new Array(t3), n3 = 0; n3 < t3; n3++) e3[n3] = arguments[n3];
              return e3.map(((t4) => t4.replace(/^[/\\]+|[/\\]+$/g, ""))).join("/").replace(/\\/g, "/");
            }
            async launchPicker(t3) {
              if (!this.accessToken) throw new Error("Access Token is not set! Please re-authenticate your account.");
              const e3 = { sdk: "8.0", entry: t3.entry, search: { enabled: true }, messaging: { origin: window.location.origin, channelId: `X-PARAGON-CHANNEL-${Date.now()}` }, selection: { mode: this.options.allowMultiSelect ? "multiple" : "single" }, typesAndSources: { mode: "boolean" == typeof this.options.allowFolderSelect ? this.options.allowFolderSelect ? "folders" : "files" : "all", filters: this.options.allowedTypes, pivots: t3.pivots } }, n3 = new URLSearchParams({ filePicker: JSON.stringify(e3) }).toString(), i3 = `${this.getPickerUrl(this.baseUrl)}?${n3}`, r2 = window.open("", "Picker", "width=800,height=600,left=100,top=150");
              if (!r2) throw new Error("Failed to open picker window.");
              const o2 = r2.document.createElement("form");
              o2.setAttribute("action", i3), o2.setAttribute("method", "POST");
              const s = r2.document.createElement("input");
              s.setAttribute("type", "hidden"), s.setAttribute("name", "access_token"), s.setAttribute("value", this.accessToken), o2.appendChild(s), r2.document.body.appendChild(o2), o2.submit(), this.setupMessageListener(r2, e3.messaging.channelId);
            }
            initializePort(t3, e3) {
              t3.addEventListener("message", (async (n3) => {
                const { type: i3, data: r2, id: o2 } = n3.data;
                if ("command" === i3) {
                  const { command: n4 } = r2;
                  this.handlePickerCommand({ command: n4, id: o2, items: r2.items }, e3, t3);
                }
              })), t3.start(), t3.postMessage({ type: "activate" });
            }
            setupMessageListener(t3, e3) {
              window.addEventListener("message", ((n3) => {
                var i3;
                if (n3.source === t3 && (null === (i3 = n3.data) || void 0 === i3 ? void 0 : i3.channelId) === e3) {
                  const { type: e4, data: i4 } = n3.data;
                  switch (e4) {
                    case "initialize":
                      const r2 = n3.ports[0];
                      this.initializePort(r2, t3);
                      break;
                    case "command":
                      this.handlePickerCommand(i4, t3);
                      break;
                    default:
                      console.warn("Unknown message type:", e4);
                  }
                }
              }));
            }
            handlePickerCommand(t3, e3, n3) {
              var i3, r2, o2, s, a, l;
              const { command: c, id: d, items: u } = t3;
              switch (c) {
                case "close":
                  null === (r2 = (i3 = this.options).onClose) || void 0 === r2 || r2.call(i3), e3.close();
                  break;
                case "pick":
                  null == n3 || n3.postMessage({ type: "result", id: d, data: { result: "success" } }), null === (s = (o2 = this.options).onFileSelect) || void 0 === s || s.call(o2, u), null === (l = (a = this.options).onClose) || void 0 === l || l.call(a), e3.close();
                  break;
                default:
                  null == n3 || n3.postMessage({ type: "error", id: d, data: { message: "Unsupported command", command: c } });
              }
            }
          }
          e2.MicrosoftPicker = o;
        }, 9008: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.BoxFilePicker = void 0;
          const i2 = n2(3821), r = n2(7473), o = { version: "21.0.0", scriptUrl: "https://cdn01.boxcdn.net/platform/elements/21.0.0/en-US/picker.js", cssUrl: "https://cdn01.boxcdn.net/platform/elements/21.0.0/en-US/picker.css", containerClass: "picker", containerStyles: { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100%", height: "80%", zIndex: "2147483647", display: "flex", alignItems: "center", justifyContent: "center" }, pickerOptions: { maxSelectable: 1, canUpload: true, canCreateNewFolder: true, canSetShareAccess: true, canDownload: true, canDelete: false, canRename: false, canPreview: true, canComment: false, canShare: true, canMove: false, canCopy: true } };
          class s extends r.BaseFilePicker {
            constructor(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              super(t3, e3), this.accessToken = "", this.iframe = null, this.config = { ...o, ...n3 };
            }
            isScopedMode() {
              var t3, e3;
              return Boolean(null === (e3 = null === (t3 = this.options.integrationOptions) || void 0 === t3 ? void 0 : t3.box) || void 0 === e3 ? void 0 : e3.scopeCSS);
            }
            getInstance() {
              var t3, e3, n3;
              if (!this.instance) {
                const i3 = this.isScopedMode() ? null === (t3 = this.iframe) || void 0 === t3 ? void 0 : t3.contentWindow : window;
                if (!i3) throw new Error("Box script is not loaded yet. Please wait for initialization to complete.");
                if (!this.options.allowFolderSelect && !(null === (e3 = i3.Box) || void 0 === e3 ? void 0 : e3.FilePicker) || this.options.allowFolderSelect && !(null === (n3 = i3.Box) || void 0 === n3 ? void 0 : n3.FolderPicker)) throw new Error("Box script is not loaded yet. Please wait for initialization to complete.");
                const r2 = new i3.Box[this.options.allowFolderSelect ? "FolderPicker" : "FilePicker"]({ container: `.${this.config.containerClass}` });
                if (!r2) throw new Error(`Failed to create Box ${this.options.allowFolderSelect ? "Folder" : "File"}Picker instance`);
                this.instance = r2, this.setupEventListeners();
              }
              return this.instance;
            }
            setupEventListeners() {
              var t3 = this;
              if (!this.instance) return;
              const e3 = { choose: function() {
                let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                var n3, i3;
                null === (i3 = (n3 = t3.options).onFileSelect) || void 0 === i3 || i3.call(n3, e4), t3.cleanup();
              }, cancel: () => {
                var t4, e4;
                null === (e4 = (t4 = this.options).onCancel) || void 0 === e4 || e4.call(t4), this.cleanup();
              }, close: () => {
                var t4, e4;
                null === (e4 = (t4 = this.options).onClose) || void 0 === e4 || e4.call(t4), this.cleanup();
              } };
              Object.entries(e3).forEach(((t4) => {
                let [e4, n3] = t4;
                var i3;
                null === (i3 = this.instance) || void 0 === i3 || i3.addListener(e4, n3);
              }));
            }
            cleanup() {
              var t3, e3;
              if (this.instance) {
                if (this.instance.removeAllListeners(), this.isScopedMode() && this.iframe) {
                  const e4 = null === (t3 = this.iframe.contentDocument) || void 0 === t3 ? void 0 : t3.querySelector(`.${this.config.containerClass}`);
                  e4 && e4.remove(), this.iframe.style.display = "none";
                } else null === (e3 = document.querySelector(`.${this.config.containerClass}`)) || void 0 === e3 || e3.remove();
                this.instance = void 0;
              }
            }
            createPickerContainer() {
              if (this.isScopedMode() && this.iframe) {
                if ("none" !== this.iframe.style.display) return;
                Object.entries(this.config.containerStyles).forEach(((t5) => {
                  let [e3, n3] = t5;
                  var i3;
                  (null === (i3 = this.iframe) || void 0 === i3 ? void 0 : i3.style)[e3] = n3;
                })), this.iframe.style.border = "0", this.iframe.style.display = "block";
                const t4 = this.iframe.contentDocument;
                if (t4 && !t4.querySelector(`.${this.config.containerClass}`)) {
                  const e3 = t4.createElement("div");
                  e3.className = this.config.containerClass, t4.body.appendChild(e3);
                }
                return;
              }
              if (document.querySelector(`.${this.config.containerClass}`)) return;
              const t3 = document.createElement("div");
              t3.className = this.config.containerClass, Object.entries(this.config.containerStyles).forEach(((e3) => {
                let [n3, i3] = e3;
                t3.style[n3] = i3;
              })), document.body.appendChild(t3);
            }
            injectCSS(t3) {
              const e3 = document.createElement("link");
              e3.rel = "stylesheet", e3.href = t3, document.head.appendChild(e3);
            }
            injectGlobalBtnContentCSS() {
              if (document.getElementById("global-btn-content-style")) return;
              const t3 = document.createElement("style");
              t3.id = "global-btn-content-style", t3.innerHTML = "\n      .btn-content {\n        display: flex !important;\n        justify-content: center !important;\n      }\n    ", document.head.appendChild(t3);
            }
            open() {
              var t3, e3, n3;
              if (this.dependencyStatus === i2.FilePickerStatus.LOADED) try {
                this.instance = void 0;
                const { scopeCSS: i3, ...r2 } = (null === (t3 = this.options.integrationOptions) || void 0 === t3 ? void 0 : t3.box) || {}, o2 = this.getInstance();
                if (o2) {
                  const t4 = { ...this.config.pickerOptions, container: `.${this.config.containerClass}`, maxSelectable: this.options.allowMultiSelect ? void 0 : 1, extensions: this.options.allowedTypes, canSelectFolder: this.options.allowFolderSelect, ...r2 };
                  if (this.createPickerContainer(), this.initOptions.folderId) return o2.show(this.initOptions.folderId, this.accessToken, t4), null === (n3 = (e3 = this.options).onOpen) || void 0 === n3 || n3.call(e3), true;
                }
              } catch (t4) {
                return false;
              }
              return false;
            }
            async init(t3) {
              this.dependencyStatus = i2.FilePickerStatus.LOADING;
              const { selectedCredentialId: e3, ...n3 } = t3 || {};
              await this.validateInitOptions(n3, [["folderId", "Folder ID"]]), this.initOptions = { ...n3 };
              const r2 = await this.connectSDKInstance.getIntegrationAccount("box", { includeAccountAuth: true, selectedCredentialId: e3 }), { accessTokenPath: o2 = "" } = i2.AUTH_TOKEN_ALLOWED_INTEGRATIONS.box;
              return this.accessToken = r2.accountAuth[o2], this.initialiseDependencyPromise(), this.isScopedMode() ? this.createScopedIframe() : (this.injectCSS(this.config.cssUrl), this.injectGlobalBtnContentCSS(), this.injectScript(this.config.scriptUrl)), this.dependenciesPromise;
            }
            createScopedIframe() {
              if (this.iframe) return void this.onScriptLoaded();
              const t3 = this.config.containerClass, e3 = document.createElement("iframe");
              e3.onload = this.onScriptLoaded.bind(this), e3.onerror = this.onScriptError.bind(this), e3.style.display = "none", e3.srcdoc = `<!doctype html>
      <html><head>
        <link rel="stylesheet" href="${this.config.cssUrl}">
        <style>
          html, body, .${t3} { height: 100%; margin: 0; padding: 0; }
          .${t3} { display: flex; align-items: center; justify-content: center; }
        </style>
      </head><body>
        <div class="${t3}"></div>
        <script src="${this.config.scriptUrl}"><\/script>
      </body></html>`, this.iframe = e3, document.body.appendChild(e3);
            }
            async launch() {
              this.dependencyStatus !== i2.FilePickerStatus.LOADED && await this.init(this.initOptions), this.open();
            }
            onScriptLoaded() {
              this.dependencyStatus = i2.FilePickerStatus.LOADED, this.instance = void 0, this.dependenciesPromise.resolve(true);
            }
            onScriptError() {
              this.dependencyStatus = i2.FilePickerStatus.FAILED, this.dependenciesPromise.reject(new Error("Failed to load Box script"));
            }
          }
          e2.BoxFilePicker = s;
        }, 9950: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.GoogleDriveFilePicker = void 0;
          const i2 = n2(3821), r = n2(7473);
          class o extends r.BaseFilePicker {
            constructor(t3, e3) {
              super(t3, e3), this.accessToken = "";
            }
            get google() {
              return window.google;
            }
            getInstance() {
              var t3;
              return null !== (t3 = this.instance) && void 0 !== t3 ? t3 : null;
            }
            open() {
              var t3, e3;
              return !(this.dependencyStatus !== i2.FilePickerStatus.LOADED || !this.instance) && (this.instance.setVisible(true), null === (e3 = (t3 = this.options).onOpen) || void 0 === e3 || e3.call(t3), true);
            }
            async init(t3) {
              this.dependencyStatus = i2.FilePickerStatus.LOADING;
              const { selectedCredentialId: e3, ...n3 } = t3 || {};
              await this.validateInitOptions(n3, [["developerKey", "developer key"]]), this.initOptions = { ...n3 };
              const r2 = await this.connectSDKInstance.getIntegrationAccount("googledrive", { includeAccountAuth: true, selectedCredentialId: e3 }), { accessTokenPath: o2 = "" } = i2.AUTH_TOKEN_ALLOWED_INTEGRATIONS.googledrive;
              return this.accessToken = r2.accountAuth[o2], this.initialiseDependencyPromise(), this.injectScript("https://apis.google.com/js/api.js"), this.dependenciesPromise;
            }
            onScriptLoaded() {
              this.dependencyStatus = i2.FilePickerStatus.LOADED, window.gapi.load("picker", this.onPickerLoaded.bind(this));
            }
            onScriptError() {
              this.dependencyStatus = i2.FilePickerStatus.FAILED, this.dependenciesPromise.reject(new Error("Not able to load dependencies"));
            }
            onPickerLoaded() {
              var t3, e3, n3;
              const i3 = new this.google.picker.PickerBuilder();
              (null === (t3 = this.initOptions) || void 0 === t3 ? void 0 : t3.appId) && i3.setAppId(this.initOptions.appId), this.options.allowMultiSelect && i3.enableFeature(this.google.picker.Feature.MULTISELECT_ENABLED), this.options.allowedTypes && this.options.allowedTypes.length > 0 && i3.setSelectableMimeTypes(this.options.allowedTypes.join(","));
              const r2 = this.createDocsView();
              if (i3.addView(r2), null === (n3 = null === (e3 = this.options.integrationOptions) || void 0 === e3 ? void 0 : e3.googledrive) || void 0 === n3 ? void 0 : n3.enableSharedDrives) {
                const t4 = this.createDocsView();
                t4.setEnableDrives(true), i3.addView(t4);
              }
              if (!this.initOptions.developerKey) throw new Error("Please provide a valid developer key");
              const o2 = i3.setOAuthToken(this.accessToken).setDeveloperKey(this.initOptions.developerKey).setCallback(this.pickerCallback.bind(this));
              this.initOptions.appId && o2.setAppId(this.initOptions.appId), this.instance = o2.build(), this.dependenciesPromise.resolve(true);
            }
            createDocsView() {
              var t3, e3, n3, i3;
              const r2 = new this.google.picker.DocsView();
              return this.options.allowFolderSelect && (r2.setIncludeFolders(true), r2.setSelectFolderEnabled(true)), (null === (e3 = null === (t3 = this.options.integrationOptions) || void 0 === t3 ? void 0 : t3.googledrive) || void 0 === e3 ? void 0 : e3.viewMode) && r2.setMode(this.options.integrationOptions.googledrive.viewMode), (null === (i3 = null === (n3 = this.options.integrationOptions) || void 0 === n3 ? void 0 : n3.googledrive) || void 0 === i3 ? void 0 : i3.includeFolders) && r2.setIncludeFolders(true), r2;
            }
            pickerCallback(t3) {
              var e3, n3, i3, r2, o2, s;
              const { action: a, ...l } = t3;
              switch (a) {
                case this.google.picker.Action.PICKED:
                  null === (n3 = (e3 = this.options).onFileSelect) || void 0 === n3 || n3.call(e3, l), null === (r2 = (i3 = this.options).onClose) || void 0 === r2 || r2.call(i3);
                  break;
                case this.google.picker.Action.CANCEL:
                  null === (s = (o2 = this.options).onCancel) || void 0 === s || s.call(o2);
              }
            }
          }
          e2.GoogleDriveFilePicker = o;
        }, 1698: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true });
          const i2 = n2(9008), r = n2(9950), o = n2(6128), s = n2(8737);
          e2.default = { BoxFilePicker: i2.BoxFilePicker, GoogleDriveFilePicker: r.GoogleDriveFilePicker, OneDriveFilePicker: o.OneDriveFilePicker, SharepointFilePicker: s.SharepointFilePicker };
        }, 6128: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.OneDriveFilePicker = void 0;
          const i2 = n2(3821), r = n2(9845);
          class o extends r.MicrosoftPicker {
            constructor() {
              super(...arguments), this.integrationName = "onedrive", this.personalAccountUrl = "https://onedrive.live.com";
            }
            async init(t3) {
              return super.initPicker(t3, this.integrationName);
            }
            getPickerUrl(t3) {
              return t3 ? t3.includes(this.personalAccountUrl) ? `${t3}/picker` : this.combinePaths(t3, "_layouts/15/FilePicker.aspx") : `${this.personalAccountUrl}/picker`;
            }
            getIntegrationName() {
              return this.integrationName;
            }
            getUrl(t3, e3) {
              return t3.accountAuth[i2.AUTH_TOKEN_ALLOWED_INTEGRATIONS[e3].domain || ""];
            }
            getPickerOptions() {
              return { entry: { oneDrive: { files: { fallbackToRoot: true } } }, pivots: { oneDrive: true, recent: true, shared: true } };
            }
          }
          e2.OneDriveFilePicker = o;
        }, 8737: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.SharepointFilePicker = void 0;
          const i2 = n2(8321), r = n2(9845);
          class o extends r.MicrosoftPicker {
            constructor() {
              super(...arguments), this.integrationName = "sharepoint";
            }
            async init(t3) {
              return super.initPicker(t3, this.integrationName);
            }
            getIntegrationName() {
              return this.integrationName;
            }
            getPickerUrl(t3) {
              return this.combinePaths(t3, "_layouts/15/FilePicker.aspx");
            }
            getUrl(t3) {
              var e3;
              return (0, i2.sanitizeUrl)(null === (e3 = t3.providerData) || void 0 === e3 ? void 0 : e3.webUrl);
            }
            getPickerOptions() {
              return { entry: { sharePoint: { byPath: { list: `${this.baseUrl}/Shared Documents`, fallbackToRoot: true } } }, pivots: { shared: true, oneDrive: false, sharedLibraries: true, site: true } };
            }
          }
          e2.SharepointFilePicker = o;
        }, 7473: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.BaseFilePicker = void 0;
          const i2 = n2(2643), r = n2(572);
          e2.BaseFilePicker = class {
            constructor(t3, e3) {
              this.options = t3, this.connectSDKInstance = e3;
            }
            initialiseDependencyPromise() {
              this.dependenciesPromise = new r.DeferredPromise();
            }
            getInstance() {
              return this.instance;
            }
            injectScript(t3) {
              if (this.checkIfScriptLoaded(t3)) this.onScriptLoaded();
              else {
                const e3 = document.createElement("script");
                e3.src = t3, e3.async = true, e3.id = t3, e3.onload = this.onScriptLoaded.bind(this), e3.onerror = this.onScriptError.bind(this), document.body.appendChild(e3);
              }
            }
            checkIfScriptLoaded(t3) {
              const e3 = document.getElementsByTagName("script");
              for (let n3 = 0; n3 < e3.length; n3++) if (e3[n3].getAttribute("src") == t3) return true;
              return false;
            }
            async validateInitOptions(t3, e3) {
              for (const [n3, r2] of e3) if (!t3 || (0, i2.isStringEmpty)(t3[n3])) throw new Error(`Please provide a valid ${r2}`);
              return true;
            }
          };
        }, 4731: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.buildExternalFilePickerInstance = void 0;
          const i2 = n2(655).__importDefault(n2(1698));
          class r {
            constructor(t3, e3, n3) {
              const i3 = this.createFilePicker(t3, e3, n3);
              this.open = this.open.bind(i3), this.init = this.init.bind(i3), this.getInstance = this.getInstance.bind(i3);
            }
            createFilePicker(t3, e3, n3) {
              const r2 = { box: i2.default.BoxFilePicker, googledrive: i2.default.GoogleDriveFilePicker, onedrive: i2.default.OneDriveFilePicker, sharepoint: i2.default.SharepointFilePicker }[t3];
              if (!r2) throw new Error(`${t3}'s file picker is not supported`);
              return new r2(e3, n3);
            }
            open() {
              return this.open();
            }
            init(t3) {
              return this.init(t3);
            }
            getInstance() {
              return this.getInstance();
            }
          }
          e2.default = r;
          e2.buildExternalFilePickerInstance = (t3) => function(e3, n3) {
            if (!t3.getUser().authenticated) throw new Error("Authentication is required");
            if (!e3) throw new Error("Missing argument: Integration type is required");
            return t3.validateAction(e3), new r(e3, n3, t3);
          };
        }, 7050: function(t2, e2, n2) {
          "use strict";
          var i2 = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          };
          Object.defineProperty(e2, "__esModule", { value: true }), e2.buildExternalFilePickerInstance = e2.ExternalFilePicker = void 0;
          var r = n2(4731);
          Object.defineProperty(e2, "ExternalFilePicker", { enumerable: true, get: function() {
            return i2(r).default;
          } }), Object.defineProperty(e2, "buildExternalFilePickerInstance", { enumerable: true, get: function() {
            return r.buildExternalFilePickerInstance;
          } });
        }, 2643: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.findSelectedAccountType = e2.isStringEmpty = e2.getActionStateForCredentialDelete = e2.stripUndefinedAndNull = e2.parseKeyedSource = void 0;
          const i2 = n2(4059);
          e2.parseKeyedSource = function(t3) {
            return t3 && (null == t3 ? void 0 : t3.length) ? Object.fromEntries(t3.map(((t4) => [t4.key, "VALUE" === t4.source.type ? t4.source.value : void 0]))) : {};
          }, e2.stripUndefinedAndNull = function t3(e3) {
            const n3 = {};
            return Object.keys(e3).forEach(((i3) => {
              var r;
              (r = e3[i3]) && "object" == typeof r && !Array.isArray(r) ? n3[i3] = t3(e3[i3]) : void 0 !== e3[i3] && null !== e3[i3] && (n3[i3] = e3[i3]);
            })), n3;
          };
          e2.getActionStateForCredentialDelete = (t3, e3) => {
            var n3, r;
            const o = (null !== (n3 = null == e3 ? void 0 : e3.allCredentials) && void 0 !== n3 ? n3 : []).filter(((e4) => e4.id !== t3)), s = (null !== (r = null == e3 ? void 0 : e3.allConfigurations) && void 0 !== r ? r : []).filter(((e4) => e4.connectCredentialId !== t3));
            if (0 === o.length) return { enabled: false, workflowSettings: {}, allCredentials: [], allConfigurations: [] };
            {
              const t4 = o[0];
              return { ...e3, credentialStatus: t4.status, enabled: t4.status === i2.CredentialStatus.VALID, credentialId: t4.id, providerId: t4.providerId, providerData: t4.providerData, allCredentials: o, allConfigurations: s };
            }
          };
          e2.isStringEmpty = (t3) => !t3 || "string" == typeof t3 && !t3.trim();
          e2.findSelectedAccountType = function(t3, e3) {
            let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            if (e3) return t3.find(((t4) => {
              let { id: n4 } = t4;
              return n4 === e3;
            }));
            if (1 === n3.length) return t3.find(((t4) => {
              let { id: e4 } = t4;
              return n3.includes(e4);
            }));
            if (!e3 && !n3.length && Array.isArray(t3) && 2 === t3.length) {
              const [e4, n4] = t3;
              return "default" === e4.id && "user-configured-oauth" === n4.id ? e4 : void 0;
            }
          };
        }, 4429: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.startOAuthFlow = e2.MAX_POLL_DURATION = e2.CREDENTIAL_POLL_INTERVAL = void 0;
          const i2 = n2(3931), r = n2(7343), o = n2(1935), s = n2(2643);
          e2.CREDENTIAL_POLL_INTERVAL = 3e3, e2.MAX_POLL_DURATION = 18e4;
          e2.startOAuthFlow = (t3, e3) => {
            let { context: n3, integration: a, endUserSuppliedValues: l = {}, authParams: c, isPreviewMode: d = false, installOptions: u = {} } = t3;
            var h;
            const p = (0, r.getIntegrationTypeName)(a);
            if (!p) return;
            const f = c ? (0, s.parseKeyedSource)(c) : {};
            if (!n3.user.authenticated) throw new o.UserNotAuthenticatedError();
            const g = (0, s.stripUndefinedAndNull)({ action: p && (0, r.isCustomIntegrationTypeName)(p) ? i2.ACTION_CUSTOM : p, endUserSuppliedValues: JSON.stringify(l), parameters: JSON.stringify(f), userToken: n3.user.token, integrationId: a.id, redirectUrl: null === (h = n3.endUserIntegrationConfig) || void 0 === h ? void 0 : h.overrideRedirectUrl, originForPostMessage: window.location.origin, isPreviewMode: d, installOptions: JSON.stringify(u), oauthMetaKeyId: e3 }), v = `${n3.environments.ZEUS_PUBLIC_URL}/projects/${n3.projectId}/sdk/actions/oauth-nonce?action=${p}&integrationId=${a.id}&originForPostMessage=${window.location.origin}${n3.user.token ? `&userToken=${n3.user.token}` : ""}`, y = (async (t4, e4) => t4.user.authenticated ? fetch(`${t4.environments.ZEUS_PUBLIC_URL}/v2/projects/${t4.projectId}/sdk/actions/build-oauth?${e4}`, { method: "GET", headers: { "Content-Type": "application/json", ...t4.user.token ? { Authorization: `Bearer ${t4.user.token}` } : {} } }) : Promise.reject("User is not authenticated"))(n3, new URLSearchParams(g).toString()), E = window.open(v, void 0, "width=500,height=600,left=100,top=150"), I = /* @__PURE__ */ (function(t4, e4) {
              return function n4(i3) {
                "oauth-nonce-loaded" === i3.data.type && t4.then((async (t5) => {
                  if (!t5.ok) {
                    const e5 = await t5.json();
                    return Promise.reject(new Error(e5.message));
                  }
                  return t5.json();
                })).then(((t5) => {
                  if (!e4) throw new o.OAuthBlockedError();
                  e4.location.href = t5.redirectUrl, window.removeEventListener("message", n4);
                })).catch(((t5) => {
                  console.error("Build Oauth URL fetch failure", t5.message);
                }));
              };
            })(y, E);
            return window.addEventListener("message", I), E;
          };
        }, 3056: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.paragon = e2.connectSingleton = void 0;
          const i2 = n2(655), r = i2.__importDefault(n2(773)), o = n2(7050);
          i2.__exportStar(n2(3821), e2), e2.connectSingleton = new r.default(), e2.paragon = { _loadCustomDropdownOptions: e2.connectSingleton._loadCustomDropdownOptions.bind(e2.connectSingleton), _oauthCallback: e2.connectSingleton._oauthCallback.bind(e2.connectSingleton), _oauthErrorCallback: e2.connectSingleton._oauthErrorCallback.bind(e2.connectSingleton), authenticate: e2.connectSingleton.authenticate.bind(e2.connectSingleton), closePortal: e2.connectSingleton.closePortal.bind(e2.connectSingleton), completeInstall: e2.connectSingleton.completeInstall.bind(e2.connectSingleton), configureGlobal: e2.connectSingleton.configureGlobal.bind(e2.connectSingleton), getVersion: e2.connectSingleton.getVersion.bind(e2.connectSingleton), connect: e2.connectSingleton.connect.bind(e2.connectSingleton), connectAction: e2.connectSingleton.connectAction.bind(e2.connectSingleton), getCustomWebhookUserManualUrl: e2.connectSingleton.getCustomWebhookUserManualUrl.bind(e2.connectSingleton), createConfiguration: e2.connectSingleton.createConfiguration.bind(e2.connectSingleton), destroyConfiguration: e2.connectSingleton.destroyConfiguration.bind(e2.connectSingleton), disableWorkflow: e2.connectSingleton.disableWorkflow.bind(e2.connectSingleton), enableWorkflow: e2.connectSingleton.enableWorkflow.bind(e2.connectSingleton), event: e2.connectSingleton.event.bind(e2.connectSingleton), getIntegrationAccount: e2.connectSingleton.getIntegrationAccount.bind(e2.connectSingleton), getIntegrationMetadata: e2.connectSingleton.getIntegrationMetadata.bind(e2.connectSingleton), getUser: e2.connectSingleton.getUser.bind(e2.connectSingleton), installIntegration: e2.connectSingleton.installIntegration.bind(e2.connectSingleton), request: e2.connectSingleton.request.bind(e2.connectSingleton), setUserMetadata: e2.connectSingleton.setUserMetadata.bind(e2.connectSingleton), subscribe: e2.connectSingleton.subscribe.bind(e2.connectSingleton), uninstallIntegration: e2.connectSingleton.uninstallIntegration.bind(e2.connectSingleton), unsubscribe: e2.connectSingleton.unsubscribe.bind(e2.connectSingleton), updateConfiguration: e2.connectSingleton.updateConfiguration.bind(e2.connectSingleton), workflow: e2.connectSingleton.workflow.bind(e2.connectSingleton), ExternalFilePicker: (0, o.buildExternalFilePickerInstance)(e2.connectSingleton), getIntegrationConfig: e2.connectSingleton.getIntegrationConfig.bind(e2.connectSingleton), updateIntegrationUserSettings: e2.connectSingleton.updateIntegrationUserSettings.bind(e2.connectSingleton), updateWorkflowUserSettings: e2.connectSingleton.updateWorkflowUserSettings.bind(e2.connectSingleton), updateWorkflowState: e2.connectSingleton.updateWorkflowState.bind(e2.connectSingleton), setHeadless: e2.connectSingleton.setHeadless.bind(e2.connectSingleton), setDataSources: e2.connectSingleton.setDataSources.bind(e2.connectSingleton), getIntegrationId: e2.connectSingleton.getIntegrationId.bind(e2.connectSingleton), getAccountTypeOptions: e2.connectSingleton.getAccountTypeOptions.bind(e2.connectSingleton), getPreOptions: e2.connectSingleton.getPreOptions.bind(e2.connectSingleton), getPostOptions: e2.connectSingleton.getPostOptions.bind(e2.connectSingleton), startOAuthFlow: e2.connectSingleton.startOAuthFlow.bind(e2.connectSingleton), getAssetUrl: e2.connectSingleton.getAssetUrl.bind(e2.connectSingleton), installFlow: e2.connectSingleton.installFlow, getFieldOptions: e2.connectSingleton.getFieldOptions.bind(e2.connectSingleton), getDataSourceOptions: e2.connectSingleton.getDataSourceOptions.bind(e2.connectSingleton), getSourcesForInput: e2.connectSingleton.getSourcesForInput.bind(e2.connectSingleton) }, e2.default = r.default;
        }, 9636: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.cloneDeep = void 0;
          const i2 = n2(655).__importDefault(n2(738));
          e2.cloneDeep = function(t3) {
            return (0, i2.default)(t3);
          };
        }, 2992: (t2, e2) => {
          "use strict";
          var n2, i2;
          Object.defineProperty(e2, "__esModule", { value: true }), e2.AUTH_TOKEN_ALLOWED_INTEGRATIONS = e2.overrideActionAlias = e2.DataSourceType = e2.TokenType = e2.VariableInputType = e2.SidebarInputType = void 0, (function(t3) {
            t3.Auth = "AUTH", t3.Enum = "ENUM", t3.DynamicEnum = "DYNAMIC_ENUM", t3.Intent = "INTENT", t3.Text = "TEXT", t3.TextArea = "TEXTAREA", t3.ValueText = "TEXT_NO_VARS", t3.ValueTextArea = "TEXTAREA_NO_VARS", t3.Code = "CODE", t3.ActionButton = "ACTION_BUTTON", t3.Conditional = "CONDITIONAL", t3.CustomDropdown = "CUSTOM_DROPDOWN", t3.DynamicConditional = "DYNAMIC_CONDITIONAL", t3.NestedList = "NESTED_LIST", t3.File = "FILE", t3.EditableDynamicEnum = "EDITABLE_DYNAMIC_ENUM", t3.EditableEnum = "EDITABLE_ENUM", t3.BooleanInput = "BOOLEAN_INPUT", t3.UserSuppliedCredential = "USER_SUPPLIED_CREDENTIAL", t3.NativeDynamicEnumInput = "NATIVE_DYNAMIC_INPUT", t3.TimeConstraintInput = "TIME_CONSTRAINT_INPUT", t3.LinesListInput = "LinesListInput", t3.LinesListDynamicInput = "LinesListDynamicInput", t3.Number = "NUMBER", t3.Email = "EMAIL", t3.URL = "URL", t3.EnumTextAreaPairInput = "EnumTextAreaPairInput", t3.FieldMapper = "FIELD_MAPPER", t3.ComboInput = "COMBO_INPUT", t3.Password = "PASSWORD", t3.Switch = "SWITCH", t3.DynamicComboInput = "DYNAMIC_COMBO_INPUT", t3.CopyableButtonInput = "COPYABLE_BUTTON_INPUT", t3.Permission = "PERMISSION";
          })(e2.SidebarInputType || (e2.SidebarInputType = {})), (function(t3) {
            t3.MultiSelect = "multi", t3.String = "string", t3.Dropdown = "dropdown", t3.MultiSelectCheckbox = "multiCheckbox", t3.Number = "number";
          })(e2.VariableInputType || (e2.VariableInputType = {})), (function(t3) {
            t3.ACCESS_TOKEN = "ACCESS_TOKEN", t3.REFRESH_TOKEN = "REFRESH_TOKEN", t3.BOT_TOKEN = "BOT_TOKEN", t3.KLAVIYO_API_KEY = "KLAVIYO_API_KEY", t3.MARKETO_CLIENT_ID = "MARKETO_CLIENT_ID", t3.MARKETO_CLIENT_SECRET = "MARKETO_CLIENT_SECRETI", t3.MARKETO_ENDPOINT = "MARKETO_ENDPOINT", t3.MARKETO_IDENTITY = "MARKETO_IDENTITY", t3.MONDAY_API_TOKEN = "MONDAY_API_TOKEN", t3.ORACLE_CLOUD_URL = "ORACLE_CLOUD_URL", t3.ORACLE_PASSWORD = "ORACLE_PASSWORD", t3.ORACLE_USERNAME = "ORACLE_USERNAME", t3.SAGE_INTACCT_COMPANY_ID = "SAGE_INTACCT_COMPANY_ID", t3.SAGE_INTACCT_USER_ID = "SAGE_INTACCT_USER_ID", t3.SAGE_INTACCT_USER_PASSWORD = "SAGE_INTACCT_USER_PASSWORD", t3.SAILTHRU_COMPANY_KEY = "SAILTHRU_COMPANY_KEY", t3.SAILTHRU_COMPANY_SECRET = "SAILTHRU_COMPANY_SECRET", t3.SERVICENOW_PASSWORD = "SERVICENOW_PASSWORD", t3.SERVICENOW_SUBDOMAIN = "SERVICENOW_SUBDOMAIN", t3.SERVICENOW_USERNAME = "SERVICENOW_USERNAME", t3.TABLEAU_PERSONAL_ACCESS_TOKEN_NAME = "TABLEAU_PERSONAL_ACCESS_TOKEN_NAME", t3.TABLEAU_PERSONAL_ACCESS_TOKEN_SECRET = "TABLEAU_PERSONAL_ACCESS_TOKEN_SECRET", t3.TABLEAU_SERVER_NAME = "TABLEAU_SERVER_NAME", t3.TABLEAU_SITE_ID = "TABLEAU_SITE_ID", t3.TRELLO_API_KEY = "TRELLO_API_KEY", t3.TRELLO_API_TOKEN = "TRELLO_API_TOKEN", t3.WOOCOMMERCE_CONSUMER_KEY = "WOOCOMMERCE_CONSUMER_KEY", t3.WOOCOMMERCE_CONSUMER_SECRET = "WOOCOMMERCE_CONSUMER_SECRET", t3.WOOCOMMERCE_STORE_DOMAIN = "WOOCOMMERCE_STORE_DOMAIN", t3.WORKABLE_API_ACCESS_TOKEN = "WORKABLE_API_ACCESS_TOKEN", t3.WORKABLE_ACCOUNT_SUBDOMAIN = "WORKABLE_ACCOUNT_SUBDOMAIN", t3.ZOHO_CRM_ACCOUNTS_SERVER = "ZOHO_CRM_ACCOUNTS_SERVER", t3.ZOHO_CRM_API_DOMAIN = "ZOHO_CRM_API_DOMAIN";
          })(e2.TokenType || (e2.TokenType = {})), (function(t3) {
            t3.INFO = "INFO", t3.ERROR = "ERROR", t3.SUCCESS = "SUCCESS";
          })(n2 || (n2 = {})), (function(t3) {
            t3.NONE = "NONE", t3.RE_AUTHENTICATE = "RE_AUTHENTICATE", t3.ALERT = "ALERT", t3.DISPATCH = "DISPATCH";
          })(i2 || (i2 = {})), (function(t3) {
            t3.DYNAMIC = "DYNAMIC_DATA_SOURCE", t3.STATIC_ENUM = "STATIC_ENUM_DATA_SOURCE", t3.FIELD_MAPPER = "FIELD_MAPPER_DATA_SOURCE", t3.COMBO_INPUT = "COMBO_INPUT_DATA_SOURCE", t3.DYNAMIC_COMBO_INPUT = "DYNAMIC_COMBO_INPUT_DATA_SOURCE";
          })(e2.DataSourceType || (e2.DataSourceType = {})), e2.overrideActionAlias = { "monday.com": "monday", "wordpress.com": "wordpress" }, e2.AUTH_TOKEN_ALLOWED_INTEGRATIONS = { box: { accessTokenPath: "OAUTH_ACCESS_TOKEN" }, googledrive: { accessTokenPath: "OAUTH_ACCESS_TOKEN" }, onedrive: { accessTokenPath: "OAUTH_ACCESS_TOKEN", domain: "DOMAIN" }, sharepoint: { accessTokenPath: "OAUTH_ACCESS_TOKEN" } };
        }, 9034: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.CONNECT_PLAN_FEATURE_MAP = void 0;
          const i2 = n2(471);
          e2.CONNECT_PLAN_FEATURE_MAP = { [i2.BillingPlan.ConnectBasic]: [], [i2.BillingPlan.ConnectPro]: [i2.ConnectAddOn.CustomIntegrationBuilder, i2.ConnectAddOn.HeadlessConnectPortal, i2.ConnectAddOn.Monitoring, i2.ConnectAddOn.UserMetadata, i2.ConnectAddOn.WhiteLabeling], [i2.BillingPlan.ConnectEnterprise]: [i2.ConnectAddOn.CustomIntegrationBuilder, i2.ConnectAddOn.DynamicFieldMapper, i2.ConnectAddOn.HeadlessConnectPortal, i2.ConnectAddOn.TaskHistoryAPI, i2.ConnectAddOn.Monitoring, i2.ConnectAddOn.RoleBasedAccessControl, i2.ConnectAddOn.UserMetadata, i2.ConnectAddOn.WhiteLabeling, i2.ConnectAddOn.WorkflowPermission] };
        }, 1935: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.SDK_VERSION_HEADER = e2.SELECTED_CREDENTIAL_CONFIG_ID_HEADER = e2.SELECTED_CREDENTIAL_ID_HEADER = e2.INFER_CONTENT_TYPE_FROM_CONNECT_OPTIONS = e2.CredentialStatus = void 0;
          const i2 = n2(655), r = n2(2992);
          var o = n2(4059);
          Object.defineProperty(e2, "CredentialStatus", { enumerable: true, get: function() {
            return o.CredentialStatus;
          } }), i2.__exportStar(n2(2460), e2);
          r.SidebarInputType.ValueText, r.SidebarInputType.DynamicEnum, r.SidebarInputType.Enum, r.SidebarInputType.Number, r.SidebarInputType.Email, r.SidebarInputType.URL, r.SidebarInputType.FieldMapper, r.SidebarInputType.BooleanInput, r.SidebarInputType.ComboInput, r.SidebarInputType.Password, r.SidebarInputType.Switch, r.SidebarInputType.ValueTextArea, r.SidebarInputType.CustomDropdown, r.SidebarInputType.DynamicComboInput, r.SidebarInputType.FieldMapper, r.SidebarInputType.CopyableButtonInput, r.SidebarInputType.Permission, r.SidebarInputType.File;
          e2.INFER_CONTENT_TYPE_FROM_CONNECT_OPTIONS = "auto", e2.SELECTED_CREDENTIAL_ID_HEADER = "X-Paragon-Credential", e2.SELECTED_CREDENTIAL_CONFIG_ID_HEADER = "X-Paragon-Configuration-Id", e2.SDK_VERSION_HEADER = "X-Paragon-SDK-Version";
        }, 9977: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true });
        }, 914: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.PLATFORM_ENV = e2.NODE_ENV = void 0, (function(t3) {
            t3.PRODUCTION = "production", t3.DEVELOPMENT = "development", t3.TEST = "test";
          })(e2.NODE_ENV || (e2.NODE_ENV = {})), (function(t3) {
            t3.PRODUCTION = "production", t3.PRODUCTION_MIRROR_1 = "p-m1", t3.STAGING = "staging", t3.STAGING_MIRROR_1 = "s-m1", t3.DEVELOPMENT = "dev", t3.TEST = "test", t3.SANDBOX = "sandbox", t3.RELEASE = "release", t3.ENTERPRISE = "enterprise";
          })(e2.PLATFORM_ENV || (e2.PLATFORM_ENV = {}));
        }, 2460: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.getConnectSDKError = e2.OAuthTimeoutError = e2.OAuthBlockedError = e2.HeadlessModeNotEnabledError = e2.IntegrationNotInstalledError = e2.IntegrationNotFoundError = e2.NoActiveInstallFlowError = e2.UserNotAuthenticatedError = e2.BaseSDKError = void 0;
          class n2 extends Error {
            constructor(t3) {
              super(t3.message), this.name = t3.name, this.meta = "meta" in t3 ? t3.meta : null;
            }
          }
          e2.BaseSDKError = n2;
          e2.UserNotAuthenticatedError = class extends n2 {
            constructor() {
              super({ name: "UserNotAuthenticatedError", message: "User not authenticated, Call paragon.authenticate(<projectId>, <user token>) before using the SDK." });
            }
          };
          e2.NoActiveInstallFlowError = class extends n2 {
            constructor() {
              super({ name: "NoActiveInstallFlowError", message: "No active install flow, make sure you call installFlow.start(<integrationName>, ...args) before calling any other method" });
            }
          };
          e2.IntegrationNotFoundError = class extends n2 {
            constructor(t3) {
              super({ name: "IntegrationNotFoundError", message: `Integration with name ${t3} not found`, meta: { integrationName: t3 } });
            }
          };
          e2.IntegrationNotInstalledError = class extends n2 {
            constructor(t3) {
              super({ name: "IntegrationNotInstalledError", message: `Integration "${t3}" is not installed.`, meta: { integrationName: t3 } }), this.integrationName = t3;
            }
          };
          e2.HeadlessModeNotEnabledError = class extends n2 {
            constructor() {
              super({ name: "HeadlessModeNotEnabledError", message: "Headless mode is not enabled. Make sure you call `paragon.setHeadless(true)` as early as possible in your code." });
            }
          };
          e2.OAuthBlockedError = class extends n2 {
            constructor() {
              super({ name: "OAuthBlockedError", message: "Popup was blocked by the browser." });
            }
          };
          e2.OAuthTimeoutError = class extends n2 {
            constructor() {
              super({ name: "OAuthTimeoutError", message: "OAuth timeout" });
            }
          }, e2.getConnectSDKError = function(t3) {
            return t3 instanceof n2 ? { name: t3.name, message: t3.message, meta: t3.meta } : { name: "UnknownError", message: t3 instanceof Error ? t3.message : "An unknown error occurred", originalError: t3 };
          };
        }, 8065: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true });
        }, 3821: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true });
          const i2 = n2(655);
          i2.__exportStar(n2(2992), e2), i2.__exportStar(n2(9034), e2), i2.__exportStar(n2(1935), e2), i2.__exportStar(n2(9977), e2), i2.__exportStar(n2(914), e2), i2.__exportStar(n2(8065), e2), i2.__exportStar(n2(9835), e2), i2.__exportStar(n2(7750), e2), i2.__exportStar(n2(471), e2);
        }, 9835: (t2, e2) => {
          "use strict";
          var n2;
          Object.defineProperty(e2, "__esModule", { value: true }), e2.DataType = void 0, (function(t3) {
            t3.STRING = "STRING", t3.NUMBER = "NUMBER", t3.DATE = "DATE", t3.BOOLEAN = "BOOLEAN", t3.EMAIL = "EMAIL", t3.OBJECT = "OBJECT", t3.ARRAY = "ARRAY", t3.ANY = "ANY", t3.FILE = "FILE", t3.NON_DECIMAL = "NON_DECIMAL";
          })(e2.DataType || (e2.DataType = {})), (function(t3) {
            t3.None = "$none", t3.StringContains = "$stringContains", t3.StringDoesNotContain = "$stringDoesNotContain", t3.StringExactlyMatches = "$stringExactlyMatches", t3.StringDoesNotExactlyMatch = "$stringDoesNotExactlyMatch", t3.StringIsIn = "$stringIsIn", t3.StringIsNotIn = "$stringIsNotIn", t3.StringStartsWith = "$stringStartsWith", t3.StringDoesNotStartWith = "$stringDoesNotStartWith", t3.StringEndsWith = "$stringEndsWith", t3.StringDoesNotEndWith = "$stringDoesNotEndWith", t3.NumberGreaterThan = "$numberGreaterThan", t3.NumberLessThan = "$numberLessThan", t3.NumberEquals = "$numberEquals", t3.NumberDoesNotEqual = "$numberDoesNotEqual", t3.NumberLessThanOrEqualTo = "$numberLessThanOrEqualTo", t3.NumberGreaterThanOrEqualTo = "$numberGreaterThanOrEqualTo", t3.DateTimeAfter = "$dateTimeAfter", t3.DateTimeBefore = "$dateTimeBefore", t3.DateTimeEquals = "$dateTimeEquals", t3.BooleanTrue = "$booleanTrue", t3.BooleanFalse = "$booleanFalse", t3.IsNotNull = "$exists", t3.IsNull = "$doesNotExist", t3.Exists = "$isNotUndefinedOrNull", t3.DoesNotExist = "$isUndefinedOrNull", t3.ArrayIsIn = "$arrayIsIn", t3.ArrayIsNotIn = "$arrayIsNotIn", t3.ArrayIsEmpty = "$arrayIsEmpty", t3.ArrayIsNotEmpty = "$arrayIsNotEmpty", t3.StringGreaterThan = "$stringGreaterThan", t3.StringLessThan = "$stringLessThan";
          })(n2 || (n2 = {}));
        }, 7750: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.FilePickerStatus = e2.DocumentLoadingState = e2.SDK_EVENT = e2.ModalView = e2.DynamicFieldMappingLoaderType = void 0, (function(t3) {
            t3.OBJECT_TYPES = "objectTypes", t3.INTEGRATION_FIELDS = "integrationFields";
          })(e2.DynamicFieldMappingLoaderType || (e2.DynamicFieldMappingLoaderType = {})), (function(t3) {
            t3.OVERVIEW = "overview", t3.CONFIGURATION = "configuration";
          })(e2.ModalView || (e2.ModalView = {})), (function(t3) {
            t3.ON_INTEGRATION_INSTALL = "onIntegrationInstall", t3.ON_INTEGRATION_UNINSTALL = "onIntegrationUninstall", t3.ON_WORKFLOW_CHANGE = "onWorkflowChange", t3.ON_PORTAL_OPEN = "onPortalOpen", t3.ON_PORTAL_CLOSE = "onPortalClose";
          })(e2.SDK_EVENT || (e2.SDK_EVENT = {})), (function(t3) {
            t3.LOADING = "loading", t3.INTERACTIVE = "interactive", t3.COMPLETE = "complete";
          })(e2.DocumentLoadingState || (e2.DocumentLoadingState = {})), (function(t3) {
            t3.LOADING = "loading", t3.FAILED = "failed", t3.LOADED = "loaded";
          })(e2.FilePickerStatus || (e2.FilePickerStatus = {}));
        }, 471: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.ConnectAddOn = e2.BillingPlan = void 0, (function(t3) {
            t3.ClassicFree = "free", t3.ClassicStarter = "starter", t3.ClassicBusiness = "business", t3.ClassicPremium = "premium", t3.ClassicEnterprise = "enterprise", t3.ConnectTrial = "connect_trial", t3.ConnectBasic = "basic", t3.ConnectPro = "pro", t3.ConnectEnterprise = "connect_enterprise";
          })(e2.BillingPlan || (e2.BillingPlan = {})), (function(t3) {
            t3.CustomIntegrationBuilder = "byo", t3.DynamicFieldMapper = "dfm", t3.HeadlessConnectPortal = "headless-cp", t3.TaskHistoryAPI = "th-api", t3.Monitoring = "monitoring", t3.RoleBasedAccessControl = "rbac", t3.UserMetadata = "user-metadata", t3.WhiteLabeling = "whitelabel", t3.WorkflowPermission = "workflow-permissions";
          })(e2.ConnectAddOn || (e2.ConnectAddOn = {}));
        }, 3158: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.getHeadersForUserMeta = e2.sanitizeExternalConfigId = e2.getAssetUrl = void 0;
          const i2 = n2(3931), r = n2(3821);
          e2.getAssetUrl = (t3) => {
            let { CDN_PUBLIC_URL: e3, DASHBOARD_PUBLIC_URL: n3, VERSION: i3, PLATFORM_ENV: o, NODE_ENV: s } = t3;
            return e3 && s === r.NODE_ENV.PRODUCTION && o !== r.PLATFORM_ENV.ENTERPRISE ? `${e3}/${i3}/dashboard/public` : n3;
          }, e2.sanitizeExternalConfigId = function(t3) {
            if (t3.startsWith("ext:")) {
              return (t3.split("ext:").pop() || "").trim();
            }
            return t3.trim();
          };
          e2.getHeadersForUserMeta = (t3) => ({ ...t3 ? { [i2.PERSONA_META_HEADER]: JSON.stringify(t3) } : {} });
        }, 4846: (t2, e2, n2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.hash = void 0;
          const i2 = n2(3715);
          e2.hash = function(t3) {
            return null == t3 ? t3 : (0, i2.sha256)().update(t3).digest("hex").substr(0, 10);
          };
        }, 5349: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.dedent = void 0, e2.dedent = function(t3) {
            const e3 = (t3 = t3.replace(/^\n+|\n+$/g, "")).split("\n"), n2 = e3.filter(((t4) => t4.trim().length > 0)).map(((t4) => t4.match(/^(\s*)/)[1].length)), i2 = n2.length > 0 ? Math.min(...n2) : 0;
            return e3.map(((t4) => t4.slice(i2))).join("\n");
          };
        }, 572: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.tryUntil = e2.isUUID = e2.uuidPattern = e2.areObjectsEqual = e2.normalizeForMetaCompare = e2.sleep = e2.generateMatrix = e2.DeferredPromise = void 0;
          function n2(t3) {
            return new Promise(((e3) => setTimeout(e3, t3)));
          }
          function i2(t3) {
            return Object.keys(t3).sort().reduce(((e3, n3) => {
              const r = t3[n3];
              return e3[n3] = null === r || "object" != typeof r ? r : i2(r), e3;
            }), {});
          }
          e2.DeferredPromise = class {
            get state() {
              return this._state;
            }
            constructor() {
              this._state = "pending", this._promise = new Promise(((t3, e3) => {
                this._resolve = t3, this._reject = e3;
              }));
            }
            then(t3, e3) {
              return this._promise.then(t3, e3);
            }
            catch(t3) {
              return this._promise.catch(t3);
            }
            resolve(t3) {
              this._resolve(t3), this._state = "fulfilled";
            }
            reject(t3) {
              this._reject(t3), this._state = "rejected";
            }
            finally(t3) {
              return null == t3 || t3(), this._promise;
            }
          }, Symbol.toStringTag, e2.generateMatrix = function(t3, e3) {
            const n3 = Object.keys(t3);
            if (n3.reduce(((e4, n4) => e4 + t3[n4].length), 0) && n3.length) for (const e4 of n3) t3[e4].length || t3[e4].push(void 0);
            const i3 = Object.entries(t3).reduce(((t4, e4) => {
              let [, n4] = e4;
              return t4.length ? t4.reduce(((t5, e5) => (n4.forEach(((n5) => {
                const i4 = e5.slice();
                i4.push(n5), t5.push(i4);
              }), []), t5)), []) : n4.map(((t5) => [t5]));
            }), []).reduce(((t4, e4) => {
              const i4 = e4.reduce(((t5, e5, i5) => ({ ...t5, [n3[i5]]: e5 })), {});
              return [...t4, i4];
            }), []);
            return e3 ? i3.slice(-1 * e3) : i3;
          }, e2.sleep = n2, e2.normalizeForMetaCompare = i2, e2.areObjectsEqual = function(t3, e3) {
            return JSON.stringify(i2(t3)) === JSON.stringify(i2(e3));
          }, e2.uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i, e2.isUUID = function(t3) {
            return "string" == typeof t3 && e2.uuidPattern.test(t3);
          }, e2.tryUntil = async function(t3, e3, i3) {
            let r = 0, o = true;
            for (; o; ) {
              r += 1;
              let s = null, a = null;
              try {
                s = await t3();
              } catch (t4) {
                a = t4;
              }
              if (o = await e3(s, a, r), !o) {
                if (a) throw a;
                return s;
              }
              {
                const t4 = "number" == typeof i3 ? i3 : i3(r);
                await n2(t4);
              }
            }
            throw new Error("Method unable to run: invalid retries.");
          };
        }, 8321: (t2, e2) => {
          "use strict";
          Object.defineProperty(e2, "__esModule", { value: true }), e2.errorMessageParser = e2.isIntegrationError = e2.ProxyRequestError = e2.getErrorMessage = e2.getServiceUrl = e2.sanitizeUrl = e2.isValidUrl = void 0;
          function n2(t3) {
            return t3 ? t3.match(/^[a-zA-Z]+:\/\//) ? t3 : `https://${t3}` : t3;
          }
          function i2(t3) {
            return Array.isArray(t3) ? t3.flatMap(((t4) => [t4, i2(t4.children || [])].flatMap(((t5) => "string" == typeof t5 ? t5 : i2(t5))))).filter(((t4) => t4)).join(", ") : Object.values(t3.constraints || {}).join(", ");
          }
          e2.isValidUrl = (t3) => {
            const e3 = n2(t3);
            try {
              return new globalThis.URL(e3), true;
            } catch (t4) {
              return false;
            }
          }, e2.sanitizeUrl = n2, e2.getServiceUrl = function(t3, e3) {
            return `https://${t3}${`.${e3}`}`;
          }, e2.getErrorMessage = async function(t3, n3) {
            var r2, o;
            const s = null === (r2 = t3.headers) || void 0 === r2 ? void 0 : r2.get("content-type"), a = s && s.includes("application/json") ? await t3.json() : null;
            let l;
            return l = a && (0, e2.isIntegrationError)(a.meta) ? JSON.stringify(a.meta) : a && "string" == typeof a.message ? a.message : a && 400 === t3.status && Array.isArray(a.message) ? i2(a.message) : a ? JSON.stringify(a) : await (null === (o = t3.text) || void 0 === o ? void 0 : o.call(t3)), n3 ? { message: l, response: a || t3 } : l;
          };
          class r extends Error {
            constructor(t3, e3) {
              super(t3), this.name = "Error", this.response = e3, Object.setPrototypeOf(this, r.prototype);
            }
          }
          e2.ProxyRequestError = r;
          e2.isIntegrationError = (t3) => !("object" != typeof t3 || !t3) && t3.isIntegrationError, e2.errorMessageParser = function(t3) {
            t3 = "string" == typeof t3 ? t3 : t3.message;
            try {
              const n3 = JSON.parse(t3);
              return !!(0, e2.isIntegrationError)(n3);
            } catch (t4) {
              return false;
            }
          };
        }, 3035: (t2, e2, n2) => {
          "use strict";
          var i2, r, o, s, a = n2(4155);
          Object.defineProperty(e2, "__esModule", { value: true }), e2.CacheThrottle = e2.CacheMode = void 0;
          const l = n2(655), c = n2(572);
          var d, u, h;
          !(function(t3) {
            t3.Debounce = "debounce", t3.Throttle = "throttle";
          })(d = e2.CacheMode || (e2.CacheMode = {})), (function(t3) {
            t3.Closed = "closed", t3.Idle = "idle", t3.Processing = "processing";
          })(u || (u = {})), (function(t3) {
            t3[t3.Get = 0] = "Get", t3[t3.Set = 1] = "Set", t3[t3.GetOrSet = 2] = "GetOrSet", t3[t3.Del = 3] = "Del", t3[t3.Do = 4] = "Do";
          })(h || (h = {}));
          e2.CacheThrottle = class {
            constructor() {
              let t3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              i2.set(this, u.Idle), r.set(this, {}), o.set(this, void 0), s.set(this, []), l.__classPrivateFieldSet(this, o, { mode: d.Debounce, ttl: 0, ...t3 }, "f");
            }
            async get(t3, e3) {
              const n3 = this.serializeKey(t3), i3 = async () => {
                const e4 = l.__classPrivateFieldGet(this, r, "f")[n3], { mode: i4, ttl: s2, value: a2 } = null != e4 ? e4 : {};
                return !e4 || !s2 || i4 && i4 !== d.Debounce || this.refreshTimeout(t3, n3, s2), l.__classPrivateFieldGet(this, o, "f").clearPendingDeletes && this.clearPendingDeletesOnKey(n3, a2), a2;
              };
              return e3 ? i3() : this.enqueue(n3, h.Get, i3);
            }
            async set(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l.__classPrivateFieldGet(this, o, "f").ttl, i3 = arguments.length > 3 ? arguments[3] : void 0, s2 = arguments.length > 4 ? arguments[4] : void 0;
              const a2 = this.serializeKey(t3), c2 = async () => {
                const s3 = l.__classPrivateFieldGet(this, r, "f")[a2], c3 = !!s3;
                return l.__classPrivateFieldGet(this, r, "f")[a2] = { ...s3, mode: i3, ttl: n3, value: e3 }, c3 && i3 === d.Throttle || this.refreshTimeout(t3, a2, n3), l.__classPrivateFieldGet(this, o, "f").clearPendingDeletes && this.clearPendingDeletesOnKey(a2, e3), e3;
              };
              return s2 ? c2() : this.enqueue(a2, h.Set, c2);
            }
            async getOrSet(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l.__classPrivateFieldGet(this, o, "f").ttl, i3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : l.__classPrivateFieldGet(this, o, "f").mode, s2 = arguments.length > 4 ? arguments[4] : void 0;
              const a2 = this.serializeKey(t3), c2 = async () => {
                if (l.__classPrivateFieldGet(this, r, "f")[a2]) return l.__classPrivateFieldGet(this, r, "f")[a2].value;
                const s3 = await e3();
                return await this.set(t3, s3, n3, i3, true), l.__classPrivateFieldGet(this, o, "f").clearPendingDeletes && this.clearPendingDeletesOnKey(a2, s3), s3;
              };
              return s2 ? c2() : this.enqueue(a2, h.GetOrSet, c2);
            }
            async del(t3) {
              let e3 = arguments.length > 2 ? arguments[2] : void 0;
              const n3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1] ? t3 : this.serializeKey(t3), i3 = async () => {
                const t4 = l.__classPrivateFieldGet(this, r, "f")[n3];
                let e4;
                return (null == t4 ? void 0 : t4.timeout) && clearTimeout(t4.timeout), t4 && (e4 = t4.value, delete l.__classPrivateFieldGet(this, r, "f")[n3], await (async () => {
                  var t5, n4;
                  return null === (n4 = (t5 = l.__classPrivateFieldGet(this, o, "f")).onDeregister) || void 0 === n4 ? void 0 : n4.call(t5, e4);
                })().catch(((t5) => {
                }))), e4;
              };
              return e3 ? i3() : this.enqueue(n3, h.Del, i3);
            }
            keys() {
              return Object.keys(l.__classPrivateFieldGet(this, r, "f"));
            }
            async do(t3, e3) {
              let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l.__classPrivateFieldGet(this, o, "f").ttl, i3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : l.__classPrivateFieldGet(this, o, "f").mode;
              const s2 = this.serializeKey(t3);
              return this.enqueue(s2, h.Do, (async () => {
                if (l.__classPrivateFieldGet(this, r, "f")[s2]) return l.__classPrivateFieldGet(this, r, "f")[s2].value;
                const o2 = await e3();
                return await this.set(t3, o2, n3, i3, true);
              }));
            }
            async close() {
              l.__classPrivateFieldSet(this, i2, u.Closed, "f"), await Promise.all(Object.keys(l.__classPrivateFieldGet(this, r, "f")).map(((t3) => this.del(t3, true, true))));
            }
            refreshTimeout(t3, e3, n3) {
              if (l.__classPrivateFieldGet(this, i2, "f") === u.Closed) return;
              const o2 = l.__classPrivateFieldGet(this, r, "f")[e3];
              return n3 && void 0 !== (null == o2 ? void 0 : o2.timeout) && clearTimeout(o2.timeout), n3 ? (o2.timeout = setTimeout((() => this.del(t3)), n3), o2.timeout) : void 0;
            }
            clearPendingDeletesOnKey(t3, e3) {
              l.__classPrivateFieldSet(this, s, l.__classPrivateFieldGet(this, s, "f").filter(((n3) => {
                let [i3, r2, o2, s2] = n3;
                return t3 !== i3 || r2 !== h.Del || (s2.resolve(e3), false);
              })), "f");
            }
            serializeKey(t3) {
              var e3, n3, i3;
              return null !== (i3 = null === (n3 = (e3 = l.__classPrivateFieldGet(this, o, "f")).serializeKey) || void 0 === n3 ? void 0 : n3.call(e3, t3)) && void 0 !== i3 ? i3 : t3;
            }
            async enqueue(t3, e3, n3) {
              const r2 = new c.DeferredPromise();
              return l.__classPrivateFieldGet(this, s, "f").push([t3, e3, n3, r2]), l.__classPrivateFieldGet(this, i2, "f") === u.Idle && this.flush(), r2;
            }
            flush() {
              l.__classPrivateFieldSet(this, i2, u.Processing, "f"), a.nextTick((async () => {
                for (; l.__classPrivateFieldGet(this, s, "f").length && l.__classPrivateFieldGet(this, i2, "f") !== u.Closed; ) {
                  const t3 = l.__classPrivateFieldGet(this, s, "f").shift();
                  if (t3) {
                    const [, , e3, n3] = t3;
                    try {
                      const t4 = await e3();
                      n3.resolve(t4);
                    } catch (t4) {
                      n3.reject(t4);
                    }
                  }
                }
                l.__classPrivateFieldSet(this, i2, u.Idle, "f");
              }));
            }
          }, i2 = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap(), s = /* @__PURE__ */ new WeakMap();
        }, 9742: (t2, e2) => {
          "use strict";
          e2.byteLength = function(t3) {
            var e3 = l(t3), n3 = e3[0], i3 = e3[1];
            return 3 * (n3 + i3) / 4 - i3;
          }, e2.toByteArray = function(t3) {
            var e3, n3, o2 = l(t3), s2 = o2[0], a2 = o2[1], c2 = new r((function(t4, e4, n4) {
              return 3 * (e4 + n4) / 4 - n4;
            })(0, s2, a2)), d = 0, u = a2 > 0 ? s2 - 4 : s2;
            for (n3 = 0; n3 < u; n3 += 4) e3 = i2[t3.charCodeAt(n3)] << 18 | i2[t3.charCodeAt(n3 + 1)] << 12 | i2[t3.charCodeAt(n3 + 2)] << 6 | i2[t3.charCodeAt(n3 + 3)], c2[d++] = e3 >> 16 & 255, c2[d++] = e3 >> 8 & 255, c2[d++] = 255 & e3;
            2 === a2 && (e3 = i2[t3.charCodeAt(n3)] << 2 | i2[t3.charCodeAt(n3 + 1)] >> 4, c2[d++] = 255 & e3);
            1 === a2 && (e3 = i2[t3.charCodeAt(n3)] << 10 | i2[t3.charCodeAt(n3 + 1)] << 4 | i2[t3.charCodeAt(n3 + 2)] >> 2, c2[d++] = e3 >> 8 & 255, c2[d++] = 255 & e3);
            return c2;
          }, e2.fromByteArray = function(t3) {
            for (var e3, i3 = t3.length, r2 = i3 % 3, o2 = [], s2 = 16383, a2 = 0, l2 = i3 - r2; a2 < l2; a2 += s2) o2.push(c(t3, a2, a2 + s2 > l2 ? l2 : a2 + s2));
            1 === r2 ? (e3 = t3[i3 - 1], o2.push(n2[e3 >> 2] + n2[e3 << 4 & 63] + "==")) : 2 === r2 && (e3 = (t3[i3 - 2] << 8) + t3[i3 - 1], o2.push(n2[e3 >> 10] + n2[e3 >> 4 & 63] + n2[e3 << 2 & 63] + "="));
            return o2.join("");
          };
          for (var n2 = [], i2 = [], r = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, a = o.length; s < a; ++s) n2[s] = o[s], i2[o.charCodeAt(s)] = s;
          function l(t3) {
            var e3 = t3.length;
            if (e3 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var n3 = t3.indexOf("=");
            return -1 === n3 && (n3 = e3), [n3, n3 === e3 ? 0 : 4 - n3 % 4];
          }
          function c(t3, e3, i3) {
            for (var r2, o2, s2 = [], a2 = e3; a2 < i3; a2 += 3) r2 = (t3[a2] << 16 & 16711680) + (t3[a2 + 1] << 8 & 65280) + (255 & t3[a2 + 2]), s2.push(n2[(o2 = r2) >> 18 & 63] + n2[o2 >> 12 & 63] + n2[o2 >> 6 & 63] + n2[63 & o2]);
            return s2.join("");
          }
          i2["-".charCodeAt(0)] = 62, i2["_".charCodeAt(0)] = 63;
        }, 8764: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(9742), r = n2(645), o = "function" == typeof Symbol && "function" == typeof Symbol.for ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
          e2.lW = l, e2.h2 = 50;
          var s = 2147483647;
          function a(t3) {
            if (t3 > s) throw new RangeError('The value "' + t3 + '" is invalid for option "size"');
            var e3 = new Uint8Array(t3);
            return Object.setPrototypeOf(e3, l.prototype), e3;
          }
          function l(t3, e3, n3) {
            if ("number" == typeof t3) {
              if ("string" == typeof e3) throw new TypeError('The "string" argument must be of type string. Received type number');
              return u(t3);
            }
            return c(t3, e3, n3);
          }
          function c(t3, e3, n3) {
            if ("string" == typeof t3) return (function(t4, e4) {
              "string" == typeof e4 && "" !== e4 || (e4 = "utf8");
              if (!l.isEncoding(e4)) throw new TypeError("Unknown encoding: " + e4);
              var n4 = 0 | g(t4, e4), i4 = a(n4), r3 = i4.write(t4, e4);
              r3 !== n4 && (i4 = i4.slice(0, r3));
              return i4;
            })(t3, e3);
            if (ArrayBuffer.isView(t3)) return (function(t4) {
              if ($(t4, Uint8Array)) {
                var e4 = new Uint8Array(t4);
                return p(e4.buffer, e4.byteOffset, e4.byteLength);
              }
              return h(t4);
            })(t3);
            if (null == t3) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t3);
            if ($(t3, ArrayBuffer) || t3 && $(t3.buffer, ArrayBuffer)) return p(t3, e3, n3);
            if ("undefined" != typeof SharedArrayBuffer && ($(t3, SharedArrayBuffer) || t3 && $(t3.buffer, SharedArrayBuffer))) return p(t3, e3, n3);
            if ("number" == typeof t3) throw new TypeError('The "value" argument must not be of type number. Received type number');
            var i3 = t3.valueOf && t3.valueOf();
            if (null != i3 && i3 !== t3) return l.from(i3, e3, n3);
            var r2 = (function(t4) {
              if (l.isBuffer(t4)) {
                var e4 = 0 | f(t4.length), n4 = a(e4);
                return 0 === n4.length || t4.copy(n4, 0, 0, e4), n4;
              }
              if (void 0 !== t4.length) return "number" != typeof t4.length || V(t4.length) ? a(0) : h(t4);
              if ("Buffer" === t4.type && Array.isArray(t4.data)) return h(t4.data);
            })(t3);
            if (r2) return r2;
            if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t3[Symbol.toPrimitive]) return l.from(t3[Symbol.toPrimitive]("string"), e3, n3);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t3);
          }
          function d(t3) {
            if ("number" != typeof t3) throw new TypeError('"size" argument must be of type number');
            if (t3 < 0) throw new RangeError('The value "' + t3 + '" is invalid for option "size"');
          }
          function u(t3) {
            return d(t3), a(t3 < 0 ? 0 : 0 | f(t3));
          }
          function h(t3) {
            for (var e3 = t3.length < 0 ? 0 : 0 | f(t3.length), n3 = a(e3), i3 = 0; i3 < e3; i3 += 1) n3[i3] = 255 & t3[i3];
            return n3;
          }
          function p(t3, e3, n3) {
            if (e3 < 0 || t3.byteLength < e3) throw new RangeError('"offset" is outside of buffer bounds');
            if (t3.byteLength < e3 + (n3 || 0)) throw new RangeError('"length" is outside of buffer bounds');
            var i3;
            return i3 = void 0 === e3 && void 0 === n3 ? new Uint8Array(t3) : void 0 === n3 ? new Uint8Array(t3, e3) : new Uint8Array(t3, e3, n3), Object.setPrototypeOf(i3, l.prototype), i3;
          }
          function f(t3) {
            if (t3 >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
            return 0 | t3;
          }
          function g(t3, e3) {
            if (l.isBuffer(t3)) return t3.length;
            if (ArrayBuffer.isView(t3) || $(t3, ArrayBuffer)) return t3.byteLength;
            if ("string" != typeof t3) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t3);
            var n3 = t3.length, i3 = arguments.length > 2 && true === arguments[2];
            if (!i3 && 0 === n3) return 0;
            for (var r2 = false; ; ) switch (e3) {
              case "ascii":
              case "latin1":
              case "binary":
                return n3;
              case "utf8":
              case "utf-8":
                return B(t3).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * n3;
              case "hex":
                return n3 >>> 1;
              case "base64":
                return j(t3).length;
              default:
                if (r2) return i3 ? -1 : B(t3).length;
                e3 = ("" + e3).toLowerCase(), r2 = true;
            }
          }
          function v(t3, e3, n3) {
            var i3 = false;
            if ((void 0 === e3 || e3 < 0) && (e3 = 0), e3 > this.length) return "";
            if ((void 0 === n3 || n3 > this.length) && (n3 = this.length), n3 <= 0) return "";
            if ((n3 >>>= 0) <= (e3 >>>= 0)) return "";
            for (t3 || (t3 = "utf8"); ; ) switch (t3) {
              case "hex":
                return P(this, e3, n3);
              case "utf8":
              case "utf-8":
                return A(this, e3, n3);
              case "ascii":
                return T(this, e3, n3);
              case "latin1":
              case "binary":
                return N(this, e3, n3);
              case "base64":
                return O(this, e3, n3);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return D(this, e3, n3);
              default:
                if (i3) throw new TypeError("Unknown encoding: " + t3);
                t3 = (t3 + "").toLowerCase(), i3 = true;
            }
          }
          function y(t3, e3, n3) {
            var i3 = t3[e3];
            t3[e3] = t3[n3], t3[n3] = i3;
          }
          function E(t3, e3, n3, i3, r2) {
            if (0 === t3.length) return -1;
            if ("string" == typeof n3 ? (i3 = n3, n3 = 0) : n3 > 2147483647 ? n3 = 2147483647 : n3 < -2147483648 && (n3 = -2147483648), V(n3 = +n3) && (n3 = r2 ? 0 : t3.length - 1), n3 < 0 && (n3 = t3.length + n3), n3 >= t3.length) {
              if (r2) return -1;
              n3 = t3.length - 1;
            } else if (n3 < 0) {
              if (!r2) return -1;
              n3 = 0;
            }
            if ("string" == typeof e3 && (e3 = l.from(e3, i3)), l.isBuffer(e3)) return 0 === e3.length ? -1 : I(t3, e3, n3, i3, r2);
            if ("number" == typeof e3) return e3 &= 255, "function" == typeof Uint8Array.prototype.indexOf ? r2 ? Uint8Array.prototype.indexOf.call(t3, e3, n3) : Uint8Array.prototype.lastIndexOf.call(t3, e3, n3) : I(t3, [e3], n3, i3, r2);
            throw new TypeError("val must be string, number or Buffer");
          }
          function I(t3, e3, n3, i3, r2) {
            var o2, s2 = 1, a2 = t3.length, l2 = e3.length;
            if (void 0 !== i3 && ("ucs2" === (i3 = String(i3).toLowerCase()) || "ucs-2" === i3 || "utf16le" === i3 || "utf-16le" === i3)) {
              if (t3.length < 2 || e3.length < 2) return -1;
              s2 = 2, a2 /= 2, l2 /= 2, n3 /= 2;
            }
            function c2(t4, e4) {
              return 1 === s2 ? t4[e4] : t4.readUInt16BE(e4 * s2);
            }
            if (r2) {
              var d2 = -1;
              for (o2 = n3; o2 < a2; o2++) if (c2(t3, o2) === c2(e3, -1 === d2 ? 0 : o2 - d2)) {
                if (-1 === d2 && (d2 = o2), o2 - d2 + 1 === l2) return d2 * s2;
              } else -1 !== d2 && (o2 -= o2 - d2), d2 = -1;
            } else for (n3 + l2 > a2 && (n3 = a2 - l2), o2 = n3; o2 >= 0; o2--) {
              for (var u2 = true, h2 = 0; h2 < l2; h2++) if (c2(t3, o2 + h2) !== c2(e3, h2)) {
                u2 = false;
                break;
              }
              if (u2) return o2;
            }
            return -1;
          }
          function S(t3, e3, n3, i3) {
            n3 = Number(n3) || 0;
            var r2 = t3.length - n3;
            i3 ? (i3 = Number(i3)) > r2 && (i3 = r2) : i3 = r2;
            var o2 = e3.length;
            i3 > o2 / 2 && (i3 = o2 / 2);
            for (var s2 = 0; s2 < i3; ++s2) {
              var a2 = parseInt(e3.substr(2 * s2, 2), 16);
              if (V(a2)) return s2;
              t3[n3 + s2] = a2;
            }
            return s2;
          }
          function w(t3, e3, n3, i3) {
            return x(B(e3, t3.length - n3), t3, n3, i3);
          }
          function m(t3, e3, n3, i3) {
            return x((function(t4) {
              for (var e4 = [], n4 = 0; n4 < t4.length; ++n4) e4.push(255 & t4.charCodeAt(n4));
              return e4;
            })(e3), t3, n3, i3);
          }
          function _(t3, e3, n3, i3) {
            return x(j(e3), t3, n3, i3);
          }
          function C(t3, e3, n3, i3) {
            return x((function(t4, e4) {
              for (var n4, i4, r2, o2 = [], s2 = 0; s2 < t4.length && !((e4 -= 2) < 0); ++s2) i4 = (n4 = t4.charCodeAt(s2)) >> 8, r2 = n4 % 256, o2.push(r2), o2.push(i4);
              return o2;
            })(e3, t3.length - n3), t3, n3, i3);
          }
          function O(t3, e3, n3) {
            return 0 === e3 && n3 === t3.length ? i2.fromByteArray(t3) : i2.fromByteArray(t3.slice(e3, n3));
          }
          function A(t3, e3, n3) {
            n3 = Math.min(t3.length, n3);
            for (var i3 = [], r2 = e3; r2 < n3; ) {
              var o2, s2, a2, l2, c2 = t3[r2], d2 = null, u2 = c2 > 239 ? 4 : c2 > 223 ? 3 : c2 > 191 ? 2 : 1;
              if (r2 + u2 <= n3) switch (u2) {
                case 1:
                  c2 < 128 && (d2 = c2);
                  break;
                case 2:
                  128 == (192 & (o2 = t3[r2 + 1])) && (l2 = (31 & c2) << 6 | 63 & o2) > 127 && (d2 = l2);
                  break;
                case 3:
                  o2 = t3[r2 + 1], s2 = t3[r2 + 2], 128 == (192 & o2) && 128 == (192 & s2) && (l2 = (15 & c2) << 12 | (63 & o2) << 6 | 63 & s2) > 2047 && (l2 < 55296 || l2 > 57343) && (d2 = l2);
                  break;
                case 4:
                  o2 = t3[r2 + 1], s2 = t3[r2 + 2], a2 = t3[r2 + 3], 128 == (192 & o2) && 128 == (192 & s2) && 128 == (192 & a2) && (l2 = (15 & c2) << 18 | (63 & o2) << 12 | (63 & s2) << 6 | 63 & a2) > 65535 && l2 < 1114112 && (d2 = l2);
              }
              null === d2 ? (d2 = 65533, u2 = 1) : d2 > 65535 && (d2 -= 65536, i3.push(d2 >>> 10 & 1023 | 55296), d2 = 56320 | 1023 & d2), i3.push(d2), r2 += u2;
            }
            return (function(t4) {
              var e4 = t4.length;
              if (e4 <= b) return String.fromCharCode.apply(String, t4);
              var n4 = "", i4 = 0;
              for (; i4 < e4; ) n4 += String.fromCharCode.apply(String, t4.slice(i4, i4 += b));
              return n4;
            })(i3);
          }
          l.TYPED_ARRAY_SUPPORT = (function() {
            try {
              var t3 = new Uint8Array(1), e3 = { foo: function() {
                return 42;
              } };
              return Object.setPrototypeOf(e3, Uint8Array.prototype), Object.setPrototypeOf(t3, e3), 42 === t3.foo();
            } catch (t4) {
              return false;
            }
          })(), l.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(l.prototype, "parent", { enumerable: true, get: function() {
            if (l.isBuffer(this)) return this.buffer;
          } }), Object.defineProperty(l.prototype, "offset", { enumerable: true, get: function() {
            if (l.isBuffer(this)) return this.byteOffset;
          } }), l.poolSize = 8192, l.from = function(t3, e3, n3) {
            return c(t3, e3, n3);
          }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array), l.alloc = function(t3, e3, n3) {
            return (function(t4, e4, n4) {
              return d(t4), t4 <= 0 ? a(t4) : void 0 !== e4 ? "string" == typeof n4 ? a(t4).fill(e4, n4) : a(t4).fill(e4) : a(t4);
            })(t3, e3, n3);
          }, l.allocUnsafe = function(t3) {
            return u(t3);
          }, l.allocUnsafeSlow = function(t3) {
            return u(t3);
          }, l.isBuffer = function(t3) {
            return null != t3 && true === t3._isBuffer && t3 !== l.prototype;
          }, l.compare = function(t3, e3) {
            if ($(t3, Uint8Array) && (t3 = l.from(t3, t3.offset, t3.byteLength)), $(e3, Uint8Array) && (e3 = l.from(e3, e3.offset, e3.byteLength)), !l.isBuffer(t3) || !l.isBuffer(e3)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (t3 === e3) return 0;
            for (var n3 = t3.length, i3 = e3.length, r2 = 0, o2 = Math.min(n3, i3); r2 < o2; ++r2) if (t3[r2] !== e3[r2]) {
              n3 = t3[r2], i3 = e3[r2];
              break;
            }
            return n3 < i3 ? -1 : i3 < n3 ? 1 : 0;
          }, l.isEncoding = function(t3) {
            switch (String(t3).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return true;
              default:
                return false;
            }
          }, l.concat = function(t3, e3) {
            if (!Array.isArray(t3)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t3.length) return l.alloc(0);
            var n3;
            if (void 0 === e3) for (e3 = 0, n3 = 0; n3 < t3.length; ++n3) e3 += t3[n3].length;
            var i3 = l.allocUnsafe(e3), r2 = 0;
            for (n3 = 0; n3 < t3.length; ++n3) {
              var o2 = t3[n3];
              if ($(o2, Uint8Array)) r2 + o2.length > i3.length ? l.from(o2).copy(i3, r2) : Uint8Array.prototype.set.call(i3, o2, r2);
              else {
                if (!l.isBuffer(o2)) throw new TypeError('"list" argument must be an Array of Buffers');
                o2.copy(i3, r2);
              }
              r2 += o2.length;
            }
            return i3;
          }, l.byteLength = g, l.prototype._isBuffer = true, l.prototype.swap16 = function() {
            var t3 = this.length;
            if (t3 % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e3 = 0; e3 < t3; e3 += 2) y(this, e3, e3 + 1);
            return this;
          }, l.prototype.swap32 = function() {
            var t3 = this.length;
            if (t3 % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e3 = 0; e3 < t3; e3 += 4) y(this, e3, e3 + 3), y(this, e3 + 1, e3 + 2);
            return this;
          }, l.prototype.swap64 = function() {
            var t3 = this.length;
            if (t3 % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e3 = 0; e3 < t3; e3 += 8) y(this, e3, e3 + 7), y(this, e3 + 1, e3 + 6), y(this, e3 + 2, e3 + 5), y(this, e3 + 3, e3 + 4);
            return this;
          }, l.prototype.toString = function() {
            var t3 = this.length;
            return 0 === t3 ? "" : 0 === arguments.length ? A(this, 0, t3) : v.apply(this, arguments);
          }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(t3) {
            if (!l.isBuffer(t3)) throw new TypeError("Argument must be a Buffer");
            return this === t3 || 0 === l.compare(this, t3);
          }, l.prototype.inspect = function() {
            var t3 = "", n3 = e2.h2;
            return t3 = this.toString("hex", 0, n3).replace(/(.{2})/g, "$1 ").trim(), this.length > n3 && (t3 += " ... "), "<Buffer " + t3 + ">";
          }, o && (l.prototype[o] = l.prototype.inspect), l.prototype.compare = function(t3, e3, n3, i3, r2) {
            if ($(t3, Uint8Array) && (t3 = l.from(t3, t3.offset, t3.byteLength)), !l.isBuffer(t3)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t3);
            if (void 0 === e3 && (e3 = 0), void 0 === n3 && (n3 = t3 ? t3.length : 0), void 0 === i3 && (i3 = 0), void 0 === r2 && (r2 = this.length), e3 < 0 || n3 > t3.length || i3 < 0 || r2 > this.length) throw new RangeError("out of range index");
            if (i3 >= r2 && e3 >= n3) return 0;
            if (i3 >= r2) return -1;
            if (e3 >= n3) return 1;
            if (this === t3) return 0;
            for (var o2 = (r2 >>>= 0) - (i3 >>>= 0), s2 = (n3 >>>= 0) - (e3 >>>= 0), a2 = Math.min(o2, s2), c2 = this.slice(i3, r2), d2 = t3.slice(e3, n3), u2 = 0; u2 < a2; ++u2) if (c2[u2] !== d2[u2]) {
              o2 = c2[u2], s2 = d2[u2];
              break;
            }
            return o2 < s2 ? -1 : s2 < o2 ? 1 : 0;
          }, l.prototype.includes = function(t3, e3, n3) {
            return -1 !== this.indexOf(t3, e3, n3);
          }, l.prototype.indexOf = function(t3, e3, n3) {
            return E(this, t3, e3, n3, true);
          }, l.prototype.lastIndexOf = function(t3, e3, n3) {
            return E(this, t3, e3, n3, false);
          }, l.prototype.write = function(t3, e3, n3, i3) {
            if (void 0 === e3) i3 = "utf8", n3 = this.length, e3 = 0;
            else if (void 0 === n3 && "string" == typeof e3) i3 = e3, n3 = this.length, e3 = 0;
            else {
              if (!isFinite(e3)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
              e3 >>>= 0, isFinite(n3) ? (n3 >>>= 0, void 0 === i3 && (i3 = "utf8")) : (i3 = n3, n3 = void 0);
            }
            var r2 = this.length - e3;
            if ((void 0 === n3 || n3 > r2) && (n3 = r2), t3.length > 0 && (n3 < 0 || e3 < 0) || e3 > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            i3 || (i3 = "utf8");
            for (var o2 = false; ; ) switch (i3) {
              case "hex":
                return S(this, t3, e3, n3);
              case "utf8":
              case "utf-8":
                return w(this, t3, e3, n3);
              case "ascii":
              case "latin1":
              case "binary":
                return m(this, t3, e3, n3);
              case "base64":
                return _(this, t3, e3, n3);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return C(this, t3, e3, n3);
              default:
                if (o2) throw new TypeError("Unknown encoding: " + i3);
                i3 = ("" + i3).toLowerCase(), o2 = true;
            }
          }, l.prototype.toJSON = function() {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
          };
          var b = 4096;
          function T(t3, e3, n3) {
            var i3 = "";
            n3 = Math.min(t3.length, n3);
            for (var r2 = e3; r2 < n3; ++r2) i3 += String.fromCharCode(127 & t3[r2]);
            return i3;
          }
          function N(t3, e3, n3) {
            var i3 = "";
            n3 = Math.min(t3.length, n3);
            for (var r2 = e3; r2 < n3; ++r2) i3 += String.fromCharCode(t3[r2]);
            return i3;
          }
          function P(t3, e3, n3) {
            var i3 = t3.length;
            (!e3 || e3 < 0) && (e3 = 0), (!n3 || n3 < 0 || n3 > i3) && (n3 = i3);
            for (var r2 = "", o2 = e3; o2 < n3; ++o2) r2 += K[t3[o2]];
            return r2;
          }
          function D(t3, e3, n3) {
            for (var i3 = t3.slice(e3, n3), r2 = "", o2 = 0; o2 < i3.length - 1; o2 += 2) r2 += String.fromCharCode(i3[o2] + 256 * i3[o2 + 1]);
            return r2;
          }
          function R(t3, e3, n3) {
            if (t3 % 1 != 0 || t3 < 0) throw new RangeError("offset is not uint");
            if (t3 + e3 > n3) throw new RangeError("Trying to access beyond buffer length");
          }
          function L(t3, e3, n3, i3, r2, o2) {
            if (!l.isBuffer(t3)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e3 > r2 || e3 < o2) throw new RangeError('"value" argument is out of bounds');
            if (n3 + i3 > t3.length) throw new RangeError("Index out of range");
          }
          function U(t3, e3, n3, i3, r2, o2) {
            if (n3 + i3 > t3.length) throw new RangeError("Index out of range");
            if (n3 < 0) throw new RangeError("Index out of range");
          }
          function k(t3, e3, n3, i3, o2) {
            return e3 = +e3, n3 >>>= 0, o2 || U(t3, 0, n3, 4), r.write(t3, e3, n3, i3, 23, 4), n3 + 4;
          }
          function M(t3, e3, n3, i3, o2) {
            return e3 = +e3, n3 >>>= 0, o2 || U(t3, 0, n3, 8), r.write(t3, e3, n3, i3, 52, 8), n3 + 8;
          }
          l.prototype.slice = function(t3, e3) {
            var n3 = this.length;
            (t3 = ~~t3) < 0 ? (t3 += n3) < 0 && (t3 = 0) : t3 > n3 && (t3 = n3), (e3 = void 0 === e3 ? n3 : ~~e3) < 0 ? (e3 += n3) < 0 && (e3 = 0) : e3 > n3 && (e3 = n3), e3 < t3 && (e3 = t3);
            var i3 = this.subarray(t3, e3);
            return Object.setPrototypeOf(i3, l.prototype), i3;
          }, l.prototype.readUintLE = l.prototype.readUIntLE = function(t3, e3, n3) {
            t3 >>>= 0, e3 >>>= 0, n3 || R(t3, e3, this.length);
            for (var i3 = this[t3], r2 = 1, o2 = 0; ++o2 < e3 && (r2 *= 256); ) i3 += this[t3 + o2] * r2;
            return i3;
          }, l.prototype.readUintBE = l.prototype.readUIntBE = function(t3, e3, n3) {
            t3 >>>= 0, e3 >>>= 0, n3 || R(t3, e3, this.length);
            for (var i3 = this[t3 + --e3], r2 = 1; e3 > 0 && (r2 *= 256); ) i3 += this[t3 + --e3] * r2;
            return i3;
          }, l.prototype.readUint8 = l.prototype.readUInt8 = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 1, this.length), this[t3];
          }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 2, this.length), this[t3] | this[t3 + 1] << 8;
          }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 2, this.length), this[t3] << 8 | this[t3 + 1];
          }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 4, this.length), (this[t3] | this[t3 + 1] << 8 | this[t3 + 2] << 16) + 16777216 * this[t3 + 3];
          }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 4, this.length), 16777216 * this[t3] + (this[t3 + 1] << 16 | this[t3 + 2] << 8 | this[t3 + 3]);
          }, l.prototype.readIntLE = function(t3, e3, n3) {
            t3 >>>= 0, e3 >>>= 0, n3 || R(t3, e3, this.length);
            for (var i3 = this[t3], r2 = 1, o2 = 0; ++o2 < e3 && (r2 *= 256); ) i3 += this[t3 + o2] * r2;
            return i3 >= (r2 *= 128) && (i3 -= Math.pow(2, 8 * e3)), i3;
          }, l.prototype.readIntBE = function(t3, e3, n3) {
            t3 >>>= 0, e3 >>>= 0, n3 || R(t3, e3, this.length);
            for (var i3 = e3, r2 = 1, o2 = this[t3 + --i3]; i3 > 0 && (r2 *= 256); ) o2 += this[t3 + --i3] * r2;
            return o2 >= (r2 *= 128) && (o2 -= Math.pow(2, 8 * e3)), o2;
          }, l.prototype.readInt8 = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 1, this.length), 128 & this[t3] ? -1 * (255 - this[t3] + 1) : this[t3];
          }, l.prototype.readInt16LE = function(t3, e3) {
            t3 >>>= 0, e3 || R(t3, 2, this.length);
            var n3 = this[t3] | this[t3 + 1] << 8;
            return 32768 & n3 ? 4294901760 | n3 : n3;
          }, l.prototype.readInt16BE = function(t3, e3) {
            t3 >>>= 0, e3 || R(t3, 2, this.length);
            var n3 = this[t3 + 1] | this[t3] << 8;
            return 32768 & n3 ? 4294901760 | n3 : n3;
          }, l.prototype.readInt32LE = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 4, this.length), this[t3] | this[t3 + 1] << 8 | this[t3 + 2] << 16 | this[t3 + 3] << 24;
          }, l.prototype.readInt32BE = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 4, this.length), this[t3] << 24 | this[t3 + 1] << 16 | this[t3 + 2] << 8 | this[t3 + 3];
          }, l.prototype.readFloatLE = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 4, this.length), r.read(this, t3, true, 23, 4);
          }, l.prototype.readFloatBE = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 4, this.length), r.read(this, t3, false, 23, 4);
          }, l.prototype.readDoubleLE = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 8, this.length), r.read(this, t3, true, 52, 8);
          }, l.prototype.readDoubleBE = function(t3, e3) {
            return t3 >>>= 0, e3 || R(t3, 8, this.length), r.read(this, t3, false, 52, 8);
          }, l.prototype.writeUintLE = l.prototype.writeUIntLE = function(t3, e3, n3, i3) {
            (t3 = +t3, e3 >>>= 0, n3 >>>= 0, i3) || L(this, t3, e3, n3, Math.pow(2, 8 * n3) - 1, 0);
            var r2 = 1, o2 = 0;
            for (this[e3] = 255 & t3; ++o2 < n3 && (r2 *= 256); ) this[e3 + o2] = t3 / r2 & 255;
            return e3 + n3;
          }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(t3, e3, n3, i3) {
            (t3 = +t3, e3 >>>= 0, n3 >>>= 0, i3) || L(this, t3, e3, n3, Math.pow(2, 8 * n3) - 1, 0);
            var r2 = n3 - 1, o2 = 1;
            for (this[e3 + r2] = 255 & t3; --r2 >= 0 && (o2 *= 256); ) this[e3 + r2] = t3 / o2 & 255;
            return e3 + n3;
          }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(t3, e3, n3) {
            return t3 = +t3, e3 >>>= 0, n3 || L(this, t3, e3, 1, 255, 0), this[e3] = 255 & t3, e3 + 1;
          }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(t3, e3, n3) {
            return t3 = +t3, e3 >>>= 0, n3 || L(this, t3, e3, 2, 65535, 0), this[e3] = 255 & t3, this[e3 + 1] = t3 >>> 8, e3 + 2;
          }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(t3, e3, n3) {
            return t3 = +t3, e3 >>>= 0, n3 || L(this, t3, e3, 2, 65535, 0), this[e3] = t3 >>> 8, this[e3 + 1] = 255 & t3, e3 + 2;
          }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(t3, e3, n3) {
            return t3 = +t3, e3 >>>= 0, n3 || L(this, t3, e3, 4, 4294967295, 0), this[e3 + 3] = t3 >>> 24, this[e3 + 2] = t3 >>> 16, this[e3 + 1] = t3 >>> 8, this[e3] = 255 & t3, e3 + 4;
          }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(t3, e3, n3) {
            return t3 = +t3, e3 >>>= 0, n3 || L(this, t3, e3, 4, 4294967295, 0), this[e3] = t3 >>> 24, this[e3 + 1] = t3 >>> 16, this[e3 + 2] = t3 >>> 8, this[e3 + 3] = 255 & t3, e3 + 4;
          }, l.prototype.writeIntLE = function(t3, e3, n3, i3) {
            if (t3 = +t3, e3 >>>= 0, !i3) {
              var r2 = Math.pow(2, 8 * n3 - 1);
              L(this, t3, e3, n3, r2 - 1, -r2);
            }
            var o2 = 0, s2 = 1, a2 = 0;
            for (this[e3] = 255 & t3; ++o2 < n3 && (s2 *= 256); ) t3 < 0 && 0 === a2 && 0 !== this[e3 + o2 - 1] && (a2 = 1), this[e3 + o2] = (t3 / s2 >> 0) - a2 & 255;
            return e3 + n3;
          }, l.prototype.writeIntBE = function(t3, e3, n3, i3) {
            if (t3 = +t3, e3 >>>= 0, !i3) {
              var r2 = Math.pow(2, 8 * n3 - 1);
              L(this, t3, e3, n3, r2 - 1, -r2);
            }
            var o2 = n3 - 1, s2 = 1, a2 = 0;
            for (this[e3 + o2] = 255 & t3; --o2 >= 0 && (s2 *= 256); ) t3 < 0 && 0 === a2 && 0 !== this[e3 + o2 + 1] && (a2 = 1), this[e3 + o2] = (t3 / s2 >> 0) - a2 & 255;
            return e3 + n3;
          }, l.prototype.writeInt8 = function(t3, e3, n3) {
            return t3 = +t3, e3 >>>= 0, n3 || L(this, t3, e3, 1, 127, -128), t3 < 0 && (t3 = 255 + t3 + 1), this[e3] = 255 & t3, e3 + 1;
          }, l.prototype.writeInt16LE = function(t3, e3, n3) {
            return t3 = +t3, e3 >>>= 0, n3 || L(this, t3, e3, 2, 32767, -32768), this[e3] = 255 & t3, this[e3 + 1] = t3 >>> 8, e3 + 2;
          }, l.prototype.writeInt16BE = function(t3, e3, n3) {
            return t3 = +t3, e3 >>>= 0, n3 || L(this, t3, e3, 2, 32767, -32768), this[e3] = t3 >>> 8, this[e3 + 1] = 255 & t3, e3 + 2;
          }, l.prototype.writeInt32LE = function(t3, e3, n3) {
            return t3 = +t3, e3 >>>= 0, n3 || L(this, t3, e3, 4, 2147483647, -2147483648), this[e3] = 255 & t3, this[e3 + 1] = t3 >>> 8, this[e3 + 2] = t3 >>> 16, this[e3 + 3] = t3 >>> 24, e3 + 4;
          }, l.prototype.writeInt32BE = function(t3, e3, n3) {
            return t3 = +t3, e3 >>>= 0, n3 || L(this, t3, e3, 4, 2147483647, -2147483648), t3 < 0 && (t3 = 4294967295 + t3 + 1), this[e3] = t3 >>> 24, this[e3 + 1] = t3 >>> 16, this[e3 + 2] = t3 >>> 8, this[e3 + 3] = 255 & t3, e3 + 4;
          }, l.prototype.writeFloatLE = function(t3, e3, n3) {
            return k(this, t3, e3, true, n3);
          }, l.prototype.writeFloatBE = function(t3, e3, n3) {
            return k(this, t3, e3, false, n3);
          }, l.prototype.writeDoubleLE = function(t3, e3, n3) {
            return M(this, t3, e3, true, n3);
          }, l.prototype.writeDoubleBE = function(t3, e3, n3) {
            return M(this, t3, e3, false, n3);
          }, l.prototype.copy = function(t3, e3, n3, i3) {
            if (!l.isBuffer(t3)) throw new TypeError("argument should be a Buffer");
            if (n3 || (n3 = 0), i3 || 0 === i3 || (i3 = this.length), e3 >= t3.length && (e3 = t3.length), e3 || (e3 = 0), i3 > 0 && i3 < n3 && (i3 = n3), i3 === n3) return 0;
            if (0 === t3.length || 0 === this.length) return 0;
            if (e3 < 0) throw new RangeError("targetStart out of bounds");
            if (n3 < 0 || n3 >= this.length) throw new RangeError("Index out of range");
            if (i3 < 0) throw new RangeError("sourceEnd out of bounds");
            i3 > this.length && (i3 = this.length), t3.length - e3 < i3 - n3 && (i3 = t3.length - e3 + n3);
            var r2 = i3 - n3;
            return this === t3 && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e3, n3, i3) : Uint8Array.prototype.set.call(t3, this.subarray(n3, i3), e3), r2;
          }, l.prototype.fill = function(t3, e3, n3, i3) {
            if ("string" == typeof t3) {
              if ("string" == typeof e3 ? (i3 = e3, e3 = 0, n3 = this.length) : "string" == typeof n3 && (i3 = n3, n3 = this.length), void 0 !== i3 && "string" != typeof i3) throw new TypeError("encoding must be a string");
              if ("string" == typeof i3 && !l.isEncoding(i3)) throw new TypeError("Unknown encoding: " + i3);
              if (1 === t3.length) {
                var r2 = t3.charCodeAt(0);
                ("utf8" === i3 && r2 < 128 || "latin1" === i3) && (t3 = r2);
              }
            } else "number" == typeof t3 ? t3 &= 255 : "boolean" == typeof t3 && (t3 = Number(t3));
            if (e3 < 0 || this.length < e3 || this.length < n3) throw new RangeError("Out of range index");
            if (n3 <= e3) return this;
            var o2;
            if (e3 >>>= 0, n3 = void 0 === n3 ? this.length : n3 >>> 0, t3 || (t3 = 0), "number" == typeof t3) for (o2 = e3; o2 < n3; ++o2) this[o2] = t3;
            else {
              var s2 = l.isBuffer(t3) ? t3 : l.from(t3, i3), a2 = s2.length;
              if (0 === a2) throw new TypeError('The value "' + t3 + '" is invalid for argument "value"');
              for (o2 = 0; o2 < n3 - e3; ++o2) this[o2 + e3] = s2[o2 % a2];
            }
            return this;
          };
          var F = /[^+/0-9A-Za-z-_]/g;
          function B(t3, e3) {
            var n3;
            e3 = e3 || 1 / 0;
            for (var i3 = t3.length, r2 = null, o2 = [], s2 = 0; s2 < i3; ++s2) {
              if ((n3 = t3.charCodeAt(s2)) > 55295 && n3 < 57344) {
                if (!r2) {
                  if (n3 > 56319) {
                    (e3 -= 3) > -1 && o2.push(239, 191, 189);
                    continue;
                  }
                  if (s2 + 1 === i3) {
                    (e3 -= 3) > -1 && o2.push(239, 191, 189);
                    continue;
                  }
                  r2 = n3;
                  continue;
                }
                if (n3 < 56320) {
                  (e3 -= 3) > -1 && o2.push(239, 191, 189), r2 = n3;
                  continue;
                }
                n3 = 65536 + (r2 - 55296 << 10 | n3 - 56320);
              } else r2 && (e3 -= 3) > -1 && o2.push(239, 191, 189);
              if (r2 = null, n3 < 128) {
                if ((e3 -= 1) < 0) break;
                o2.push(n3);
              } else if (n3 < 2048) {
                if ((e3 -= 2) < 0) break;
                o2.push(n3 >> 6 | 192, 63 & n3 | 128);
              } else if (n3 < 65536) {
                if ((e3 -= 3) < 0) break;
                o2.push(n3 >> 12 | 224, n3 >> 6 & 63 | 128, 63 & n3 | 128);
              } else {
                if (!(n3 < 1114112)) throw new Error("Invalid code point");
                if ((e3 -= 4) < 0) break;
                o2.push(n3 >> 18 | 240, n3 >> 12 & 63 | 128, n3 >> 6 & 63 | 128, 63 & n3 | 128);
              }
            }
            return o2;
          }
          function j(t3) {
            return i2.toByteArray((function(t4) {
              if ((t4 = (t4 = t4.split("=")[0]).trim().replace(F, "")).length < 2) return "";
              for (; t4.length % 4 != 0; ) t4 += "=";
              return t4;
            })(t3));
          }
          function x(t3, e3, n3, i3) {
            for (var r2 = 0; r2 < i3 && !(r2 + n3 >= e3.length || r2 >= t3.length); ++r2) e3[r2 + n3] = t3[r2];
            return r2;
          }
          function $(t3, e3) {
            return t3 instanceof e3 || null != t3 && null != t3.constructor && null != t3.constructor.name && t3.constructor.name === e3.name;
          }
          function V(t3) {
            return t3 != t3;
          }
          var K = (function() {
            for (var t3 = "0123456789abcdef", e3 = new Array(256), n3 = 0; n3 < 16; ++n3) for (var i3 = 16 * n3, r2 = 0; r2 < 16; ++r2) e3[i3 + r2] = t3[n3] + t3[r2];
            return e3;
          })();
        }, 738: (t2, e2, n2) => {
          "use strict";
          const i2 = n2(3341), r = n2(6401), o = n2(5299);
          function s(t3, e3) {
            switch (r(t3)) {
              case "object":
                return (function(t4, e4) {
                  if ("function" == typeof e4) return e4(t4);
                  if (e4 || o(t4)) {
                    const n3 = new t4.constructor();
                    for (let i3 in t4) n3[i3] = s(t4[i3], e4);
                    return n3;
                  }
                  return t4;
                })(t3, e3);
              case "array":
                return (function(t4, e4) {
                  const n3 = new t4.constructor(t4.length);
                  for (let i3 = 0; i3 < t4.length; i3++) n3[i3] = s(t4[i3], e4);
                  return n3;
                })(t3, e3);
              default:
                return i2(t3);
            }
          }
          t2.exports = s;
        }, 3715: (t2, e2, n2) => {
          var i2 = e2;
          i2.utils = n2(6436), i2.common = n2(5772), i2.sha = n2(9041), i2.ripemd = n2(2949), i2.hmac = n2(2344), i2.sha1 = i2.sha.sha1, i2.sha256 = i2.sha.sha256, i2.sha224 = i2.sha.sha224, i2.sha384 = i2.sha.sha384, i2.sha512 = i2.sha.sha512, i2.ripemd160 = i2.ripemd.ripemd160;
        }, 5772: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(6436), r = n2(9746);
          function o() {
            this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
          }
          e2.BlockHash = o, o.prototype.update = function(t3, e3) {
            if (t3 = i2.toArray(t3, e3), this.pending ? this.pending = this.pending.concat(t3) : this.pending = t3, this.pendingTotal += t3.length, this.pending.length >= this._delta8) {
              var n3 = (t3 = this.pending).length % this._delta8;
              this.pending = t3.slice(t3.length - n3, t3.length), 0 === this.pending.length && (this.pending = null), t3 = i2.join32(t3, 0, t3.length - n3, this.endian);
              for (var r2 = 0; r2 < t3.length; r2 += this._delta32) this._update(t3, r2, r2 + this._delta32);
            }
            return this;
          }, o.prototype.digest = function(t3) {
            return this.update(this._pad()), r(null === this.pending), this._digest(t3);
          }, o.prototype._pad = function() {
            var t3 = this.pendingTotal, e3 = this._delta8, n3 = e3 - (t3 + this.padLength) % e3, i3 = new Array(n3 + this.padLength);
            i3[0] = 128;
            for (var r2 = 1; r2 < n3; r2++) i3[r2] = 0;
            if (t3 <<= 3, "big" === this.endian) {
              for (var o2 = 8; o2 < this.padLength; o2++) i3[r2++] = 0;
              i3[r2++] = 0, i3[r2++] = 0, i3[r2++] = 0, i3[r2++] = 0, i3[r2++] = t3 >>> 24 & 255, i3[r2++] = t3 >>> 16 & 255, i3[r2++] = t3 >>> 8 & 255, i3[r2++] = 255 & t3;
            } else for (i3[r2++] = 255 & t3, i3[r2++] = t3 >>> 8 & 255, i3[r2++] = t3 >>> 16 & 255, i3[r2++] = t3 >>> 24 & 255, i3[r2++] = 0, i3[r2++] = 0, i3[r2++] = 0, i3[r2++] = 0, o2 = 8; o2 < this.padLength; o2++) i3[r2++] = 0;
            return i3;
          };
        }, 2344: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(6436), r = n2(9746);
          function o(t3, e3, n3) {
            if (!(this instanceof o)) return new o(t3, e3, n3);
            this.Hash = t3, this.blockSize = t3.blockSize / 8, this.outSize = t3.outSize / 8, this.inner = null, this.outer = null, this._init(i2.toArray(e3, n3));
          }
          t2.exports = o, o.prototype._init = function(t3) {
            t3.length > this.blockSize && (t3 = new this.Hash().update(t3).digest()), r(t3.length <= this.blockSize);
            for (var e3 = t3.length; e3 < this.blockSize; e3++) t3.push(0);
            for (e3 = 0; e3 < t3.length; e3++) t3[e3] ^= 54;
            for (this.inner = new this.Hash().update(t3), e3 = 0; e3 < t3.length; e3++) t3[e3] ^= 106;
            this.outer = new this.Hash().update(t3);
          }, o.prototype.update = function(t3, e3) {
            return this.inner.update(t3, e3), this;
          }, o.prototype.digest = function(t3) {
            return this.outer.update(this.inner.digest()), this.outer.digest(t3);
          };
        }, 2949: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(6436), r = n2(5772), o = i2.rotl32, s = i2.sum32, a = i2.sum32_3, l = i2.sum32_4, c = r.BlockHash;
          function d() {
            if (!(this instanceof d)) return new d();
            c.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
          }
          function u(t3, e3, n3, i3) {
            return t3 <= 15 ? e3 ^ n3 ^ i3 : t3 <= 31 ? e3 & n3 | ~e3 & i3 : t3 <= 47 ? (e3 | ~n3) ^ i3 : t3 <= 63 ? e3 & i3 | n3 & ~i3 : e3 ^ (n3 | ~i3);
          }
          function h(t3) {
            return t3 <= 15 ? 0 : t3 <= 31 ? 1518500249 : t3 <= 47 ? 1859775393 : t3 <= 63 ? 2400959708 : 2840853838;
          }
          function p(t3) {
            return t3 <= 15 ? 1352829926 : t3 <= 31 ? 1548603684 : t3 <= 47 ? 1836072691 : t3 <= 63 ? 2053994217 : 0;
          }
          i2.inherits(d, c), e2.ripemd160 = d, d.blockSize = 512, d.outSize = 160, d.hmacStrength = 192, d.padLength = 64, d.prototype._update = function(t3, e3) {
            for (var n3 = this.h[0], i3 = this.h[1], r2 = this.h[2], c2 = this.h[3], d2 = this.h[4], E = n3, I = i3, S = r2, w = c2, m = d2, _ = 0; _ < 80; _++) {
              var C = s(o(l(n3, u(_, i3, r2, c2), t3[f[_] + e3], h(_)), v[_]), d2);
              n3 = d2, d2 = c2, c2 = o(r2, 10), r2 = i3, i3 = C, C = s(o(l(E, u(79 - _, I, S, w), t3[g[_] + e3], p(_)), y[_]), m), E = m, m = w, w = o(S, 10), S = I, I = C;
            }
            C = a(this.h[1], r2, w), this.h[1] = a(this.h[2], c2, m), this.h[2] = a(this.h[3], d2, E), this.h[3] = a(this.h[4], n3, I), this.h[4] = a(this.h[0], i3, S), this.h[0] = C;
          }, d.prototype._digest = function(t3) {
            return "hex" === t3 ? i2.toHex32(this.h, "little") : i2.split32(this.h, "little");
          };
          var f = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13], g = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11], v = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6], y = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
        }, 9041: (t2, e2, n2) => {
          "use strict";
          e2.sha1 = n2(4761), e2.sha224 = n2(799), e2.sha256 = n2(9344), e2.sha384 = n2(772), e2.sha512 = n2(5900);
        }, 4761: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(6436), r = n2(5772), o = n2(7038), s = i2.rotl32, a = i2.sum32, l = i2.sum32_5, c = o.ft_1, d = r.BlockHash, u = [1518500249, 1859775393, 2400959708, 3395469782];
          function h() {
            if (!(this instanceof h)) return new h();
            d.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80);
          }
          i2.inherits(h, d), t2.exports = h, h.blockSize = 512, h.outSize = 160, h.hmacStrength = 80, h.padLength = 64, h.prototype._update = function(t3, e3) {
            for (var n3 = this.W, i3 = 0; i3 < 16; i3++) n3[i3] = t3[e3 + i3];
            for (; i3 < n3.length; i3++) n3[i3] = s(n3[i3 - 3] ^ n3[i3 - 8] ^ n3[i3 - 14] ^ n3[i3 - 16], 1);
            var r2 = this.h[0], o2 = this.h[1], d2 = this.h[2], h2 = this.h[3], p = this.h[4];
            for (i3 = 0; i3 < n3.length; i3++) {
              var f = ~~(i3 / 20), g = l(s(r2, 5), c(f, o2, d2, h2), p, n3[i3], u[f]);
              p = h2, h2 = d2, d2 = s(o2, 30), o2 = r2, r2 = g;
            }
            this.h[0] = a(this.h[0], r2), this.h[1] = a(this.h[1], o2), this.h[2] = a(this.h[2], d2), this.h[3] = a(this.h[3], h2), this.h[4] = a(this.h[4], p);
          }, h.prototype._digest = function(t3) {
            return "hex" === t3 ? i2.toHex32(this.h, "big") : i2.split32(this.h, "big");
          };
        }, 799: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(6436), r = n2(9344);
          function o() {
            if (!(this instanceof o)) return new o();
            r.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428];
          }
          i2.inherits(o, r), t2.exports = o, o.blockSize = 512, o.outSize = 224, o.hmacStrength = 192, o.padLength = 64, o.prototype._digest = function(t3) {
            return "hex" === t3 ? i2.toHex32(this.h.slice(0, 7), "big") : i2.split32(this.h.slice(0, 7), "big");
          };
        }, 9344: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(6436), r = n2(5772), o = n2(7038), s = n2(9746), a = i2.sum32, l = i2.sum32_4, c = i2.sum32_5, d = o.ch32, u = o.maj32, h = o.s0_256, p = o.s1_256, f = o.g0_256, g = o.g1_256, v = r.BlockHash, y = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
          function E() {
            if (!(this instanceof E)) return new E();
            v.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = y, this.W = new Array(64);
          }
          i2.inherits(E, v), t2.exports = E, E.blockSize = 512, E.outSize = 256, E.hmacStrength = 192, E.padLength = 64, E.prototype._update = function(t3, e3) {
            for (var n3 = this.W, i3 = 0; i3 < 16; i3++) n3[i3] = t3[e3 + i3];
            for (; i3 < n3.length; i3++) n3[i3] = l(g(n3[i3 - 2]), n3[i3 - 7], f(n3[i3 - 15]), n3[i3 - 16]);
            var r2 = this.h[0], o2 = this.h[1], v2 = this.h[2], y2 = this.h[3], E2 = this.h[4], I = this.h[5], S = this.h[6], w = this.h[7];
            for (s(this.k.length === n3.length), i3 = 0; i3 < n3.length; i3++) {
              var m = c(w, p(E2), d(E2, I, S), this.k[i3], n3[i3]), _ = a(h(r2), u(r2, o2, v2));
              w = S, S = I, I = E2, E2 = a(y2, m), y2 = v2, v2 = o2, o2 = r2, r2 = a(m, _);
            }
            this.h[0] = a(this.h[0], r2), this.h[1] = a(this.h[1], o2), this.h[2] = a(this.h[2], v2), this.h[3] = a(this.h[3], y2), this.h[4] = a(this.h[4], E2), this.h[5] = a(this.h[5], I), this.h[6] = a(this.h[6], S), this.h[7] = a(this.h[7], w);
          }, E.prototype._digest = function(t3) {
            return "hex" === t3 ? i2.toHex32(this.h, "big") : i2.split32(this.h, "big");
          };
        }, 772: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(6436), r = n2(5900);
          function o() {
            if (!(this instanceof o)) return new o();
            r.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428];
          }
          i2.inherits(o, r), t2.exports = o, o.blockSize = 1024, o.outSize = 384, o.hmacStrength = 192, o.padLength = 128, o.prototype._digest = function(t3) {
            return "hex" === t3 ? i2.toHex32(this.h.slice(0, 12), "big") : i2.split32(this.h.slice(0, 12), "big");
          };
        }, 5900: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(6436), r = n2(5772), o = n2(9746), s = i2.rotr64_hi, a = i2.rotr64_lo, l = i2.shr64_hi, c = i2.shr64_lo, d = i2.sum64, u = i2.sum64_hi, h = i2.sum64_lo, p = i2.sum64_4_hi, f = i2.sum64_4_lo, g = i2.sum64_5_hi, v = i2.sum64_5_lo, y = r.BlockHash, E = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];
          function I() {
            if (!(this instanceof I)) return new I();
            y.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = E, this.W = new Array(160);
          }
          function S(t3, e3, n3, i3, r2) {
            var o2 = t3 & n3 ^ ~t3 & r2;
            return o2 < 0 && (o2 += 4294967296), o2;
          }
          function w(t3, e3, n3, i3, r2, o2) {
            var s2 = e3 & i3 ^ ~e3 & o2;
            return s2 < 0 && (s2 += 4294967296), s2;
          }
          function m(t3, e3, n3, i3, r2) {
            var o2 = t3 & n3 ^ t3 & r2 ^ n3 & r2;
            return o2 < 0 && (o2 += 4294967296), o2;
          }
          function _(t3, e3, n3, i3, r2, o2) {
            var s2 = e3 & i3 ^ e3 & o2 ^ i3 & o2;
            return s2 < 0 && (s2 += 4294967296), s2;
          }
          function C(t3, e3) {
            var n3 = s(t3, e3, 28) ^ s(e3, t3, 2) ^ s(e3, t3, 7);
            return n3 < 0 && (n3 += 4294967296), n3;
          }
          function O(t3, e3) {
            var n3 = a(t3, e3, 28) ^ a(e3, t3, 2) ^ a(e3, t3, 7);
            return n3 < 0 && (n3 += 4294967296), n3;
          }
          function A(t3, e3) {
            var n3 = s(t3, e3, 14) ^ s(t3, e3, 18) ^ s(e3, t3, 9);
            return n3 < 0 && (n3 += 4294967296), n3;
          }
          function b(t3, e3) {
            var n3 = a(t3, e3, 14) ^ a(t3, e3, 18) ^ a(e3, t3, 9);
            return n3 < 0 && (n3 += 4294967296), n3;
          }
          function T(t3, e3) {
            var n3 = s(t3, e3, 1) ^ s(t3, e3, 8) ^ l(t3, e3, 7);
            return n3 < 0 && (n3 += 4294967296), n3;
          }
          function N(t3, e3) {
            var n3 = a(t3, e3, 1) ^ a(t3, e3, 8) ^ c(t3, e3, 7);
            return n3 < 0 && (n3 += 4294967296), n3;
          }
          function P(t3, e3) {
            var n3 = s(t3, e3, 19) ^ s(e3, t3, 29) ^ l(t3, e3, 6);
            return n3 < 0 && (n3 += 4294967296), n3;
          }
          function D(t3, e3) {
            var n3 = a(t3, e3, 19) ^ a(e3, t3, 29) ^ c(t3, e3, 6);
            return n3 < 0 && (n3 += 4294967296), n3;
          }
          i2.inherits(I, y), t2.exports = I, I.blockSize = 1024, I.outSize = 512, I.hmacStrength = 192, I.padLength = 128, I.prototype._prepareBlock = function(t3, e3) {
            for (var n3 = this.W, i3 = 0; i3 < 32; i3++) n3[i3] = t3[e3 + i3];
            for (; i3 < n3.length; i3 += 2) {
              var r2 = P(n3[i3 - 4], n3[i3 - 3]), o2 = D(n3[i3 - 4], n3[i3 - 3]), s2 = n3[i3 - 14], a2 = n3[i3 - 13], l2 = T(n3[i3 - 30], n3[i3 - 29]), c2 = N(n3[i3 - 30], n3[i3 - 29]), d2 = n3[i3 - 32], u2 = n3[i3 - 31];
              n3[i3] = p(r2, o2, s2, a2, l2, c2, d2, u2), n3[i3 + 1] = f(r2, o2, s2, a2, l2, c2, d2, u2);
            }
          }, I.prototype._update = function(t3, e3) {
            this._prepareBlock(t3, e3);
            var n3 = this.W, i3 = this.h[0], r2 = this.h[1], s2 = this.h[2], a2 = this.h[3], l2 = this.h[4], c2 = this.h[5], p2 = this.h[6], f2 = this.h[7], y2 = this.h[8], E2 = this.h[9], I2 = this.h[10], T2 = this.h[11], N2 = this.h[12], P2 = this.h[13], D2 = this.h[14], R = this.h[15];
            o(this.k.length === n3.length);
            for (var L = 0; L < n3.length; L += 2) {
              var U = D2, k = R, M = A(y2, E2), F = b(y2, E2), B = S(y2, E2, I2, T2, N2), j = w(y2, E2, I2, T2, N2, P2), x = this.k[L], $ = this.k[L + 1], V = n3[L], K = n3[L + 1], H = g(U, k, M, F, B, j, x, $, V, K), W = v(U, k, M, F, B, j, x, $, V, K);
              U = C(i3, r2), k = O(i3, r2), M = m(i3, r2, s2, a2, l2), F = _(i3, r2, s2, a2, l2, c2);
              var G = u(U, k, M, F), q = h(U, k, M, F);
              D2 = N2, R = P2, N2 = I2, P2 = T2, I2 = y2, T2 = E2, y2 = u(p2, f2, H, W), E2 = h(f2, f2, H, W), p2 = l2, f2 = c2, l2 = s2, c2 = a2, s2 = i3, a2 = r2, i3 = u(H, W, G, q), r2 = h(H, W, G, q);
            }
            d(this.h, 0, i3, r2), d(this.h, 2, s2, a2), d(this.h, 4, l2, c2), d(this.h, 6, p2, f2), d(this.h, 8, y2, E2), d(this.h, 10, I2, T2), d(this.h, 12, N2, P2), d(this.h, 14, D2, R);
          }, I.prototype._digest = function(t3) {
            return "hex" === t3 ? i2.toHex32(this.h, "big") : i2.split32(this.h, "big");
          };
        }, 7038: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(6436).rotr32;
          function r(t3, e3, n3) {
            return t3 & e3 ^ ~t3 & n3;
          }
          function o(t3, e3, n3) {
            return t3 & e3 ^ t3 & n3 ^ e3 & n3;
          }
          function s(t3, e3, n3) {
            return t3 ^ e3 ^ n3;
          }
          e2.ft_1 = function(t3, e3, n3, i3) {
            return 0 === t3 ? r(e3, n3, i3) : 1 === t3 || 3 === t3 ? s(e3, n3, i3) : 2 === t3 ? o(e3, n3, i3) : void 0;
          }, e2.ch32 = r, e2.maj32 = o, e2.p32 = s, e2.s0_256 = function(t3) {
            return i2(t3, 2) ^ i2(t3, 13) ^ i2(t3, 22);
          }, e2.s1_256 = function(t3) {
            return i2(t3, 6) ^ i2(t3, 11) ^ i2(t3, 25);
          }, e2.g0_256 = function(t3) {
            return i2(t3, 7) ^ i2(t3, 18) ^ t3 >>> 3;
          }, e2.g1_256 = function(t3) {
            return i2(t3, 17) ^ i2(t3, 19) ^ t3 >>> 10;
          };
        }, 6436: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(9746), r = n2(5717);
          function o(t3, e3) {
            return 55296 == (64512 & t3.charCodeAt(e3)) && (!(e3 < 0 || e3 + 1 >= t3.length) && 56320 == (64512 & t3.charCodeAt(e3 + 1)));
          }
          function s(t3) {
            return (t3 >>> 24 | t3 >>> 8 & 65280 | t3 << 8 & 16711680 | (255 & t3) << 24) >>> 0;
          }
          function a(t3) {
            return 1 === t3.length ? "0" + t3 : t3;
          }
          function l(t3) {
            return 7 === t3.length ? "0" + t3 : 6 === t3.length ? "00" + t3 : 5 === t3.length ? "000" + t3 : 4 === t3.length ? "0000" + t3 : 3 === t3.length ? "00000" + t3 : 2 === t3.length ? "000000" + t3 : 1 === t3.length ? "0000000" + t3 : t3;
          }
          e2.inherits = r, e2.toArray = function(t3, e3) {
            if (Array.isArray(t3)) return t3.slice();
            if (!t3) return [];
            var n3 = [];
            if ("string" == typeof t3) if (e3) {
              if ("hex" === e3) for ((t3 = t3.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t3 = "0" + t3), r2 = 0; r2 < t3.length; r2 += 2) n3.push(parseInt(t3[r2] + t3[r2 + 1], 16));
            } else for (var i3 = 0, r2 = 0; r2 < t3.length; r2++) {
              var s2 = t3.charCodeAt(r2);
              s2 < 128 ? n3[i3++] = s2 : s2 < 2048 ? (n3[i3++] = s2 >> 6 | 192, n3[i3++] = 63 & s2 | 128) : o(t3, r2) ? (s2 = 65536 + ((1023 & s2) << 10) + (1023 & t3.charCodeAt(++r2)), n3[i3++] = s2 >> 18 | 240, n3[i3++] = s2 >> 12 & 63 | 128, n3[i3++] = s2 >> 6 & 63 | 128, n3[i3++] = 63 & s2 | 128) : (n3[i3++] = s2 >> 12 | 224, n3[i3++] = s2 >> 6 & 63 | 128, n3[i3++] = 63 & s2 | 128);
            }
            else for (r2 = 0; r2 < t3.length; r2++) n3[r2] = 0 | t3[r2];
            return n3;
          }, e2.toHex = function(t3) {
            for (var e3 = "", n3 = 0; n3 < t3.length; n3++) e3 += a(t3[n3].toString(16));
            return e3;
          }, e2.htonl = s, e2.toHex32 = function(t3, e3) {
            for (var n3 = "", i3 = 0; i3 < t3.length; i3++) {
              var r2 = t3[i3];
              "little" === e3 && (r2 = s(r2)), n3 += l(r2.toString(16));
            }
            return n3;
          }, e2.zero2 = a, e2.zero8 = l, e2.join32 = function(t3, e3, n3, r2) {
            var o2 = n3 - e3;
            i2(o2 % 4 == 0);
            for (var s2 = new Array(o2 / 4), a2 = 0, l2 = e3; a2 < s2.length; a2++, l2 += 4) {
              var c;
              c = "big" === r2 ? t3[l2] << 24 | t3[l2 + 1] << 16 | t3[l2 + 2] << 8 | t3[l2 + 3] : t3[l2 + 3] << 24 | t3[l2 + 2] << 16 | t3[l2 + 1] << 8 | t3[l2], s2[a2] = c >>> 0;
            }
            return s2;
          }, e2.split32 = function(t3, e3) {
            for (var n3 = new Array(4 * t3.length), i3 = 0, r2 = 0; i3 < t3.length; i3++, r2 += 4) {
              var o2 = t3[i3];
              "big" === e3 ? (n3[r2] = o2 >>> 24, n3[r2 + 1] = o2 >>> 16 & 255, n3[r2 + 2] = o2 >>> 8 & 255, n3[r2 + 3] = 255 & o2) : (n3[r2 + 3] = o2 >>> 24, n3[r2 + 2] = o2 >>> 16 & 255, n3[r2 + 1] = o2 >>> 8 & 255, n3[r2] = 255 & o2);
            }
            return n3;
          }, e2.rotr32 = function(t3, e3) {
            return t3 >>> e3 | t3 << 32 - e3;
          }, e2.rotl32 = function(t3, e3) {
            return t3 << e3 | t3 >>> 32 - e3;
          }, e2.sum32 = function(t3, e3) {
            return t3 + e3 >>> 0;
          }, e2.sum32_3 = function(t3, e3, n3) {
            return t3 + e3 + n3 >>> 0;
          }, e2.sum32_4 = function(t3, e3, n3, i3) {
            return t3 + e3 + n3 + i3 >>> 0;
          }, e2.sum32_5 = function(t3, e3, n3, i3, r2) {
            return t3 + e3 + n3 + i3 + r2 >>> 0;
          }, e2.sum64 = function(t3, e3, n3, i3) {
            var r2 = t3[e3], o2 = i3 + t3[e3 + 1] >>> 0, s2 = (o2 < i3 ? 1 : 0) + n3 + r2;
            t3[e3] = s2 >>> 0, t3[e3 + 1] = o2;
          }, e2.sum64_hi = function(t3, e3, n3, i3) {
            return (e3 + i3 >>> 0 < e3 ? 1 : 0) + t3 + n3 >>> 0;
          }, e2.sum64_lo = function(t3, e3, n3, i3) {
            return e3 + i3 >>> 0;
          }, e2.sum64_4_hi = function(t3, e3, n3, i3, r2, o2, s2, a2) {
            var l2 = 0, c = e3;
            return l2 += (c = c + i3 >>> 0) < e3 ? 1 : 0, l2 += (c = c + o2 >>> 0) < o2 ? 1 : 0, t3 + n3 + r2 + s2 + (l2 += (c = c + a2 >>> 0) < a2 ? 1 : 0) >>> 0;
          }, e2.sum64_4_lo = function(t3, e3, n3, i3, r2, o2, s2, a2) {
            return e3 + i3 + o2 + a2 >>> 0;
          }, e2.sum64_5_hi = function(t3, e3, n3, i3, r2, o2, s2, a2, l2, c) {
            var d = 0, u = e3;
            return d += (u = u + i3 >>> 0) < e3 ? 1 : 0, d += (u = u + o2 >>> 0) < o2 ? 1 : 0, d += (u = u + a2 >>> 0) < a2 ? 1 : 0, t3 + n3 + r2 + s2 + l2 + (d += (u = u + c >>> 0) < c ? 1 : 0) >>> 0;
          }, e2.sum64_5_lo = function(t3, e3, n3, i3, r2, o2, s2, a2, l2, c) {
            return e3 + i3 + o2 + a2 + c >>> 0;
          }, e2.rotr64_hi = function(t3, e3, n3) {
            return (e3 << 32 - n3 | t3 >>> n3) >>> 0;
          }, e2.rotr64_lo = function(t3, e3, n3) {
            return (t3 << 32 - n3 | e3 >>> n3) >>> 0;
          }, e2.shr64_hi = function(t3, e3, n3) {
            return t3 >>> n3;
          }, e2.shr64_lo = function(t3, e3, n3) {
            return (t3 << 32 - n3 | e3 >>> n3) >>> 0;
          };
        }, 645: (t2, e2) => {
          e2.read = function(t3, e3, n2, i2, r) {
            var o, s, a = 8 * r - i2 - 1, l = (1 << a) - 1, c = l >> 1, d = -7, u = n2 ? r - 1 : 0, h = n2 ? -1 : 1, p = t3[e3 + u];
            for (u += h, o = p & (1 << -d) - 1, p >>= -d, d += a; d > 0; o = 256 * o + t3[e3 + u], u += h, d -= 8) ;
            for (s = o & (1 << -d) - 1, o >>= -d, d += i2; d > 0; s = 256 * s + t3[e3 + u], u += h, d -= 8) ;
            if (0 === o) o = 1 - c;
            else {
              if (o === l) return s ? NaN : 1 / 0 * (p ? -1 : 1);
              s += Math.pow(2, i2), o -= c;
            }
            return (p ? -1 : 1) * s * Math.pow(2, o - i2);
          }, e2.write = function(t3, e3, n2, i2, r, o) {
            var s, a, l, c = 8 * o - r - 1, d = (1 << c) - 1, u = d >> 1, h = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = i2 ? 0 : o - 1, f = i2 ? 1 : -1, g = e3 < 0 || 0 === e3 && 1 / e3 < 0 ? 1 : 0;
            for (e3 = Math.abs(e3), isNaN(e3) || e3 === 1 / 0 ? (a = isNaN(e3) ? 1 : 0, s = d) : (s = Math.floor(Math.log(e3) / Math.LN2), e3 * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), (e3 += s + u >= 1 ? h / l : h * Math.pow(2, 1 - u)) * l >= 2 && (s++, l /= 2), s + u >= d ? (a = 0, s = d) : s + u >= 1 ? (a = (e3 * l - 1) * Math.pow(2, r), s += u) : (a = e3 * Math.pow(2, u - 1) * Math.pow(2, r), s = 0)); r >= 8; t3[n2 + p] = 255 & a, p += f, a /= 256, r -= 8) ;
            for (s = s << r | a, c += r; c > 0; t3[n2 + p] = 255 & s, p += f, s /= 256, c -= 8) ;
            t3[n2 + p - f] |= 128 * g;
          };
        }, 5717: (t2) => {
          "function" == typeof Object.create ? t2.exports = function(t3, e2) {
            e2 && (t3.super_ = e2, t3.prototype = Object.create(e2.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }));
          } : t2.exports = function(t3, e2) {
            if (e2) {
              t3.super_ = e2;
              var n2 = function() {
              };
              n2.prototype = e2.prototype, t3.prototype = new n2(), t3.prototype.constructor = t3;
            }
          };
        }, 5299: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(7798);
          function r(t3) {
            return true === i2(t3) && "[object Object]" === Object.prototype.toString.call(t3);
          }
          t2.exports = function(t3) {
            var e3, n3;
            return false !== r(t3) && ("function" == typeof (e3 = t3.constructor) && (false !== r(n3 = e3.prototype) && false !== n3.hasOwnProperty("isPrototypeOf")));
          };
        }, 7798: (t2) => {
          "use strict";
          t2.exports = function(t3) {
            return null != t3 && "object" == typeof t3 && false === Array.isArray(t3);
          };
        }, 6245: (t2, e2, n2) => {
          "use strict";
          function i2(t3) {
            this.message = t3;
          }
          n2.r(e2), n2.d(e2, { InvalidTokenError: () => s, default: () => a }), i2.prototype = new Error(), i2.prototype.name = "InvalidCharacterError";
          var r = "undefined" != typeof window && window.atob && window.atob.bind(window) || function(t3) {
            var e3 = String(t3).replace(/=+$/, "");
            if (e3.length % 4 == 1) throw new i2("'atob' failed: The string to be decoded is not correctly encoded.");
            for (var n3, r2, o2 = 0, s2 = 0, a2 = ""; r2 = e3.charAt(s2++); ~r2 && (n3 = o2 % 4 ? 64 * n3 + r2 : r2, o2++ % 4) ? a2 += String.fromCharCode(255 & n3 >> (-2 * o2 & 6)) : 0) r2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(r2);
            return a2;
          };
          function o(t3) {
            var e3 = t3.replace(/-/g, "+").replace(/_/g, "/");
            switch (e3.length % 4) {
              case 0:
                break;
              case 2:
                e3 += "==";
                break;
              case 3:
                e3 += "=";
                break;
              default:
                throw "Illegal base64url string!";
            }
            try {
              return (function(t4) {
                return decodeURIComponent(r(t4).replace(/(.)/g, (function(t5, e4) {
                  var n3 = e4.charCodeAt(0).toString(16).toUpperCase();
                  return n3.length < 2 && (n3 = "0" + n3), "%" + n3;
                })));
              })(e3);
            } catch (t4) {
              return r(e3);
            }
          }
          function s(t3) {
            this.message = t3;
          }
          s.prototype = new Error(), s.prototype.name = "InvalidTokenError";
          const a = function(t3, e3) {
            if ("string" != typeof t3) throw new s("Invalid token specified");
            var n3 = true === (e3 = e3 || {}).header ? 0 : 1;
            try {
              return JSON.parse(o(t3.split(".")[n3]));
            } catch (t4) {
              throw new s("Invalid token specified: " + t4.message);
            }
          };
        }, 6401: (t2) => {
          var e2 = Object.prototype.toString;
          function n2(t3) {
            return "function" == typeof t3.constructor ? t3.constructor.name : null;
          }
          t2.exports = function(t3) {
            if (void 0 === t3) return "undefined";
            if (null === t3) return "null";
            var i2 = typeof t3;
            if ("boolean" === i2) return "boolean";
            if ("string" === i2) return "string";
            if ("number" === i2) return "number";
            if ("symbol" === i2) return "symbol";
            if ("function" === i2) return "GeneratorFunction" === n2(t3) ? "generatorfunction" : "function";
            if ((function(t4) {
              return Array.isArray ? Array.isArray(t4) : t4 instanceof Array;
            })(t3)) return "array";
            if ((function(t4) {
              if (t4.constructor && "function" == typeof t4.constructor.isBuffer) return t4.constructor.isBuffer(t4);
              return false;
            })(t3)) return "buffer";
            if ((function(t4) {
              try {
                if ("number" == typeof t4.length && "function" == typeof t4.callee) return true;
              } catch (t5) {
                if (-1 !== t5.message.indexOf("callee")) return true;
              }
              return false;
            })(t3)) return "arguments";
            if ((function(t4) {
              return t4 instanceof Date || "function" == typeof t4.toDateString && "function" == typeof t4.getDate && "function" == typeof t4.setDate;
            })(t3)) return "date";
            if ((function(t4) {
              return t4 instanceof Error || "string" == typeof t4.message && t4.constructor && "number" == typeof t4.constructor.stackTraceLimit;
            })(t3)) return "error";
            if ((function(t4) {
              return t4 instanceof RegExp || "string" == typeof t4.flags && "boolean" == typeof t4.ignoreCase && "boolean" == typeof t4.multiline && "boolean" == typeof t4.global;
            })(t3)) return "regexp";
            switch (n2(t3)) {
              case "Symbol":
                return "symbol";
              case "Promise":
                return "promise";
              case "WeakMap":
                return "weakmap";
              case "WeakSet":
                return "weakset";
              case "Map":
                return "map";
              case "Set":
                return "set";
              case "Int8Array":
                return "int8array";
              case "Uint8Array":
                return "uint8array";
              case "Uint8ClampedArray":
                return "uint8clampedarray";
              case "Int16Array":
                return "int16array";
              case "Uint16Array":
                return "uint16array";
              case "Int32Array":
                return "int32array";
              case "Uint32Array":
                return "uint32array";
              case "Float32Array":
                return "float32array";
              case "Float64Array":
                return "float64array";
            }
            if ((function(t4) {
              return "function" == typeof t4.throw && "function" == typeof t4.return && "function" == typeof t4.next;
            })(t3)) return "generator";
            switch (i2 = e2.call(t3)) {
              case "[object Object]":
                return "object";
              case "[object Map Iterator]":
                return "mapiterator";
              case "[object Set Iterator]":
                return "setiterator";
              case "[object String Iterator]":
                return "stringiterator";
              case "[object Array Iterator]":
                return "arrayiterator";
            }
            return i2.slice(8, -1).toLowerCase().replace(/\s/g, "");
          };
        }, 9746: (t2) => {
          function e2(t3, e3) {
            if (!t3) throw new Error(e3 || "Assertion failed");
          }
          t2.exports = e2, e2.equal = function(t3, e3, n2) {
            if (t3 != e3) throw new Error(n2 || "Assertion failed: " + t3 + " != " + e3);
          };
        }, 4155: (t2) => {
          var e2, n2, i2 = t2.exports = {};
          function r() {
            throw new Error("setTimeout has not been defined");
          }
          function o() {
            throw new Error("clearTimeout has not been defined");
          }
          function s(t3) {
            if (e2 === setTimeout) return setTimeout(t3, 0);
            if ((e2 === r || !e2) && setTimeout) return e2 = setTimeout, setTimeout(t3, 0);
            try {
              return e2(t3, 0);
            } catch (n3) {
              try {
                return e2.call(null, t3, 0);
              } catch (n4) {
                return e2.call(this, t3, 0);
              }
            }
          }
          !(function() {
            try {
              e2 = "function" == typeof setTimeout ? setTimeout : r;
            } catch (t3) {
              e2 = r;
            }
            try {
              n2 = "function" == typeof clearTimeout ? clearTimeout : o;
            } catch (t3) {
              n2 = o;
            }
          })();
          var a, l = [], c = false, d = -1;
          function u() {
            c && a && (c = false, a.length ? l = a.concat(l) : d = -1, l.length && h());
          }
          function h() {
            if (!c) {
              var t3 = s(u);
              c = true;
              for (var e3 = l.length; e3; ) {
                for (a = l, l = []; ++d < e3; ) a && a[d].run();
                d = -1, e3 = l.length;
              }
              a = null, c = false, (function(t4) {
                if (n2 === clearTimeout) return clearTimeout(t4);
                if ((n2 === o || !n2) && clearTimeout) return n2 = clearTimeout, clearTimeout(t4);
                try {
                  return n2(t4);
                } catch (e4) {
                  try {
                    return n2.call(null, t4);
                  } catch (e5) {
                    return n2.call(this, t4);
                  }
                }
              })(t3);
            }
          }
          function p(t3, e3) {
            this.fun = t3, this.array = e3;
          }
          function f() {
          }
          i2.nextTick = function(t3) {
            var e3 = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n3 = 1; n3 < arguments.length; n3++) e3[n3 - 1] = arguments[n3];
            l.push(new p(t3, e3)), 1 !== l.length || c || s(h);
          }, p.prototype.run = function() {
            this.fun.apply(null, this.array);
          }, i2.title = "browser", i2.browser = true, i2.env = {}, i2.argv = [], i2.version = "", i2.versions = {}, i2.on = f, i2.addListener = f, i2.once = f, i2.off = f, i2.removeListener = f, i2.removeAllListeners = f, i2.emit = f, i2.prependListener = f, i2.prependOnceListener = f, i2.listeners = function(t3) {
            return [];
          }, i2.binding = function(t3) {
            throw new Error("process.binding is not supported");
          }, i2.cwd = function() {
            return "/";
          }, i2.chdir = function(t3) {
            throw new Error("process.chdir is not supported");
          }, i2.umask = function() {
            return 0;
          };
        }, 3341: (t2, e2, n2) => {
          "use strict";
          var i2 = n2(8764).lW;
          const r = Symbol.prototype.valueOf, o = n2(6401);
          t2.exports = function(t3, e3) {
            switch (o(t3)) {
              case "array":
                return t3.slice();
              case "object":
                return Object.assign({}, t3);
              case "date":
                return new t3.constructor(Number(t3));
              case "map":
                return new Map(t3);
              case "set":
                return new Set(t3);
              case "buffer":
                return (function(t4) {
                  const e4 = t4.length, n3 = i2.allocUnsafe ? i2.allocUnsafe(e4) : i2.from(e4);
                  return t4.copy(n3), n3;
                })(t3);
              case "symbol":
                return (function(t4) {
                  return r ? Object(r.call(t4)) : {};
                })(t3);
              case "arraybuffer":
                return (function(t4) {
                  const e4 = new t4.constructor(t4.byteLength);
                  return new Uint8Array(e4).set(new Uint8Array(t4)), e4;
                })(t3);
              case "float32array":
              case "float64array":
              case "int16array":
              case "int32array":
              case "int8array":
              case "uint16array":
              case "uint32array":
              case "uint8clampedarray":
              case "uint8array":
                return (function(t4, e4) {
                  return new t4.constructor(t4.buffer, t4.byteOffset, t4.length);
                })(t3);
              case "regexp":
                return (function(t4) {
                  const e4 = void 0 !== t4.flags ? t4.flags : /\w+$/.exec(t4) || void 0, n3 = new t4.constructor(t4.source, e4);
                  return n3.lastIndex = t4.lastIndex, n3;
                })(t3);
              case "error":
                return Object.create(t3);
              default:
                return t3;
            }
          };
        }, 655: (t2, e2, n2) => {
          "use strict";
          n2.r(e2), n2.d(e2, { __assign: () => o, __asyncDelegator: () => w, __asyncGenerator: () => S, __asyncValues: () => m, __await: () => I, __awaiter: () => d, __classPrivateFieldGet: () => b, __classPrivateFieldSet: () => T, __createBinding: () => h, __decorate: () => a, __exportStar: () => p, __extends: () => r, __generator: () => u, __importDefault: () => A, __importStar: () => O, __makeTemplateObject: () => _, __metadata: () => c, __param: () => l, __read: () => g, __rest: () => s, __spread: () => v, __spreadArray: () => E, __spreadArrays: () => y, __values: () => f });
          var i2 = function(t3, e3) {
            return i2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
              t4.__proto__ = e4;
            } || function(t4, e4) {
              for (var n3 in e4) Object.prototype.hasOwnProperty.call(e4, n3) && (t4[n3] = e4[n3]);
            }, i2(t3, e3);
          };
          function r(t3, e3) {
            if ("function" != typeof e3 && null !== e3) throw new TypeError("Class extends value " + String(e3) + " is not a constructor or null");
            function n3() {
              this.constructor = t3;
            }
            i2(t3, e3), t3.prototype = null === e3 ? Object.create(e3) : (n3.prototype = e3.prototype, new n3());
          }
          var o = function() {
            return o = Object.assign || function(t3) {
              for (var e3, n3 = 1, i3 = arguments.length; n3 < i3; n3++) for (var r2 in e3 = arguments[n3]) Object.prototype.hasOwnProperty.call(e3, r2) && (t3[r2] = e3[r2]);
              return t3;
            }, o.apply(this, arguments);
          };
          function s(t3, e3) {
            var n3 = {};
            for (var i3 in t3) Object.prototype.hasOwnProperty.call(t3, i3) && e3.indexOf(i3) < 0 && (n3[i3] = t3[i3]);
            if (null != t3 && "function" == typeof Object.getOwnPropertySymbols) {
              var r2 = 0;
              for (i3 = Object.getOwnPropertySymbols(t3); r2 < i3.length; r2++) e3.indexOf(i3[r2]) < 0 && Object.prototype.propertyIsEnumerable.call(t3, i3[r2]) && (n3[i3[r2]] = t3[i3[r2]]);
            }
            return n3;
          }
          function a(t3, e3, n3, i3) {
            var r2, o2 = arguments.length, s2 = o2 < 3 ? e3 : null === i3 ? i3 = Object.getOwnPropertyDescriptor(e3, n3) : i3;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s2 = Reflect.decorate(t3, e3, n3, i3);
            else for (var a2 = t3.length - 1; a2 >= 0; a2--) (r2 = t3[a2]) && (s2 = (o2 < 3 ? r2(s2) : o2 > 3 ? r2(e3, n3, s2) : r2(e3, n3)) || s2);
            return o2 > 3 && s2 && Object.defineProperty(e3, n3, s2), s2;
          }
          function l(t3, e3) {
            return function(n3, i3) {
              e3(n3, i3, t3);
            };
          }
          function c(t3, e3) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t3, e3);
          }
          function d(t3, e3, n3, i3) {
            return new (n3 || (n3 = Promise))((function(r2, o2) {
              function s2(t4) {
                try {
                  l2(i3.next(t4));
                } catch (t5) {
                  o2(t5);
                }
              }
              function a2(t4) {
                try {
                  l2(i3.throw(t4));
                } catch (t5) {
                  o2(t5);
                }
              }
              function l2(t4) {
                var e4;
                t4.done ? r2(t4.value) : (e4 = t4.value, e4 instanceof n3 ? e4 : new n3((function(t5) {
                  t5(e4);
                }))).then(s2, a2);
              }
              l2((i3 = i3.apply(t3, e3 || [])).next());
            }));
          }
          function u(t3, e3) {
            var n3, i3, r2, o2, s2 = { label: 0, sent: function() {
              if (1 & r2[0]) throw r2[1];
              return r2[1];
            }, trys: [], ops: [] };
            return o2 = { next: a2(0), throw: a2(1), return: a2(2) }, "function" == typeof Symbol && (o2[Symbol.iterator] = function() {
              return this;
            }), o2;
            function a2(o3) {
              return function(a3) {
                return (function(o4) {
                  if (n3) throw new TypeError("Generator is already executing.");
                  for (; s2; ) try {
                    if (n3 = 1, i3 && (r2 = 2 & o4[0] ? i3.return : o4[0] ? i3.throw || ((r2 = i3.return) && r2.call(i3), 0) : i3.next) && !(r2 = r2.call(i3, o4[1])).done) return r2;
                    switch (i3 = 0, r2 && (o4 = [2 & o4[0], r2.value]), o4[0]) {
                      case 0:
                      case 1:
                        r2 = o4;
                        break;
                      case 4:
                        return s2.label++, { value: o4[1], done: false };
                      case 5:
                        s2.label++, i3 = o4[1], o4 = [0];
                        continue;
                      case 7:
                        o4 = s2.ops.pop(), s2.trys.pop();
                        continue;
                      default:
                        if (!(r2 = s2.trys, (r2 = r2.length > 0 && r2[r2.length - 1]) || 6 !== o4[0] && 2 !== o4[0])) {
                          s2 = 0;
                          continue;
                        }
                        if (3 === o4[0] && (!r2 || o4[1] > r2[0] && o4[1] < r2[3])) {
                          s2.label = o4[1];
                          break;
                        }
                        if (6 === o4[0] && s2.label < r2[1]) {
                          s2.label = r2[1], r2 = o4;
                          break;
                        }
                        if (r2 && s2.label < r2[2]) {
                          s2.label = r2[2], s2.ops.push(o4);
                          break;
                        }
                        r2[2] && s2.ops.pop(), s2.trys.pop();
                        continue;
                    }
                    o4 = e3.call(t3, s2);
                  } catch (t4) {
                    o4 = [6, t4], i3 = 0;
                  } finally {
                    n3 = r2 = 0;
                  }
                  if (5 & o4[0]) throw o4[1];
                  return { value: o4[0] ? o4[1] : void 0, done: true };
                })([o3, a3]);
              };
            }
          }
          var h = Object.create ? function(t3, e3, n3, i3) {
            void 0 === i3 && (i3 = n3), Object.defineProperty(t3, i3, { enumerable: true, get: function() {
              return e3[n3];
            } });
          } : function(t3, e3, n3, i3) {
            void 0 === i3 && (i3 = n3), t3[i3] = e3[n3];
          };
          function p(t3, e3) {
            for (var n3 in t3) "default" === n3 || Object.prototype.hasOwnProperty.call(e3, n3) || h(e3, t3, n3);
          }
          function f(t3) {
            var e3 = "function" == typeof Symbol && Symbol.iterator, n3 = e3 && t3[e3], i3 = 0;
            if (n3) return n3.call(t3);
            if (t3 && "number" == typeof t3.length) return { next: function() {
              return t3 && i3 >= t3.length && (t3 = void 0), { value: t3 && t3[i3++], done: !t3 };
            } };
            throw new TypeError(e3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
          }
          function g(t3, e3) {
            var n3 = "function" == typeof Symbol && t3[Symbol.iterator];
            if (!n3) return t3;
            var i3, r2, o2 = n3.call(t3), s2 = [];
            try {
              for (; (void 0 === e3 || e3-- > 0) && !(i3 = o2.next()).done; ) s2.push(i3.value);
            } catch (t4) {
              r2 = { error: t4 };
            } finally {
              try {
                i3 && !i3.done && (n3 = o2.return) && n3.call(o2);
              } finally {
                if (r2) throw r2.error;
              }
            }
            return s2;
          }
          function v() {
            for (var t3 = [], e3 = 0; e3 < arguments.length; e3++) t3 = t3.concat(g(arguments[e3]));
            return t3;
          }
          function y() {
            for (var t3 = 0, e3 = 0, n3 = arguments.length; e3 < n3; e3++) t3 += arguments[e3].length;
            var i3 = Array(t3), r2 = 0;
            for (e3 = 0; e3 < n3; e3++) for (var o2 = arguments[e3], s2 = 0, a2 = o2.length; s2 < a2; s2++, r2++) i3[r2] = o2[s2];
            return i3;
          }
          function E(t3, e3, n3) {
            if (n3 || 2 === arguments.length) for (var i3, r2 = 0, o2 = e3.length; r2 < o2; r2++) !i3 && r2 in e3 || (i3 || (i3 = Array.prototype.slice.call(e3, 0, r2)), i3[r2] = e3[r2]);
            return t3.concat(i3 || Array.prototype.slice.call(e3));
          }
          function I(t3) {
            return this instanceof I ? (this.v = t3, this) : new I(t3);
          }
          function S(t3, e3, n3) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var i3, r2 = n3.apply(t3, e3 || []), o2 = [];
            return i3 = {}, s2("next"), s2("throw"), s2("return"), i3[Symbol.asyncIterator] = function() {
              return this;
            }, i3;
            function s2(t4) {
              r2[t4] && (i3[t4] = function(e4) {
                return new Promise((function(n4, i4) {
                  o2.push([t4, e4, n4, i4]) > 1 || a2(t4, e4);
                }));
              });
            }
            function a2(t4, e4) {
              try {
                (n4 = r2[t4](e4)).value instanceof I ? Promise.resolve(n4.value.v).then(l2, c2) : d2(o2[0][2], n4);
              } catch (t5) {
                d2(o2[0][3], t5);
              }
              var n4;
            }
            function l2(t4) {
              a2("next", t4);
            }
            function c2(t4) {
              a2("throw", t4);
            }
            function d2(t4, e4) {
              t4(e4), o2.shift(), o2.length && a2(o2[0][0], o2[0][1]);
            }
          }
          function w(t3) {
            var e3, n3;
            return e3 = {}, i3("next"), i3("throw", (function(t4) {
              throw t4;
            })), i3("return"), e3[Symbol.iterator] = function() {
              return this;
            }, e3;
            function i3(i4, r2) {
              e3[i4] = t3[i4] ? function(e4) {
                return (n3 = !n3) ? { value: I(t3[i4](e4)), done: "return" === i4 } : r2 ? r2(e4) : e4;
              } : r2;
            }
          }
          function m(t3) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var e3, n3 = t3[Symbol.asyncIterator];
            return n3 ? n3.call(t3) : (t3 = f(t3), e3 = {}, i3("next"), i3("throw"), i3("return"), e3[Symbol.asyncIterator] = function() {
              return this;
            }, e3);
            function i3(n4) {
              e3[n4] = t3[n4] && function(e4) {
                return new Promise((function(i4, r2) {
                  (function(t4, e5, n5, i5) {
                    Promise.resolve(i5).then((function(e6) {
                      t4({ value: e6, done: n5 });
                    }), e5);
                  })(i4, r2, (e4 = t3[n4](e4)).done, e4.value);
                }));
              };
            }
          }
          function _(t3, e3) {
            return Object.defineProperty ? Object.defineProperty(t3, "raw", { value: e3 }) : t3.raw = e3, t3;
          }
          var C = Object.create ? function(t3, e3) {
            Object.defineProperty(t3, "default", { enumerable: true, value: e3 });
          } : function(t3, e3) {
            t3.default = e3;
          };
          function O(t3) {
            if (t3 && t3.__esModule) return t3;
            var e3 = {};
            if (null != t3) for (var n3 in t3) "default" !== n3 && Object.prototype.hasOwnProperty.call(t3, n3) && h(e3, t3, n3);
            return C(e3, t3), e3;
          }
          function A(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          }
          function b(t3, e3, n3, i3) {
            if ("a" === n3 && !i3) throw new TypeError("Private accessor was defined without a getter");
            if ("function" == typeof e3 ? t3 !== e3 || !i3 : !e3.has(t3)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
            return "m" === n3 ? i3 : "a" === n3 ? i3.call(t3) : i3 ? i3.value : e3.get(t3);
          }
          function T(t3, e3, n3, i3, r2) {
            if ("m" === i3) throw new TypeError("Private method is not writable");
            if ("a" === i3 && !r2) throw new TypeError("Private accessor was defined without a setter");
            if ("function" == typeof e3 ? t3 !== e3 || !r2 : !e3.has(t3)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
            return "a" === i3 ? r2.call(t3, n3) : r2 ? r2.value = n3 : e3.set(t3, n3), n3;
          }
        } }, e = {};
        function n(i2) {
          var r = e[i2];
          if (void 0 !== r) return r.exports;
          var o = e[i2] = { exports: {} };
          return t[i2].call(o.exports, o, o.exports, n), o.exports;
        }
        n.d = (t2, e2) => {
          for (var i2 in e2) n.o(e2, i2) && !n.o(t2, i2) && Object.defineProperty(t2, i2, { enumerable: true, get: e2[i2] });
        }, n.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), n.r = (t2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t2, "__esModule", { value: true });
        };
        var i = n(3056);
        module.exports = i;
      })();
    }
  });

  // public/client.js
  var require_client = __commonJS({
    "public/client.js"() {
      var import_connect = __toESM(require_src());
      async function init() {
        const statusEl = document.getElementById("status");
        const connectBtn = document.getElementById("connect-slack");
        try {
          const response = await fetch("/api/token");
          const { token, projectId } = await response.json();
          if (!token || !projectId) {
            throw new Error("Failed to fetch token or projectId");
          }
          await import_connect.paragon.authenticate(projectId, token);
          console.log("Authenticated with Paragon");
          connectBtn.addEventListener("click", async () => {
            try {
              await import_connect.paragon.connect("slack");
              statusEl.innerText = "Connected";
            } catch (error) {
              console.error("Connection failed", error);
              statusEl.innerText = "Failed";
            }
          });
        } catch (error) {
          console.error("Initialization failed", error);
          statusEl.innerText = "Failed";
        }
      }
      init();
    }
  });
  require_client();
})();
/*! Bundled license information:

@useparagon/connect/dist/src/index.js:
  (*! For license information please see index.js.LICENSE.txt *)
*/
