/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+json+markdown+scss+typescript&plugins=line-highlight+line-numbers+toolbar+copy-to-clipboard */
var _self =
    'undefined' != typeof window ? window : 'undefined' != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
  Prism = (function() {
    var e = /\blang(?:uage)?-([\w-]+)\b/i,
      t = 0,
      n = (_self.Prism = {
        manual: _self.Prism && _self.Prism.manual,
        disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
        util: {
          encode: function(e) {
            return e instanceof r
              ? new r(e.type, n.util.encode(e.content), e.alias)
              : 'Array' === n.util.type(e)
              ? e.map(n.util.encode)
              : e
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/\u00a0/g, ' ');
          },
          type: function(e) {
            return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
          },
          objId: function(e) {
            return e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id;
          },
          clone: function(e, t) {
            var r = n.util.type(e);
            switch (((t = t || {}), r)) {
              case 'Object':
                if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                var a = {};
                t[n.util.objId(e)] = a;
                for (var l in e) e.hasOwnProperty(l) && (a[l] = n.util.clone(e[l], t));
                return a;
              case 'Array':
                if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                var a = [];
                return (
                  (t[n.util.objId(e)] = a),
                  e.forEach(function(e, r) {
                    a[r] = n.util.clone(e, t);
                  }),
                  a
                );
            }
            return e;
          },
        },
        languages: {
          extend: function(e, t) {
            var r = n.util.clone(n.languages[e]);
            for (var a in t) r[a] = t[a];
            return r;
          },
          insertBefore: function(e, t, r, a) {
            a = a || n.languages;
            var l = a[e];
            if (2 == arguments.length) {
              r = arguments[1];
              for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);
              return l;
            }
            var o = {};
            for (var s in l)
              if (l.hasOwnProperty(s)) {
                if (s == t) for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);
                o[s] = l[s];
              }
            return (
              n.languages.DFS(n.languages, function(t, n) {
                n === a[e] && t != e && (this[t] = o);
              }),
              (a[e] = o)
            );
          },
          DFS: function(e, t, r, a) {
            a = a || {};
            for (var l in e)
              e.hasOwnProperty(l) &&
                (t.call(e, l, e[l], r || l),
                'Object' !== n.util.type(e[l]) || a[n.util.objId(e[l])]
                  ? 'Array' !== n.util.type(e[l]) || a[n.util.objId(e[l])] || ((a[n.util.objId(e[l])] = !0), n.languages.DFS(e[l], t, l, a))
                  : ((a[n.util.objId(e[l])] = !0), n.languages.DFS(e[l], t, null, a)));
          },
        },
        plugins: {},
        highlightAll: function(e, t) {
          n.highlightAllUnder(document, e, t);
        },
        highlightAllUnder: function(e, t, r) {
          var a = {
            callback: r,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          n.hooks.run('before-highlightall', a);
          for (var l, i = a.elements || e.querySelectorAll(a.selector), o = 0; (l = i[o++]); ) n.highlightElement(l, t === !0, a.callback);
        },
        highlightElement: function(t, r, a) {
          for (var l, i, o = t; o && !e.test(o.className); ) o = o.parentNode;
          o && ((l = (o.className.match(e) || [, ''])[1].toLowerCase()), (i = n.languages[l])),
            (t.className = t.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + l),
            t.parentNode &&
              ((o = t.parentNode),
              /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, '').replace(/\s+/g, ' ') + ' language-' + l));
          var s = t.textContent,
            u = { element: t, language: l, grammar: i, code: s };
          if ((n.hooks.run('before-sanity-check', u), !u.code || !u.grammar))
            return (
              u.code && (n.hooks.run('before-highlight', u), (u.element.textContent = u.code), n.hooks.run('after-highlight', u)),
              n.hooks.run('complete', u),
              void 0
            );
          if ((n.hooks.run('before-highlight', u), r && _self.Worker)) {
            var g = new Worker(n.filename);
            (g.onmessage = function(e) {
              (u.highlightedCode = e.data),
                n.hooks.run('before-insert', u),
                (u.element.innerHTML = u.highlightedCode),
                a && a.call(u.element),
                n.hooks.run('after-highlight', u),
                n.hooks.run('complete', u);
            }),
              g.postMessage(JSON.stringify({ language: u.language, code: u.code, immediateClose: !0 }));
          } else
            (u.highlightedCode = n.highlight(u.code, u.grammar, u.language)),
              n.hooks.run('before-insert', u),
              (u.element.innerHTML = u.highlightedCode),
              a && a.call(t),
              n.hooks.run('after-highlight', u),
              n.hooks.run('complete', u);
        },
        highlight: function(e, t, a) {
          var l = { code: e, grammar: t, language: a };
          return (
            n.hooks.run('before-tokenize', l),
            (l.tokens = n.tokenize(l.code, l.grammar)),
            n.hooks.run('after-tokenize', l),
            r.stringify(n.util.encode(l.tokens), l.language)
          );
        },
        matchGrammar: function(e, t, r, a, l, i, o) {
          var s = n.Token;
          for (var u in r)
            if (r.hasOwnProperty(u) && r[u]) {
              if (u == o) return;
              var g = r[u];
              g = 'Array' === n.util.type(g) ? g : [g];
              for (var c = 0; c < g.length; ++c) {
                var h = g[c],
                  f = h.inside,
                  d = !!h.lookbehind,
                  m = !!h.greedy,
                  p = 0,
                  y = h.alias;
                if (m && !h.pattern.global) {
                  var v = h.pattern.toString().match(/[imuy]*$/)[0];
                  h.pattern = RegExp(h.pattern.source, v + 'g');
                }
                h = h.pattern || h;
                for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
                  var w = t[b];
                  if (t.length > e.length) return;
                  if (!(w instanceof s)) {
                    if (m && b != t.length - 1) {
                      h.lastIndex = k;
                      var _ = h.exec(e);
                      if (!_) break;
                      for (
                        var j = _.index + (d ? _[1].length : 0), P = _.index + _[0].length, A = b, x = k, O = t.length;
                        O > A && (P > x || (!t[A].type && !t[A - 1].greedy));
                        ++A
                      )
                        (x += t[A].length), j >= x && (++b, (k = x));
                      if (t[b] instanceof s) continue;
                      (I = A - b), (w = e.slice(k, x)), (_.index -= k);
                    } else {
                      h.lastIndex = 0;
                      var _ = h.exec(w),
                        I = 1;
                    }
                    if (_) {
                      d && (p = _[1] ? _[1].length : 0);
                      var j = _.index + p,
                        _ = _[0].slice(p),
                        P = j + _.length,
                        N = w.slice(0, j),
                        S = w.slice(P),
                        C = [b, I];
                      N && (++b, (k += N.length), C.push(N));
                      var E = new s(u, f ? n.tokenize(_, f) : _, y, _, m);
                      if (
                        (C.push(E), S && C.push(S), Array.prototype.splice.apply(t, C), 1 != I && n.matchGrammar(e, t, r, b, k, !0, u), i)
                      )
                        break;
                    } else if (i) break;
                  }
                }
              }
            }
        },
        tokenize: function(e, t) {
          var r = [e],
            a = t.rest;
          if (a) {
            for (var l in a) t[l] = a[l];
            delete t.rest;
          }
          return n.matchGrammar(e, r, t, 0, 0, !1), r;
        },
        hooks: {
          all: {},
          add: function(e, t) {
            var r = n.hooks.all;
            (r[e] = r[e] || []), r[e].push(t);
          },
          run: function(e, t) {
            var r = n.hooks.all[e];
            if (r && r.length) for (var a, l = 0; (a = r[l++]); ) a(t);
          },
        },
      }),
      r = (n.Token = function(e, t, n, r, a) {
        (this.type = e), (this.content = t), (this.alias = n), (this.length = 0 | (r || '').length), (this.greedy = !!a);
      });
    if (
      ((r.stringify = function(e, t, a) {
        if ('string' == typeof e) return e;
        if ('Array' === n.util.type(e))
          return e
            .map(function(n) {
              return r.stringify(n, t, e);
            })
            .join('');
        var l = {
          type: e.type,
          content: r.stringify(e.content, t, a),
          tag: 'span',
          classes: ['token', e.type],
          attributes: {},
          language: t,
          parent: a,
        };
        if (e.alias) {
          var i = 'Array' === n.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(l.classes, i);
        }
        n.hooks.run('wrap', l);
        var o = Object.keys(l.attributes)
          .map(function(e) {
            return e + '="' + (l.attributes[e] || '').replace(/"/g, '&quot;') + '"';
          })
          .join(' ');
        return '<' + l.tag + ' class="' + l.classes.join(' ') + '"' + (o ? ' ' + o : '') + '>' + l.content + '</' + l.tag + '>';
      }),
      !_self.document)
    )
      return _self.addEventListener
        ? (n.disableWorkerMessageHandler ||
            _self.addEventListener(
              'message',
              function(e) {
                var t = JSON.parse(e.data),
                  r = t.language,
                  a = t.code,
                  l = t.immediateClose;
                _self.postMessage(n.highlight(a, n.languages[r], r)), l && _self.close();
              },
              !1,
            ),
          _self.Prism)
        : _self.Prism;
    var a = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();
    return (
      a &&
        ((n.filename = a.src),
        n.manual ||
          a.hasAttribute('data-manual') ||
          ('loading' !== document.readyState
            ? window.requestAnimationFrame
              ? window.requestAnimationFrame(n.highlightAll)
              : window.setTimeout(n.highlightAll, 16)
            : document.addEventListener('DOMContentLoaded', n.highlightAll))),
      _self.Prism
    );
  })();
