(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{670:function(e,o,n){"use strict";n.d(o,"a",(function(){return t}));var t=["primary","secondary","third","success","danger","warning","grey","info","light","dark","default","white","black","transparent"]},740:function(e,o,n){"use strict";n.r(o);var t=n(670),c={name:"MazCheckboxDoc",data:function(){return{checkboxValue:!0,colors:t.a}}},r=n(1),component=Object(r.a)(c,(function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("div",{staticClass:"maz-checkbox-doc"},[n("h4",[e._v("\n      Examples\n    ")]),e._v(" "),n("ComponentContainer",[e._l(e.colors,(function(o){return n("MazCheckbox",{key:o,staticClass:"maz-mb-2",attrs:{color:o},model:{value:e.checkboxValue,callback:function(o){e.checkboxValue=o},expression:"checkboxValue"}},[e._v('\n        Checkbox - color="'+e._s(o)+'"\n      ')])})),e._v(" "),n("hr",{staticClass:"maz-border-top maz-border-solid maz-border-color maz-my-5"}),e._v(" "),n("strong",[e._v("Value")]),e._v(": "+e._s(e.checkboxValue)+"\n    ")],2),e._v(" "),n("hr",{staticClass:"maz-border-top maz-border-solid maz-border-color maz-my-5",attrs:{id:"howToUseIt"}}),e._v(" "),n("h4",[e._v("\n      How to use it ?\n    ")]),e._v(" "),n("CodeContainer",{staticClass:"maz-mb-0",attrs:{language:"html",code:"<template>\n  <MazCheckbox v-model=\"checkboxValue\">\n    Checkbox label\n  </MazCheckbox>\n</template>\n\n<script>\n  import { MazCheckbox } from 'maz-ui'\n  export default {\n    components: { MazCheckbox },\n    data () {\n      return {\n        checkboxValue: true\n      }\n    }\n  }\n<\/script>"}})],1)}),[],!1,null,null,null);o.default=component.exports}}]);