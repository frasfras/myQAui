'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _interopDefault(e){return(e&&(typeof e==='object')&&'default'in e)?e['default']:e}var axios=_interopDefault(require('axios')),Highlighter=_interopDefault(require('vue-highlight-words')),vueJsToggleButton=require('vue-js-toggle-button');//

var script = {
  name: "CdqaUI",
  components: {
    Highlighter: Highlighter,
    ToggleButton: vueJsToggleButton.ToggleButton
  },
  props: {
    api_endpoint_cpu: {
      type: String,
      default: "http://localhost:5000/api"
    },
    api_endpoint_gpu: {
      type: String,
      default: "http://localhost:5000/api"
    },
    queries_examples: {
      type: Array,
      default: function () {
        return ['What is artificial intelligence?', 'What is natural language processing?']
      }
    },
  },
  data: function data() {
    return {
      query: "",
      show: false,
      status: "started",
      answer: "",
      title: "",
      paragraph: "",
      gpu: false
    };
  },
  methods: {
    onSubmit: function onSubmit(evt) {
      evt.preventDefault();
      this.status = "loading";
      if (this.gpu) {
        var api_endpoint = this.api_endpoint_gpu;
      } else {
        api_endpoint = this.api_endpoint_cpu;
      }
      var self = this;
      axios
        .get(api_endpoint, { params: { query: self.query } })
        .then(function(response) {
          self.answer = response.data.answer;
          self.title = response.data.title;
          self.paragraph = response.data.paragraph;
          self.status = "done";
        })
        .catch(function(error) {
          alert(error);
        });
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;function createInjectorSSR(context) {
  if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
    context = __VUE_SSR_CONTEXT__;
  }

  if (!context) { return function () {}; }

  if (!('styles' in context)) {
    context._styles = context._styles || {};
    Object.defineProperty(context, 'styles', {
      enumerable: true,
      get: function get() {
        return context._renderStyles(context._styles);
      }
    });
    context._renderStyles = context._renderStyles || renderStyles;
  }

  return function (id, style) {
    return addStyle(id, style, context);
  };
}

function addStyle(id, css, context) {
  var group = css.media || 'default';
  var style = context._styles[group] || (context._styles[group] = {
    ids: [],
    css: ''
  });

  if (!style.ids.includes(id)) {
    style.media = css.media;
    style.ids.push(id);
    var code = css.source;

    style.css += code + '\n';
  }
}

function renderStyles(styles) {
  var css = '';

  for (var key in styles) {
    var style = styles[key];
    css += '<style data-vue-ssr-id="' + Array.from(style.ids).join(' ') + '"' + (style.media ? ' media="' + style.media + '"' : '') + '>' + style.css + '</style>';
  }

  return css;
}

var server = createInjectorSSR;/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cdqaUI"},[_vm._ssrNode("<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.8.2/css/all.css\" integrity=\"sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay\" crossorigin=\"anonymous\"> "),_vm._ssrNode("<div class=\"input m-4\">","</div>",[_c('toggle-button',{staticClass:"mb-3",attrs:{"value":false,"color":"#AE41A7","sync":true,"width":55,"labels":{checked: 'GPU', unchecked: 'CPU'}},model:{value:(_vm.gpu),callback:function ($$v) {_vm.gpu=$$v;},expression:"gpu"}}),_vm._ssrNode(" "),_c('b-form',{on:{"submit":_vm.onSubmit}},[_c('b-input-group',[_c('b-dropdown',{attrs:{"slot":"prepend","text":"Choose an example...","variant":"outline-secondary","size":"sm"},slot:"prepend"},_vm._l((_vm.queries_examples),function(i){return _c('b-dropdown-item',{key:i,on:{"click":function($event){_vm.query = i;}}},[_vm._v(_vm._s(i))])}),1),_vm._v(" "),_c('b-form-input',{attrs:{"placeholder":"or type a question..."},model:{value:(_vm.query),callback:function ($$v) {_vm.query=$$v;},expression:"query"}}),_vm._v(" "),_c('b-input-group-append',[_c('b-button',{staticClass:"gradient-fill background hover",on:{"click":_vm.onSubmit}},[(_vm.status == 'loading')?_c('b-spinner',{attrs:{"small":"","variant":'white',"label":"Small Spinner"}}):_c('i',{staticClass:"fa fa-search"})],1)],1)],1)],1),_vm._ssrNode(" <br> "),(_vm.status == 'done' && _vm.query != '')?_vm._ssrNode("<div>","</div>",[_vm._ssrNode("<div class=\"mb-4\"><span class=\"gradient-fill\">Answer</span> <br> <span>"+_vm._ssrEscape(_vm._s(_vm.answer))+"</span></div> "),_vm._ssrNode("<div class=\"mb-4\">","</div>",[_vm._ssrNode("<span class=\"gradient-fill\">Passage Context</span> <br> "),_c('Highlighter',{attrs:{"highlightClassName":"gradient-fill background hover","searchWords":[_vm.answer],"autoEscape":true,"textToHighlight":_vm.paragraph}})],2),_vm._ssrNode(" <span class=\"gradient-fill\">Original Document</span> <br> <span>"+_vm._ssrEscape(_vm._s(_vm.title))+"</span>")],2):_vm._e()],2)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-9a6b4d92_0", { source: ".cdqaUI[data-v-9a6b4d92]{text-align:left;font-family:Inter,Inter UI,Inter-UI,SF Pro Display,SF UI Text,Helvetica Neue,Helvetica,Arial,sans-serif;font-weight:400;letter-spacing:+.37px;color:#afafaf}.form-control[data-v-9a6b4d92]:focus{border-color:#ae41a7!important;box-shadow:0 0 5px #ae41a7!important}.gradient-fill[data-v-9a6b4d92]{background-image:linear-gradient(-225deg,#a445b2 0,#d41872 52%,#f06 100%)}.gradient-fill.background[data-v-9a6b4d92]{background-size:250% auto;border:medium none currentcolor;border-image:none 100% 1 0 stretch;transition-delay:0s,0s,0s,0s,0s,0s;transition-duration:.5s,.2s,.2s,.2s,.2s,.2s;transition-property:background-position,transform,box-shadow,border,transform,box-shadow;transition-timing-function:ease-out,ease,ease,ease,ease,ease;color:#fff;font-weight:700;border-radius:3px}span.gradient-fill[data-v-9a6b4d92]{-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:20px;font-weight:700;line-height:2.5}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-9a6b4d92";
  /* module identifier */
  var __vue_module_identifier__ = "data-v-9a6b4d92";
  /* functional template */
  var __vue_is_functional_template__ = false;

  
  var component = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    server
  );// Import vue component

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('CdqaUI', component);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=component;