'undefined' != typeof module && module.exports && (module.exports = Prism), 'undefined' != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    greedy: !0,
    inside: {
      tag: { pattern: /^<\/?[^\s>\/]+/i, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } },
      'attr-value': {
        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
        inside: { punctuation: [/^=/, { pattern: /(^|[^\\])["']/, lookbehind: !0 }] },
      },
      punctuation: /\/?>/,
      'attr-name': { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity = Prism.languages.markup.entity),
  Prism.hooks.add('wrap', function(a) {
    'entity' === a.type && (a.attributes.title = a.content.replace(/&amp;/, '&'));
  }),
  (Prism.languages.xml = Prism.languages.markup),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup);
(Prism.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: { pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i, inside: { rule: /@[\w-]+/ } },
  url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^{}\s][^{};]*?(?=\s*\{)/,
  string: { pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
  important: /\B!important\b/i,
  function: /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:]/,
}),
  (Prism.languages.css.atrule.inside.rest = Prism.languages.css),
  Prism.languages.markup &&
    (Prism.languages.insertBefore('markup', 'tag', {
      style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: 'language-css',
        greedy: !0,
      },
    }),
    Prism.languages.insertBefore(
      'inside',
      'attr-value',
      {
        'style-attr': {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            'attr-name': { pattern: /^\s*style/i, inside: Prism.languages.markup.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            'attr-value': { pattern: /.+/i, inside: Prism.languages.css },
          },
          alias: 'language-css',
        },
      },
      Prism.languages.markup.tag,
    ));
Prism.languages.clike = {
  comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }],
  string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
  'class-name': {
    pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /[a-z0-9_]+(?=\()/i,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
  keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
  operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
})),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,
      lookbehind: !0,
      greedy: !0,
    },
    'function-variable': {
      pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
      alias: 'function',
    },
    constant: /\b[A-Z][A-Z\d_]*\b/,
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\${[^}]+}/,
          inside: { 'interpolation-punctuation': { pattern: /^\${|}$/, alias: 'punctuation' }, rest: null },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  (Prism.languages.javascript['template-string'].inside.interpolation.inside.rest = Prism.languages.javascript),
  Prism.languages.markup &&
    Prism.languages.insertBefore('markup', 'tag', {
      script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: 'language-javascript',
        greedy: !0,
      },
    }),
  (Prism.languages.js = Prism.languages.javascript);
