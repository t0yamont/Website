import d from"./ContentQuery.4JoIh1gD.js";import{d as c,P as l,R as p}from"./entry.Dj8OLWYq.js";import"./asyncData.CISWJxKV.js";import"./query.DiggJpUV.js";import"./preview.9BkddvfR.js";const u=(r,t)=>p("pre",null,JSON.stringify({message:"You should use slots with <ContentList>",slot:r,data:t},null,2)),h=c({name:"ContentList",props:{path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0}},render(r){const t=l(),{path:f,query:o}=r,n={...o||{},path:f||(o==null?void 0:o.path)||"/"};return p(d,n,{default:t!=null&&t.default?({data:e,refresh:a,isPartial:m})=>t.default({list:e,refresh:a,isPartial:m,...this.$attrs}):e=>u("default",e.data),empty:e=>t!=null&&t.empty?t.empty(e):u("default",e==null?void 0:e.data),"not-found":e=>{var a;return t!=null&&t["not-found"]?(a=t==null?void 0:t["not-found"])==null?void 0:a.call(t,e):u("not-found",e==null?void 0:e.data)}})}}),y=h,q=y;export{q as default};