(Prism.languages.json = {
  property: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/i,
  string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
  number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
  punctuation: /[{}[\]);,]/,
  operator: /:/g,
  boolean: /\b(?:true|false)\b/i,
  null: /\bnull\b/i,
}),
  (Prism.languages.jsonp = Prism.languages.json);
(Prism.languages.markdown = Prism.languages.extend('markup', {})),
  Prism.languages.insertBefore('markdown', 'prolog', {
    blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: 'punctuation' },
    code: [{ pattern: /^(?: {4}|\t).+/m, alias: 'keyword' }, { pattern: /``.+?``|`[^`\n]+`/, alias: 'keyword' }],
    title: [
      { pattern: /\w+.*(?:\r?\n|\r)(?:==+|--+)/, alias: 'important', inside: { punctuation: /==+$|--+$/ } },
      { pattern: /(^\s*)#+.+/m, lookbehind: !0, alias: 'important', inside: { punctuation: /^#+|#+$/ } },
    ],
    hr: { pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: !0, alias: 'punctuation' },
    list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: !0, alias: 'punctuation' },
    'url-reference': {
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/,
      },
      alias: 'url',
    },
    bold: {
      pattern: /(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^\*\*|^__|\*\*$|__$/ },
    },
    italic: {
      pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
      lookbehind: !0,
      inside: { punctuation: /^[*_]|[*_]$/ },
    },
    url: {
      pattern: /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
      inside: {
        variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
        string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
      },
    },
  }),
  (Prism.languages.markdown.bold.inside.url = Prism.languages.markdown.url),
  (Prism.languages.markdown.italic.inside.url = Prism.languages.markdown.url),
  (Prism.languages.markdown.bold.inside.italic = Prism.languages.markdown.italic),
  (Prism.languages.markdown.italic.inside.bold = Prism.languages.markdown.bold);
(Prism.languages.typescript = Prism.languages.extend('javascript', {
  keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|module|declare|constructor|namespace|abstract|require|type)\b/,
  builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console)\b/,
})),
  (Prism.languages.ts = Prism.languages.typescript);
(Prism.languages.scss = Prism.languages.extend('css', {
  comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
  atrule: { pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/, inside: { rule: /@[\w-]+/ } },
  url: /(?:[-a-z]+-)*url(?=\()/i,
  selector: {
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|&|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
    inside: {
      parent: { pattern: /&/, alias: 'important' },
      placeholder: /%[-\w]+/,
      variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    },
  },
})),
  Prism.languages.insertBefore('scss', 'atrule', {
    keyword: [
      /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
      { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
    ],
  }),
  (Prism.languages.scss.property = {
    pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/i,
    inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
  }),
  Prism.languages.insertBefore('scss', 'important', { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }),
  Prism.languages.insertBefore('scss', 'function', {
    placeholder: { pattern: /%[-\w]+/, alias: 'selector' },
    statement: { pattern: /\B!(?:default|optional)\b/i, alias: 'keyword' },
    boolean: /\b(?:true|false)\b/,
    null: /\bnull\b/,
    operator: { pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/, lookbehind: !0 },
  }),
  (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss);
!(function() {
  function e(e, t) {
    return Array.prototype.slice.call((t || document).querySelectorAll(e));
  }
  function t(e, t) {
    return (t = ' ' + t + ' '), (' ' + e.className + ' ').replace(/[\n\t]/g, ' ').indexOf(t) > -1;
  }
  function n(e, n, i) {
    n = 'string' == typeof n ? n : e.getAttribute('data-line');
    for (
      var o,
        l = n.replace(/\s+/g, '').split(','),
        a = +e.getAttribute('data-line-offset') || 0,
        s = r() ? parseInt : parseFloat,
        d = s(getComputedStyle(e).lineHeight),
        u = t(e, 'line-numbers'),
        c = 0;
      (o = l[c++]);

    ) {
      var p = o.split('-'),
        m = +p[0],
        f = +p[1] || m,
        h = e.querySelector('.line-highlight[data-range="' + o + '"]') || document.createElement('div');
      if (
        (h.setAttribute('aria-hidden', 'true'),
        h.setAttribute('data-range', o),
        (h.className = (i || '') + ' line-highlight'),
        u && Prism.plugins.lineNumbers)
      ) {
        var g = Prism.plugins.lineNumbers.getLine(e, m),
          y = Prism.plugins.lineNumbers.getLine(e, f);
        g && (h.style.top = g.offsetTop + 'px'), y && (h.style.height = y.offsetTop - g.offsetTop + y.offsetHeight + 'px');
      } else
        h.setAttribute('data-start', m),
          f > m && h.setAttribute('data-end', f),
          (h.style.top = (m - a - 1) * d + 'px'),
          (h.textContent = new Array(f - m + 2).join(' \n'));
      u ? e.appendChild(h) : (e.querySelector('code') || e).appendChild(h);
    }
  }
  function i() {
    var t = location.hash.slice(1);
    e('.temporary.line-highlight').forEach(function(e) {
      e.parentNode.removeChild(e);
    });
    var i = (t.match(/\.([\d,-]+)$/) || [, ''])[1];
    if (i && !document.getElementById(t)) {
      var r = t.slice(0, t.lastIndexOf('.')),
        o = document.getElementById(r);
      o &&
        (o.hasAttribute('data-line') || o.setAttribute('data-line', ''),
        n(o, i, 'temporary '),
        document.querySelector('.temporary.line-highlight').scrollIntoView());
    }
  }
  if ('undefined' != typeof self && self.Prism && self.document && document.querySelector) {
    var r = (function() {
        var e;
        return function() {
          if ('undefined' == typeof e) {
            var t = document.createElement('div');
            (t.style.fontSize = '13px'),
              (t.style.lineHeight = '1.5'),
              (t.style.padding = 0),
              (t.style.border = 0),
              (t.innerHTML = '&nbsp;<br />&nbsp;'),
              document.body.appendChild(t),
              (e = 38 === t.offsetHeight),
              document.body.removeChild(t);
          }
          return e;
        };
      })(),
      o = 0;
    Prism.hooks.add('before-sanity-check', function(t) {
      var n = t.element.parentNode,
        i = n && n.getAttribute('data-line');
      if (n && i && /pre/i.test(n.nodeName)) {
        var r = 0;
        e('.line-highlight', n).forEach(function(e) {
          (r += e.textContent.length), e.parentNode.removeChild(e);
        }),
          r && /^( \n)+$/.test(t.code.slice(-r)) && (t.code = t.code.slice(0, -r));
      }
    }),
      Prism.hooks.add('complete', function l(e) {
        var r = e.element.parentNode,
          a = r && r.getAttribute('data-line');
        if (r && a && /pre/i.test(r.nodeName)) {
          clearTimeout(o);
          var s = Prism.plugins.lineNumbers,
            d = e.plugins && e.plugins.lineNumbers;
          t(r, 'line-numbers') && s && !d ? Prism.hooks.add('line-numbers', l) : (n(r, a), (o = setTimeout(i, 1)));
        }
      }),
      window.addEventListener('hashchange', i),
      window.addEventListener('resize', function() {
        var e = document.querySelectorAll('pre[data-line]');
        Array.prototype.forEach.call(e, function(e) {
          n(e);
        });
      });
  }
})();
!(function() {
  if ('undefined' != typeof self && self.Prism && self.document) {
    var e = 'line-numbers',
      t = /\n(?!$)/g,
      n = function(e) {
        var n = r(e),
          s = n['white-space'];
        if ('pre-wrap' === s || 'pre-line' === s) {
          var l = e.querySelector('code'),
            i = e.querySelector('.line-numbers-rows'),
            a = e.querySelector('.line-numbers-sizer'),
            o = l.textContent.split(t);
          a || ((a = document.createElement('span')), (a.className = 'line-numbers-sizer'), l.appendChild(a)),
            (a.style.display = 'block'),
            o.forEach(function(e, t) {
              a.textContent = e || '\n';
              var n = a.getBoundingClientRect().height;
              i.children[t].style.height = n + 'px';
            }),
            (a.textContent = ''),
            (a.style.display = 'none');
        }
      },
      r = function(e) {
        return e ? (window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null) : null;
      };
    window.addEventListener('resize', function() {
      Array.prototype.forEach.call(document.querySelectorAll('pre.' + e), n);
    }),
      Prism.hooks.add('complete', function(e) {
        if (e.code) {
          var r = e.element.parentNode,
            s = /\s*\bline-numbers\b\s*/;
          if (
            r &&
            /pre/i.test(r.nodeName) &&
            (s.test(r.className) || s.test(e.element.className)) &&
            !e.element.querySelector('.line-numbers-rows')
          ) {
            s.test(e.element.className) && (e.element.className = e.element.className.replace(s, ' ')),
              s.test(r.className) || (r.className += ' line-numbers');
            var l,
              i = e.code.match(t),
              a = i ? i.length + 1 : 1,
              o = new Array(a + 1);
            (o = o.join('<span></span>')),
              (l = document.createElement('span')),
              l.setAttribute('aria-hidden', 'true'),
              (l.className = 'line-numbers-rows'),
              (l.innerHTML = o),
              r.hasAttribute('data-start') && (r.style.counterReset = 'linenumber ' + (parseInt(r.getAttribute('data-start'), 10) - 1)),
              e.element.appendChild(l),
              n(r),
              Prism.hooks.run('line-numbers', e);
          }
        }
      }),
      Prism.hooks.add('line-numbers', function(e) {
        (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
      }),
      (Prism.plugins.lineNumbers = {
        getLine: function(t, n) {
          if ('PRE' === t.tagName && t.classList.contains(e)) {
            var r = t.querySelector('.line-numbers-rows'),
              s = parseInt(t.getAttribute('data-start'), 10) || 1,
              l = s + (r.children.length - 1);
            s > n && (n = s), n > l && (n = l);
            var i = n - s;
            return r.children[i];
          }
        },
      });
  }
})();
!(function() {
  if ('undefined' != typeof self && self.Prism && self.document) {
    var t = [],
      e = {},
      n = function() {};
    Prism.plugins.toolbar = {};
    var a = (Prism.plugins.toolbar.registerButton = function(n, a) {
        var o;
        (o =
          'function' == typeof a
            ? a
            : function(t) {
                var e;
                return (
                  'function' == typeof a.onClick
                    ? ((e = document.createElement('button')),
                      (e.type = 'button'),
                      e.addEventListener('click', function() {
                        a.onClick.call(this, t);
                      }))
                    : 'string' == typeof a.url
                    ? ((e = document.createElement('a')), (e.href = a.url))
                    : (e = document.createElement('span')),
                  (e.textContent = a.text),
                  e
                );
              }),
          t.push((e[n] = o));
      }),
      o = (Prism.plugins.toolbar.hook = function(a) {
        var o = a.element.parentNode;
        if (o && /pre/i.test(o.nodeName) && !o.parentNode.classList.contains('code-toolbar')) {
          var r = document.createElement('div');
          r.classList.add('code-toolbar'), o.parentNode.insertBefore(r, o), r.appendChild(o);
          var i = document.createElement('div');
          i.classList.add('toolbar'),
            document.body.hasAttribute('data-toolbar-order') &&
              (t = document.body
                .getAttribute('data-toolbar-order')
                .split(',')
                .map(function(t) {
                  return e[t] || n;
                })),
            t.forEach(function(t) {
              var e = t(a);
              if (e) {
                var n = document.createElement('div');
                n.classList.add('toolbar-item'), n.appendChild(e), i.appendChild(n);
              }
            }),
            r.appendChild(i);
        }
      });
    a('label', function(t) {
      var e = t.element.parentNode;
      if (e && /pre/i.test(e.nodeName) && e.hasAttribute('data-label')) {
        var n,
          a,
          o = e.getAttribute('data-label');
        try {
          a = document.querySelector('template#' + o);
        } catch (r) {}
        return (
          a
            ? (n = a.content)
            : (e.hasAttribute('data-url')
                ? ((n = document.createElement('a')), (n.href = e.getAttribute('data-url')))
                : (n = document.createElement('span')),
              (n.textContent = o)),
          n
        );
      }
    }),
      Prism.hooks.add('complete', o);
  }
})();
!(function() {
  if ('undefined' != typeof self && self.Prism && self.document) {
    if (!Prism.plugins.toolbar) return console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.'), void 0;
    var o = window.ClipboardJS || void 0;
    o || 'function' != typeof require || (o = require('clipboard'));
    var e = [];
    if (!o) {
      var t = document.createElement('script'),
        n = document.querySelector('head');
      (t.onload = function() {
        if ((o = window.ClipboardJS)) for (; e.length; ) e.pop()();
      }),
        (t.src = 'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js'),
        n.appendChild(t);
    }
    Prism.plugins.toolbar.registerButton('copy-to-clipboard', function(t) {
      function n() {
        var e = new o(i, {
          text: function() {
            return t.code;
          },
        });
        e.on('success', function() {
          (i.textContent = 'Copied!'), r();
        }),
          e.on('error', function() {
            (i.textContent = 'Press Ctrl+C to copy'), r();
          });
      }
      function r() {
        setTimeout(function() {
          i.textContent = 'Copy';
        }, 5e3);
      }
      var i = document.createElement('a');
      return (i.textContent = 'Copy'), o ? n() : e.push(n), i;
    });
  }
})();
